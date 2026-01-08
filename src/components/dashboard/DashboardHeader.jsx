import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DaimondIcon from "@/asset/DaimondIcon"
export default function DashboardHeader({ user }) {
    return (
        <div className="relative pt-8 pb-16 px-6 bg-gradient-to-br from-[#1a1520] via-[#2a2136] to-[#1a1520] rounded-b-[40px] shadow-lg border-b border-white/5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-[#a6b1ff]/30 shadow-[0_0_15px_-3px_rgba(166,177,255,0.4)]">
                        <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                        <AvatarFallback className="bg-indigo-500 text-white">
                            {user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white text-lg font-bold flex items-center gap-1"
                        >
                            Hello, {user?.name || "Explorer"} <span className="text-xl">👋</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-[#a6b1ff] text-sm font-medium"
                        >
                            Let's play quiz
                        </motion.p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Link to="/dashboard/wallet">
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all hover:scale-105 active:scale-95 relative">
                            <DaimondIcon size={20} />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
