"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (res.ok) {
                router.push("/login?success=Account created successfully");
            } else {
                const data = await res.json();
                setError(data.message || "Something went wrong");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/5 blur-[120px] rounded-full -z-10" />

            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                    >
                        <Zap className="w-8 h-8 text-lime-400" />
                    </motion.div>
                    <h1 className="text-4xl font-black mb-2 text-gradient tracking-tighter uppercase italic">
                        JOIN THE ELITE
                    </h1>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Start your transformation today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest px-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="JOHN DOE"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest px-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="NAME@EMAIL.COM"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest px-1">Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest px-1">Confirm Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center font-bold uppercase tracking-tight">{error}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full pt-4 pb-4 mt-4"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Begin Your Journey"}
                    </Button>
                </form>

                <p className="text-center mt-10 text-slate-500 font-medium text-xs uppercase tracking-widest">
                    Already a member?{" "}
                    <Link href="/login" className="text-lime-400 hover:text-white transition-colors underline underline-offset-8">
                        Sign In
                    </Link>
                </p>
            </Card>
        </div>
    );
}
