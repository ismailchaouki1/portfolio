import styles from './About.module.css';
import { useEffect, useRef, useState } from 'react';
import { education } from '../data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ErrorBoundary } from '../components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        gsap.set([leftRef.current, rightRef.current], { opacity: 1, y: 0 });
        return;
      }

      // Left column (portrait) reveal - visible by default, animates on scroll
      ScrollTrigger.create({
        trigger: leftRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(leftRef.current,
            { opacity: 0.7, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Right column (text) reveal - visible by default, animates on scroll
      ScrollTrigger.create({
        trigger: rightRef.current,
        start: 'top 85%',
        onEnter: () => {
          const elements = rightRef.current.querySelectorAll('h2, p, .stats, .timeline');
          gsap.fromTo(elements,
            { opacity: 0.7, y: 10 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.05 }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <ErrorBoundary title="About Section Error">
      <section className={styles.aboutSection} ref={sectionRef}>
        <div className={styles.bgGlow} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.portraitWrapper} ref={leftRef}>
              <img
                src="/assets/ISMAIL_CHAOUKI.jpg"
                alt="Ismail Chaouki - Full Stack Web Developer"
                className={styles.portrait}
                onLoad={() => setImageLoaded(true)}
                fetchPriority="low"
                width={300}
                height={300}
              />
            </div>

            <div className={styles.contentWrapper} ref={rightRef}>
              <h2 className={styles.sectionTitle}>About</h2>

              <p className={styles.sectionText}>
                Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
                Currently interning at FlexBusiness on an audit-log microservice and at Codveda, where I shipped
                7 projects end-to-end. I care about clean data models, small bundles and interfaces that actually get
                used.
              </p>

              <div className={styles.stats}>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>7</div>
                  <div className={styles.statLabel}>Projects Shipped</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>3</div>
                  <div className={styles.statLabel}>Years Learning</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statValue}>4</div>
                  <div className={styles.statLabel}>Core Technologies</div>
                </div>
              </div>

              <div className={styles.timeline}>
                <h3 className={styles.timelineTitle}>Education</h3>
                <div className={styles.timelineItems}>
                  {education.map((edu, i) => (
                    <div key={edu.id} className={styles.timelineItem}>
                      <div className={styles.timelineMarker} aria-hidden="true" />
                      <div className={styles.timelineContent}>
                        <h4 className={styles.timelineSchool}>{edu.school}</h4>
                        <p className={styles.timelineDegree}>{edu.degree}</p>
                        <p className={styles.timelineYear}>{edu.year}</p>
                        {edu.detail && <p className={styles.timelineDetail}>{edu.detail}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}