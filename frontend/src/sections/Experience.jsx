import styles from './Experience.module.css';
import { experience } from '../data/content';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, { opacity: 0, scale: 0.9 });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          end: 'top 70%',
          toggleAction: 'play',
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)',
            });
          },
        });
      });

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
          onUpdate: (self) => {
            gsap.set(lineRef.current, { scaleX: self.progress });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Experience</h2>
        </div>

        <svg
          className={styles.timelineSvg}
          viewBox="0 0 4 100"
          fill="none"
          aria-hidden="true"
          ref={lineRef}
        >
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="100"
            strokeWidth="0.1"
            stroke="var(--color-accent)"
          />
        </svg>

        <div className={styles.timelineItems}>
          {experience.map((exp, itemIdx) => (
            <div
              key={exp.id}
              className={styles.timelineItem}
              ref={(el) => {
                cardsRef.current[itemIdx] = el;
              }}
            >
              <div className={styles.itemMarker} aria-hidden="true" />
              <div className={styles.itemCard}>
                <h3 className={styles.itemRole}>
                  {exp.role} @ {exp.company}
                </h3>
                <p className={styles.itemDate}>
                  {exp.start} – {exp.end}
                </p>
                <ul className={styles.itemList}>
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}