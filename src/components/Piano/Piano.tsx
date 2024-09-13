import { useCallback, useContext, useEffect, useState } from "react";
import { keyboardKeys, pianoKeysMap } from "../../utils/piano/pianoKeysMap";
import { playNote } from "../../utils/piano/playNote";
import { initializeAudioContext } from "../../utils/context/initializeAudioContext";
import { logSilence } from "../../utils/logSilence";
import "./style.css";
import { IsPlayingContext } from "../../utils/context/isPlayingContext";

const Piano = () => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const { isPlaying, setIsPlaying } = useContext(IsPlayingContext);

  const handlePlayNote = useCallback(async (key: string) => {
    await initializeAudioContext();
    if (!keyboardKeys.includes(key)) {
      logSilence();
      return;
    }
    playNote(key);
    setActiveKeys((prev) => new Set(prev).add(key));
  }, []);

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

  useEffect(() => {
    if (isPlaying) {
      let title = "M U S I C 🎹";
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

  return (
    <>
      <div className="key-labels">
        {keyboardKeys.map((key) => (
          <span key={key}>{key}</span>
        ))}
      </div>
      <div className="piano">
        {Object.entries(pianoKeysMap).map(([key, value]: [string, string]) => (
          <div key={key} className="piano-key-wrapper">
            <button
              className={`piano-key ${activeKeys.has(key) ? "active" : ""}`}
              onMouseDown={() => handlePlayNote(key)}
              onMouseUp={() => inactivateKeys(key)}
            >
              {value}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Piano;
