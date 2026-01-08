import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";

export default function JoinRoomBanner() {
    return (
        <div className="px-6 mb-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full p-5 rounded-3xl bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] shadow-lg relative overflow-hidden flex items-center justify-between"
            >
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-xl -ml-5 -mb-5" />

                <div className="relative z-10">
                    <h3 className="text-white font-bold text-base mb-1">Create and join room here</h3>
                    <p className="text-purple-200 text-xs">Join a room quickly with friends</p>
                </div>

                <Button
                    className="relative z-10 bg-white text-purple-700 hover:bg-gray-100 font-bold px-6 rounded-xl shadow-md h-10 transition-transform active:scale-95"
                >
                    Join
                </Button>
            </motion.div>
        </div>
    );
}
