import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { education } from '../data/content';
import styles from './About.module.css';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function About() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useReveal(sectionRef, { once: true });

  return (
    <ErrorBoundary title="About Section Error">
      <section className={styles.aboutSection} ref={sectionRef}>
        <div className={styles.bgLayer} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />

        <div className={styles.container}>
          <div className={styles.grid}>
            <div className={styles.portraitWrapper} ref={leftRef}>
              <img
                src="/assets/ISMAIL_CHAOUKI.jpg"
                alt="Ismail Chaouki - Full Stack Web Developer"
                className={styles.portrait}
                width={300}
                height={300}
              />
            </div>

            <div className={styles.contentWrapper} ref={rightRef}>
              <h2 className={styles.sectionTitle}>About</h2>

              <p className={styles.paragraph}>
                Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
              </p>

              <p className={styles.paragraph}>
                Currently interning at FlexBusiness on an audit-log microservice and at Codveda, where I shipped
                7 projects end-to-end.
              </p>

              <div className={styles.factsRow}>
                <div className={styles.factItem}>7 projects delivered at Codveda</div>
                <div className={styles.factItem}>2 internships in 2026</div>
                <div className={styles.factItem}>OFPPT Full Stack, 2024-2026</div>
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