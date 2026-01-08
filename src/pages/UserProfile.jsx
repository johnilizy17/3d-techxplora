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

export default function UserProfile() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-24 font-sans relative text-white">
            <div className="max-w-md mx-auto w-full min-h-screen relative shadow-2xl bg-[#0a0a0a] flex flex-col">

                {/* Header */}
                <div className="px-6 pt-8 pb-4 flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold">User Profile</h1>
                </div>

                <div className="flex-1 px-6 pt-4">
                    {/* Avatar Upload */}
                    <div className="flex justify-center mb-8 relative">
                        <div className="relative">
                            <Avatar className="w-28 h-28 border-4 border-[#1a1520] shadow-xl">
                                <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                                <AvatarFallback className="bg-indigo-500 text-white text-3xl">
                                    {user?.name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <button className="absolute bottom-0 right-0 p-2.5 bg-white text-[#5b21b6] rounded-full shadow-lg hover:bg-gray-100 transition-colors">
                                <Camera size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-gray-400 font-normal ml-1">First Name</Label>
                            <Input
                                id="firstName"
                                defaultValue={user?.name?.split(' ')[0] || "John"}
                                className="bg-transparent border border-white/20 h-14 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 px-4 text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-gray-400 font-normal ml-1">Last Name</Label>
                            <Input
                                id="lastName"
                                defaultValue={user?.name?.split(' ')[1] || "Doe"}
                                className="bg-transparent border border-white/20 h-14 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 px-4 text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-400 font-normal ml-1">E-Mail</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={user?.email || "johndoe@gmail.com"}
                                className="bg-transparent border border-white/20 h-14 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 px-4 text-base"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mobile" className="text-gray-400 font-normal ml-1">Mobile</Label>
                            <Input
                                id="mobile"
                                type="tel"
                                defaultValue={user?.mobile || "+91-123456789"}
                                className="bg-transparent border border-white/20 h-14 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 px-4 text-base"
                            />
                        </div>

                        <motion.div
                            className="pt-8"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Button className="w-full h-14 bg-[#1e1b4b] hover:bg-[#312e81] text-white font-bold rounded-full text-lg tracking-wide uppercase shadow-lg border border-white/10">
                                Save
                            </Button>
                        </motion.div>
                    </form>
                </div>
            </div>
        </div>
    );
}
