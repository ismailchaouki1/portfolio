'use client';

import { forwardRef, useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './RotatingText.css';

const RotatingText = forwardRef(({
  texts,
  rotationInterval = 2500,
  pauseOnHover = false,
  className = '',
  style,
  ...rest
}, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const indexRef = useRef(0);
  const paused = pauseOnHover && hovered;

  const activeText = useMemo(() => texts[activeIndex], [activeIndex, texts]);

  useEffect(() => {
    if (!texts || texts.length <= 1) return;
    if (paused) return;

    const timeout = setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % texts.length);
    }, rotationInterval);

    return () => clearTimeout(timeout);
  }, [activeIndex, texts, rotationInterval, paused]);

  useImperativeHandle(ref, () => ({
    setActiveIndex,
  }), [setActiveIndex]);

  return (
    <motion.span
      ref={ref}
      className={`rotating-text ${className}`}
      style={{
        color: 'var(--color-accent)',
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        ...style
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {activeText}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = 'RotatingText';

export default RotatingText;

function useImperativeHandle(ref, handlers) {
  useEffect(() => {
    if (ref) ref.current = handlers;
    return () => { if (ref) ref.current = undefined; };
  }, [ref, handlers]);
}