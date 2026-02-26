"use client";

import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    User,
    Shield,
    Bell,
    Moon,
    Trash2,
    Edit3,
    Zap,
    Camera,
    ChevronRight,
    Settings,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const { data: session } = useSession();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="px-2">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-lime-400 fill-current" />
                    <p className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">Athlete Profile</p>
                </div>
                <h1 className="text-4xl font-black text-white uppercase italic tracking-tighter">Account Credentials</h1>
                <p className="text-slate-500 font-medium text-sm mt-1 uppercase tracking-wide">Manage your identity and system preferences.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="md:col-span-1 p-8 text-center flex flex-col items-center">
                    <div className="relative group mb-6">
                        <div className="w-32 h-32 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center relative overflow-hidden group-hover:border-lime-400/30 transition-all shadow-[0_0_30px_rgba(255,255,255,0.02)]">
                            {session?.user?.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-slate-800 group-hover:text-lime-400 transition-colors" />
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-lime-400 rounded-xl flex items-center justify-center text-black shadow-lg">
                            <Zap className="w-4 h-4 fill-current" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tight mb-1">{session?.user?.name || "Athlete One"}</h2>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 px-4 py-1.5 bg-white/[0.03] rounded-full border border-white/5">Elite Member</p>

                    <div className="w-full space-y-2 mt-4">
                        <Button variant="outline" className="w-full h-11 text-[10px] uppercase tracking-widest gap-2">
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit Profile</span>
                        </Button>
                    </div>
                </Card>

                {/* Settings Section */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="p-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Settings className="w-5 h-5 text-lime-400" />
                            <h3 className="text-lg font-black text-white uppercase italic tracking-tight">System Preferences</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: "Email Notifications", icon: Bell, status: "Active", color: "text-lime-400" },
                                { label: "Security: 2FA", icon: Shield, status: "System Standby", color: "text-slate-600" },
                                { label: "Dark Interface", icon: Moon, status: "Always On", color: "text-sky-400" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5 text-slate-600 group-hover:text-white transition-colors">
                                            <item.icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-white uppercase tracking-tight">{item.label}</p>
                                            <p className={cn("text-[9px] font-black uppercase tracking-widest mt-0.5", item.color)}>{item.status}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-800 group-hover:text-lime-400 transition-all" />
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-8 border-red-500/5">
                        <div className="flex items-center gap-3 mb-8">
                            <ShieldCheck className="w-5 h-5 text-red-400" />
                            <h3 className="text-lg font-black text-red-400/80 uppercase italic tracking-tight">Access Control</h3>
                        </div>
                        <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black text-white uppercase tracking-tight">Deactivate System</p>
                                <p className="text-[9px] text-red-400/60 font-black uppercase tracking-widest mt-0.5">Permanent account deletion</p>
                            </div>
                            <button className="p-3 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="py-12 px-8 glass-card bg-lime-400/5 border-lime-400/10 relative overflow-hidden group">
                <div className="absolute right-[-50px] top-[-50px] w-48 h-48 bg-lime-400/10 blur-3xl rounded-full" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-2">Upgrade to Pro Elite</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Unlock advanced telemetry, system records, and priority support.</p>
                    </div>
                    <Button size="lg" className="w-full md:w-auto h-14 px-10 rounded-2xl bg-lime-400 text-black font-black uppercase tracking-widest italic shadow-[0_0_30px_rgba(190,242,100,0.3)] hover:scale-105">
                        Go Elite
                    </Button>
                </div>
            </div>
        </div>
    );
}
