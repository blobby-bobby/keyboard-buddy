import { useContext } from "react";
import { IsPlayingContext } from "../../utils/context/isPlayingContext";

const Buddy = () => {
  const { isPlaying } = useContext(IsPlayingContext);

  return <h2>{isPlaying ? `🎹 Playing` : `🤫 Silence`}</h2>;
};

export default Buddy;
