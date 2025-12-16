import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";

export default function OTPVerify() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Back button */}
                <Link to="/auth/phone" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Link>

                <div className="text-center space-y-4">
                    {/* Character Luna (Owl) Placeholder */}
                    <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-3xl mb-2 animate-bounce-slow">
                        🦉
                    </div>
                    <h2 className="text-3xl font-bold text-white">Enter code</h2>
                    <p className="text-gray-400">
                        We sent a code to <span className="text-white font-medium">+1 (555) ***-4567</span>
                    </p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-8">
                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Input
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-12 h-14 bg-black/40 border-white/10 text-center text-2xl font-bold text-white focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all p-0"
                            />
                        ))}
                    </div>

                    <div className="text-center">
                        <span className="text-[#A78BFA] font-mono text-xl font-bold">00:59</span>
                    </div>

                    <Link to="/auth/pin" className="block">
                        <Button className="w-full h-14 text-lg bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_6px_0_#15803d] active:shadow-none active:translate-y-[6px] transition-all">
                            VERIFY
                        </Button>
                    </Link>

                    <div className="text-center pt-2">
                        <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center w-full gap-2">
                            <RefreshCw className="h-4 w-4" /> Didn't receive code? Resend
                        </button>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
