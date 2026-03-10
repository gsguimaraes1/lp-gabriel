import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ children, onClick, href, className }) => {
  const Component = href ? motion.a : motion.button;
  const commonProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 10 },
    onClick,
    href,
    className: `
      relative inline-flex items-center justify-center gap-3
      py-5 px-12 text-sm font-black uppercase tracking-[0.2em] italic
      rounded-full bg-[#FCBE26] text-black
      transition-all duration-300
      shadow-[0_0_30px_rgba(252,190,38,0.4)]
      hover:shadow-[0_0_50px_rgba(252,190,38,0.6)]
      hover:bg-white
      group overflow-hidden
      magnetic-button
      ${className || ''}
    `,
    "data-cursor-text": "LET'S GO"
  };

  return (
    <Component {...(commonProps as any)}>
      {/* Internal Glitch/Shine Effect */}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="group-hover:translate-x-1 transition-transform"
        >
          <ChevronRight size={18} strokeWidth={3} />
        </motion.span>
      </span>

      {/* Outer Border Glow on Hover */}
      <span className="absolute inset-0 rounded-full border-2 border-white opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-300" />
    </Component>
  );
};

export default CTAButton;