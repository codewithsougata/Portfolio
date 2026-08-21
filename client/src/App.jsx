import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { LoaderFour } from './components/ui/loader';
import './index.css';

// Catches component render errors so the whole page doesn't go blank
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('Portfolio render error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#050505', color: '#fff', fontFamily: 'monospace', padding: 32, gap: 16
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>Something went wrong</h2>
          <pre style={{
            color: '#f87171', fontSize: 13, maxWidth: 600, whiteSpace: 'pre-wrap',
            background: 'rgba(255,0,0,0.06)', padding: 16, borderRadius: 8,
            border: '1px solid rgba(255,0,0,0.2)'
          }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '10px 24px', background: '#06b6d4', color: '#000', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: 'var(--bg)' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <LoaderFour text="Loading..." />
          </motion.div>
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ position: 'relative', minHeight: '100vh' }}
          >
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
              <Hero />
              <div className="border-t border-[var(--border2)] max-w-[960px] mx-auto opacity-60" />
              <About />
              <div className="border-t border-[var(--border2)] max-w-[960px] mx-auto opacity-60" />
              <Education />
              <div className="border-t border-[var(--border2)] max-w-[960px] mx-auto opacity-60" />
              <Projects />
              <div className="border-t border-[var(--border2)] max-w-[960px] mx-auto opacity-60" />
              <Certifications />
              <div className="border-t border-[var(--border2)] max-w-[960px] mx-auto opacity-60" />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default App;

