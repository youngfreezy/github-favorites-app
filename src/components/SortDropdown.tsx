import React, { useState } from "react";
import { Select, HStack, Button } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";

interface SortDropdownProps {
  value: {
    type: "stargazersCount" | "createdAt" | "none";
    direction: "asc" | "desc";
  };
  onChange: (value: {
    type: "stargazersCount" | "createdAt" | "none";
    direction: "asc" | "desc";
  }) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const handleDirectionToggle = () => {
    const newDirection = direction === "asc" ? "desc" : "asc";
    setDirection(newDirection);
    onChange({ ...value, direction: newDirection });
  };

  return (
    <HStack spacing={3}>
      <Select
        mt="8"
        mb="8"
        value={value.type}
        onChange={(e) =>
          onChange({
            type: e.target.value as "stargazersCount" | "createdAt" | "none",
            direction,
          })
        }
        variant="filled"
        focusBorderColor="blue.500"
        boxShadow="sm"
        _hover={{
          boxShadow: "md",
        }}
        _focus={{
          boxShadow: `0 0 0 2px blue.300`,
        }}
        borderRadius="md"
        size="lg"
      >
        <option value="stargazersCount">Stars</option>
        <option value="createdAt">Created</option>
        <option value="none">Select Sort</option>
      </Select>
      <Button onClick={handleDirectionToggle}>
        {direction === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Button>
    </HStack>
  );
};

export default SortDropdown;
