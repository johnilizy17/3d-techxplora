import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Check, Loader2, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { clearTemporaryVerification } from "@/redux/slices/authSlice";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";

const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function ResetPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { tempVerification } = useSelector((state) => state.auth);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token && !tempVerification?.code) {
            toast({
                title: "Invalid Access",
                description: "No reset token found. Please request a new link.",
                variant: "destructive",
            });
            navigate("/auth/forgot-password");
        }
    }, [token, tempVerification, navigate]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const passwordValue = watch("password", "");

    const requirements = [
        { label: "At least 8 characters", met: passwordValue.length >= 8 },
        { label: "One uppercase letter", met: /[A-Z]/.test(passwordValue) },
        { label: "One number", met: /[0-9]/.test(passwordValue) },
    ];

    const onSubmit = async (data) => {
        try {
            await resetPassword({
                token: token || tempVerification?.code,
                password: data.password,
                password_confirmation: data.confirmPassword,
            }).unwrap();

            toast({
                title: "Password Reset Successfully",
                description: "You can now log in with your new password.",
            });

            setIsSuccess(true);
            dispatch(clearTemporaryVerification());

            setTimeout(() => {
                navigate("/auth/login");
            }, 3000);

        } catch (error) {
            console.error("Reset password error:", error);
            toast({
                title: "Reset Failed",
                description: error?.data?.message || "Could not reset password. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-8 max-w-md mx-auto py-10">
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="mx-auto w-24 h-24 bg-orange-500/10 rounded-[2rem] flex items-center justify-center text-5xl mb-4 border border-orange-500/20 shadow-2xl">
                        🦊
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-4xl font-extrabold text-white tracking-tight italic uppercase">New <span className="text-orange-400">Identity?</span></h2>
                        <p className="text-gray-400 text-lg font-medium italic">
                            Secure your portal with a <br />
                            <span className="text-white font-bold tracking-wide">Heavy-Duty Secret</span>
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="p-8 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8 relative overflow-hidden group">
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-500/10 blur-3xl rounded-full" />

                    {isSuccess ? (
                        <div className="text-center py-10 space-y-6">
                            <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                                <CheckCircle2 size={40} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-white italic uppercase">Access Granted!</h3>
                                <p className="text-gray-400 font-medium italic">Password updated. Redirecting to login hub...</p>
                            </div>
                            <Loader2 className="h-6 w-6 animate-spin mx-auto text-orange-400" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                            <div className="space-y-2">
                                <Label className="text-gray-400 ml-2 font-black uppercase tracking-widest text-[10px] italic">New Password</Label>
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within/input:text-orange-400 transition-colors" />
                                    <Input
                                        {...register("password")}
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 rounded-2xl transition-all font-bold italic"
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-xs text-red-400 ml-2 font-bold italic">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-400 ml-2 font-black uppercase tracking-widest text-[10px] italic">Confirm Secret</Label>
                                <div className="relative group/input">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within/input:text-orange-400 transition-colors" />
                                    <Input
                                        {...register("confirmPassword")}
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 focus:border-orange-400 focus:ring-4 focus:ring-orange-400/20 rounded-2xl transition-all font-bold italic"
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-400 ml-2 font-bold italic">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            {/* Requirements Checklist */}
                            <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-3">
                                {requirements.map((req, idx) => (
                                    <div key={idx} className={cn("flex items-center gap-2 text-xs font-bold italic transition-colors", req.met ? "text-emerald-400" : "text-gray-500")}>
                                        {req.met ? <CheckCircle2 size={14} /> : <div className="w-3.5 h-3.5 rounded-full border border-current" />}
                                        <span>{req.label}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 text-lg bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-[0_8px_0_#c2410c] active:shadow-none active:translate-y-[8px] transition-all flex items-center justify-center gap-3 uppercase tracking-widest italic"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-7 w-7 animate-spin" />
                                ) : (
                                    <>
                                        Reset Password
                                        <ShieldAlert className="h-6 w-6" />
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </div>

                {/* Decoration */}
                <div className="flex items-center justify-center gap-2 opacity-50">
                    <Sparkles className="h-4 w-4 text-orange-400" />
                    <p className="text-[10px] font-bold tracking-[.3em] uppercase text-gray-400 italic">Encryption Protocols Verified</p>
                    <Sparkles className="h-4 w-4 text-orange-400" />
                </div>
            </div>
        </AuthLayout>
    );
}
