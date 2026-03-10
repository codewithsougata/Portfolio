import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    name: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with authentication, product management, and Stripe API integration.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: '#',
    live: '#',
    color: 'var(--cyan)',
  },
  {
    name: 'task-manager',
    title: 'Task Management App',
    description: 'Responsive task manager with drag-and-drop, real-time updates, and team collaboration.',
    techStack: ['React', 'Firebase', 'Tailwind CSS'],
    github: '#',
    live: '#',
    color: '#a78bfa',
  },
  {
    name: 'portfolio-v2',
    title: 'Portfolio Website',
    description: 'Modern developer portfolio with terminal UI, Framer Motion animations, and dark/light mode.',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS'],
    github: '#',
    live: '#',
    color: 'var(--green)',
  },
];

const Projects = () => (
  <section id="projects" className="section-container">
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="hash">#</span>projects
    </motion.h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 20 }}>
      {projectsData.map((project, i) => (
        <motion.div
          key={i}
          className="terminal-window"
          style={{ display: 'flex', flexDirection: 'column' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.1 }}
          whileHover={{ y: -4 }}
        >
          {/* Title bar */}
          <div className="terminal-titlebar">
            <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
            <span className="titlebar-label" style={{ color: project.color }}>~/{project.name}</span>
          </div>

          {/* Language bar */}
          <div style={{
            display: 'flex', gap: 0,
            height: 3,
            background: 'var(--border)',
          }}>
            <div style={{ flex: 2, background: project.color, opacity: 0.7 }} />
            <div style={{ flex: 1, background: 'var(--purple)', opacity: 0.5 }} />
            <div style={{ flex: 1, background: 'var(--amber)', opacity: 0.4 }} />
          </div>

          {/* Body */}
          <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* import block */}
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text-mute)', marginBottom: 16, lineHeight: 1.8 }}>
              {project.techStack.map(t => (
                <div key={t}>
                  <span style={{ color: 'var(--purple)' }}>import</span>{' '}
                  <span style={{ color: project.color }}>{t.replace(/\s/g, '')}</span>{' '}
                  <span style={{ color: 'var(--text-mute)' }}>from</span>{' '}
                  <span style={{ color: 'var(--amber)' }}>'{t.toLowerCase().replace(/\s/g, '-')}'</span><span style={{ color: 'var(--text-mute)' }}>;</span>
                </div>
              ))}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 8 }}>{project.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>{project.description}</div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-developer" style={{ flex: 1 }}>
                <Github size={13} /> GitHub
              </a>
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary-dev" style={{ flex: 1 }}>
                <ExternalLink size={13} /> Live
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
