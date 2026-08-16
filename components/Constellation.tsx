// Constellation field: geometric line networks with organic scatter.
// Three depth layers, per-star twinkle rhythms, one gold North Star.
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
        <circle cx="120" cy="60" r="0.9" opacity="0.25" />
        <circle cx="240" cy="150" r="0.8" opacity="0.2" />
        <circle cx="333" cy="47" r="1" opacity="0.3" />
        <circle cx="418" cy="210" r="0.8" opacity="0.2" />
        <circle cx="505" cy="90" r="0.9" opacity="0.25" />
        <circle cx="590" cy="300" r="0.8" opacity="0.2" />
        <circle cx="668" cy="55" r="1" opacity="0.28" />
        <circle cx="760" cy="330" r="0.9" opacity="0.22" />
        <circle cx="852" cy="250" r="0.8" opacity="0.2" />
        <circle cx="935" cy="70" r="0.9" opacity="0.25" />
        <circle cx="72" cy="340" r="0.8" opacity="0.2" />
        <circle cx="188" cy="420" r="0.9" opacity="0.22" />
        <circle cx="404" cy="388" r="0.8" opacity="0.2" />
        <circle cx="878" cy="420" r="0.9" opacity="0.22" />
        <circle cx="296" cy="290" r="0.8" opacity="0.18" />
        <circle cx="540" cy="430" r="0.8" opacity="0.18" />
      </g>

      {/* geometric network: angular, precise */}
      <g stroke="#41608A" strokeWidth="0.6" opacity="0.55" fill="none">
        <path d="M700 90 L764 128 L846 104 L812 178 L764 128" />
        <path d="M700 90 L648 168 L740 208 L812 178" />
        <path d="M740 208 L716 268" />
      </g>
      {/* organic thread: slight curves, looser */}
      <g stroke="#3A5578" strokeWidth="0.5" opacity="0.45" fill="none">
        <path d="M96 300 Q140 318 172 336 Q216 358 252 340 L286 372" />
        <path d="M172 336 Q186 300 218 288" />
      </g>
      {/* faint gold meridian */}
      <path
        d="M540 40 Q620 140 700 90"
        stroke="#D8A75B"
        strokeWidth="0.4"
        opacity="0.28"
        fill="none"
      />

      {/* bright stars on the networks */}
      <g fill="#C7D6E8">
        <circle cx="700" cy="90" r="2.4" className="tw-1" />
        <circle cx="846" cy="104" r="1.8" className="tw-3" />
        <circle cx="812" cy="178" r="2.2" className="tw-2" />
        <circle cx="648" cy="168" r="1.7" className="tw-3" />
        <circle cx="740" cy="208" r="2" className="tw-1" />
        <circle cx="716" cy="268" r="1.5" className="tw-2" />
        <circle cx="96" cy="300" r="1.8" className="tw-2" />
        <circle cx="172" cy="336" r="2.2" className="tw-1" />
        <circle cx="218" cy="288" r="1.6" className="tw-3" />
        <circle cx="252" cy="340" r="1.8" className="tw-2" />
        <circle cx="286" cy="372" r="1.5" className="tw-1" />
      </g>

      {/* four-point glints: geometric sparkle */}
      <g fill="#B9CBE0">
        <path className="tw-2" d="M438 120 l1.6 5.4 5.4 1.6 -5.4 1.6 -1.6 5.4 -1.6 -5.4 -5.4 -1.6 5.4 -1.6 z" opacity="0.7" />
        <path className="tw-3" d="M580 236 l1.2 4 4 1.2 -4 1.2 -1.2 4 -1.2 -4 -4 -1.2 4 -1.2 z" opacity="0.5" />
        <path className="tw-1" d="M920 180 l1.2 4 4 1.2 -4 1.2 -1.2 4 -1.2 -4 -4 -1.2 4 -1.2 z" opacity="0.6" />
      </g>

      {/* North Star */}
      <g>
        <circle cx="764" cy="128" r="3" fill="#E7C98F" className="tw-1" />
        <circle cx="764" cy="128" r="10" fill="none" stroke="#D8A75B" strokeWidth="0.8" opacity="0.8" className="animate-pulse-slow" />
        <path d="M764 110 v-10 M764 146 v10 M746 128 h-10 M782 128 h10" stroke="#D8A75B" strokeWidth="0.5" opacity="0.4" />
      </g>
    </svg>
  );
}
