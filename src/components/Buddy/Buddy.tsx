import "./styles.css";
const Buddy = () => {
  return (
    <div className="buddyvision">
      <div className="interface">
        <div className="feeling-panel">
          <span>㋛</span>
        </div>
        <progress className="happiness-score" />
      </div>
    </div>
  );
};

export default Buddy;
