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

      // Draw the blueprint grid on mount
      if (!heroRef.current.dataset.gridDrawn) {
        drawBlueprintGrid(heroRef.current);
        heroRef.current.dataset.gridDrawn = 'true';
      }
    }
  }, []);

  return (
    <section
      className="hero min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      data-theme="light"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* 8px light-blue grid */}
        <div className="grid grid-cols-8 gap-2 bg-[--border] opacity-20 dark:bg-[--border-soft]" style="background-size: 40px 40px;" />
        {/* 40px light-blue grid */}
        <div className="grid grid-cols-40 gap-1 bg-[--border-soft] opacity-10" style="background-size: 8px 8px;" />
        {/* SVG browser + server + arrow */}
        <BrowserServerSVG />
      </div>

      <div className="relative flex flex-col min-h-screen pt-20 md:pt-32 px-4 md:px-6 max-w-2xl mx-auto">
        <div className="mx-auto text-center">
          <h1 className="hero-name text-5xl md:text-6xl font-black tracking-tight text-[--text] dark:text-[--bg-light]">
            Ismail Chaouki
          </h1>
          <p className="hero-role text-2xl md:text-3xl text-[--text-dim] mt-4 dark:text-[--text-dim-dark]">
            Full Stack Web Developer • React, Express, Laravel
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="hero-btn rounded-md border border-[--accent] bg-[--accent] text-[--text] font-medium px-6 py-3 hover:bg-[var(--accent-2)] transition-colors"
              aria-label="View projects"
            >
              View projects
            </button>
            <button
              className="hero-btn rounded-md border border-[--accent-2] bg-transparent text-[--accent-2] font-medium px-6 py-3 border-2 hover:bg-[var(--accent-2)] transition-colors"
              aria-label="Contact"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Inline SVG: blueprint of browser window + server box with arrow and labels
function BrowserServerSVG() {
  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-48 md:h-64"
      viewBox="0 0 200 120"
      aria-hidden="true"
    >
      <!-- Browser window -->
      <rect
        x="20"
        y="20"
        width="80"
        height="60"
        rx="6"
        stroke="var(--border)"
        stroke-width="1"
        fill="none"
      />
      <rect
        x="30"
        y="30"
        width="40"
        height="20"
        rx="3"
        stroke="var(--accent)"
        stroke-width="1"
        fill="none"
      />
      <!-- Server box -->
      <rect
        x="130"
        y="25"
        width="40"
        height="50"
        rx="4"
        stroke="var(--accent)"
        stroke-width="1"
        fill="none"
      />
      <!-- Arrow from browser to server -->
      <line
        x1="110"
        y1="50"
        x2="130"
        y2="50"
        stroke="var(--accent)"
        stroke-width="1"
        stroke-linecap="round"
      />
      <line
        x1="115"
        y1="45"
        x2="125"
        y2="55"
        stroke="var(--accent)"
        stroke-width="1"
        stroke-linecap="round"
      />
      <line
        x1="115"
        y1="55"
        x2="125"
        y2="45"
        stroke="var(--accent)"
        stroke-width="1"
        stroke-linecap="round"
      />
      <!-- Dimension labels -->
      <text
        x="50"
        y="50"
        font-family: var(--font-mono)
        font-size="0.6rem"
        fill="var(--text-dim)"
        text-anchor="middle"
      >
        REST API
      </text>
      <text
        x="170"
        y="50"
        font-family: var(--font-mono)
        font-size="0.6rem"
        fill="var(--text-dim)"
        text-anchor="middle"
      >
        React UI
      </text>
      <!-- Grid size labels -->
      <text
        x="100"
        y="20"
        font-family: var(--font-mono)
        font-size="0.5rem"
        fill="var(--text-faint)"
        text-anchor="middle"
      >
        8px grid
      </text>
      <text
        x="100"
        y="100"
        font-family: var(--font-mono)
        font-size="0.5rem"
        fill="var(--text-faint)"
        text-anchor="middle"
      >
        40px grid
      </text>
    </svg>
  );
}