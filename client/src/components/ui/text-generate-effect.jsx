"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate();
  const [animKey, setAnimKey] = useState(0);
  let wordsArray = words.split(" ");

  // Re-trigger animation on theme change
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setAnimKey((prev) => prev + 1);
    });
    observer.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!scope.current) return;
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.08),
      }
    );
  }, [scope.current, animKey]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} style={{ wordSpacing: 'normal' }}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx + animKey}
              className="opacity-0 transition-colors duration-300 ease-in-out"
              style={{
                display: 'inline',
                filter: filter ? "blur(10px)" : "none",
                whiteSpace: 'pre-wrap',
              }}
            >
              {word + " "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-normal", className)}>
      <div className="leading-snug tracking-wide">
        {renderWords()}
      </div>
    </div>
  );
};
