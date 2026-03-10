import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Github } from 'lucide-react';

const GitHubSnake = () => {
  return (
    <section className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          GitHub <span style={{ color: 'var(--green)' }}>Activity</span>
        </h2>
        <div style={{ width: 60, height: 4, background: 'var(--green)', margin: '0 auto', borderRadius: 2 }} />
      </motion.div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'rgba(20, 25, 40, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 24,
            padding: 32,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
          whileHover={{ translateY: -5 }}
        >
          {/* Background decorative glow */}
          <div style={{ position: 'absolute', top: -100, left: -100, width: 250, height: 250, background: 'var(--green)', filter: 'blur(120px)', opacity: 0.08, borderRadius: '50%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -100, right: -100, width: 250, height: 250, background: 'var(--cyan)', filter: 'blur(120px)', opacity: 0.08, borderRadius: '50%', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(0, 255, 136, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--green)'
                }}>
                  <Activity size={20} />
                </div>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)', letterSpacing: '0.02em' }}>
                  Contribution Graph
                </span>
              </div>
              <a href="https://github.com/sougatamanna" target="_blank" rel="noreferrer" style={{ color: 'var(--text-mute)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, textDecoration: 'none', fontWeight: 500 }} onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-mute)'}>
                <Github size={16} /> @sougatamanna
              </a>
            </div>
            
            <div style={{ 
              borderRadius: 16, 
              overflow: 'hidden', 
              background: 'rgba(10, 14, 26, 0.6)', 
              border: '1px solid rgba(255, 255, 255, 0.03)', 
              padding: 16,
              display: 'flex',
              justifyContent: 'center',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
            }}>
              <img
                src="https://raw.githubusercontent.com/sougatamanna/sougatamanna/output/github-contribution-grid-snake.svg"
                alt="GitHub contribution snake animation"
                style={{ width: '100%', maxWidth: 800, mixBlendMode: 'screen', opacity: 0.9, filter: 'contrast(1.2)' }}
                onError={(e) => {
                  e.target.src = "https://profile-readme-generator.com/assets/snake.svg";
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSnake;
