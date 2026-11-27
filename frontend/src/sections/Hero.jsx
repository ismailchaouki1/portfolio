import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { ErrorBoundary } from '../components/ErrorBoundary';
import RotatingText from '../components/reactbits/RotatingText/RotatingText';
import StarBorder from '../components/reactbits/StarBorder/StarBorder';
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

  useReveal(heroRef, { once: true });

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
              <RotatingText
                texts={roles}
                rotationInterval={2500}
                color="var(--color-accent)"
              />
            </div>

            <p className={styles.pitch}>
              Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
              Currently interning at FlexBusiness on an audit-log microservice and at Codveda, where I shipped
              7 projects end-to-end.
            </p>

            <div className={styles.actions}>
              <StarBorder
                as="a"
                href="#projects"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                View projects
              </StarBorder>
              {cvUrl && (
                <StarBorder
                  as="a"
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  Download CV
                </StarBorder>
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