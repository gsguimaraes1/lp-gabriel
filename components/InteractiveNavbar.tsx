import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import CTAButton from './CTAButton';

const NAV_ITEMS = [
    { label: 'Home', href: '#hero' },
    { label: 'Serviços', href: '#services' },
    { label: 'Cases', href: '#leads' },
    { label: 'Sobre', href: '#about' }
];

const InteractiveNavbar: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
    const navRef = useRef<HTMLDivElement>(null);

    const updatePill = (index: number | null) => {
        if (!navRef.current) return;
        const targetIndex = index !== null ? index : activeIndex;
        const items = navRef.current.querySelectorAll('.nav-item');
        const target = items[targetIndex] as HTMLElement;

        if (target) {
            setPillStyle({
                left: target.offsetLeft,
                width: target.offsetWidth,
                opacity: 1
            });
        }
    };

    useEffect(() => {
        updatePill(null);
        const handleResize = () => updatePill(null);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeIndex]);

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-8 py-6 pointer-events-none" aria-label="Navegação Principal">
            <div className="max-w-7xl mx-auto flex justify-between items-center bg-[#000000]/60 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-[32px] pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-4"
                >
                    <img src="/assets/logo-arkad.webp" alt="Arkad Logo" className="h-10 md:h-12 w-auto object-contain" />
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#FCBE26]/10 border border-[#FCBE26]/20 rounded-full">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FCBE26] animate-pulse" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-[#FCBE26]">System Live</span>
                    </div>
                </motion.div>

                <div className="hidden md:flex gap-2 items-center relative" ref={navRef}>
                    {/* Sliding Pill */}
                    <motion.div
                        className="absolute h-10 bg-[#FCBE26] border border-[#FCBE26]/20 rounded-full z-0"
                        animate={{
                            left: pillStyle.left,
                            width: pillStyle.width,
                            opacity: pillStyle.opacity
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        aria-hidden="true"
                    />

                    {NAV_ITEMS.map((item, idx) => {
                        const isPilled = (hoveredIndex !== null ? hoveredIndex === idx : activeIndex === idx) && pillStyle.opacity === 1;
                        return (
                            <a
                                key={idx}
                                href={item.href}
                                aria-current={activeIndex === idx ? 'page' : undefined}
                                className={`nav-item relative z-10 px-6 py-2 text-xs font-black tracking-widest uppercase transition-colors duration-300 rounded-full 
                                    ${isPilled ? 'text-black' : 'text-slate-400 hover:text-white'}`}
                                onMouseEnter={() => {
                                    setHoveredIndex(idx);
                                    updatePill(idx);
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                    updatePill(null);
                                }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveIndex(idx);
                                    const targetId = item.href.replace('#', '');
                                    const el = document.getElementById(targetId);
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                {item.label}
                            </a>
                        )
                    })}

                    <div className="ml-4">
                        <CTAButton
                            onClick={() => {
                                const el = document.getElementById('leads');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-6 py-2.5 text-[10px] rounded-full"
                            aria-label="Ir para contatos"
                        >
                            Contatos
                        </CTAButton>
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-[#FCBE26]" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16M4 6h16M4 18h16" /></svg>
                </div>
            </div>
        </nav>
    );
};

export default InteractiveNavbar;
