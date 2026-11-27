import { useState } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      <Navbar />
      {loaderComplete && (
        <>
          <ErrorBoundary title="Hero Section">
            <Hero />
          </ErrorBoundary>
          <main>
            <ErrorBoundary title="About Section">
              <About />
            </ErrorBoundary>
            <ErrorBoundary title="Skills Section">
              <Skills />
            </ErrorBoundary>
            <ErrorBoundary title="Experience Section">
              <Experience />
            </ErrorBoundary>
            <ErrorBoundary title="Projects Section">
              <Projects />
            </ErrorBoundary>
            <ErrorBoundary title="Contact Section">
              <Contact />
            </ErrorBoundary>
          </main>
          <ErrorBoundary title="Footer">
            <Footer />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}