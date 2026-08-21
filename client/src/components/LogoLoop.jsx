import React, { useMemo } from 'react';
import './LogoLoop.css';

/**
 * LogoLoop - Smooth infinite marquee for tech stacks & logos
 * Compatible with React Bits @react-bits/LogoLoop-JS-CSS
 */
const LogoLoop = ({
  logos = [],
  speed = 80,
  direction = 'left',
  logoHeight = 50,
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = 'transparent',
  ariaLabel = 'Technology partners and skills',
  useCustomRender = false,
  renderItem,
  className = '',
  style = {},
}) => {
  const isVertical = direction === 'up' || direction === 'down';

  // Calculate duration based on speed and item count
  const duration = useMemo(() => {
    const baseCount = Math.max(logos.length, 4);
    // speed prop represents speed factor (higher number = faster or pixel/sec)
    const baseDuration = (baseCount * 800) / (speed || 80);
    return `${Math.max(baseDuration, 10)}s`;
  }, [logos.length, speed]);

  const heightVal = typeof logoHeight === 'number' ? `${logoHeight}px` : logoHeight;
  const gapVal = typeof gap === 'number' ? `${gap}px` : gap;

  const containerStyle = {
    '--logoloop-duration': duration,
    '--logoloop-gap': gapVal,
    '--logoloop-fade-color': fadeOutColor,
    '--logoloop-hover-state': hoverSpeed === 0 ? 'paused' : 'running',
    ...style,
  };

  const renderSingleLogo = (item, idx) => {
    if (useCustomRender && renderItem) {
      return (
        <div key={idx} className="logoloop-item">
          {renderItem(item, idx)}
        </div>
      );
    }

    if (!item) return null;

    // Direct React Element / Node
    if (React.isValidElement(item)) {
      return (
        <div key={idx} className="logoloop-item" style={{ height: heightVal }}>
          {item}
        </div>
      );
    }

    // Node object format: { node: <Icon />, title: "React", href: "https://...", color: "#..." }
    const content = (
      <div
        className="flex items-center gap-3 px-4 py-2 rounded-xl border dark:border-white/10 border-black/10 dark:bg-white/[0.04] bg-black/[0.03] backdrop-blur-md hover:dark:border-white/25 hover:border-black/20 hover:dark:bg-white/[0.09] hover:bg-black/[0.06] transition-all duration-300 shadow-sm group"
        style={{ height: heightVal }}
      >
        {item.node && (
          <span
            className="text-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
            style={{
              color: item.color || 'var(--cyan, #06b6d4)',
              filter: item.color && item.color !== 'var(--text)' && item.color !== '#ffffff' ? `drop-shadow(0 0 10px ${item.color}60)` : undefined,
            }}
          >
            {item.node}
          </span>
        )}

        {item.src && (
          <img
            src={item.src}
            alt={item.alt || item.title || 'Logo'}
            className="object-contain max-h-full"
            style={{ height: '70%', width: 'auto' }}
          />
        )}

        {item.title && (
          <span className="text-xs md:text-sm font-semibold dark:text-white/90 text-neutral-800 group-hover:text-black dark:group-hover:text-white transition-colors whitespace-nowrap">
            {item.title}
          </span>
        )}
      </div>
    );

    if (item.href) {
      return (
        <a
          key={idx}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="logoloop-item"
          title={item.title || item.alt}
          aria-label={item.title || item.alt}
        >
          {content}
        </a>
      );
    }

    return (
      <div key={idx} className="logoloop-item" title={item.title || item.alt}>
        {content}
      </div>
    );
  };

  // Duplicate items to ensure uninterrupted seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={`logoloop-container ${isVertical ? 'logoloop-vertical' : 'logoloop-horizontal'} ${
        scaleOnHover ? 'logoloop-scale-on-hover' : ''
      } ${className}`}
      style={containerStyle}
    >
      {fadeOut && <div className="logoloop-fade-overlay" aria-hidden="true" />}

      {/* Primary track */}
      <div className={`logoloop-track logoloop-track-${direction}`}>
        {duplicatedLogos.map((logo, idx) => renderSingleLogo(logo, `track1-${idx}`))}
      </div>

      {/* Cloned secondary track for continuous looping */}
      <div className={`logoloop-track logoloop-track-${direction}`} aria-hidden="true">
        {duplicatedLogos.map((logo, idx) => renderSingleLogo(logo, `track2-${idx}`))}
      </div>
    </div>
  );
};

export default LogoLoop;
