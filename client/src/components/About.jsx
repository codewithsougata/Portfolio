import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiMongodb, SiExpress } from 'react-icons/si';
import { skills_list } from '../assets/assets';

const skillIcons = {
  'HTML5': <FaHtml5 />,
  'CSS3': <FaCss3Alt />,
  'JavaScript': <FaJs />,
  'React': <FaReact />,
  'Node.js': <FaNodeJs />,
  'Express': <SiExpress />,
  'MongoDB': <SiMongodb />,
};

const skills = skills_list.map(skill => ({
  ...skill,
  icon: skillIcons[skill.name]
}));

const About = () => (
  <section id="about" className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', marginBottom: 40 }}
    >
      <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
        About <span style={{ color: 'var(--cyan)' }}>Me</span>
      </h2>
      <div style={{ width: 60, height: 4, background: 'var(--cyan)', margin: '0 auto', borderRadius: 2 }} />
    </motion.div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>

      {/* ── Bio card ── */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(20, 25, 40, 0.4)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 20,
          padding: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{ translateY: -5 }}
      >
        <div style={{ position: 'absolute', top: -100, left: -100, width: 200, height: 200, background: 'var(--cyan)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }} />

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 60, height: 60, borderRadius: 12,
            background: 'var(--cyan-dim)', border: '1px solid rgba(0,212,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 22, color: 'var(--cyan)',
            boxShadow: '0 4px 14px rgba(0,212,255,0.2)'
          }}>SM</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 4 }}>Sougata Manna</div>
            <div style={{ fontSize: 14, color: 'var(--cyan)', fontWeight: 500 }}>Full Stack Developer</div>
          </div>
        </div>

        {/* Bio text */}
        <div style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.8, marginBottom: 24, position: 'relative', zIndex: 1 }}>
          <p style={{ marginBottom: 16 }}>
            I'm a passionate <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>BCA Student</span> at{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>Brainware University</span> and an enthusiastic{' '}
            <span style={{ color: '#a78bfa', fontWeight: 600 }}>Full Stack Developer</span>. I love building
            functional, user-centric, and scalable web apps that solve real-world problems.
          </p>
          <p>
            When I'm not coding, I explore new technologies, develop personal projects, and
            grow my skill set in this ever-evolving landscape.
          </p>
        </div>

        {/* Status badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, position: 'relative', zIndex: 1 }}>
          <span style={{ padding: '6px 14px', background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', borderRadius: 20, fontSize: 13, fontWeight: 500, border: '1px solid rgba(34, 197, 94, 0.2)' }}>✓ Open to Work</span>
          <span style={{ padding: '6px 14px', background: 'rgba(0, 212, 255, 0.1)', color: 'var(--cyan)', borderRadius: 20, fontSize: 13, fontWeight: 500, border: '1px solid rgba(0, 212, 255, 0.2)' }}>✓ Freelance</span>
          <span style={{ padding: '6px 14px', background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', borderRadius: 20, fontSize: 13, fontWeight: 500, border: '1px solid rgba(167, 139, 250, 0.2)' }}>✓ India</span>
        </div>
      </motion.div>

      {/* ── Skills card ── */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(20, 25, 40, 0.4)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: 20,
          padding: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{ translateY: -5 }}
      >
        <div style={{ position: 'absolute', bottom: -100, right: -100, width: 250, height: 250, background: '#a78bfa', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />

        <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--text)', marginBottom: 24, position: 'relative', zIndex: 1 }}>
          Technical Skills
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: skill.color, fontSize: 18, filter: `drop-shadow(0 0 8px ${skill.color}80)` }}>{skill.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: 15, color: 'var(--text)' }}>{skill.name}</span>
                </div>
                <span style={{ fontSize: 13, color: 'var(--text-mute)', fontWeight: 600 }}>
                  {skill.level}<span style={{ color: skill.color }}>%</span>
                </span>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 9999, overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                    borderRadius: 9999,
                    boxShadow: `0 0 10px ${skill.color}80`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default About;
