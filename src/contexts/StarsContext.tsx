import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";

interface StarsConfig {
  loadingReferenceStars: boolean;
  referenceStars: number;
  setLoadingReferenceStars: React.Dispatch<React.SetStateAction<boolean>>;
  setReferenceStars: React.Dispatch<React.SetStateAction<number>>;
}
const StarsContext = createContext<StarsConfig | undefined>(undefined);

export const useStarsConfig = () => {
  const context = useContext(StarsContext);
  if (!context) {
    throw new Error("useStarsConfig must be used within a StarsConfigProvider");
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
