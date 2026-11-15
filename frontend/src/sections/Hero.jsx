import styles from './Hero.module.css';
import BlueprintSketch from '../components/BlueprintSketch';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (heroRef.current && typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } });
      tl.from(heroRef.current.querySelector('[data-anim="label"]'), { opacity: 0, y: 16 })
        .from(heroRef.current.querySelector('[data-anim="name"]'), { opacity: 0, y: 24 }, '-=0.55')
        .from(heroRef.current.querySelector('[data-anim="pitch"]'), { opacity: 0, y: 24 }, '-=0.55')
        .from(heroRef.current.querySelectorAll('[data-anim="btn"]'), { opacity: 0, y: 24, stagger: 0.15 }, '-=0.55');
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.gridFine} />
      <div className={styles.gridBold} />

      <div className={styles.container}>
        <div className={styles.text} ref={heroRef}>
          <p data-anim="label" className={styles.label}>Full Stack Web Developer</p>
          <h1 data-anim="name" className={styles.name}>Ismail Chaouki</h1>
          <p data-anim="pitch" className={styles.pitch}>
            Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
          </p>
          <div className={styles.actions}>
            <a data-anim="btn" href="#projects" className={`${styles.btn} ${styles.btnPrimary}`}>View projects</a>
            <a data-anim="btn" href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>Contact</a>
          </div>
        </div>

        <div className={styles.sketch}>
          <BlueprintSketch />
        </div>
      </div>
    </section>
  );
}
