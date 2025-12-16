import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "./AuthLayout";

export default function VerifySuccess() {
    return (
        <AuthLayout>
            <div className="text-center space-y-8 animate-in zoom-in duration-500">
                {/* Celebration Header */}
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-green-500/30 blur-3xl animate-pulse" />
                    <CheckCircle2 className="relative z-10 w-24 h-24 text-[#4ADE80] mx-auto drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />

                    {/* Floating Particles (Simulated Confetti) */}
                    <Star className="absolute top-0 right-0 text-yellow-400 w-6 h-6 animate-bounce" />
                    <Trophy className="absolute bottom-0 left-0 text-purple-400 w-6 h-6 animate-pulse" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-[#A78BFA] via-[#F472B6] to-[#4ADE80] bg-clip-text text-transparent">
                        Success!
                    </h1>
                    <p className="text-xl text-gray-300">
                        Your account is verified and<br />ready for adventure!
                    </p>
                </div>

                {/* Mascots Gathering (Placeholders) */}
                <div className="flex justify-center gap-4 text-4xl py-4 grayscale-0 filter drop-shadow-lg">
                    <span className="animate-bounce delay-0">🦉</span>
                    <span className="animate-bounce delay-100">🦊</span>
                    <span className="animate-bounce delay-200">🐲</span>
                    <span className="animate-bounce delay-300">👽</span>
                    <span className="animate-bounce delay-400">🐰</span>
                </div>

                <Link to="/" className="block pt-4">
                    <Button
                        className="w-full h-16 text-2xl font-bold bg-gradient-to-r from-[#A78BFA] to-[#F472B6] hover:opacity-90 text-white rounded-2xl shadow-[0_8px_0_rgba(0,0,0,0.3)] shadow-purple-900 active:shadow-none active:translate-y-[8px] transition-all"
                    >
                        START EXPLORING
                    </Button>
                </Link>
            </div>
        </AuthLayout>
    );
}
