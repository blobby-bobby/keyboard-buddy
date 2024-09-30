import { useCallback, useContext, useEffect, useState } from "react";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";
import "./style.css";
import { pianoKeysMap } from "../../utils/piano/pianoKeysMap";
import { buddyMelodies } from "../../utils/feelings";
import note from "../../assets/note.svg";
import cleDeSol from "../../assets/cle_sol.png";

const Instructions = () => {
  const { gameOver, eventFeeling, eventMelody } = useContext(BuddyPlayContext);

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

      <section className="melodic-panel">
        <img className="cle-de-sol" src={cleDeSol} alt="" />
        <div className="melody">
          {eventFeeling === "hungry" &&
            buddyMelodies.hungry.map((key, index) => (
              <div
                key={String(key)}
                className={`note ${
                  String(key) === eventMelody[index] ? "on" : "off"
                }`}
              >
                <kbd>{String(key)}</kbd>
                <img src={note} alt="" />
                <span>{pianoKeysMap[String(key)]}</span>
              </div>
            ))}
        </div>
        <div className="partition">
          <hr />
          <hr />
          <hr />
          <hr />
          <hr />
        </div>
      </section>
    </fieldset>
  );
};

export default Instructions;
