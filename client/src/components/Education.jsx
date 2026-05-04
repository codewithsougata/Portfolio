import React from 'react';
import { Timeline } from "./ui/timeline";
import { Meteors } from "./ui/meteors";

const Education = () => {
  const data = [
    {
      title: "2023 – 2026",
      content: (
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
          <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
            <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>
            <h1 className="relative z-50 mb-2 text-xl font-bold text-white">
              Bachelor of Computer Applications (BCA)
            </h1>
            <div className="relative z-50 flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[var(--surface2)] text-[var(--text)] text-xs md:text-sm font-medium rounded-full border border-[var(--border2)]">
                Brainware University
              </span>
              <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs md:text-sm font-medium rounded-full border border-purple-500/20">
                Ongoing
              </span>
            </div>
            <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
              Pursuing undergraduate degree in Computer Applications, focusing on software engineering, web development, and database management.
            </p>
            <Meteors number={20} />
          </div>
        </div>
      ),
    },
    {
      title: "Graduated 2023",
      content: (
        <div className="relative w-full max-w-xl">
          <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
          <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 px-4 py-8 shadow-xl">
            <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-2 w-2 text-gray-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
              </svg>
            </div>
            <h1 className="relative z-50 mb-2 text-xl font-bold text-white">
              Higher Secondary Education
            </h1>
            <div className="relative z-50 flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[var(--surface2)] text-[var(--text)] text-xs md:text-sm font-medium rounded-full border border-[var(--border2)]">
                Chakbhabani MKN Vidyayatan
              </span>
              <span className="px-3 py-1 bg-[var(--surface2)] text-[var(--text)] text-xs md:text-sm font-medium rounded-full border border-[var(--border2)]">
                Completed
              </span>
            </div>
            <p className="relative z-50 mb-4 text-base font-normal text-slate-500">
              Completed higher secondary education with a strong foundation in science and mathematics.
            </p>
            <Meteors number={20} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="education" className="w-full relative py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl font-bold">
          My <span className="text-[var(--text)]">Education</span>
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-2xl">
          My academic journey and educational qualifications.
        </p>
      </div>

      <Timeline data={data} />
    </section>
  );
};

export default Education;
