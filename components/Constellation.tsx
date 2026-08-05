// Decorative constellation field for the hero. Pure SVG, no JS.
// The ringed star is the North Star motif.
export default function Constellation() {
  return (
    <svg
      viewBox="0 0 900 420"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <g stroke="#3E5A7E" strokeWidth="0.8" opacity="0.65">
        <line x1="640" y1="70" x2="700" y2="105" />
        <line x1="700" y1="105" x2="775" y2="88" />
        <line x1="700" y1="105" x2="726" y2="176" />
        <line x1="726" y1="176" x2="800" y2="210" />
        <line x1="640" y1="70" x2="598" y2="140" />
        <line x1="598" y1="140" x2="726" y2="176" />
        <line x1="90" y1="300" x2="155" y2="330" />
        <line x1="155" y1="330" x2="228" y2="308" />
        <line x1="228" y1="308" x2="260" y2="360" />
      </g>
      <g fill="#B9CBE0">
        <circle cx="640" cy="70" r="3" />
        <circle cx="700" cy="105" r="4.5" />
        <circle cx="775" cy="88" r="2.5" />
        <circle cx="726" cy="176" r="3" />
        <circle cx="800" cy="210" r="2.5" />
        <circle cx="598" cy="140" r="2.5" />
        <circle cx="90" cy="300" r="2.5" />
        <circle cx="155" cy="330" r="3" />
        <circle cx="228" cy="308" r="2" />
        <circle cx="260" cy="360" r="2.5" />
        <circle cx="480" cy="45" r="1.5" opacity="0.6" />
        <circle cx="330" cy="90" r="1.5" opacity="0.5" />
        <circle cx="850" cy="140" r="1.5" opacity="0.6" />
        <circle cx="280" cy="230" r="1.5" opacity="0.4" />
        <circle cx="520" cy="330" r="1.5" opacity="0.5" />
        <circle cx="420" cy="180" r="1" opacity="0.4" />
      </g>
      <circle
        cx="700"
        cy="105"
        r="9"
        fill="none"
        stroke="#D8A75B"
        strokeWidth="1.2"
        className="animate-pulse-slow"
      />
    </svg>
  );
}
