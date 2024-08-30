import { useCallback, useEffect, useState } from "react";
import { keyboardKeys, pianoKeysMap } from "../utils/pianoKeysMap";
import { playNote } from "../utils/playNote";
import { initializeAudioContext } from "../utils/initializeAudioContext";
import { logSilence } from "../utils/logSilence";

const Piano = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayNote = useCallback(async (key: string) => {
    await initializeAudioContext();
    if (!keyboardKeys.includes(key)) {
      logSilence();
      return;
    }
    playNote(key);
    setActiveKeys((prev) => new Set(prev).add(key));
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const title = "M U S I C 🎹";
      let index = 0;

      const interval = setInterval(() => {
        document.title = title.slice(0, index + 1);
        index++;
        if (index >= title.length) index = 0;
      }, 250);

      return () => clearInterval(interval);
    } else {
      document.title = "The sound of silence...";
    }
  }, [isPlaying]);

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (!activeKeys.has(key)) {
        await handlePlayNote(key);
      }
    },
    [activeKeys]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      inactivateKeys(key);
    },
    [activeKeys]
  );

  const inactivateKeys = useCallback(
    (key: string) => {
      setActiveKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    },
    [activeKeys]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeKeys]);

  useEffect(() => {
    let timeOut: ReturnType<typeof setTimeout>;

    if (!activeKeys.size) {
      timeOut = setTimeout(() => {
        setIsPlaying(false);
      }, 750);
    } else {
      setIsPlaying(true);
    }

    return () => clearTimeout(timeOut);
  }, [activeKeys.size]);

  return (
    <div className="piano">
      {isPlaying ? <h2>🎹 Playing</h2> : <h2>🤫 Silence</h2>}
      {Object.entries(pianoKeysMap).map(([key, value]: [string, string]) => (
        <button
          key={key}
          className={`piano-key ${activeKeys.has(key) ? "active" : ""}`}
          onMouseDown={() => handlePlayNote(key)}
          onMouseUp={() => inactivateKeys(key)}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Piano;
