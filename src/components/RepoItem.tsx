import { Button, Text, VStack, HStack } from "@chakra-ui/react";
import React from "react";

interface Repo {
  id: string;
  fullName: string;
  createdAt: string;
  stargazersCount: number | undefined;
  language: string | undefined;
  url: string;
}

interface RepoItemProps {
  repo: Repo;
  onRemove: (repoId: string) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repo, onRemove }) => {
  return (
    <VStack align="start" spacing={2}>
      <HStack spacing={4} w="100%">
        <VStack align="start" flex="1">
          <Text fontWeight="bold">{repo.fullName}</Text>
          <Text>Stars: {repo.stargazersCount || 0}</Text>
          <Text>Language: {repo.language || "Unknown"}</Text>
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
