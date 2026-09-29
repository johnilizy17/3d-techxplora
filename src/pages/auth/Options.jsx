import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Shield, Bell, Moon, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthLayout from "./AuthLayout";

export default function Options() {
    const [notifications, setNotifications] = useState(true);

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="text-left space-y-2">
                    <h2 className="text-3xl font-bold text-white">Settings</h2>
                    <p className="text-gray-400">Manage your profile & preferences</p>
                </div>

                <div className="space-y-4">
                    {/* Account Section */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Account</h3>
                        <div className="space-y-1">
                            <button className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><User className="h-5 w-5" /></div>
                                    <span className="text-white">Personal Details</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-white" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400"><Shield className="h-5 w-5" /></div>
                                    <span className="text-white">Security & Privacy</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Preferences Section */}
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Preferences</h3>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400"><Bell className="h-5 w-5" /></div>
                                    <span className="text-white">Push Notifications</span>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={`w-12 h-7 rounded-full p-1 transition-colors ${notifications ? 'bg-[#4ADE80]' : 'bg-gray-600'}`}
                                >
                                    <div className={`h-5 w-5 bg-white rounded-full shadow-sm transition-transform ${notifications ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400"><Moon className="h-5 w-5" /></div>
                                    <span className="text-white">Dark Mode</span>
                                </div>
                                <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded">Always On</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link to="/auth/start">
                            <Button variant="destructive" className="w-full h-12 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 font-bold rounded-xl">
                                <LogOut className="mr-2 h-5 w-5" /> Log Out
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
