import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="
        group relative p-8 rounded-3xl overflow-hidden
        glass-panel
        transition-all duration-500 ease-out
        hover:border-[#FCBE26]/40 hover:shadow-[0_20px_50px_rgba(252,190,38,0.1)]
        flex flex-col items-start space-y-6
      "
    >
      {/* Dynamic Background Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#FCBE26]/5 via-transparent to-transparent
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
      ></div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-[#FCBE26]/10 clip-path-polygon-[100%_0,100%_100%,0_0] opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <div className="relative z-10 flex flex-col items-start space-y-6 w-full">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#FCBE26]/50 group-hover:bg-[#FCBE26]/10 group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 group-hover:text-[#FCBE26] transition-colors duration-300 tracking-tight leading-tight uppercase italic">
            {title}
          </h3>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[#FCBE26] text-sm font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
          Saber mais
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;