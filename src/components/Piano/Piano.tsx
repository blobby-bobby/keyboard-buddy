import { useCallback, useContext, useEffect, useState } from "react";
import { keyboardKeys, pianoKeysMap } from "../../utils/piano/pianoKeysMap";
import { playNote } from "../../utils/piano/playNote";
import { initializeAudioContext } from "../../utils/context/initializeAudioContext";
import { logSilence } from "../../utils/logSilence";
import "./style.css";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";

const Piano = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const { setIsPlaying, gameOver } = useContext(BuddyPlayContext);

  const handlePlayNote = useCallback(
    async (key: string) => {
      await initializeAudioContext();
      if (!keyboardKeys.includes(key as (typeof keyboardKeys)[number])) {
        logSilence();
        return;
      }

      if (gameOver) return;
      playNote(key);
      setActiveKeys((prev) => new Set(prev).add(key));
    },
    [gameOver]
  );

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
        {Object.entries(pianoKeysMap).map(([key]: [string, string]) => (
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
