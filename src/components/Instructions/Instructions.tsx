import { useCallback, useContext, useEffect, useState } from "react";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";

const Instructions = () => {
  const { gameOver } = useContext(BuddyPlayContext);

  const [animatedText, setAnimatedText] = useState("");
  const idleText =
    "Play with Buddy on the piano by clicking on the keys or using your keyboard to keep him happy!";
  const gameOverText = "Game Over! Press reset to play again and revive Buddy.";
  const [displayedText, setDisplayedText] = useState(idleText);

  // Animate text when the `displayedText` changes
  const animateText = useCallback(() => {
    let index = 0;
    setAnimatedText(""); // Clear previous animation
    const intervalId = setInterval(() => {
      if (index < displayedText.length) {
        setAnimatedText(displayedText.substring(0, index + 1)); // Update to substring
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 50);
    return () => clearInterval(intervalId);
  }, [displayedText]);

  useEffect(() => {
    if (gameOver) {
      setDisplayedText(gameOverText);
    } else {
      setDisplayedText(idleText);
    }
  }, [gameOver]);

  useEffect(() => {
    animateText();
  }, [displayedText, animateText]);

  return (
    <fieldset className="instructions">
      <legend>Buddy says</legend>

      <p>{animatedText}</p>
    </fieldset>
  );
};

export default Instructions;
