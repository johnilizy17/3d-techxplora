import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "./AuthLayout";

export default function Start() {
    return (
        <AuthLayout>
            <div className="text-center space-y-8">
                {/* Character Mascot Placeholder */}
                <div className="relative w-48 h-48 mx-auto animate-bounce-slow">
                    {/* In a real implementation, this would be the 3D model/image of Luna the Owl */}
                    <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl" />
                    <div className="relative flex items-center justify-center w-full h-full">
                        <span className="text-6xl">🦉</span>
                    </div>
                </div>

                {/* Header */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]">
                        Techxplora
                    </h1>
                    <p className="text-lg text-gray-300">
                        Start your journey into the<br />digital Quiz
                    </p>
                </div>

                {/* Buttons */}
                <div className="space-y-4 pt-4">
                    <Link to="/auth/signup" className="block w-full">
                        <Button
                            className="w-full h-14 text-xl font-bold bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] rounded-2xl shadow-[0_6px_0_#15803d] hover:shadow-[0_8px_0_#15803d] translate-y-0 hover:-translate-y-1 active:shadow-none active:translate-y-[6px] transition-all duration-200"
                        >
                            GET STARTED
                        </Button>
                    </Link>

                    <Link to="/auth/login" className="block w-full">
                        <Button
                            variant="outline"
                            className="w-full h-14 text-xl font-bold bg-white/5 border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 rounded-2xl backdrop-blur-sm transition-all duration-200"
                        >
                            I ALREADY HAVE AN ACCOUNT
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
