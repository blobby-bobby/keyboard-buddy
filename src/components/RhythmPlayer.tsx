import { useState, useEffect } from "react";
import testRythm from "../assets/test-rythm/rock1.mp3";

const RhythmPlayer = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [bufferSource, setBufferSource] =
    useState<AudioBufferSourceNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadAudio = async (audioCtx: AudioContext) => {
    const response = await fetch(testRythm);
    const arrayBuffer = await response.arrayBuffer();
    return await audioCtx.decodeAudioData(arrayBuffer);
  };

  const startAudio = async () => {
    const audioCtx = new (window.AudioContext || window.AudioContext)();
    const audioBuffer = await loadAudio(audioCtx);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.loop = true;
    source.connect(audioCtx.destination);
    source.start(0);

    setAudioContext(audioCtx);
    setBufferSource(source);
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (bufferSource) {
      bufferSource.stop();
      setBufferSource(null);
    }
    if (audioContext) {
      audioContext.close();
      setAudioContext(null);
    }
    setIsPlaying(false);
  };

  const handleButtonClick = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <>
      <audio loop>
        <source src={testRythm} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div>
        <button onClick={handleButtonClick}>Rock 1</button>
      </div>
    </>
  );
};

export default RhythmPlayer;
