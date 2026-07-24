// Pure CSS animation (see .heart-beat / .heart-glow in globals.css) so the
// beat runs on the compositor at full display refresh in every browser.
export function AnimatedHeart({ bpm }: { bpm: number }) {
  const beatDuration = `${60 / bpm}s`;

  return (
    <div className="relative" style={{ width: 100, height: 100 }}>
      <div
        aria-hidden="true"
        className="heart-glow absolute inset-2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255, 107, 107, 0.5), transparent 70%)",
          animationDuration: beatDuration
        }}
      />
      <svg
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        className="heart-beat relative block"
        style={{ animationDuration: beatDuration }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#heartGradient)"
        />
        <defs>
          <linearGradient
            id="heartGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#FFC3C3" />
          </linearGradient>
          <radialGradient
            id="heartShade"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
          </radialGradient>
        </defs>
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#heartShade)"
          fillOpacity="0.5"
        />
      </svg>
    </div>
  );
}
