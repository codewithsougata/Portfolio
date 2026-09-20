import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input, TextArea, Label } from './ui/input';
import { Mail, AlertCircle } from 'lucide-react';
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';
import emailjs from '@emailjs/browser';
import OptionWheel from './OptionWheel';
import TextPressure from './TextPressure';
import { Button as StatefulButton } from './ui/stateful-button';

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 block w-full h-px transition duration-500 opacity-0 group-hover/btn:opacity-100 -bottom-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="absolute block w-1/2 h-px mx-auto transition duration-500 opacity-0 group-hover/btn:opacity-100 blur-sm -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
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

  const isFormValid =
    formData.firstname.trim() !== '' &&
    formData.lastname.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.message.trim() !== '';

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Promise-returning function consumed by the StatefulButton
  const sendMessage = async () => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are missing.');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
      return;
    }

    setStatus('sending');

    try {
      const fullName = `${formData.firstname} ${formData.lastname}`.trim();

      // These variable names must match the variables used in
      // your EmailJS Contact template and Auto-Reply template.
      const templateParams = {
        name: fullName,
        email: formData.email,
        title: formData.subject || 'Portfolio Contact',
        message: formData.message,
        time: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
          timeZone: 'Asia/Kolkata',
        }),
      };

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      setStatus('success');
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        subject: '',
        message: '',
      });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('EmailJS sending failed:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full py-8 section-container md:py-12"
      style={{ maxWidth: '960px', margin: '0 auto' }}
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[300px] bg-cyan-500/5 blur-[140px] pointer-events-none rounded-full" />

      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        style={{ textAlign: 'center', marginBottom: 24 }}
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
          className="rouge-script-regular"
          style={{
            fontSize: 'clamp(1.8rem, 2.8vw, 2.4rem)',
            fontWeight: 400,
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

      {/* ── Main Contact Container: Left Wheel + Right Form ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10 px-2 sm:px-4 max-w-[960px] mx-auto">
        {/* Left Side: OptionWheel (decreased width, increased height) */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hidden lg:flex flex-col justify-between col-span-5 h-[500px] relative p-5 rounded-2xl border border-[var(--border2)] bg-[var(--surface)]/30 backdrop-blur-xl shadow-input"
        >
          <div className="mb-2">
            <h3 className="text-lg font-bold text-[var(--text)] leading-snug">
              What would you like to discuss?
            </h3>
            <p className="text-[11px] text-[var(--text-dim)] mt-1">
              Scroll or drag to pick a subject:
            </p>
          </div>

          <div className="relative flex-1 w-full mt-2 overflow-hidden">
            <OptionWheel
              items={[
                'Web Development',
                'Full Stack MERN',
                'Frontend Design',
                'Freelance Project',
                'Job Opportunity',
                'UI/UX Design',
                "Let's Collaborate",
                'Say Hello'
              ]}
              defaultSelected={0}
              textColor="#71717a"
              activeColor="#bc206bff"
              side="left"
              fontSize={1.7}
              spacing={1.35}
              curve={1.1}
              tilt={7}
              blur={1.4}
              fade={0.3}
              smoothing={200}
              inset={20}
              loop={false}
              draggable
              onChange={(index, item) => {
                setFormData(prev => ({ ...prev, subject: item }));
              }}
            />
          </div>
        </motion.div>

        {/* Right Side: Aceternity Signup Form Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex flex-col justify-between w-full col-span-1 p-5 border lg:col-span-7 rounded-2xl md:p-6 shadow-input dark:bg-black/60 bg-white/90 dark:border-neutral-800 border-neutral-200 backdrop-blur-xl"
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

            {/* Submit Button — Aceternity Stateful Button */}
            <div className="mt-4 flex justify-center">
              <StatefulButton
                onClick={sendMessage}
                disabled={!isFormValid}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-zinc-900 dark:to-zinc-900 hover:ring-neutral-600 dark:ring-offset-black w-full rounded-md px-6 py-2 text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Message
              </StatefulButton>
            </div>

            {/* Error alert */}
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
                <IconBrandGithub className="w-4 h-4 transition-colors text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white" />
                <BottomGradient />
              </a>

              <a
                href="mailto:sougatamanna690@gmail.com"
                title="Direct Email"
                aria-label="Direct Email"
                className="relative group/btn flex items-center justify-center h-9 w-9 rounded-md dark:bg-zinc-800 bg-neutral-100 dark:text-white text-neutral-800 border border-[var(--border2)] shadow-input hover:bg-neutral-200 dark:hover:bg-zinc-700 transition duration-200"
              >
                <Mail className="w-4 h-4 transition-colors text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white" />
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
                <IconBrandLinkedin className="w-4 h-4 transition-colors text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white" />
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
                <IconBrandX className="w-4 h-4 transition-colors text-neutral-700 dark:text-neutral-300 group-hover/btn:text-black dark:group-hover/btn:text-white" />
                <BottomGradient />
              </a>
            </div>
          </form>
        </motion.div>
      </div>

      {/* ── Bottom Thank You Interactive TextPressure Effect ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative w-full max-w-[960px] mx-auto mt-10 sm:mt-14 px-3 sm:px-4"
      >
        <div className="relative w-full h-[90px] sm:h-[130px] md:h-[160px] flex items-center justify-center overflow-visible">
          <TextPressure
            text="THANK YOU"
            flex
            alpha={false}
            stroke={false}
            scale={false}
            width
            weight
            italic
            textColor="var(--text)"
            strokeColor="#00d4ff"
            minFontSize={24}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
