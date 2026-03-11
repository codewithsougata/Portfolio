import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedTestimonials } from './ui/animated-testimonials';
import { assets, projects_list } from '../assets/assets';

const Projects = () => {
  const testimonials = projects_list.map(project => ({
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
