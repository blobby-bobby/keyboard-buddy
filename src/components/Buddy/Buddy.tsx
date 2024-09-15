import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { IsPlayingContext } from "../../utils/context/playWithBuddyContext";
const Buddy = () => {
  const { isPlaying } = useContext(IsPlayingContext);
  const [happiness, setHappiness] = useState(7);

  useEffect(() => {
    if (isPlaying) {
      console.log(happiness);
      setHappiness((prev) => prev + 1);
    } else {
      const interval = setInterval(() => {
        setHappiness((prev) => prev - 1);
      }, 10000);

      if (happiness <= 0) {
        setHappiness(0);
      }
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="buddyvision">
      <div className="interface">
        <div className="feeling-panel"></div>
        <div className="happiness-score">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className={`unit ${happiness > index ? "happy" : "sad"}`}
            />
          ))}
        </div>
      </div>
      <div className="buddy-background"></div>
    </div>
  );
};

export default Buddy;
