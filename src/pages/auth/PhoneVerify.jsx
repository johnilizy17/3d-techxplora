import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Smartphone,
    ChevronDown,
    ArrowRight,
    Loader2,
    Search,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSelector, useDispatch } from "react-redux";
import { useSendSMSMutation, useSendEmailMutation } from "@/redux/api/authApi";
import { setTemporaryVerification } from "@/redux/slices/authSlice";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

const phoneSchema = z.object({
    phone_number: z.string().min(8, "Please enter a valid phone number"),
});

const countries = [
    { name: "Nigeria", code: "+234", flag: "🇳🇬", iso: "NG" },
    { name: "United States", code: "+1", flag: "🇺🇸", iso: "US" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧", iso: "GB" },
    { name: "Canada", code: "+1", flag: "🇨🇦", iso: "CA" },
    { name: "Ghana", code: "+233", flag: "🇬🇭", iso: "GH" },
    { name: "South Africa", code: "+27", flag: "🇿🇦", iso: "ZA" },
    { name: "Kenya", code: "+254", flag: "🇰🇪", iso: "KE" },
    { name: "France", code: "+33", flag: "🇫🇷", iso: "FR" },
    { name: "Germany", code: "+49", flag: "🇩🇪", iso: "DE" },
    { name: "Australia", code: "+61", flag: "🇦🇺", iso: "AU" },
    { name: "India", code: "+91", flag: "🇮🇳", iso: "IN" },
    { name: "Brazil", code: "+55", flag: "🇧🇷", iso: "BR" },
    { name: "Japan", code: "+81", flag: "🇯🇵", iso: "JP" },
    { name: "China", code: "+86", flag: "🇨🇳", iso: "CN" },
    { name: "UAE", code: "+971", flag: "🇦🇪", iso: "AE" },
];

export default function PhoneVerify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [sendSMS, { isLoading }] = useSendSMSMutation();
    const [sendEmail, { isLoading: isEmailLoading }] = useSendEmailMutation();

    const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Default to Nigeria
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(phoneSchema),
        defaultValues: {
            phone_number: user?.phone_number || "",
        }
    });

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleEmailVerify = async () => {
        if (!user?.email) {
            toast({
                title: "Email missing",
                description: "No email address found for your account.",
                variant: "destructive",
            });
            return;
        }

        try {
            const code = generateOTP();
            await sendEmail({
                to: user.email,
                subject: "Techxplora Verification Code",
                message: `
                    <div style="font-family: sans-serif; padding: 20px; color: #333;">
                        <h2>Techxplora Verification</h2>
                        <p>Your verification code is: <strong>${code}</strong></p>
                        <p>This code will expire in 10 minutes.</p>
                    </div>
                `
            }).unwrap();

            dispatch(setTemporaryVerification({
                code,
                type: 'email',
                phone: null
            }));

            toast({
                title: "Code sent!",
                description: `A verification code has been sent to ${user.email}`,
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

    const onSubmit = async (data) => {
        try {
            // Format phone: strip leading zero if present and prepend country code
            const localPart = data.phone_number.startsWith('0')
                ? data.phone_number.substring(1)
                : data.phone_number;
            const fullPhone = `${selectedCountry.code}${localPart}`;

            const code = generateOTP();
            await sendSMS({
                to: fullPhone,
                code: code
            }).unwrap();

            dispatch(setTemporaryVerification({
                code,
                phone: fullPhone,
                type: 'phone'
            }));

            toast({
                title: "Code sent!",
                description: `A verification code has been sent to ${fullPhone}`,
            });

            navigate("/auth/otp?type=phone");
        } catch (error) {
            toast({
                title: "Failed to send SMS",
                description: error?.data?.message || "Something went wrong. Please check your number.",
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
                        📱
                    </div>
                    <h2 className="text-4xl font-bold text-white tracking-tight">Protect your account</h2>
                    <p className="text-gray-400 text-lg font-medium">Add a phone number for extra security</p>
                </div>

                <div className="p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] space-y-6 sm:space-y-8 relative overflow-hidden group">
                    {/* Background glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#A78BFA]/10 blur-3xl rounded-full" />

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8 relative">
                        {/* Phone Input Group */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-400 ml-1 tracking-wider uppercase">Phone Number</label>
                            <div className="flex gap-2 sm:gap-4">
                                {/* Country Code Selector */}
                                <div className="shrink-0">
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="h-14 sm:h-16 px-3 sm:px-4 bg-black/40 border-white/10 text-white hover:bg-white/5 hover:border-[#A78BFA]/50 transition-all rounded-xl sm:rounded-2xl gap-2 text-lg sm:text-xl font-bold shadow-inner min-w-[100px] sm:min-w-[120px]"
                                            >
                                                <span>{selectedCountry.flag} {selectedCountry.code}</span>
                                                <ChevronDown className="h-4 w-4 opacity-50 ml-auto" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0 bg-gray-900/95 backdrop-blur-3xl border-white/10 rounded-2xl p-2 z-50 overflow-hidden">
                                            <Command className="bg-transparent text-white">
                                                <CommandInput placeholder="Search country..." className="text-white placeholder:text-gray-500 h-10 border-none focus:ring-0" />
                                                <CommandList className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                                    <CommandEmpty className="py-4 text-center text-sm text-gray-400">No country found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {countries.map((country) => (
                                                            <CommandItem
                                                                key={country.iso}
                                                                value={country.name}
                                                                onSelect={() => {
                                                                    setSelectedCountry(country);
                                                                    setOpen(false);
                                                                }}
                                                                className="flex items-center gap-3 px-3 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer rounded-xl transition-all"
                                                            >
                                                                <span className="text-xl">{country.flag}</span>
                                                                <span className="flex-1 font-medium">{country.name}</span>
                                                                <span className="text-xs font-bold text-gray-500">{country.code}</span>
                                                                {selectedCountry.iso === country.iso && (
                                                                    <Check className="h-4 w-4 text-[#4ADE80]" />
                                                                )}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Phone Number Input */}
                                <div className="relative flex-grow group/input">
                                    <Smartphone className="absolute left-4 top-4 sm:top-5 h-5 sm:h-6 w-5 sm:w-6 text-gray-400 group-focus-within/input:text-[#A78BFA] transition-colors" />
                                    <Input
                                        {...register("phone_number")}
                                        type="tel"
                                        placeholder="8123456789"
                                        className={cn(
                                            "pl-12 sm:pl-14 h-14 sm:h-16 bg-black/40 border-white/10 text-white placeholder:text-gray-600 text-lg sm:text-xl font-medium focus:border-[#A78BFA] focus:ring-4 focus:ring-[#A78BFA]/10 rounded-xl sm:rounded-2xl transition-all shadow-inner",
                                            errors.phone_number && "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                                        )}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            {errors.phone_number && (
                                <p className="text-sm text-red-400 font-medium ml-1 animate-in slide-in-from-top-1">{errors.phone_number.message}</p>
                            )}
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
                                    SEND OTP CODE
                                    <ArrowRight className="h-6 w-6 group-active:translate-x-2 transition-transform" />
                                </>
                            )}
                        </Button>

                        <div className="text-center pt-2">
                            <button
                                type="button"
                                onClick={handleEmailVerify}
                                disabled={isEmailLoading || isLoading}
                                className="text-sm sm:text-base text-[#A78BFA] hover:text-[#c4b5fd] font-bold transition-all hover:tracking-wide flex items-center justify-center gap-2 group-hover:gap-3 mx-auto disabled:opacity-50"
                            >
                                {isEmailLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <>
                                        <span className="underline decoration-2 underline-offset-4">Verify with email instead</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <p className="text-center text-gray-500 text-sm font-medium px-4">
                    By continuing, you'll receive a one-time verification code. Standard message and data rates may apply.
                </p>
            </div>
        </AuthLayout>
    );
}
