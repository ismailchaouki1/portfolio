import styles from './Projects.module.css';
import { projects } from '../data/content';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const getProjectImage = (projectId) => {
  const imagePaths = {
    'audit-log-microservice': 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230f172a"/><rect x="50" y="80" width="700" height="360" fill="%231e293b" rx="12"/><rect x="60" y="90" width="120" height="80" fill="%23475569" rx="6"/><rect x="620" y="90" width="120" height="80" fill="%23475569" rx="6"/><rect x="60" y="180" width="340" height="60" fill="%2364748b" rx="6"/><rect x="400" y="180" width="340" height="60" fill="%2364748b" rx="6"/><rect x="60" y="260" width="340" height="60" fill="%23475569" rx="6"/><rect x="400" y="260" width="340" height="60" fill="%23475569" rx="6"/><text x="400" y="340" text-anchor="middle" fill="%23cbd5e1" font-family="monospace" font-size="24">Auth Dashboard</text><text x="400" y="380" text-anchor="middle" fill="%2394a3b8" font-family="monospace" font-size="16">React Node MySQL</text></svg>',
    'driving-school': 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230f172a"/><rect x="50" y="80" width="700" height="360" fill="%231e293b" rx="12"/><rect x="100" y="120" width="80" height="60" fill="%23475569" rx="6"/><rect x="220" y="120" width="80" height="60" fill="%23475569" rx="6"/><rect x="340" y="120" width="80" height="60" fill="%23475569" rx="6"/><rect x="460" y="120" width="80" height="60" fill="%23475569" rx="6"/><text x="400" y="280" text-anchor="middle" fill="%23cbd5e1" font-family="monospace" font-size="24">SaaS Dashboard</text><text x="400" y="320" text-anchor="middle" fill="%2394a3b8" font-family="monospace" font-size="16">Laravel Vue MySQL</text></svg>',
    'weather-app': 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"><rect width="800" height="500" fill="%230f172a"/><rect x="50" y="80" width="700" height="360" fill="%231e293b" rx="12"/><circle cx="400" cy="240" r="80" fill="%2360a5fa"/><text x="400" y="300" text-anchor="middle" fill="%23cbd5e1" font-family="monospace" font-size="20">Weather App</text><text x="400" y="340" text-anchor="middle" fill="%2394a3b8" font-family="monospace" font-size="16">React MUI Axios</text></svg>',
  };
  return imagePaths[projectId] || null;
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const gridRef = useRef(null);

  const allTech = ['all', 'React', 'Laravel', 'Node.js/Express'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.stack.some((tech) => tech.includes(activeFilter));
  });

  useEffect(() => {
    if (!gridRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(gridRef.current.children, { opacity: 1, scale: 1 });
      return;
    }

    const cards = gridRef.current.querySelectorAll(`.${styles.projectCard}`);
    const tl = gsap.timeline();
    tl.set(cards, { opacity: 0, scale: 0.95 });

    setTimeout(() => {
      tl.to(cards, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
      });
    }, 50);

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 5;
      const rotateY = ((x - centerX) / centerX) * -5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = (e) => {
      e.currentTarget.style.transform = 'perspective(1000px)';
    };

    const cardsArray = Array.from(cards);
    cardsArray.forEach((card) => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cardsArray.forEach((card) => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [activeFilter]);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Projects</h2>
        </div>

        <div className={styles.filterPills}>
          {allTech.map((tech) => (
            <button
              key={tech}
              className={`${styles.filterPill} ${activeFilter === tech.toLowerCase() ? styles.active : ''}`}
              onClick={() => setActiveFilter(tech.toLowerCase())}
              aria-pressed={activeFilter === tech.toLowerCase()}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className={styles.projectGrid} ref={gridRef}>
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.id}-${index}`}
              className={styles.projectCard}
              style={{ display: 'block', transition: 'transform 0.3s ease' }}
            >
              <div
                className={styles.projectImageWrapper}
                style={{
                  backgroundImage: getProjectImage(project.id)
                    ? `url(${getProjectImage(project.id)})`
                    : 'none',
                }}
              >
                <div className={styles.projectOverlay}>
                  <a href="#projects" className={styles.viewProjectBtn}>
                    View Project
                  </a>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectYear}>{project.year}</p>
                <p className={styles.projectDesc}>{project.description}</p>
                <div className={styles.projectStack}>
                  {project.stack.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}