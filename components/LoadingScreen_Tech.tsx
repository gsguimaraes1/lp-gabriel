import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen_Tech: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [glitchText, setGlitchText] = useState('ARKAD');

    useEffect(() => {
        const startTime = Date.now();
        const duration = 2000;

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

        const glitchInterval = setInterval(() => {
            const chars = 'ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789@#$';
            const randomText = 'ARKAD'.split('').map(char =>
                Math.random() > 0.8 ? chars[Math.floor(Math.random() * chars.length)] : char
            ).join('');
            setGlitchText(randomText);
        }, 100);

        requestAnimationFrame(updateProgress);
        return () => clearInterval(glitchInterval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(10px)",
                transition: { duration: 0.8, ease: "circIn" }
            }}
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden font-mono text-[#FCBE26]"
        >
            {/* Background Data Stream */}
            <div className="absolute inset-0 opacity-[0.03] overflow-hidden leading-none text-[8px] pointer-events-none break-all select-none font-mono">
                {Array.from({ length: 150 }).map((_, i) => (
                    <div key={i} className="whitespace-nowrap">
                        {Math.random().toString(36).repeat(10)}
                    </div>
                ))}
            </div>

            {/* Central Content */}
            <div className="relative flex flex-col items-center gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl md:text-7xl font-black tracking-[0.2em] relative"
                >
                    {glitchText}
                    <motion.div
                        className="absolute -inset-1 border border-[#FCBE26]/20 bg-[#FCBE26]/5 -z-10"
                        animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    />
                </motion.div>

                <div className="flex flex-col items-center gap-2">
                    <div className="h-1 w-48 md:w-64 bg-white/5 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-[#FCBE26] shadow-[0_0_15px_#FCBE26]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between w-full text-[10px] tracking-widest font-bold opacity-60">
                        <span>INIT_CORE</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            {/* Bottom Terminal Output */}
            <div className="absolute bottom-12 left-12 right-12 max-w-xl hidden md:block">
                <div className="text-[10px] space-y-1 opacity-40">
                    <div className="flex gap-4">
                        <span className="text-white/40">[OK]</span>
                        <span>INITIALIZING PERFORMANCE_ENGINE_V4...</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-white/40">[OK]</span>
                        <span>CONNECTING TO GOOGLE_ADS_API...</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-white/40">[OK]</span>
                        <span>FETCHING REALTIME_BI_DATA...</span>
                    </div>
                    <div className="flex gap-4">
                        <span className="animate-pulse">_</span>
                        <span>AUTHENTICATING ARKAD_CORE_SYSTEMS...</span>
                    </div>
                </div>
            </div>

            {/* Scanning Lines */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-[#FCBE26]/5 to-transparent h-20 w-full animate-[scan_3s_linear_infinite]" />

            <style>{`
                @keyframes scan {
                    from { transform: translateY(-100vh); }
                    to { transform: translateY(100vh); }
                }
            `}</style>
        </motion.div>
    );
};

export default LoadingScreen_Tech;
