import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal(ref, options = {}) {
  const { once = true, start = 'top 88%', ...props } = options;

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

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleAction: once ? 'play' : 'repeat',
        },
        onComplete: () => {
          if (once) {
            ScrollTrigger.get(ref.current)?.kill();
          }
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, options, once]);
}