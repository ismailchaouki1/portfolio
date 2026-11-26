import styles from './Navbar.module.css';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
    } catch {
      /* ignore */
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

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
      { rootMargin: '-200px 0px' },
    );
    const sections = document.querySelectorAll('section');
    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <nav className={`${styles.menu} ${open ? styles.open : ''}`}>
      <div className={styles.navContainerInner}>
        {/* IC monogram logo (monospace) */}
        <button
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.menuLogo}>IC</span>
        </button>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          <a href="#about" className={styles.navLink} aria-label="About navigation">
            About
          </a>
          <a href="#skills" className={styles.navLink} aria-label="Skills navigation">
            Skills
          </a>
          <a href="#experience" className={styles.navLink} aria-label="Experience navigation">
            Experience
          </a>
          <a href="#projects" className={styles.navLink} aria-label="Projects navigation">
            Projects
          </a>
          <a href="#contact" className={styles.navLink} aria-label="Contact navigation">
            Contact
          </a>
        </div>

        <button
          className={styles.mobileToggle}
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <svg
            className={styles.menuIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button
          className={styles.themeToggle}
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          <svg
            className={styles.themeIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v1M12 21v1M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M1 12h2M21 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuContent}>
          <button
            className={styles.mobileMenuBtn}
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <svg
              className={styles.menuIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <a
            href="#about"
            className={styles.mobileLink}
            aria-label="About navigation"
            onClick={() => setOpen(false)}
          >
            About
          </a>
          <a
            href="#skills"
            className={styles.mobileLink}
            aria-label="Skills navigation"
            onClick={() => setOpen(false)}
          >
            Skills
          </a>
          <a
            href="#experience"
            className={styles.mobileLink}
            aria-label="Experience navigation"
            onClick={() => setOpen(false)}
          >
            Experience
          </a>
          <a
            href="#projects"
            className={styles.mobileLink}
            aria-label="Projects navigation"
            onClick={() => setOpen(false)}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={styles.mobileLink}
            aria-label="Contact navigation"
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}