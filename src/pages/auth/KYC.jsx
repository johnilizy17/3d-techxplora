import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    MapPin,
    Calendar,
    Building2,
    Map,
    Mail as MailIcon,
    ArrowRight,
    Loader2,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateTeacherMutation, useUpdateStudentMutation } from "@/redux/api/authApi";
import { updateUser } from "@/redux/slices/authSlice";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";

const kycSchema = z.object({
    date_of_birth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(5, "Please enter a valid address"),
    lga: z.string().min(2, "Local Government Area is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postal_code: z.string().min(3, "Postal code is required"),
});

export default function KYC() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [updateTeacher, { isLoading: isTeacherLoading }] = useUpdateTeacherMutation();
    const [updateStudent, { isLoading: isStudentLoading }] = useUpdateStudentMutation();

    const isLoading = isTeacherLoading || isStudentLoading;

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(kycSchema),
        defaultValues: {
            date_of_birth: user?.date_of_birth || "",
            address: user?.address || "",
            lga: user?.lga || "",
            city: user?.city || "",
            state: user?.state || "",
            postal_code: user?.postal_code || "",
        }
    });

    const onSubmit = async (data) => {
        try {
            const isTeacher = user?.accountable_type === "App\\Models\\Teacher";
            const updatePayload = {
                id: user.id,
                ...data,
                is_verified: 0 // Mark as pending verification
            };

            let response;
            if (isTeacher) {
                response = await updateTeacher(updatePayload).unwrap();
            } else {
                response = await updateStudent(updatePayload).unwrap();
            }

            // Update Redux state with new user data
            dispatch(updateUser(data));

            toast({
                title: "KYC Information Submitted",
                description: "Your information has been saved successfully.",
            });

            // Redirect to phone verification
            navigate("/auth/phone");
        } catch (error) {
            console.error("KYC submission error:", error);
            toast({
                title: "Submission failed",
                description: error?.data?.message || "Failed to save your information. Please try again.",
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
                    <div className="mx-auto w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center text-4xl mb-4 border border-purple-500/20 shadow-2xl rotate-3 animate-bounce-slow">
                        📋
                    </div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">Complete Your Profile</h2>
                    <p className="text-gray-400 text-lg font-medium">Help us verify your identity</p>
                </div>

                <div className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-6 sm:space-y-8 relative overflow-hidden group">
                    {/* Background glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#A78BFA]/10 blur-3xl rounded-full" />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-6 relative">
                        {/* Date of Birth */}
                        <div className="space-y-3">
                            <Label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">Date of Birth</Label>
                            <div className="relative group/input">
                                <Calendar className="absolute left-4 top-4 sm:top-4 h-5 sm:h-5 w-5 sm:w-5 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                <Input
                                    {...register("date_of_birth")}
                                    type="date"
                                    className={cn(
                                        "pl-12 sm:pl-12 h-14 sm:h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-base sm:text-base font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl sm:rounded-xl transition-all shadow-inner",
                                        errors.date_of_birth && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                    )}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.date_of_birth && (
                                <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.date_of_birth.message}</p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="space-y-3">
                            <Label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">Address</Label>
                            <div className="relative group/input">
                                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                <Input
                                    {...register("address")}
                                    type="text"
                                    placeholder="Enter your full address"
                                    className={cn(
                                        "pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-base font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl transition-all shadow-inner",
                                        errors.address && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                    )}
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.address && (
                                <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.address.message}</p>
                            )}
                        </div>

                        {/* LGA and City - Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* LGA */}
                            <div className="space-y-3">
                                <Label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">LGA</Label>
                                <div className="relative group/input">
                                    <Building2 className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...register("lga")}
                                        type="text"
                                        placeholder="Local Govt Area"
                                        className={cn(
                                            "pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-base font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl transition-all shadow-inner",
                                            errors.lga && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                        )}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.lga && (
                                    <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.lga.message}</p>
                                )}
                            </div>

                            {/* City */}
                            <div className="space-y-3">
                                <Label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">City</Label>
                                <div className="relative group/input">
                                    <Building2 className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...register("city")}
                                        type="text"
                                        placeholder="Your city"
                                        className={cn(
                                            "pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-base font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl transition-all shadow-inner",
                                            errors.city && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                        )}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.city && (
                                    <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.city.message}</p>
                                )}
                            </div>
                        </div>

                        {/* State and Postal Code - Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* State */}
                            <div className="space-y-3">
                                <Label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">State</Label>
                                <div className="relative group/input">
                                    <Map className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...register("state")}
                                        type="text"
                                        placeholder="Your state"
                                        className={cn(
                                            "pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-base font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl transition-all shadow-inner",
                                            errors.state && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                        )}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.state && (
                                    <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.state.message}</p>
                                )}
                            </div>

                            {/* Postal Code */}
                            <div className="space-y-3">
                                <Label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">Postal Code</Label>
                                <div className="relative group/input">
                                    <MailIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...register("postal_code")}
                                        type="text"
                                        placeholder="Postal code"
                                        className={cn(
                                            "pl-12 h-14 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-base font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl transition-all shadow-inner",
                                            errors.postal_code && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                        )}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.postal_code && (
                                    <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.postal_code.message}</p>
                                )}
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
                                    SUBMIT & CONTINUE
                                    <ArrowRight className="h-6 w-6 group-active:translate-x-2 transition-transform" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <p className="text-center text-gray-500 text-sm font-medium px-4">
                    Your information is secure and will only be used for verification purposes.
                </p>
            </div>
        </AuthLayout>
    );
}
