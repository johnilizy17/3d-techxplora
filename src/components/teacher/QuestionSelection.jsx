import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    PlusCircle,
    Sparkles,
    Library,
    Layers,
    ArrowRight,
    MousePointer2,
    Zap,
    Cpu,
    FileSpreadsheet,
    Archive
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIGenerationDrawer from './AIGenerationDrawer';
import BulkUploadDrawer from './BulkUploadDrawer';

export default function QuestionSelection() {
    const navigate = useNavigate();
    const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
    const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);

    const selectionCards = [
        {
            id: 'manual',
            title: "Manual",
            subtitle: "Construction",
            desc: "Expertly craft individual questions with precise control over every detail and option.",
            icon: PlusCircle,
            color: "from-blue-500 to-indigo-600",
            action: () => navigate('/dashboard/teacher/question?manual=true'),
            badge: "Classic"
        },
        {
            id: 'ai',
            title: "Xplora",
            subtitle: "Intelligence",
            desc: "Leverage advanced neural generation to create curriculum-aligned questions in seconds.",
            icon: Cpu,
            color: "from-purple-500 to-fuchsia-600",
            action: () => setIsAIDrawerOpen(true),
            badge: "AI Powered"
        },
        {
            id: 'draft',
            title: "Draft",
            subtitle: "Archives",
            desc: "Access your repository of saved questions and previous assessments for rapid deployment.",
            icon: Archive,
            color: "from-amber-500 to-orange-600",
            action: () => navigate('/dashboard/teacher/draft'),
            badge: "Library"
        },
        {
            id: 'bulk',
            title: "Batch",
            subtitle: "Synchronize",
            desc: "Seamlessly import large-scale assessments from your standardized Excel spreadsheets.",
            icon: FileSpreadsheet,
            color: "from-emerald-500 to-teal-600",
            action: () => setIsBulkDrawerOpen(true),
            badge: "Efficient"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
            >
                <div className="flex justify-center">
                    <span className="px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] backdrop-blur-md">
                        Challenge Deployment
                    </span>
                </div>
                <h1 className="text-4xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                    Select your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Methodology</span>
                </h1>
                <p className="text-white/40 font-medium max-w-2xl mx-auto uppercase tracking-widest text-[11px]">
                    Choose a strategy to populate your assessment questions and engage your students.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto gap-8 px-4"
            >
                {selectionCards.map((card) => (
                    <motion.button
                        key={card.id}
                        variants={{
                            hidden: { opacity: 0, scale: 0.9, y: 20 },
                            visible: { opacity: 1, scale: 1, y: 0 }
                        }}
                        onClick={card.action}
                        className="group relative h-[450px] rounded-[3rem] bg-white/[0.03] border border-white/5 p-8 text-left transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] overflow-hidden"
                    >
                        {/* Vibrant background glow */}
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700`} />

                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                        <card.icon className="text-white" size={32} />
                                    </div>
                                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-white/40 uppercase tracking-widest">
                                        {card.badge}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl font-black text-white/50 uppercase tracking-tighter leading-none group-hover:text-white transition-colors capitalize">
                                        {card.title}
                                    </h3>
                                    <h4 className="text-3xl font-black text-white italic uppercase tracking-tight leading-none">
                                        {card.subtitle}
                                    </h4>
                                </div>

                                <p className="text-sm font-medium text-white/30 leading-relaxed group-hover:text-white/50 transition-colors">
                                    {card.desc}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-500">
                                    Initialize
                                </span>
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </motion.div>

            <AIGenerationDrawer
                isOpen={isAIDrawerOpen}
                onClose={() => setIsAIDrawerOpen(false)}
            />

            <BulkUploadDrawer
                isOpen={isBulkDrawerOpen}
                onClose={() => setIsBulkDrawerOpen(false)}
            />
        </div>
    );
}
