import styles from './About.module.css';
import { useEffect } from 'react';
import { gsap } from 'gsap';

const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

// Individual skill "spec sheet" card
const SkillCard = ({ category, items }) => (
  <div className={styles.sectionCard}>
    <h3 className={styles.sectionTitle}>{category}</h3>
    <ul className="space-y-1 text-sm">
      {items.map((item, i) => (
        <li key={i} className="flex items-start">
          <span className="text-[--text] w-2 flex-shrink-0">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 5.876L5.018 13.077a1 1 0 0 0 0 1.952l7.06 5.155a1 1 0 0 0 1.532-.739H17a1 1 0 0 0 1-1.936 1 1 0 0 0-1.998-.197l-7.126-5.194a1 1 0 0 0-.106-1.738C15.174 5.904 13.528 5 11.807 5c-1.72 0-3.27.723-4.397 1.853L5.023 13.055a1 1 0 0 0 0 1.952l7.058 5.155a1 1 0 0 0 1.532.739h2.023c.057.315.027.68-.088.933L12 20.58a1 1 0 0 0 .934.07l6.96-5.067a1 1 0 0 0-.106-1.738C18.73 5.904 17.084 5 15.347 5c-1.721 0-3.276.723-4.393 1.853z" />
            </svg>
          </span>
          <span className="pl-2">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function About() {
  useEffect(() => {
    // Apply noise texture only to this section; clean up on unmount
    const style = document.createElement('style');
    style.textContent = '.about-section { --animation-duration: 0s; }';
    document.head.appendChild(style);
    return () => { if (style.parentNode) style.parentNode.removeChild(style); };
  }, []);

  return (
    <section className="about-section min-h-screen relative overflow-x-hidden bg-[--bg] bg-noise data-[theme=dark]:bg-[--bg-dark]">
      <NoiseLayer />

      <div className={styles.sectionPadding}>
        <div className={styles.sectionMax}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className="text-[--text-dim] text-lg leading-relaxed mb-8">
            Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL. Currently interning at FlexBusiness on an audit-log microservice and at Codveda, where I shipped 7 projects end-to-end. I care about clean data models, small bundles and interfaces that actually get used.
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

      <aside className="space-y-6">
        <SkillCard category="Languages" items={skills[0].items} />
        <SkillCard category="Frontend" items={skills[1].items} />
        <SkillCard category="Backend" items={skills[2].items} />
        <SkillCard category="Databases" items={skills[3].items} />
        <SkillCard category="Tools & Platforms" items={skills[4].items} />
        <SkillCard category="Design" items={skills[5].items} />
        <SkillCard category="Methodologies" items={skills[6].items} />
      </aside>
    </section>
  );
}