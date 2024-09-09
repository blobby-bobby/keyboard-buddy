import Buddy from "./components/Buddy/Buddy";
import Piano from "./components/Piano/Piano";
import { IsPlayingProvider } from "./utils/context/isPlayingContext";

function App() {
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
