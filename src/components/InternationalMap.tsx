import { useState } from 'react';

interface RegionHub {
  id: string;
  label: string;
  cities: string;
  callingCode: string;
  x: number;
  y: number;
}

const HUBS: RegionHub[] = [
  { id: 'pk', label: 'Pakistan (Base)', cities: 'Lahore · Karachi · Islamabad', callingCode: '+92', x: 565, y: 185 },
  { id: 'uk', label: 'United Kingdom', cities: 'London · Birmingham · Manchester · Bradford', callingCode: '+44', x: 392, y: 112 },
  { id: 'eu', label: 'Europe', cities: 'Berlin · Paris · Oslo · Madrid', callingCode: '+49 / +33', x: 432, y: 122 },
  { id: 'uae', label: 'UAE', cities: 'Dubai · Abu Dhabi · Sharjah', callingCode: '+971', x: 528, y: 196 },
  { id: 'sa', label: 'Saudi Arabia', cities: 'Riyadh · Jeddah · Dammam', callingCode: '+966', x: 504, y: 202 },
  { id: 'ca', label: 'Canada', cities: 'Toronto · Vancouver · Calgary', callingCode: '+1', x: 208, y: 116 },
  { id: 'us', label: 'United States', cities: 'New York · Houston · Chicago · Los Angeles', callingCode: '+1', x: 192, y: 152 },
  { id: 'au', label: 'Australia', cities: 'Sydney · Melbourne · Brisbane', callingCode: '+61', x: 702, y: 312 },
];

export function InternationalMap() {
  const [activeId, setActiveId] = useState<string>('uk');
  const activeHub = HUBS.find((h) => h.id === activeId) ?? HUBS[0];
  const pk = HUBS[0];

  return (
    <div className="relative">
      <div className="relative overflow-hidden border border-[#C6A35A]/20 bg-[#07101F]/90 p-4 sm:p-6">
        <svg
          viewBox="0 0 820 380"
          className="w-full h-auto"
          role="img"
          aria-label="International consultation accessibility map connecting Pakistan with UK, Europe, USA, Canada, UAE, Saudi Arabia, and Australia"
        >
          {/* Subtle lat/lon graticule grid */}
          {[76, 152, 228, 304].map((y) => (
            <line key={y} x1="20" y1={y} x2="800" y2={y} stroke="rgba(198,163,90,0.07)" strokeWidth="0.7" />
          ))}
          {[120, 240, 360, 480, 600, 720].map((x) => (
            <line key={x} x1={x} y1="20" x2={x} y2="360" stroke="rgba(198,163,90,0.07)" strokeWidth="0.7" />
          ))}

          {/* Stylized minimalist world continent silhouettes */}
          <g fill="#0E223A" stroke="rgba(198,163,90,0.22)" strokeWidth="0.8">
            {/* North America */}
            <path d="M 78 82 L 175 68 L 258 92 L 245 148 L 210 182 L 164 198 L 128 175 L 92 128 Z" />
            {/* South America */}
            <path d="M 218 214 L 268 232 L 284 282 L 246 346 L 216 322 L 204 252 Z" />
            {/* Europe */}
            <path d="M 378 86 L 448 76 L 486 106 L 468 142 L 404 146 L 376 122 Z" />
            {/* Africa */}
            <path d="M 382 162 L 458 158 L 494 214 L 466 304 L 424 316 L 392 252 L 368 198 Z" />
            {/* Middle East & Asia */}
            <path d="M 474 148 L 548 122 L 668 112 L 718 164 L 672 222 L 598 228 L 552 214 L 512 226 L 478 188 Z" />
            {/* Australia */}
            <path d="M 642 276 L 728 268 L 748 318 L 704 342 L 648 322 Z" />
          </g>

          {/* Curved golden trajectories from Pakistan to diaspora regions */}
          {HUBS.slice(1).map((hub) => {
            const midX = (pk.x + hub.x) / 2;
            const midY = Math.min(pk.y, hub.y) - 38;
            const isSelected = hub.id === activeId;
            return (
              <path
                key={hub.id}
                d={`M ${pk.x} ${pk.y} Q ${midX} ${midY} ${hub.x} ${hub.y}`}
                fill="none"
                stroke={isSelected ? '#E5CD91' : 'rgba(198,163,90,0.28)'}
                strokeWidth={isSelected ? '1.5' : '0.9'}
                strokeDasharray={isSelected ? undefined : '3 4'}
              />
            );
          })}

          {/* Interactive region coordinate pins */}
          {HUBS.map((hub) => {
            const isSelected = hub.id === activeId;
            const isPk = hub.id === 'pk';
            return (
              <g
                key={hub.id}
                onClick={() => setActiveId(hub.id)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={hub.label}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(hub.id);
                  }
                }}
              >
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isSelected ? 11 : 7}
                  fill={isSelected ? 'rgba(198,163,90,0.22)' : 'rgba(198,163,90,0.1)'}
                />
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isPk ? 5 : 4}
                  fill={isSelected || isPk ? '#E5CD91' : '#C6A35A'}
                  stroke="#091426"
                  strokeWidth="1.5"
                />
                <text
                  x={hub.x}
                  y={hub.y + (hub.id === 'uk' ? -15 : 18)}
                  textAnchor="middle"
                  fill={isSelected ? '#F6F2E9' : '#A9B2BE'}
                  fontSize="10.5"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                  fontWeight={isSelected ? '600' : '500'}
                >
                  {hub.id === 'pk' ? 'Pakistan' : hub.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Active Region Readout Bar */}
        <div className="mt-4 pt-4 border-t border-[#C6A35A]/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#F6F2E9]">
              {activeHub.label}{' '}
              <span className="tabular-nums-mono text-xs text-[#E5CD91] ms-2">
                {activeHub.callingCode}
              </span>
            </p>
            <p className="text-xs text-[#A9B2BE] mt-0.5">{activeHub.cities}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {HUBS.map((hub) => (
              <button
                key={hub.id}
                type="button"
                onClick={() => setActiveId(hub.id)}
                className={`px-2.5 py-1 text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  hub.id === activeId
                    ? 'bg-[#C6A35A] text-[#091426] font-semibold'
                    : 'bg-[#0E1D36] text-[#A9B2BE] hover:text-[#F6F2E9] border border-[#C6A35A]/20'
                }`}
              >
                {hub.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
