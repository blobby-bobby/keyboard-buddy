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
          <div className="buttons-down">
            <div className="button-down">
              <button className="reset" type="button"></button>
              <p>Reset</p>
            </div>
            <div className="button-down">
              <button className="option" type="button"></button>
              <p>option</p>
            </div>
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
