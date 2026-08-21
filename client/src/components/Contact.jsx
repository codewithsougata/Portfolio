import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, TextArea, Label } from './ui/input';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import emailjs from '@emailjs/browser';

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-col space-y-1.5 w-full ${className}`}>
      {children}
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID_HERE';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID_HERE';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY_HERE';

      const fullName = `${formData.firstname} ${formData.lastname}`.trim();

      const templateParams = {
        from_name: fullName,
        from_email: formData.email,
        company: formData.subject,
        message: formData.message,
        user_name: fullName,
        user_email: formData.email,
        reply_to: formData.email,
      };

      if (serviceId !== 'YOUR_SERVICE_ID_HERE') {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } else {
        // Fallback simulation
        await new Promise((res) => setTimeout(res, 1000));
      }

      setStatus('success');
      setFormData({ firstname: '', lastname: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="section-container relative w-full py-8 md:py-12"
      style={{ maxWidth: '960px', margin: '0 auto' }}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        style={{ textAlign: 'center', marginBottom: 20 }}
      >
        <p
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--cyan)',
            marginBottom: 6,
            fontWeight: 600,
          }}
        >
          Get In Touch
        </p>

        <h2
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: 8,
            lineHeight: 1.15,
          }}
        >
          Contact <span style={{ color: 'var(--cyan)' }}>Me</span>
        </h2>

        <div
          style={{
            width: 40,
            height: 2,
            background: 'var(--cyan)',
            margin: '0 auto',
            borderRadius: 2,
          }}
        />
      </motion.div>

      {/* ── Aceternity Signup Form Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto rounded-2xl p-4 md:p-6 shadow-input dark:bg-black/60 bg-white/90 dark:border-neutral-800 border-neutral-200 border backdrop-blur-xl relative z-10"
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2.5">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Sougata"
                type="text"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Manna"
                type="text"
                required
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="sougata@example.com"
              type="email"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry"
              type="text"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="message">Your Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or idea..."
              required
            />
          </LabelInputContainer>

          {/* Submit Button */}
          <button
            className="bg-gradient-to-br relative group/btn from-neutral-900 to-neutral-800 dark:from-zinc-900 dark:to-zinc-900 block w-full text-white rounded-md h-9 font-medium text-xs shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] transition duration-300 cursor-pointer disabled:opacity-50 mt-4"
            type="submit"
            disabled={status === 'sending'}
          >
            <span className="flex items-center justify-center gap-1.5">
              {status === 'sending' ? (
                <>Sending...</>
              ) : (
                <>
                  Send Message &rarr;
                </>
              )}
            </span>
            <BottomGradient />
          </button>

          {/* Status alerts */}
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium"
            >
              <CheckCircle2 size={14} />
              <span>Message sent successfully!</span>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium"
            >
              <AlertCircle size={14} />
              <span>Failed to send. Please reach out via email.</span>
            </motion.div>
          )}

          {/* Divider */}
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />

          {/* Bottom Socials: ONLY Logos / Icons */}
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://github.com/codewithsougata"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub Profile"
              className="relative group/btn flex items-center justify-center h-9 w-9 rounded-md dark:bg-zinc-800 bg-neutral-100 dark:text-white text-neutral-800 border border-[var(--border2)] shadow-input hover:bg-neutral-200 dark:hover:bg-zinc-700 transition duration-200"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors" />
              <BottomGradient />
            </a>

            <a
              href="mailto:sougatamanna690@gmail.com"
              title="Direct Email"
              aria-label="Direct Email"
              className="relative group/btn flex items-center justify-center h-9 w-9 rounded-md dark:bg-zinc-800 bg-neutral-100 dark:text-white text-neutral-800 border border-[var(--border2)] shadow-input hover:bg-neutral-200 dark:hover:bg-zinc-700 transition duration-200"
            >
              <Mail className="h-4 w-4 text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors" />
              <BottomGradient />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn Profile"
              className="relative group/btn flex items-center justify-center h-9 w-9 rounded-md dark:bg-zinc-800 bg-neutral-100 dark:text-white text-neutral-800 border border-[var(--border2)] shadow-input hover:bg-neutral-200 dark:hover:bg-zinc-700 transition duration-200"
            >
              <IconBrandLinkedin className="h-4 w-4 text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors" />
              <BottomGradient />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              title="X / Twitter"
              aria-label="X Profile"
              className="relative group/btn flex items-center justify-center h-9 w-9 rounded-md dark:bg-zinc-800 bg-neutral-100 dark:text-white text-neutral-800 border border-[var(--border2)] shadow-input hover:bg-neutral-200 dark:hover:bg-zinc-700 transition duration-200"
            >
              <IconBrandX className="h-4 w-4 text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white transition-colors" />
              <BottomGradient />
            </a>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
