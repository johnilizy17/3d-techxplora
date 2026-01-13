import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Mail, Lock, Loader2, ArrowRight, AlertCircle, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import GoogleIcon from "@/components/icons/GoogleIcon";
import ThreeErrorBoundary from "@/components/3d/ErrorBoundary";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useLoginMutation } from "@/redux/api/authApi";
// import { publicRequest, setToken } from "@/api/integration";

const Scene = React.lazy(() => import("@/components/3d/Scene"));
const HeroExamples = React.lazy(() => import("@/components/3d/HeroExamples"));

const GOOGLE_CLIENT_ID = "965781692825-d9242mpmjtqqk5svl8hvsnu000hh1f2m.apps.googleusercontent.com"; // From v1 constants

// Login validation schema
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function AuthContent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading: isLoginLoading }] = useLoginMutation();

    const [isLoading, setIsLoading] = useState(false);
    const [authFeedback, setAuthFeedback] = useState(null);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleGoogleSuccess = async (tokenResponse) => {
        console.log("Google Success:", tokenResponse);
        setIsLoading(true);
        try {
            // Get Google User Info
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            const googleUser = await userInfoResponse.json();

            // Login with backend (mimicking logic from old/pages/auth/login.tsx:47)
            const loginData = {
                email: googleUser.email.trim().toLowerCase(),
                password: googleUser.sub + googleUser.given_name, // v1 Logic
            };
            const response = await login(loginData).unwrap();

            // Save credentials to Redux
            dispatch(setCredentials({
                user: response.data.user || response.data,
                token: response.data.token,
            }));

            // Show success alert
            setAuthFeedback({
                type: "success",
                message: "Login successful! Welcome back to the Techxplora.",
            });

            // Show success toast
            toast({
                title: "Login successful",
                description: "Welcome back to the Techxplora!",
            });

            // Redirect logic (based on accountable_type and verification)
            const userData = response.data.user || response.data;
            const accountableType = userData.accountable_type;
            const isVerified = userData.is_verified === 1;

            if (accountableType === "App\\Models\\Student") {
                navigate("/auth/option");
            } else if (accountableType === "App\\Models\\Teacher") {
                if (isVerified) {
                    navigate("/dashboard");
                } else {
                    // Unverified teachers go to phone verification
                    navigate("/auth/phone");
                }
            } else {
                // Fallback for other types
                navigate(isVerified ? "/dashboard" : "/auth/phone");
            }

        } catch (error) {
            console.error("Google verify error:", error);
            toast({
                title: "Google Login failed",
                description: error.response?.data?.message || "Could not verify with Google.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => {
            toast({ title: "Google Login failed", variant: "destructive" });
        }
    });

    const onSubmit = async (data) => {
        setAuthFeedback(null);
        try {
            const response = await login({
                email: data.email.trim().toLowerCase(),
                password: data.password,
            }).unwrap();

            // Save credentials to Redux
            dispatch(setCredentials({
                user: response.data.user || response.data,
                token: response.data.token,
            }));

            // Show success alert
            setAuthFeedback({
                type: "success",
                message: "Login successful! Welcome back to the Techxplora.",
            });

            // Show success toast
            toast({
                title: "Login successful",
                description: "Welcome back to the Techxplora!",
            });

            // Redirect logic (based on accountable_type and verification)
            const userData = response.data.user || response.data;
            const accountableType = userData.accountable_type;
            const isVerified = userData.is_verified === 1;

            if (accountableType === "App\\Models\\Student") {
                navigate("/auth/option");
            } else if (accountableType === "App\\Models\\Teacher") {
                if (isVerified) {
                    navigate("/dashboard");
                } else {
                    // Unverified teachers go to phone verification
                    navigate("/auth/phone");
                }
            } else {
                // Fallback for other types
                navigate(isVerified ? "/dashboard" : "/auth/phone");
            }

        } catch (error) {
            console.error("Login error details:", error);

            // Extract the most descriptive error message
            const errorMessage =
                error?.data?.message ||
                error?.data?.error ||
                error?.message ||
                "An unexpected error occurred. Please try again.";

            // Set auth feedback alert
            setAuthFeedback({
                type: "error",
                message: errorMessage,
            });

            toast({
                variant: "destructive",
                title: "Login failed",
                description: errorMessage,
            });
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-y-auto font-sans text-white">
            {/* 3D Background - Fixed position */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1520] to-[#0a0a0a]" />
                <React.Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
                    <ThreeErrorBoundary>
                        <Scene>
                            <HeroExamples />
                        </Scene>
                    </ThreeErrorBoundary>
                </React.Suspense>
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-black/60 pointer-events-none" />
            </div>

            {/* Auth Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center p-4 py-20">
                <div className="w-full max-w-md space-y-8">

                    {/* Header */}
                    <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-[#a6b1ff]/20 to-[#c7aff8]/20 backdrop-blur-xl border border-[#a6b1ff]/20 shadow-[0_0_50px_-12px_rgba(166,177,255,0.5)]">
                            <Sparkles className="h-8 w-8 text-[#a6b1ff]" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-400">
                            Enter your credentials to access your collection
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white/5 p-8 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all duration-300 hover:bg-white/10 animate-in fade-in zoom-in-95 duration-500 delay-150">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#a6b1ff]/20 via-[#c7aff8]/20 to-[#ffb585]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="space-y-6 relative">
                            {/* Auth Feedback Alert */}
                            {authFeedback && (
                                <Alert
                                    variant={authFeedback.type === "error" ? "destructive" : "default"}
                                    className={cn(
                                        "mb-4 animate-in fade-in slide-in-from-top-2 duration-300",
                                        authFeedback.type === "success" && "bg-green-500/10 border-green-500/20 text-green-400"
                                    )}
                                >
                                    {authFeedback.type === "error" ? (
                                        <AlertCircle className="h-4 w-4" />
                                    ) : (
                                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                                    )}
                                    <AlertTitle>
                                        {authFeedback.type === "error" ? "/authentication Error" : "Success"}
                                    </AlertTitle>
                                    <AlertDescription>
                                        {authFeedback.message}
                                    </AlertDescription>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setAuthFeedback(null);
                                        }}
                                        className="absolute right-3 top-3 p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity z-20 cursor-pointer"
                                        aria-label="Close alert"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </Alert>
                            )}

                            {/* Google Sign In */}
                            <Button
                                type="button"
                                onClick={() => loginWithGoogle()}
                                className="w-full h-12 bg-white text-black hover:bg-gray-100 font-medium rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
                                disabled={isLoading || isLoginLoading}
                            >
                                <GoogleIcon />
                                Continue with Google
                            </Button>

                            <div className="relative flex items-center py-2">
                                <div className="flex-grow border-t border-white/10"></div>
                                <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">Or continue with email</span>
                                <div className="flex-grow border-t border-white/10"></div>
                            </div>

                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-300 ml-1">Email</Label>
                                    <div className="relative group/input">
                                        <div className="absolute left-3 top-3 text-gray-400 group-focus-within/input:text-[#a6b1ff] transition-colors">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <Input
                                            {...form.register("email")}
                                            id="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="pl-10 h-12 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/20 rounded-xl transition-all"
                                            disabled={isLoading || isLoginLoading}
                                        />
                                    </div>
                                    {form.formState.errors.email && (
                                        <p className="text-xs text-red-400 ml-1">{form.formState.errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-gray-300 ml-1">Password</Label>
                                        <Link to="/auth/forgot-password" className="text-xs text-[#a6b1ff] hover:text-[#c7aff8] transition-colors">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative group/input">
                                        <div className="absolute left-3 top-3 text-gray-400 group-focus-within/input:text-[#a6b1ff] transition-colors">
                                            <Lock className="h-5 w-5" />
                                        </div>
                                        <Input
                                            {...form.register("password")}
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-10 h-12 bg-black/20 border-white/10 text-white placeholder:text-gray-500 focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/20 rounded-xl transition-all"
                                            disabled={isLoading || isLoginLoading}
                                        />
                                    </div>
                                    {form.formState.errors.password && (
                                        <p className="text-xs text-red-400 ml-1">{form.formState.errors.password.message}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="interactive halo-click relative w-full h-14 text-xl font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-[1.02] transition-all duration-300 shadow-[0_6px_0_#8b95cc] active:shadow-none active:translate-y-[6px]"
                                    disabled={isLoading || isLoginLoading}
                                >
                                    {isLoading || isLoginLoading ? (
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    ) : (
                                        <>
                                            <span className="relative z-10 tracking-wide">Sign In</span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <ArrowRight className="relative z-10 ml-2 h-5 w-5" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-400">
                            <span className="opacity-70">Don't have an account?</span>{" "}
                            <Link to="/auth/signup" className="font-medium text-[#c7aff8] hover:text-[#ffb585] transition-colors">
                                Join now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Auth() {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AuthContent />
        </GoogleOAuthProvider>
    );
}
