import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '@/redux/slices/authSlice';

export default function JoinRoomBanner() {
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    const isStudent = user?.accountable_type === "App\\Models\\Student" || user?.role === 'student';

    const content = isStudent ? {
        title: "Join mission hub",
        description: "Enter code to join your friends",
        buttonText: "Join Room",
        route: "/dashboard/quizzes/join"
    } : {
        title: "Create mission sector",
        description: "Deploy new challenges for your squads",
        buttonText: "Create Room",
        route: "/dashboard/teacher/quizzes"
    };

    return (
        <div className="px-6 lg:px-0 mb-4 sm:mb-8 cursor-pointer" onClick={() => navigate(content.route)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full p-6 lg:p-5 rounded-3xl bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0 group"
            >
                {/* Background Patterns */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-3xl -ml-5 -mb-5" />

                <div className="relative z-10 space-y-2 sm:space-y-1">
                    <h3 className="text-white font-black text-xl lg:text-xl uppercase italic tracking-tighter leading-none">
                        {content.title}
                    </h3>
                    <p className="text-purple-200/60 text-[11px] lg:text-[10px] font-bold uppercase tracking-widest italic">
                        {content.description}
                    </p>
                </div>

                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(content.route);
                    }}
                    className="w-full sm:w-auto relative z-10 bg-white text-purple-700 hover:bg-[#a6b1ff] hover:text-black font-black uppercase tracking-widest text-[11px] lg:text-[10px] px-8 rounded-2xl shadow-2xl h-12 transition-all active:scale-95 border-b-4 border-purple-200 active:border-b-0"
                >
                    {content.buttonText}
                </Button>
            </motion.div>
        </div>
    );
}
