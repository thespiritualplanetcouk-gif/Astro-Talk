import type { PlanetPlacement, ZodiacPosition } from '../utils/astronomy';
import { ZODIAC_SIGNS } from '../data/zodiac';

interface BirthChartWheelProps {
  planets: PlanetPlacement[];
  ascendant?: ZodiacPosition | null;
}

export function BirthChartWheel({ planets, ascendant }: BirthChartWheelProps) {
  const cx = 210;
  const cy = 210;
  const outerR = 192;
  const signR = 158;
  const planetR = 122;
  const innerR = 72;

  // Orient chart so Ascendant (if known) sits at the left 9 o'clock horizon (180° screen angle)
  const ascLon = ascendant ? ascendant.longitude : 0;

  const lonToSvgAngle = (lon: number) => {
    // Counter-clockwise ecliptic starting from left horizon (180 deg)
    const relative = ((lon - ascLon) % 360 + 360) % 360;
    return ((180 - relative) * Math.PI) / 180;
  };

  return (
    <svg
      viewBox="0 0 420 420"
      className="w-full max-w-[420px] mx-auto"
      role="img"
      aria-label="Calculated Natal Birth Chart Wheel"
    >
      <circle cx={cx} cy={cy} r={outerR} fill="#091426" stroke="rgba(198,163,90,0.45)" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={signR} fill="rgba(12,48,40,0.28)" stroke="rgba(198,163,90,0.32)" strokeWidth="0.9" />
      <circle cx={cx} cy={cy} r={innerR} fill="#091426" stroke="rgba(198,163,90,0.38)" strokeWidth="0.9" />

      {/* 12 Zodiac sign boundaries & glyphs */}
      {ZODIAC_SIGNS.map((sign) => {
        const boundaryRad = lonToSvgAngle(sign.startDegree);
        const midRad = lonToSvgAngle(sign.startDegree + 15);

        const x1 = cx + innerR * Math.cos(boundaryRad);
        const y1 = cy + innerR * Math.sin(boundaryRad);
        const x2 = cx + outerR * Math.cos(boundaryRad);
        const y2 = cy + outerR * Math.sin(boundaryRad);

        const gx = cx + ((outerR + signR) / 2) * Math.cos(midRad);
        const gy = cy + ((outerR + signR) / 2) * Math.sin(midRad);

        return (
          <g key={sign.slug}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(198,163,90,0.22)" strokeWidth="0.7" />
            <text
              x={gx}
              y={gy}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#E5CD91"
              fontSize="14"
            >
              {sign.symbol}
            </text>
          </g>
        );
      })}

      {/* Horizon Ascendant / Descendant axis when Ascendant is computed */}
      {ascendant && (
        <g>
          <line
            x1={cx - outerR}
            y1={cy}
            x2={cx - innerR}
            y2={cy}
            stroke="#E5CD91"
            strokeWidth="1.6"
          />
          <line
            x1={cx + innerR}
            y1={cy}
            x2={cx + outerR}
            y2={cy}
            stroke="rgba(229,205,145,0.5)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x={cx - outerR + 18}
            y={cy - 10}
            fill="#E5CD91"
            fontSize="9"
            fontFamily="JetBrains Mono, monospace"
          >
            ASC
          </text>
        </g>
      )}

      {/* Calculated planetary glyphs plotted on real ecliptic longitude */}
      {planets.map((p, idx) => {
        const angle = lonToSvgAngle(p.position.longitude);
        // Slight radial staggering to avoid overlapping nearby planets
        const radialOffset = (idx % 3 - 1) * 14;
        const r = planetR + radialOffset;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        const tickX1 = cx + signR * Math.cos(angle);
        const tickY1 = cy + signR * Math.sin(angle);
        const tickX2 = cx + (signR - 6) * Math.cos(angle);
        const tickY2 = cy + (signR - 6) * Math.sin(angle);

        return (
          <g key={p.body}>
            <line x1={tickX1} y1={tickY1} x2={tickX2} y2={tickY2} stroke="#E5CD91" strokeWidth="1" />
            <circle cx={px} cy={py} r="11" fill="#0E1D36" stroke="rgba(198,163,90,0.6)" strokeWidth="0.9" />
            <text
              x={px}
              y={py}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#F6F2E9"
              fontSize="12"
            >
              {p.symbol}
            </text>
          </g>
        );
      })}

      {/* Center insignia */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="#E5CD91"
        fontSize="11"
        fontFamily="Cormorant Garamond, serif"
        letterSpacing="2"
      >
        NATAL CHART
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        fill="#A9B2BE"
        fontSize="8.5"
        fontFamily="JetBrains Mono, monospace"
      >
        VSOP87 TROPICAL
      </text>
    </svg>
  );
}
