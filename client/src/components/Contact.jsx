import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { MacbookScroll } from './ui/macbook-scroll';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID_HERE';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID_HERE';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        message: formData.message,
        user_name: formData.name,
        user_email: formData.email,
        reply_to: formData.email,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 5% 0', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 1200, width: '100%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '80px' }}>

        {/* Left Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: 'var(--surface2)',
            border: '1px solid var(--border2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <Mail size={20} color="var(--cyan)" />
          </div>

          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 20, letterSpacing: '-0.02em' }}>
            Contact us
          </h2>

          <p style={{ color: 'var(--text-dim)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: 40, maxWidth: '90%' }}>
            We are always looking for ways to improve our products and services. Contact us and let us know how we can help you.
          </p>

          <div style={{ display: 'flex', gap: '12px 20px', color: 'var(--text-dim)', fontSize: '0.9rem', flexWrap: 'wrap', marginBottom: 60 }}>
            <a href="mailto:sougatamanna9932@gmail.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>sougatamanna9932@gmail.com</a>
            <span style={{ color: 'var(--text-mute)' }}>•</span>
            <a href="https://github.com/codewithsougata" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>GitHub</a>
            <span style={{ color: 'var(--text-mute)' }}>•</span>
            <a href="https://www.linkedin.com/in/sougata-manna-9932s/" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = 'var(--text)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>LinkedIn</a>
          </div>

          {/* Map Media Area */}
          <div style={{ position: 'relative', width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', perspective: 1000 }}>

            {/* Map SVG */}
            <img src="/world.svg" alt="World Map" style={{ 
              position: 'absolute', 
              width: '140%', 
              height: '140%', 
              objectFit: 'contain', 
              opacity: 'var(--map-opacity)',
              transform: 'rotateX(45deg) scale(1.2) translateY(-10%)',
              filter: 'var(--map-filter) drop-shadow(0px 20px 10px rgba(0,0,0,0.1))'
            }} />

            {/* Placeholder Dotted Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(var(--text-mute) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
              maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 70%)',
              opacity: 0.2,
              transform: 'rotateX(45deg) scale(1.2) translateY(-10%)'
            }} />

            {/* Glowing "We are here" Marker */}
            <div style={{ position: 'absolute', top: '37%', left: '74%', transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  background: 'var(--surface2)',
                  border: '1px solid var(--border)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }}
              >
                We are here
              </motion.div>
              
              {/* Vertical Line */}
              <div style={{ width: 1.5, height: 50, background: 'linear-gradient(to bottom, var(--cyan), transparent)' }} />
              
              {/* Base Glowing Ellipse */}
              <div style={{ position: 'relative', marginTop: -5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ 
                    position: 'absolute', 
                    width: 70, 
                    height: 20, 
                    background: 'radial-gradient(ellipse at center, var(--cyan) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(2px)'
                  }}
                />
                <div style={{ width: 5, height: 5, background: 'var(--cyan)', borderRadius: '50%', boxShadow: '0 0 10px var(--cyan)', zIndex: 1 }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center' }}
        >
          <div style={{
            background: 'var(--surface)',
            borderRadius: 24,
            padding: 'clamp(24px, 4vw, 40px)',
            border: '1px solid var(--border)',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="name" style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Manu Arora"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 8,
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text)', fontSize: '0.95rem', transition: 'all 0.2s ease',
                    outline: 'none',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--cyan)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="email" style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="support@aceternity.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 8,
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text)', fontSize: '0.95rem', transition: 'all 0.2s ease',
                    outline: 'none',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--cyan)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="company" style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Aceternity Labs LLC"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 8,
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text)', fontSize: '0.95rem', transition: 'all 0.2s ease',
                    outline: 'none',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--cyan)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label htmlFor="message" style={{ fontSize: '0.9rem', color: 'var(--text)', fontWeight: 500 }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: 8,
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text)', fontSize: '0.95rem', transition: 'all 0.2s ease',
                    outline: 'none', resize: 'vertical',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--cyan)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                  }}
                />
              </div>

              <div style={{ marginTop: 8 }}>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    padding: '12px 28px',
                    borderRadius: 8,
                    background: 'var(--bg)',
                    color: 'var(--text)',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    border: '1px solid var(--border2)',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    width: 'fit-content'
                  }}
                  onMouseEnter={e => {
                    if (status !== 'sending') {
                      e.currentTarget.style.background = 'var(--border)';
                      e.currentTarget.style.borderColor = 'var(--cyan)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (status !== 'sending') {
                      e.currentTarget.style.background = 'var(--bg)';
                      e.currentTarget.style.borderColor = 'var(--border2)';
                    }
                  }}
                >
                  {status === 'sending' ? (
                    <>
                      <span style={{ width: 16, height: 16, border: '2px solid var(--border)', borderTopColor: 'var(--cyan)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>

              {status === 'success' && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--green)', fontWeight: 500 }}>
                  <CheckCircle size={16} /> Message sent successfully!
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--red)', fontWeight: 500 }}>
                  <AlertCircle size={16} /> Failed to send message. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </motion.div>

      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ── MacBook Scroll ── */}
      <div className="w-full overflow-hidden bg-transparent">
        <MacbookScroll
          title={
            <span className="text-neutral-800 dark:text-white">
              Built with passion. <br /> Crafted for impact.
            </span>
          }
          badge={
            <div className="flex h-10 w-10 -rotate-12 transform items-center justify-center rounded-full bg-cyan-500 text-white font-bold text-lg shadow-lg shadow-cyan-500/50">
              SM
            </div>
          }
          src="/fro.png"
          showGradient={false}
        />
      </div>
    </section>
  );
};

export default Contact;
