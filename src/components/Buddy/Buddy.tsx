import { useContext, useEffect, useMemo } from "react";
import "./styles.css";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";
import idle from "../../assets/buddy_idle.gif";
import sad from "../../assets/buddy_sad.gif";
import dead from "../../assets/buddy-dead.png";
import sad_icon from "../../assets/sad-ui.png";
import {
  LOWER_HAPPINESS_INTERVAL,
  MAX_INTERVAL,
  MIN_INTERVAL,
} from "../../utils/types";

const Buddy = () => {
  const {
    isPlaying,
    happiness,
    decreaseHappiness,
    increaseHappiness,
    gameOver,
    isSad,
    eventFeeling,
    setEventFeeling,
  } = useContext(BuddyPlayContext);

  // BUDDY EVENT HANDLERS
  const buddyGetsHungry = () => {
    setEventFeeling("hungry");
  };

  const buddyHungryEventRandomInterval = () => {
    if (gameOver) return;
    const randomInterval =
      Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) +
      MIN_INTERVAL;
    setTimeout(buddyGetsHungry, randomInterval);
  };

  useEffect(() => {
    const handleGameOver = () => {
      if (gameOver) {
        setEventFeeling("idle");
      }
    };

    const handleIsPlaying = () => {
      if (isPlaying) {
        increaseHappiness();
      } else {
        const interval = setInterval(() => {
          decreaseHappiness();
        }, LOWER_HAPPINESS_INTERVAL);
        return () => clearInterval(interval);
      }
    };

    handleGameOver();
    const intervalCleanup = handleIsPlaying();

    return () => {
      if (intervalCleanup) {
        intervalCleanup();
      }
    };
  }, [isPlaying, gameOver]);

  useEffect(() => {
    buddyHungryEventRandomInterval();
  });

  const buddyDisplay = useMemo(() => {
    if (gameOver) return dead;
    return happiness < 3 ? sad : idle;
  }, [happiness, gameOver]);

  if (eventFeeling === "hungry") {
    console.log("Buddy is hungry!");
  }

  return (
    <div className="buddyvision">
      <div className="interface">
        <div className="feeling-panel">
          <img
            src={sad_icon}
            className={`${isSad ? "sad" : ""}`}
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
        <img src={buddyDisplay} alt="buddy" />
      </div>
      <div className="interface-bottom">
        <span>{eventFeeling === "hungry" ? "🍗" : ""}</span>
        <span>{eventFeeling === "dirty" ? "💩" : ""}</span>
      </div>
    </div>
  );
};

export default Buddy;
