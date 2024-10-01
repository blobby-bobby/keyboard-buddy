import { useCallback, useContext, useEffect, useMemo } from "react";
import "./styles.css";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";
import idle from "../../assets/buddy_idle.gif";
import hungry from "../../assets/buddy_hungry.gif";
import dirty from "../../assets/buddy_dirty.gif";
import sad from "../../assets/buddy_sad.gif";
import dead from "../../assets/buddy-dead.png";
import sad_icon from "../../assets/sad-ui.svg";
import hunger_icon from "../../assets/hunger_ui.svg";
import poop_icon from "../../assets/poop_ui.svg";
import {
  LOWER_HAPPINESS_INTERVAL,
  RANDOM_INTERVAL,
} from "../../utils/intervals";

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
    buddyGetsHungry,
    buddyGetsDirty,
  } = useContext(BuddyPlayContext);

  // BUDDY EVENT HANDLERS
  const buddyEventRandomInterval = useCallback(() => {
    const interval = setTimeout(() => {
      if (Math.random() > 0.5) {
        buddyGetsHungry();
      } else {
        buddyGetsDirty();
      }
    }, RANDOM_INTERVAL);
    return () => clearTimeout(interval);
  }, [buddyGetsHungry, buddyGetsDirty]);

  useEffect(() => {
    if (eventFeeling === "idle") {
      const intervalCleanup = buddyEventRandomInterval();
      return () => {
        if (intervalCleanup) {
          intervalCleanup();
        }
      };
    }
  }, [eventFeeling, buddyEventRandomInterval]);

  useEffect(() => {
    const handleGameOver = () => {
      if (gameOver) setEventFeeling("idle");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, gameOver]);

  useEffect(() => {
    buddyEventRandomInterval();
  }, [buddyEventRandomInterval, gameOver]);

  // BUDDY SPRITE ON SCREEN
  // TODO: Add dirty buddy sprite
  const buddyDisplay = useMemo(() => {
    if (eventFeeling === "dirty") return dirty;
    if (eventFeeling === "hungry") return hungry;
    if (gameOver) return dead;
    return happiness < 3 ? sad : idle;
  }, [happiness, gameOver, eventFeeling]);

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
        <img
          src={hunger_icon}
          className={`event ${eventFeeling === "hungry" ? "on" : "off"}`}
          alt="hunger"
        />
        <img
          src={poop_icon}
          className={`event ${eventFeeling === "dirty" ? "on" : "off"}`}
          alt="hygiene"
        />
      </div>
    </div>
  );
};

export default Buddy;
