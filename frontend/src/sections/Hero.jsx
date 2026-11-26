import styles from './Hero.module.css';
import BlueprintSketch from '../components/BlueprintSketch';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useMagnetic from '../hooks/useMagnetic';

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  const {
    ref: magneticRef,
    pos: magneticPos,
    isActive: _isMagneticActive,
    handleMouseEnter: handleMouseEnterMag,
    handleMouseLeave: handleMouseLeaveMag,
    handleMouseMove: handleMouseMoveMag,
    applyTransform: _applyMagneticTransform,
  } = useMagnetic();

  useEffect(() => {
    if (heroRef.current && typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Parallax grid effect
      let startX = 0, startY = 0;
      const handleMouseMove = (e) => {
        if (prefersReduced) return;
        startX = (e.clientX / window.innerWidth - 0.5) * 4;
        startY = (e.clientY / window.innerHeight - 0.5) * 4;
        gsap.set(heroRef.current.querySelector('.technicalGrid'), {
          x: startX,
          y: startY,
        });
      };

      const cleanupParallax = () => {
        if (!prefersReduced && heroRef.current) {
          gsap.set(heroRef.current.querySelector('.technicalGrid'), { x: 0, y: 0 });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' } });

        tl.from(bgRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })
          .from(
            heroRef.current.querySelector('[data-anim="label"]'),
            { opacity: 0, y: 24 },
            0.4,
          )
          .from(
            heroRef.current.querySelector('[data-anim="name"]'),
            { opacity: 0, y: 32 },
            '-=,0.3',
          )
          .from(
            heroRef.current.querySelector('[data-anim="pitch"]'),
            { opacity: 0, y: 24 },
            '-=,0.3',
          )
          .from(
            heroRef.current.querySelectorAll('[data-anim="btn"]'),
            {
              opacity: 0,
              y: 24,
              stagger: 0.15,
            },
            '-=,0.3',
          );
      }, heroRef);

      return () => {
        cleanupParallax();
        window.removeEventListener('mousemove', handleMouseMove);
        ctx.revert();
      };
    }
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.bgLayer} ref={bgRef} />
      <div className={`${styles.technicalGrid} technicalGrid`} />

      <div className={styles.container}>
        <div className={styles.text}>
          <p data-anim="label" className={styles.label}>
            Full Stack Web Developer
          </p>
          <h1 data-anim="name" className={styles.name}>
            Ismail Chaouki
          </h1>
          <p data-anim="pitch" className={styles.pitch}>
            Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
          </p>
          <div className={styles.actions}>
            <a
              data-anim="btn"
              href="#projects"
              className={`${styles.btn} ${styles.btnPrimary}`}
              ref={magneticRef}
              onMouseEnter={handleMouseEnterMag}
              onMouseLeave={handleMouseLeaveMag}
              onMouseMove={handleMouseMoveMag}
              style={{
                transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              View projects
            </a>
            <a data-anim="btn" href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>
              Contact
            </a>
          </div>
        </div>

        <div className={styles.sketch}>
          <BlueprintSketch />
        </div>
      </div>
    </section>
  );
}