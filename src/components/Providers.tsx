"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Sidebar } from "./layout/Sidebar";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/";

    return (
        <SessionProvider>
            {!isAuthPage ? (
                <div className="flex">
                    <Sidebar />
                    <main className="flex-1 ml-64 min-h-screen bg-slate-950 p-8">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            ) : (
                children
            )}
        </SessionProvider>
    );
}
