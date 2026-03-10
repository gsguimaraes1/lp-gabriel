import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen_Elegant: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const duration = 5000;

        const updateProgress = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const currentProgress = Math.min((elapsed / duration) * 100, 100);

            setProgress(currentProgress);

            if (elapsed < duration) {
                requestAnimationFrame(updateProgress);
            } else {
                setTimeout(onComplete, 800);
            }
        };

        requestAnimationFrame(updateProgress);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
        >
            <div className="relative w-full max-w-sm px-10 flex flex-col items-center gap-12">
                {/* Logo Section */}
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
                        className="flex flex-col items-center"
                    >
                        <img src="/assets/logo-arkad.png" alt="Arkad" className="h-20 w-auto opacity-90 brightness-200" />
                        <motion.div
                            className="mt-6 text-[#FCBE26] text-[10px] uppercase font-black tracking-[0.6em] whitespace-nowrap"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Performance & BI
                        </motion.div>
                    </motion.div>
                </div>

                {/* Minimal Progress Bar */}
                <div className="w-full space-y-4">
                    <div className="h-px w-full bg-white/10 relative">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-[#FCBE26]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                        <span>Acessando Operação</span>
                        <span className="text-white/60 tabular-nums">{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            {/* Ambient Lighting */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#FCBE26]/5 rounded-full blur-[120px] pointer-events-none"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />
        </motion.div>
    );
};

export default LoadingScreen_Elegant;
