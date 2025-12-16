import React from "react";
import { Link } from "react-router-dom";
import { Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";

export default function ResetPassword() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="text-center space-y-4">
                    {/* Character Finn (Fox) Placeholder */}
                    <div className="mx-auto w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center text-3xl mb-2">
                        🦊
                    </div>
                    <h2 className="text-3xl font-bold text-white">New Password</h2>
                    <p className="text-gray-400">Make it strong and memorable!</p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-6">
                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                        <Input
                            type="password"
                            placeholder="New Password"
                            className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                        />
                    </div>

                    {/* Password Strength Meter (Simulated) */}
                    <div className="space-y-2">
                        <div className="flex gap-1 h-1.5 w-full">
                            <div className="flex-1 rounded-full bg-red-400" />
                            <div className="flex-1 rounded-full bg-yellow-400" />
                            <div className="flex-1 rounded-full bg-gray-700" />
                        </div>
                        <p className="text-xs text-right text-yellow-400 font-medium">Medium Strength</p>
                    </div>

                    {/* Requirements Checklist */}
                    <div className="space-y-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2 text-[#4ADE80]">
                            <Check className="h-4 w-4" /> <span>At least 8 characters</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border border-gray-600" /> <span>One uppercase letter</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border border-gray-600" /> <span>One number</span>
                        </div>
                    </div>

                    <Link to="/auth/login" className="block">
                        <Button className="w-full h-12 bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all">
                            RESET PASSWORD
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
