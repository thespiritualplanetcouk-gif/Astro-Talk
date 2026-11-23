import { useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { ZODIAC_SIGNS } from '../data/zodiac';
import { useLanguage } from '../context/LanguageContext';

interface ZodiacWheelProps {
  selectedSlug: string;
  onSelect: (slug: string) => void;
  size?: 'hero' | 'interactive';
  theme?: 'light' | 'dark';
}

export function ZodiacWheel({
  selectedSlug,
  onSelect,
  size = 'interactive',
  theme = 'light',
}: ZodiacWheelProps) {
  const { loc, lang } = useLanguage();
  const isHero = size === 'hero';
  const isLight = theme === 'light';
  const selected = ZODIAC_SIGNS.find((z) => z.slug === selectedSlug) ?? ZODIAC_SIGNS[0];

  const [rotationDeg, setRotationDeg] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragStateRef = useRef<{
    active: boolean;
    startPointerAngle: number;
    startRotation: number;
    movedDistance: number;
  }>({
    active: false,
    startPointerAngle: 0,
    startRotation: 0,
    movedDistance: 0,
  });

  const cx = 220;
  const cy = 220;
  const outerR = 198;
  const midR = 152;
  const innerR = 104;

  const getPointerAngle = (clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return 0;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return (Math.atan2(clientY - centerY, clientX - centerX) * 180) / Math.PI;
  };

  const handlePointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const angle = getPointerAngle(e.clientX, e.clientY);
    dragStateRef.current = {
      active: true,
      startPointerAngle: angle,
      startRotation: rotationDeg,
      movedDistance: 0,
    };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragStateRef.current.active) return;
    const currentAngle = getPointerAngle(e.clientX, e.clientY);
    let delta = currentAngle - dragStateRef.current.startPointerAngle;
    // Normalize across -180/180 boundary
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    dragStateRef.current.movedDistance += Math.abs(delta);
    const nextRot = dragStateRef.current.startRotation + delta;
    setRotationDeg(nextRot);

    // Highlight sign passing top meridian (12 o'clock) when dragging
    if (dragStateRef.current.movedDistance > 12) {
      const normalized = (((-nextRot % 360) + 360) % 360);
      const signIndex = Math.floor(((normalized + 15) % 360) / 30);
      const targetSign = ZODIAC_SIGNS[signIndex];
      if (targetSign && targetSign.slug !== selectedSlug) {
        onSelect(targetSign.slug);
      }
    }
  };

  const handlePointerUp = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleSectorClick = (slug: string, idx: number) => {
    if (dragStateRef.current.movedDistance > 8) return;
    onSelect(slug);
    // Gently rotate wheel so clicked sign aligns near top
    setRotationDeg(-(idx * 30));
  };

  const dragHint =
    lang === 'ur'
      ? 'دائرے کو گھمانے کے لیے کھینچیں یا برج پر ٹیپ کریں'
      : lang === 'ar'
        ? 'اسحب الدائرة لتدويرها أو اضغط على أي برج'
        : 'Drag or swipe wheel to rotate · Tap any sign';

  return (
    <div className="relative mx-auto w-full max-w-[440px] select-none">
      {/* Ambient emerald/gold aura behind wheel */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-6 rounded-full blur-2xl ${
          isLight
            ? 'bg-radial from-[#C6A15B]/25 via-[#164E3C]/10 to-transparent'
            : 'bg-radial from-[#C6A15B]/16 via-[#164E3C]/30 to-transparent'
        }`}
      />

      <div className="aspect-square w-full">
        <svg
          ref={svgRef}
          viewBox="0 0 440 440"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative z-10 w-full h-full overflow-visible touch-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          role="img"
          aria-label="Interactive Draggable Zodiac Wheel"
        >
          {/* Top meridian gold pointer */}
          <polygon
            points={`${cx},4 ${cx - 6},16 ${cx + 6},16`}
            fill="#C6A15B"
          />

          {/* Outer slowly rotating celestial degree ticks */}
          <g className={isHero ? 'origin-center animate-orbit-slow' : 'origin-center'}>
            <circle
              cx={cx}
              cy={cy}
              r={outerR + 12}
              fill="none"
              stroke={isLight ? 'rgba(22,78,60,0.22)' : 'rgba(198,161,91,0.28)'}
              strokeWidth="0.85"
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
                  stroke={
                    i % 6 === 0
                      ? isLight
                        ? 'rgba(198,161,91,0.9)'
                        : 'rgba(234,217,173,0.7)'
                      : isLight
                        ? 'rgba(22,78,60,0.24)'
                        : 'rgba(198,161,91,0.28)'
                  }
                  strokeWidth={i % 6 === 0 ? '1.15' : '0.65'}
                />
              );
            })}
          </g>

          {/* Main concentric architectural rings */}
          <circle
            cx={cx}
            cy={cy}
            r={outerR}
            fill={isLight ? '#FFFFFF' : 'rgba(21,36,58,0.72)'}
            stroke={isLight ? 'rgba(198,161,91,0.62)' : 'rgba(198,161,91,0.45)'}
            strokeWidth="1.2"
          />
          <circle
            cx={cx}
            cy={cy}
            r={midR}
            fill={isLight ? '#FAF8F2' : 'none'}
            stroke={isLight ? 'rgba(198,161,91,0.42)' : 'rgba(198,161,91,0.28)'}
            strokeWidth="0.9"
          />
          <circle
            cx={cx}
            cy={cy}
            r={innerR}
            fill={isLight ? '#F1F5EF' : 'rgba(22,78,60,0.45)'}
            stroke={isLight ? 'rgba(22,78,60,0.25)' : 'rgba(198,161,91,0.35)'}
            strokeWidth="0.95"
          />

          {/* Subtle Islamic 8-pointed star geometry in center */}
          <g className="origin-center animate-orbit-reverse" opacity={isLight ? '0.35' : '0.28'}>
            <rect
              x={cx - 58}
              y={cy - 58}
              width="116"
              height="116"
              fill="none"
              stroke="#C6A15B"
              strokeWidth="0.85"
            />
            <rect
              x={cx - 58}
              y={cy - 58}
              width="116"
              height="116"
              fill="none"
              stroke="#C6A15B"
              strokeWidth="0.85"
              transform={`rotate(45 ${cx} ${cy})`}
            />
          </g>

          {/* Rotatable 12 Interactive Zodiac Sectors */}
          <g
            style={{
              transform: `rotate(${rotationDeg}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              transition: isDragging ? 'none' : 'transform 420ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {ZODIAC_SIGNS.map((sign, idx) => {
              const startAngleDeg = idx * 30 - 105;
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
                  onClick={() => handleSectorClick(sign.slug, idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSectorClick(sign.slug, idx);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={loc(sign.name)}
                  className="cursor-pointer group focus:outline-none"
                >
                  <path
                    d={pathD}
                    fill={
                      isActive
                        ? isLight
                          ? '#164E3C'
                          : 'rgba(198,161,91,0.28)'
                        : isLight
                          ? idx % 2 === 0
                            ? '#FFFFFF'
                            : '#FAF8F2'
                          : 'rgba(21,36,58,0.22)'
                    }
                    stroke={isActive ? '#C6A15B' : isLight ? 'rgba(198,161,91,0.35)' : 'rgba(198,161,91,0.24)'}
                    strokeWidth={isActive ? '1.5' : '0.8'}
                    className={`transition-colors duration-200 ${
                      isLight ? 'group-hover:fill-[#F1F5EF]' : 'group-hover:fill-[#C6A15B]/15'
                    }`}
                  />
                  {/* Radial divider line */}
                  <line
                    x1={cx + innerR * Math.cos(startRad)}
                    y1={cy + innerR * Math.sin(startRad)}
                    x2={cx + midR * Math.cos(startRad)}
                    y2={cy + midR * Math.sin(startRad)}
                    stroke={isLight ? 'rgba(22,78,60,0.16)' : 'rgba(198,161,91,0.18)'}
                    strokeWidth="0.65"
                  />
                  {/* Counter-rotate symbol so it stays upright while wheel turns */}
                  <text
                    x={gx}
                    y={gy}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${-rotationDeg} ${gx} ${gy})`}
                    fill={
                      isActive
                        ? '#EAD9AD'
                        : isLight
                          ? '#164E3C'
                          : '#EAD9AD'
                    }
                    fontSize={isActive ? '21' : '17.5'}
                  >
                    {sign.symbol}
                  </text>
                  <text
                    x={degX}
                    y={degY}
                    textAnchor="middle"
                    dominantBaseline="central"
                    transform={`rotate(${-rotationDeg} ${degX} ${degY})`}
                    fill={
                      isActive
                        ? isLight
                          ? '#164E3C'
                          : '#EAD9AD'
                        : isLight
                          ? '#6E7E77'
                          : 'rgba(169,178,190,0.75)'
                    }
                    fontSize="8.5"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight={isActive ? '600' : '400'}
                  >
                    {sign.startDegree}°
                  </text>
                </g>
              );
            })}
          </g>

          {/* Central active sign medallion */}
          <circle
            cx={cx}
            cy={cy}
            r={66}
            fill={isLight ? '#164E3C' : '#15243A'}
            stroke="#C6A15B"
            strokeWidth="1.4"
          />
          <circle
            cx={cx}
            cy={cy}
            r={60}
            fill="none"
            stroke="rgba(234,217,173,0.32)"
            strokeWidth="0.7"
          />
          <text
            x={cx}
            y={cy - 16}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#EAD9AD"
            fontSize="28"
          >
            {selected.symbol}
          </text>
          <text
            x={cx}
            y={cy + 14}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#FAF8F2"
            fontSize="14"
            fontFamily="Cormorant Garamond, serif"
            fontWeight="600"
          >
            {loc(selected.name)}
          </text>
          <text
            x={cx}
            y={cy + 33}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#EAD9AD"
            fontSize="9"
          >
            {loc(selected.element)}
          </text>
        </svg>
      </div>

      <p
        className={`mt-2 text-center text-[11px] tracking-wide ${
          isLight ? 'text-[#4A5A53]' : 'text-[#A9B2BE]'
        }`}
      >
        {dragHint}
      </p>
    </div>
  );
}
