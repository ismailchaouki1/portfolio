import styles from './Hero.module.css';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import useMagnetic from '../hooks/useMagnetic';
import React from 'react';

const HeroScene = lazy(() => import('../components/hero/HeroScene'));

export default function Hero() {
  const heroRef = useRef(null);
  const nameRef = useRef(null);

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
    if (!heroRef.current || typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set(nameRef.current, { opacity: 1, y: 0 });
        return;
      }

      const nameChars = nameRef.current.querySelectorAll('.char');
      const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });

      tl.from(nameChars, {
        opacity: 0,
        y: 30,
        stagger: 0.05,
        delay: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <Suspense fallback={
        <div className={styles.bgLayer} style={{ opacity: 1 }} />
      }>
        <HeroScene />
      </Suspense>

      <div className={styles.technicalGrid} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.label}>Full Stack Web Developer</p>

          <h1 className={styles.name} ref={nameRef}>
            {('Ismail Chaouki').split(/\s+/).map((word, wi, words) => (
              <React.Fragment key={wi}>
                {word.split('').map((char, i) => (
                  <span key={`${wi}-${i}`} className="char" style={{ display: 'inline-block' }}>
                    {char}
                  </span>
                ))}
                {wi < words.length - 1 && <>&nbsp;</>}
              </React.Fragment>
            ))}
          </h1>

          <p className={styles.pitch}>
            Full-stack developer building fast, accessible web apps with React, Node/Express, Laravel and MySQL.
          </p>

          <div className={styles.actions}>
            <a
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
            <a href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>
              Contact
            </a>
          </div>

          <div className={styles.scrollCue}>
            <span className={styles.scrollText}>Scroll</span>
            <div className={styles.scrollLine} />
          </div>
        </div>
      </div>
    </section>
  );
}