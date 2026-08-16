// A summer night sky: a dense generated starfield with depth, a faint
// Milky Way wash, quiet constellation networks, one warm North Star, and
// a rare shooting star. Deterministic (seeded) so server renders are stable.

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Star {
  x: number;
  y: number;
  r: number;
  o: number;
  warm: boolean;
  tw: string;
}

const rand = mulberry32(20260815);
const STARS: Star[] = Array.from({ length: 220 }, () => {
  const depth = rand(); // 0 = far, 1 = near
  return {
    x: Math.round(rand() * 10000) / 10,
    y: Math.round(rand() * 4800) / 10,
    r: Math.round((0.3 + depth * 0.9) * 100) / 100,
    o: Math.round((0.08 + depth * 0.45) * 100) / 100,
    warm: rand() < 0.08,
    tw: depth > 0.75 ? ['tw-1', 'tw-2', 'tw-3'][Math.floor(rand() * 3)] : '',
  };
});

const BRIGHT = [
  { x: 700, y: 90, r: 1.7, tw: 'tw-1' },
  { x: 846, y: 104, r: 1.3, tw: 'tw-3' },
  { x: 812, y: 178, r: 1.5, tw: 'tw-2' },
  { x: 648, y: 168, r: 1.2, tw: 'tw-3' },
  { x: 740, y: 208, r: 1.4, tw: 'tw-1' },
  { x: 716, y: 268, r: 1.1, tw: 'tw-2' },
  { x: 96, y: 300, r: 1.3, tw: 'tw-2' },
  { x: 172, y: 336, r: 1.6, tw: 'tw-1' },
  { x: 218, y: 288, r: 1.2, tw: 'tw-3' },
  { x: 252, y: 340, r: 1.3, tw: 'tw-2' },
  { x: 286, y: 372, r: 1.1, tw: 'tw-1' },
  { x: 438, y: 64, r: 1.5, tw: 'tw-2' },
  { x: 530, y: 388, r: 1.4, tw: 'tw-3' },
];

export default function Constellation() {
  return (
    <svg
      viewBox="0 0 1000 480"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="milky" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#AFC4DE" stopOpacity="0.10" />
          <stop offset="55%" stopColor="#AFC4DE" stopOpacity="0.045" />
          <stop offset="100%" stopColor="#AFC4DE" stopOpacity="0" />
        </radialGradient>
        <filter id="soften" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Milky Way band, diagonal across the sky */}
      <g filter="url(#soften)">
        <ellipse
          cx="560"
          cy="180"
          rx="520"
          ry="90"
          fill="url(#milky)"
          transform="rotate(-24 560 180)"
        />
        <ellipse
          cx="430"
          cy="250"
          rx="300"
          ry="50"
          fill="url(#milky)"
          transform="rotate(-24 430 250)"
        />
      </g>

      {/* generated starfield */}
      <g>
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            fill={s.warm ? '#E4D5B4' : '#C9D8EA'}
            opacity={s.o}
            className={s.tw || undefined}
          />
        ))}
      </g>

      {/* constellation networks: hairlines */}
      <g stroke="#3E5B84" strokeWidth="0.45" opacity="0.5" fill="none">
        <path d="M700 90 L764 128 L846 104 L812 178 L764 128" />
        <path d="M700 90 L648 168 L740 208 L812 178" />
        <path d="M740 208 L716 268" />
      </g>
      <g stroke="#385473" strokeWidth="0.4" opacity="0.4" fill="none">
        <path d="M96 300 Q140 318 172 336 Q216 358 252 340 L286 372" />
        <path d="M172 336 Q186 300 218 288" />
      </g>

      {/* named stars: soft halo behind each */}
      <g>
        {BRIGHT.map((s, i) => (
          <g key={i}>
            <circle cx={s.x} cy={s.y} r={s.r * 3.2} fill="#C9D8EA" opacity="0.08" />
            <circle cx={s.x} cy={s.y} r={s.r} fill="#D5E2F1" className={s.tw} />
          </g>
        ))}
      </g>

      {/* North Star */}
      <g>
        <circle cx="764" cy="128" r="7" fill="#E2C084" opacity="0.1" />
        <circle cx="764" cy="128" r="2.2" fill="#E2C084" className="tw-1" />
        <circle
          cx="764"
          cy="128"
          r="9"
          fill="none"
          stroke="#D8A75B"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </g>
    </svg>
  );
}
