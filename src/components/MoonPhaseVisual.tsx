interface MoonPhaseVisualProps {
  phaseAngle: number; // 0 = New Moon, 90 = First Quarter, 180 = Full Moon, 270 = Last Quarter
  size?: number;
}

export function MoonPhaseVisual({ phaseAngle, size = 84 }: MoonPhaseVisualProps) {
  const norm = ((phaseAngle % 360) + 360) % 360;
  const r = 42;
  const cx = 50;
  const cy = 50;

  // Calculate terminator ellipse x-radius using cos(phaseAngle)
  const rad = (norm * Math.PI) / 180;
  const rx = Math.abs(Math.cos(rad)) * r;

  // Lit side determination
  const isWaxing = norm <= 180;
  const isGibbous = norm > 90 && norm < 270;

  // Outer semicircle sweep (right half illuminated when waxing, left half when waning)
  const outerSweep = isWaxing ? 1 : 0;
  // Inner terminator arc sweep
  const innerSweep = isWaxing ? (isGibbous ? 1 : 0) : isGibbous ? 0 : 1;

  const litPath =
    norm < 2 || norm > 358
      ? ''
      : norm > 178 && norm < 182
        ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r} Z`
        : `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${outerSweep} ${cx} ${cy + r} A ${rx} ${r} 0 0 ${innerSweep} ${cx} ${cy - r} Z`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <radialGradient id="lunarGoldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F6F2E9" />
          <stop offset="75%" stopColor="#E5CD91" />
          <stop offset="100%" stopColor="#C6A35A" />
        </radialGradient>
      </defs>
      {/* Subtle orbital ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 5}
        fill="none"
        stroke="rgba(198,163,90,0.28)"
        strokeWidth="0.75"
        strokeDasharray="2 3"
      />
      {/* Shadowed lunar disc */}
      <circle cx={cx} cy={cy} r={r} fill="#0D1D36" stroke="rgba(198,163,90,0.35)" strokeWidth="1" />
      {/* Lit lunar hemisphere */}
      {litPath && <path d={litPath} fill="url(#lunarGoldGlow)" />}
    </svg>
  );
}
