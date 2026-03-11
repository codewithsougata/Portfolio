import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Calendar } from 'lucide-react';

const educationData = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Brainware University',
    date: '2023 – 2026',
    description: 'Pursuing undergraduate degree in Computer Applications, focusing on software engineering, web development, and database management.',
    status: 'Ongoing',
    icon: <Code size={20} />,
  },
  {
    title: 'Higher Secondary Education',
    institution: 'Chakbhabani MKN Vidyayatan',
    date: 'Graduated 2023',
    description: 'Completed higher secondary education with a strong foundation in science and mathematics.',
    status: 'Completed',
    icon: <GraduationCap size={20} />,
  },
];

const Education = () => (
  <section id="education" className="section-container">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ textAlign: 'center', marginBottom: 60 }}
    >
      <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
        My <span style={{ color: 'var(--cyan)' }}>Education</span>
      </h2>
      <div style={{ width: 60, height: 4, background: 'var(--cyan)', margin: '0 auto', borderRadius: 2 }} />
    </motion.div>

    <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
      {/* Central timeline line */}
      <div style={{ position: 'absolute', top: 0, left: '24px', bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--cyan), transparent)', opacity: 0.3 }} className="timeline-line"></div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {educationData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ position: 'relative', paddingLeft: 60 }}
          >
            {/* Timeline Icon Node */}
            <div style={{
              position: 'absolute', left: 4, top: 0,
              width: 42, height: 42, borderRadius: '50%',
              background: item.status === 'Ongoing' ? 'var(--cyan)' : 'var(--surface2)',
              border: `2px solid ${item.status === 'Ongoing' ? 'rgba(0, 212, 255, 0.4)' : 'var(--border)'}`,
              color: item.status === 'Ongoing' ? '#0a0e1a' : 'var(--text-mute)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: item.status === 'Ongoing' ? '0 0 20px rgba(0, 212, 255, 0.4)' : 'none',
              zIndex: 2
            }}>
              {item.icon}
            </div>

            {/* Content Card */}
            <div style={{
              background: 'rgba(20, 25, 40, 0.4)',
              backdropFilter: 'blur(12px)',
              border: item.status === 'Ongoing' ? '1px solid rgba(0, 212, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: 20,
              padding: 'clamp(20px, 4vw, 32px)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }} className="education-card">

              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
                <h3 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text)', margin: 0 }}>{item.title}</h3>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  color: 'var(--text-mute)', borderRadius: 20, fontSize: 13, fontWeight: 500
                }}>
                  <Calendar size={14} /> {item.date}
                </span>
              </div>

              <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--cyan)', marginBottom: 16 }}>{item.institution}</h4>

              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, margin: 0 }}>{item.description}</p>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Education;
