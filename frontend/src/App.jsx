import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import './styles/global.css';
import './App.css';
import { useState } from 'react';

export default function App() {
  const [navSection, setNavSection] = useState('about');

  const renderSection = () => {
    switch (navSection) {
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'projects':
        return <Projects />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <main>{renderSection()}</main>
    </>
  );
}