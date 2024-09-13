import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type IsPlayingContextProps = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
};

const IsPlayingContext = createContext<IsPlayingContextProps>({
  isPlaying: false,
  setIsPlaying: () => {},
});

const IsPlayingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <IsPlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </IsPlayingContext.Provider>
  );
};

export { IsPlayingProvider, IsPlayingContext };
