import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const duration = 2000; // 2 segundos como solicitado

        const updateProgress = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const currentProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(currentProgress);

            if (elapsed < duration) {
                requestAnimationFrame(updateProgress);
            } else {
                // Pequeno delay após 100% para uma transição suave
                setTimeout(onComplete, 500);
            }
        };

        requestAnimationFrame(updateProgress);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ clipPath: "inset(0 0 0 0)" }}
            exit={{
                clipPath: "inset(0 0 0 100%)",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], when: "afterChildren" }
            }}
            className="fixed inset-0 z-[10000] bg-[#FCBE26] flex flex-col justify-between p-6 md:p-12 overflow-hidden font-black text-black will-change-[clip-path]"
            style={{ willChange: "clip-path" }}
        >
            {/* Top Info */}
            <motion.div
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                className="flex justify-between items-start relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl md:text-6xl tracking-tighter italic"
                >
                    LOADING
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] md:text-xs tracking-[0.4em] opacity-40 text-right uppercase leading-relaxed"
                >
                    Aguarde um momento,<br />Preparando sua experiência
                </motion.div>
            </motion.div>

            {/* Center Counter */}
            <motion.div
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                className="flex-1 flex items-center justify-center relative z-10"
            >
                <motion.span
                    key={Math.floor(progress / 10)}
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: 1 }}
                    className="text-[40vw] md:text-[28vw] leading-none tracking-tighter italic tabular-nums"
                >
                    {Math.round(progress)}
                </motion.span>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
                    <span className="text-[60vw] rotate-12 select-none">ARKAD</span>
                </div>
            </motion.div>

            {/* Bottom Info & Progress */}
            <motion.div
                exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
                className="w-full space-y-8 md:space-y-12 relative z-10"
            >
                <div className="relative w-full h-[3px] bg-black/10 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-black"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 uppercase mb-2 font-bold">Status do Sistema</span>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                            <span className="text-sm md:text-lg italic tracking-tighter uppercase whitespace-nowrap">Conectando ao servidor...</span>
                        </div>
                    </div>

                    <div className="text-right flex flex-col items-end">
                        <span className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 uppercase mb-2 font-bold">Modo Operacional</span>
                        <span className="text-2xl md:text-5xl italic tracking-tighter leading-none">
                            {progress < 100 ? "INICIALIZANDO" : "PRONTO"}
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Efeito de ruído sutil */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
