import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal(ref, options = {}) {
  const { once = true, start = 'top 88%', y = 20, duration = 0.6, ...props } = options;

  useEffect(() => {
    // Skip animations if ?static in URL (for screenshots)
    if (typeof window !== 'undefined' && window.location.search.includes('static')) {
      if (ref.current) {
        gsap.set(ref.current, { clearProps: 'all' });
      }
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      if (ref.current) {
        gsap.set(ref.current, { clearProps: 'all' });
      }
      return;
    }

    if (!ref.current) return;

    ScrollTrigger.create({
      trigger: ref.current,
      start,
      once,
      onEnter: () => {
        gsap.from(ref.current, {
          opacity: 0,
          y,
          duration,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(ref.current, { clearProps: 'all' });
          },
        });
      },
    });

    return () => {
      // ScrollTrigger will be cleaned up by gsap.context if used with context
    };
  }, [ref, options, once]);
}