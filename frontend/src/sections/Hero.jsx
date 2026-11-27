import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReveal } from '../hooks/useReveal';
import { ErrorBoundary } from '../components/ErrorBoundary';
import styles from './Hero.module.css';

const roles = [
  'Full Stack Web Developer',
  'React & Node.js',
  'Laravel & MySQL',
  'REST APIs & JWT',
];

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);

  useReveal(heroRef, { once: true });

  useEffect(() => {
    const roleEl = roleRef.current;
    if (!roleEl) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });

    roles.forEach((_, i) => {
      tl.to(roleEl, {
        opacity: i === roleIndex ? 1 : 0,
        y: i === roleIndex ? 0 : 20,
        duration: 0.6,
        ease: 'power2.out',
      }, i * 0.8);
    });

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => {
      tl.kill();
      clearInterval(interval);
    };
  }, [roleIndex]);

  const cvUrl = import.meta.env.VITE_CV_URL;

  return (
    <ErrorBoundary title="Hero Section Error">
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.bgLayer} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.text}>
            <p className={styles.label}>Full Stack Web Developer</p>

            <h1 className={styles.name} ref={nameRef}>
              <span className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                Ismail
              </span>
              <span style={{ display: 'inline-block' }}>&nbsp;</span>
              <span className="word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                Chaouki
              </span>
            </h1>

            <div className={styles.roleContainer}>
              <span className={styles.roleText} ref={roleRef}>{roles[roleIndex]}</span>
            </div>

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
              {cvUrl && (
                <a
                  href={cvUrl}
                  className={`${styles.btn} ${styles.btnGhost}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV
                </a>
              )}
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