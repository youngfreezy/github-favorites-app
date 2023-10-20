import React from "react";
import { Box, OrderedList, ListItem } from "@chakra-ui/react";
import RepoItem from "./RepoItem";
import { orderBy } from "lodash";
interface Repo {
  id: string;
  fullName: string;
  stargazersCount: number;
  language: string;
  url: string;
  createdAt: string;
}

interface RepoListProps {
  repos: Repo[];
  sortType: {
    type: "stargazersCount" | "createdAt" | "none";
    direction: "asc" | "desc";
  };
  onRepoRemove: (repoId: string) => void;
}

const RepoList: React.FC<RepoListProps> = ({
  repos,
  sortType,
  onRepoRemove,
}) => {
  const sortedRepos = orderBy(repos, [sortType.type], [sortType.direction]);

  return (
    <Box>
      <OrderedList>
        {sortedRepos.map((repo) => (
          <ListItem mb="4" key={repo.id}>
            <RepoItem key={repo.id} repo={repo} onRemove={onRepoRemove} />
          </ListItem>
        ))}
      </OrderedList>
    </Box>
  );
};

export default RepoList;
