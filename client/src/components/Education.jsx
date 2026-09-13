import React from 'react';
import { Timeline } from "./ui/timeline";
import { Meteors } from "./ui/meteors";
import { FileText, GraduationCap, School, Check, ExternalLink, Award } from 'lucide-react';
import marksheetPdf from '../assets/marksheet.pdf';

const Education = () => {
  const data = [
    {
      title: "2023 – 2026",
      content: (
        <div className="relative w-full max-w-[420px]">
          <div className="relative flex flex-col items-start justify-end h-full p-5 overflow-hidden transition-all duration-300 border shadow-xl rounded-2xl dark:border-cyan-500/20 border-cyan-600/20 dark:bg-gradient-to-br dark:from-neutral-900/90 dark:to-neutral-950/90 bg-white/90 backdrop-blur-md hover:shadow-cyan-500/10 hover:border-cyan-500/40 group">
            {/* Top row with degree icon + View Marksheet button */}
            <div className="w-full flex items-center justify-between gap-2 mb-3.5 z-10">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center rounded-xl shadow-sm h-9 w-9 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan-600 dark:text-cyan-400">
                    Undergraduate Degree
                  </span>
                </div>
              </div>

              {/* View Marksheet Action Button */}
              <a
                href={marksheetPdf}
                target="_blank"
                rel="noopener noreferrer"
                title="View Marksheet (PDF)"
                aria-label="View Marksheet PDF"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 bg-cyan-500/15 hover:bg-cyan-500 text-cyan-700 dark:text-cyan-300 hover:text-white dark:hover:text-black border border-cyan-500/30 hover:border-cyan-500 shadow-sm active:scale-95"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View Marksheet</span>
                <ExternalLink className="h-3 w-3 opacity-70" />
              </a>
            </div>

            <h3 className="relative z-10 mb-2 text-base md:text-lg font-bold dark:text-white text-neutral-900 tracking-tight leading-snug">
              Bachelor of Computer Applications (BCA)
            </h3>

            <div className="relative z-10 flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-cyan-500/10 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 text-xs font-medium rounded-md border border-cyan-500/20 flex items-center gap-1">
                <Award className="h-3 w-3 text-cyan-500" />
                Brainware University
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-md border border-emerald-500/20 flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-500" /> Pursuing / 2023-2026
              </span>
            </div>

            <p className="relative z-10 text-xs md:text-sm font-normal leading-relaxed dark:text-neutral-300 text-neutral-600">
              Pursuing undergraduate degree in Computer Applications, specializing in full-stack web development, data structures, algorithm design, and modern software engineering practices.
            </p>

            <Meteors number={6} />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="relative w-full max-w-[420px]">
          <div className="relative flex flex-col items-start justify-end h-full p-5 overflow-hidden transition-all duration-300 border shadow-xl rounded-2xl dark:border-indigo-500/20 border-indigo-600/20 dark:bg-gradient-to-br dark:from-neutral-900/90 dark:to-neutral-950/90 bg-white/90 backdrop-blur-md hover:shadow-indigo-500/10 hover:border-indigo-500/40 group">
            <div className="w-full flex items-center justify-between gap-2 mb-3.5 z-10">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center rounded-xl shadow-sm h-9 w-9 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  <School className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
                    High School
                  </span>
                </div>
              </div>
            </div>

            <h3 className="relative z-10 mb-2 text-base md:text-lg font-bold dark:text-white text-neutral-900 tracking-tight leading-snug">
              Higher Secondary Education (10+2)
            </h3>

            <div className="relative z-10 flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 text-xs font-medium rounded-md border border-indigo-500/20">
                Chakbhabani M.K.N Vidyayatan
              </span>
              <span className="px-2.5 py-1 bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-md border border-emerald-500/20 flex items-center gap-1">
                <Check className="h-3 w-3 text-emerald-500" /> Completed
              </span>
            </div>

            <p className="relative z-10 text-xs md:text-sm font-normal leading-relaxed dark:text-neutral-300 text-neutral-600">
              Completed higher secondary education with a strong academic foundation in science, computer science, and mathematics.
            </p>

            <Meteors number={6} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="education" className="relative w-full py-12 md:py-16 section-container">
      <div className="mb-8 text-center">
        <h2 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>
          My Education
        </h2>
        <div style={{ width: 40, height: 2, background: 'var(--cyan, #00d4ff)', margin: '0 auto', borderRadius: 2, opacity: 0.9 }} />
      </div>

      <Timeline data={data} />
    </section>
  );
};

export default Education;