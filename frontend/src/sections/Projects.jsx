import styles from './Projects.module.css';
import { projects } from '../data/content';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const gridRef = useRef(null);

  // Extract unique tech stacks for filter pills
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

    // 3D tilt effect on mouse move
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
              <div className={styles.projectImageWrapper}>
                <div className={styles.projectImage} />
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