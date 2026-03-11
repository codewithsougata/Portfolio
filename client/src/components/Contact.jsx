import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) { 
      console.error('Email sending failed:', error);
      setStatus('error'); 
    }
  };

  const socials = [
    { icon: <Mail size={18} />, label: 'Email', href: 'mailto:sougatamanaa9932@gmail.com', text: 'sougatamanna9932@gmail.com' },
    { icon: <Github size={18} />, label: 'GitHub', href: 'https://github.com/codewithsougata', text: 'https://github.com/codewithsougata' },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sougata-manna-9932s/', text: 'https://www.linkedin.com/in/sougata-manna-9932s/' },
  ];

  return (
    <section id="contact" className="section-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: 50 }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          Get In <span style={{ color: 'var(--cyan)' }}>Touch</span>
        </h2>
        <div style={{ width: 60, height: 4, background: 'var(--cyan)', margin: '0 auto', borderRadius: 2 }} />
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>

        {/* ── Info panel ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(20, 25, 40, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 24,
            padding: 'clamp(20px, 4vw, 40px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: -100, left: -100, width: 250, height: 250, background: 'var(--cyan)', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{ fontWeight: 700, fontSize: 24, color: 'var(--text)', marginBottom: 16 }}>Let's Connect</h3>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: 32 }}>
              I'm currently looking for new opportunities. Whether you have a project, question, or just want to say hi — I'll try my best to get back to you!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {socials.map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02, x: 5 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '16px 20px', borderRadius: 16,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--text)', textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--cyan-dim)';
                    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
                    e.currentTarget.style.color = 'var(--cyan)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = 'var(--text)';
                  }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: 'rgba(255,255,255,0.05)', color: 'inherit'
                  }}>
                    {s.icon}
                  </div>
                  <span style={{ fontWeight: 500, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.text}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Form panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'rgba(20, 25, 40, 0.4)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: 24,
            padding: 'clamp(20px, 4vw, 40px)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', bottom: -100, right: -100, width: 250, height: 250, background: '#a78bfa', filter: 'blur(120px)', opacity: 0.1, borderRadius: '50%' }} />

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 1 }}>

            <h3 style={{ fontWeight: 700, fontSize: 24, color: 'var(--text)', marginBottom: 8 }}>Send a Message</h3>

            {[
              { field: 'name', placeholder: 'John Doe', type: 'text', label: 'Your Name' },
              { field: 'email', placeholder: 'john@example.com', type: 'email', label: 'Your Email' },
            ].map(({ field, placeholder, type, label }) => (
              <div key={field}>
                <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-mute)', marginBottom: 8 }}>{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={formData[field]}
                  onChange={e => setFormData({ ...formData, [field]: e.target.value })}
                  required
                  style={{
                    width: '100%', padding: '14px 18px', borderRadius: 12,
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    color: 'var(--text)', fontSize: 15, transition: 'all 0.3s ease',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--cyan)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.15)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
                  }}
                />
              </div>
            ))}

            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-mute)', marginBottom: 8 }}>Your Message</label>
              <textarea
                placeholder="How can I help you?"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                style={{
                  width: '100%', padding: '14px 18px', borderRadius: 12,
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  color: 'var(--text)', fontSize: 15, transition: 'all 0.3s ease',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)', resize: 'vertical'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--cyan)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 212, 255, 0.15)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.1)';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-3d"
              style={{ width: '100%', marginTop: 8, opacity: status === 'sending' ? 0.7 : 1 }}
            >
              {status === 'sending' ? (
                <>
                  <span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--green)', fontWeight: 500, marginTop: 8 }}>
                <CheckCircle size={16} /> Message sent successfully!
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--red)', fontWeight: 500, marginTop: 8 }}>
                <AlertCircle size={16} /> Failed to send message. Please try again.
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
