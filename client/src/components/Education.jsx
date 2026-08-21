import React from 'react';
import { Timeline } from "./ui/timeline";
import { Meteors } from "./ui/meteors";
import { FileText, GraduationCap, School, Check } from 'lucide-react';
import marksheetPdf from '../assets/BWU_BCA_23_221_SOUGATA_MANNA web.pdf';

const Education = () => {
  const data = [
    {
      title: "2023 – 2026",
      content: (
        <div className="relative w-full max-w-[360px]">
          <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-xl border dark:border-white/15 border-black/10 dark:bg-black/60 bg-white/80 backdrop-blur-md p-4 md:p-5 shadow-xl transition-all duration-300 hover:dark:border-white/30 hover:border-black/20 group">
            {/* Top row with degree logo + marksheet logo only */}
            <div className="w-full flex items-center justify-between mb-2.5 z-10">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border dark:border-white/20 border-black/15 dark:bg-white/5 bg-black/5 dark:text-white text-neutral-800 shadow-sm">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>

              {/* Only logo for marksheet */}
              <a
                href={marksheetPdf}
                target="_blank"
                rel="noopener noreferrer"
                title="View Marksheet"
                aria-label="View Marksheet"
                className="flex h-7 w-7 items-center justify-center rounded-lg border dark:border-white/20 border-black/15 dark:bg-white/5 bg-black/5 dark:text-white/80 text-neutral-700 hover:text-black dark:hover:text-black hover:bg-neutral-200 dark:hover:bg-white transition-all duration-200 shadow-sm"
              >
                <FileText className="h-3.5 w-3.5" />
              </a>
            </div>

            <h3 className="relative z-10 mb-1.5 text-base md:text-[17px] font-bold dark:text-white text-neutral-900 tracking-tight leading-snug">
              Bachelor of Computer Applications (BCA)
            </h3>

            <div className="relative z-10 flex flex-wrap items-center gap-1.5 mb-2.5">
              <span className="px-2 py-0.5 dark:bg-white/5 bg-black/5 dark:text-white/90 text-neutral-800 text-[11px] font-medium rounded-full border dark:border-white/15 border-black/10">
                Brainware University
              </span>
              <span className="px-2 py-0.5 dark:bg-white/10 bg-black/10 dark:text-white text-neutral-900 text-[11px] font-medium rounded-full border dark:border-white/20 border-black/15 flex items-center gap-1">
                <Check className="h-2.5 w-2.5" /> Completed
              </span>
            </div>

            <p className="relative z-10 text-xs font-normal dark:text-white/60 text-neutral-600 leading-relaxed">
              Completed undergraduate degree in Computer Applications, specializing in full-stack web development, data structures, and software engineering principles.
            </p>

            <Meteors number={6} />
          </div>
        </div>
      ),
    },
    {
      title: "Graduated 2023",
      content: (
        <div className="relative w-full max-w-[360px]">
          <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-xl border dark:border-white/15 border-black/10 dark:bg-black/60 bg-white/80 backdrop-blur-md p-4 md:p-5 shadow-xl transition-all duration-300 hover:dark:border-white/30 hover:border-black/20 group">
            <div className="w-full flex items-center justify-between mb-2.5 z-10">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border dark:border-white/20 border-black/15 dark:bg-white/5 bg-black/5 dark:text-white text-neutral-800 shadow-sm">
                <School className="h-3.5 w-3.5" />
              </div>
            </div>

            <h3 className="relative z-10 mb-1.5 text-base md:text-[17px] font-bold dark:text-white text-neutral-900 tracking-tight leading-snug">
              Higher Secondary Education
            </h3>

            <div className="relative z-10 flex flex-wrap items-center gap-1.5 mb-2.5">
              <span className="px-2 py-0.5 dark:bg-white/5 bg-black/5 dark:text-white/90 text-neutral-800 text-[11px] font-medium rounded-full border dark:border-white/15 border-black/10">
                Chakbhabani M.K.N Vidyayatan
              </span>
              <span className="px-2 py-0.5 dark:bg-white/10 bg-black/10 dark:text-white text-neutral-900 text-[11px] font-medium rounded-full border dark:border-white/20 border-black/15 flex items-center gap-1">
                <Check className="h-2.5 w-2.5" /> Completed
              </span>
            </div>

            <p className="relative z-10 text-xs font-normal dark:text-white/60 text-neutral-600 leading-relaxed">
              Completed higher secondary education with a strong academic foundation in science, computer applications, and mathematics.
            </p>

            <Meteors number={6} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="education" className="w-full relative py-8 md:py-12 section-container">
      <div className="text-center mb-5">
        <h2 style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.85rem)', fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>
          My Education
        </h2>
        <div style={{ width: 40, height: 2, background: 'var(--text)', margin: '0 auto', borderRadius: 2, opacity: 0.8 }} />
      </div>

      <Timeline data={data} />
    </section>
  );
};

export default Education;



