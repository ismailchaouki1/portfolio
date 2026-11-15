import styles from './Navbar.module.css';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Minimal blueprint-sticky navbar: IC monogram logo, links, mobile menu, theme toggle
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme'); } catch { return undefined; }
  });
  const setT = (t) => { try { localStorage.setItem('theme', t); } catch {} setTheme(t); };

  // IntersectionObserver to highlight active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const links = document.querySelectorAll('.nav-link');
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            links.forEach((l, idx) => l.classList.toggle('active', idx === i));
          }
        });
      },
      { rootMargin: '-200px 0px' }
    );
    const sections = document.querySelectorAll('section');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setT('dark');
      document.documentElement.dataset.theme = 'dark';
    }
  }, [theme]);

  return (
    <nav
      className={styles.navContainer}
      aria-label="Main navigation"
    >
      <div className={styles.navContainerInner}>
        {/* IC monogram logo (monospace) */}
        <button
          aria-label="Home"
          className={styles.logo}
          onClick={() => setOpen(false)}
        >
          <span className="text-xs font-mono uppercase">IC</span>
        </button>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          <a
            href="#about"
            className={styles.navLink}
            aria-label="About"
          >
            About
          </a>
          <a
            href="#skills"
            className={styles.navLink}
            aria-label="Skills"
          >
            Skills
          </a>
          <a
            href="#experience"
            className={styles.navLink}
            aria-label="Experience"
          >
            Experience
          </a>
          <a
            href="#projects"
            className={styles.navLink}
            aria-label="Projects"
          >
            Projects
          </a>
          <a
            href="#contact"
            className={styles.navLink}
            aria-label="Contact"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu button -->
        <button
          aria-label="Open menu"
          className={styles.mobileToggle}
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 12l2-2l10 10L9 21l2-2L3 12z" />
          </svg>
        </button>
        {/* /mobile menu button -->

        {/* Theme toggle button -->
        <button
          aria-label="Toggle dark mode"
          className={styles.themeToggle}
          onClick={() => setT(theme === 'dark' ? 'light' : 'dark')}
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            onclick="event.stopPropagation()"
          >
            <path
              d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm5 14H7l5 5 5-5h5v-2h-5v-3h5V7zm7.5-7c.83 0 1.5.68 1.5 1.5S14.83 8.5 14 8.5S12.5 7.82 12.5 7c0-.83.67-1.5 1.5-1.5zM12 5.5l5 4.98L12 15l-5-4.98L12 5.5z"
            />
          </svg>
        </button>
        {/* /theme toggle */}
      </div>

      {/* Mobile slide-in menu -->
      <div
        className={styles.mobileMenu}
        aria-label="Mobile menu"
      >
        <div className="flex flex-col h-full p-6 pt-12 gap-6">
          <button
            aria-label="Close menu"
            className={styles.mobileClose}
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <a
            href="#about"
            className={styles.mobileLink}
            aria-label="About"
          >
            About
          </a>
          <a
            href="#skills"
            className={styles.mobileLink}
            aria-label="Skills"
          >
            Skills
          </a>
          <a
            href="#experience"
            className={styles.mobileLink}
            aria-label="Experience"
          >
            Experience
          </a>
          <a
            href="#projects"
            className={styles.mobileLink}
            aria-label="Projects"
          >
            Projects
          </a>
          <a
            href="#contact"
            className={styles.mobileLink}
            aria-label="Contact"
          >
            Contact
          </a>
        </div>
      </div>
      {/* /mobile slide-in menu */}
    </nav>
  );
}