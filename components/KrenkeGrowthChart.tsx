import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend
} from 'recharts';

const data = [
    { month: 'Set 23', faturamento: 1250000, custos: 490000 },
    { month: 'Nov 23', faturamento: 1600000, custos: 540000 },
    { month: 'Jan 24 (Sazonal)', faturamento: 1150000, custos: 780000 }, // Queda fat. + Alta custo
    { month: 'Mar 24', faturamento: 1900000, custos: 620000 },
    { month: 'Jun 24', faturamento: 2800000, custos: 750000 },
    { month: 'Set 24', faturamento: 3800000, custos: 850000 },
    { month: 'Nov 24', faturamento: 4800000, custos: 950000 },
    { month: 'Jan 25 (Sazonal)', faturamento: 3400000, custos: 1250000 }, // Queda fat. + Alta custo
    { month: 'Mar 25', faturamento: 4800000, custos: 1050000 },
    { month: 'Jun 25', faturamento: 5400000, custos: 1150000 },
    { month: 'Set 25', faturamento: 5900000, custos: 1250000 },
    { month: 'Dez 25', faturamento: 6100000, custos: 1350000 },
];

const KrenkeGrowthChart: React.FC = () => {
    return (
        <div className="w-full h-[400px] md:h-[480px] mt-8 glass-panel-heavy p-4 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-white/5 relative group">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FCBE26]/5 blur-[100px] pointer-events-none" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8 md:mb-12 relative z-10 w-full">
                <div className="flex-1">
                    <h4 className="text-white font-black text-lg md:text-2xl italic uppercase tracking-tighter leading-none mb-2">Performance Arkad + Krenke</h4>
                    <p className="text-slate-500 text-[10px] md:text-xs font-medium uppercase tracking-[0.15em]">Análise de Escala | 2023 - 2025</p>
                </div>
                <div className="flex gap-3 md:gap-6 bg-black/40 backdrop-blur-md p-2.5 md:p-3 px-4 md:px-5 rounded-xl md:rounded-2xl border border-white/5 self-stretch sm:self-auto justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#FCBE26] shadow-[0_0_8px_#FCBE26]" />
                        <span className="text-[8px] md:text-[9px] font-black uppercase text-slate-300 tracking-wider">Faturamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-white/30" />
                        <span className="text-[8px] md:text-[9px] font-black uppercase text-slate-400 tracking-wider">Custos</span>
                    </div>
                </div>
            </div>

            <div className="h-[200px] md:h-[280px] w-full relative z-10 overflow-visible">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FCBE26" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#FCBE26" stopOpacity={0} />
                            </linearGradient>
                            <filter id="shadow" height="150%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                                <feOffset dx="0" dy="5" result="offsetblur" />
                                <feFlood floodColor="#FCBE26" floodOpacity="0.2" />
                                <feComposite in2="offsetblur" operator="in" />
                                <feMerge>
                                    <feMergeNode />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="8 8" stroke="#ffffff03" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="#334155"
                            fontSize={8}
                            fontWeight={800}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            interval="preserveStartEnd"
                            minTickGap={15}
                        />
                        <YAxis
                            stroke="#334155"
                            fontSize={8}
                            fontWeight={800}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#050505',
                                border: '1px solid rgba(252,190,38,0.1)',
                                borderRadius: '12px',
                                fontSize: '10px',
                                fontWeight: '900',
                                color: '#fff',
                                padding: '10px'
                            }}
                            itemStyle={{ color: '#FCBE26' }}
                            formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
                        />
                        <Area
                            type="monotone"
                            dataKey="faturamento"
                            name="Faturamento"
                            stroke="#FCBE26"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRev)"
                            filter="url(#shadow)"
                            animationDuration={1500}
                        />
                        <Area
                            type="monotone"
                            dataKey="custos"
                            name="Custos"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth={1.5}
                            strokeDasharray="4 4"
                            fill="transparent"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-1 md:gap-4 mt-10 pt-8 border-t border-white/5 relative z-10 w-full">
                <div className="text-center px-1">
                    <p className="text-slate-600 text-[7px] md:text-[9px] font-black uppercase tracking-wider mb-1">Volume Inicial</p>
                    <p className="text-white font-black text-[10px] md:text-lg italic tracking-tighter">R$ 1.25M</p>
                </div>
                <div className="text-center px-1 border-x border-white/5">
                    <p className="text-[#FCBE26] text-[7px] md:text-[9px] font-black uppercase tracking-wider mb-1">Faturamento Pico</p>
                    <p className="text-[#FCBE26] font-black text-[11px] md:text-2xl italic tracking-tighter drop-shadow-[0_0_10px_rgba(252,190,38,0.4)]">R$ 6.1M</p>
                </div>
                <div className="text-center px-1">
                    <p className="text-slate-600 text-[7px] md:text-[9px] font-black uppercase tracking-wider mb-1">Eficiência ROI</p>
                    <p className="text-white font-black text-[10px] md:text-lg italic tracking-tighter">+388%</p>
                </div>
            </div>
        </div>
    );
};

export default KrenkeGrowthChart;
