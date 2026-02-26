"use client";

import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import {
    Trophy,
    Flame,
    Calendar,
    Activity,
    ArrowUpRight,
    Plus,
    Zap,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const stats = [
    { label: "Workouts", value: "24", icon: Trophy, color: "text-lime-400", bg: "bg-lime-400/5" },
    { label: "Calories", value: "12.4K", icon: Flame, color: "text-orange-400", bg: "bg-orange-400/5" },
    { label: "Weekly hrs", value: "5.2", icon: Calendar, color: "text-sky-400", bg: "bg-sky-400/5" },
    { label: "Streak", value: "7D", icon: Activity, color: "text-emerald-400", bg: "bg-emerald-400/5" },
];

const activityData = [
    { name: "M", value: 45 },
    { name: "T", value: 52 },
    { name: "W", value: 38 },
    { name: "T", value: 65 },
    { name: "F", value: 48 },
    { name: "S", value: 70 },
    { name: "S", value: 30 },
];

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                        <p className="text-[10px] font-black text-lime-400 uppercase tracking-[0.2em]">Active Session</p>
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                        Welcome back, <span className="text-gradient uppercase">{session?.user?.name?.split(" ")[0]}</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">You&apos;ve hit 86% of your weekly target.</p>
                </div>
                <Link href="/builder">
                    <Button size="lg" className="flex items-center gap-2 group shadow-[0_0_30px_rgba(190,242,100,0.2)]">
                        <Plus className="w-6 h-6 transition-transform group-hover:rotate-90" />
                        <span className="text-sm">Start New Session</span>
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <Card className="hover:border-lime-400/20 group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={cn("p-2 rounded-lg", stat.bg)}>
                                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                                </div>
                                <div className="text-[10px] font-black text-slate-600 group-hover:text-lime-400/50 transition-colors uppercase tracking-widest">
                                    LIVE
                                </div>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <p className="text-3xl font-black text-white tracking-tighter italic">{stat.value}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Intensity Analysis</h3>
                            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Real-time load tracking</p>
                        </div>
                        <div className="flex items-center gap-2 text-lime-400 text-[10px] font-black bg-lime-400/10 px-3 py-1.5 rounded-full border border-lime-400/20">
                            <ArrowUpRight className="w-3 h-3" />
                            <span>+15.2% VOL</span>
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#bef264" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#bef264" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#334155"
                                    fontSize={10}
                                    fontWeight="bold"
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#020617", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px" }}
                                    itemStyle={{ color: "#bef264", fontWeight: "bold" }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#bef264"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <div className="flex flex-col h-full">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight mb-6 text-center">Elite Rank</h3>
                        <div className="flex-1 flex flex-col items-center justify-center relative">
                            <div className="w-32 h-32 rounded-full border-4 border-lime-400/20 flex items-center justify-center relative shadow-[0_0_50px_rgba(190,242,100,0.1)]">
                                <span className="text-5xl font-black text-lime-400 italic">42</span>
                                <div className="absolute -bottom-2 bg-lime-400 text-black px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest italic">BRONZE II</div>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Top 12% of athletes</p>
                                <p className="text-[10px] text-lime-400 font-black uppercase tracking-tight">Next Rank: Silver (250 XP)</p>
                            </div>
                        </div>
                        <Button variant="outline" className="w-full mt-6 text-xs gap-2">
                            <span>View Leaderboard</span>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Recent Sessions</h3>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest underline cursor-pointer hover:text-white transition-colors">View All</span>
                    </div>
                    <div className="space-y-3">
                        {[
                            { type: "Chest & Triceps", time: "45 min", kcal: "450", date: "TODAY" },
                            { type: "Leg Power Path", time: "60 min", kcal: "720", date: "YESTERDAY" },
                            { type: "Full Back Focus", time: "50 min", kcal: "510", date: "24 OCT" },
                        ].map((workout, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-lime-400/20 hover:bg-white/[0.04] transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
                                        <Zap className={cn("w-5 h-5", i === 0 ? "text-lime-400 fill-current" : "text-slate-600")} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm uppercase tracking-tight group-hover:text-lime-400 transition-colors">{workout.type}</h4>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{workout.date} • {workout.time}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-black text-white italic">{workout.kcal} KCAL</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">Achievements</h3>
                        <Trophy className="w-5 h-5 text-lime-400" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className={cn("aspect-square rounded-2xl border flex items-center justify-center transition-all", i < 4 ? "bg-lime-400/5 border-lime-400/20" : "bg-white/[0.01] border-white/5 opacity-30 grayscale")}>
                                {i < 4 ? <Zap className="w-6 h-6 text-lime-400" /> : <div className="w-2 h-2 rounded-full bg-slate-800" />}
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-6 text-center italic">12 / 48 Unlockables Completed</p>
                </Card>
            </div>
        </div>
    );
}
