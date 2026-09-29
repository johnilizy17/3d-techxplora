import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    ArrowRight,
    Loader2,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { useSendEmailMutation } from "@/redux/api/authApi";
import { setTemporaryVerification } from "@/redux/slices/authSlice";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const emailSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export default function PhoneVerify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [sendEmail, { isLoading }] = useSendEmailMutation();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: user?.email || "",
        }
    });

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const onSubmit = async (data) => {
        try {
            const code = generateOTP();
            await sendEmail({
                to: data.email,
                subject: "TechXplora Verification Code",
                message: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 10px;">
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 28px;">TechXplora</h1>
                        </div>
                        <div style="background: white; padding: 40px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <h2 style="color: #1f2937; margin-top: 0;">Verify Your Email</h2>
                            <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                                Hi! Thanks for signing up with TechXplora. To complete your registration, please use this verification code:
                            </p>
                            <div style="background: #f3f4f6; border: 2px dashed #9ca3af; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                                <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
                                <p style="font-size: 36px; font-weight: bold; color: #667eea; margin: 0; letter-spacing: 8px;">${code}</p>
                            </div>
                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                                This code will expire in <strong>10 minutes</strong>. If you didn't request this code, you can safely ignore this email.
                            </p>
                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                                    This is an automated message, please do not reply to this email.
                                </p>
                            </div>
                        </div>
                    </div>
                `
            }).unwrap();

            dispatch(setTemporaryVerification({
                code,
                type: 'email',
                email: data.email
            }));

            toast({
                title: "Code sent!",
                description: `A verification code has been sent to ${data.email}`,
            });

            navigate("/auth/otp?type=email");
        } catch (error) {
            toast({
                title: "Failed to send code",
                description: error?.data?.message || "Something went wrong. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-6 max-w-md mx-auto py-10">
                {/* Progress Indicators */}
                <div className="flex justify-center gap-2 mb-10">
                    <div className="w-12 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_15px_rgba(74,222,128,0.3)]" />
                    <div className="w-12 h-1.5 rounded-full bg-[#A78BFA] shadow-[0_0_15px_rgba(167,139,250,0.5)] animate-pulse" />
                    <div className="w-12 h-1.5 rounded-full bg-white/10" />
                </div>

                <div className="text-center space-y-4 mb-2">
                    <div className="mx-auto w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-4xl mb-4 border border-blue-500/20 shadow-2xl rotate-3 animate-bounce-slow">
                        ✉️
                    </div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">Verify Your Email</h2>
                    <p className="text-gray-400 text-lg font-medium">We'll send you a code to confirm it's really you!</p>
                </div>

                <div className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-6 sm:space-y-8 relative overflow-hidden group">
                    {/* Background glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#A78BFA]/10 blur-3xl rounded-full" />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 relative">
                        {/* Email Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">Email Address</label>
                            <div className="relative group/input">
                                <Mail className="absolute left-4 top-4 sm:top-5 h-5 sm:h-6 w-5 sm:w-6 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                <Input
                                    {...register("email")}
                                    type="email"
                                    placeholder="your.email@example.com"
                                    className={cn(
                                        "pl-12 sm:pl-14 h-14 sm:h-16 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-lg sm:text-xl font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl sm:rounded-2xl transition-all shadow-inner",
                                        errors.email && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                    )}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Info Box */}
                        <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-gray-300 leading-relaxed">
                                <p className="font-semibold text-white mb-1">Why do we need this?</p>
                                <p>We'll send a 6-digit code to your email to make sure it's really you. This keeps your account safe!</p>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 sm:h-16 text-lg sm:text-xl bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-black rounded-xl sm:rounded-2xl shadow-[0_6px_0_#15803d] sm:shadow-[0_8px_0_#15803d] active:shadow-none active:translate-y-[6px] sm:active:translate-y-[8px] transition-all flex items-center justify-center gap-3 uppercase tracking-widest group-hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <Loader2 className="h-7 w-7 animate-spin" />
                            ) : (
                                <>
                                    SEND CODE
                                    <ArrowRight className="h-6 w-6 group-active:translate-x-2 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-gray-500 text-sm font-medium px-4">
                    By continuing, you'll receive a one-time verification code at your email address. Check your inbox and spam folder!
                </p>
            </div>
        </AuthLayout>
    );
}
