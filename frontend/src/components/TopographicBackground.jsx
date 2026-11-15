import { useEffect, useRef } from 'react';

const cellSize = 12;
const lineOpacity = 0.18;
const strongLineRatio = 0.2;

const TopographicBackground = ({ reducedMotion }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const animationIdRef = useRef(null);
  let lastTime = 0;
  let width = 0;
  let height = 0;
  const unfocusedRef = useRef(true);
  const sectionVisibleRef = useRef(true);

  // Generate noise height map
  const generateGrid = (w, h) => {
    const cols = Math.max(1, Math.floor(w / cellSize));
    const rows = Math.max(1, Math.floor(h / cellSize));
    const grid = Array(cols)
      .fill()
      .map(() => Array(rows).fill(0));
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let n = 0;
        for (let k = 0; k < 4; k++) {
          const a = (Math.PI * (i / cols + j / rows + k * 0.5)) / 2;
          n += Math.cos(a) * Math.sin(a) * (1 - k / 4);
        }
        grid[i][j] = (n / 4 + 0.5) * 255;
      }
    }
    return { grid, cols, rows };
  };

  // Marching squares contour at level 0.5
  const getContourLines = (grid, cols, rows, i, j) => {
    const h = grid[i][j] / 255;
    const h2 = grid[Math.min(i + 1, cols - 1)][j] / 255;
    const h3 = grid[i][Math.min(j + 1, rows - 1)] / 255;
    const h4 = grid[Math.min(i + 1, cols - 1)][Math.min(j + 1, rows - 1)] / 255;
    const square =
      ((grid[i][j] > 128 ? 1 : 0) << 3) |
      ((h2 > 128 ? 1 : 0) << 2) |
      ((h4 > 128 ? 1 : 0) << 1) |
      ((h3 > 128 ? 1 : 0) << 0);
    const lines = [
      square & 1
        ? { x1: i * cellSize, y1: j * cellSize, x2: (i + 1) * cellSize, y2: j * cellSize }
        : null,
      square & 2
        ? { x1: (i + 1) * cellSize, y1: j * cellSize, x2: (i + 1) * cellSize, y2: (j + 1) * cellSize }
        : null,
      square & 4
        ? { x1: (i + 1) * cellSize, y1: (j + 1) * cellSize, x2: i * cellSize, y2: (j + 1) * cellSize }
        : null,
      square & 8
        ? { x1: i * cellSize, y1: (j + 1) * cellSize, x2: i * cellSize, y2: j * cellSize }
        : null,
    ];
    return lines.filter((l) => l !== null);
  };

  // Draw all contour lines
  const drawContours = (ctx, grid, cols, rows) => {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const lines = getContourLines(grid, cols, rows, i, j);
        if (!lines.length) continue;
        const val = Math.max(grid[i][j], grid[Math.min(i + 1, cols - 1)][j], grid[i][Math.min(j + 1, rows - 1)], grid[Math.min(i + 1, cols - 1)][Math.min(j + 1, rows - 1)]);
        const isStrong = val > 200;
        const opacity = isStrong ? strongLineRatio : lineOpacity;
        ctx.beginPath();
        ctx.moveTo(lines[0].x1, lines[0].y1);
        for (let k = 1; k < lines.length; k++) {
          ctx.lineTo(lines[k].x1, lines[k].y1);
        }
        ctx.strokeStyle = `rgba(173, 216, 230, ${opacity})`;
        ctx.lineWidth = isStrong ? 2 : 1;
        ctx.stroke();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      width = canvas.width;
      height = canvas.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const context = canvas.getContext('2d');
    if (!context) return;
    ctxRef.current = context;

    // Respect prefers-reduced-motion: one static frame
    if (reducedMotion) {
      if (ctxRef.current) {
        drawStaticFrame(ctxRef.current, canvas.width, canvas.height);
      }
      return;
    }

    const { grid, cols, rows } = generateGrid(canvas.width, canvas.height);

    const animate = (now) => {
      if (unfocusedRef.current || !sectionVisibleRef.current) {
        if (ctxRef.current) {
          ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
        }
        return;
      }

      if (lastTime === 0) lastTime = now;
      const dt = (now - lastTime) * 0.01;
      lastTime = now;

      if (ctxRef.current) {
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
        drawContours(ctxRef.current, grid, cols, rows);
      }

      // Drift grid slowly
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = (grid[i][j] + (Math.random() - 0.5) * 10) % 256;
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      unfocusedRef.current = true;
      sectionVisibleRef.current = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        sectionVisibleRef.current = entries[0].isIntersecting;
        if (entries[0].isIntersecting && !reducedMotion && !animationIdRef.current) {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          const width = canvas.width;
          const height = canvas.height;
          const { grid, cols, rows } = generateGrid(width, height);
          let t = 0;
          const runAnim = (now) => {
            if (!sectionVisibleRef.current) return;
            t += (now - lastTime) * 0.01;
            lastTime = now;
            ctx.clearRect(0, 0, width, height);
            drawContours(ctx, grid, cols, rows);
            animationIdRef.current = requestAnimationFrame(runAnim);
          };
          animationIdRef.current = requestAnimationFrame(runAnim);
        } else if (!entries[0].isIntersecting && animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }
      },
      { rootMargin: '200px 0px' }
    );

    const canvas = canvasRef.current;
    if (canvas) observer.observe(canvas);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      observer.disconnect();
    };
  }, [reducedMotion]);

  // Initial static draw on mount if not reduced motion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawStaticFrame(ctx, canvas.width, canvas.height);
  }, [reducedMotion]);

  return null;
};

