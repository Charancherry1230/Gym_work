"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Filter, Dumbbell, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Exercise {
    id: string;
    name: string;
    category: string;
    description: string;
    targetMuscles: string[];
    suggestedSets: number;
    suggestedReps: number;
}

export default function ExerciseLibrary() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    useEffect(() => {
        fetch("/api/exercises")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setExercises(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const categories = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Cardio"];

    const filteredExercises = exercises.filter((ex) => {
        const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
            ex.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "All" || ex.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    < Zap className="w-4 h-4 text-lime-400 fill-current" />
                    <p className="text-[10px] font-black text-lime-400 uppercase tracking-[0.2em]">Guided Library</p>
                </div>
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Exercise Library</h1>
                <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">Master your form with our elite movement database.</p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="FIND YOUR MOVEMENT..."
                        className="input-field pl-12 uppercase text-xs font-bold tracking-widest"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-4 w-full md:w-auto px-1 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={cn(
                                "px-5 py-2.5 rounded-full border transition-all text-[10px] font-black uppercase tracking-widest whitespace-nowrap",
                                selectedCategory === cat
                                    ? "bg-lime-400 border-lime-400 text-black shadow-[0_0_15px_rgba(190,242,100,0.3)]"
                                    : "bg-white/[0.03] border-white/5 text-slate-500 hover:text-white hover:bg-white/10"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 glass-card animate-pulse bg-white/[0.01]" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExercises.map((ex, idx) => (
                        <motion.div
                            key={ex.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Card className="h-full flex flex-col group hover:border-lime-400/30">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-2.5 bg-lime-400/10 rounded-xl">
                                        <Dumbbell className="w-5 h-5 text-lime-400" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-white/[0.03] rounded-full text-slate-500 group-hover:text-lime-400 group-hover:bg-lime-400/10 transition-colors border border-white/5">
                                        {ex.category}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 uppercase italic tracking-tight group-hover:text-lime-400 transition-colors uppercase">{ex.name}</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 mb-6 uppercase tracking-wide">{ex.description}</p>

                                <div className="mt-auto pt-5 border-t border-white/[0.03] flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        {ex.targetMuscles.slice(0, 2).map((m) => (
                                            <span key={m} className="text-[9px] font-black bg-slate-900 text-slate-500 px-2.5 py-1 rounded-lg uppercase tracking-wider border border-white/5">
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-600 group-hover:text-lime-400 group-hover:border-lime-400/30 transition-all">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            {!loading && filteredExercises.length === 0 && (
                <div className="text-center py-24 glass-card border-dashed">
                    <Zap className="w-12 h-12 text-slate-800 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm font-black uppercase tracking-[0.3em] italic">No movements detected in this sector.</p>
                </div>
            )}
        </div>
    );
}
