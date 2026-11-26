import { useRef, useState } from 'react';
import gsap from 'gsap';

export default function useMagnetic() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => setIsActive(true);

  const handleMouseLeave = () => {
    setIsActive(false);
    setPos({ x: 0, y: 0 });
  };

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * 0.15;
    const y = (e.clientY - centerY) * 0.15;
    setPos({ x, y });
  };

  const applyTransform = () => {
    if (ref.current && isActive) {
      gsap.set(ref.current, {
        x: pos.x,
        y: pos.y,
      });
    } else if (ref.current) {
      gsap.set(ref.current, {
        x: 0,
        y: 0,
      });
    }
  };

  return {
    ref,
    pos,
    isActive,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
    applyTransform,
  };
}