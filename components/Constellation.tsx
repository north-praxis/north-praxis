// Constellation field: dots and hairlines only. Geometric networks with
// organic scatter, kept quiet. One warm North Star with a single ring.
export default function Constellation() {
  return (
    <svg
      viewBox="0 0 1000 480"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {/* far field: faint organic scatter */}
      <g fill="#8FA6C0">
        <circle cx="120" cy="60" r="0.8" opacity="0.2" />
        <circle cx="240" cy="150" r="0.7" opacity="0.16" />
        <circle cx="333" cy="47" r="0.9" opacity="0.22" />
        <circle cx="418" cy="210" r="0.7" opacity="0.16" />
        <circle cx="505" cy="90" r="0.8" opacity="0.2" />
        <circle cx="590" cy="300" r="0.7" opacity="0.15" />
        <circle cx="668" cy="55" r="0.9" opacity="0.2" />
        <circle cx="760" cy="330" r="0.8" opacity="0.16" />
        <circle cx="852" cy="250" r="0.7" opacity="0.15" />
        <circle cx="935" cy="70" r="0.8" opacity="0.18" />
        <circle cx="72" cy="340" r="0.7" opacity="0.15" />
        <circle cx="188" cy="420" r="0.8" opacity="0.16" />
        <circle cx="404" cy="388" r="0.7" opacity="0.14" />
        <circle cx="878" cy="420" r="0.8" opacity="0.16" />
        <circle cx="296" cy="290" r="0.7" opacity="0.13" />
        <circle cx="540" cy="430" r="0.7" opacity="0.13" />
        <circle cx="438" cy="120" r="0.9" opacity="0.22" />
        <circle cx="580" cy="236" r="0.7" opacity="0.16" />
        <circle cx="920" cy="180" r="0.8" opacity="0.18" />
      </g>

      {/* geometric network: angular, precise */}
      <g stroke="#3B577E" strokeWidth="0.45" opacity="0.45" fill="none">
        <path d="M700 90 L764 128 L846 104 L812 178 L764 128" />
        <path d="M700 90 L648 168 L740 208 L812 178" />
        <path d="M740 208 L716 268" />
      </g>
      {/* organic thread: slight curves, looser */}
      <g stroke="#35506F" strokeWidth="0.4" opacity="0.35" fill="none">
        <path d="M96 300 Q140 318 172 336 Q216 358 252 340 L286 372" />
        <path d="M172 336 Q186 300 218 288" />
      </g>

      {/* stars on the networks */}
      <g fill="#AEC2D9">
        <circle cx="700" cy="90" r="1.7" className="tw-1" />
        <circle cx="846" cy="104" r="1.3" className="tw-3" />
        <circle cx="812" cy="178" r="1.5" className="tw-2" />
        <circle cx="648" cy="168" r="1.2" className="tw-3" />
        <circle cx="740" cy="208" r="1.4" className="tw-1" />
        <circle cx="716" cy="268" r="1.1" className="tw-2" />
        <circle cx="96" cy="300" r="1.3" className="tw-2" />
        <circle cx="172" cy="336" r="1.6" className="tw-1" />
        <circle cx="218" cy="288" r="1.2" className="tw-3" />
        <circle cx="252" cy="340" r="1.3" className="tw-2" />
        <circle cx="286" cy="372" r="1.1" className="tw-1" />
      </g>

      {/* North Star: a warmer dot, one quiet ring */}
      <g>
        <circle cx="764" cy="128" r="2.2" fill="#E2C084" className="tw-1" />
        <circle
          cx="764"
          cy="128"
          r="8"
          fill="none"
          stroke="#D8A75B"
          strokeWidth="0.5"
          opacity="0.45"
        />
      </g>
    </svg>
  );
}
