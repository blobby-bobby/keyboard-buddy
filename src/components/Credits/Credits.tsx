import "./styles.css";

const Credits = () => {
  return (
    <details>
      <summary>About</summary>
      <ul>
        <li>
          This is Keybuddy <strong>version 1.0.0</strong>
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
