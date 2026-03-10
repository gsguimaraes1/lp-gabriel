import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  MessageCircle,
  BarChart3,
  Users,
  Building2,
  Stethoscope,
  ShoppingCart,
  TrendingUp,
  Search,
  Zap
} from 'lucide-react';
import CTAButton from './components/CTAButton';
import ServiceCard from './components/ServiceCard';
import TypewriterHero from './components/TypewriterHero';
import LeadFormSection from './components/LeadFormSection';
import { SERVICES, TECH_STACK_LOGOS } from './constants';

import InteractiveNavbar from './components/InteractiveNavbar';
import OrbitingTechIcons from './components/OrbitingTechIcons';
import TechBackground from './components/TechBackground';
import Floating3DObjects from './components/Floating3DObjects';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [isLoading, setIsLoading] = React.useState(true);

  // Hero Parallax Effects - vanishing as we scroll down
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);

  React.useEffect(() => {
    // GSAP ScrollTrigger Animations
    const revealElements = document.querySelectorAll('.gsap-reveal');

    revealElements.forEach((el) => {
      gsap.fromTo(el,
        {
          y: 50,
          opacity: 0,
          visibility: 'hidden'
        },
        {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Magnetic effect for buttons
    const magneticButtons = document.querySelectorAll('.magnetic-button');
    magneticButtons.forEach((btn) => {
      btn.addEventListener('mousemove', (e: any) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }, []);

  React.useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#FCBE26] selection:text-[#000000] relative bg-[#000000] overflow-x-hidden">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <Floating3DObjects />
      {/* AMBIENT BACKGROUND BEAMS */}
      <div className="ambient-beam beam-1" />
      <div className="ambient-beam beam-2" />
      <div className="ambient-beam beam-3" />

      {/* BACKGROUND DOTS & NOISE */}
      <div className="bg-patterns-container" />
      <div className="noise" />

      {/* Global Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FCBE26]/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/5 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* NAVBAR INTERATIVA COM HOVER DESLIZANTE */}
      <InteractiveNavbar />

      <div className="relative">
        {/* SEÇÃO 1: HERO - ARKAD ELITE */}
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center relative px-4 md:px-8 overflow-hidden">
          <TechBackground />
          <motion.div
            style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
            className="text-center z-10 max-w-7xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCBE26] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FCBE26]"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Scale Mode Active</span>
            </motion.div>

            <TypewriterHero />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 max-w-2xl mx-auto mb-12 text-xl md:text-2xl font-medium tracking-tight leading-relaxed"
            >
              Engenharia de tráfego e lógica de dados para operações que buscam <span className="text-white italic">escala real</span> e previsibilidade absoluta.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <CTAButton
                text="ESCALAR AGORA"
                onClick={() => document.getElementById('leads')?.scrollIntoView({ behavior: 'smooth' })}
                className="gsap-reveal"
              />
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-[0.2em] text-white/60 hover:text-white transition-all duration-300"
              >
                Ver Estratégias
                <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-24 flex flex-col sm:flex-row items-center justify-center gap-12 text-slate-500 border-t border-white/5 pt-12"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-widest">Growth Engine</span>
                <div className="flex gap-6 items-center opacity-60">
                  <img src="/assets/google.png" alt="Google" className="h-4 w-auto object-contain" />
                  <img src="/assets/meta.png" alt="Meta" className="h-4 w-auto object-contain" />
                  <img src="/assets/analytics.png" alt="GA4" className="h-4 w-auto object-contain" />
                </div>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-widest">Automation Logic</span>
                <img src="/assets/n8n.png" alt="n8n" className="h-4 w-auto object-contain" />
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll Down</span>
            <div className="w-px h-12 bg-gradient-to-b from-[#FCBE26] to-transparent" />
          </motion.div>
        </section>

        {/* PERFORMANCE TICKER - MARQUEE EFFECT */}
        <div className="relative z-30 bg-[#FCBE26] py-3 overflow-hidden border-y border-black shadow-[0_0_30px_rgba(252,190,38,0.3)]">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap gap-12 items-center"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex gap-12 items-center text-[#050505] font-black uppercase text-xs italic tracking-[0.2em]">
                <span>• ROAS MÉDIO: 8.4x</span>
                <span>• +R$ 15M INVESTIDOS</span>
                <span>• CPA OTIMIZADO</span>
                <span>• SCALE MODE: ON</span>
                <span>• DATA-DRIVEN STRATEGY</span>
                <span>• ARKAD PERFORMANCE</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* SEÇÃO DE TRANSIÇÃO (ESTA SEÇÃO SOBREPÕE O HERO) */}
        <div className="relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]">

          {/* SEÇÃO 2.5: TECH STACK & EXPERTISE */}
          <section className="py-32 px-4 md:px-8 border-t border-white/5 relative z-20 bg-[#0A0A0A]">
            <div className="max-w-7xl mx-auto text-center gsap-reveal">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-slate-400 mb-16 uppercase tracking-[0.4em] text-xs font-black"
              >
                Expertise validada nas Gigantes de Tecnologia
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
                {TECH_STACK_LOGOS.map((tech: any, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center text-center group bg-white/5 p-6 rounded-[30px] border border-white/5 hover:bg-white/[0.08] hover:border-[#FCBE26]/20 transition-all duration-500 magnetic-button"
                    data-cursor-text={tech.name.toUpperCase()}
                  >
                    <div className="opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110 mb-6 flex items-center justify-center">
                      {tech.icon}
                    </div>
                    <span className="text-sm font-black tracking-tighter text-white group-hover:text-[#FCBE26] transition-colors uppercase italic mb-2">
                      {tech.name}
                    </span>
                    <p className="text-[10px] leading-tight text-slate-500 group-hover:text-slate-300 transition-colors font-medium">
                      {tech.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SEÇÃO 3: O FILTRO - PREMIUM WHITE */}
          <section className="py-32 px-4 md:px-8 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 relative z-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-16 rounded-[60px] bg-slate-50 border border-slate-200 shadow-[0_40px_100px_rgba(0,0,0,0.08)] relative group overflow-hidden gsap-reveal"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-center gap-6 mb-12 relative z-10">
                  <div className="w-20 h-20 rounded-[30px] bg-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-700">
                    <CheckCircle2 className="text-[#FCBE26]" size={40} />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter text-slate-900 uppercase italic">
                    Protocolo de <span className="text-black">ESCALA</span>
                  </h3>
                </div>

                <ul className="space-y-8 relative z-10">
                  {[
                    { icon: <Building2 />, text: "Indústrias com produto validado." },
                    { icon: <TrendingUp />, text: "Concessionárias em busca de volume." },
                    { icon: <Stethoscope />, text: "Clínicas de alto ticket." },
                    { icon: <Users />, text: "Comércios Locais com verba para escala." },
                    { icon: <BarChart3 />, text: "Operações B2B Complexas." }
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-6 items-center"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm group-hover:border-[#FCBE26] group-hover:text-[#050505] transition-all">
                        {item.icon}
                      </div>
                      <p className="text-xl font-bold text-slate-800 tracking-tight">{item.text}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative flex flex-col justify-center"
              >
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 rounded-[24px] bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                    <XCircle className="text-red-500" size={32} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-slate-800 uppercase italic">
                    NÃO <span className="text-slate-400">ATENDEMOS</span>
                  </h3>
                </div>

                <ul className="space-y-10 mb-12">
                  {[
                    { icon: <Zap />, text: "Infoprodutores e Amadores." },
                    { icon: <ShoppingCart />, text: "Dropshipping Genérico." },
                    { icon: <TrendingUp />, text: "Pessoas sem verba validada." }
                  ].map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      viewport={{ once: true }}
                      className="flex gap-6 items-center"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                        {React.cloneElement(item.icon as any, { size: 24 } as any)}
                      </div>
                      <p className="text-xl font-bold tracking-tight text-slate-600 uppercase italic">{item.text}</p>
                    </motion.li>
                  ))}
                </ul>

                <div className="p-8 rounded-[40px] bg-slate-900 text-white shadow-2xl relative overflow-hidden group border border-white/5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-red-400 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                    Aviso de Qualificação
                  </p>
                  <p className="text-lg leading-snug font-bold italic tracking-tight">
                    "Nosso tempo é dedicado a quem tem estrutura para crescer. Se você busca milagres sem investimento, <span className="text-red-400">não clique.</span>"
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SEÇÃO 4: SERVIÇOS - ARKAD DEEP PURPLE */}
          <section id="services" className="py-40 px-4 md:px-8 bg-[#000000] relative overflow-hidden scroll-mt-24">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(252,190,38,0.05),transparent_70%)]" />

            <div className="max-w-7xl mx-auto text-center mb-32 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic text-white leading-none gsap-reveal" data-cursor-text="CASH">
                  Potencialize seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCBE26] to-[#F9A825] drop-shadow-[0_0_30px_rgba(252,190,38,0.3)]">ROI</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-xl md:text-2xl font-medium tracking-tight leading-relaxed">
                  Estratégias de elite para quem não aceita nada menos que o domínio absoluto do mercado.
                </p>
              </motion.div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
              {SERVICES.map((service, idx) => (
                <ServiceCard key={idx} {...service} />
              ))}
            </div>
          </section>

          {/* SEÇÃO 5: METODOLOGIA - TECH FLOW DESIGN */}
          <section className="py-40 px-4 md:px-8 bg-[#000000] relative overflow-hidden border-y border-white/5">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FCBE26]/5 blur-[200px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-32">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic text-white"
                >
                  O Método de <span className="text-[#FCBE26]">Escala</span>
                </motion.h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#FCBE26] to-transparent mx-auto mt-10 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                {/* Connecting Line */}
                <div className="hidden lg:block absolute top-[100px] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FCBE26]/20 to-transparent z-0" />

                {[
                  { step: "01", title: "Diagnóstico", desc: "Varredura 360º para identificar gargalos e vazamentos de verba.", icon: <Search size={28} /> },
                  { step: "02", title: "Rastreamento", desc: "Implementação de infraestrutura de dados de alta performance.", icon: <Zap size={28} /> },
                  { step: "03", title: "Tráfego", desc: "Campanhas de precisão cirúrgica focadas em escala lucrativa.", icon: <TrendingUp size={28} /> },
                  { step: "04", title: "Otimização", desc: "Ajustes baseados em IA e BI para maximizar cada centavo gasto.", icon: <BarChart3 size={28} /> }
                ].map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.6 }}
                    className="relative p-12 glass-panel rounded-[40px] group hover:bg-white/[0.05] hover:border-[#FCBE26]/30 transition-all duration-700 z-10 shadow-2xl overflow-hidden text-left"
                  >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FCBE26]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="w-20 h-20 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-[#FCBE26] mb-10 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(252,190,38,0.3)] transition-all duration-700 relative z-10">
                      {m.icon}
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-sm font-black text-[#FCBE26] tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">{m.step}</span>
                        <div className="h-px flex-1 bg-white/10 group-hover:bg-[#FCBE26]/30 transition-colors" />
                      </div>
                      <h4 className="text-3xl font-bold text-white mb-6 group-hover:text-[#FCBE26] transition-colors duration-300 tracking-tight leading-tight uppercase italic">{m.title}</h4>
                      <p className="text-slate-400 text-lg leading-relaxed group-hover:text-slate-200 transition-colors duration-300">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SEÇÃO 6: SOBRE - VOLTA PARA O ROXO PROFUNDO */}
          <section id="about" className="py-40 px-4 md:px-8 bg-[#000000] relative overflow-hidden scroll-mt-24">
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#FCBE26]/5 blur-[200px] -z-0 rounded-full" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-2/5"
              >
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#FCBE26] to-[#FFA000] rounded-[40px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="w-full aspect-[4/5] bg-slate-800 rounded-[35px] overflow-hidden border border-white/10 relative shadow-2xl group">
                    <img
                      src="/assets/Gabriel-Guimaraes.png"
                      alt="Gabriel Guimarães"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      data-cursor-text="GABRIEL"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center">
                      <h4 className="text-2xl font-black uppercase tracking-tighter italic">Gabriel Guimarães</h4>
                      <p className="text-sm font-black text-[#FCBE26] tracking-[0.3em] uppercase mt-2">Fundador & Estrategista</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:w-3/5"
              >
                <h2 className="text-5xl md:text-6xl font-black mb-10 tracking-tighter uppercase italic leading-tight">
                  Mais que um gestor, <br />
                  <span className="text-[#FCBE26]">um parceiro estratégico.</span>
                </h2>
                <div className="space-y-8 text-slate-300 text-xl md:text-2xl leading-relaxed font-medium">
                  <p>
                    Minha missão é simples: usar <span className="text-white">dados e automação</span> para garantir que empresas sólidas continuem crescendo com previsibilidade.
                  </p>
                  <p>
                    Em um mercado saturado de amadorismo, eu entrego <span className="text-[#FCBE26]">ciência de marketing</span>. Focamos em CAC, LTV e ROAS real, fugindo das métricas de vaidade.
                  </p>
                  <blockquote className="border-l-8 border-[#FCBE26] pl-10 italic text-slate-400 py-6 text-2xl md:text-3xl font-bold bg-white/5 rounded-r-3xl pr-8">
                    "O tráfego pago é a engrenagem de faturamento que precisa ser lubrificada com dados."
                  </blockquote>
                </div>

                <div className="mt-16 grid grid-cols-2 gap-12">
                  <div className="text-left">
                    <p className="text-5xl font-black text-[#FCBE26] tracking-tighter italic">100%</p>
                    <p className="text-xs text-slate-500 uppercase font-black tracking-[0.3em] mt-2">Foco em Performance</p>
                  </div>
                  <div className="text-left">
                    <p className="text-5xl font-black text-[#FCBE26] tracking-tighter italic">B2B</p>
                    <p className="text-xs text-slate-500 uppercase font-black tracking-[0.3em] mt-2">Especialista Real</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* SEÇÃO DE PARCEIROS (DISCRETA) */}
          <div className="py-16 bg-[#000000] border-t border-white/5 flex flex-col items-center">
            <p className="text-slate-600 text-[9px] uppercase font-black tracking-[0.5em] mb-10 opacity-40">Marcas que aceleram conosco</p>
            <div className="flex flex-wrap justify-center items-center gap-16 md:gap-24 opacity-30 hover:opacity-80 transition-all duration-700">
              <img src="/assets/logo branco_krenke.png" alt="Krenke" className="h-7 w-auto object-contain" />
              <img src="/assets/logo-kinderplay.png" alt="Kinderplay" className="h-9 w-auto object-contain brightness-0 invert" />
            </div>
          </div>

          <LeadFormSection />

          {/* FOOTER */}
          <footer className="py-32 px-4 md:px-8 bg-[#050505] border-t border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#FCBE26]/20 to-transparent" />

            <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10">
              <motion.img
                whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                src="/assets/logo-arkad.png"
                alt="Arkad"
                className="h-20 w-auto object-contain opacity-80"
              />

              <div className="flex flex-wrap justify-center gap-12 text-sm font-black uppercase tracking-[0.3em]">
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'Serviços', id: 'services' },
                  { label: 'Cases', id: 'leads' },
                  { label: 'Sobre', id: 'about' }
                ].map((link) => (
                  <button
                    key={link.id}
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-500 hover:text-[#FCBE26] transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-8 w-full max-w-2xl">
                <a
                  href="#"
                  className="group flex flex-col items-center gap-4 p-8 rounded-[40px] bg-white/5 border border-white/5 hover:border-[#FCBE26]/30 transition-all duration-700"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#FCBE26] shadow-[0_0_30px_rgba(252,190,38,0.4)] group-hover:scale-110 transition-transform duration-700">
                    <img src="/assets/Gabriel-Guimaraes.png" alt="Gabriel" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-2xl font-black uppercase tracking-tighter italic">Falar com o Gabriel</span>
                  <span className="text-[#FCBE26] text-sm font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity underline decoration-2 underline-offset-8">Consultoria Gratuita via WhatsApp</span>
                </a>

                <div className="flex flex-col gap-4 mt-8">
                  <p className="text-slate-600 text-[10px] uppercase font-black tracking-[0.4em] leading-loose">
                    &copy; {new Date().getFullYear()} Arkad Mídias & Performance Tech.<br />
                    Estratégia, Dados e Escala Lucrativa.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;