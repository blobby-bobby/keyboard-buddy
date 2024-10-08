import "./styles.css";
import packageJson from "../../../package.json";
import { BuddyPlayContext } from "../../utils/context/playWithBuddyContext";
import { useContext } from "react";

const Credits = () => {
  const { isQwerty, switchToQwerty } = useContext(BuddyPlayContext);

  return (
    <aside className="credits">
      {/* QWERTY/AZERTY SECTION */}
      <details>
        <summary>
          Switch to <strong>{isQwerty ? "Azerty" : "Qwerty"}</strong> ?
        </summary>
        <ul className="ff-like-menu">
          <li>
            <button
              type="button"
              title={`Switch to ${isQwerty ? "Azerty" : "Qwerty"}`}
              onClick={switchToQwerty}
            >
              Yes
            </button>
          </li>
          <li>
            <button type="button" title="huhu this button is no use ^^">
              No
            </button>
          </li>
        </ul>
      </details>

      {/* ABOUT SECTION */}
      <details>
        <summary>About</summary>
        <ul>
          <li>
            This is Keybuddy <strong>version {packageJson.version}</strong>
          </li>
          <li>
            Created by{" "}
            <a href="https://github.com/blobby-bobby" target="_blank">
              blobby-bobby
            </a>
          </li>
          <li>
            Feel free to check out the{" "}
            <a
              href="https://github.com/blobby-bobby/keyboard-buddy"
              target="_blank"
            >
              Source code
            </a>
          </li>
        </ul>
      </details>
    </aside>
  );
};

export default Credits;
