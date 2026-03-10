import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
  {
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Brainware University',
    date: '2023 – 2026',
    description: 'Pursuing undergraduate degree in Computer Applications, focusing on software engineering, web development, and database management.',
    status: 'Ongoing',
    hash: 'a4f92c1',
  },
  {
    title: 'Higher Secondary Education',
    institution: 'Chakbhabani MKN Vidyayatan',
    date: 'Graduated 2023',
    description: 'Completed higher secondary education with a strong foundation in science and mathematics.',
    status: 'Completed',
    hash: '8bd31e7',
  },
];

const Education = () => (
  <section id="education" className="section-container">
    <motion.h2
      className="section-heading"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="hash">#</span>education
    </motion.h2>

    <motion.div
      className="terminal-window"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="terminal-titlebar">
        <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
        <span className="titlebar-label">git log --graph --oneline education</span>
      </div>

      <div style={{ padding: '28px 32px' }}>
        {/* column header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '80px 80px 1fr',
          gap: 16, marginBottom: 20,
          fontFamily: "'JetBrains Mono',monospace", fontSize: 11,
          color: 'var(--text-mute)',
          borderBottom: '1px solid var(--border)', paddingBottom: 12,
        }}>
          <span>commit</span>
          <span>date</span>
          <span>title</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {educationData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                display: 'grid', gridTemplateColumns: '80px 80px 1fr',
                gap: 16, alignItems: 'start',
                paddingBottom: i < educationData.length - 1 ? 0 : 0,
              }}
            >
              {/* Graph column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: item.status === 'Ongoing' ? 'var(--green)' : 'var(--cyan)',
                  border: `2px solid ${item.status === 'Ongoing' ? 'var(--green)' : 'var(--cyan)'}`,
                  boxShadow: `0 0 8px ${item.status === 'Ongoing' ? 'var(--green)' : 'var(--cyan)'}`,
                  flexShrink: 0,
                }} />
                {i < educationData.length - 1 && (
                  <div style={{ width: 2, flex: 1, minHeight: 60, background: 'var(--border)', margin: '4px 0', borderRadius: 1 }} />
                )}
              </div>

              {/* Date */}
              <div style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                color: 'var(--amber)', paddingTop: 4,
              }}>
                {item.date}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                    color: 'var(--text-mute)',
                  }}>{item.hash}</span>
                  <span className={item.status === 'Ongoing' ? 'tag tag-green' : 'tag tag-cyan'}>
                    {item.status === 'Ongoing' ? '● active' : '✔ merged'}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)', marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--cyan)', marginBottom: 8 }}>{item.institution}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.7 }}>{item.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </section>
);

export default Education;
