import { useState } from 'react';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import './styles/global.css';

export default function App() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaderComplete(true)} />
      <Navbar />
      {loaderComplete && (
        <>
          <Hero />
          <main>
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
