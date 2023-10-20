import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import SearchBar from "./components/SearchBar";
import RepoList from "./components/RepoList";
import SortDropdown from "./components/SortDropdown";
import { throttle } from "lodash";
interface RawRepo {
  id: number;
  full_name?: string;
  fullName?: string;
  createdAt?: string;
  created_at?: string;
  stargazers_count?: number;
  stargazersCount?: number;
  language?: string;
  url: string;
}

interface Repo {
  id: string;
  fullName: string;
  stargazersCount: number;
  language: string;
  url: string;
  createdAt: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [sortType, setSortType] = useState<{
    type: "stargazersCount" | "createdAt" | "none";
    direction: "asc" | "desc";
  }>({
    type: "none",
    direction: "asc",
  });
  const queryClient = useQueryClient();
  const transformRepo = (repo: RawRepo): Repo => {
    return {
      id: repo.id.toString(),
      fullName: repo.fullName || repo.full_name || "",
      createdAt: repo.createdAt || repo.created_at || "",
      stargazersCount: repo.stargazersCount || repo.stargazers_count || 0,
      language: repo.language || "unknown",
      url: repo.url,
    };
  };

  const throttledFetch = useMemo(() => {
    const getPersistedReposOnMount = async () => {
      console.log("FETCHING ONLY ONCE, WAS FETCHING TWICE BEFORE...");
      const resHealth = await fetch("http://localhost:4000/health", {
        method: "GET",
      });
      const bodyHealth = await resHealth.json();
      if (bodyHealth.message !== "Server is healthy") return;
      const res = await fetch("http://localhost:4000/repo/", {
        method: "GET",
      });
      const body = await res.json();
      const transformedRepos: Repo[] = body.repos?.map(transformRepo);
      setRepos(transformedRepos);
    };
    return throttle(() => getPersistedReposOnMount(), 10000, {
      leading: true,
      trailing: true,
    });
  }, []);

  useEffect(() => {
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

  const handleSelectRepo = (selectedRepo: Repo) => {
    if (repos.length < 10) {
      addRepoMutation.mutate(selectedRepo as any);
      setRepos((prevRepos) =>
        [...prevRepos, selectedRepo].map((item: any) => transformRepo(item))
      );
    } else {
      alert("You can save up to 10 repositories only.");
    }
  };

  const handleRepoRemove = useCallback(async (repoId: string) => {
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
    <Box padding="5rem">
      <SearchBar
        value={searchTerm}
        onSearch={handleSearch}
        onSelect={handleSelectRepo}
        setSearchTerm={setSearchTerm}
      />
      <SortDropdown value={sortType} onChange={setSortType} />
      <RepoList
        sortType={sortType}
        repos={repos}
        onRepoRemove={handleRepoRemove}
      />
    </Box>
  );
};

export default App;
