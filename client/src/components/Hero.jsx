import React from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { assets, roles_list } from '../assets/assets';

const Hero = () => {
  // 3D tilt effect for the image
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const [currentRole, setCurrentRole] = React.useState(roles_list[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(roles_list[Math.floor(Math.random() * roles_list.length)]);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '60px 24px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative glow blobs */}
      <div className="pointer-events-none animate-float" style={{ position: 'absolute', top: '15%', left: '5%', width: 'clamp(200px,30vw,420px)', height: 'clamp(200px,30vw,420px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', zIndex: 0 }} />
      <div className="pointer-events-none animate-float" style={{ position: 'absolute', top: '30%', right: '5%', width: 'clamp(150px,25vw,350px)', height: 'clamp(150px,25vw,350px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', zIndex: 0, animationDelay: '3s' }} />

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
            Hi, I'm <span style={{ color: 'var(--cyan)', textShadow: '0 0 20px rgba(0,212,255,0.3)' }}>Sougata</span><br />
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
            <a href="#projects" className="btn-3d" style={{ outline: 'none' }}>
              View Projects <ArrowRight size={18} />
            </a>
            <a href={assets.resume} download className="btn-3d-secondary" style={{ outline: 'none' }}>
              Download CV <Download size={18} />
            </a>
          </div>

          <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }} className="md:justify-start">
            {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind', 'Framer Motion'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                style={{ padding: '6px 12px', background: 'var(--surface2)', color: 'var(--text-mute)', borderRadius: 6, fontSize: 13, border: '1px solid var(--border)' }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right Side: 3D Image (Restored for Desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          style={{ flex: '1 1 400px', justifyContent: 'center', perspective: 1000 }}
          className="hidden md:flex"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX, rotateY,
              width: '100%', maxWidth: 400, aspectRatio: '1/1', position: 'relative',
              transformStyle: "preserve-3d", cursor: 'grab'
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Background glowing circle for the image */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', inset: -20, borderRadius: '35%', background: 'linear-gradient(45deg, var(--cyan), #7c3aed)', filter: 'blur(30px)', zIndex: -1, opacity: 0.5, transform: 'translateZ(-50px)' }}
            />
            {/* The Image (Placeholder) */}
            <motion.img
              src={assets.profile}
              alt="Sougata"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30%', border: '2px solid rgba(0,212,255,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: 'translateZ(30px)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
