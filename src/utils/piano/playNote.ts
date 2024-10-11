import * as Tone from "tone";
import { pianoKeysMapAzerty, pianoKeysMapQwerty } from "./pianoKeysMap";

/**
 * Plays a note on the piano based on the provided key.
 *
 * @param {string} key - The key on the piano to play.
 * @param {boolean} isQwerty - Indicates if the keyboard layout is QWERTY.
 * @return {void}
 */
export const playNote = (key: string, isQwerty: boolean): void => {
  const note = isQwerty ? pianoKeysMapQwerty[key] : pianoKeysMapAzerty[key];
  const synth = new Tone.Synth().toDestination();
  const duration = "8n";

  // Play note
  synth.triggerAttack(note);

  // Release note
  Tone.getTransport().scheduleOnce((time) => {
    synth.triggerRelease(time);
  }, `+${Tone.Time(duration).toSeconds()}`);

  if (Tone.getTransport().state !== "started") {
    Tone.getTransport().start();
  }
};
