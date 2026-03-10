import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const GitHubSnake = () => {
  return (
    <section className="section-container">
      <motion.h2
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
         <span className="text-indigo-500 font-mono">#</span> Activity
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        <motion.div
          className="dev-card p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-4">
             <Activity size={18} className="text-green-500" />
             <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">github-contributions</span>
          </div>
          
          <div className="relative rounded-lg overflow-hidden bg-white dark:bg-[#0d1117] border border-slate-200 dark:border-slate-800 p-2 md:p-4">
            {/* The image src here will naturally adapt better if it has a transparent background, but GitHub snake usually has a set bg. We'll use the generator link as is but wrap it cleanly. */}
            <img
              src="https://raw.githubusercontent.com/sougatamanna/sougatamanna/output/github-contribution-grid-snake.svg"
              alt="GitHub contribution snake animation"
              className="w-full mix-blend-multiply dark:mix-blend-screen opacity-90"
              onError={(e) => {
                // Fallback if their specific username snake isn't generated
                e.target.src = "https://profile-readme-generator.com/assets/snake.svg";
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubSnake;
