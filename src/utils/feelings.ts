import { KeyboardKey } from "./piano/pianoKeysMap";

// BUDDY FEELINGS
const eventsFeelings = {
  hungry: "hungry",
  dirty: "dirty",
  idle: "idle",
} as const;

export type EnumValue<T> = T[keyof T];
export type BuddyFeeling = EnumValue<typeof eventsFeelings>;

// MELODIES TO HANDLE BUDDY FEELINGS
export const buddyMelodies: Record<
  Exclude<BuddyFeeling, "idle">,
  KeyboardKey[]
> = {
  hungry: ["q", "z", "d", "f"],
  dirty: ["g", "l", "j", "k"],
} as const;
