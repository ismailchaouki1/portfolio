import styles from './Skills.module.css';
import { skills } from '../data/content';

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
  return (
    <section className="skills-section min-h-screen relative overflow-x-hidden bg-[--bg] bg-noise data-[theme=dark]:bg-[--bg-dark]">
      <div className={styles.sectionPadding}>
        <div className={styles.sectionMax}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className="text-[--text-dim] text-lg leading-relaxed mb-8">
            Proficient in modern web technologies across languages, frontend frameworks, backend
            environments, databases, tools and platforms, design software, and development
            methodologies.
          </p>
        </div>
      </div>

      <aside className="space-y-6">
        {skills.map((category) => (
          <SkillCard key={category.category} category={category.category} items={category.items} />
        ))}
      </aside>
    </section>
  );
}
