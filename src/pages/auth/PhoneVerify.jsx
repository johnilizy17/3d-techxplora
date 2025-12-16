import React from "react";
import { Link } from "react-router-dom";
import { Smartphone, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";

export default function PhoneVerify() {
    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Progress */}
                <div className="flex justify-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                    <div className="w-3 h-3 rounded-full bg-[#A78BFA] shadow-[0_0_10px_#A78BFA]" />
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>

                <div className="text-center space-y-4">
                    {/* Character Zippy (Alien) Placeholder */}
                    <div className="mx-auto w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center text-3xl mb-2 animate-pulse">
                        👽
                    </div>
                    <h2 className="text-3xl font-bold text-white">Verify your phone</h2>
                    <p className="text-gray-400">We'll send you a confirmation code</p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-6">
                    {/* Phone Input Group */}
                    <div className="flex gap-3">
                        {/* Country Code Trigger */}
                        <div className="shrink-0">
                            <Button
                                variant="outline"
                                className="h-14 bg-black/30 border-white/10 text-white hover:bg-white/5 hover:border-[#A78BFA] transition-all rounded-xl gap-2 text-lg"
                            >
                                <span>🇺🇸 +1</span>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </div>

                        {/* Phone Number */}
                        <div className="relative flex-grow group">
                            <Smartphone className="absolute left-4 top-4 h-6 w-6 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                            <Input
                                type="tel"
                                placeholder="(555) 123-4567"
                                className="pl-12 h-14 bg-black/30 border-white/10 text-white placeholder:text-gray-500 text-lg focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                            />
                        </div>
                    </div>

                    <Link to="/auth/otp" className="block">
                        <Button className="w-full h-14 text-lg bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_6px_0_#15803d] active:shadow-none active:translate-y-[6px] transition-all">
                            SEND CODE
                        </Button>
                    </Link>

                    <div className="text-center pt-2">
                        <Link to="/auth/signup" className="text-sm text-[#A78BFA] hover:text-[#c4b5fd] hover:underline font-medium">
                            Verify with email instead
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
