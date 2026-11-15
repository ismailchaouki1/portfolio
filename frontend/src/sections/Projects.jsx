import styles from './Projects.module.css';
import { projects } from '../data/content';

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className="section-head">
        <h2 className={styles.sectionTitle}>Projects</h2>
      </div>
      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.projectImage} />
            <div className={styles.projectInfo}>
              <h3 className={styles.projectName}>{project.name}</h3>
              <p className={styles.projectDesc}>{project.description}</p>
              <div className={styles.projectStack}>
                {project.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}