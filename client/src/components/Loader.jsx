import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const BOOT_LINES = [
  { text: 'BIOS v2.0.26 — Portfolio OS booting...', delay: 0 },
  { text: 'Loading kernel modules...', delay: 300 },
  { text: 'Mounting filesystem: /home/sougata', delay: 600 },
  { text: 'Starting network manager... [OK]', delay: 900 },
  { text: 'Initializing UI renderer... [OK]', delay: 1200 },
  { text: 'Loading portfolio workspace...', delay: 1500 },
  { text: '\u2714 System ready. Welcome, visitor.', delay: 1800 },
];

const Loader = () => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text]);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, line.delay);
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{
          position: 'absolute', width: '40vw', height: '40vw',
          borderRadius: '50%', top: '-10%', left: '-5%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', width: '35vw', height: '35vw',
          borderRadius: '50%', bottom: '-10%', right: '-5%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
        }} />
      </div>

      <div className="w-full max-w-lg px-6">
        {/* Terminal window */}
        <div className="terminal-window">
          <div className="terminal-titlebar">
            <span className="dot-red" />
            <span className="dot-yellow" />
            <span className="dot-green" />
            <span className="titlebar-label">boot — portfolio@system</span>
          </div>
          <div className="p-6 space-y-1.5 min-h-[200px]">
            {visibleLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  color: line.startsWith('✔') ? 'var(--green)' : 'var(--text-dim)',
                }}
              >
                {!line.startsWith('✔') && (
                  <span style={{ color: 'var(--cyan)', marginRight: 8 }}>$</span>
                )}
                {line}
              </motion.div>
            ))}
            {visibleLines.length < BOOT_LINES.length && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{
                  display: 'inline-block',
                  width: 8, height: 15,
                  background: 'var(--cyan)',
                  verticalAlign: 'middle',
                  borderRadius: 1,
                }}
              />
            )}
          </div>
          {/* Progress bar */}
          <div style={{ background: 'var(--surface2)', padding: '12px 24px', borderTop: '1px solid var(--border)' }}>
            <div className="flex justify-between mb-2" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text-mute)' }}>
              <span>progress</span>
              <span style={{ color: 'var(--cyan)' }}>{progress}%</span>
            </div>
            <div className="skill-track">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--cyan), var(--purple))',
                  borderRadius: 9999,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
