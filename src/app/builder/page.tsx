"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Save, Dumbbell, Zap, ChevronRight, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Exercise {
    id: string;
    name: string;
}

interface WorkoutItem {
    id: string;
    exerciseId: string;
    name: string;
    sets: number;
    reps: number;
    weight: number;
}

export default function WorkoutBuilder() {
    const [workoutName, setWorkoutName] = useState("NEW POWER SYSTEM");
    const [items, setItems] = useState<WorkoutItem[]>([]);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/exercises")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setExercises(data);
            });
    }, []);

    const addExercise = () => {
        const newItem: WorkoutItem = {
            id: Math.random().toString(36).substr(2, 9),
            exerciseId: exercises[0]?.id || "",
            name: exercises[0]?.name || "Select Exercise",
            sets: 3,
            reps: 10,
            weight: 0,
        };
        setItems([...items, newItem]);
    };

    const updateItem = (id: string, field: keyof WorkoutItem, value: any) => {
        setItems(items.map((item) => {
            if (item.id === id) {
                if (field === "exerciseId") {
                    const ex = exercises.find(e => e.id === value);
                    return { ...item, exerciseId: value, name: ex?.name || "" };
                }
                return { ...item, [field]: value };
            }
            return item;
        }));
    };

    const removeItem = (id: string) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const saveWorkout = async () => {
        if (items.length === 0) return;
        setLoading(true);

        try {
            const res = await fetch("/api/workouts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: workoutName,
                    exercises: items.map(item => ({
                        exerciseId: item.exerciseId,
                        sets: parseInt(item.sets.toString()),
                        reps: parseInt(item.reps.toString()),
                        weight: parseFloat(item.weight.toString()),
                    }))
                }),
            });

            if (res.ok) {
                router.push("/workouts");
            }
        } catch (error) {
            console.error("Failed to save workout");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Command className="w-4 h-4 text-lime-400" />
                        <p className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">System Architect</p>
                    </div>
                    <input
                        type="text"
                        className="bg-transparent border-none text-5xl font-black text-white outline-none focus:ring-0 w-full p-0 tracking-tighter uppercase italic"
                        value={workoutName}
                        onChange={(e) => setWorkoutName(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" className="text-xs tracking-widest" onClick={() => router.back()}>Discard</Button>
                    <Button onClick={saveWorkout} disabled={loading || items.length === 0} className="flex items-center gap-2 h-14 px-8">
                        <Save className="w-5 h-5" />
                        <span className="text-xs">{loading ? "PROCESS..." : "GENERATE"}</span>
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="py-32 text-center glass-card border-dashed">
                        <div className="w-20 h-20 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Dumbbell className="w-10 h-10 text-slate-800" />
                        </div>
                        <p className="text-slate-500 mb-8 font-black uppercase tracking-[0.2em] italic text-sm">Sequence engine offline. Add movement modules.</p>
                        <Button variant="outline" onClick={addExercise} className="flex items-center gap-3 mx-auto px-8">
                            <Plus className="w-5 h-5" />
                            <span>Initialize Module</span>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 px-1">
                        <AnimatePresence mode="popLayout">
                            {items.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Card className="relative group p-8 overflow-visible">
                                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-lime-400 rounded-full shadow-[0_0_15px_rgba(190,242,100,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
                                            <div className="md:col-span-5">
                                                <label className="text-[10px] uppercase font-black text-slate-600 mb-3 block tracking-widest">Movement Module</label>
                                                <select
                                                    className="input-field py-3 text-xs font-bold appearance-none cursor-pointer"
                                                    value={item.exerciseId}
                                                    onChange={(e) => updateItem(item.id, "exerciseId", e.target.value)}
                                                >
                                                    {exercises.map((ex) => (
                                                        <option key={ex.id} value={ex.id} className="bg-slate-950 text-white">{ex.name.toUpperCase()}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] uppercase font-black text-slate-600 mb-3 block tracking-widest text-center">Sets</label>
                                                <input
                                                    type="number"
                                                    className="input-field py-3 text-center text-xs font-black"
                                                    value={item.sets}
                                                    onChange={(e) => updateItem(item.id, "sets", e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] uppercase font-black text-slate-600 mb-3 block tracking-widest text-center">Reps</label>
                                                <input
                                                    type="number"
                                                    className="input-field py-3 text-center text-xs font-black"
                                                    value={item.reps}
                                                    onChange={(e) => updateItem(item.id, "reps", e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="text-[10px] uppercase font-black text-slate-600 mb-3 block tracking-widest text-center">Load (KG)</label>
                                                <input
                                                    type="number"
                                                    step="0.5"
                                                    className="input-field py-3 text-center text-xs font-black text-lime-400"
                                                    value={item.weight}
                                                    onChange={(e) => updateItem(item.id, "weight", e.target.value)}
                                                />
                                            </div>
                                            <div className="md:col-span-1 flex justify-end pb-1">
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-800 hover:text-red-500 transition-colors p-2 bg-white/[0.01] rounded-xl hover:bg-red-500/5 border border-transparent hover:border-red-500/20"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <button
                            onClick={addExercise}
                            className="w-full py-6 rounded-3xl border-2 border-dashed border-white/[0.03] hover:border-lime-400/30 hover:bg-lime-400/[0.02] transition-all text-slate-700 hover:text-lime-400 font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 mt-8"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Module Component</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="fixed bottom-12 right-12 z-50">
                <Button
                    size="lg"
                    onClick={saveWorkout}
                    disabled={loading || items.length === 0}
                    className="shadow-[0_10px_40px_-10px_rgba(190,242,100,0.5)] pr-12 pl-10 gap-4 h-16 rounded-3xl"
                >
                    <Zap className="w-6 h-6 fill-current" />
                    <span className="text-sm font-black tracking-[0.2em] italic">ACTIVATE SYSTEM</span>
                </Button>
            </div>
        </div>
    );
}
