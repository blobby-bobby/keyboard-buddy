import Piano from "../Piano/Piano";
import Screen from "../Screen/Screen";
import "./style.css";

const Gameboy = () => {
  return (
    <div className="gameboy">
      <div className="gameboy-top">
        <div className="gameboy-top-stripes"></div>
      </div>
      <div className="gameboy-content">
        <Screen />
        <Piano />
      </div>
    </div>
  );
};

export default Gameboy;
