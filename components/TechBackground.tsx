import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const TechBackground: React.FC = () => {
    // Generate random particles for a subtle "digital dust" effect
    const particles = useMemo(() => {
        return [...Array(20)].map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Dynamic Radial Glows (Nebula Effect) */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: ['-10%', '10%', '-10%'],
                    y: ['-10%', '10%', '-10%'],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#FCBE26]/5 blur-[120px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#FCBE26]/5 blur-[100px] rounded-full"
            />

            {/* Floating Digital Dust */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-[#FCBE26]/20"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.4, 0],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Horizontal & Vertical Scanning Lines (Subtle) */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div className="h-full w-px bg-white absolute left-1/4 animate-pulse" />
                <div className="h-full w-px bg-white absolute left-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="h-full w-px bg-white absolute left-3/4 animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="w-full h-px bg-white absolute top-1/4 animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="w-full h-px bg-white absolute top-1/2 animate-pulse" style={{ animationDelay: '2.5s' }} />
                <div className="w-full h-px bg-white absolute top-3/4 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
        </div>
    );
};

export default TechBackground;
