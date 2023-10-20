import axios from "axios";
import { Dispatch, SetStateAction } from "react";
export const fetchReferenceRepoStars = async (
  setLoadingReferenceStars: Dispatch<SetStateAction<boolean>>,
  setReferenceStars: Dispatch<SetStateAction<number>>
) => {
  try {
    const { data } = await axios.get(
      "https://api.github.com/repos/freeCodeCamp/freeCodeCamp"
    );
    setReferenceStars(data.stargazers_count);
  } catch (error) {
    console.error("Error fetching reference repo stars:", error);
  } finally {
    setLoadingReferenceStars(false);
  }
};
