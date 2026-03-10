import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, GitBranch, Wifi } from 'lucide-react';

const TYPING_SPEED = 45;

const useTypewriter = (text, delay = 0) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let timeout;
    let i = 0;
    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, TYPING_SPEED);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return { displayed, done };
};

const Hero = () => {
  const [cursorOn, setCursorOn] = useState(true);
  const [phase, setPhase] = useState(0); // 0=cmd 1=output 2=links 3=idle

  const cmd = useTypewriter('npm run portfolio', 400);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(p => !p), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (cmd.done && phase === 0) {
      const t = setTimeout(() => setPhase(1), 500);
      return () => clearTimeout(t);
    }
  }, [cmd.done, phase]);

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 900);
      return () => clearTimeout(t);
    }
    if (phase === 2) {
      const t = setTimeout(() => setPhase(3), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 24px 60px' }}>

      {/* Decorative glow blobs */}
      <div className="pointer-events-none" style={{ position: 'absolute', top: '15%', left: '5%', width: 'clamp(200px,30vw,420px)', height: 'clamp(200px,30vw,420px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)', zIndex: 0 }} />
      <div className="pointer-events-none" style={{ position: 'absolute', top: '30%', right: '5%', width: 'clamp(150px,25vw,350px)', height: 'clamp(150px,25vw,350px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', zIndex: 0 }} />

      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Status bar above terminal */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text-mute)' }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', boxShadow: '0 0 6px var(--green)' }} />
            online
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><GitBranch size={11} /> main</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FolderOpen size={11} /> portfolio/</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Wifi size={11} /> Available for opportunities</span>
        </motion.div>

        {/* Main terminal window */}
        <motion.div
          className="terminal-window"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px var(--border)' }}
        >
          {/* Title bar */}
          <div className="terminal-titlebar">
            <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
            <span className="titlebar-label">bash — sougata@developer: ~/portfolio</span>
          </div>

          {/* Body */}
          <div style={{ padding: '28px 32px', fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 1.9, minHeight: 280 }}>

            {/* $ npm run portfolio — typing */}
            <div>
              <span className="prompt-user">sougata</span>
              <span className="prompt-host">@developer</span>
              <span className="prompt-host">:</span>
              <span className="prompt-path">~/portfolio</span>
              <span className="prompt-dollar">$</span>
              <span style={{ color: 'var(--text)' }}>{cmd.displayed}</span>
              {!cmd.done && (
                <span style={{ display: 'inline-block', width: 8, height: '1em', background: 'var(--cyan)', verticalAlign: 'middle', marginLeft: 2, opacity: cursorOn ? 1 : 0 }} />
              )}
            </div>

            {/* Output lines */}
            {phase >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: 8 }}
              >
                <div style={{ color: 'var(--text-mute)' }}>
                  <span style={{ color: 'var(--text-mute)', marginRight: 8 }}>›</span>portfolio@1.0.0 start
                </div>
                <div style={{ color: 'var(--text-mute)', marginBottom: 16 }}>
                  <span style={{ color: 'var(--text-mute)', marginRight: 8 }}>›</span>node server.js
                </div>

                <div style={{ color: 'var(--cyan)', fontWeight: 600, marginBottom: 8 }}>System Output:</div>
                {[
                  ['Name', 'Sougata Manna', 'var(--text)'],
                  ['Role', 'Full Stack Developer │ BCA Student', '#a78bfa'],
                  ['Status', 'Available for opportunities', 'var(--green)'],
                  ['Location', 'India', 'var(--text-dim)'],
                ].map(([key, val, col], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.08 }}
                  >
                    <span style={{ color: 'var(--cyan)' }}>{key}:&nbsp;</span>
                    <span style={{ color: col }}>{val}</span>
                  </motion.div>
                ))}

                <div style={{ marginTop: 12 }}>
                  <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Message:&nbsp;</span>
                  <span style={{ color: 'var(--text-dim)' }}>I craft modern, robust, and scalable web solutions.</span>
                </div>
              </motion.div>
            )}

            {/* CTA links */}
            {phase >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}
              >
                {[
                  { label: '[View Projects]', href: '#projects' },
                  { label: '[Contact Me]', href: '#contact' },
                  { label: '[Download CV]', href: '/resume.pdf', download: true },
                ].map(({ label, href, download }) => (
                  <a
                    key={label}
                    href={href}
                    download={download}
                    style={{
                      fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
                      color: 'var(--cyan)', textDecoration: 'none',
                      padding: '4px 0',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--cyan)'}
                  >
                    {label}
                  </a>
                ))}
              </motion.div>
            )}

            {/* Idle prompt */}
            {phase >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}
              >
                <span className="prompt-user">sougata</span>
                <span className="prompt-host">@developer</span>
                <span className="prompt-host">:</span>
                <span className="prompt-path">~/portfolio</span>
                <span className="prompt-dollar">$</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.06, repeat: Infinity }}
                  style={{ display: 'inline-block', width: 8, height: '1em', background: 'var(--cyan)', verticalAlign: 'middle' }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Tech stack chips below window */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}
        >
          {['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Framer Motion'].map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
