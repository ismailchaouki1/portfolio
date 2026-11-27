import styles from './Experience.module.css';
import { experience } from '../data/content';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const cardsRef = [];

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;

        // Cards are visible by default in CSS
        // Animation enhances the reveal on scroll
        if (prefersReduced) {
          return;
        }

        ScrollTrigger.create({
          trigger: card,
          start: 'top 85%',
          end: 'top 70%',
          toggleAction: 'play',
          onEnter: () => {
            gsap.from(card, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'back.out(1.7)',
              delay: idx * 0.1,
            });
          },
        });
      });

      if (lineRef.current) {
        // Line starts hidden and draws on scroll
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
          {experience.map((exp, itemIdx) => {
            const date = new Date(exp.start);
            const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'short' });
            const endYear = exp.end ? new Date(exp.end).toLocaleDateString('en-US', { month: 'short', year: 'short' }) : 'Present';

            return (
              <div
                key={exp.id}
                className={styles.timelineItem}
                ref={(el) => { if (el) cardsRef.current[itemIdx] = el; }}
              >
                <div className={styles.itemMarker} aria-hidden="true" />
                <div className={styles.itemCard}>
                  <h3 className={styles.itemRole}>
                    {exp.role} @ {exp.company}
                  </h3>
                  <p className={styles.itemDate}>
                    {monthYear} – {endYear}
                  </p>
                  <ul className={styles.itemList}>
                    {exp.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}