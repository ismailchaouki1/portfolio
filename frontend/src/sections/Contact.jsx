import styles from './Contact.module.css';
import { personal } from '../data/content';
import { contactApi } from '../services/api';
import { useState, useEffect } from 'react';

export default function Contact() {
  const [status, setStatus] = useState({
    state: 'idle',
    message: '',
    error: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: '', error: false });

    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Client-side validation
    if (!name || name.trim().length < 2) {
      setStatus({ state: 'error', message: 'Name must be at least 2 characters', error: true });
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ state: 'error', message: 'Valid email required', error: true });
      return;
    }
    if (!message || message.trim().length < 10) {
      setStatus({ state: 'error', message: 'Message must be at least 10 characters', error: true });
      return;
    }

    try {
      const result = await contactApi.submit({
        name,
        email,
        message,
        honeypot: formData.get('honeypot')
      });
      setStatus({ state: 'success', message: 'Message sent successfully!', error: false });
    } catch (err) {
      setStatus({ state: 'error', message: 'Failed to send message. Please try again.', error: true });
    }
  };

  // Reset status after 5 seconds
  useEffect(() => {
    let timeout;
    if (status.state !== 'idle') {
      timeout = setTimeout(() => setStatus({ state: 'idle', message: '', error: null }), 5000);
    }
    return () => clearTimeout(timeout);
  }, [status.state]);

  return (
    <section id="contact" className={`section container ${styles.contact}`}>
      <div className="section-head">
        <h2 className={styles.sectionTitle}>Contact</h2>
      </div>
      <div className={styles.contactGrid}>
        <div className={styles.contactCard}>
          <form className={styles.contactForm} onSubmit={handleSubmit} autoComplete="off">
            <input type="hidden" name="honeypot" className={styles.honeypot} />
            <label htmlFor="name" className={styles.contactLabel}>
              Name
              <input id="name" type="text" name="name" className={styles.contactInput} required minLength={2} />
            </label>
            <label htmlFor="email" className={styles.contactLabel}>
              Email
              <input id="email" type="email" name="email" className={styles.contactInput} required />
            </label>
            <label htmlFor="message" className={styles.contactLabel}>
              Message
              <textarea id="message" name="message" className={styles.contactTextarea} required minLength={10}>
              </textarea>
            </label>
            <button type="submit" className={styles.contactSubmit} disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Sending...' : 'Send'}
            </button>
            {status.state !== 'idle' && (
              <p className={status.state === 'success' ? 'text-[--text]' : 'text-[--text-dim] text-sm mt-2'}>{status.message}</p>
            )}
          </form>
        </div>
        <div className={styles.contactCard}>
          <h3>Get in Touch</h3>
          <address>
            <p>{personal.location}</p>
            <p>
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
            </p>
            <div>
              <a href={personal.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}