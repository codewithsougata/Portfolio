import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const VARIANTS = {
  solid:
    "bg-black text-white shadow-lg hover:shadow-xl border border-black/20 dark:bg-white dark:text-black dark:border-white/20 dark:hover:bg-white/90",

  outline:
    "border-2 border-black/80 text-black hover:bg-black/5 dark:border-white/80 dark:text-white dark:hover:bg-white/5",

  ghost:
    "text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/5",

  slate:
    "bg-slate-900 text-white shadow-lg hover:shadow-xl border border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",

  zinc:
    "bg-zinc-900 text-white shadow-lg hover:shadow-xl border border-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",

  love:
    "bg-rose-950 text-white shadow-lg hover:shadow-xl border border-rose-900 dark:bg-rose-100 dark:text-rose-950 dark:hover:bg-rose-200",

  accent:
    "bg-neutral-900 text-white shadow-lg hover:shadow-xl border border-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm h-8",
  md: "px-5 py-2.5 text-sm h-10",
  lg: "px-7 py-3.5 text-base h-12",
  xl: "px-9 py-4 text-lg h-14",
};

const LoveParticle = ({ delay }) => {
  const randomX = (Math.random() - 0.5) * 60;
  
  return (
    <Motion.div
      initial={{ y: 0, opacity: 0, scale: 0, x: randomX }}
      animate={{
        y: -100,
        opacity: [0, 0.8, 0.8, 0],
        scale: [0, 1, 1, 0.8],
      }}
      transition={{
        duration: 2.5,
        delay,
        ease: "easeOut",
      }}
      className="absolute bottom-0 pointer-events-none"
    >
      <Heart className="w-4 h-4 text-rose-400 stroke-2" strokeWidth={2} />
    </Motion.div>
  );
};

const SparkleParticle = ({ delay }) => {
  const randomX = (Math.random() - 0.5) * 70;
  const randomY = (Math.random() - 0.5) * 30;
  
  return (
    <Motion.div
      initial={{ scale: 0, opacity: 0, x: randomX, y: randomY }}
      animate={{
        scale: [0, 1.2, 0],
        opacity: [0, 0.8, 0],
        y: randomY - 60,
      }}
      transition={{
        duration: 2,
        delay,
        ease: "easeOut",
      }}
      className="absolute top-1/2 left-1/2 pointer-events-none"
    >
      <Sparkles className="w-3 h-3 opacity-70" />
    </Motion.div>
  );
};

const DotParticle = ({ delay }) => {
  const randomX = (Math.random() - 0.5) * 60;
  
  return (
    <Motion.div
      initial={{ scale: 0, opacity: 0, x: randomX, y: 0 }}
      animate={{
        scale: [0, 1, 0],
        opacity: [0, 0.7, 0],
        y: -80,
      }}
      transition={{
        duration: 2,
        delay,
        ease: "easeOut",
      }}
      className="absolute bottom-0 left-1/2 pointer-events-none w-1.5 h-1.5 bg-current opacity-70 rounded-full"
    />
  );
};

export default function Button({
  children,
  variant = "solid",
  size = "md",
  icon = null,
  className = "",
  motion: useMotion = true,
  full = false,
  effect = null, // 'love', 'sparkle', 'dots'
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState([]);
  const [particleCounter, setParticleCounter] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isHovered && effect) {
      // Initial burst
      const initialParticles = Array.from({ length: effect === 'love' ? 4 : 3 }, (_, i) => ({
        id: Date.now() + i,
        delay: i * 0.15,
      }));
      setParticles(initialParticles);

      // Continuous particles while hovering
      intervalId = setInterval(() => {
        setParticleCounter(prev => prev + 1);
        const newParticle = {
          id: Date.now() + Math.random(),
          delay: 0,
        };
        setParticles(prev => [...prev, newParticle]);
      }, effect === 'love' ? 400 : 500);
    } else {
      setParticles([]);
      setParticleCounter(0);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, effect]);

  // Clean up old particles
  useEffect(() => {
    if (particles.length > 15) {
      setParticles(prev => prev.slice(-15));
    }
  }, [particles.length]);

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none overflow-hidden",
    VARIANTS[variant],
    SIZES[size],
    full ? "w-full" : "",
    className
  );

  const MotionButton = useMotion ? Motion.button : "button";

  const hoverAnimation = useMotion
    ? {
        y: -1,
      }
    : undefined;

  const tapAnimation = useMotion
    ? {
        y: 0,
        scale: 0.98,
      }
    : undefined;

  return (
    <MotionButton
      {...props}
      className={classes}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
    >
      {/* Subtle shimmer on hover */}
      <Motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-md"
        animate={
          isHovered
            ? {
                backgroundPosition: ["0% 0%", "200% 0%"],
              }
            : {}
        }
        transition={{
          duration: 1.5,
          ease: "linear",
          repeat: isHovered ? Infinity : 0,
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          opacity: isHovered ? 0.15 : 0,
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon ? <span className="text-lg">{icon}</span> : null}
      </span>

      {/* Particles */}
      <AnimatePresence>
        {effect === "love" &&
          particles.map((particle) => (
            <LoveParticle
              key={particle.id}
              delay={particle.delay}
            />
          ))}
        {effect === "sparkle" &&
          particles.map((particle) => (
            <SparkleParticle
              key={particle.id}
              delay={particle.delay}
            />
          ))}
        {effect === "dots" &&
          particles.map((particle) => (
            <DotParticle
              key={particle.id}
              delay={particle.delay}
            />
          ))}
      </AnimatePresence>
    </MotionButton>
  );
}
