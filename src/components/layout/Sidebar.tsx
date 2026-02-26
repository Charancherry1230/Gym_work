"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Dumbbell,
    Library,
    LineChart,
    User,
    LogOut,
    PlusCircle,
    Zap
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Workouts", href: "/workouts", icon: Dumbbell },
    { label: "Exercises", href: "/exercises", icon: Library },
    { label: "Progress", href: "/progress", icon: LineChart },
    { label: "Profile", href: "/profile", icon: User },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-white/5 flex flex-col p-4 z-50">
            <div className="mb-10 px-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-lime-400 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-black" />
                </div>
                <h1 className="text-2xl font-black text-gradient tracking-tighter italic">GYM PRO</h1>
            </div>

            <nav className="flex-1 space-y-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "nav-item",
                            pathname === item.href && "active"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-semibold uppercase text-xs tracking-wider">{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto space-y-4">
                <Link
                    href="/builder"
                    className="flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-lime-400 text-black font-black uppercase tracking-widest text-sm transition-all hover:bg-lime-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px] shadow-lime-400/30"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Quick Start</span>
                </Link>

                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="nav-item w-full text-left bg-transparent border-none text-red-400/50 hover:text-red-400 hover:bg-red-400/5 mt-2"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-bold uppercase text-[10px] tracking-widest">Logout</span>
                </button>
            </div>
        </div>
    );
};
