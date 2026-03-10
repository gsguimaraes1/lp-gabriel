import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

const techLogos = [
  { src: "/assets/google.png", alt: "Google Ads" },
  { src: "/assets/meta.png", alt: "Meta Ads" },
  { src: "/assets/wordpress.png", alt: "WordPress" },
  { src: "/assets/gtm.png", alt: "GTM" },
  { src: "/assets/analytics.png", alt: "GA4" },
  { src: "/assets/n8n.png", alt: "n8n" },
  { src: "/assets/powerbi.png", alt: "Power BI" },
  { src: "/assets/react.png", alt: "React" },
];

const COLLISION_RADIUS = 40;
const DAMPING = 0.98;
const ELASTICITY = 0.6;

const FloatingTechOrb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use a ref to store physics state to avoid re-renders at 60fps
  const itemsRef = useRef(techLogos.map((logo, i) => {
    const angle = (i / techLogos.length) * Math.PI * 2;
    return {
      ...logo,
      id: i,
      x: Math.cos(angle) * 100,
      y: Math.sin(angle) * 70,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      dragging: false,
      lastX: 0,
      lastY: 0,
      motionX: useMotionValue(0),
      motionY: useMotionValue(0),
    };
  }));

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setDimensions({
          width: width,
          height: containerRef.current.offsetHeight,
        });
        setIsMobile(width < 768);
        setIsReady(true);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useAnimationFrame(() => {
    if (!isReady) return;

    const items = itemsRef.current;
    const halfW = dimensions.width / 2;
    const halfH = dimensions.height / 2;
    const dynamicRadius = isMobile ? 35 : COLLISION_RADIUS;

    // 1. Update Physics
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.dragging) {
        item.vx = (item.motionX.get() - item.lastX) * 0.4;
        item.vy = (item.motionY.get() - item.lastY) * 0.4;
        item.lastX = item.motionX.get();
        item.lastY = item.motionY.get();
        item.x = item.motionX.get();
        item.y = item.motionY.get();
        continue;
      }

      item.x += item.vx;
      item.y += item.vy;

      // item.vx *= DAMPING; // Disabled to keep them moving
      // item.vy *= DAMPING; // Disabled to keep them moving

      // Repelling Core (Smooth Anti-Gravity)
      const distToCenter = Math.sqrt(item.x * item.x + item.y * item.y) || 1;
      const coreSafeRadius = isMobile ? 80 : 140;

      if (distToCenter < coreSafeRadius) {
        const force = (1 - distToCenter / coreSafeRadius) * 0.08;
        // Apply force vector pointing AWAY from center
        item.vx += (item.x / distToCenter) * force;
        item.vy += (item.y / distToCenter) * force;
      }

      // Gentle floating drift (Keep them alive)
      item.vx += (Math.random() - 0.5) * 0.03;
      item.vy += (Math.random() - 0.5) * 0.03;

      // Speed limit (Avoid hyper-speed)
      const speed = Math.sqrt(item.vx * item.vx + item.vy * item.vy) || 1;
      const maxSpeed = isMobile ? 1.2 : 2.0;
      if (speed > maxSpeed) {
        item.vx = (item.vx / speed) * maxSpeed;
        item.vy = (item.vy / speed) * maxSpeed;
      }

      // Speed floor (Avoid stopping completely)
      const minSpeed = isMobile ? 0.2 : 0.4;
      if (speed < minSpeed) {
        item.vx = (item.vx / speed) * minSpeed;
        item.vy = (item.vy / speed) * minSpeed;
      }

      // Wall collisions (Increased margins to concentrate items)
      const margin = isMobile ? 60 : 120;
      if (Math.abs(item.x) > halfW - margin) {
        item.vx *= -1;
        item.x = Math.sign(item.x) * (halfW - margin);
      }
      if (Math.abs(item.y) > halfH - margin) {
        item.vy *= -1;
        item.y = Math.sign(item.y) * (halfH - margin);
      }
    }

    // 2. Pairwise Collisions
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDist = dynamicRadius * 2;

        if (dist < minDist) {
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          if (!a.dragging) {
            a.x -= nx * overlap * 0.5;
            a.y -= ny * overlap * 0.5;
          }
          if (!b.dragging) {
            b.x += nx * overlap * 0.5;
            b.y += ny * overlap * 0.5;
          }

          const rvx = b.vx - a.vx;
          const rvy = b.vy - a.vy;
          const velAlongNormal = rvx * nx + rvy * ny;

          if (velAlongNormal < 0) {
            const impulse = -(1 + ELASTICITY) * velAlongNormal;
            const jImp = impulse / 2;
            const impulseX = jImp * nx;
            const impulseY = jImp * ny;

            if (!a.dragging) {
              a.vx -= impulseX;
              a.vy -= impulseY;
            }
            if (!b.dragging) {
              b.vx += impulseX;
              b.vy += impulseY;
            }
          }
        }
      }
    }

    // 3. Update MotionValues
    for (const item of items) {
      if (!item.dragging) {
        item.motionX.set(item.x);
        item.motionY.set(item.y);
      }
    }
  });

  return (
    <div className="relative w-full h-[350px] md:h-[500px] lg:h-[650px] flex items-center justify-center overflow-hidden select-none touch-none">
      <div
        ref={containerRef}
        className="absolute w-full h-full max-w-[1200px] pointer-events-none"
      />

      {/* Central Core */}
      <div className="relative z-10 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#FCBE26] blur-[70px] md:blur-[110px] opacity-10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Animated Scanning Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 md:w-64 md:h-64 border border-[#FCBE26]/10 rounded-full"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FCBE26]/20 blur-sm rounded-full" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-48 h-48 md:w-72 md:h-72 border border-[#FCBE26]/5 rounded-full"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FCBE26]/20 blur-sm rounded-full" />
        </motion.div>

        <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-black/40 border border-[#FCBE26]/20 backdrop-blur-md flex items-center justify-center shadow-[inset_0_0_20px_rgba(252,190,38,0.1)]">
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#FCBE26] shadow-[0_0_20px_#FCBE26]"
          />
        </div>
      </div>

      {/* Interactive Icons Container */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        {techLogos.map((logo, index) => {
          const item = itemsRef.current[index];

          return (
            <motion.div
              key={index}
              drag
              dragMomentum={false}
              dragConstraints={containerRef}
              style={{
                x: item.motionX,
                y: item.motionY,
                position: 'absolute',
                touchAction: 'none' // Crucial for mobile performance
              }}
              onDragStart={() => {
                item.dragging = true;
                item.lastX = item.motionX.get();
                item.lastY = item.motionY.get();
              }}
              onDragEnd={() => {
                item.dragging = false;
              }}
              className="cursor-grab active:cursor-grabbing pointer-events-auto"
            >
              <div className="relative p-2 md:p-4 group">
                <motion.div
                  whileHover={{ scale: isMobile ? 1.05 : 1.15 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-10 h-10 md:w-16 lg:w-20 flex items-center justify-center">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      draggable="false"
                      className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(252,190,38,0.4)] transition-all pointer-events-none"
                    />
                  </div>
                  <span className="text-[9px] md:text-[11px] font-medium text-[#FCBE26] whitespace-nowrap drop-shadow-md">
                    {logo.alt}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subtle Ambient Particles */}
      {!isMobile && [...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#FCBE26] rounded-full opacity-10"
          animate={{
            x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
            y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
            opacity: [0, 0.2, 0],
          }}
          transition={{ duration: 8 + Math.random() * 4, repeat: Infinity }}
        />
      ))}
    </div>
  );
};

export default FloatingTechOrb;