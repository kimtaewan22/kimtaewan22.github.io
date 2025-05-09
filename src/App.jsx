import React, { useState } from 'react';
import Intro from './components/Intro';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const sectionIds = ['about', 'skills', 'projects', 'contact'];

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <span className="navbar-logo">Taewan</span>
        <div className="navbar-menu">
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </div>
      </nav>
      <div className="sections">
        <section id="intro" className="snap-section"><Intro /></section>
        <section id="about" className="snap-section"><About /></section>
        <section id="skills" className="snap-section"><Skills /></section>
        <section id="projects" className="snap-section"><Projects /></section>
        <section id="contact" className="snap-section"><Contact /></section>
      </div>
    </div>
  );
}

export default App;
