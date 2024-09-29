import { KeyboardKey } from "./piano/pianoKeysMap";

// BUDDY FEELINGS
const eventsFeelings = {
  hungry: "hungry",
  dirty: "dirty",
  idle: "idle",
} as const;

export type EnumValue<T> = T[keyof T];
export type BuddyFeeling = EnumValue<typeof eventsFeelings>;

// TIMER INTERVALS
export const MIN_INTERVAL = 0.1 * 60 * 1000; // 1 minute
export const MAX_INTERVAL = 0.2 * 60 * 1000; // 2 minutes
export const LOWER_HAPPINESS_INTERVAL = 5000; // Decrease happiness every 20 seconds
export const RANDOM_INTERVAL =
  Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL; // Random interval between 1 and 2 minutes

// MELODIES TO HANDLE BUDDY FEELINGS
export const buddyMelodies: Record<
  Exclude<BuddyFeeling, "idle">,
  KeyboardKey[]
> = {
  hungry: ["q", "z", "d"],
  dirty: ["g", "h", "j"],
} as const;
