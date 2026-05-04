import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { assets, roles_list } from '../assets/assets';
import { Cover } from './ui/cover';
import { CometCard } from './ui/comet-card';
import { SparklesCore } from './ui/sparkles';
import { FloatingDock } from './ui/floating-dock';
import ChromaSnakeButton from '../uicomponents/buttons/chroma-snake-button';
import {
  IconBrandReact,
  IconBrandNodejs,
  IconServer,
  IconBrandMongodb,
  IconBrandTailwind,
  IconBrandFramerMotion
} from '@tabler/icons-react';

const Hero = () => {

  const [currentRole, setCurrentRole] = React.useState(roles_list[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(roles_list[Math.floor(Math.random() * roles_list.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track dark/light mode for sparkle color
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sparklesBackground = useMemo(() => (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={isMobile ? 30 : 100}
        className="w-full h-full"
        particleColor={isDark ? '#ffffff' : '#000000'}
      />
    </div>
  ), [isDark, isMobile]);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '60px 24px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Sparkles Background */}
      {sparklesBackground}

      {/* Dark mode dot grid */}
      <div
        className="dark:block hidden pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.13) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
        }}
      />

      {/* Decorative glow blobs - hidden on mobile to improve performance */}
      {!isMobile && (
        <>
          <div className="pointer-events-none animate-float" style={{ position: 'absolute', top: '15%', left: '5%', width: 'clamp(200px,30vw,420px)', height: 'clamp(200px,30vw,420px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', zIndex: 0 }} />
          <div className="pointer-events-none animate-float" style={{ position: 'absolute', top: '30%', right: '5%', width: 'clamp(150px,25vw,350px)', height: 'clamp(150px,25vw,350px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', zIndex: 0, animationDelay: '3s' }} />
        </>
      )}

      <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 40 }} className="md:justify-between md:text-left">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          className="md:items-start"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: 'inline-block', padding: '6px 12px', borderRadius: 20, background: 'var(--cyan-dim)', color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace", fontSize: 13, marginBottom: 20, border: '1px solid rgba(0,212,255,0.2)' }}
          >
            Available for opportunities
          </motion.div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: 'var(--text)' }}>
            Hi, I'm <Cover><span style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>Sougata</span></Cover><br />
            Manna.
          </h1>

          <div style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 600, color: 'var(--text-mute)', marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center', height: '1.8rem' }} className="md:justify-start">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{ color: 'var(--text-mute)' }}
              >
                {currentRole}
              </motion.span>
            </AnimatePresence>
          </div>

          <p style={{ fontSize: 'clamp(1rem, 1.2vw, 1.1rem)', color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 480, marginBottom: 32 }}>
            I craft modern, robust, and scalable web solutions. Passionate about creating seamless user experiences and writing clean, efficient code.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 10 }}>
            <ChromaSnakeButton className="w-40" onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}>
              View Projects <ArrowRight size={16} />
            </ChromaSnakeButton>
            <ChromaSnakeButton className="w-40" onClick={() => { const a = document.createElement('a'); a.href = assets.resume; a.download = ''; a.click(); }}>
              Download CV <Download size={16} />
            </ChromaSnakeButton>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
            className="md:justify-start w-full relative z-50"
          >
            <FloatingDock
              items={[
                { title: 'React', icon: <IconBrandReact className="h-full w-full text-[var(--text)]" /> },
                { title: 'Node.js', icon: <IconBrandNodejs className="h-full w-full text-[var(--text)]" /> },
                { title: 'Express', icon: <IconServer className="h-full w-full text-[var(--text)]" /> },
                { title: 'MongoDB', icon: <IconBrandMongodb className="h-full w-full text-[var(--text)]" /> },
                { title: 'Tailwind CSS', icon: <IconBrandTailwind className="h-full w-full text-[var(--text)]" /> },
                { title: 'Framer Motion', icon: <IconBrandFramerMotion className="h-full w-full text-[var(--text)]" /> },
              ]}
              desktopClassName="bg-[var(--surface)] border border-[var(--border2)]"
              mobileClassName="mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* Right Side: Comet Card - Unmounted on mobile to prevent layout thrashing and save performance */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ flex: '1 1 400px', justifyContent: 'center' }}
            className="hidden md:flex"
          >
            <CometCard>
              <div
                className="flex w-72 md:w-80 cursor-default flex-col items-stretch rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-2 md:p-4"
                style={{ transformStyle: "preserve-3d" }}>
                <div className="mx-2 flex-1">
                  <div className="relative mt-2 aspect-square w-full">
                    <img
                      loading="lazy"
                      className="absolute inset-0 h-full w-full rounded-[16px] object-cover border border-[var(--border2)]"
                      alt="Sougata"
                      src={assets.profile}
                      style={{
                        boxShadow: "rgba(0, 212, 255, 0.15) 0px 10px 30px 0px",
                      }} />
                  </div>
                </div>
                <div className="mt-4 flex flex-shrink-0 items-center justify-between p-2 font-mono text-[var(--text)]">
                  <div className="text-sm font-semibold text-[var(--text)] tracking-wider">SOUGATA</div>
                  <div className="text-xs text-[var(--text-mute)] opacity-80">Full Stack</div>
                </div>
              </div>
            </CometCard>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;
