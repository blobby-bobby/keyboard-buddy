import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

type BuddyPlayContextProps = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  happiness: number;
  setHappiness: Dispatch<SetStateAction<number>>;
  increaseHappiness: () => void;
  decreaseHappiness: () => void;
  gameStart: () => void;
  gameOver: boolean;
};

const BuddyPlayContext = createContext<BuddyPlayContextProps>({
  isPlaying: false,
  setIsPlaying: () => {},
  happiness: 7,
  setHappiness: () => {},
  increaseHappiness: () => {},
  decreaseHappiness: () => {},
  gameStart: () => {},
  gameOver: false,
});

const BuddyPlayProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [happiness, setHappiness] = useState(2);

  const increaseHappiness = () => {
    setHappiness((prev) => prev + 1);

    if (happiness >= 8) {
      setHappiness(8);
    }
  };

  const decreaseHappiness = () => {
    setHappiness((prev) => prev - 1);

    if (happiness < 0) {
      setHappiness(0);
    }
  };

  const gameStart = useCallback(() => {
    setHappiness(7);
  }, []);

  const gameOver = useMemo(() => {
    return happiness < 1;
  }, [happiness]);

  return (
    <BuddyPlayContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        happiness,
        setHappiness,
        increaseHappiness,
        decreaseHappiness,
        gameStart,
        gameOver,
      }}
    >
      {children}
    </BuddyPlayContext.Provider>
  );
};

export { BuddyPlayProvider, BuddyPlayContext };
