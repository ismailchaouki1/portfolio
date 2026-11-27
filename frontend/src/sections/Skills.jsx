import { useRef } from 'react';
import { useReveal } from '../hooks/useReveal';
import { skills } from '../data/content';
import {
  SiJavascript,
  SiPhp,
  SiPython,
  SiReact,
  SiHtml5,
  SiCss,
  SiSass,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGitlab,
  SiPostman,
  SiVercel,
  SiNetlify,
  SiXampp,
  SiApache,
  SiFigma,
  SiMui,
  SiChakraui,
  SiGsap,
} from 'react-icons/si';
import { FaCube, FaImage } from 'react-icons/fa6';
import styles from './Skills.module.css';
import { ErrorBoundary } from '../components/ErrorBoundary';

const iconMap = {
  Languages: {
    'JavaScript (ES6+)': SiJavascript,
    PHP: SiPhp,
    Python: SiPython,
  },
  Frontend: {
    'React.js': SiReact,
    'HTML5': SiHtml5,
    'CSS3': SiCss,
    SASS: SiSass,
    Bootstrap: SiBootstrap,
    'Material UI': SiMui,
    'Chakra UI': SiChakraui,
    GSAP: SiGsap,
    'React Three Fiber': FaCube,
  },
  Backend: {
    'Node.js': SiNodedotjs,
    'Express.js': SiExpress,
    Laravel: SiLaravel,
    'REST APIs': { type: 'badge', label: 'API' },
    'JWT Authentication': { type: 'badge', label: 'JWT' },
  },
  Databases: {
    MySQL: SiMysql,
    MongoDB: SiMongodb,
    Firebase: SiFirebase,
  },
  'Tools & Platforms': {
    Git: SiGit,
    GitHub: SiGithub,
    GitLab: SiGitlab,
    Postman: SiPostman,
    Vercel: SiVercel,
    Netlify: SiNetlify,
    XAMPP: SiXampp,
    Apache: SiApache,
    Laragon: { type: 'badge', label: 'La' },
  },
  Design: {
    Figma: SiFigma,
    'Adobe XD': { type: 'badge', label: 'Xd' },
    Canva: FaImage,
  },
  Methodologies: {
    Agile: { type: 'badge', label: 'A' },
    Scrum: { type: 'badge', label: 'S' },
    'Clean Code': { type: 'badge', label: 'CC' },
    MVC: { type: 'badge', label: 'MV' },
  },
};

const SkillIcon = ({ name, categoryIconMap }) => {
  const Icon = categoryIconMap?.[name];

  if (Icon && typeof Icon === 'object' && Icon.type === 'badge') {
    return (
      <span className={styles.iconBadge}>
        {Icon.label}
      </span>
    );
  }

  const IconComponent = Icon;
  return <IconComponent className={styles.skillIcon} aria-hidden="true" />;
};

const SkillChip = ({ name }) => (
  <span className={styles.skillChip}>
    {name}
  </span>
);

export default function Skills() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useReveal(sectionRef, { once: true });

  return (
    <ErrorBoundary title="Skills Section Error">
      <section id="skills" className={styles.section} ref={sectionRef}>
        <div className={styles.bgLayer} aria-hidden="true" />
        <div className={styles.bgOverlay} aria-hidden="true" />

        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Skills</h2>
        </div>

        <div className={styles.skillsGrid} ref={gridRef}>
          {skills.map((skill, index) => {
            let cardClass = styles.skillCardMedium;
            let isMethodologies = skill.category === 'Methodologies';

            if (skill.category === 'Frontend' || skill.category === 'Backend') {
              cardClass = styles.skillCardLarge;
            } else if (isMethodologies) {
              cardClass = styles.skillCardWide;
            }

            const categoryIconMap = iconMap[skill.category];

            return (
              <div key={skill.category} className={`${styles.skillCard} ${cardClass}`}>
                <h3 className={styles.skillCategory}>{skill.category}</h3>
                <div className={styles.skillChiplist}>
                  {skill.items.map((item, i) => (
                    <div key={i} className={styles.skillItemWrapper}>
                      <SkillIcon name={item} categoryIconMap={categoryIconMap} />
                      <SkillChip name={item} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </ErrorBoundary>
  );
}