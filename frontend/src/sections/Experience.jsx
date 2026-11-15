import styles from './Experience.module.css';
import { experience } from '../data/content';
import TopographicBackground from '../components/TopographicBackground';

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <TopographicBackground />
      <div className={styles.sectionHead}>
        <h2 className={styles.sectionTitle}>Experience</h2>
      </div>
      <div className={styles.expTimeline}>
        <div className={styles.expTimelineLine} aria-hidden="true" />
        {experience.map((exp, i) => (
          <div
            key={exp.id}
            className={styles.expTimelineItem}
            style={{ transition: i % 2 === 0 ? 'opacity 0.6s ease, transform 0.6s ease' : 'opacity 0.4s ease, transform 0.4s ease' }}
          >
            <div className={styles.expNode} aria-hidden="true" />
            <div className={styles.expCard}>
              <h3 className={styles.expRole}>{exp.role} @ {exp.company}</h3>
              <p className={styles.expDate}>{exp.start} – {exp.end}</p>
              <ul className={styles.expList}>
                {exp.bullets.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}