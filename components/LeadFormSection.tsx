import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Lock, Loader2, ChevronDown } from 'lucide-react';

const LeadFormSection: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [cities, setCities] = useState<{ id: number, nome: string }[]>([]);
    const [formData, setFormData] = useState({
        nome: '',
        whatsapp: '',
        email: '',
        empresa: '',
        cidade: '',
        cargo: ''
    });

    // Fetch cities from IBGE on mount
    React.useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios?orderBy=nome');
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error('Erro ao buscar cidades:', error);
            }
        };
        fetchCities();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://n8n.gabrielguimaraes.site/webhook-test/LPGabriel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    origem: 'Landing Page Gabriel',
                    data: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ nome: '', whatsapp: '', email: '', empresa: '', cidade: '', cargo: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Erro ao enviar form:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <section id="leads" className="py-40 relative overflow-hidden bg-black scroll-mt-24">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FCBE26]/5 blur-[150px] -z-10 rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] -z-10 rounded-full" />

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-24 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-2 bg-[#FCBE26]/10 border border-[#FCBE26]/20 rounded-full mb-10">
                            <span className="text-xs font-black text-[#FCBE26] uppercase tracking-[0.2em]">
                                Convite Exclusivo <span className="ml-2">↴</span>
                            </span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-12 tracking-tighter uppercase italic">
                            O Próximo Nível da sua <br />
                            <span className="text-[#FCBE26] drop-shadow-[0_0_20px_rgba(252,190,38,0.3)]">Operação</span>
                        </h2>

                        <div className="space-y-8">
                            {[
                                "Diagnóstico 360º da sua estrutura atual",
                                "Mapeamento de gargalos em Marketing & Vendas",
                                "Plano de ação focado em ROI e Escala Real",
                                "Sessão estratégica 100% gratuita"
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-5"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-black border border-[#FCBE26]/30 flex items-center justify-center shadow-[0_0_15px_rgba(252,190,38,0.1)]">
                                        <Check size={16} className="text-[#FCBE26]" strokeWidth={4} />
                                    </div>
                                    <span className="text-slate-300 text-xl font-medium tracking-tight leading-tight">{item}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column: Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="glass-panel-heavy p-10 md:p-14 rounded-[50px] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCBE26]/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative z-10">
                                <h3 className="text-2xl font-black text-center mb-12 text-white italic tracking-tighter uppercase">
                                    {status === 'success'
                                        ? "Solicitação Enviada!"
                                        : "Inicie sua Transformação"}
                                </h3>

                                {status === 'success' ? (
                                    <div className="text-center py-10">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-24 h-24 bg-[#FCBE26] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(252,190,38,0.4)] rotate-12"
                                        >
                                            <Check className="text-black" size={48} strokeWidth={4} />
                                        </motion.div>
                                        <p className="text-white text-2xl font-black italic uppercase tracking-tighter">Obrigado!</p>
                                        <p className="text-slate-400 mt-2">Entraremos em contato via WhatsApp em breve.</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-10 text-[#FCBE26] font-black text-xs uppercase tracking-[0.2em] underline decoration-2 underline-offset-8 hover:text-white transition-colors"
                                        >
                                            Enviar nova solicitação
                                        </button>
                                    </div>
                                ) : (
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        {[
                                            { name: 'nome', type: 'text', placeholder: 'Nome completo' },
                                            { name: 'email', type: 'email', placeholder: 'E-mail corporativo' },
                                            { name: 'empresa', type: 'text', placeholder: 'Nome da sua empresa' },
                                        ].map((field) => (
                                            <div key={field.name} className="relative group/field">
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    required
                                                    value={(formData as any)[field.name]}
                                                    onChange={handleChange}
                                                    placeholder={field.placeholder}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#FCBE26]/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-500 font-medium"
                                                />
                                                <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FCBE26]/0 to-transparent group-focus-within/field:via-[#FCBE26]/50 transition-all duration-700" />
                                            </div>
                                        ))}

                                        {/* WHATSAPP WITH BRAZIL FLAG AND DDI */}
                                        <div className="relative group/field">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-3 pr-4 border-r border-white/10 z-10 pointer-events-none">
                                                <span className="text-xl">🇧🇷</span>
                                                <span className="text-white font-bold opacity-60">+55</span>
                                            </div>
                                            <input
                                                type="tel"
                                                name="whatsapp"
                                                required
                                                value={formData.whatsapp}
                                                onChange={handleChange}
                                                placeholder="(00) 00000-0000"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-24 pr-6 py-5 focus:outline-none focus:border-[#FCBE26]/50 focus:bg-white/10 transition-all text-white placeholder:text-slate-500 font-medium"
                                            />
                                            <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FCBE26]/0 to-transparent group-focus-within/field:via-[#FCBE26]/50 transition-all duration-700" />
                                        </div>

                                        {/* CITY SELECT FROM IBGE */}
                                        <div className="relative group/field">
                                            <select
                                                name="cidade"
                                                required
                                                value={formData.cidade}
                                                onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#FCBE26]/50 focus:bg-white/10 transition-all text-white appearance-none cursor-pointer pr-12 font-medium"
                                            >
                                                <option value="" disabled className="bg-[#050505]">Sua Cidade</option>
                                                {cities.map(city => (
                                                    <option key={city.id} value={city.nome} className="bg-[#050505]">{city.nome}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none text-slate-500 group-focus-within/field:text-[#FCBE26]">
                                                {cities.length === 0 ? <Loader2 className="animate-spin" size={18} /> : <ChevronDown size={20} />}
                                            </div>
                                        </div>

                                        <div className="relative group/field">
                                            <select
                                                name="cargo"
                                                required
                                                value={formData.cargo}
                                                onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-[#FCBE26]/50 focus:bg-white/10 transition-all text-white appearance-none cursor-pointer pr-12 font-medium"
                                            >
                                                <option value="" disabled className="bg-[#050505]">Qual o seu cargo?</option>
                                                <option value="Sócio e Fundador" className="bg-[#050505]">Sócio e Fundador</option>
                                                <option value="Presidente ou CEO" className="bg-[#050505]">Presidente ou CEO</option>
                                                <option value="Diretor" className="bg-[#050505]">Diretor</option>
                                                <option value="Gerente" className="bg-[#050505]">Gerente</option>
                                                <option value="Outro" className="bg-[#050505]">Outro</option>
                                            </select>
                                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-focus-within/field:text-[#FCBE26]" size={20} />
                                        </div>

                                        {status === 'error' && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-red-400 text-sm text-center font-bold"
                                            >
                                                Falha na conexão. Tente novamente.
                                            </motion.p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-[#FCBE26] disabled:bg-slate-800 disabled:text-slate-600 text-black font-black uppercase tracking-[0.1em] py-6 px-4 rounded-2xl mt-8 hover:bg-white transition-all duration-500 transform active:scale-[0.98] shadow-[0_15px_40px_rgba(252,190,38,0.2)] flex items-center justify-center gap-3 text-lg italic"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <Loader2 className="animate-spin" size={24} />
                                                    Processando...
                                                </>
                                            ) : (
                                                <>
                                                    Obter meu Diagnóstico
                                                </>
                                            )}
                                        </button>

                                        <div className="flex items-center justify-center gap-2 mt-8 text-slate-500 text-[10px] font-black uppercase tracking-widest opacity-60">
                                            <Lock size={12} className="text-[#FCBE26]" />
                                            <span>Privacidade & Dados Protegidos</span>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Extreme Background Glow */}
                        <div className="absolute -inset-10 bg-[#FCBE26]/5 blur-[120px] -z-20 rounded-full" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default LeadFormSection;
