import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReveal } from '../hooks/useReveal';
import { ErrorBoundary } from './ErrorBoundary';

export default function Loader({ onComplete }) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);
  const loaderRef = useRef(null);
  const counterRef = useRef(null);

  useReveal(loaderRef, { once: true });

  useEffect(() => {
    // Show loader once per session
    let shown = false;
    try {
      shown = sessionStorage.getItem('loaderShown');
    } catch {
      /* ignore storage errors */
    }

    if (shown) {
      setVisible(false);
      return;
    }

    // Counter animation: 000 to 100 over ~1s
    const ctx = gsap.context(() => {
      gsap.to({ count: 100 }, {
        count: 100,
        duration: 1,
        ease: 'power2.out',
        onUpdate: function() {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(this.targets()[0].count).toString().padStart(3, '0');
          }
        },
        onComplete: () => {
          // Mark as shown for future visits
          try {
            sessionStorage.setItem('loaderShown', 'true');
          } catch {
            /* ignore storage errors */
          }
          // Fade out and remove
          gsap.to(loaderRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              setVisible(false);
              if (onComplete) onComplete();
            }
          });
        }
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Skip to content on any key press or click
  const handleSkip = () => {
    try {
      sessionStorage.setItem('loaderShown', 'true');
    } catch {
      /* ignore storage errors */
    }
    if (loaderRef.current) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          setVisible(false);
          if (onComplete) onComplete();
        }
      });
    }
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key && !shown) handleSkip();
    };
    const handleClick = () => {
      if (visible && !shown) handleSkip();
    };
    // Use a ref to track shown state
    let shown = false;
    try {
      shown = sessionStorage.getItem('loaderShown');
    } catch {
      shown = false;
    }

    if (!shown && visible) {
      window.addEventListener('keydown', handleKey);
      document.addEventListener('click', handleClick, { passive: true });
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('click', handleClick);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <ErrorBoundary title="Loader Error">
      <div className="loader-overlay" ref={loaderRef} onClick={handleSkip} onKeyDown={handleSkip} role="dialog" aria-label="Loading">
        <div className="loader-content">
          <span className="loader-counter" ref={counterRef}>000</span>
          <span className="loader-text">loading...</span>
        </div>
      </div>
    </ErrorBoundary>
  );
}