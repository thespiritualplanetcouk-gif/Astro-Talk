import { useEffect, useRef } from 'react';

interface CelestialBackdropProps {
  density?: 'hero' | 'subtle';
  theme?: 'light' | 'dark';
}

export function CelestialBackdrop({ density = 'hero', theme = 'light' }: CelestialBackdropProps) {
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
      density === 'hero' ? (isMobile ? 40 : 86) : isMobile ? 20 : 44;

    const stars = Array.from({ length: starCount }, (_, idx) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: idx % 6 === 0 ? 2.1 : Math.random() * 1.25 + 0.55,
      depth: (idx % 3) * 0.45 + 0.4,
      baseAlpha: theme === 'light' ? Math.random() * 0.34 + 0.22 : Math.random() * 0.45 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.003,
      accentType: idx % 4,
    }));

    // Smoothly interpolated pointer/touch parallax target (-1..1)
    let targetPx = 0;
    let targetPy = 0;
    let currentPx = 0;
    let currentPy = 0;

    const updatePointer = (clientX: number, clientY: number) => {
      if (prefersReduced) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      targetPx = Math.max(-1, Math.min(1, nx));
      targetPy = Math.max(-1, Math.min(1, ny));
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const drawFrame = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      currentPx += (targetPx - currentPx) * 0.06;
      currentPy += (targetPy - currentPy) * 0.06;

      const shiftScale = isMobile ? 12 : 22;

      // Constellation connecting lines that subtly drift with cursor/touch
      if (density === 'hero') {
        ctx.strokeStyle =
          theme === 'light' ? 'rgba(198, 161, 91, 0.22)' : 'rgba(234, 217, 173, 0.12)';
        ctx.lineWidth = 0.75;
        const limit = isMobile ? 14 : 28;
        for (let i = 0; i < Math.min(limit, stars.length - 1); i += 2) {
          const a = stars[i];
          const b = stars[i + 1];
          const ax = a.x + currentPx * shiftScale * a.depth;
          const ay = a.y + currentPy * shiftScale * a.depth;
          const bx = b.x + currentPx * shiftScale * b.depth;
          const by = b.y + currentPy * shiftScale * b.depth;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < (isMobile ? 150 : 210)) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      for (const s of stars) {
        const twinkle = prefersReduced ? 0 : Math.sin(time * s.speed + s.phase) * 0.18;
        const alpha = Math.max(0.1, Math.min(0.85, s.baseAlpha + twinkle));
        const sx = s.x + currentPx * shiftScale * s.depth;
        const sy = s.y + currentPy * shiftScale * s.depth;

        if (theme === 'light') {
          ctx.fillStyle =
            s.accentType === 0
              ? `rgba(22, 78, 60, ${alpha * 0.65})`
              : `rgba(198, 161, 91, ${alpha})`;
        } else {
          ctx.fillStyle =
            s.accentType === 0
              ? `rgba(234, 217, 173, ${alpha})`
              : `rgba(250, 248, 242, ${alpha * 0.85})`;
        }

        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Subtle 4-point celestial sparkle for key anchor stars
        if (s.r > 1.8) {
          ctx.strokeStyle =
            theme === 'light'
              ? `rgba(198, 161, 91, ${alpha * 0.55})`
              : `rgba(234, 217, 173, ${alpha * 0.5})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(sx - 5.5, sy);
          ctx.lineTo(sx + 5.5, sy);
          ctx.moveTo(sx, sy - 5.5);
          ctx.lineTo(sx, sy + 5.5);
          ctx.stroke();
        }
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

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
    };
  }, [density, theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 w-full h-full"
    />
  );
}
