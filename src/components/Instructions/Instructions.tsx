import { useCallback, useContext, useEffect, useState } from "react";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";
import "./style.css";

const Instructions = () => {
  const { gameOver, eventFeeling } = useContext(BuddyPlayContext);

  const [animatedText, setAnimatedText] = useState("");
  const idleText =
    "Play with me on the piano by clicking on the keys or using your keyboard to keep me happy!";
  const gameOverText = "Game Over! Press reset to play again and revive me.";
  const hungryBuddyText = "I'm hungry! Play the melody of chicken to feed me.";
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
    } else if (eventFeeling === "hungry") {
      setDisplayedText(hungryBuddyText);
    } else {
      setDisplayedText(idleText);
    }
  }, [gameOver, eventFeeling]);

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
