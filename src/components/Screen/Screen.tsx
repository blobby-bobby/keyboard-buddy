import { useContext } from "react";
import { IsPlayingContext } from "../../utils/context/playWithBuddyContext";
import "./style.css";
import Buddy from "../Buddy/Buddy";

const Screen = () => {
  const { isPlaying } = useContext(IsPlayingContext);

  return (
    <>
      <div className="screen-wrapper">
        <div className="screen-decoration">
          <div className="decoration"></div>
          <div className="decoration"></div>
        </div>
        <div className="screen-display">
          <div className="light">
            <div className={`light-bulb ${isPlaying ? "on" : "off"}`}></div>
            <div className="light-label">Play</div>
          </div>
          <div className="screen">
            <Buddy />
          </div>
        </div>
      </div>
      <h1>Key Buddy</h1>
    </>
  );
};

export default Screen;
