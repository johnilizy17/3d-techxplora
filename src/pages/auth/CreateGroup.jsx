import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Camera, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "./AuthLayout";

export default function CreateGroup() {
    const [isPublic, setIsPublic] = useState(true);

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="text-center space-y-4">
                    {/* Characters Luna & Bella */}
                    <div className="flex justify-center gap-2 text-4xl mb-2">
                        <span>🦉</span>
                        <span>🐰</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">Create a Group</h2>
                    <p className="text-gray-400">Collect together with friends!</p>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex justify-center">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-dashed border-white/30 flex items-center justify-center hover:bg-white/15 transition-all">
                                <Camera className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-[#A78BFA] p-2 rounded-full shadow-lg">
                                <span className="text-white text-xs">+</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group">
                            <Users className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#A78BFA] transition-colors" />
                            <Input
                                placeholder="Group Name"
                                className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all"
                            />
                        </div>

                        <div className="relative group">
                            <textarea
                                placeholder="Description (Optional)"
                                className="w-full pl-4 pt-3 h-24 bg-black/30 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-1 focus:ring-[#A78BFA] rounded-xl transition-all resize-none"
                            />
                        </div>

                        {/* Privacy Toggle */}
                        <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-white/10">
                            <div className="flex items-center gap-3">
                                {isPublic ? <Globe className="h-5 w-5 text-[#4ADE80]" /> : <Lock className="h-5 w-5 text-[#A78BFA]" />}
                                <div className="text-left">
                                    <p className="text-white font-medium">{isPublic ? "Public Group" : "Private Group"}</p>
                                    <p className="text-xs text-gray-500">{isPublic ? "Anyone can find and join" : "Invite only"}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsPublic(!isPublic)}
                                className={`w-12 h-7 rounded-full p-1 transition-colors ${isPublic ? 'bg-[#4ADE80]' : 'bg-[#A78BFA]'}`}
                            >
                                <div className={`h-5 w-5 bg-white rounded-full shadow-sm transition-transform ${isPublic ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>

                    <Link to="/auth/group-info" className="block">
                        <Button className="w-full h-12 bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all">
                            CREATE GROUP
                        </Button>
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
