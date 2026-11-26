import styles from './About.module.css';
import { useEffect, useRef, useState } from 'react';
import { education } from '../data/content';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

      // Left column (portrait) reveal
      gsap.from(leftRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 85%',
          end: 'top 70%',
          toggleAction: 'play',
        },
      });

      // Right column (text) reveal
      gsap.from(rightRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 85%',
          end: 'top 70%',
          toggleAction: 'play',
        },
      });

      // Stat counters
      const counterElements = rightRef.current.querySelectorAll('.stat-value');
      counterElements.forEach((el, idx) => {
        const endValue = parseInt(el.textContent);
        gsap.fromTo(
          el,
          { textContent: 0 },
          {
            textContent: endValue,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: 'top 70%',
              toggleAction: 'play',
            },
            onUpdate: function() {
              this.targets()[0].textContent = Math.floor(this.targets()[0].textContent);
            },
            delay: idx * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.aboutSection} ref={sectionRef}>
      {/* Softer amber glow behind content - only one glow */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left column: Portrait */}
          <div className={styles.portraitWrapper} ref={leftRef}>
            <img
              src="/assets/ISMAIL_CHAOUKI.webp"
              alt="Ismail Chaouki - Full Stack Web Developer"
              className={styles.portrait}
              onLoad={() => setImageLoaded(true)}
              fetchPriority="low"
              width={300}
              height={300}
            />
          </div>

          {/* Right column: Content */}
          <div className={styles.contentWrapper} ref={rightRef}>
            <h2 className={styles.sectionTitle}>About</h2>

            <p className={styles.sectionText}>
              Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
              Currently interning at FlexBusiness on an audit-log microservice and at Codveda, where I shipped
              7 projects end-to-end. I care about clean data models, small bundles and interfaces that actually get
              used.
            </p>

            {/* Stat counters */}
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

            {/* Education Timeline */}
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
  );
}