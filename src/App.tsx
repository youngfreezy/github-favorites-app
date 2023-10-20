import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { StarsConfigProvider } from "./contexts/StarsContext";
import { transformRepo } from "./helpers/helpers";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import SortDropdown from "./components/SortDropdown";
import { throttle } from "lodash";

export interface RawRepo {
  id: string | number;
  full_name?: string;
  created_at?: string;
  stargazers_count?: number;
  language?: string;
  url: string;
}

export interface Repo {
  id: string | number;
  fullName: string;
  stargazersCount?: number | undefined;
  language: string;
  url: string;
  createdAt: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [sortType, setSortType] = useState<{
    type: "stargazersCount" | "createdAt" | "none";
    direction: "asc" | "desc";
  }>({
    type: "none",
    direction: "asc",
  });
  const queryClient = useQueryClient();
  const throttledFetch = useMemo(() => {
    const getPersistedReposOnMount = async () => {
      setIsLoading(true);

      try {
        const resHealth = await fetch("http://localhost:4000/health", {
          method: "GET",
        });
        const bodyHealth = await resHealth.json();

        if (bodyHealth.message !== "Server is healthy") {
          setIsLoading(false);
          return;
        }

        const res = await fetch("http://localhost:4000/repo/", {
          method: "GET",
        });
        const body = await res.json();
        const transformedRepos: Repo[] = body.repos?.map(transformRepo);
        setRepos(transformedRepos);
      } catch (error) {
        console.error("Error:", error);
      }

      setIsLoading(false);
    };

    return throttle(() => getPersistedReposOnMount(), 2000);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    throttledFetch();
  }, [throttledFetch]);

  const addRepoMutation = useMutation(
    (newRepo: RawRepo) => {
      const newRepoBody = transformRepo(newRepo);
      return fetch("http://localhost:4000/repo/", {
        method: "POST",
        body: JSON.stringify(newRepoBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("repos");
      },
    }
  );

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleSelectRepo = (selectedRepo: RawRepo | Repo) => {
    const reposLimit = 10;
    if (repos?.length < reposLimit) {
      addRepoMutation.mutate(selectedRepo as any);
      setRepos((prevRepos) =>
        [...prevRepos, selectedRepo].map((item: Repo | RawRepo) =>
          transformRepo(item)
        )
      );
    } else {
      alert("You can save up to 10 repositories only.");
    }
  };

  const handleRepoRemove = useCallback(async (repoId: string | number) => {
    try {
      await fetch(`http://localhost:4000/repo/${repoId}`, {
        method: "DELETE",
      });
      setRepos((prevRepos) => prevRepos.filter((repo) => repo.id !== repoId));
    } catch (error) {
      console.error("Failed to remove repository", error);
    }
  }, []);

  return (
    <StarsConfigProvider>
      <Box padding="5rem">
        <SearchBar
          value={searchTerm}
          onSearch={handleSearch}
          onSelect={handleSelectRepo}
          setSearchTerm={setSearchTerm}
        />
        <SortDropdown value={sortType} onChange={setSortType} />
        <RepoList
          isLoading={isLoading}
          sortType={sortType}
          repos={repos}
          onRepoRemove={handleRepoRemove}
        />
      </Box>
    </StarsConfigProvider>
  );
};

export default App;
