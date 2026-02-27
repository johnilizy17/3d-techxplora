import React from "react";
import VisualBackground from "@/components/collectors/VisualBackground";

export default function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen w-full overflow-y-auto font-sans text-foreground bg-background transition-colors duration-300">
            {/* 3D Background - Fixed position */}
            <VisualBackground />

            {/* Content Container */}
            <div className="relative z-10 flex min-h-screen items-center justify-center p-4 py-20">
                <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
                    {children}
                </div>
            </div>
        </div>
    );
}
