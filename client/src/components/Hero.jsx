import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { assets, roles_list } from '../assets/assets';
import { Cover } from './ui/cover';
import { FloatingDock } from './ui/floating-dock';
import { TextGenerateEffect } from './ui/text-generate-effect';
import { ShootingStars } from './ui/shooting-stars';
import { StarsBackground } from './ui/stars-background';
import ChromaSnakeButton from '../uicomponents/buttons/chroma-snake-button';
import ElectricBorder from './ElectricBorder';
import CircularText from './CircularText';
import {
  IconBrandLinkedin,
  IconBrandX,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandGithub
} from '@tabler/icons-react';

const Hero = () => {
  const [currentRole, setCurrentRole] = React.useState(roles_list[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(roles_list[Math.floor(Math.random() * roles_list.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '48px 20px 24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 32, overflow: 'hidden' }} className="md:justify-between md:text-left">
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
          <ShootingStars />
          <StarsBackground />
        </div>

        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}
          className="md:items-start"
        >
          <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: 12, color: 'var(--text)' }}>
            Hi, I'm <Cover><span style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>Sougata</span></Cover><br />
            Manna.
          </h1>

          <div style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.2rem)', fontWeight: 600, color: 'var(--text-mute)', marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', justifyContent: 'center', height: '1.4rem' }} className="md:justify-start">
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

          <div style={{ fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)', color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 420, marginBottom: 22 }}>
            <TextGenerateEffect className="!mt-0 font-normal" words="I am a BCA student at Brainware University and a fresher passionate about web development. I am eager to learn new technologies, improve my skills, and build a successful career in the IT industry." />
          </div>

          <div className="flex flex-col w-full gap-3 mt-4 sm:flex-row sm:w-auto items-center">
            <ChromaSnakeButton
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Projects
            </ChromaSnakeButton>
            <ChromaSnakeButton
              onClick={() => { const a = document.createElement('a'); a.href = assets.resume; a.download = ''; a.click(); }}
              icon={<Download className="w-4 h-4" />}
            >
              Download CV
            </ChromaSnakeButton>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}
            className="relative z-50 w-full md:justify-start"
          >
            <FloatingDock
              items={[
                {
                  title: 'LinkedIn',
                  icon: <IconBrandLinkedin className="h-full w-full text-[var(--text)]" />,
                  href: 'https://www.linkedin.com/in/sougata-manna-9932s/'
                },
                {
                  title: 'Twitter / X',
                  icon: <IconBrandX className="h-full w-full text-[var(--text)]" />,
                  href: 'https://x.com'
                },
                {
                  title: 'Instagram',
                  icon: <IconBrandInstagram className="h-full w-full text-[var(--text)]" />,
                  href: 'https://instagram.com'
                },
                {
                  title: 'Facebook',
                  icon: <IconBrandFacebook className="h-full w-full text-[var(--text)]" />,
                  href: 'https://facebook.com'
                },
                {
                  title: 'GitHub',
                  icon: <IconBrandGithub className="h-full w-full text-[var(--text)]" />,
                  href: 'https://github.com/codewithsougata'
                }
              ]}
              desktopClassName="bg-[var(--surface)] border border-[var(--border2)]"
              mobileClassName="mx-auto"
            />
          </motion.div>
        </motion.div>

        {/* Right Side: Clean Profile Photo with Circular Text — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hidden sm:flex items-center justify-center"
          style={{ flex: '1 1 280px', position: 'relative', zIndex: 1 }}
        >
          <div className="relative flex items-center justify-center p-8">
            {/* Spinning Circular Text Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <CircularText
                text="SOUGATA*MANNA*DEVELOPER*"
                onHover="speedUp"
                spinDuration={20}
                className="w-[260px] h-[260px] sm:w-[280px] sm:h-[280px] pointer-events-auto"
                letterClassName="text-[11px] sm:text-xs font-bold tracking-widest text-[var(--cyan)] uppercase"
              />
            </div>

            {/* Decreased Profile Photo with Electric Border */}
            <ElectricBorder
              color="#7df9ff"
              speed={1}
              chaos={0.12}
              thickness={2}
              style={{ borderRadius: '50%' }}
              borderRadius={9999}
            >
              <div className="relative w-40 sm:w-44 aspect-square rounded-full overflow-hidden">
                <img
                  src={assets.profile}
                  alt="Sougata Manna"
                  className="w-full h-full rounded-full object-cover object-top shadow-xl border border-[var(--border2)]"
                />
              </div>
            </ElectricBorder>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
