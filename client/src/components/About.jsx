import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFramer,
  SiGit,
  SiGithub,
  SiVite,
  SiPostman,
  SiPython
} from 'react-icons/si';
import { cn } from "@/lib/utils";
import { BackgroundLines } from './ui/background-lines';
import { LinkPreview } from './ui/link-preview';
import LogoLoop from './LogoLoop';

const techLogosRow1 = [
  { node: <SiReact />, title: "React", href: "https://react.dev", color: "#61DAFB" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org", color: "var(--text)" },
  { node: <SiJavascript />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", color: "#F7DF1E" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org", color: "#3178C6" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com", color: "#06B6D4" },
  { node: <SiHtml5 />, title: "HTML5", href: "https://developer.mozilla.org/en-US/docs/Web/HTML", color: "#E34F26" },
  { node: <SiCss />, title: "CSS3", href: "https://developer.mozilla.org/en-US/docs/Web/CSS", color: "#1572B6" },
];

const techLogosRow2 = [
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org", color: "#339933" },
  { node: <SiExpress />, title: "Express", href: "https://expressjs.com", color: "var(--text)" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com", color: "#47A248" },
  { node: <SiFramer />, title: "Motion", href: "https://motion.dev", color: "#EA4C89" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com", color: "#F05032" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com", color: "var(--text)" },
  { node: <SiVite />, title: "Vite", href: "https://vitejs.dev", color: "#646CFF" },
  { node: <SiPostman />, title: "Postman", href: "https://www.postman.com", color: "#FF6C37" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org", color: "#3776AB" },
];

const About = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="about" className="relative z-30 w-full pt-4 section-container overflow-visible">
      <BackgroundLines className="z-0 flex-col items-center justify-center w-full px-4 md:px-10 py-4 overflow-visible" svgClassName="h-[70%] md:h-[80%] my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 24 }}
        >
          <h2 style={{ fontSize: 'clamp(1.8rem, 2.5vw, 2.2rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>
            About <span style={{ color: 'var(--cyan)' }}>Me</span>
          </h2>
          <div style={{ width: 50, height: 3, background: 'var(--cyan)', margin: '0 auto', borderRadius: 2 }} />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', width: '100%' }}>

          {/* ── Bio card ── */}
          <motion.div
            onMouseEnter={() => setHovered(0)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              "transition-all duration-300 ease-out dark:bg-black/50 bg-white/80 dark:border-white/10 border-black/10 backdrop-blur-xl rounded-2xl shadow-xl p-5 md:p-6 w-full max-w-[960px] relative z-20 border overflow-visible",
              hovered !== null && hovered !== 0 && "blur-[2px] scale-[0.98]"
            )}
            whileHover={{ translateY: -4 }}
          >
            <div style={{ position: 'absolute', top: -80, left: -80, width: 180, height: 180, background: 'var(--cyan)', filter: 'blur(90px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none' }} />

            {/* Bio text */}
            <div
              className="flex flex-col items-start text-left w-full px-1"
              style={{ color: 'var(--text-dim)', marginBottom: 20, position: 'relative', zIndex: 1 }}
            >
              <ul className="flex flex-col gap-3.5 w-full list-none p-0 m-0">
                <li className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-[var(--text-dim)] font-normal">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cyan)] shrink-0 shadow-[0_0_8px_var(--cyan)]" />
                  <span>
                    BCA graduate from{' '}
                    <LinkPreview
                      url="https://www.brainwareuniversity.ac.in/"
                      title="Brainware University"
                      image="https://api.microlink.io/?url=https://www.brainwareuniversity.ac.in/&screenshot=true&meta=false&embed=screenshot.url"
                      linkClassName="font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 no-underline"
                    >
                      Brainware University
                    </LinkPreview>
                    {', with a strong foundation in '}
                    <LinkPreview
                      url="https://www.python.org"
                      title="Python"
                      image="https://api.microlink.io/?url=https://www.python.org&screenshot=true&meta=false&embed=screenshot.url"
                      linkClassName="font-bold text-[var(--text)] no-underline hover:text-[var(--cyan)]"
                    >
                      Python
                    </LinkPreview>
                    {', '}
                    <span className="font-bold text-[var(--text)]">Data Science</span>
                    {', and '}
                    <span className="font-bold text-[var(--text)]">Computer Applications</span>.
                  </span>
                </li>

                <li className="flex items-start gap-3 text-sm md:text-base leading-relaxed text-[var(--text-dim)] font-normal">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--cyan)] shrink-0 shadow-[0_0_8px_var(--cyan)]" />
                  <span>
                    Completed{' '}
                    <LinkPreview
                      url="https://www.ibm.com/training/badge/data-science-foundations"
                      title="IBM Data Science Virtual Internship"
                      description="Hands-on virtual internship covering exploratory data analysis and Python analytics workflows."
                      image="https://api.microlink.io/?url=https://www.ibm.com/training&screenshot=true&meta=false&embed=screenshot.url"
                      linkClassName="font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 no-underline"
                    >
                      IBM Data Science Internship
                    </LinkPreview>{' '}
                    and{' '}
                    <LinkPreview
                      url="https://nptel.ac.in/courses/106/106/106106183/"
                      title="NPTEL Python for Data Science"
                      description="4-Week Certified Course covering scientific computing and data analytics."
                      image="https://api.microlink.io/?url=https://nptel.ac.in&screenshot=true&meta=false&embed=screenshot.url"
                      linkClassName="font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 no-underline"
                    >
                      NPTEL Data Science for Python
                    </LinkPreview>{' '}
                    course, with a passion for technology and continuous learning.
                  </span>
                </li>
              </ul>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 relative z-10 pt-2 border-t border-[var(--border2)]">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold dark:bg-emerald-500/10 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ✓ Open to Work
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold dark:bg-cyan-500/10 bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                ✓ Freelance
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold dark:bg-purple-500/10 bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                ✓ India
              </span>
            </div>
          </motion.div>

          {/* ── Skills card with LogoLoop Effect ── */}
          <motion.div
            onMouseEnter={() => setHovered(1)}
            onMouseLeave={() => setHovered(null)}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={cn(
              "transition-all duration-300 ease-out dark:bg-black/50 bg-white/80 dark:border-white/10 border-black/10 backdrop-blur-xl rounded-2xl shadow-xl p-5 md:p-6 w-full max-w-[960px] relative z-20 border overflow-hidden",
              hovered !== null && hovered !== 1 && "blur-[2px] scale-[0.98]"
            )}
            whileHover={{ translateY: -4 }}
          >
            <div style={{ position: 'absolute', bottom: -80, right: -80, width: 200, height: 200, background: '#a78bfa', filter: 'blur(100px)', opacity: 0.15, borderRadius: '50%', pointerEvents: 'none' }} />

            <div className="flex items-center justify-between mb-5 relative z-10">
              <h3 style={{ fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>
                Technical Skills & Stack
              </h3>
              <span className="text-[11px] dark:text-white/60 text-neutral-600 dark:bg-white/5 bg-black/5 px-2.5 py-1 rounded-full border dark:border-white/10 border-black/10 font-medium">
                Hover to pause • Click to explore
              </span>
            </div>

            {/* LogoLoop marquee tracks */}
            <div className="flex flex-col gap-3 py-1 relative z-10 overflow-hidden">
              {/* Top Loop: scrolling left */}
              <LogoLoop
                logos={techLogosRow1}
                speed={75}
                direction="left"
                logoHeight={46}
                gap={24}
                hoverSpeed={0}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="var(--bg)"
                ariaLabel="Frontend technologies"
              />

              {/* Bottom Loop: scrolling right */}
              <LogoLoop
                logos={techLogosRow2}
                speed={65}
                direction="right"
                logoHeight={46}
                gap={24}
                hoverSpeed={0}
                scaleOnHover={true}
                fadeOut={true}
                fadeOutColor="var(--bg)"
                ariaLabel="Backend and developer tools"
              />
            </div>
          </motion.div>
        </div>
      </BackgroundLines>
    </section>
  );
};

export default About;

