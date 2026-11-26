import styles from './Skills.module.css';
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
  SiDocker,
  SiFigma,
  SiMui,
  SiChakraui,
  SiGsap,
  SiVite,
} from 'react-icons/si';
import { FaBug, FaLightbulb, FaCube, FaPuzzlePiece, FaImage, FaBox, FaDatabase } from 'react-icons/fa6';
import { IoIosLink } from 'react-icons/io';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  // Languages
  'JavaScript (ES6+)': SiJavascript,
  PHP: SiPhp,
  Python: SiPython,

  // Frontend (large card)
  'React.js': SiReact,
  'HTML5': SiHtml5,
  'CSS3': SiCss,
  SASS: SiSass,
  Bootstrap: SiBootstrap,
  'Material UI': SiMui,
  'Chakra UI': SiChakraui,
  GSAP: SiGsap,
  'React Three Fiber': FaCube,

  // Backend (large card)
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Laravel: SiLaravel,
  'REST APIs': FaBug,
  'JWT Authentication': FaLightbulb,

  // Databases (medium card)
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Firebase: SiFirebase,

  // Tools & Platforms (medium card)
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Postman: SiPostman,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  XAMPP: SiXampp,
  Apache: SiApache,
  Laragon: SiDocker,

  // Design (medium card)
  Figma: SiFigma,
  'Adobe XD': SiFigma,
  Canva: FaImage,

  // Methodologies (wide strip - text badges)
  Agile: 'badge',
  Scrum: 'badge',
  'Clean Code': FaLightbulb,
  MVC: FaBug,
};

const SkillIcon = ({ name }) => {
  const Icon = iconMap[name];

  if (Icon === 'badge') {
    const letters = name.split(' ').map(l => l[0]).join('');
    return (
      <span className={styles.iconBadge}>
        {letters}
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
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.skillCard');
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
        gsap.set(cards, { opacity: 0, y: 30 });
        gsap.from(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            end: 'bottom 70%',
            toggleAction: 'play',
          },
        });
      } else {
        gsap.set(cards, { opacity: 1, y: 0 });
      }
    }

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

      <div className={styles.skillsGrid} ref={gridRef}>
        {skills.map((skill, index) => {
          let cardClass = styles.skillCardMedium;
          let isMethodologies = skill.category === 'Methodologies';

          if (skill.category === 'Frontend' || skill.category === 'Backend') {
            cardClass = styles.skillCardLarge;
          } else if (isMethodologies) {
            cardClass = styles.skillCardWide;
          }

          return (
            <div key={skill.category} className={cardClass}>
              <h3 className={styles.skillCategory}>{skill.category}</h3>
              <div className={styles.skillChiplist}>
                {skill.items.map((item, i) => (
                  <div key={i} className={styles.skillItemWrapper}>
                    {iconMap[item] === 'badge' ? (
                      <span className={styles.iconBadge}>
                        {item.split(' ').map(l => l[0]).join('')}
                      </span>
                    ) : (
                      <SkillIcon name={item} />
                    )}
                    <SkillChip name={item} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional tech marquee */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          <span>React.js &nbsp;|&nbsp; Node.js &nbsp;|&nbsp; Express.js &nbsp;|&nbsp; Laravel &nbsp;|&nbsp; MySQL &nbsp;|&nbsp; MongoDB &nbsp;|&nbsp; Firebase &nbsp;|&nbsp; HTML5 &nbsp;|&nbsp; CSS3 &nbsp;|&nbsp; JavaScript</span>
        </div>
      </div>
    </section>
  );
}