const drawStaticFrame = (ctx, width, height) => {
  const cols = Math.max(1, Math.floor(width / cellSize));
  const rows = Math.max(1, Math.floor(height / cellSize));
  const grid = (() => {
    const g = Array(cols).fill().map(() => Array(rows).fill(0));
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let n = 0;
        for (let k = 0; k < 4; k++) {
          const a = (Math.PI * (i / cols + j / rows + k * 0.3)) / 2;
          n += Math.cos(a) * Math.sin(a) * (1 - k / 4);
        }
        g[i][j] = (n / 4 + 0.5) * 255;
      }
    }
    return g;
  })();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const lines = (() => {
        const h = grid[i][j] / 255;
        const h2 = grid[Math.min(i + 1, cols - 1)][j] / 255;
        const h3 = grid[i][Math.min(j + 1, rows - 1)] / 255;
        const h4 = grid[Math.min(i + 1, cols - 1)][Math.min(j + 1, rows - 1)] / 255;
        const square =
          ((grid[i][j] > 128 ? 1 : 0) << 3) |
          ((h2 > 128 ? 1 : 0) << 2) |
          ((h4 > 128 ? 1 : 0) << 1) |
          ((h3 > 128 ? 1 : 0) << 0);
        const lines = [
          square & 1
            ? { x1: i * cellSize, y1: j * cellSize, x2: (i + 1) * cellSize, y2: j * cellSize }
            : null,
          square & 2
            ? { x1: (i + 1) * cellSize, y1: j * cellSize, x2: (i + 1) * cellSize, y2: (j + 1) * cellSize }
            : null,
          square & 4
            ? { x1: (i + 1) * cellSize, y1: (j + 1) * cellSize, x2: i * cellSize, y2: (j + 1) * cellSize }
            : null,
          square & 8
            ? { x1: i * cellSize, y1: (j + 1) * cellSize, x2: i * cellSize, y2: j * cellSize }
            : null,
        ];
        return lines.filter((l) => l !== null);
      })();
      if (!lines.length) continue;
      const val = Math.max(grid[i][j], grid[Math.min(i + 1, cols - 1)][j], grid[i][Math.min(j + 1, rows - 1)], grid[Math.min(i + 1, cols - 1)][Math.min(j + 1, rows - 1)]);
      const isStrong = val > 200;
      const opacity = isStrong ? strongLineRatio : lineOpacity;
      ctx.beginPath();
      ctx.moveTo(lines[0].x1, lines[0].y1);
      for (let k = 1; k < lines.length; k++) {
        ctx.lineTo(lines[k].x1, lines[k].y1);
      }
      ctx.strokeStyle = `rgba(173, 216, 230, ${opacity})`;
      ctx.lineWidth = isStrong ? 2 : 1;
      ctx.stroke();
    }
  }
};

export default TopographicBackground;