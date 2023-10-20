import { createContext, ReactNode, useContext, useState } from "react";

interface StarsConfig {
  loadingReferenceStars: boolean;
  referenceStars: number;
  setLoadingReferenceStars: React.Dispatch<React.SetStateAction<boolean>>;
  setReferenceStars: React.Dispatch<React.SetStateAction<number>>;
}
const StarsContext = createContext<StarsConfig>({
  loadingReferenceStars: false,
  referenceStars: 0,
  setLoadingReferenceStars: () => {},
  setReferenceStars: () => {},
});

export const useStarsConfig = () => {
  const context = useContext(StarsContext);
  if (!context) {
    console.log("useStarsConfig must be used within a StarsConfigProvider");
  }
  return context;
};

export const StarsConfigProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [referenceStars, setReferenceStars] = useState<number>(0);
  const [loadingReferenceStars, setLoadingReferenceStars] =
    useState<boolean>(true);

  return (
    <StarsContext.Provider
      value={{
        loadingReferenceStars,
        referenceStars,
        setLoadingReferenceStars,
        setReferenceStars,
      }}
    >
      {children}
    </StarsContext.Provider>
  );
};
