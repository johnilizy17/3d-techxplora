import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Loader2, AlertCircle, HelpCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import AuthLayout from "./AuthLayout";
import { useVerifyAdminCodeMutation } from "@/redux/api/authApi";

const schema = z.object({
    code: z.string().min(1, "Admin code is required"),
});

export default function GroupCode() {
    const navigate = useNavigate();
    const [verifyCode, { isLoading }] = useVerifyAdminCodeMutation();
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        setError(null);
        try {
            const response = await verifyCode(data.code).unwrap();
            toast({
                title: "Code verified!",
                description: "Proceeding to verify school details.",
            });
            // Redirect to info page with the verified data
            navigate(`/auth/info`, {
                state: {
                    code: data.code,
                    schoolName: response.data?.profile_name || response.data?.name || "Verified School"
                }
            });
        } catch (err) {
            console.error("Verification error:", err);
            const message = err?.data?.message || err?.message || "Invalid admin code. Please try again.";
            setError(message);
            toast({
                variant: "destructive",
                title: "Verification failed",
                description: message,
            });
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-3xl mb-2">
                        🛡️
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                            Enter Admin Code
                            <HelpCircle className="h-5 w-5 text-gray-500 cursor-help" />
                        </h2>
                        <p className="text-gray-400">
                            Join your school to access your teacher dashboard
                        </p>
                    </div>
                </div>

                {/* Glass Card */}
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                    {/* Subtle glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#4ADE80]/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative space-y-6">
                        {error && (
                            <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-400">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-gray-400 ml-1">Admin Code</Label>
                                <div className="relative group">
                                    <Shield className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors" />
                                    <Input
                                        {...register("code")}
                                        placeholder="Enter your verification code"
                                        className="pl-12 h-14 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-xl transition-all text-lg tracking-wider"
                                    />
                                </div>
                                {errors.code && (
                                    <p className="text-xs text-red-400 ml-1">{errors.code.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] text-lg font-bold rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        VERIFY CODE
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="text-center pt-2">
                            <Link
                                to="/auth/signup"
                                className="text-gray-400 text-sm hover:text-white underline underline-offset-4 transition-colors"
                            >
                                I'm an Independent Learner
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-4">
                    <p className="text-gray-500 text-sm">
                        Need help? <Link to="/about" className="text-[#A78BFA] hover:underline">Contact Support</Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
