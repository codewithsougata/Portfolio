import React from 'react';
import { Timeline } from "./ui/timeline";
import { Meteors } from "./ui/meteors";

const Education = () => {
  const data = [
    {
      title: "2023 – 2026",
      content: (
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-2xl" />
          <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-xl border border-gray-800 bg-gray-900/90 px-3.5 py-6 shadow-xl">
            <div className="mb-2 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>
            <h1 className="relative z-50 mb-1.5 text-lg font-bold text-white">
              Bachelor of Computer Applications (BCA)
            </h1>
            <div className="relative z-50 flex flex-wrap items-center gap-1.5 mb-3">
              <span className="px-2 py-0.5 bg-[var(--surface2)] text-[var(--text)] text-[10px] md:text-xs font-medium rounded-full border border-[var(--border2)]">
                Brainware University
              </span>
              <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] md:text-xs font-medium rounded-full border border-purple-500/20">
                Ongoing
              </span>
            </div>
            <p className="relative z-50 mb-2 text-xs md:text-sm font-normal text-slate-500">
              Pursuing undergraduate degree in Computer Applications, focusing on software engineering, web development, and database management.
            </p>
            <Meteors number={12} />
          </div>
        </div>
      ),
    },
    {
      title: "Graduated 2023",
      content: (
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-2xl" />
          <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-xl border border-gray-800 bg-gray-900/90 px-3.5 py-6 shadow-xl">
            <div className="mb-2 flex h-4.5 w-4.5 items-center justify-center rounded-full border border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>
            <h1 className="relative z-50 mb-1.5 text-lg font-bold text-white">
              Higher Secondary Education
            </h1>
            <div className="relative z-50 flex flex-wrap items-center gap-1.5 mb-3">
              <span className="px-2 py-0.5 bg-[var(--surface2)] text-[var(--text)] text-[10px] md:text-xs font-medium rounded-full border border-[var(--border2)]">
                Chakbhabani M.K.N Vidyayatan
              </span>
              <span className="px-2 py-0.5 bg-[var(--surface2)] text-[var(--text)] text-[10px] md:text-xs font-medium rounded-full border border-[var(--border2)]">
                Completed
              </span>
            </div>
            <p className="relative z-50 mb-2 text-xs md:text-sm font-normal text-slate-500">
              Completed higher secondary education with a strong foundation in science and mathematics.
            </p>
            <Meteors number={12} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="education" className="w-full relative py-6 md:py-10">
      <div className="max-w-[960px] mx-auto px-6 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-3xl mb-2 text-[var(--text)] max-w-4xl font-bold">
          My <span className="text-[var(--cyan)]">Education</span>
        </h2>
      </div>

      <Timeline data={data} />
    </section>
  );
};

export default Education;
