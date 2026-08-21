import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BrainCircuit, BarChart3 } from 'lucide-react';
import { SiPython } from 'react-icons/si';
import { LinkPreview } from './ui/link-preview';


/* ── Brand logos as inline SVG ── */
const IbmLogo = () => (
  <svg viewBox="0 0 40 16" width="38" height="15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="IBM">
    {/* I */}
    <rect x="0" y="0" width="6" height="2" fill="currentColor" opacity="0.85" />
    <rect x="0" y="7" width="6" height="2" fill="currentColor" opacity="0.85" />
    <rect x="2" y="2" width="2" height="5" fill="currentColor" opacity="0.85" />
    <rect x="2" y="9" width="2" height="5" fill="currentColor" opacity="0.85" />
    <rect x="0" y="14" width="6" height="2" fill="currentColor" opacity="0.85" />
    {/* B */}
    <rect x="9" y="0" width="6" height="2" fill="currentColor" opacity="0.85" />
    <rect x="9" y="7" width="5" height="2" fill="currentColor" opacity="0.85" />
    <rect x="9" y="14" width="6" height="2" fill="currentColor" opacity="0.85" />
    <rect x="9" y="2" width="2" height="5" fill="currentColor" opacity="0.85" />
    <rect x="9" y="9" width="2" height="5" fill="currentColor" opacity="0.85" />
    <rect x="14" y="2" width="2" height="4" fill="currentColor" opacity="0.85" />
    <rect x="14" y="9" width="2" height="4" fill="currentColor" opacity="0.85" />
    {/* M */}
    <rect x="18" y="0" width="2" height="16" fill="currentColor" opacity="0.85" />
    <rect x="20" y="2" width="2" height="4" fill="currentColor" opacity="0.85" />
    <rect x="22" y="4" width="2" height="2" fill="currentColor" opacity="0.85" />
    <rect x="24" y="2" width="2" height="4" fill="currentColor" opacity="0.85" />
    <rect x="26" y="0" width="2" height="16" fill="currentColor" opacity="0.85" />
  </svg>
);

const NptelLogo = () => (
  <span style={{
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    color: 'var(--text)',
    textTransform: 'uppercase',
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
  }}>
    <span style={{ opacity: 0.9 }}>N</span>
    <span style={{ opacity: 0.6 }}>P</span>
    <span style={{ opacity: 0.9 }}>T</span>
    <span style={{ opacity: 0.6 }}>E</span>
    <span style={{ opacity: 0.9 }}>L</span>
  </span>
);


const certs = [
  {
    id: 1,
    title: "Data Science Virtual Internship",
    description: "Hands-on virtual internship covering exploratory data analysis, Python analytics workflows, and business insights...",
    tag: "Data Science | Python | Analytics",
    certLogo: <IbmLogo />,
    icons: [
      <BrainCircuit key="ibm" size={17} style={{ color: 'var(--text-dim)' }} />,
      <SiPython key="py" size={16} style={{ color: 'var(--text-dim)' }} />,
      <BarChart3 key="analytics" size={17} style={{ color: 'var(--text-dim)' }} />,
    ],
    issuer: "IBM",
    link: "https://www.ibm.com/training/badge/data-science-foundations",
    previewImage: `https://api.microlink.io/?url=${encodeURIComponent('https://www.ibm.com/training')}&screenshot=true&meta=false&embed=screenshot.url`,
  },
  {
    id: 2,
    title: "Python for Data Science",
    description: "4-Week Certified Course covering scientific computing, data manipulation, statistics, and analytics. Score: 63%...",
    tag: "Python | Data Science | Data Analytics | 4-Week Certified Course | Score: 63%",
    certLogo: <NptelLogo />,
    icons: [
      <SiPython key="py" size={16} style={{ color: 'var(--text-dim)' }} />,
      <BarChart3 key="analytics" size={17} style={{ color: 'var(--text-dim)' }} />,
    ],
    issuer: "NPTEL",
    link: "https://nptel.ac.in/courses/106/106/106106183/",
    previewImage: `https://api.microlink.io/?url=${encodeURIComponent('https://nptel.ac.in')}&screenshot=true&meta=false&embed=screenshot.url`,
  },
];


const rowVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.38, delay: i * 0.09, ease: 'easeOut' }
  }),
};

const Certifications = () => {
  return (
    <section
      id="certifications"
      className="section-container"
      style={{ position: 'relative', overflow: 'visible', padding: '1.5rem 0', maxWidth: '960px' }}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 14 }}
      >
        <p style={{
          fontSize: '0.68rem', letterSpacing: '0.25em',
          textTransform: 'uppercase', color: 'var(--cyan)',
          marginBottom: 6, fontWeight: 600,
        }}>
          Credentials & Growth
        </p>

        <h2 style={{
          fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
          fontWeight: 800, color: 'var(--text)',
          marginBottom: 8, lineHeight: 1.15,
        }}>
          Certifications & <span style={{ color: 'var(--text)' }}>Learning</span>
        </h2>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
          style={{
            width: 40, height: 2,
            background: 'var(--cyan)',
            margin: '0 auto', borderRadius: 2,
            transformOrigin: 'center',
          }}
        />
      </motion.div>

      {/* ── Cert Rows ── */}
      <div style={{ padding: '0 1rem' }}>
        {certs.map((cert, i) => (
          <motion.div
            key={cert.id}
            custom={i}
            variants={rowVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="border-b border-[var(--border2)]"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '0.85rem 0',
              position: 'relative',
              overflow: 'visible',
            }}
          >
            {/* Cert badge icon — shows org logo, no border */}
            <div style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 28,
              padding: '0 2px',
              color: 'var(--text)',
            }}>
              {cert.certLogo}
            </div>

            {/* Left: text — title wrapped in LinkPreview */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                {/* LinkPreview wraps only the title, popup appears to the right */}
                <LinkPreview
                  url={cert.link}
                  title={cert.title}
                  image={cert.previewImage}
                  placement="right"
                  width={260}
                  height={150}
                >
                  <span style={{
                    fontSize: 'clamp(0.88rem, 1.6vw, 1rem)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    lineHeight: 1.2,
                    display: 'inline-block',
                  }}>
                    {cert.title}
                  </span>
                </LinkPreview>
              </div>

              <p style={{
                fontSize: '0.78rem',
                color: 'var(--text-dim)',
                margin: '0 0 3px 0',
                lineHeight: 1.35,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {cert.description}
              </p>

              <span style={{
                fontSize: '0.68rem',
                color: 'var(--text-mute)',
                fontWeight: 400,
              }}>
                {cert.tag}
              </span>
            </div>

            {/* Right: tech icons + View Certificate */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
              {/* Tech icons — grayscale, color on hover */}
              {cert.icons.map((icon, idx) => (
                <span
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    filter: 'grayscale(1) brightness(0.8)',
                    transition: 'filter 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0) brightness(1)'}
                  onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(1) brightness(0.8)'}
                >
                  {icon}
                </span>
              ))}

              {/* Divider */}
              <div style={{ width: 1, height: 16, background: 'var(--border2)', flexShrink: 0 }} />

              {/* View Certificate icon */}
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                title="View Certificate"
                aria-label="View Certificate"
                className="border border-[var(--border2)] text-[var(--text-dim)] hover:text-[var(--text)] dark:hover:border-white/40 hover:border-black/30"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: 'var(--surface2)',
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                <ExternalLink size={12} />
              </a>
            </div>

          </motion.div>
        ))}
      </div>

      {/* count line */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.3 }}
        style={{
          textAlign: 'center', marginTop: 20,
          fontSize: '0.75rem', letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-mute)',
        }}
      >
        {certs.length} Certifications • Always Learning
      </motion.p>
    </section>
  );
};

export default Certifications;
