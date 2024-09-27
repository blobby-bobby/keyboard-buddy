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
import { BuddyFeeling } from "../types";

type BuddyPlayContextProps = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  happiness: number;
  increaseHappiness: () => void;
  decreaseHappiness: () => void;
  gameStart: () => void;
  gameOver: boolean;
  isSad: boolean;
  eventFeeling: BuddyFeeling;
  setEventFeeling: Dispatch<SetStateAction<BuddyFeeling>>;
};

const BuddyPlayContext = createContext<BuddyPlayContextProps>({
  isPlaying: false,
  setIsPlaying: () => {},
  happiness: 7,
  increaseHappiness: () => {},
  decreaseHappiness: () => {},
  gameStart: () => {},
  gameOver: false,
  isSad: false,
  eventFeeling: "idle",
  setEventFeeling: () => {},
});

const useBuddyPlayContext = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [happiness, setHappiness] = useState(7);
  const [eventFeeling, setEventFeeling] = useState<BuddyFeeling>("idle");

  const increaseHappiness = () => {
    if (eventFeeling !== "idle") return;
    setHappiness((prev) => prev + 1);

    if (happiness > 8) {
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
    setEventFeeling("idle");
  }, []);

  const gameOver = useMemo(() => {
    return happiness < 1;
  }, [happiness]);

  const isSad = useMemo(() => {
    return happiness < 3;
  }, [happiness]);

  return {
    isPlaying,
    setIsPlaying,
    happiness,
    increaseHappiness,
    decreaseHappiness,
    gameStart,
    gameOver,
    isSad,
    eventFeeling,
    setEventFeeling,
  };
};

const BuddyPlayProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useBuddyPlayContext();

  return (
    <BuddyPlayContext.Provider value={value}>
      {children}
    </BuddyPlayContext.Provider>
  );
};

export { BuddyPlayProvider, BuddyPlayContext };
