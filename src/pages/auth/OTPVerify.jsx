import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, RefreshCw, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import {
    useUpdateTeacherMutation,
    useUpdateStudentMutation,
    useSendSMSMutation,
    useSendEmailMutation
} from "@/redux/api/authApi";
import { updateUser, clearTemporaryVerification } from "@/redux/slices/authSlice";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";

export default function OTPVerify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const type = searchParams.get("type") || "phone"; // 'email' or 'phone'

    const { user, tempVerification } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [timer, setTimer] = useState(59);

    const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const [updateTeacher] = useUpdateTeacherMutation();
    const [updateStudent] = useUpdateStudentMutation();
    const [sendSMS, { isLoading: isResendingSMS }] = useSendSMSMutation();
    const [sendEmail, { isLoading: isResendingEmail }] = useSendEmailMutation();

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 5) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        const data = e.clipboardData.getData("text");
        if (!/^\d{6}$/.test(data)) return;

        const digits = data.split("");
        setOtp(digits);
        inputRefs[5].current.focus();
    };

    const handleResend = async () => {
        if (timer > 0) return;

        try {
            // In a real app, generate a new code. For now, resend the same or generate new if needed.
            // Following v1 logic, we could just reuse tempVerification.code or generate a new one.
            const newCode = Math.floor(100000 + Math.random() * 900000).toString();

            if (type === "email") {
                await sendEmail({
                    to: user.email,
                    subject: "Techxplora Verification Code",
                    message: `<p>Your new verification code is: <strong>${newCode}</strong></p>`
                }).unwrap();
            } else {
                await sendSMS({
                    to: tempVerification.phone || user.phone_number,
                    code: newCode
                }).unwrap();
            }

            dispatch(updateUser({
                tempVerification: { ...tempVerification, code: newCode }
            }));

            setTimer(59);
            toast({
                title: "Code resent!",
                description: `A new verification code has been sent to your ${type}.`,
            });
        } catch (error) {
            toast({
                title: "Failed to resend code",
                description: "Please try again later.",
                variant: "destructive",
            });
        }
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) {
            toast({
                title: "Invalid code",
                description: "Please enter the full 6-digit code.",
                variant: "destructive",
            });
            return;
        }

        if (enteredOtp !== tempVerification.code) {
            toast({
                title: "Incorrect code",
                description: "The code you entered is incorrect. Please try again.",
                variant: "destructive",
            });
            return;
        }

        setIsVerifying(true);
        try {
            // Update user status in backend
            const isTeacher = user.accountable_type?.includes("Teacher") || user.role === "teacher";
            const updateFn = isTeacher ? updateTeacher : updateStudent;

            await updateFn({
                id: user.id,
                is_verified: 1,
                // If phone verification, also save the phone number
                ...(type === "phone" && tempVerification.phone ? { phone_number: tempVerification.phone } : {})
            }).unwrap();

            // Update local state
            dispatch(updateUser({ is_verified: 1 }));
            dispatch(clearTemporaryVerification());

            toast({
                title: "Verification successful!",
                description: "Welcome to Techxplora!",
            });

            navigate("/auth/verify-success");
        } catch (error) {
            console.error("Verification error:", error);
            toast({
                title: "Verification failed",
                description: error?.data?.message || "Could not complete verification.",
                variant: "destructive",
            });
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <AuthLayout>
            <div className="space-y-8 max-w-md mx-auto py-10">
                {/* Header Section */}
                <div className="text-center space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <Link to={type === "phone" ? "/auth/phone" : "/auth/verify"} className="inline-flex items-center text-gray-500 hover:text-white transition-colors group">
                            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold uppercase tracking-wider text-xs">Back</span>
                        </Link>
                        <div className="flex gap-1.5">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className={cn(
                                    "w-8 h-1 rounded-full px-2",
                                    i <= 3 ? "bg-[#4ADE80]" : "bg-white/10"
                                )} />
                            ))}
                        </div>
                    </div>

                    <div className="mx-auto w-24 h-24 bg-purple-500/10 rounded-[2rem] flex items-center justify-center text-5xl mb-4 border border-purple-500/20 shadow-2xl animate-pulse">
                        🦉
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-4xl font-extrabold text-white tracking-tight">Enter Code</h2>
                        <p className="text-gray-400 text-lg font-medium">
                            We sent a code to <br />
                            <span className="text-white font-bold tracking-wide">
                                {type === "email" ? user?.email : (tempVerification.phone || user?.phone_number)}
                            </span>
                        </p>
                    </div>
                </div>

                {/* OTP Input Card */}
                <div className="p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8 sm:space-y-10 relative overflow-hidden group">
                    <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#4ADE80]/10 blur-3xl rounded-full" />

                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-1.5 sm:gap-3 relative">
                        {otp.map((digit, i) => (
                            <Input
                                key={i}
                                ref={inputRefs[i]}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(i, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                onPaste={i === 0 ? handlePaste : undefined}
                                className="w-10 h-14 sm:w-12 sm:h-16 bg-black/40 border-white/10 text-center text-2xl sm:text-3xl font-black text-[#A78BFA] focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/20 rounded-xl sm:rounded-2xl transition-all p-0 shadow-inner"
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-6 relative">
                        <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10">
                            <RefreshCw className={cn("h-4 w-4 text-[#A78BFA]", timer > 0 && "opacity-50")} />
                            <span className="text-[#A78BFA] font-mono text-xl font-black w-14 text-center">
                                {timer > 0 ? `00:${timer.toString().padStart(2, '0')}` : "00:00"}
                            </span>
                        </div>

                        <Button
                            onClick={handleVerify}
                            disabled={isVerifying}
                            className="w-full h-14 sm:h-16 text-lg sm:text-xl bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-black rounded-xl sm:rounded-2xl shadow-[0_6px_0_#15803d] sm:shadow-[0_8px_0_#15803d] active:shadow-none active:translate-y-[6px] sm:active:translate-y-[8px] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                        >
                            {isVerifying ? (
                                <Loader2 className="h-7 w-7 animate-spin" />
                            ) : (
                                <>
                                    VERIFY & CONTINUE
                                    <CheckCircle2 className="h-6 w-6 sm:h-7 sm:w-7" />
                                </>
                            )}
                        </Button>

                        <button
                            onClick={handleResend}
                            disabled={timer > 0 || isResendingSMS || isResendingEmail}
                            className={cn(
                                "text-xs sm:text-sm text-gray-400 hover:text-white transition-all font-bold flex items-center gap-2 tracking-wide uppercase",
                                timer > 0 && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            {isResendingSMS || isResendingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                            Didn't receive code? <span className="text-[#A78BFA]">Resend</span>
                        </button>
                    </div>
                </div>

                {/* Decoration */}
                <div className="flex items-center justify-center gap-2 opacity-50">
                    <Sparkles className="h-4 w-4 text-[#A78BFA]" />
                    <p className="text-[10px] font-bold tracking-[.3em] uppercase text-gray-400">Step 2 of 2 Verified Security</p>
                    <Sparkles className="h-4 w-4 text-[#A78BFA]" />
                </div>
            </div>
        </AuthLayout>
    );
}
