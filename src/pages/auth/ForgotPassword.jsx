import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { setTemporaryVerification } from "@/redux/slices/authSlice";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";

const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [isSent, setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await forgotPassword(data.email).unwrap();

            // Logic from template: storing email and potentially code in temp storage
            // In v2 flow, we store it in tempVerification
            dispatch(setTemporaryVerification({
                email: data.email,
                code: response?.code, // Assuming backend might return a code or handled separately
                type: 'email'
            }));

            toast({
                title: "Reset Link Sent",
                description: "A password reset link has been sent to your email.",
            });

            setIsSent(true);
            // Following template redirect logic but to v2 OTP page

        } catch (error) {
            console.error("Forgot password error:", error);
            toast({
                title: "Request failed",
                description: error?.data?.message || "Could not process your request. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-8 max-w-md mx-auto py-10">
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-start mb-2">
                        <Link to="/auth/login" className="inline-flex items-center text-gray-500 hover:text-white transition-colors group">
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold uppercase tracking-wider text-xs">Back to Login</span>
                        </Link>
                    </div>

                    <div className="mx-auto w-24 h-24 bg-purple-500/10 rounded-[2rem] flex items-center justify-center text-5xl mb-4 border border-purple-500/20 shadow-2xl">
                        🦉
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-4xl font-extrabold text-white tracking-tight italic uppercase">Forgot <span className="text-[#A78BFA]">Password?</span></h2>
                        <p className="text-gray-400 text-lg font-medium italic">
                            No worries! Enter your email and we'll send you a <br />
                            <span className="text-white font-bold tracking-wide">Reset Link</span>
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8 relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#A78BFA]/10 blur-3xl rounded-full" />

                    {isSent ? (
                        <div className="text-center py-10 space-y-6">
                            <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white italic uppercase">Bounty Spotted!</h3>
                                <p className="text-gray-400 font-medium italic">Check your inbox for the secret transmission.</p>
                            </div>
                            <Loader2 className="h-6 w-6 animate-spin mx-auto text-[#A78BFA]" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                            <div className="space-y-3">
                                <Label className="text-gray-400 ml-2 font-black uppercase tracking-widest text-[10px] italic">Email Address</Label>
                                <div className="relative group/input">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...register("email")}
                                        type="email"
                                        placeholder="explorer@example.com"
                                        className="pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/20 rounded-2xl transition-all font-bold italic"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-400 ml-2 font-bold italic">{errors.email.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 text-lg bg-[#A78BFA] hover:bg-[#8B5CF6] text-white font-black rounded-2xl shadow-[0_8px_0_#6D28D9] active:shadow-none active:translate-y-[8px] transition-all flex items-center justify-center gap-3 uppercase tracking-widest italic"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-7 w-7 animate-spin" />
                                ) : (
                                    <>
                                        Continue
                                        <ArrowLeft className="h-6 w-6 rotate-180" />
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Decoration */}
                <div className="flex items-center justify-center gap-2 opacity-50">
                    <Sparkles className="h-4 w-4 text-[#A78BFA]" />
                    <p className="text-[10px] font-bold tracking-[.3em] uppercase text-gray-400 italic">Secure Protocol Initialized</p>
                    <Sparkles className="h-4 w-4 text-[#A78BFA]" />
                </div>
            </div>
        </AuthLayout>
    );
}
