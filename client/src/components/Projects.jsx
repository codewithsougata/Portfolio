import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingDock } from './ui/floating-dock';
import {
  IconLayoutDashboard,
  IconBrandReact,
  IconBrandNodejs,
  IconServer,
  IconBrandMongodb,
  IconBrandCss3,
  IconBrandFramerMotion,
  IconBrandTailwind,
  IconCode
} from '@tabler/icons-react';
import { DraggableCardBody, DraggableCardContainer } from './ui/draggable-card';
import { projects_list } from '../assets/assets';


// ── constants ──────────────────────────────────────────────────────────────
const GLOW = {
  position: 'absolute',
  borderRadius: '50%',
  pointerEvents: 'none',
  filter: 'blur(140px)',
  background: 'var(--cyan)',
  opacity: 0.05,
};

const PILL_BASE = {
  padding: '6px 20px',
  borderRadius: 999,
  fontSize: '0.8rem',
  fontWeight: 500,
  cursor: 'pointer',
  letterSpacing: '0.05em',
  outline: 'none',
  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
  backdropFilter: 'blur(8px)',
  border: '1.5px solid transparent',
};

const pillStyle = (isActive) => ({
  ...PILL_BASE,
  background: isActive ? 'rgba(0,255,255,0.1)' : 'rgba(255,255,255,0.04)',
  borderColor: isActive ? 'var(--cyan)' : 'rgba(255,255,255,0.1)',
  color: isActive ? 'var(--cyan)' : 'rgba(255,255,255,0.55)',
  fontWeight: isActive ? 700 : 400,
});

// ── variants (defined outside component — no re-creation on render) ─────────
const sectionVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const barVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.4, delay: 0.25, ease: 'easeOut' } },
};

const filterContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.28, ease: 'easeOut' } },
};

const listVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: 'easeOut' } },
  exit: { opacity: 0, y: -14, transition: { duration: 0.22, ease: 'easeIn' } },
};

const countVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.32, duration: 0.3 } },
};

