import { ZODIAC_SIGNS } from '../data/zodiac';
import { useLanguage } from '../context/LanguageContext';

interface ZodiacWheelProps {
  selectedSlug: string;
  onSelect: (slug: string) => void;
  size?: 'hero' | 'interactive';
}

export function ZodiacWheel({ selectedSlug, onSelect, size = 'interactive' }: ZodiacWheelProps) {
  const { loc } = useLanguage();
  const isHero = size === 'hero';
  const selected = ZODIAC_SIGNS.find((z) => z.slug === selectedSlug) ?? ZODIAC_SIGNS[0];

  const cx = 220;
  const cy = 220;
  const outerR = 198;
  const midR = 152;
  const innerR = 104;

  return (
    <div className="relative mx-auto w-full max-w-[440px] aspect-square select-none">
      {/* Ambient radial gold/emerald glow behind wheel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-8 rounded-full bg-radial from-[#C6A35A]/14 via-[#0C3028]/25 to-transparent blur-2xl"
      />

      <svg
        viewBox="0 0 440 440"
        className="relative z-10 w-full h-full overflow-visible"
        role="img"
        aria-label="Interactive Zodiac Wheel"
      >
        {/* Outer slowly rotating celestial degree ticks */}
        <g className={isHero ? 'origin-center animate-orbit-slow' : 'origin-center'}>
          <circle
            cx={cx}
            cy={cy}
            r={outerR + 12}
            fill="none"
            stroke="rgba(198,163,90,0.22)"
            strokeWidth="0.75"
            strokeDasharray="2 6"
          />
          {Array.from({ length: 72 }).map((_, i) => {
            const angle = (i * 5 * Math.PI) / 180;
            const len = i % 6 === 0 ? 8 : 3.5;
            const x1 = cx + Math.cos(angle) * (outerR + 2);
            const y1 = cy + Math.sin(angle) * (outerR + 2);
            const x2 = cx + Math.cos(angle) * (outerR + 2 + len);
            const y2 = cy + Math.sin(angle) * (outerR + 2 + len);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={i % 6 === 0 ? 'rgba(229,205,145,0.6)' : 'rgba(198,163,90,0.25)'}
                strokeWidth={i % 6 === 0 ? '1' : '0.6'}
              />
            );
          })}
        </g>

        {/* Main concentric architectural rings */}
        <circle cx={cx} cy={cy} r={outerR} fill="rgba(9,20,38,0.55)" stroke="rgba(198,163,90,0.4)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={midR} fill="none" stroke="rgba(198,163,90,0.28)" strokeWidth="0.85" />
        <circle cx={cx} cy={cy} r={innerR} fill="rgba(12,48,40,0.42)" stroke="rgba(198,163,90,0.35)" strokeWidth="0.9" />

        {/* Subtle Islamic 8-pointed star geometry in center */}
        <g className="origin-center animate-orbit-reverse" opacity="0.26">
          <rect
            x={cx - 56}
            y={cy - 56}
            width="112"
            height="112"
            fill="none"
            stroke="#C6A35A"
            strokeWidth="0.7"
          />
          <rect
            x={cx - 56}
            y={cy - 56}
            width="112"
            height="112"
            fill="none"
            stroke="#C6A35A"
            strokeWidth="0.7"
            transform={`rotate(45 ${cx} ${cy})`}
          />
        </g>

        {/* 12 Interactive Zodiac Sectors */}
        {ZODIAC_SIGNS.map((sign, idx) => {
          const startAngleDeg = idx * 30 - 90;
          const endAngleDeg = startAngleDeg + 30;
          const midAngleRad = ((startAngleDeg + 15) * Math.PI) / 180;
          const startRad = (startAngleDeg * Math.PI) / 180;
          const endRad = (endAngleDeg * Math.PI) / 180;

          const x1Out = cx + outerR * Math.cos(startRad);
          const y1Out = cy + outerR * Math.sin(startRad);
          const x2Out = cx + outerR * Math.cos(endRad);
          const y2Out = cy + outerR * Math.sin(endRad);

          const x1In = cx + midR * Math.cos(endRad);
          const y1In = cy + midR * Math.sin(endRad);
          const x2In = cx + midR * Math.cos(startRad);
          const y2In = cy + midR * Math.sin(startRad);

          const pathD = [
            `M ${x1Out} ${y1Out}`,
            `A ${outerR} ${outerR} 0 0 1 ${x2Out} ${y2Out}`,
            `L ${x1In} ${y1In}`,
            `A ${midR} ${midR} 0 0 0 ${x2In} ${y2In}`,
            'Z',
          ].join(' ');

          const glyphR = (outerR + midR) / 2;
          const gx = cx + glyphR * Math.cos(midAngleRad);
          const gy = cy + glyphR * Math.sin(midAngleRad);

          const degX = cx + (midR - 22) * Math.cos(midAngleRad);
          const degY = cy + (midR - 22) * Math.sin(midAngleRad);

          const isActive = sign.slug === selectedSlug;

          return (
            <g
              key={sign.slug}
              onClick={() => onSelect(sign.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(sign.slug);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={loc(sign.name)}
              className="cursor-pointer group focus:outline-none"
            >
              <path
                d={pathD}
                fill={isActive ? 'rgba(198,163,90,0.22)' : 'rgba(9,20,38,0.18)'}
                stroke={isActive ? '#E5CD91' : 'rgba(198,163,90,0.24)'}
                strokeWidth={isActive ? '1.3' : '0.75'}
                className="transition-colors duration-200 group-hover:fill-[#C6A35A]/15"
              />
              {/* Radial divider line */}
              <line
                x1={cx + innerR * Math.cos(startRad)}
                y1={cy + innerR * Math.sin(startRad)}
                x2={cx + midR * Math.cos(startRad)}
                y2={cy + midR * Math.sin(startRad)}
                stroke="rgba(198,163,90,0.18)"
                strokeWidth="0.65"
              />
              <text
                x={gx}
                y={gy}
                textAnchor="middle"
                dominantBaseline="central"
                className="transition-colors duration-200"
                fill={isActive ? '#F6F2E9' : '#E5CD91'}
                fontSize={isActive ? '20' : '17'}
              >
                {sign.symbol}
              </text>
              <text
                x={degX}
                y={degY}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isActive ? '#E5CD91' : 'rgba(169,178,190,0.7)'}
                fontSize="8.5"
                fontFamily="JetBrains Mono, monospace"
              >
                {sign.startDegree}°
              </text>
            </g>
          );
        })}

        {/* Central active sign medallion */}
        <circle cx={cx} cy={cy} r={66} fill="#091426" stroke="rgba(198,163,90,0.5)" strokeWidth="1" />
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#E5CD91"
          fontSize="28"
        >
          {selected.symbol}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#F6F2E9"
          fontSize="13.5"
          fontFamily="Cormorant Garamond, serif"
          fontWeight="600"
        >
          {loc(selected.name)}
        </text>
        <text
          x={cx}
          y={cy + 34}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#A9B2BE"
          fontSize="9"
        >
          {loc(selected.element)}
        </text>
      </svg>
    </div>
  );
}
