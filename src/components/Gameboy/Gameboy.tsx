import Piano from "../Piano/Piano";
import Screen from "../Screen/Screen";
import "./styles.css";

const Gameboy = () => {
  return (
    <div className="gameboy">
      <div className="gameboy-top">
        <div className="gameboy-top-stripes"></div>
      </div>
      <div className="gameboy-content">
        <Screen />
        <Piano />

        <div className="gameboy-bottom">
          <div className="button-down">
            <p>Reset</p>
            <button className="reset" type="button"></button>
          </div>

          <div className="speakers">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="speaker-line"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gameboy;
