// A single constellation: Ursa Minor, whose brightest star is Polaris.
// Minimal field, hairline connections, one gold North Star, a small
// engraved label. Restraint is the design.
export default function Constellation() {
  return (
    <svg
      viewBox="0 0 1000 480"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* a handful of distant companions, barely there */}
      <g fill="#8FA6C0">
        <circle cx="150" cy="120" r="0.8" opacity="0.14" />
        <circle cx="320" cy="330" r="0.7" opacity="0.12" />
        <circle cx="470" cy="80" r="0.8" opacity="0.15" />
        <circle cx="540" cy="400" r="0.7" opacity="0.1" />
        <circle cx="905" cy="330" r="0.8" opacity="0.13" />
        <circle cx="230" cy="430" r="0.7" opacity="0.1" />
        <circle cx="60" cy="260" r="0.7" opacity="0.12" />
      </g>

      {/* Ursa Minor: handle from Polaris down to the bowl */}
      <g stroke="#44618B" strokeWidth="0.5" opacity="0.55" fill="none">
        <path d="M790 88 L748 132 L706 170 L664 208" />
        <path d="M664 208 L600 232 L614 292 L682 272 L664 208" />
      </g>

      {/* the seven stars */}
      <g fill="#C3D2E5">
        <circle cx="748" cy="132" r="1.4" className="tw-2" />
        <circle cx="706" cy="170" r="1.2" className="tw-3" />
        <circle cx="664" cy="208" r="1.5" className="tw-1" />
        <circle cx="600" cy="232" r="1.3" className="tw-3" />
        <circle cx="614" cy="292" r="1.6" className="tw-2" />
        <circle cx="682" cy="272" r="1.7" className="tw-1" />
      </g>

      {/* Polaris */}
      <g>
        <circle cx="790" cy="88" r="8" fill="#E2C084" opacity="0.08" />
        <circle cx="790" cy="88" r="2.4" fill="#E2C084" className="tw-1" />
        <circle
          cx="790"
          cy="88"
          r="10"
          fill="none"
          stroke="#D8A75B"
          strokeWidth="0.5"
          opacity="0.4"
        />
      </g>

      {/* engraved label */}
      <text
        x="600"
        y="330"
        fill="#8FA6C0"
        opacity="0.4"
        fontSize="10"
        letterSpacing="4"
        fontFamily="var(--font-sans), sans-serif"
      >
        URSA MINOR
      </text>
    </svg>
  );
}
