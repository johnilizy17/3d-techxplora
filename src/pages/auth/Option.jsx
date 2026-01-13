import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    User,
    Plus,
    ArrowRight,
    Sparkles,
    School,
    Calendar,
    CheckCircle2,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
    useGetStudentProfilesQuery,
    useRegisterSubAccountMutation
} from "@/redux/api/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    other_name: z.string().optional(),
});

function ProfileCard({ profile, isMain, onSelect, delay = 0 }) {
    return (
        <div
            onClick={() => onSelect(profile)}
            className={cn(
                "group relative overflow-hidden rounded-3xl p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]",
                "bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:border-[#a6b1ff]/30 shadow-2xl",
                "animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
            )}
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Ambient Glow */}
            <div className={cn(
                "absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-xl",
                isMain ? "from-[#a6b1ff]/20 to-transparent" : "from-[#ffb585]/20 to-transparent"
            )} />

            <div className="relative flex items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110 duration-500",
                        isMain
                            ? "bg-[#a6b1ff]/20 border-[#a6b1ff]/20 text-[#a6b1ff]"
                            : "bg-[#ffb585]/20 border-[#ffb585]/20 text-[#ffb585]"
                    )}>
                        <User className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white group-hover:text-[#a6b1ff] transition-colors">
                                {profile.first_name} {profile.last_name}
                            </h3>
                            {isMain && (
                                <span className="px-2 py-0.5 rounded-full bg-[#a6b1ff]/10 text-[#a6b1ff] text-[10px] font-bold uppercase tracking-wider border border-[#a6b1ff]/20">
                                    Primary
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                <span>Joined {new Date(profile.created_at || Date.now()).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-700" />
                            <p className="italic">{isMain ? "Main Account" : "Sub Account"}</p>
                        </div>
                    </div>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-[#a6b1ff] group-hover:text-[#0a0a0a] group-hover:border-[#a6b1ff] transition-all duration-300">
                    <ArrowRight className="h-5 w-5" />
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                <School className="w-32 h-32" />
            </div>
        </div>
    );
}

export default function Option() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch sub-accounts
    const { data: profilesData, isLoading: isProfilesLoading, refetch } = useGetStudentProfilesQuery(user?.id, {
        skip: !user?.id
    });

    const [registerSubAccount, { isLoading: isRegistering }] = useRegisterSubAccountMutation();

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            other_name: "",
        },
    });

    const handleSelectAccount = (profile) => {
        // In the old code, they dispatch setAuth which updates the user in the store
        // We'll update the user credentials with the selected profile name/info
        // but keep the token and main user ID for authentication
        dispatch(setCredentials({
            token,
            user: {
                ...user,
                // Override visible name with the selected profile
                current_profile: profile,
                display_name: `${profile.first_name} ${profile.last_name}`
            }
        }));

        toast({
            title: `Switched to ${profile.first_name}`,
            description: "Heading to your dashboard...",
        });

        setTimeout(() => navigate("/dashboard"), 800);
    };

    const onAddAccount = async (data) => {
        try {
            await registerSubAccount({
                ...data,
                parent_id: user.id,
                is_branch: true,
                email: "", // Sub-accounts often share parent email or have none
            }).unwrap();

            toast({
                title: "Account added!",
                description: "New sub-account created successfully.",
            });

            setIsModalOpen(false);
            form.reset();
            refetch();
        } catch (error) {
            toast({
                title: "Failed to add account",
                description: error?.data?.message || "Something went wrong.",
                variant: "destructive",
            });
        }
    };

    return (
        <AuthLayout>
            <div className="w-full max-w-2xl mx-auto space-y-10 py-10">
                {/* Header */}
                <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-8 duration-700">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-[#a6b1ff]/20 to-[#c7aff8]/20 backdrop-blur-xl border border-[#a6b1ff]/20 rounded-3xl flex items-center justify-center shadow-[0_0_50px_-12px_rgba(166,177,255,0.5)] rotate-3 hover:rotate-0 transition-transform duration-500">
                        <Sparkles className="h-10 w-10 text-[#a6b1ff]" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold text-white tracking-tight">Select Account</h2>
                        <p className="text-gray-400 text-lg">Choose a profile to continue your journey</p>
                    </div>
                </div>

                {/* Profiles List */}
                <div className="grid gap-4 px-4 overflow-y-auto max-h-[60vh] pb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {/* Main Account */}
                    {user && (
                        <ProfileCard
                            profile={user}
                            isMain={true}
                            onSelect={handleSelectAccount}
                            delay={100}
                        />
                    )}

                    {/* Sub Accounts */}
                    {isProfilesLoading ? (
                        <div className="flex flex-col items-center justify-center p-12 space-y-4 bg-white/5 border border-white/10 rounded-3xl">
                            <Loader2 className="h-10 w-10 text-[#a6b1ff] animate-spin" />
                            <p className="text-gray-400">Loading your profiles...</p>
                        </div>
                    ) : (
                        profilesData?.profiles?.map((profile, index) => (
                            <ProfileCard
                                key={profile.id || index}
                                profile={profile}
                                isMain={false}
                                onSelect={handleSelectAccount}
                                delay={200 + (index * 100)}
                            />
                        ))
                    )}

                    {/* Add Account Trigger */}
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <button className="group relative w-full h-24 rounded-3xl border-2 border-dashed border-white/10 hover:border-[#a6b1ff]/50 bg-white/0 hover:bg-[#a6b1ff]/5 transition-all duration-300 flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 fill-mode-both" style={{ animationDelay: '500ms' }}>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#a6b1ff] group-hover:text-[#0a0a0a] transition-colors">
                                    <Plus className="h-6 w-6" />
                                </div>
                                <span className="text-lg font-bold text-gray-400 group-hover:text-white transition-colors">Add New Profile</span>
                            </button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#0d0d0d]/95 backdrop-blur-2xl border-white/10 rounded-3xl p-8 shadow-2xl text-white">
                            <DialogHeader className="mb-6">
                                <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                                    <div className="p-2 bg-[#a6b1ff]/20 rounded-lg">
                                        <Plus className="h-6 w-6 text-[#a6b1ff]" />
                                    </div>
                                    Create Sub Account
                                </DialogTitle>
                            </DialogHeader>
                            <form onSubmit={form.handleSubmit(onAddAccount)} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-gray-400 ml-1">First Name</Label>
                                        <Input {...form.register("first_name")} placeholder="Enter first name" className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-[#a6b1ff]" />
                                        {form.formState.errors.first_name && <p className="text-xs text-red-400">{form.formState.errors.first_name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-400 ml-1">Last Name</Label>
                                        <Input {...form.register("last_name")} placeholder="Enter last name" className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-[#a6b1ff]" />
                                        {form.formState.errors.last_name && <p className="text-xs text-red-400">{form.formState.errors.last_name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-gray-400 ml-1">Other Name (Optional)</Label>
                                        <Input {...form.register("other_name")} placeholder="Enter other name" className="bg-white/5 border-white/10 h-12 rounded-xl focus:border-[#a6b1ff]" />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-[#a6b1ff] hover:bg-[#8b95cc] text-[#0a0a0a] font-bold text-lg rounded-xl shadow-[0_4px_0_#8b95cc] active:shadow-none active:translate-y-[4px] transition-all"
                                    disabled={isRegistering}
                                >
                                    {isRegistering ? <Loader2 className="animate-spin" /> : "CREATE ACCOUNT"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="text-center">
                    <button
                        onClick={() => navigate("/auth/login")}
                        className="text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
                    >
                        <ArrowRight className="h-4 w-4 rotate-180" />
                        Log out and switch user
                    </button>
                </div>
            </div>
        </AuthLayout>
    );
}
