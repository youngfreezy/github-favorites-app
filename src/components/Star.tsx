// Star.tsx
import React from "react";
import { Box, HStack, Tooltip, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useStarsConfig } from "../contexts/StarsContext";
interface StarProps {
  stargazers_count: number | string | undefined;
}

const Star: React.FC<StarProps> = ({ stargazers_count }) => {
  const { referenceStars, loadingReferenceStars } = useStarsConfig();
  const calculateStarRating = (stars: number | string | undefined): number => {
    if (loadingReferenceStars) return 0;
    const ratio = parseInt(stars as any, 10) / referenceStars;
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
