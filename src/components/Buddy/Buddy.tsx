import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { IsPlayingContext } from "../../utils/context/playWithBuddyContext";
const Buddy = () => {
  const { isPlaying } = useContext(IsPlayingContext);
  const [happiness, setHappiness] = useState(7);

  useEffect(() => {
    if (isPlaying) {
      setHappiness((prev) => prev + 1);
    } else {
      const interval = setInterval(() => {
        setHappiness((prev) => prev - 1);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="buddyvision">
      <div className="interface">
        <div className="feeling-panel">
          <span>㋛</span>
        </div>
        <meter className="happiness-score" value={happiness} max={10} />
      </div>
      <div className="buddy-background"></div>
    </div>
  );
};

export default Buddy;
