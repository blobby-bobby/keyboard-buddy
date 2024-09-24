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

// BUDDY EVENT STATES
// TODO: implement fully functionnal event system and resolution
const eventsFeelings = {
  hungry: "hungry",
  dirty: "dirty",
} as const;

type EnumValue<T> = T[keyof T];
type BuddyFeeling = EnumValue<typeof eventsFeelings>;

type BuddyPlayContextProps = {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  happiness: number;
  increaseHappiness: () => void;
  decreaseHappiness: () => void;
  gameStart: () => void;
  gameOver: boolean;
  isSad: boolean;
  eventFeeling: BuddyFeeling | null;
  setEventFeeling: Dispatch<SetStateAction<BuddyFeeling | null>>;
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
  eventFeeling: null,
  setEventFeeling: () => {},
});

const BuddyPlayProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [happiness, setHappiness] = useState(7);
  const [eventFeeling, setEventFeeling] = useState<BuddyFeeling | null>(null);

  const increaseHappiness = () => {
    if (eventFeeling) return;
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
        increaseHappiness,
        decreaseHappiness,
        gameStart,
        gameOver,
        isSad,
        eventFeeling,
        setEventFeeling,
      }}
    >
      {children}
    </BuddyPlayContext.Provider>
  );
};

export { BuddyPlayProvider, BuddyPlayContext };
