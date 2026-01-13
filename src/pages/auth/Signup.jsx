import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    User,
    Mail,
    Lock,
    CheckCircle2,
    ArrowRight,
    Eye,
    EyeOff,
    Loader2,
    AlertCircle,
    Check,
    GraduationCap,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import AuthLayout from "./AuthLayout";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { useDispatch } from "react-redux";
import { useRegisterStudentMutation, useRegisterTeacherMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";

const GOOGLE_CLIENT_ID = "965781692825-d9242mpmjtqqk5svl8hvsnu000hh1f2m.apps.googleusercontent.com";

// Signup validation schema
const signupSchema = z.object({
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    other_name: z.string().optional(),
    email: z.string().email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[a-z]/, "Must contain at least one lowercase letter")
        .regex(/[0-9]/, "Must contain at least one number"),
    password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match",
    path: ["password_confirmation"],
});

function SignupContent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // URL parameters detection
    const pageParam = searchParams.get("page");
    const codeParam = searchParams.get("code");

    const [registerStudent, { isLoading: isStudentLoading }] = useRegisterStudentMutation();
    const [registerTeacher, { isLoading: isTeacherLoading }] = useRegisterTeacherMutation();

    const [role, setRole] = useState("student"); // "student" or "teacher"
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [authFeedback, setAuthFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Sync role with URL parameters on mount
    useEffect(() => {
        if (codeParam) {
            setRole("teacher");
        } else if (pageParam === "3" || pageParam === "2") {
            setRole("teacher");
        }
    }, [pageParam, codeParam]);

    const isRegisterLoading = isStudentLoading || isTeacherLoading;

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            other_name: "",
            email: "",
            password: "",
            password_confirmation: "",
            is_branch: 0,
            xp: "0"
        },
    });

    const handleGoogleSuccess = async (tokenResponse) => {
        setIsLoading(true);
        try {
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            const googleUser = await userInfoResponse.json();

            // Porting v1 logic: password is sub + given_name
            const registrationData = {
                first_name: googleUser.given_name,
                last_name: googleUser.family_name || googleUser.name,
                other_name: googleUser.given_name,
                email: googleUser.email.trim().toLowerCase(),
                password: googleUser.sub + googleUser.given_name,
                password_confirmation: googleUser.sub + googleUser.given_name,
                xp: "0",
                is_branch: 0
            };

            let response;
            if (role === "teacher" || codeParam) {
                response = await registerTeacher({
                    ...registrationData,
                    is_admin: pageParam === "3",
                    admin_code: codeParam
                }).unwrap();
            } else {
                response = await registerStudent(registrationData).unwrap();
            }


            setAuthFeedback({
                type: "success",
                message: `Registration successful! Welcome as a ${role}.`,
            });

            toast({
                title: "Welcome!",
                description: "Your account has been created successfully.",
            });

            setTimeout(() => navigate("/auth/login"), 1500);

        } catch (error) {
            console.error("Google Signup error:", error);
            const errorMessage = error?.data?.message || "Could not complete signup with Google.";
            setAuthFeedback({ type: "error", message: errorMessage });
            toast({
                title: "Google Signup failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const signupWithGoogle = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => {
            toast({ title: "Google Signup failed", variant: "destructive" });
        }
    });

    const onSubmit = async (data) => {
        setAuthFeedback(null);
        try {
            const registrationData = {
                ...data,
                email: data.email.trim().toLowerCase(),
                xp: "0",
                is_branch: 0
            };

            let response;
            if (role === "teacher" || codeParam) {
                response = await registerTeacher({
                    ...registrationData,
                    is_admin: pageParam === "3",
                    admin_code: codeParam
                }).unwrap();
            } else {
                response = await registerStudent(registrationData).unwrap();
            }


            setAuthFeedback({
                type: "success",
                message: "Account created successfully! Redirecting...",
            });

            toast({
                title: "Registration successful",
                description: `Welcome to Techxplora as a ${role}!`,
            });

            setTimeout(() => navigate("/auth/login"), 1500);

        } catch (error) {
            console.error("Signup error:", error);
            const errorMessage = error?.data?.message || error?.message || "Registration failed. Please try again.";
            setAuthFeedback({ type: "error", message: errorMessage });
            toast({
                variant: "destructive",
                title: "Registration failed",
                description: errorMessage,
            });
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center gap-2 mb-6">
                        <div className={cn("w-3 h-3 rounded-full transition-all duration-500", role === "student" ? "bg-[#A78BFA] shadow-[0_0_10px_#A78BFA]" : "bg-white/20")} />
                        <div className={cn("w-3 h-3 rounded-full transition-all duration-500", role === "teacher" ? "bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]" : "bg-white/20")} />
                    </div>

                    <div className="mx-auto w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-3xl mb-2">
                        {role === "student" ? "🎓" : "👨‍🏫"}
                    </div>

                    <h2 className="text-3xl font-bold text-white tracking-tight">Create your profile</h2>
                    <p className="text-gray-400">Join the explorer's community</p>
                </div>

                {/* Role Switcher - Disable if forced by code or page param */}
                <div className={cn(
                    "flex p-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-[320px] mx-auto overflow-hidden",
                    (codeParam || pageParam) && "opacity-50 pointer-events-none"
                )}>
                    <button
                        onClick={() => setRole("student")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-300 font-medium",
                            role === "student"
                                ? "bg-white/10 text-[#A78BFA] shadow-[0_0_20px_rgba(167,139,250,0.1)]"
                                : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        <GraduationCap className="h-4 w-4" />
                        Student
                    </button>
                    <button
                        onClick={() => setRole("teacher")}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all duration-300 font-medium",
                            role === "teacher"
                                ? "bg-white/10 text-[#4ADE80] shadow-[0_0_20px_rgba(74,222,128,0.1)]"
                                : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        <Shield className="h-4 w-4" />
                        Teacher
                    </button>
                </div>

                {/* Glass Card Form */}
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                    {/* Glow effect */}
                    <div className={cn(
                        "absolute -inset-1 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                        role === "student" ? "bg-gradient-to-r from-[#A78BFA]/10 to-transparent" : "bg-gradient-to-r from-[#4ADE80]/10 to-transparent"
                    )} />

                    <div className="relative space-y-6">
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
                                    {authFeedback.type === "error" ? "Error" : "Success"}
                                </AlertTitle>
                                <AlertDescription>
                                    {authFeedback.message}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="button"
                            onClick={() => signupWithGoogle()}
                            className="w-full h-12 bg-white text-black hover:bg-gray-100 font-medium rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
                            disabled={isLoading || isRegisterLoading}
                        >
                            <GoogleIcon />
                            Sign up with Google
                        </Button>

                        <div className="relative flex items-center py-2">
                            <div className="flex-grow border-t border-white/10"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">Or register with email</span>
                            <div className="flex-grow border-t border-white/10"></div>
                        </div>

                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-400 ml-1">First Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                                        <Input
                                            {...form.register("first_name")}
                                            placeholder="Azusa"
                                            className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                                        />
                                    </div>
                                    {form.formState.errors.first_name && (
                                        <p className="text-xs text-red-400 ml-1">{form.formState.errors.first_name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-gray-400 ml-1">Last Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                                        <Input
                                            {...form.register("last_name")}
                                            placeholder="Nakano"
                                            className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                                        />
                                    </div>
                                    {form.formState.errors.last_name && (
                                        <p className="text-xs text-red-400 ml-1">{form.formState.errors.last_name.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-400 ml-1">Other Name (Optional)</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...form.register("other_name")}
                                        placeholder="Azusa"
                                        className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-400 ml-1">Email Address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...form.register("email")}
                                        type="email"
                                        placeholder="explorer@example.com"
                                        className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                                    />
                                </div>
                                {form.formState.errors.email && (
                                    <p className="text-xs text-red-400 ml-1">{form.formState.errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-400 ml-1">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...form.register("password")}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-12 pr-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {form.formState.errors.password && (
                                    <p className="text-xs text-red-400 ml-1">{form.formState.errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-400 ml-1">Confirm Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...form.register("password_confirmation")}
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="pl-12 pr-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {form.formState.errors.password_confirmation && (
                                    <p className="text-xs text-red-400 ml-1">{form.formState.errors.password_confirmation.message}</p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className={cn(
                                    "w-full h-14 mt-4 text-[#022c22] text-lg font-bold rounded-xl active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2",
                                    role === "student"
                                        ? "bg-[#A78BFA] hover:bg-[#8B5CF6] shadow-[0_4px_0_#6D28D9] text-white"
                                        : "bg-[#4ADE80] hover:bg-[#22c55e] shadow-[0_4px_0_#15803d]"
                                )}
                                disabled={isLoading || isRegisterLoading}
                            >
                                {isLoading || isRegisterLoading ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        {role === "student" ? "JOIN AS STUDENT" : "JOIN AS TEACHER"}
                                        <ArrowRight className="h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
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

export default function Signup() {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <SignupContent />
        </GoogleOAuthProvider>
    );
}
