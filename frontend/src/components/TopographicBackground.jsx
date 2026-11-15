import { useEffect, useRef } from 'react';
import styles from './TopographicBackground.module.css';

const CELL = 14; // grid cell size in CSS px
const SCALE = 0.07; // noise frequency per cell
const LEVELS = 12;
const LOW = 0.25;
const HIGH = 0.75;

// segments per marching-squares case; edges: 0 top, 1 right, 2 bottom, 3 left
const SEGS = [
  [],
  [[3, 2]],
  [[2, 1]],
  [[3, 1]],
  [[0, 1]],
  [
    [0, 3],
    [2, 1],
  ],
  [[0, 2]],
  [[0, 3]],
  [[0, 3]],
  [[0, 2]],
  [
    [0, 1],
    [3, 2],
  ],
  [[0, 1]],
  [[3, 1]],
  [[2, 1]],
  [[3, 2]],
  [],
];

function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function valueNoise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const u = (x - xi) * (x - xi) * (3 - 2 * (x - xi));
  const v = (y - yi) * (y - yi) * (3 - 2 * (y - yi));
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function field(x, y, t) {
  return (
    0.65 * valueNoise(x + t, y + t * 0.6) + 0.35 * valueNoise(x * 2.1 - t * 0.5, y * 2.1 + t * 0.3)
  );
}

export default function TopographicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let cols = 0;
    let rows = 0;
    let vals = new Float32Array(0);
    let raf = 0;
    let last = 0;
    let t = 0;

    const draw = () => {
      const stride = cols + 1;
      ctx.clearRect(0, 0, cols * CELL, rows * CELL);
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          vals[j * stride + i] = field(i * SCALE, j * SCALE, t);
        }
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = getComputedStyle(canvas).color;

      for (let k = 0; k < LEVELS; k++) {
        const L = LOW + (k * (HIGH - LOW)) / (LEVELS - 1);
        ctx.globalAlpha = k % 4 === 0 ? 0.35 : 0.16;
        ctx.beginPath();
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const tl = vals[j * stride + i];
            const tr = vals[j * stride + i + 1];
            const bl = vals[(j + 1) * stride + i];
            const br = vals[(j + 1) * stride + i + 1];
            const idx = (tl > L ? 8 : 0) | (tr > L ? 4 : 0) | (br > L ? 2 : 0) | (bl > L ? 1 : 0);
            if (idx === 0 || idx === 15) continue;
            const x0 = i * CELL;
            const y0 = j * CELL;
            const px = (e) =>
              e === 0
                ? x0 + (CELL * (L - tl)) / (tr - tl)
                : e === 1
                  ? x0 + CELL
                  : e === 2
                    ? x0 + (CELL * (L - bl)) / (br - bl)
                    : x0;
            const py = (e) =>
              e === 0
                ? y0
                : e === 1
                  ? y0 + (CELL * (L - tr)) / (br - tr)
                  : e === 2
                    ? y0 + CELL
                    : y0 + (CELL * (L - tl)) / (bl - tl);
            for (const [a, b] of SEGS[idx]) {
              ctx.moveTo(px(a), py(a));
              ctx.lineTo(px(b), py(b));
            }
          }
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / CELL);
      rows = Math.ceil(h / CELL);
      vals = new Float32Array((cols + 1) * (rows + 1));
      draw();
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 66) return;
      last = now;
      t += 0.004;
      draw();
    };

    resize();
    window.addEventListener('resize', resize);

    let observer;
    if (!reduced) {
      observer = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(raf);
        if (entry.isIntersecting) raf = requestAnimationFrame(tick);
      });
      observer.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (observer) observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