// ── component ──────────────────────────────────────────────────────────────
const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const allTags = useMemo(() => {
    const tags = new Set();
    projects_list.forEach(p => p.techStack.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, []);

  const filteredProjects = useMemo(() => (
    activeFilter === 'All'
      ? projects_list
      : projects_list.filter(p => p.techStack.includes(activeFilter))
  ), [activeFilter]);

  const testimonials = filteredProjects.map(({ description, title, techStack, image, github, live }) => ({
    quote: description,
    name: title,
    designation: techStack.join(' • '),
    src: image,
    github,
    live,
  }));

  return (
    <section
      id="projects"
      className="section-container"
      style={{ position: 'relative', overflow: 'hidden', padding: '2.5rem 0', maxWidth: '960px' }}
    >

      {/* Glows — no animation, pure CSS, zero reflow */}
      <div style={{ ...GLOW, top: '4%', right: '-8%', width: 480, height: 480 }} />
      <div style={{ ...GLOW, bottom: '8%', left: '-6%', width: 380, height: 380, opacity: 0.035 }} />

      {/* ── Header ── */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{ textAlign: 'center', marginBottom: 20 }}
      >
        <p style={{
          fontSize: '0.72rem', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--cyan)',
          marginBottom: 8, fontWeight: 600,
        }}>
          What I've Built
        </p>

        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
          fontWeight: 800, color: 'var(--text)',
          marginBottom: 10, lineHeight: 1.15,
        }}>
          Featured <span style={{ color: 'var(--text)' }}>Projects</span>
        </h2>

        {/* Bar — transformOrigin: center prevents layout reflow */}
        <motion.div
          variants={barVariants}
          style={{
            width: 50, height: 3,
            background: 'var(--cyan)',
            margin: '0 auto', borderRadius: 2,
            transformOrigin: 'center',   // ← key fix
          }}
        />
      </motion.div>

      {/* ── Filter Dock ── */}
      <motion.div
        variants={filterContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
          width: '100%',
          zIndex: 50,
          position: 'relative'
        }}
      >
        <FloatingDock 
           items={allTags.map(tag => {
              const active = activeFilter === tag;
              const className = `h-full w-full transition-colors ${active ? 'opacity-100' : 'opacity-50 dark:opacity-40'} text-[var(--text)]`;
              
              let icon;
              if (tag === 'All') icon = <IconLayoutDashboard className={className} />;
              else if (tag === 'React') icon = <IconBrandReact className={className} />;
              else if (tag === 'Node.js') icon = <IconBrandNodejs className={className} />;
              else if (tag === 'Express') icon = <IconServer className={className} />;
              else if (tag === 'MongoDB') icon = <IconBrandMongodb className={className} />;
              else if (tag === 'CSS') icon = <IconBrandCss3 className={className} />;
              else if (tag === 'Framer Motion') icon = <IconBrandFramerMotion className={className} />;
              else if (tag === 'Tailwind CSS') icon = <IconBrandTailwind className={className} />;
              else icon = <IconCode className={className} />;

              return {
                title: tag,
                icon,
                onClick: () => setActiveFilter(tag)
              };
           })} 
           desktopClassName="bg-[var(--surface)] border border-[var(--border2)]" 
           mobileClassName="mx-auto" 
        />
      </motion.div>

      {/* ── Project List ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ position: 'relative', zIndex: 10, minHeight: '540px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {filteredProjects.length > 0 ? (
            <DraggableCardContainer className="relative flex h-[540px] w-full items-center justify-center overflow-hidden rounded-2xl">
              <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-1/2 text-center text-xl md:text-2xl font-black text-[var(--text-mute)] opacity-50 pointer-events-none">
                Drag the project cards around!
              </p>
              {filteredProjects.map((project, i) => {
                const positions = [
                  "absolute top-10 left-[10%] md:left-[20%] rotate-[-5deg]",
                  "absolute top-40 left-[20%] md:left-[25%] rotate-[-7deg]",
                  "absolute top-5 left-[30%] md:left-[40%] rotate-[8deg]",
                  "absolute top-32 left-[40%] md:left-[55%] rotate-[10deg]",
                  "absolute top-20 right-[15%] md:right-[35%] rotate-[2deg]",
                  "absolute top-24 left-[50%] md:left-[45%] rotate-[-7deg]",
                  "absolute top-8 left-[15%] md:left-[30%] rotate-[4deg]",
                  "absolute top-16 right-[5%] md:right-[20%] rotate-[-4deg]",
                ];
                const className = positions[i % positions.length];
                return (
                  <DraggableCardBody key={project.title} className={className}>
                    <div className="bg-[var(--surface)] border border-[var(--border2)] rounded-xl overflow-hidden shadow-2xl flex flex-col p-2 pointer-events-auto">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="pointer-events-none relative z-10 h-48 w-64 md:h-64 md:w-80 object-cover rounded-lg"
                      />
                      <div className="mt-3 flex flex-col px-1 h-full">
                        <h3 className="text-lg font-bold text-[var(--text)]">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[var(--text-dim)] mt-1 mb-3 line-clamp-2">
                           {project.description}
                        </p>
                        <div className="mt-auto flex gap-2">
                          {project.live && (
                             <a href={project.live} target="_blank" rel="noreferrer" className="flex-1 text-center text-xs font-semibold text-black bg-cyan-400 px-3 py-1.5 rounded hover:bg-cyan-300 transition pointer-events-auto">Demo</a>
                          )}
                          {project.github && (
                             <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 text-center text-xs font-semibold text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded hover:bg-cyan-500/10 transition pointer-events-auto">Code</a>
                          )}
                        </div>
                      </div>
                    </div>
                  </DraggableCardBody>
                );
              })}
            </DraggableCardContainer>
          ) : (
            <p style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.35)',
              fontSize: '0.95rem',
            }}>
              No projects tagged{' '}
              <strong style={{ color: 'var(--cyan)' }}>{activeFilter}</strong>.
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Count badge ── */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeFilter + '-count'}
          variants={countVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            textAlign: 'center', marginTop: 20,
            fontSize: '0.75rem', letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          Showing {filteredProjects.length} of {projects_list.length} projects
        </motion.p>
      </AnimatePresence>
    </section>
  );
};

export default Projects;