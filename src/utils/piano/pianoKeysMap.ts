export const pianoKeys = [
  "A3",
  "A#3",
  "B3",
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

const qwerties = ["a", "w"];
const azerties = ["q", "z"];
const rest = ["s", "d", "r", "f", "t", "g", "h", "u", "j", "i", "k", "o", "l"];

const keyboardKeysAzerty = [...azerties, ...rest];
const keyboardKeysQwerty = [...qwerties, ...rest];

export const pianoKeysMapAzerty: Record<string, string> = pianoKeys.reduce(
  (acc: Record<string, string>, key, index) => {
    acc[keyboardKeysAzerty[index]] = key;
    return acc;
  },
  {}
);

export const pianoKeysMapQwerty: Record<string, string> = pianoKeys.reduce(
  (acc: Record<string, string>, key, index) => {
    acc[keyboardKeysQwerty[index]] = key;
    return acc;
  },
  {}
);
