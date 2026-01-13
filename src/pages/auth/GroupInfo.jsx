import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CheckCircle2, Copy, School, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AuthLayout from "./AuthLayout";
import { cn } from "@/lib/utils";

export default function GroupInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const { code, schoolName } = location.state || {};

    // Redirect back if no state is present
    if (!code || !schoolName) {
        React.useEffect(() => {
            navigate("/auth/group");
        }, [navigate]);
        return null;
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Copied!",
            description: "Admin code copied to clipboard.",
        });
    };

    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-3xl mb-2">
                        🏫
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white tracking-tight">
                            Verify School Details
                        </h2>
                        <p className="text-gray-400">
                            Double check the information before joining
                        </p>
                    </div>
                </div>

                {/* Glass Card */}
                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
                    {/* Subtle glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#A78BFA]/10 to-transparent blur-2xl opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative space-y-8">
                        {/* School Info Section */}
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                            <div className="w-12 h-12 bg-[#A78BFA]/20 rounded-xl flex items-center justify-center">
                                <School className="h-6 w-6 text-[#A78BFA]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">School Name</p>
                                <p className="text-lg font-bold text-white truncate">{schoolName}</p>
                            </div>
                            <CheckCircle2 className="h-6 w-6 text-[#4ADE80]" />
                        </div>

                        {/* Admin Code Section */}
                        <div className="space-y-3">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider ml-1">Admin Verification Code</p>
                            <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-[#A78BFA]/30 group-hover:border-[#A78BFA]/50 transition-colors">
                                <p className="text-xl font-mono font-bold text-[#A78BFA] tracking-widest uppercase">
                                    {code}
                                </p>
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                                    title="Copy Code"
                                >
                                    <Copy className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-400 text-center italic">
                            Kindly join your chosen school to access your teacher dashboard.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={() => navigate(`/auth/signup?code=${code}`)}
                                className="w-full h-14 bg-[#A78BFA] hover:bg-[#8B5CF6] text-white text-lg font-bold rounded-xl shadow-[0_4px_0_#6D28D9] active:shadow-none active:translate-y-[4px] transition-all flex items-center justify-center gap-2"
                            >
                                JOIN SCHOOL
                                <ArrowRight className="h-5 w-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                onClick={() => navigate("/auth/group")}
                                className="w-full text-gray-400 hover:text-white hover:bg-white/5 font-medium flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Not my school? Go back
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-gray-500 text-sm">
                        Techxplora for Schools & Organizations
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
}
