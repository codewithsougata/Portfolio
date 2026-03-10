import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';

const skills = [
  { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26', level: 90 },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6', level: 85 },
  { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E', level: 80 },
  { name: 'React', icon: <FaReact />, color: '#61DAFB', level: 75 },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#339933', level: 70 },
  { name: 'Express', icon: <SiExpress />, color: '#a0aec0', level: 70 },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248', level: 65 },
];

const About = () => (
  <section id="about" className="section-container">
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="hash">#</span>about_me
    </motion.h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

      {/* ── Bio card ── */}
      <motion.div
        className="terminal-window"
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="terminal-titlebar">
          <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
          <span className="titlebar-label">cat about.md</span>
        </div>
        <div style={{ padding: '24px 28px' }}>

          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 52, height: 52, borderRadius: 10,
              background: 'var(--cyan-dim)', border: '1px solid rgba(0,212,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 18,
              color: 'var(--cyan)',
            }}>SM</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--text)', marginBottom: 2 }}>Sougata Manna</div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--cyan)' }}>@FullStackDeveloper</div>
            </div>
          </div>

          {/* Bio text */}
          <div style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
            <p style={{ marginBottom: 12 }}>
              I'm a passionate <span style={{ color: 'var(--cyan)' }}>BCA Student</span> at{' '}
              <span style={{ color: 'var(--cyan)' }}>Brainware University</span> and an enthusiastic{' '}
              <span style={{ color: '#a78bfa' }}>Full Stack Developer</span>. I love building
              functional, user-centric, and scalable web apps that solve real-world problems.
            </p>
            <p>
              When I'm not coding, I explore new technologies, develop personal projects, and
              grow my skill set in this ever-evolving landscape.
            </p>
          </div>

          {/* Status badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
            <span className="tag tag-green">✓ Open to Work</span>
            <span className="tag tag-cyan">✓ Freelance</span>
            <span className="tag tag-purple">✓ India</span>
          </div>
        </div>
      </motion.div>

      {/* ── Skills card ── */}
      <motion.div
        className="terminal-window"
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="terminal-titlebar">
          <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
          <span className="titlebar-label">system.skills</span>
        </div>
        <div style={{ padding: '24px 28px' }}>
          <div style={{ marginBottom: 20, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--text-mute)' }}>
            <span style={{ color: 'var(--cyan)' }}>const</span>{' '}
            <span style={{ color: 'var(--text)' }}>skills</span>{' '}
            <span style={{ color: 'var(--text-dim)' }}>=</span>{' '}
            <span style={{ color: 'var(--amber)' }}>{'{'}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: skill.color, fontSize: 16 }}>{skill.icon}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: 'var(--text)' }}>{skill.name}</span>
                  </div>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text-mute)' }}>
                    {skill.level}<span style={{ color: 'var(--cyan)' }}>%</span>
                  </span>
                </div>
                <div className="skill-track">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
                      borderRadius: 9999,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 20, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--amber)' }}>{'}'}</div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
