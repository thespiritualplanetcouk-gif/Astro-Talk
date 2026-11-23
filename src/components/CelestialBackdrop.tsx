import { useEffect, useRef } from 'react';

interface CelestialBackdropProps {
  density?: 'hero' | 'subtle';
}

export function CelestialBackdrop({ density = 'hero' }: CelestialBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const starCount =
      density === 'hero' ? (isMobile ? 36 : 84) : isMobile ? 18 : 42;

    const stars = Array.from({ length: starCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: idx % 7 === 0 ? 1.55 : Math.random() * 1.1 + 0.35,
      baseAlpha: Math.random() * 0.45 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
      goldTint: idx % 5 === 0,
    }));

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Subtle constellation connecting lines between select stars
      if (!isMobile && density === 'hero') {
        ctx.strokeStyle = 'rgba(198, 163, 90, 0.075)';
        ctx.lineWidth = 0.65;
        for (let i = 0; i < Math.min(18, stars.length - 1); i += 3) {
          const a = stars[i];
          const b = stars[i + 1];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 220) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const s of stars) {
        const twinkle = prefersReduced
          ? 0
          : Math.sin(time * s.speed + s.phase) * 0.22;
        const alpha = Math.max(0.08, Math.min(0.85, s.baseAlpha + twinkle));
        ctx.fillStyle = s.goldTint
          ? `rgba(229, 205, 145, ${alpha})`
          : `rgba(246, 242, 233, ${alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let rafId = 0;
    if (prefersReduced) {
      drawFrame(0);
    } else {
      const loop = (t: number) => {
        drawFrame(t * 0.06);
        rafId = window.requestAnimationFrame(loop);
      };
      rafId = window.requestAnimationFrame(loop);
    }

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      if (prefersReduced) drawFrame(0);
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
