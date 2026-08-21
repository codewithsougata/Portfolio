import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
} from "./ui/resizable-navbar";
import { Sun, Moon, Heart, Search, X, ArrowUpRight, FolderGit2, User, BookOpen, FileText, Award, Mail } from 'lucide-react';
import { IconBrandGithub, IconBrandX } from '@tabler/icons-react';
import { assets } from '../assets/assets';
import { SparklesCore } from './ui/sparkles';
import StaggeredMenu from './StaggeredMenu';

const formatCount = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
};

const navItems = [
  { name: 'Portfolio', link: '#home' },
  { name: 'Projects', link: '#projects' },
  { name: 'Contact', link: '#contact' },
];

const mobileMenuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
  { label: 'About & Skills', ariaLabel: 'Learn about background and skills', link: '#about' },
  { label: 'Education', ariaLabel: 'View academic background', link: '#education' },
  { label: 'Projects', ariaLabel: 'View featured projects', link: '#projects' },
  { label: 'Certifications', ariaLabel: 'View credentials and courses', link: '#certifications' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const mobileSocialItems = [
  { label: 'GitHub', link: 'https://github.com/codewithsougata' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/sougata-manna-9932s/' },
  { label: 'Twitter / X', link: 'https://x.com' },
];

const searchLinks = [
  { name: 'Portfolio (Home)', link: '#home', icon: <User size={15} />, desc: 'Intro, bio and overview' },
  { name: 'About Me & Skills', link: '#about', icon: <User size={15} />, desc: 'Background & technical stack' },
  { name: 'Education', link: '#education', icon: <BookOpen size={15} />, desc: 'BCA & academic journey' },
  { name: 'Projects', link: '#projects', icon: <FolderGit2 size={15} />, desc: 'Featured full-stack projects' },
  { name: 'Certifications & Learning', link: '#certifications', icon: <Award size={15} />, desc: 'Credentials & ongoing learning' },
  { name: 'Contact Me', link: '#contact', icon: <Mail size={15} />, desc: 'Send a direct message or project inquiry' },
  { name: 'Download CV / Resume', action: 'resume', icon: <FileText size={15} />, desc: 'Download PDF resume' },
  { name: 'GitHub Profile', url: 'https://github.com/codewithsougata', icon: <IconBrandGithub size={15} />, desc: 'View source code & repos' },
];



const Navbar = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // GitHub Likes / Love React State
  const [likes, setLikes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_likes');
      if (saved) return parseInt(saved, 10);
    }
    return 4178;
  });

  const [isLiked, setIsLiked] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_is_liked') === 'true';
    }
    return false;
  });

  const [displayCount, setDisplayCount] = useState(0);

  // Count up animation runs ONLY ONCE when the project opens / refreshes
  useEffect(() => {
    let frame = 0;
    const duration = 1400; // 1.4s
    const totalFrames = 60;
    const frameInterval = duration / totalFrames;
    const target = likes;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * easeOut);
      setDisplayCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setDisplayCount(target);
      }
    }, frameInterval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLikeToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const nextLiked = !isLiked;
    const nextLikes = nextLiked ? likes + 1 : likes - 1;
    setIsLiked(nextLiked);
    setLikes(nextLikes);
    setDisplayCount(nextLikes);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_is_liked', String(nextLiked));
      localStorage.setItem('portfolio_likes', String(nextLikes));
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSelect = (item) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    if (item.link) {
      document.querySelector(item.link)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.action === 'resume') {
      const a = document.createElement('a');
      a.href = assets.resume;
      a.download = '';
      a.click();
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  const filteredSearch = searchLinks.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Logo = () => (
    <a href="#home" className="relative z-20 flex flex-col justify-center text-decoration-none group">
      <div className="flex-col items-center hidden mt-2 md:flex">
        <div className="relative z-10 flex items-center gap-2">
          <span className="font-sans text-base md:text-lg font-bold text-[var(--text)] tracking-tight">
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
          <NavItems items={navItems}>
            {/* Search Option embedded right alongside nav links */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="relative z-20 flex items-center gap-1.5 ml-1 px-2 py-1 rounded-md text-xs text-[var(--text-dim)] hover:text-[var(--text)] bg-[var(--surface2)] border border-[var(--border2)] transition-colors hover:border-[var(--cyan)] cursor-pointer"
              title="Search (⌘K or Ctrl+K)"
            >
              <Search size={12} className="text-[var(--text-dim)]" />
              <span className="font-mono text-[10px] opacity-70">⌘K</span>
            </button>
          </NavItems>

          {/* Right Action Icons & Theme Switch */}
          <div className="relative z-20 flex items-center gap-2">
            {/* Single Compact Love React Button */}
            <button
              type="button"
              onClick={handleLikeToggle}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-[var(--text-dim)] hover:text-[var(--text)] bg-[var(--surface2)] border border-[var(--border2)] hover:border-rose-500/40 transition-all cursor-pointer group"
              title={isLiked ? "Liked! Click to unlike" : "Love this portfolio"}
              aria-label="Love React"
            >
              <IconBrandGithub size={13} className="text-[var(--text)]" />
              <span className="font-mono text-[11px] font-medium text-[var(--text-dim)] group-hover:text-[var(--text)]">
                {formatCount(displayCount)}
              </span>
              <motion.div
                key={isLiked ? "liked" : "unliked"}
                initial={{ scale: 0.8 }}
                animate={{ scale: isLiked ? [0.8, 1.35, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  size={12}
                  className={`transition-colors ${isLiked
                      ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]"
                      : "text-neutral-400 group-hover:text-rose-400"
                    }`}
                />
              </motion.div>
            </button>

            {/* X (Twitter) Icon */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center w-7 h-7 rounded-md text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
              title="X (Twitter)"
            >
              <IconBrandX size={14} />
            </a>

            {/* Dark / Light Mode Pill Slider Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center w-12 h-6 px-1 rounded-full bg-[var(--surface2)] border border-[var(--border2)] cursor-pointer transition-colors focus:outline-none"
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              <div className="flex items-center justify-center w-4 h-4 z-0 text-[var(--text-mute)] opacity-60">
                <Sun size={11} />
              </div>
              <div className="flex items-center justify-center w-4 h-4 z-0 ml-auto text-[var(--text-mute)] opacity-60">
                <Moon size={11} />
              </div>

              <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`absolute top-[2px] w-5 h-5 rounded-full shadow-sm flex items-center justify-center ${theme === 'dark'
                    ? 'left-[25px] bg-[#ffffff] text-black'
                    : 'left-[2px] bg-[#000000] text-white'
                  }`}
              >
                {theme === 'dark' ? (
                  <Moon size={11} className="text-black" />
                ) : (
                  <Sun size={11} className="text-white" />
                )}
              </motion.div>
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <div className="flex items-center gap-1.5">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 rounded-md text-xs text-[var(--text-dim)] bg-[var(--surface2)] border border-[var(--border2)]"
                aria-label="Search"
              >
                <Search size={14} />
              </button>

              {/* Mobile Single Compact Love React Button */}
              <button
                type="button"
                onClick={handleLikeToggle}
                className="flex items-center gap-1 px-1.5 py-1 rounded-md text-xs text-[var(--text-dim)] bg-[var(--surface2)] border border-[var(--border2)] active:scale-95 transition-all"
                title="Love React"
                aria-label="Love React"
              >
                <IconBrandGithub size={12} />
                <span className="font-mono text-[10px] font-medium">{formatCount(displayCount)}</span>
                <motion.div
                  key={isLiked ? "m-liked" : "m-unliked"}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isLiked ? [0.8, 1.3, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={10}
                    className={isLiked ? "fill-rose-500 text-rose-500" : "text-neutral-400"}
                  />
                </motion.div>
              </button>

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative flex items-center w-10 h-5 px-0.5 rounded-full bg-[var(--surface2)] border border-[var(--border2)]"
                aria-label="Toggle Theme"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${theme === 'dark'
                      ? 'ml-auto bg-white text-black'
                      : 'mr-auto bg-black text-white'
                    }`}
                >
                  {theme === 'dark' ? <Moon size={9} className="text-black" /> : <Sun size={9} className="text-white" />}
                </motion.div>
              </button>

              {/* StaggeredMenu Mobile Menu Button & Sliding Animated Drawer */}
              <StaggeredMenu
                position="right"
                items={mobileMenuItems}
                socialItems={mobileSocialItems}
                displaySocials={true}
                displayItemNumbering={true}
                menuButtonColor={theme === 'dark' ? '#ffffff' : '#111827'}
                openMenuButtonColor="#ffffff"
                changeMenuColorOnOpen={true}
                colors={['#5227FF', '#B497CF', '#12111a']}
                logoUrl={assets.profile}
                logoText="Sougata"
                accentColor="#5227FF"
                onMenuOpen={() => console.log('Menu opened')}
                onMenuClose={() => console.log('Menu closed')}
              />
            </div>
          </MobileNavHeader>
        </MobileNav>
      </ResizableNavbar>

      {/* Quick Search / Command Palette Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-2xl bg-[var(--surface)] border border-[var(--border2)] shadow-2xl overflow-hidden z-10"
            >
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border2)]">
                <Search size={18} className="text-[var(--text-dim)]" />
                <input
                  type="text"
                  placeholder="Search sections, projects, links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-mute)] outline-none"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-md text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface2)]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Search Results List */}
              <div className="max-h-72 overflow-y-auto p-2">
                {filteredSearch.length > 0 ? (
                  filteredSearch.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchSelect(item)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[var(--surface2)] text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-md bg-[var(--surface2)] border border-[var(--border2)] flex items-center justify-center text-[var(--cyan)]">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--cyan)] transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-[var(--text-dim)]">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight size={14} className="text-[var(--text-mute)] group-hover:text-[var(--text)] transition-colors opacity-0 group-hover:opacity-100" />
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-[var(--text-mute)]">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between px-4 py-2 bg-[var(--surface2)] border-t border-[var(--border2)] text-[10px] text-[var(--text-mute)] font-mono">
                <span>Navigate & select</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
