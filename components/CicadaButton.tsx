'use client';

import { useEffect, useRef, useState } from 'react';

// A northeastern summer night, synthesized live: distant cicada drone,
// spring peepers calling from different directions, and a soft bed of
// night air. Nothing loops, so it never repeats.
export default function CicadaButton() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  function buildNight(ctx: AudioContext, master: GainNode) {
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    // 1. night air: a soft, slowly breathing low wash
    {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf;
      src.loop = true;
      const low = ctx.createBiquadFilter();
      low.type = 'lowpass';
      low.frequency.value = 380;
      const g = ctx.createGain();
      g.gain.value = 0.05;
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05;
      const lfoDepth = ctx.createGain();
      lfoDepth.gain.value = 0.02;
      lfo.connect(lfoDepth);
      lfoDepth.connect(g.gain);
      src.connect(low);
      low.connect(g);
      g.connect(master);
      src.start();
      lfo.start();
    }

    // 2. distant cicada drone: two soft shimmering bands
    const cicadas = [
      { freq: 4100, q: 8, swellHz: 0.06, tremHz: 27, level: 0.28 },
      { freq: 5400, q: 10, swellHz: 0.04, tremHz: 36, level: 0.18 },
    ];
    for (const v of cicadas) {
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf;
      src.loop = true;
      const band = ctx.createBiquadFilter();
      band.type = 'bandpass';
      band.frequency.value = v.freq;
      band.Q.value = v.q;
      const voiceGain = ctx.createGain();
      voiceGain.gain.value = v.level * 0.5;
      const swell = ctx.createOscillator();
      swell.frequency.value = v.swellHz;
      const swellDepth = ctx.createGain();
      swellDepth.gain.value = v.level * 0.4;
      swell.connect(swellDepth);
      swellDepth.connect(voiceGain.gain);
      const trem = ctx.createGain();
      trem.gain.value = 0.85;
      const tremOsc = ctx.createOscillator();
      tremOsc.frequency.value = v.tremHz;
      const tremDepth = ctx.createGain();
      tremDepth.gain.value = 0.15;
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

    // 3. peepers: little rising chirps from around the field
    function peep(freq: number, pan: number, loud: number) {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 0.93, t);
      osc.frequency.exponentialRampToValueAtTime(freq, t + 0.1);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(loud, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      const p = ctx.createStereoPanner();
      p.pan.value = pan;
      osc.connect(g);
      g.connect(p);
      p.connect(master);
      osc.start(t);
      osc.stop(t + 0.28);
    }

    const peeperVoices = [
      { freq: 2450, pan: -0.7, base: 900 },
      { freq: 2700, pan: 0.6, base: 1150 },
      { freq: 2950, pan: -0.25, base: 1400 },
      { freq: 3150, pan: 0.85, base: 1750 },
    ];
    for (const v of peeperVoices) {
      const loop = () => {
        if (Math.random() < 0.82) {
          peep(v.freq * (0.98 + Math.random() * 0.04), v.pan, 0.028 + Math.random() * 0.018);
        }
        const next = v.base * (0.6 + Math.random() * 0.9);
        timersRef.current.push(setTimeout(loop, next));
      };
      timersRef.current.push(setTimeout(loop, Math.random() * 2000));
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
        soften.frequency.value = 6800;
        master.connect(soften);
        soften.connect(ctx.destination);
        masterRef.current = master;
        buildNight(ctx, master);
      }
      masterRef.current.gain.setTargetAtTime(0.16, ctx.currentTime, 1.8);
      setPlaying(true);
    } else {
      const ctx = ctxRef.current;
      if (ctx && masterRef.current) {
        masterRef.current.gain.setTargetAtTime(0, ctx.currentTime, 0.7);
      }
      setPlaying(false);
    }
  }

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
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
