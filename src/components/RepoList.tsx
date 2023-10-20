import React from "react";
import { Box, OrderedList, ListItem, Skeleton } from "@chakra-ui/react"; // Importing Skeleton
import RepoItem from "./RepoItem";
import { orderBy } from "lodash";
import { Repo } from "../App";

interface RepoListProps {
  repos: Repo[];
  sortType: {
    type: "stargazersCount" | "createdAt" | "none";
    direction: "asc" | "desc";
  };
  isLoading: boolean;
  onRepoRemove: (repoId: string | number) => void;
}

const RepoList: React.FC<RepoListProps> = ({
  repos,
  sortType,
  isLoading,
  onRepoRemove,
}) => {
  const sortedRepos = orderBy(repos, [sortType.type], [sortType.direction]);

  const skeletonListItems = [...Array(5)].map((_, index) => (
    <Skeleton height="20px" my="10px" key={index} />
  ));

  return (
    <Box>
      <OrderedList>
        {isLoading
          ? skeletonListItems
          : sortedRepos.map((repo) => (
              <ListItem mb="4" key={repo.id}>
                <RepoItem key={repo.id} repo={repo} onRemove={onRepoRemove} />
              </ListItem>
            ))}
      </OrderedList>
    </Box>
  );
};

export default RepoList;
