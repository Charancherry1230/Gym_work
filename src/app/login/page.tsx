"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const successMsg = searchParams?.get("success");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/dashboard");
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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-lime-500/5 blur-[120px] rounded-full -z-10" />

            <Card className="w-full max-w-md p-8 relative">
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0.8, rotate: -10 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-16 h-16 bg-lime-400 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(190,242,100,0.3)]"
                    >
                        <Zap className="w-10 h-10 text-black fill-current" />
                    </motion.div>

                    <h1 className="text-4xl font-black mb-2 text-gradient tracking-tighter uppercase italic">
                        Welcome Back
                    </h1>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Unleash your potential</p>
                </div>

                {successMsg && (
                    <div className="bg-lime-500/10 border border-lime-500/20 text-lime-400 p-3 rounded-xl mb-6 text-sm text-center font-bold">
                        {successMsg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest px-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="name@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 mb-2 uppercase tracking-widest px-1">Password</label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? "Authenticating..." : "Sign In to Gym Pro"}
                    </Button>
                </form>

                <p className="text-center mt-10 text-slate-500 font-medium text-xs uppercase tracking-widest">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-lime-400 hover:text-white transition-colors underline underline-offset-8">
                        Join the elite
                    </Link>
                </p>
            </Card>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-slate-800 text-[100px] font-black select-none pointer-events-none -z-20 leading-none whitespace-nowrap opacity-20 italic">
                GYM PRO ELITE TRAINING
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="w-16 h-16 border-4 border-lime-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
