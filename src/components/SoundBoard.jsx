import { useState, useRef, useCallback } from 'react';

let audioCtx = null;
const getCtx = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
};

const synth = {
  laser(ctx, t) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.4);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.5);
  },
  jump(ctx, t) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, t);
    osc.frequency.exponentialRampToValueAtTime(900, t + 0.15);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.3);
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.35);
  },
  blip(ctx, t) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.setValueAtTime(1100, t + 0.05);
    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t); osc.stop(t + 0.12);
  },
  chime(ctx, t) {
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.12);
      gain.gain.setValueAtTime(0, t + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.2, t + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t + i * 0.12); osc.stop(t + i * 0.12 + 0.5);
    });
  },
  pad(ctx, t) {
    const oscs = [220, 330, 440].map((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.3);
      gain.gain.setValueAtTime(0.08, t + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t); osc.stop(t + 2);
      return osc;
    });
  },
  click(ctx, t) {
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(0.3, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    source.connect(gain).connect(ctx.destination);
    source.start(t);
  },
};

const sounds = [
  { id: 1, name: 'Synth Laser', key: 'Q', play: (ctx, t) => synth.laser(ctx, t) },
  { id: 2, name: 'Retro Jump', key: 'W', play: (ctx, t) => synth.jump(ctx, t) },
  { id: 3, name: '8-Bit Blip', key: 'E', play: (ctx, t) => synth.blip(ctx, t) },
  { id: 4, name: 'Cyber Chime', key: 'R', play: (ctx, t) => synth.chime(ctx, t) },
  { id: 5, name: 'Ambient Pad', key: 'T', play: (ctx, t) => synth.pad(ctx, t) },
  { id: 6, name: 'Tech Click', key: 'Y', play: (ctx, t) => synth.click(ctx, t) },
];

const Soundboard = () => {
  const [activeId, setActiveId] = useState(null);
  const timersRef = useRef({});

  const playSound = useCallback((id, playFn) => {
    const ctx = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    if (timersRef.current[id]) clearTimeout(timersRef.current[id]);
    playFn(ctx, ctx.currentTime);
    setActiveId(id);
    timersRef.current[id] = setTimeout(() => setActiveId(null), 600);
  }, []);

  const handleKeyDown = useCallback((e) => {
    const sound = sounds.find((s) => s.key === e.key.toUpperCase());
    if (sound) playSound(sound.id, sound.play);
  }, [playSound]);

  return (
    <div className="soundboard" onKeyDown={handleKeyDown} tabIndex={0}>
      <header className="soundboard-header">
        <h1>
          <span className="glitch" data-text="NEON_PADS">NEON_PADS</span>
          <span className="subtitle">// AUDIO_MATRIX</span>
        </h1>
        <p>Click a pad or press a key (<kbd>Q</kbd>–<kbd>Y</kbd>)</p>
      </header>

      <div className="pad-grid">
        {sounds.map((sound) => {
          const isActive = activeId === sound.id;
          return (
            <button
              key={sound.id}
              className={`sound-pad ${isActive ? 'playing' : ''}`}
              onClick={() => playSound(sound.id, sound.play)}
            >
              <span className="pad-key">{sound.key}</span>
              <span className="pad-name">{sound.name}</span>
              <span className="pad-indicator">{isActive ? '▸ PLAYING' : '▸ READY'}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Soundboard;
