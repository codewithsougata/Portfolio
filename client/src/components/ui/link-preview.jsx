import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export const LinkPreview = ({
  url,
  title,
  description,
  image,
  children,
  className = '',
  linkClassName = '',
  width = 240,
  height = 140,
  placement = 'top', // 'top' | 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const imageSrc =
    image ||
    `https://api.microlink.io/?url=${encodeURIComponent(
      url
    )}&screenshot=true&meta=false&embed=screenshot.url`;

  const positionStyle =
    placement === 'right'
      ? {
          position: 'absolute',
          left: 'calc(100% + 12px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 99999,
        }
      : {
          position: 'absolute',
          bottom: 'calc(100% + 10px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 99999,
        };

  const motionProps =
    placement === 'right'
      ? {
          initial: { opacity: 0, x: -8, scale: 0.95 },
          animate: { opacity: 1, x: 0, scale: 1 },
          exit: { opacity: 0, x: -6, scale: 0.95 },
        }
      : {
          initial: { opacity: 0, y: 8, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 6, scale: 0.95 },
        };

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-0.5 no-underline transition-opacity hover:opacity-80 ${linkClassName}`}
      >
        {children}
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...motionProps}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{
              ...positionStyle,
              width: `${width}px`,
            }}
            className="overflow-hidden rounded-xl border border-white/20 dark:border-white/20 border-black/15 bg-black/95 dark:bg-black/95 p-1 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl pointer-events-none z-[99999]"
          >
            <div
              className="relative w-full overflow-hidden rounded-lg bg-neutral-900 flex items-center justify-center"
              style={{ height: `${height}px` }}
            >
              <img
                src={imageSrc}
                alt={title || 'Preview'}
                className="h-full w-full object-cover rounded-lg"
                loading="eager"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};
