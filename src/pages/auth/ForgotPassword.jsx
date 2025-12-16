import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";

export default function ForgotPassword() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                <Link to="/auth/login" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-2">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Link>

                <div className="text-center space-y-4">
                    {/* Character Luna (Owl) Placeholder - Thinking */}
                    <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-3xl mb-2">
                        🤔
                    </div>
                    <h2 className="text-3xl font-bold text-white">Forgot password?</h2>
                    <p className="text-gray-400">No worries! We'll help you reset it.</p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-6">
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                        />
                    </div>

                    <Link to="/auth/reset-password" className="block">
                        <Button className="w-full h-12 bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all">
                            SEND RESET LINK
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
