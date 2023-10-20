// Star.tsx
import React, { Dispatch, SetStateAction } from "react";
import { Box, HStack, Tooltip, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface StarProps {
  stargazers_count: number;
  referenceStars: number;
  loadingReferenceStars: boolean;
  setLoadingReferenceStars: Dispatch<SetStateAction<boolean>>;
}

const Star: React.FC<StarProps> = ({
  stargazers_count,
  referenceStars,
  loadingReferenceStars,
  setLoadingReferenceStars,
}) => {
  const calculateStarRating = (stars: number): number => {
    if (loadingReferenceStars) return 0;
    const ratio = stars / referenceStars;
    return Math.min(5, Math.ceil(ratio * 5));
  };
  return (
    <HStack spacing={1}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Tooltip
          key={index}
          label={`Total stars: ${stargazers_count}`}
          placement="top"
          hasArrow
        >
          <Box
            as={StarIcon}
            boxSize={3}
            color={
              index < calculateStarRating(stargazers_count)
                ? "yellow.500"
                : "gray.300"
            }
            _hover={{
              color:
                index < calculateStarRating(stargazers_count)
                  ? "yellow.700"
                  : "gray.500",
            }}
          />
        </Tooltip>
      ))}
      <Text>{stargazers_count}</Text>
    </HStack>
  );
};

export default Star;
