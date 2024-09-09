import { useContext, useEffect } from "react";
import Buddy from "./components/Buddy/Buddy";
import Piano from "./components/Piano/Piano";
import {
  IsPlayingContext,
  IsPlayingProvider,
} from "./utils/context/isPlayingContext";

function App() {
  const { isPlaying } = useContext(IsPlayingContext);

  useEffect(() => {
    if (isPlaying) {
      const title = "M U S I C 🎹";
      let index = 0;

      const interval = setInterval(() => {
        document.title = title.slice(0, index + 1);
        index++;
        if (index >= title.length) index = 0;
      }, 250);

      return () => clearInterval(interval);
    } else {
      document.title = "The sound of silence...";
    }
  }, [isPlaying]);

  return (
    <IsPlayingProvider>
      <h1>Keyboard Buddy</h1>
      ----
      <Buddy />
      ----
      <progress value={9} max={10} />
      -----
      <Piano />
    </IsPlayingProvider>
  );
}

export default App;
