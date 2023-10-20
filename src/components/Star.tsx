import { Tooltip, Icon } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface StarProps {
  filled: "full" | "half" | "empty";
  tooltip: string;
}

const Star: React.FC<StarProps> = ({ filled, tooltip }) => {
  let icon;
  if (filled === "full") icon = <BsStarFill />;
  else if (filled === "half") icon = <BsStarHalf />;
  else icon = <BsStar />;

  return (
    <Tooltip label={tooltip} aria-label={tooltip}>
      {icon}
    </Tooltip>
  );
};

export default Star;
