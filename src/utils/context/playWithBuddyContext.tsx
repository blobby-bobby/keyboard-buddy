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

const buddyFeelings = {
  idle: "idle",
  sad: "sad",
  dead: "dead",
  hungry: "hungry",
  dirty: "dirty",
} as const;

type EnumValue<T> = T[keyof T];
type BuddyFeeling = EnumValue<typeof buddyFeelings>;

type BuddyPlayContextProps = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  happiness: number;
  setHappiness: Dispatch<SetStateAction<number>>;
  increaseHappiness: () => void;
  decreaseHappiness: () => void;
  gameStart: () => void;
  gameOver: boolean;
  buddyState: BuddyFeeling;
  setBuddyState: Dispatch<SetStateAction<BuddyFeeling>>;
  isSad: boolean;
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
  buddyState: buddyFeelings.idle,
  setBuddyState: () => {},
  isSad: false,
});

const BuddyPlayProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [buddyState, setBuddyState] = useState<BuddyFeeling>("idle");
  const [happiness, setHappiness] = useState(7);

  const increaseHappiness = () => {
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
    setBuddyState(buddyFeelings.idle);
    setHappiness(7);
  }, []);

  const gameOver = useMemo(() => {
    return happiness < 1;
  }, [happiness]);

  const isSad = useMemo(() => {
    return happiness < 3;
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
        setBuddyState,
        buddyState,
        isSad,
      }}
    >
      {children}
    </BuddyPlayContext.Provider>
  );
};

export { BuddyPlayProvider, BuddyPlayContext };
