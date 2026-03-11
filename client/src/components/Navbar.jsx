import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Code } from 'lucide-react';
import { assets } from '../assets/assets';

const navLinks = [
  { name: 'home', href: '#home' },
  { name: 'about', href: '#about' },
  { name: 'education', href: '#education' },
  { name: 'projects', href: '#projects' },
  { name: 'contact', href: '#contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  const handleNavClick = () => {
    // Defer closing the menu slightly so mobile browsers can register
    // and initiate the native anchor smooth-scroll without interruption.
    setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Highlight active nav link based on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-50% 0px -45% 0px' }
    );
    navLinks.forEach(l => {
      const el = document.querySelector(l.href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
        background: scrolled ? 'var(--bg2)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        opacity: scrolled ? 0.95 : 1
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 58 }}>

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={handleNavClick}
            style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Desktop Logo (Icon + Text) */}
            <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8 }}>
              <span style={{
                width: 30, height: 30, borderRadius: 6,
                background: 'var(--cyan-dim)',
                border: '1px solid rgba(0,212,255,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Code size={14} color="var(--cyan)" />
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16, fontWeight: 700, color: 'var(--text)',
              }}>
                <span style={{ color: 'var(--cyan)' }}>S</span>ougata
              </span>
            </div>

            {/* Mobile Logo (User Image only) */}
            <div className="md:hidden">
              <img 
                src={assets.profile} 
                alt="Profile" 
                style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--cyan)', objectFit: 'cover' }}
              />
            </div>
          </motion.a>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ alignItems: 'center', gap: 4 }}>
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  padding: '5px 12px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  color: active === link.name.replace('#', '') ? 'var(--cyan)' : 'var(--text-dim)',
                  background: active === link.name.replace('#', '') ? 'var(--cyan-dim)' : 'transparent',
                  border: `1px solid ${active === link.name.replace('#', '') ? 'rgba(0,212,255,0.2)' : 'transparent'}`,
                }}
                onMouseEnter={e => {
                  if (active !== link.name) {
                    e.currentTarget.style.color = 'var(--text)';
                    e.currentTarget.style.background = 'var(--surface2)';
                  }
                }}
                onMouseLeave={e => {
                  if (active !== link.name) {
                    e.currentTarget.style.color = 'var(--text-dim)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.name}
              </a>
            ))}

            {/* Divider */}
            <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 8px' }} />

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 12px', borderRadius: 6,
                fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                color: 'var(--text-dim)',
                background: 'var(--surface2)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--cyan)';
                e.currentTarget.style.color = 'var(--cyan)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-dim)';
              }}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'light' : 'dark'}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="mobile-nav" style={{ alignItems: 'center', gap: 8 }}>
            <button onClick={toggleTheme} style={{ color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: 'var(--text-dim)', background: 'none', border: 'none', cursor: 'pointer', padding: 4, zIndex: 60 }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              background: 'var(--bg2)',
              opacity: 0.98,
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
              position: 'absolute',
              top: '100%', left: 0, right: 0
            }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13, padding: '8px 12px', borderRadius: 6,
                    color: 'var(--text-dim)', textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.background = 'var(--cyan-dim)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-dim)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
