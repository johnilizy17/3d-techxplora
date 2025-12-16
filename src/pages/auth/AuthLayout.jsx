import React from "react";
import ThreeErrorBoundary from "@/components/3d/ErrorBoundary";

const Scene = React.lazy(() => import("@/components/3d/Scene"));
const HeroExamples = React.lazy(() => import("@/components/3d/HeroExamples"));

export default function AuthLayout({ children }) {
    return (
        <div className="relative min-h-screen w-full overflow-y-auto font-sans text-white bg-[#030014]">
            {/* 3D Background - Fixed position */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#030014_100%)] opacity-80" />
                <React.Suspense fallback={<div className="w-full h-full bg-[#030014]" />}>
                    <ThreeErrorBoundary>
                        <Scene>
                            <HeroExamples />
                        </Scene>
                    </ThreeErrorBoundary>
                </React.Suspense>
                {/* Deep Space Overlay */}
                <div className="absolute inset-0 bg-black/40" />
                {/* Floating Particles/Orbs (CSS-only decoration) */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex min-h-screen items-center justify-center p-4 py-20">
                <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
                    {children}
                </div>
            </div>
        </div>
    );
}
