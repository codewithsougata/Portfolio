import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min(100, Math.round((currentStep / steps) * 100)));
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: 'absolute', width: '40vw', height: '40vw',
          borderRadius: '50%', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 60%)',
        }} />
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'col', alignItems: 'center', justifyContent: 'center' }}>
        {/* Animated Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: 120, height: 120,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderTopColor: 'var(--cyan)',
            borderRightColor: 'var(--purple)',
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: 90, height: 90,
            borderRadius: '50%',
            border: '2px solid transparent',
            borderBottomColor: 'var(--cyan)',
            borderLeftColor: 'var(--purple)',
          }}
        />

        {/* Center Logo/Text */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            fontWeight: 800,
            color: 'var(--text)',
            position: 'relative',
            zIndex: 10
          }}
        >
          <span style={{ color: 'var(--cyan)' }}>S</span>
          <span style={{ color: 'var(--purple)' }}>M</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{
          marginTop: 40,
          fontFamily: "'Inter', sans-serif",
          fontSize: 14,
          color: 'var(--text-mute)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase'
        }}
      >
        Loading <span style={{ color: 'var(--cyan)' }}>{progress}%</span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;
