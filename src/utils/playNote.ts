import * as Tone from "tone";
import { pianoKeysMap } from "./pianoKeysMap";

/**
 * Plays a note on the piano based on the provided key.
 *
 * @param {string} key - The key on the piano to play.
 * @return {void}
 */
export const playNote = (key: string): void => {
  const note = pianoKeysMap[key];

  // Synth setup
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
