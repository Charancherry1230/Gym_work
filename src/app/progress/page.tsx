"use client";

import { Card } from "@/components/ui/Card";

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    AreaChart,
    Area
} from "recharts";
import {
    Trophy,
    Clock,
    TrendingUp,
    Target,
    Zap,
    Activity,
    Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

const volumeData = [
    { name: "W1", volume: 12500 },
    { name: "W2", volume: 14200 },
    { name: "W3", volume: 13800 },
    { name: "W4", volume: 15600 },
    { name: "W5", volume: 16800 },
    { name: "W6", volume: 18200 },
];

const categoryData = [
    { name: "CHEST", sessions: 12, color: "#bef264" },
    { name: "BACK", sessions: 10, color: "#0ea5e9" },
    { name: "LEGS", sessions: 8, color: "#22C55E" },
    { name: "SHLD", sessions: 6, color: "#fbbf24" },
    { name: "ARMS", sessions: 9, color: "#f472b6" },
];

export default function ProgressPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-lime-400 fill-current" />
                        <p className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">Performance Telemetry</p>
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Growth Metrics</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">Detailed projection of your physical evolution.</p>
                </div>
                <div className="flex items-center gap-3 bg-white/[0.02] p-2 pr-6 rounded-3xl border border-white/5">
                    <div className="w-12 h-12 rounded-2xl bg-lime-400 flex items-center justify-center text-black font-black italic text-xl shadow-[0_0_20px] shadow-lime-400/30">
                        +12
                    </div>
                    <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Global Rank</p>
                        <p className="text-sm font-black text-white italic tracking-tighter uppercase whitespace-nowrap">Tier: Advanced Athlete</p>
                    </div>
                </div>
            </div>

            {/* Stats Cluster */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Vol. Expansion", value: "18.2K", change: "+14.2%", icon: TrendingUp, color: "text-lime-400", bg: "from-lime-400/10" },
                    { label: "System Records", value: "12", change: "New PRs", icon: Trophy, color: "text-sky-400", bg: "from-sky-400/10" },
                    { label: "Sync Score", value: "96%", change: "OPTIMIZED", icon: Target, color: "text-emerald-400", bg: "from-emerald-400/10" },
                ].map((stat, i) => (
                    <Card key={i} className={cn("relative overflow-hidden group border-white/5 hover:border-lime-400/20", i === 0 && "bg-gradient-to-br from-lime-400/10 to-transparent border-lime-400/5")}>
                        <div className="flex justify-between items-start mb-6">
                            <div className={cn("p-2.5 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors border border-white/10", stat.color)}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className={cn("text-[9px] font-black px-2 py-0.5 rounded-full border bg-white/5", stat.color, i === 0 ? "border-lime-400/20" : "border-white/5")}>{stat.change}</span>
                        </div>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-4xl font-black text-white italic tracking-tighter uppercase">{stat.value}</p>
                    </Card>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-8">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-lg font-black text-white uppercase italic tracking-wider">Compound Volume Trend</h3>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                            <TrendingUp className="w-5 h-5 text-lime-400" />
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData}>
                                <defs>
                                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#bef264" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#bef264" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#334155" fontSize={10} fontWeight="black" tickLine={false} axisLine={false} />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#020617", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px" }}
                                    itemStyle={{ color: "#bef264", fontWeight: "bold" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="volume"
                                    stroke="#bef264"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorVolume)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-8">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-lg font-black text-white uppercase italic tracking-wider">Workout Distribution</h3>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                            <Target className="w-5 h-5 text-sky-400" />
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={categoryData} layout="vertical" margin={{ left: -30 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke="#475569" fontSize={9} fontWeight="black" tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                                    contentStyle={{ backgroundColor: "#020617", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px" }}
                                />
                                <Bar dataKey="sessions" radius={[0, 8, 8, 0]} barSize={16}>
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6} stroke={entry.color} strokeWidth={2} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Summary Matrix */}
            <Card className="p-8">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tight">Active Matrix Summary</h3>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                        <div className="w-1 h-1 rounded-full bg-lime-400 animate-pulse" />
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">REAL-TIME DATA SYNC</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Total Time", value: "24.5H", icon: Clock, color: "text-lime-400" },
                        { label: "Sessions", value: "18", icon: Activity, color: "text-sky-400" },
                        { label: "Burn Factor", value: "9.4K", icon: Flame, color: "text-orange-400" },
                        { label: "Lifts Dev.", value: "124", icon: Trophy, color: "text-emerald-400" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center group p-4 hover:bg-white/[0.01] rounded-3xl transition-colors">
                            <div className={cn("w-12 h-12 rounded-2xl bg-white/5 border border-white/5 mx-auto mb-4 flex items-center justify-center transition-all group-hover:scale-110", stat.color)}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <p className="text-3xl font-black text-white italic tracking-tighter uppercase mb-1">{stat.value}</p>
                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
