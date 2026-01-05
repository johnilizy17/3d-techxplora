import React from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";
import GoogleIcon from "@/components/icons/GoogleIcon"; // Assuming this exists from Auth.jsx

export default function Signup() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Header with Progress */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-[#A78BFA] shadow-[0_0_10px_#A78BFA]" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                        <div className="w-3 h-3 rounded-full bg-white/20" />
                    </div>

                    {/* Character Peeking */}
                    <div className="mx-auto w-16 h-16 bg-green-400/20 rounded-full flex items-center justify-center text-3xl mb-2">
                        👋
                    </div>

                    <h2 className="text-3xl font-bold text-white">Create your profile</h2>
                </div>

                {/* Glass Card Form */}
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                    <form className="space-y-5">
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                            <Input
                                placeholder="Name"
                                className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                            <Input
                                type="email"
                                placeholder="Email"
                                className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                            <Input
                                type="password"
                                placeholder="Password"
                                className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <CheckCircle2 className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                            />
                        </div>

                        <Link to="/auth/phone" className="block">
                            <Button className="w-full h-12 mt-2 bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all">
                                CREATE ACCOUNT
                            </Button>
                        </Link>
                    </form>

                    <div className="relative flex items-center py-6">
                        <div className="flex-grow border-t border-white/10"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">Or sign up with</span>
                        <div className="flex-grow border-t border-white/10"></div>
                    </div>

                    <Button variant="outline" className="w-full h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl">
                        <GoogleIcon className="mr-2 h-5 w-5" /> Google
                    </Button>
                </div>

                <div className="text-center">
                    <p className="text-gray-400">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="text-[#A78BFA] font-bold hover:underline hover:text-[#c4b5fd]">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
