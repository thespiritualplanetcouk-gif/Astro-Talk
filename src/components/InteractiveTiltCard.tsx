import { useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

interface InteractiveTiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function InteractiveTiltCard({
  children,
  className = '',
  maxTilt = 4.5,
}: InteractiveTiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)');
  const [glowPos, setGlowPos] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(pointer: coarse)').matches)
    ) {
      return;
    }
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * (maxTilt * 2);
    const rotateX = (0.5 - y) * (maxTilt * 2);
    setTransformStyle(
      `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-3px)`
    );
    setGlowPos({ x: x * 100, y: y * 100, active: true });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setGlowPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: glowPos.active
          ? 'transform 120ms ease-out, border-color 220ms ease, box-shadow 220ms ease'
          : 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease, box-shadow 220ms ease',
      }}
      className={`relative active:scale-[0.985] ${className}`}
    >
      {/* Subtle gold illumination sheen following cursor on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: glowPos.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${glowPos.x}% ${glowPos.y}%, rgba(198,161,91,0.13), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}
