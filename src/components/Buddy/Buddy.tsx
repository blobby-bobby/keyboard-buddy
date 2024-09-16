import { useContext, useEffect, useMemo } from "react";
import "./styles.css";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";
import idle from "../../assets/buddy_idle.gif";
import sad from "../../assets/buddy_sad.gif";
import dead from "../../assets/buddy-dead.png";
import sad_icon from "../../assets/sad-ui.png";

const Buddy = () => {
  const {
    isPlaying,
    happiness,
    decreaseHappiness,
    increaseHappiness,
    gameOver,
  } = useContext(BuddyPlayContext);

  useEffect(() => {
    if (isPlaying) {
      increaseHappiness();
    } else {
      const interval = setInterval(() => {
        decreaseHappiness();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const buddyFeeling = useMemo(() => {
    if (gameOver) return dead;
    return happiness < 3 ? sad : idle;
  }, [happiness]);

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
        <img src={buddyFeeling} alt="buddy" />
      </div>
    </div>
  );
};

export default Buddy;
