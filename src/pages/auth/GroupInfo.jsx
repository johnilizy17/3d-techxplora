import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Settings, Info, Share2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "./AuthLayout";

export default function GroupInfo() {
    const [activeTab, setActiveTab] = useState("members");

    return (
        <AuthLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-4xl shadow-lg border-2 border-white/20">
                        🚀
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Space Explorers</h2>
                        <p className="text-[#A78BFA] font-medium">@space_explorers</p>
                    </div>
                    <div className="flex justify-center gap-2">
                        <Button size="sm" variant="outline" className="h-9 bg-white/5 border-white/10 text-white rounded-lg">
                            <Share2 className="h-4 w-4 mr-2" /> Share
                        </Button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-black/40 rounded-xl">
                    {["info", "members", "settings"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all capitalize ${activeTab === tab
                                    ? "bg-[#332e4d] text-[#A78BFA] shadow-sm"
                                    : "text-gray-500 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] min-h-[300px]">
                    {activeTab === "members" && (
                        <div className="space-y-4">
                            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">Members (12)</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="text-center group">
                                        <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-lg mb-1 group-hover:bg-[#A78BFA] transition-colors">
                                            {["🦊", "🐰", "🦁", "🐼", "🐯", "🐸", "🐨", "🐵"][i - 1]}
                                        </div>
                                        <p className="text-[10px] text-gray-400 truncate">User{i}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "info" && (
                        <div className="space-y-4 text-gray-300 text-sm">
                            <p>A group for everyone who loves space themed collectibles! We trade planets, ships, and aliens.</p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-xs text-gray-500">Created Dec 15, 2025</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "settings" && (
                        <div className="space-y-2">
                            <button className="w-full p-3 text-left bg-black/20 hover:bg-black/30 rounded-xl text-red-400 hover:text-red-300 transition-colors flex items-center">
                                <LogOut className="h-4 w-4 mr-2" /> Leave Group
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AuthLayout>
    );
}
