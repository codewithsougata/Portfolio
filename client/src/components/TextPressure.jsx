// Component ported and enhanced from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const TextPressure = ({
  text = 'Thank you',
  fontFamily = "'Roboto Flex', system-ui, sans-serif",
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = 'var(--text, #FFFFFF)',
  strokeColor = '#00d4ff',
  strokeWidth = 2,
  className = '',

  minFontSize = 24
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const isInteractingRef = useRef(false);
  const lastInteractionTimeRef = useRef(0);

  const [fontSize, setFontSize] = useState(minFontSize);

  const chars = useMemo(() => text.split(''), [text]);

  // Handle pointer & touch events
  useEffect(() => {
    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      isInteractingRef.current = true;
      lastInteractionTimeRef.current = Date.now();
    };

    const handleTouchMove = e => {
      if (e.touches && e.touches[0]) {
        cursorRef.current.x = e.touches[0].clientX;
        cursorRef.current.y = e.touches[0].clientY;
        isInteractingRef.current = true;
        lastInteractionTimeRef.current = Date.now();
      }
    };

    const handleTouchStart = e => {
      if (e.touches && e.touches[0]) {
        cursorRef.current.x = e.touches[0].clientX;
        cursorRef.current.y = e.touches[0].clientY;
        mouseRef.current.x = cursorRef.current.x;
        mouseRef.current.y = cursorRef.current.y;
        isInteractingRef.current = true;
        lastInteractionTimeRef.current = Date.now();
      }
    };

    const handleTouchEnd = () => {
      lastInteractionTimeRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Compute responsive font size that perfectly fits the container on mobile and desktop
  const setSize = useCallback(() => {
    if (!containerRef.current) return;

    const containerW = containerRef.current.getBoundingClientRect().width;
    if (!containerW || containerW <= 0) return;

    // Available safe width with 8% safe margins
    const safeW = containerW * 0.92;
    // In Roboto Flex at wdth 110, char width is ~0.62 * fontSize
    let calculated = safeW / (chars.length * 0.62);
    // Clamp to prevent overflow on mobile and oversized text on desktop
    calculated = Math.max(minFontSize, Math.min(calculated, 115));

    setFontSize(Math.round(calculated));
  }, [chars.length, minFontSize]);

  useEffect(() => {
    setSize();
    const onResize = () => setSize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setSize]);

  // Dynamic Variable Font Animation (Interactive + Idle Breathing Wave)
  useEffect(() => {
    let rafId;

    const animate = () => {
      const now = Date.now();
      // If no pointer interaction in last 2.5s, fall back to smooth wave animation
      const isActivelyInteracting = isInteractingRef.current && (now - lastInteractionTimeRef.current < 2500);

      // Smooth lerp towards cursor
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 12;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 12;

      const titleEl = titleRef.current;
      const titleRect = titleEl ? titleEl.getBoundingClientRect() : null;
      const maxDist = titleRect ? Math.max(titleRect.width / 2, 140) : 200;

      const time = now * 0.0025;

      spansRef.current.forEach((span, i) => {
        if (!span) return;

        let wght = 700;
        let wdth = 105;
        let italVal = 0;
        let alphaVal = 1;

        if (isActivelyInteracting) {
          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);
          const ratio = Math.max(0, 1 - d / maxDist);

          // Variable font boundaries safe for Roboto Flex (wdth: 25..151, wght: 100..1000)
          wdth = width ? Math.round(85 + ratio * 55) : 100;     // 85 to 140
          wght = weight ? Math.round(400 + ratio * 500) : 700;  // 400 to 900
          italVal = italic ? (ratio * 0.8).toFixed(2) : 0;
          alphaVal = alpha ? Math.max(0.3, ratio).toFixed(2) : 1;
        } else {
          // Subtle elegant breathing wave when idle / on mobile
          const wave = (Math.sin(time + i * 0.55) + 1) / 2; // 0 to 1
          wdth = width ? Math.round(92 + wave * 38) : 105;     // 92 to 130
          wght = weight ? Math.round(500 + wave * 380) : 700;  // 500 to 880
          italVal = italic ? (wave * 0.35).toFixed(2) : 0;
          alphaVal = alpha ? (0.7 + wave * 0.3).toFixed(2) : 1;
        }

        const newFontVariation = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        if (span.style.fontVariationSettings !== newFontVariation) {
          span.style.fontVariationSettings = newFontVariation;
        }
        if (alpha && span.style.opacity !== String(alphaVal)) {
          span.style.opacity = alphaVal;
        }
      });

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleElement = useMemo(() => {
    return (
      <style>{`
        @import url('${fontUrl}');
        .text-pressure-span {
          display: inline-block;
          will-change: font-variation-settings;
          transition: color 0.2s ease;
        }
        .text-pressure-title.stroke span {
          position: relative;
          color: ${textColor};
        }
        .text-pressure-title.stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: ${strokeWidth}px;
          -webkit-text-stroke-color: ${strokeColor};
        }
      `}</style>
    );
  }, [fontUrl, textColor, strokeColor, strokeWidth]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-visible bg-transparent select-none"
    >
      {styleElement}
      <h1
        ref={titleRef}
        className={`text-pressure-title ${className} ${
          flex ? 'flex justify-between items-center w-full' : 'inline-block'
        } ${stroke ? 'stroke' : ''} uppercase text-center leading-none`}
        style={{
          fontFamily,
          fontSize: `${fontSize}px`,
          margin: 0,
          fontWeight: 700,
          color: stroke ? undefined : textColor,
          letterSpacing: '0.02em',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="text-pressure-span"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;

