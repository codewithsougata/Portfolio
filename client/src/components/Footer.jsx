import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      marginTop: 80,
    }}>
      {/* Status bar row */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '0 24px',
        height: 42,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        color: 'var(--text-mute)',
      }}>
        {/* Left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>
            © {new Date().getFullYear()} Sougata Manna
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 6px var(--green)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            <span>System: Active</span>
          </div>
        </div>

        {/* Center: clock */}
        <div style={{
          padding: '3px 12px', borderRadius: 5,
          background: 'var(--surface2)',
          border: '1px solid var(--border)',
          color: 'var(--text-dim)',
          letterSpacing: '0.06em',
        }}>
          {time || '00:00:00'}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {[
            { href: 'https://github.com/yourgithub', icon: <Github size={15} /> },
            { href: 'https://linkedin.com/in/yourlinkedin', icon: <Linkedin size={15} /> },
            { href: 'mailto:sougata@example.com', icon: <Mail size={15} /> },
          ].map(({ href, icon }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--text-mute)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--cyan)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-mute)'}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
