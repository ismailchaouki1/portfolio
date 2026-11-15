import styles from './Experience.module.css';
import { experience } from '../data/content';

export default function Experience() {
  return (
    <section id="experience" className={`section container ${styles.experience}`}>
      <div className="section-head">
        <h2 className={styles.sectionTitle}>Experience</h2>
      </div>
      {experience.map((exp) => (
        <div key={exp.id} className={styles.expCard}>
          <h3 className={styles.role}>{exp.role} @ {exp.company}</h3>
          <p className={styles.date}>{exp.start} – {exp.end}</p>
          <ul className={styles.list}>
            {exp.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
