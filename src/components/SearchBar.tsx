import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  VStack,
  HStack,
  Input,
  List,
  ListItem,
  InputGroup,
  Text,
  Box,
  InputRightElement,
} from "@chakra-ui/react";
import { CloseIcon, StarIcon } from "@chakra-ui/icons";

import debounce from "lodash.debounce";

interface SearchBarProps {
  value: string;
  onSearch: (term: string) => void;
  onSelect: (selectedRepo: any) => void;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSelect,
  value,
  onSearch,
  setSearchTerm,
}) => {
  const [results, setResults] = useState<any[]>([]);

  const fetchRepos = async (query: string) => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/repositories?q=${query}`
      );
      setResults(data.items);
    } catch (error) {
      console.error("Error fetching repos:", error);
      setResults([]);
    }
  };

  //TODO
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchRepos = useCallback(debounce(fetchRepos, 300), []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);

    if (query.length > 2) {
      debouncedFetchRepos(query);
    } else {
      setResults([]);
    }
  };

  const handleRepoSelect = (repo: any) => {
    onSelect(repo);
    setResults([]);
  };

  return (
    <VStack spacing={4} align="start" position="relative" width="full">
      <HStack spacing={2} width="full">
        <InputGroup flex="1">
          <Input
            placeholder="Search GitHub repos..."
            value={value}
            onChange={handleInputChange}
            bg="white"
            boxShadow="xl"
            borderRadius="md"
            _focus={{
              borderColor: "blue.500",
              boxShadow: `0 0 0 2px blue.300`,
            }}
            transition="all 0.3s"
          />
          {value && (
            <InputRightElement>
              <CloseIcon
                color="gray.500"
                cursor="pointer"
                onClick={() => setSearchTerm("")}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </HStack>

      {results.length > 0 && (
        <List
          position="absolute"
          top="100%"
          zIndex="100"
          bg="white"
          border="1px solid gray"
          width="full"
          boxShadow="lg"
          borderRadius="md"
          overflow="hidden"
          pl="8"
        >
          {results.map((repo) => (
            <ListItem
              mt="2"
              mb="2"
              key={repo.id}
              onClick={() => handleRepoSelect(repo)}
              p={3}
              cursor="pointer"
              transition="all 0.3s"
              borderRadius="md"
              _hover={{
                bg: "blue.100",
                transform: "scale(1.02)",
                zIndex: 1,
              }}
              _active={{
                transform: "scale(0.98)",
              }}
            >
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">{repo.full_name}</Text>
                <Text color="gray.600">
                  {repo.description || "No description provided."}
                </Text>
                <HStack>
                  <Text fontSize="sm" color="blue.400">
                    {repo.language || "Unknown"}
                  </Text>
                  <Box as="span" color="gray.500" fontSize="sm">
                    <StarIcon boxSize={3} color="yellow.500" mr={1} />
                    {repo.stargazers_count || 0}
                  </Box>
                </HStack>
              </VStack>
            </ListItem>
          ))}
        </List>
      )}
    </VStack>
  );
};

export default SearchBar;
