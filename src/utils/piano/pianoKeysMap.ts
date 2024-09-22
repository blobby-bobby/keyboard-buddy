export const pianoKeys = [
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
];

export const keyboardKeys = [
  "q",
  "z",
  "s",
  "e",
  "d",
  "r",
  "f",
  "g",
  "y",
  "h",
  "u",
  "j",
];

export const pianoKeysMap: Record<string, string> = pianoKeys.reduce(
  (acc: Record<string, string>, key, index) => {
    acc[keyboardKeys[index]] = key;
    return acc;
  },
  {}
);
