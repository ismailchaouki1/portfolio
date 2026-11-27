import styles from './Hero.module.css';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ErrorBoundary } from '../components/ErrorBoundary';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current || typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(nameRef.current, { opacity: 1, y: 0 });
        return;
      }

      const nameChars = nameRef.current.querySelectorAll('.char');
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });

      tl.from(nameChars, {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        delay: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <ErrorBoundary title="Hero Section Error">
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.bgLayer} aria-hidden="true" />
        <div className={styles.technicalGrid} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.text}>
            <p className={styles.label}>Full Stack Web Developer</p>

            <h1 className={styles.name} ref={nameRef}>
              {('Ismail Chaouki').split(/\s+/).map((word, wi) => (
                <span key={wi} className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                  {word.split('').map((char, i) => (
                    <span key={`${wi}-${i}`} className="char" style={{ display: 'inline-block' }}>
                      {char}
                    </span>
                  ))}
                  {wi < 2 && <>&nbsp;</>}
                </span>
              ))}
            </h1>

            <p className={styles.pitch}>
              Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
              Currently interning at FlexBusiness on an audit-log microservice and at Codveda, where I shipped
              7 projects end-to-end.
            </p>

            <div className={styles.actions}>
              <a
                href="#projects"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                View projects
              </a>
              <a
                href="/Ismail_Chaouki_Resume.pdf"
                className={`${styles.btn} ${styles.btnGhost}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </div>

            <div className={styles.techStrip}>
              <span className={styles.techItem}>React.js</span>
              <span className={styles.techItem}>Node.js</span>
              <span className={styles.techItem}>Express.js</span>
              <span className={styles.techItem}>Laravel</span>
              <span className={styles.techItem}>MySQL</span>
              <span className={styles.techItem}>MongoDB</span>
              <span className={styles.techItem}>Firebase</span>
              <span className={styles.techItem}>JavaScript</span>
              <span className={styles.techItem}>PHP</span>
            </div>
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
}