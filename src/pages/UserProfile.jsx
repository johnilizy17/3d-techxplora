import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function UserProfile() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    return (
        <DashboardLayout>
            <div className="min-h-screen relative pb-10">
                <div className="relative z-10 w-full max-w-2xl lg:px-10 mx-auto min-h-screen flex flex-col pt-8 lg:pt-12">
                    {/* Header */}
                    <div className="flex items-center gap-6 px-6 lg:px-0 mb-12">
                        <button onClick={() => navigate(-1)} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white border border-white/10 shadow-xl">
                            <ArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">Edit Profile</h1>
                            <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mt-2">Manage your account details</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 backdrop-blur-xl shadow-2xl mx-6 lg:mx-0">
                        {/* Avatar Upload */}
                        <div className="flex justify-center mb-12">
                            <div className="relative group">
                                <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-indigo-500/30 shadow-2xl transition-all group-hover:scale-105">
                                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                                    <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-4xl font-black italic">
                                        {user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute bottom-1 right-1 lg:bottom-2 lg:right-2 p-3 bg-white text-indigo-700 rounded-2xl shadow-2xl border-4 border-[#0a0a0a] hover:bg-indigo-50 transition-colors"
                                >
                                    <Camera size={20} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Form Grid */}
                        <form className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label htmlFor="firstName" className="text-gray-400 font-black uppercase tracking-widest text-[10px] ml-1">First Name</Label>
                                    <Input
                                        id="firstName"
                                        defaultValue={user?.name?.split(' ')[0] || "John"}
                                        className="bg-black/20 border-white/10 h-16 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/10 px-6 text-lg font-bold placeholder:text-gray-600 transition-all"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="lastName" className="text-gray-400 font-black uppercase tracking-widest text-[10px] ml-1">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        defaultValue={user?.name?.split(' ')[1] || "Doe"}
                                        className="bg-black/20 border-white/10 h-16 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/10 px-6 text-lg font-bold placeholder:text-gray-600 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-gray-400 font-black uppercase tracking-widest text-[10px] ml-1">Account Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue={user?.email || "johndoe@gmail.com"}
                                    className="bg-black/20 border-white/10 h-16 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/10 px-6 text-lg font-bold placeholder:text-gray-600 transition-all opacity-60 cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="mobile" className="text-gray-400 font-black uppercase tracking-widest text-[10px] ml-1">Phone Number</Label>
                                <Input
                                    id="mobile"
                                    type="tel"
                                    defaultValue={user?.mobile || "+91-123456789"}
                                    className="bg-black/20 border-white/10 h-16 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/10 px-6 text-lg font-bold placeholder:text-gray-600 transition-all"
                                />
                            </div>

                            <motion.div
                                className="pt-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Button className="w-full h-16 bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] hover:from-[#4c1d95] hover:to-[#6d28d9] text-white font-black rounded-2xl text-xl tracking-widest uppercase shadow-[0_10px_30px_rgba(124,58,237,0.3)] border border-white/10 transition-all active:scale-[0.98]">
                                    Save Changes
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
