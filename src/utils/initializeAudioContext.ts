import * as Tone from "tone";

let isAudioContextInitialized = false;

export const initializeAudioContext = async () => {
  if (!isAudioContextInitialized) {
    await Tone.start();
    isAudioContextInitialized = true;
  }
};
