"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Dumbbell, Calendar, Play, ListFilter, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";


interface Workout {
    id: string;
    name: string;
    createdAt: string;
    exercises: {
        exercise: { name: string };
        sets: number;
        reps: number;
    }[];
}

export default function WorkoutsPage() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/workouts")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setWorkouts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4 text-lime-400 fill-current" />
                        <p className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">Personal Protocols</p>
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Your Routines</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">Ready for deployment. Select your target system.</p>
                </div>
                <Link href="/builder">
                    <Button className="flex items-center gap-3 h-14 px-8 rounded-2xl group shadow-[0_0_20px] shadow-lime-400/20">
                        <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
                        <span className="text-xs font-black tracking-widest">ADD NEW PLAN</span>
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-56 glass-card animate-pulse bg-white/[0.01]" />
                    ))
                ) : workouts.length === 0 ? (
                    <div className="md:col-span-2 py-32 text-center glass-card border-dashed">
                        <div className="w-16 h-16 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Dumbbell className="w-8 h-8 text-slate-800" />
                        </div>
                        <p className="text-slate-500 mb-8 font-black uppercase tracking-[0.2em] italic text-sm text-center">No active protocols detected. Initialize your first plan.</p>
                        <Link href="/builder">
                            <Button variant="outline" className="px-10">Start Development</Button>
                        </Link>
                    </div>
                ) : (
                    workouts.map((workout, idx) => (
                        <motion.div
                            key={workout.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="group hover:border-lime-400/30 p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-white group-hover:text-lime-400 transition-colors uppercase italic tracking-tight leading-none mb-2">
                                            {workout.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-slate-600 text-[9px] font-black uppercase tracking-widest px-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(workout.createdAt).toLocaleDateString()} • ENCRYPTED</span>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white/[0.03] rounded-2xl border border-white/5 group-hover:border-lime-400/20 transition-colors">
                                        <Dumbbell className="w-6 h-6 text-slate-700 group-hover:text-lime-400 transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-3 mb-10 px-1">
                                    {workout.exercises.slice(0, 3).map((ex, i) => (
                                        <div key={i} className="flex items-center justify-between text-xs font-bold border-b border-white/[0.03] pb-2 last:border-0 uppercase tracking-wide">
                                            <span className="text-slate-500 group-hover:text-slate-300 transition-colors">{ex.exercise.name}</span>
                                            <span className="text-lime-400 font-black italic">{ex.sets} × {ex.reps}</span>
                                        </div>
                                    ))}
                                    {workout.exercises.length > 3 && (
                                        <p className="text-[9px] text-slate-700 font-black uppercase tracking-[0.2em] italic mt-4">+ {workout.exercises.length - 3} EXTENSIONS PENDING</p>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="primary" className="flex-1 h-12 rounded-xl gap-3 text-[10px] font-black tracking-[0.2em] group-hover:shadow-[0_0_20px] group-hover:shadow-lime-400/25">
                                        <Play className="w-4 h-4 fill-current" />
                                        <span>LAUNCH SYSTEM</span>
                                    </Button>
                                    <Button variant="outline" className="w-12 h-12 p-0 rounded-xl flex items-center justify-center border-white/10 hover:border-lime-400/30">
                                        <ListFilter className="w-4 h-4 text-slate-600 group-hover:text-lime-400 transition-colors" />
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
