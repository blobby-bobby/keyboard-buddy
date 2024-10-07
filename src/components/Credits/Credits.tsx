import "./styles.css";
import packageJson from "../../../package.json";

const Credits = () => {
  return (
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
  );
};

export default Credits;
