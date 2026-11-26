import styles from './Skills.module.css';
import { skills } from '../data/content';
import { SiJavascript, SiPhp, SiPython, SiReact, SiHtml5, SiCss, SiSass, SiBootstrap, SiGulp, SiNodedotjs, SiExpress, SiLaravel, SiMysql, SiMongodb, SiFirebase, SiGit, SiGithub, SiGitlab, SiPostman, SiVercel, SiNetlify, SiDocker, SiInkscape, SiFigma, SiVite, SiNpm, SiC, SiCplusplus } from 'react-icons/si';
import { FaBug, FaLightbulb, FaCube, FaPuzzlePiece } from 'react-icons/fa6';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  // Languages
  'JavaScript (ES6+)': SiJavascript,
  PHP: SiPhp,
  Python: SiPython,

  // Frontend
  'React.js': SiReact,
  'HTML5': SiHtml5,
  'CSS3': SiCss,
  SASS: SiSass,
  Bootstrap: SiBootstrap,
  'Material UI': SiC,
  'Chakra UI': SiVite,
  GSAP: SiGulp,
  'React Three Fiber': FaCube, // Fallback to Fa6 - no direct Simple Icons equivalent

  // Backend
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Laravel: SiLaravel,
  'REST APIs': FaBug,
  'JWT Authentication': FaLightbulb,

  // Databases
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,

  // Tools & Platforms
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  XAMPP: SiDocker,
  Apache: SiC,
  Laragon: SiInkscape,

  // Design
  Figma: SiFigma,
  'Adobe XD': SiInkscape,
  Canva: SiC,

  // Methodologies
  Agile: SiC,
  Scrum: SiCplusplus,
  'Clean Code': FaLightbulb,
  MVC: FaBug,
};

const SkillCard = ({ category, items }) => {
  return (
    <div className={styles.sectionCard}>
      <h3 className={styles.sectionTitle}>{category}</h3>
      <ul className={styles.skillsList}>
        {items.map((item, i) => {
          const Icon = iconMap[item] || SiC;
          return (
            <li key={i} className={styles.skillItem}>
              <Icon className={styles.skillIcon} aria-hidden="true" />
              <span className={styles.skillName}>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default function Skills() {
  const headerRef = useRef(null);

  useEffect(() => {
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    headerTl.to(headerRef.current, {
      y: -20,
      ease: 'none',
    });

    return () => {
      if (headerTl) headerTl.kill();
    };
  }, []);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHead} ref={headerRef}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <p className={styles.sectionDesc}>
            Proficient in modern web technologies across languages, frontend frameworks, backend
            environments, databases, tools and platforms, design software, and development
            methodologies.
          </p>
        </div>
      </div>

      <div className={styles.skillsGrid}>
        {skills.map((category) => (
          <SkillCard key={category.category} category={category.category} items={category.items} />
        ))}
      </div>
    </section>
  );
}