import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let isPointer = false;
    let isClicked = false;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target) {
        isPointer = !!target.closest('a, button, [role="button"], input, select, textarea');
      }
    };

    const handleMouseDown = () => { isClicked = true; };
    const handleMouseUp = () => { isClicked = false; };

    const render = () => {
      const scale = isClicked ? 0.8 : isPointer ? 1.4 : 1;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full hidden md:block w-7 h-7 border border-purple-500/40 bg-purple-500/10"
        style={{ willChange: 'transform' }}
      />
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full bg-purple-400 hidden md:block w-1.5 h-1.5"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};


