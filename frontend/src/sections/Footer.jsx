import styles from './Footer.module.css';
import { personal } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <button onClick={scrollToTop} className={styles.backToTop} aria-label="Back to top">
          ↑
        </button>
        <div className={styles.footerContent}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </span>
          <span className={styles.built}>
            Built with React
          </span>
        </div>
      </div>
    </footer>
  );
}