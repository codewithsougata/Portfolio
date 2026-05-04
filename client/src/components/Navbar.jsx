import React, { useState, useEffect } from 'react';
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./ui/resizable-navbar";
import { Sun, Moon, Code } from 'lucide-react';
import { assets } from '../assets/assets';
import { SparklesCore } from './ui/sparkles';

const navItems = [
  { name: 'HOME', link: '#home' },
  { name: 'ABOUT', link: '#about' },
  { name: 'EDUCATION', link: '#education' },
  { name: 'PROJECTS', link: '#projects' },
  { name: 'CONTACT', link: '#contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const Logo = () => (
    <a href="#home" className="relative z-20 flex flex-col justify-center text-decoration-none group">
      <div className="flex-col items-center hidden mt-2 md:flex">
        <div className="relative z-10 flex items-center gap-2">
          <span className="font-sans text-xl font-bold text-[var(--text)]">
            Sougata
          </span>
        </div>

        {/* Sparkles Underline */}
        <div className="relative w-32 h-6 mt-1">
          <div className="absolute inset-x-0 top-0 mx-auto bg-gradient-to-r from-transparent via-white to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-0 top-0 w-3/4 h-px mx-auto bg-gradient-to-r from-transparent via-white to-transparent" />
          <div className="absolute inset-x-0 top-0 mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent h-[3px] w-1/4 blur-sm" />
          <div className="absolute inset-x-0 top-0 w-1/4 h-px mx-auto bg-gradient-to-r from-transparent via-gray-400 to-transparent" />

          {!isMobile && (
            <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(80px_20px_at_top,white,transparent_100%)]">
              <SparklesCore
                background="transparent"
                minSize={0.2}
                maxSize={1}
                particleDensity={800}
                className="w-full h-full"
                particleColor="#ffffff"
              />
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <img
          src={assets.profile}
          alt="Profile"
          className="object-cover w-8 h-8 border-2 rounded-full border-[var(--border2)]"
        />
      </div>
    </a>
  );

  return (
    <>
      <ResizableNavbar>
        {/* Desktop Navigation */}
        <NavBody>
          <Logo />
          <NavItems items={navItems} />
          <div className="relative z-20 flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs text-[var(--text-dim)] hover:text-[var(--cyan)] border border-[var(--border2)] bg-[var(--surface2)] transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'LIGHT' : 'dark'}
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="text-[var(--text-dim)] p-2 hover:text-[var(--text)] transition-colors">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-[var(--text-dim)] hover:text-[var(--text)] font-mono text-sm py-2 px-4 hover:bg-[var(--surface2)] rounded-md transition-colors w-full">
                <span className="block">{item.name}</span>
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </>
  );
};

export default Navbar;
