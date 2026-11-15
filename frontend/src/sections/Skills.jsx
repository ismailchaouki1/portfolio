import styles from './Skills.module.css';
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

export default function Skills() {
  useEffect(() => {
    if (prefersReduced) return;

    // Animate skill cards into view
    const cards = document.querySelectorAll('.skills-section .opacity-0.translate-y-4');
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          delay: i * 0.15,
          duration: 0.6
        }
      );
    });

    return () => {
      cards.forEach(card => gsap.killTweensOf(card));
    };
  }, [prefersReduced]);

  return (
    <section className="skills-section min-h-screen relative overflow-x-hidden bg-[--bg] bg-noise data-[theme=dark]:bg-[--bg-dark]">
      <NoiseLayer />

      <div className={styles.sectionPadding}>
        <div className={styles.sectionMax}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className="text-[--text-dim] text-lg leading-relaxed mb-8">
            Proficient in modern web technologies across languages, frontend frameworks, backend environments, databases, tools and platforms, design software, and development methodologies.
          </p>

          {/* Certifications row */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {certifications.map((cert, i) => (
              <div key={i} className={styles.certItem}>
                <span className="text-[--text-dim] text-sm">{cert.name}</span>
                <span className="text-[--text-dim] text-xs opacity-70">{cert.year || ''}</span>
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