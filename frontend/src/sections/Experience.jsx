import styles from './Experience.module.css';
import { experience } from '../data/content';
import TopographicBackground from '../components/TopographicBackground';

export default function Experience() {
  return (
    <section id="experience" className={`section container ${styles.experience}`}>
      <TopographicBackground reducedMotion={false} />
      <div className="section-head">
        <h2 className={styles.sectionTitle}>Experience</h2>
      </div>
      <div className="exp-timeline">
        <div className="exp-timeline-line" aria-hidden="true" />
        {experience.map((exp, i) => (
          <div
            key={exp.id}
            className="exp-timeline-item"
            style={{ transition: i % 2 === 0 ? 'opacity 0.6s ease, transform 0.6s ease' : 'opacity 0.4s ease, transform 0.4s ease' }}
          >
            <div className="exp-node" aria-hidden="true" />
            <div className="exp-card">
              <h3 className={styles.role}>{exp.role} @ {exp.company}</h3>
              <p className={styles.date}>{exp.start} – {exp.end}</p>
              <ul className={styles.list}>
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