'use client';

import { forwardRef, useRef, useEffect } from 'react';
import './StarBorder.css';

const BLEED = 48;

const StarBorder = forwardRef(({
  as: Component = 'a',
  children,
  className = '',
  style,
  color = 'var(--color-accent)',
  trailColor,
  duration = 4,
  thickness = 1,
  radius = 12,
  glow = 0.6,
  theme = 'dark',
  backgroundColor,
  textColor,
  borderColor,
  ...rest
}, ref) => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const aliveRef = useRef(true);
  const trailColorRef = useRef(trailColor || color);

  const thicknessPx = thickness;
  const radiusPx = radius;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const trailColor = trailColorRef.current;
    const color = style?.color ?? color;

    const draw = (ctx, width, height, time) => {
      ctx.save();
      ctx.resetTransform();
      ctx.scale(width > 0 ? 1 : 1, height > 0 ? 1 : 1);

      const x = width / 2;
      const y = height / 2;
      const r = Math.min(x, y) - thicknessPx / 2;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, `rgba(255, 255, 255, 0.2)`);
      grad.addColorStop(0.5, `${trailColor}`);
      grad.addColorStop(1, `rgba(255, 255, 255, 0)`);

      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = grad;
      ctx.lineWidth = thicknessPx;
      ctx.stroke();

      ctx.restore();
    };

    const frame = (now) => {
      if (!aliveRef.current) return;
      const canvas = canvasRef.current;
      const root = rootRef.current;
      if (!canvas || !root) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const rect = root.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      draw(ctx, rect.width, rect.height, now / 1000);

      rafRef.current = requestAnimationFrame(frame);
    };

    if (document.visibilityState === 'visible') {
      rafRef.current = requestAnimationFrame(frame);
    }

    return () => {
      aliveRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [thicknessPx, radiusPx, color, duration]);

  return (
    <Component
      ref={ref}
      className={`star-border ${className}`}
      style={{
        '--star-border-radius': `${radiusPx}px`,
        '--star-border-thickness': `${thicknessPx}px`,
        '--star-border-surface': backgroundColor ?? 'var(--color-bg-elevated)',
        '--star-border-text': textColor ?? 'var(--color-text)',
        '--star-border-track': borderColor ?? 'var(--color-accent)',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        margin: 0,
        padding: '0.875rem 1.5rem',
        border: '0',
        borderRadius: 'var(--star-border-radius)',
        background: 'var(--star-border-surface)',
        color: 'var(--star-border-text)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 700,
        lineHeight: 1.25,
        textDecoration: 'none',
        cursor: 'pointer',
        ...style
      }}
      {...rest}
    >
      <canvas ref={canvasRef} className="star-border__light" aria-hidden="true" />
      {children}
    </Component>
  );
});

StarBorder.displayName = 'StarBorder';

export default StarBorder;