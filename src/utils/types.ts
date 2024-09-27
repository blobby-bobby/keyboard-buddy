// BUDDY FEELINGS
const eventsFeelings = {
  hungry: "hungry",
  dirty: "dirty",
  idle: "idle",
} as const;

type EnumValue<T> = T[keyof T];
export type BuddyFeeling = EnumValue<typeof eventsFeelings>;

// TIMER INTERVALS
export const MIN_INTERVAL = 1 * 60 * 1000; // 1 minute
export const MAX_INTERVAL = 2 * 60 * 1000; // 2 minutes
export const LOWER_HAPPINESS_INTERVAL = 10000; // Decrease happiness every 10 seconds
