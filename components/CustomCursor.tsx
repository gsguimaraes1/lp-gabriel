import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is touch or has a fine pointer (mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      setIsMobile(true);
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!cursor || !follower || !label) return;

    // Move cursor and follower
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Fast cursor dot
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Slower following ring
      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
    };

    // Hover states
    const onMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer');

      if (isLink) {
        gsap.to(follower, {
          scale: 3,
          backgroundColor: 'rgba(252, 190, 38, 0.2)',
          borderColor: '#FCBE26',
          duration: 0.3
        });
        gsap.to(cursor, {
          scale: 0,
          duration: 0.2
        });

        // Show text if available
        const hoverText = target.getAttribute('data-cursor-text');
        if (hoverText) {
          label.innerHTML = hoverText;
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
        }
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a') || target.closest('button') || target.classList.contains('cursor-pointer');

      if (isLink) {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(252, 190, 38, 0.5)',
          duration: 0.3
        });
        gsap.to(cursor, {
          scale: 1,
          duration: 0.2
        });
        gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout', onMouseLeave);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#FCBE26] rounded-full pointer-events-none z-[11000] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-[#FCBE26]/50 rounded-full pointer-events-none z-[10999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <div
          ref={labelRef}
          className="text-[8px] font-black uppercase tracking-tighter text-black opacity-0 scale-50"
        />
      </div>
    </>
  );
};

export default CustomCursor;
