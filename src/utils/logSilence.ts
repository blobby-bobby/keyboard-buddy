const silenceLogStyles = [
  "background: darkblue",
  "color: white",
  "display: block",
  "text-align: center",
].join(";");

export const logSilence = (): void => {
  console.info("%c The sound of silence...(︶З︶✽)", silenceLogStyles);
};
