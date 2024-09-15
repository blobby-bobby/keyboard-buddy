import Gameboy from "./components/Gameboy/Gameboy";
import { IsPlayingProvider } from "./utils/context/playWithBuddyContext";

function App() {
  return (
    <IsPlayingProvider>
      <p className="instructions">
        Press <kbd>q</kbd>, <kbd>s</kbd>, <kbd>d</kbd>, or <kbd>whatever</kbd>{" "}
        on the line of your keyboard to play music.
      </p>
      <Gameboy />
    </IsPlayingProvider>
  );
}

export default App;
