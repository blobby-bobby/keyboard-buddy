import { useContext } from "react";
import Gameboy from "./components/Gameboy/Gameboy";
import { BuddyPlayContext } from "./utils/context/playWithBuddyContext";

function App() {
  const { gameOver } = useContext(BuddyPlayContext);

  return (
    <>
      <p className="instructions">
        {gameOver ? (
          <>
            Game Over, press <kbd>Reset</kbd> to play again
          </>
        ) : (
          <>
            Press <kbd>q</kbd>, <kbd>s</kbd>, <kbd>d</kbd>, or{" "}
            <kbd>whatever</kbd> on the line of your keyboard to play music.
          </>
        )}
      </p>
      <Gameboy />
    </>
  );
}

export default App;
