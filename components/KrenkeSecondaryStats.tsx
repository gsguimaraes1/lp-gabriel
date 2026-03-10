import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    LabelList
} from 'recharts';

const cplData = [
    { stage: 'Início', cpl: 85 },
    { stage: 'Mês 3', cpl: 62 },
    { stage: 'Mês 6', cpl: 41 },
    { stage: 'Atual', cpl: 24 },
];

const channelData = [
    { name: 'Google Ads', value: 45, color: '#FCBE26' },
    { name: 'Meta Ads', value: 30, color: '#2563eb' },
    { name: 'Inbound', value: 15, color: '#8b5cf6' },
    { name: 'Outros', value: 10, color: '#475569' },
];

const KrenkeSecondaryStats: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 h-full">
            {/* CPL REDUCTION */}
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/5 h-[300px]">
                <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Otimização de CPL (R$)</h4>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={cplData} margin={{ top: 25, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis dataKey="stage" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                            cursor={{ fill: '#ffffff05' }}
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '12px',
                                color: '#1a1a1a'
                            }}
                            itemStyle={{ color: '#1a1a1a', fontWeight: 'bold' }}
                            formatter={(value: any) => [`R$ ${value}`, 'CPL']}
                        />
                        <Bar dataKey="cpl" radius={[4, 4, 0, 0]}>
                            {cplData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 3 ? '#FCBE26' : '#ffffff20'} />
                            ))}
                            <LabelList
                                dataKey="cpl"
                                position="top"
                                formatter={(value: any) => `R$ ${value}`}
                                style={{ fill: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* CHANNEL ATTRIBUTION */}
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl border border-white/5 h-[300px] flex flex-col">
                <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Atribuição por Canal</h4>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <ResponsiveContainer width="100%" height="70%">
                        <PieChart>
                            <Pie
                                data={channelData}
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                            >
                                {channelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    color: '#1a1a1a'
                                }}
                                itemStyle={{ color: '#1a1a1a', fontWeight: 'bold' }}
                                formatter={(value: any, name: string) => [`${value}%`, name]}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
                        {channelData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] text-slate-300 font-medium whitespace-nowrap">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KrenkeSecondaryStats;
