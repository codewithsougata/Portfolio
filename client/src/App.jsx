import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import GitHubSnake from './components/GitHubSnake';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import './index.css';

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Apply theme class to html element so CSS variables react
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <div key="portfolio" style={{ position: 'relative', minHeight: '100vh' }}>
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
              <Hero />
              <About />
              <GitHubSnake />
              <Education />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
