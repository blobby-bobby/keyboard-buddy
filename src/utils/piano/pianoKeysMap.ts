import { EnumValue } from "../types";

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

export const keyboardKeys = [
  "q",
  "z",
  "s",
  "d",
  "r",
  "f",
  "t",
  "g",
  "h",
  "u",
  "j",
  "i",
  "k",
  "o",
  "l",
] as const;

export type KeyboardKey = EnumValue<typeof keyboardKeys>;

export const pianoKeysMap: Record<string, string> = pianoKeys.reduce(
  (acc: Record<string, string>, key, index) => {
    acc[keyboardKeys[index]] = key;
    return acc;
  },
  {}
);
