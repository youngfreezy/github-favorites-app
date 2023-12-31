import { Button, Text, VStack, HStack } from "@chakra-ui/react";
import React from "react";
import Star from "./Star";
import { Repo } from "../App";

export interface RepoItemProps {
  repo: Repo;
  onRemove: (repoId: string | number) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onRemove }) => {

  return (
    <VStack align="start" spacing={2}>
      <HStack spacing={4} w="100%">
        <VStack align="start" flex="1">
          <Text fontWeight="bold">{repo.fullName}</Text>
          <Star stargazers_count={repo.stargazersCount} />
          <Text>Language: {repo.language || "Unknown Language"}</Text>
          <Text>Created At: {repo.createdAt}</Text>
          <Text>URL: {repo.url}</Text>
        </VStack>
        <VStack spacing={2}>
          <Button
            onClick={() => onRemove(repo.id)}
            colorScheme="red"
            opacity={0.75}
          >
            Remove
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default RepoItem;
