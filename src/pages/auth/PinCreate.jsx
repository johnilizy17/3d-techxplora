import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "./AuthLayout";

export default function PinCreate() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex justify-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                    <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                    <div className="w-3 h-3 rounded-full bg-[#A78BFA] shadow-[0_0_10px_#A78BFA]" />
                </div>

                <div className="text-center space-y-4">
                    {/* Character Drake (Dragon) Placeholder */}
                    <div className="mx-auto w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-3xl mb-2">
                        🐲
                    </div>
                    <h2 className="text-3xl font-bold text-white">Create PIN</h2>
                    <p className="text-gray-400">Choose 4 digits to secure your collectibles</p>
                </div>

                <div className="p-8 pb-4 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    {/* DOTS Display */}
                    <div className="flex justify-center gap-6 mb-10">
                        <div className="w-6 h-6 rounded-full bg-[#A78BFA] shadow-[0_0_10px_#A78BFA]" />
                        <div className="w-6 h-6 rounded-full bg-[#A78BFA] shadow-[0_0_10px_#A78BFA]" />
                        <div className="w-6 h-6 rounded-full bg-white/10" />
                        <div className="w-6 h-6 rounded-full bg-white/10" />
                    </div>

                    {/* Number Pad */}
                    <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto mb-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button
                                key={num}
                                className="w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 shadow-[0_4px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-[4px] transition-all text-2xl font-bold text-white"
                            >
                                {num}
                            </button>
                        ))}
                        <div /> {/* Empty slot */}
                        <button className="w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 shadow-[0_4px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-[4px] transition-all text-2xl font-bold text-white flex items-center justify-center">
                            0
                        </button>
                        <button className="w-16 h-16 flex items-center justify-center text-red-400 hover:text-red-300">
                            ⌫
                        </button>
                    </div>

                    {/* Biometric Option */}
                    <div className="flex justify-center mt-6 pt-6 border-t border-white/10">
                        <button className="flex flex-col items-center gap-2 text-gray-400 hover:text-[#A78BFA] transition-colors">
                            <Fingerprint className="h-10 w-10 p-2 rounded-full border border-current" />
                            <span className="text-xs">Use FaceID</span>
                        </button>
                    </div>

                    {/* Success Link (Hidden/Simulated) */}
                    <div className="hidden">
                        <Link to="/auth/verify-success" id="pin-complete-link">Next</Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
