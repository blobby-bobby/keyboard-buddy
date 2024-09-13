import "./styles.css";
const Buddy = () => {
  return (
    <div className="buddyvision">
      <div className="interface">
        <div className="feeling-panel">
          <span>㋛</span>
        </div>
        <progress className="happiness-score" value={10} max={10} />
      </div>
      <div className="buddy-background"></div>
    </div>
  );
};

export default Buddy;
