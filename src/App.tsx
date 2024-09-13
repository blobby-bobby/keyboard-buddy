import Gameboy from "./components/Gameboy/Gameboy";
import { IsPlayingProvider } from "./utils/context/isPlayingContext";

function App() {
  return (
    <IsPlayingProvider>
      <p>Play with your keyboard</p>
      <Gameboy />
    </IsPlayingProvider>
  );
}

export default App;
