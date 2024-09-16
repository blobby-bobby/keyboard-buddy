import { useContext, useEffect, useState } from "react";
import "./styles.css";
import { IsPlayingContext } from "../../utils/context/playWithBuddyContext";
import idle from "../../assets/buddy_idle.gif";
import sad from "../../assets/buddy_sad.gif";
import sad_icon from "../../assets/sad-ui.png";

const Buddy = () => {
  const { isPlaying } = useContext(IsPlayingContext);
  const [happiness, setHappiness] = useState(7);

  useEffect(() => {
    if (isPlaying) {
      console.log(happiness);
      setHappiness((prev) => prev + 1);

      if (happiness >= 8) {
        setHappiness(8);
      }
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
        <div className="feeling-panel">
          <img
            src={sad_icon}
            className={`${happiness < 3 ? "sad" : ""}`}
            alt="feeling-sad"
          />
        </div>
        <div className="happiness-score">
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className={`unit ${happiness > index ? "happy" : "sad"}`}
            />
          ))}
        </div>
      </div>
      <div className="buddy-background">
        <img src={happiness > 3 ? idle : sad} alt="buddy" />
      </div>
    </div>
  );
};

export default Buddy;
