import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const projectsData = [
  {
    name: 'e-commerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce with authentication, product management, and Stripe API integration. Built for scale and performance.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: '#',
    live: '#',
    color: 'var(--cyan)',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'task-manager',
    title: 'Task Management App',
    description: 'Responsive task manager with drag-and-drop, real-time updates, and team collaboration features. Intuitive UI/UX design.',
    techStack: ['React', 'Firebase', 'Tailwind CSS'],
    github: '#',
    live: '#',
    color: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: 'portfolio-v2',
    title: 'Portfolio Website',
    description: 'Modern developer portfolio with immersive 3D animations, sleek card layouts, and responsive design natively built.',
    techStack: ['React', 'Framer Motion', 'Tailwind CSS'],
    github: '#',
    live: '#',
    color: 'var(--green)',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
  },
];

const Projects = () => (
  <section id="projects" className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', marginBottom: 50 }}
    >
      <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
        Featured <span style={{ color: '#a78bfa' }}>Projects</span>
      </h2>
      <div style={{ width: 60, height: 4, background: '#a78bfa', margin: '0 auto', borderRadius: 2 }} />
    </motion.div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30 }}>
      {projectsData.map((project, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -8 }}
          style={{
            display: 'flex', flexDirection: 'column',
            background: 'rgba(20, 25, 40, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            position: 'relative'
          }}
        >
          {/* Subtle gradient banner at top */}
          <div style={{ height: 6, width: '100%', background: `linear-gradient(90deg, ${project.color}, transparent)`, position: 'relative', zIndex: 3 }} />

          {/* Project Image Cover */}
          <div style={{ width: '100%', height: 220, overflow: 'hidden', position: 'relative', zIndex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <motion.img 
              whileHover={{ scale: 1.08 }} 
              transition={{ duration: 0.4 }} 
              src={project.image} 
              alt={project.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            {/* Elegant fade to blend image into the dark card background */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(20,25,40,1) 98%)', pointerEvents: 'none' }} />
          </div>

          <div style={{ padding: '0 28px 32px', marginTop: '-40px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: `${project.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: project.color
              }}>
                <ExternalLink size={24} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <motion.a href={project.github} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1, color: project.color }} style={{ color: 'var(--text-mute)', transition: 'color 0.2s' }}>
                  <Github size={20} />
                </motion.a>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: 700, fontSize: 22, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
                {project.title}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 24 }}>
                {project.description}
              </p>
            </div>

            {/* Tech stack tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
              {project.techStack.map(t => (
                <span key={t} style={{
                  padding: '4px 12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  color: 'var(--text-mute)',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500
                }}>
                  {t}
                </span>
              ))}
            </div>

          </div>

          {/* Background decorative glow */}
          <div style={{ position: 'absolute', bottom: -50, right: -50, width: 150, height: 150, background: project.color, filter: 'blur(80px)', opacity: 0.1, borderRadius: '50%', pointerEvents: 'none' }} />
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
