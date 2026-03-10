import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const techLogos = [
    { src: "/assets/google.png", alt: "Google Ads" },
    { src: "/assets/meta.png", alt: "Meta Ads" },
    { src: "/assets/wordpress.png", alt: "WordPress" },
    { src: "/assets/gtm.png", alt: "Google Tag Manager" },
    { src: "/assets/analytics.png", alt: "GA4" },
    { src: "/assets/n8n.png", alt: "n8n" },
    { src: "/assets/powerbi.png", alt: "Power BI" },
    { src: "/assets/react.png", alt: "React" },
];

const OrbitingTechIcons: React.FC = () => {
    const orbits = useMemo(() => [
        { radius: 100, speed: 20, items: techLogos.slice(0, 3) },
        { radius: 180, speed: 35, items: techLogos.slice(3, 6) },
        { radius: 260, speed: 50, items: techLogos.slice(6, 8) },
    ], []);

    return (
        <div className="relative w-full h-[350px] md:h-[500px] lg:h-[650px] flex items-center justify-center overflow-hidden select-none">
            {/* Central Tech Core with Pulsing Glow */}
            <div className="relative z-10 flex items-center justify-center">
                <motion.div
                    className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#FCBE26] blur-[70px] md:blur-[110px] opacity-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-black/40 border border-[#FCBE26]/30 backdrop-blur-md flex items-center justify-center shadow-[inset_0_0_20px_rgba(252,190,38,0.2)]">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#FCBE26] shadow-[0_0_30px_#FCBE26]"
                    />
                </div>
            </div>

            {/* Orbit Rings and Icons */}
            {orbits.map((orbit, orbitIdx) => (
                <React.Fragment key={orbitIdx}>
                    {/* Visual Orbit Ring */}
                    <div
                        className="absolute border border-white/5 rounded-full pointer-events-none"
                        style={{
                            width: orbit.radius * 2,
                            height: orbit.radius * 2,
                        }}
                    />

                    {/* Rotating Container for Icons */}
                    <motion.div
                        className="absolute flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: orbit.speed,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            width: orbit.radius * 2,
                            height: orbit.radius * 2,
                        }}
                    >
                        {orbit.items.map((logo, itemIdx) => {
                            const angle = (itemIdx / orbit.items.length) * 360;
                            return (
                                <div
                                    key={itemIdx}
                                    className="absolute"
                                    style={{
                                        transform: `rotate(${angle}deg) translate(${orbit.radius}px) rotate(-${angle}deg)`,
                                    }}
                                >
                                    {/* Counter-rotation to keep icons upright */}
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{
                                            duration: orbit.speed,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="flex flex-col items-center gap-2 group"
                                    >
                                        <div className="w-10 h-10 md:w-16 lg:w-20 p-2 flex items-center justify-center bg-black/40 border border-white/10 rounded-2xl backdrop-blur-sm group-hover:border-[#FCBE26]/50 group-hover:shadow-[0_0_20px_rgba(252,190,38,0.3)] transition-all duration-300">
                                            <img
                                                src={logo.src}
                                                alt={logo.alt}
                                                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(252,190,38,0.2)]"
                                            />
                                        </div>
                                        <span className="hidden md:block text-[9px] font-black uppercase tracking-[0.15em] text-[#FCBE26] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                            {logo.alt}
                                        </span>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                </React.Fragment>
            ))}
        </div>
    );
};

export default OrbitingTechIcons;
