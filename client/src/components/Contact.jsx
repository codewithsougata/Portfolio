import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const socials = [
    { icon: <Mail size={15} />, label: 'Email', href: 'mailto:sougata@example.com', text: 'sougata@example.com' },
    { icon: <Github size={15} />, label: 'GitHub', href: 'https://github.com/yourgithub', text: 'github.com/yourgithub' },
    { icon: <Linkedin size={15} />, label: 'LinkedIn', href: 'https://linkedin.com/in/yourlinkedin', text: 'linkedin.com/in/yourlinkedin' },
  ];

  return (
    <section id="contact" className="section-container">
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="hash">#</span>contact
      </motion.h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>

        {/* ── Info panel ── */}
        <motion.div
          className="terminal-window"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="terminal-titlebar">
            <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
            <span className="titlebar-label">connect.sh</span>
          </div>
          <div style={{ padding: '24px 28px' }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 8 }}>Let's Connect</div>
            <p style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 28 }}>
              I'm currently looking for new opportunities. Whether you have a project, question, or just want to say hi — I'll get back to you!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 14px', borderRadius: 8,
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text-dim)', textDecoration: 'none',
                    fontFamily: "'JetBrains Mono',monospace", fontSize: 12,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--cyan)';
                    e.currentTarget.style.color = 'var(--cyan)';
                    e.currentTarget.style.background = 'var(--cyan-dim)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text-dim)';
                    e.currentTarget.style.background = 'var(--surface2)';
                  }}
                >
                  <span style={{ color: 'var(--cyan)' }}>$ connect --via</span>
                  {s.icon}
                  <span>{s.text}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Form panel ── */}
        <motion.div
          className="terminal-window"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="terminal-titlebar">
            <span className="dot-red" /><span className="dot-yellow" /><span className="dot-green" />
            <span className="titlebar-label">sendmail — new message</span>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>

            {[
              { field: 'name', placeholder: 'your name', type: 'text', label: 'name' },
              { field: 'email', placeholder: 'your email', type: 'email', label: 'email' },
            ].map(({ field, placeholder, type, label }) => (
              <div key={field}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text-mute)', marginBottom: 5 }}>
                  <span style={{ color: 'var(--cyan)' }}>$</span> {label}:
                </div>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={formData[field]}
                  onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                  required
                  className="terminal-input"
                />
              </div>
            ))}

            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: 'var(--text-mute)', marginBottom: 5 }}>
                <span style={{ color: 'var(--cyan)' }}>$</span> message:
              </div>
              <textarea
                placeholder="your message here..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="terminal-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary-dev"
              style={{ marginTop: 4, width: '100%', opacity: status === 'sending' ? 0.7 : 1 }}
            >
              {status === 'sending'
                ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 12, height: 12, border: '2px solid rgba(167,139,250,0.4)', borderTopColor: '#a78bfa', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Transmitting...
                </span>
                : <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Send size={13} /> $ send --message
                </span>
              }
            </button>

            {status === 'success' && (
              <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--green)' }}>
                <CheckCircle size={13} /> Message dispatched successfully.
              </p>
            )}
            {status === 'error' && (
              <p style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: 'var(--red)' }}>
                <AlertCircle size={13} /> Transmission failed. Try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
