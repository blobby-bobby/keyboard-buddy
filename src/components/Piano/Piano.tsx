import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  pianoKeysMapAzerty,
  pianoKeysMapQwerty,
} from "../../utils/piano/pianoKeysMap";
import { playNote } from "../../utils/piano/playNote";
import { initializeAudioContext } from "../../utils/context/initializeAudioContext";
import { logSilence } from "../../utils/logSilence";
import "./styles.css";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";
import { buddyMelodies } from "../../utils/feelings";

const Piano = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const {
    setIsPlaying,
    setEventFeeling,
    gameOver,
    eventFeeling,
    eventMelody,
    setEventMelody,
    isQwerty,
  } = useContext(BuddyPlayContext);

  const keysToMap = useMemo(() => {
    return isQwerty ? pianoKeysMapQwerty : pianoKeysMapAzerty;
  }, [isQwerty]);

  const handlePlayNote = useCallback(
    async (key: string) => {
      await initializeAudioContext();
      if (!Object.keys(keysToMap).includes(key)) {
        logSilence();
        return;
      }

      if (gameOver) return;
      playNote(key, isQwerty);
      setActiveKeys((prev) => new Set(prev).add(key));

      // MELODY EVENT HANDLER
      // TODO : REFACTOR
      if (eventFeeling === "hungry") {
        setEventMelody((prev) => {
          const newMelody = [...prev, key];

          if (
            newMelody.every(
              (note, index) => note === buddyMelodies.hungry[index]
            )
          ) {
            return newMelody;
          } else {
            return [];
          }
        });
      }

      if (eventFeeling === "dirty") {
        setEventMelody((prev) => {
          const newMelody = [...prev, key];

          if (
            newMelody.every(
              (note, index) => note === buddyMelodies.dirty[index]
            )
          ) {
            return newMelody;
          } else {
            return [];
          }
        });
      }
    },
    [gameOver, eventFeeling, setEventMelody, isQwerty, keysToMap]
  );

  useEffect(() => {
    if (
      JSON.stringify(eventMelody) === JSON.stringify(buddyMelodies.hungry) ||
      JSON.stringify(eventMelody) === JSON.stringify(buddyMelodies.dirty)
    ) {
      setEventFeeling("idle");
      setEventMelody([]);
    }
  }, [eventMelody, setEventFeeling, setEventMelody]);

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (!activeKeys.has(key)) {
        await handlePlayNote(key);
      }
    },
    [activeKeys, handlePlayNote]
  );

  const inactivateKeys = useCallback((key: string) => {
    setActiveKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  }, []);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      inactivateKeys(key);
    },
    [inactivateKeys]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeKeys, handleKeyDown, handleKeyUp]);

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;

    if (gameOver) return;
    if (!activeKeys.size) {
      timeOut = setTimeout(() => {
        setIsPlaying(false);
      }, 750);
    } else {
      setIsPlaying(true);
    }

    return () => clearTimeout(timeOut);
  }, [activeKeys.size, gameOver, setIsPlaying]);

  return (
    <>
      <div className="piano">
        {Object.entries(keysToMap).map(([key]: [string, string]) => (
          <div className="piano-key-wrapper" key={key}>
            <button
              className={`piano-key ${activeKeys.has(key) ? "active" : ""}`}
              onMouseDown={(e) => {
                handlePlayNote(key);
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.blur(); // Remove focus from the button
              }}
              onMouseUp={() => inactivateKeys(key)}
              disabled={gameOver}
              type="button"
              tabIndex={-1}
            />
            <span>{key}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Piano;
