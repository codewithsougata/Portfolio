"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20 relative z-10">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center shadow-2xl border border-white/10"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-3xl font-bold text-[var(--text)] mb-2">
              {testimonials[active].name}
            </h3>
            <p className="text-sm font-medium text-cyan-400 opacity-80 uppercase tracking-widest">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-[var(--text-dim)] mt-8 leading-relaxed">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
            
            <div className="mt-8 flex gap-4">
               {testimonials[active].github && (
                 <a 
                   href={testimonials[active].github} 
                   target="_blank" 
                   rel="noreferrer"
                   className="btn-3d"
                   style={{ padding: '8px 20px', fontSize: '0.875rem' }}
                 >
                   Code
                 </a>
               )}
               {testimonials[active].live && (
                 <a 
                   href={testimonials[active].live} 
                   target="_blank" 
                   rel="noreferrer"
                   className="btn-3d-secondary"
                   style={{ padding: '8px 20px', fontSize: '0.875rem' }}
                 >
                   Live Demo
                 </a>
               )}
            </div>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full bg-[var(--surface2)] backdrop-blur-md flex items-center justify-center group/button border border-[var(--border)] hover:border-cyan-500/50 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5 text-[var(--text-dim)] group-hover/button:text-cyan-400 group-hover/button:scale-110 transition-all duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full bg-[var(--surface2)] backdrop-blur-md flex items-center justify-center group/button border border-[var(--border)] hover:border-cyan-500/50 transition-all duration-300"
            >
              <ArrowRight className="h-5 w-5 text-[var(--text-dim)] group-hover/button:text-cyan-400 group-hover/button:scale-110 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
