import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e) => {
      const t = e.target;
      const isInteractive =
        t.tagName.toLowerCase() === 'a' ||
        t.tagName.toLowerCase() === 'button' ||
        t.closest('a') ||
        t.closest('button');
      if (ringRef.current) {
        if (isInteractive) ringRef.current.classList.add('hovered');
        else ringRef.current.classList.remove('hovered');
      }
    };

    const animateCursor = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        const ring = ringRef.current;
        const halfW = ring.offsetWidth / 2;
        const halfH = ring.offsetHeight / 2;
        ring.style.transform = `translate(${ringPos.current.x - halfW}px, ${ringPos.current.y - halfH}px)`;
      }
      raf.current = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    raf.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
};

export default CustomCursor;
