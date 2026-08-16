'use client';

import { useEffect, useRef, useState } from 'react';

// A synthesized cicada chorus: band-filtered noise with slow swells and a
// fast tremolo, layered at two pitches so it never audibly repeats.
export default function CicadaButton() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  function buildChorus(ctx: AudioContext, master: GainNode) {
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const voices = [
      { freq: 4300, q: 9, swellHz: 0.11, tremHz: 31, level: 0.5 },
      { freq: 5700, q: 11, swellHz: 0.07, tremHz: 42, level: 0.35 },
      { freq: 3400, q: 8, swellHz: 0.05, tremHz: 26, level: 0.25 },
    ];

    for (const v of voices) {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf;
      src.loop = true;

      const band = ctx.createBiquadFilter();
      band.type = 'bandpass';
      band.frequency.value = v.freq;
      band.Q.value = v.q;

      const voiceGain = ctx.createGain();
      voiceGain.gain.value = 0;

      // slow swell: rises and falls like a chorus section joining in
      const swell = ctx.createOscillator();
      swell.frequency.value = v.swellHz;
      const swellDepth = ctx.createGain();
      swellDepth.gain.value = v.level * 0.5;
      swell.connect(swellDepth);
      swellDepth.connect(voiceGain.gain);
      voiceGain.gain.value = v.level * 0.55;

      // fast tremolo: the cicada's rattle
      const trem = ctx.createGain();
      trem.gain.value = 0.75;
      const tremOsc = ctx.createOscillator();
      tremOsc.frequency.value = v.tremHz;
      const tremDepth = ctx.createGain();
      tremDepth.gain.value = 0.25;
      tremOsc.connect(tremDepth);
      tremDepth.connect(trem.gain);

      src.connect(band);
      band.connect(trem);
      trem.connect(voiceGain);
      voiceGain.connect(master);

      src.start();
      swell.start();
      tremOsc.start();
    }
  }

  function toggle() {
    if (!playing) {
      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      void ctx.resume();
      if (!masterRef.current) {
        const master = ctx.createGain();
        master.gain.value = 0;
        const soften = ctx.createBiquadFilter();
        soften.type = 'lowpass';
        soften.frequency.value = 7500;
        master.connect(soften);
        soften.connect(ctx.destination);
        masterRef.current = master;
        buildChorus(ctx, master);
      }
      masterRef.current.gain.setTargetAtTime(0.12, ctx.currentTime, 1.2);
      setPlaying(true);
    } else {
      const ctx = ctxRef.current;
      if (ctx && masterRef.current) {
        masterRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      }
      setPlaying(false);
    }
  }

  useEffect(() => {
    return () => {
      void ctxRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Turn off night sounds' : 'Play night sounds'}
      title={playing ? 'Night sounds off' : 'Night sounds'}
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-500 ${
        playing
          ? 'border-star bg-night/70 text-star shadow-lg shadow-star/20'
          : 'border-star/40 bg-night/50 text-star/70 hover:border-star/80 hover:text-star'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
        <path d="M4 14 Q7 9 12 9 Q17 9 20 14" />
        <path d="M6.5 15.5 Q9 12 12 12 Q15 12 17.5 15.5" opacity="0.7" />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      {playing && (
        <span
          className="absolute inset-0 animate-pulse-slow rounded-full border border-star/40"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
