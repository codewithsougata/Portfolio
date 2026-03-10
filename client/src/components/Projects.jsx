import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTestimonials } from './ui/animated-testimonials';

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

const Projects = () => {
  const testimonials = projectsData.map(project => ({
    quote: project.description,
    name: project.title,
    designation: project.techStack.join(" • "),
    src: project.image,
    github: project.github,
    live: project.live
  }));

  return (
    <section id="projects" className="section-container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background decorative glow */}
      <div style={{ position: 'absolute', top: '10%', right: '-10%', width: 400, height: 400, background: 'var(--cyan)', filter: 'blur(150px)', opacity: 0.05, borderRadius: '50%', pointerEvents: 'none' }} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 20 }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          Featured <span style={{ color: 'var(--cyan)' }}>Projects</span>
        </h2>
        <div style={{ width: 60, height: 4, background: 'var(--cyan)', margin: '0 auto', borderRadius: 2 }} />
      </motion.div>

      <div className="relative z-10">
        <AnimatedTestimonials testimonials={testimonials} autoplay={false} />
      </div>
    </section>
  );
};

export default Projects;
