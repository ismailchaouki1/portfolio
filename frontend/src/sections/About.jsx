import styles from './About.module.css';
import { useEffect } from 'react';
import { education, certifications } from '../data/content';
// Noise texture SVG (static, very fine grain)
const NoiseLayer = () => (
  <svg className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
    <defs>
      <filter id="blur" className="filter">
        <feGaussianBlur stdDeviation="0.5" />
      </filter>
    </defs>
    <rect width="400" height="400" fill="url(#noise)" />
    <svg_pattern id="noise" width="400" height="400" patternUnits="userSpaceOnUse">
      <rect width="4" height="4" fill="currentColor" />
    </svg_pattern>
  </svg>
);

export default function About() {
  useEffect(() => {
    // Apply noise texture only to this section; clean up on unmount
    const style = document.createElement('style');
    style.textContent = '.about-section { --animation-duration: 0s; }';
    document.head.appendChild(style);
    return () => {
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return (
    <section className="about-section min-h-dvh relative overflow-x-hidden bg-[--bg] bg-noise data-[theme=dark]:bg-[--bg-dark]">
      <NoiseLayer />

      <div className={styles.sectionPadding}>
        <div className={styles.sectionMax}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className="text-[--text-dim] text-lg leading-relaxed mb-8">
            Full-stack developer building fast, accessible web apps with React, Node/Express,
            Laravel and MySQL. Currently interning at FlexBusiness on an audit-log microservice and
            at Codveda, where I shipped 7 projects end-to-end. I care about clean data models, small
            bundles and interfaces that actually get used.
          </p>

          {/* Education row */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {education.map((edu, i) => (
              <div key={i} className={styles.sectionCard}>
                <h4 className={styles.educationSchool}>{edu.school}</h4>
                <p className={styles.educationDegree}>{edu.degree}</p>
                <p className={styles.educationYear}>{edu.year}</p>
                {edu.detail && <p className="text-[--text-dim] text-xs mt-1">{edu.detail}</p>}
              </div>
            ))}
          </div>

          {/* Certifications row */}
          <div className="grid grid-cols-2 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className={styles.certItem}>
                <span className={styles.certName}>{cert.name}</span>
                <span className={styles.certYear}>{cert.year || ''}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
