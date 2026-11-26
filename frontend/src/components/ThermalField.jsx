import { useEffect, useRef } from 'react';

const COLORS = [
  { position: 0.0, color: '#3b0c78' },    // Deep Purple
  { position: 0.2, color: '#661767' },    // Purple
  { position: 0.4, color: '#881a56' },    // Magenta
  { position: 0.5, color: '#a52727' },    // Red
  { position: 0.7, color: '#d95f00' },    // Orange
  { position: 0.85, color: '#e5ae00' },   // Yellow
  { position: 1.0, color: '#f5f5f5' },    // White-hot core
];

// Interpolate color based on normalized value (0-1)
function getColor(t) {
  const idx = COLORS.findIndex((c, i) => t < c.position && i > 0);
  const lower = COLORS[idx] || COLORS[COLORS.length - 2];
  const upper = COLORS[idx + 1] || COLORS[COLORS.length - 1];

  const range = upper.position - lower.position;
  const localT = (t - lower.position) / range || 0;

  const r = Math.round(lower.color.slice(1, 3), 16) * (1 - localT) + Math.round(upper.color.slice(1, 3), 16) * localT;
  const g = Math.round(lower.color.slice(3, 5), 16) * (1 - localT) + Math.round(upper.color.slice(3, 5), 16) * localT;
  const b = Math.round(lower.color.slice(5, 7), 16) * (1 - localT) + Math.round(upper.color.slice(5, 7), 16) * localT;

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

// Heatmap value based on metaball field
function heatMap(x, y, metaballs) {
  let intensity = 0;
  metaballs.forEach((ball) => {
    const dx = x - ball.x;
    const dy = y - ball.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < ball.radius) {
      intensity = Math.max(intensity, 1 - dist / ball.radius);
    }
  });
  return intensity;
}

export default function ThermalField() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const metaballsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      COLORS.forEach(c => gradient.addColorStop(c.position, c.color));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

      // Initialize metaballs if not exists
      if (metaballsRef.current.length === 0) {
        metaballsRef.current = Array.from({ length: 4 }, () => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.min(canvas.width, canvas.height) * 0.15,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        }));
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const { width, height } = canvas;

      // Create image data for heatmap
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // Calculate heatmap
      for (let py = 0; py < height; py += 2) {
        for (let px = 0; px < width; px += 2) {
          const intensity = heatMap(px, py, metaballsRef.current);
          const color = getColor(intensity);
          const [r, g, b] = color.match(/\d+/g).map(Number);

          for (let j = 0; j < 2; j++) {
            for (let i = 0; i < 2; i++) {
              const idx = ((py + j) * width + (px + i)) * 4;
              data[idx] = r;
              data[idx + 1] = g;
              data[idx + 2] = b;
              data[idx + 3] = 35; // Low alpha for subtle overlay
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Update metaball positions
      metaballsRef.current.forEach((ball) => {
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x < 0 || ball.x > width) ball.vx *= -1;
        if (ball.y < 0 || ball.y > height) ball.vy *= -1;
      });

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="thermal-field" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} aria-hidden="true" />;
}