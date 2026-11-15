import styles from './Hero.module.css';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current && typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { duration: 1 } });

      // Fade in the name/title
      tl.from(heroRef.current.querySelector('.hero-name'), {
        opacity: 0,
        y: 20,
      });
      // Stagger the role
      tl.from(heroRef.current.querySelector('.hero-role'), {
        opacity: 0,
        y: 20,
        delay: 0.2,
      });
      // Stagger the two buttons
      tl.from(heroRef.current.querySelectorAll('.hero-btn'), {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        delay: 0.4,
      });
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.heroGrid} />
      <div className={styles.heroGridFine} />
      <div className={styles.heroContent}>
        <h1 className={styles.heroName}>Ismail Chaouki</h1>
        <p className={styles.heroRole}>Full Stack Web Developer • React, Express, Laravel</p>
        <div className={styles.heroButtons}>
          <button className={styles.heroBtnPrimary} aria-label="View projects">View projects</button>
          <button className={styles.heroBtnSecondary} aria-label="Contact">Contact</button>
        </div>
      </div>
    </section>
  );
}