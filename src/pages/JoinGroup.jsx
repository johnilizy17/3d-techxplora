import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ArrowLeft,
    ChevronRight,
    ShieldCheck,
    Sparkles,
    Globe,
    Target,
    QrCode
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLazyVerifyGroupCodeQuery } from '@/redux/api/studentApi';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import VerifyGroupModal from '@/components/dashboard/VerifyGroupModal';

export default function JoinGroup() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const [verifyCode, { isLoading: isVerifying }] = useLazyVerifyGroupCodeQuery();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code.trim()) {
            toast.error('Please enter a group code');
            return;
        }

        try {
            const result = await verifyCode(code.trim()).unwrap();
            setSelectedGroup(result.data || result);
            setIsVerifyModalOpen(true);
            toast.success('Group located successfully!');
        } catch (error) {
            console.error('Verification failed:', error);
            toast.error(error?.data?.message || 'Group not found. Please check the code.');
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute top-20 right-[10%] w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 left-[10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-2xl relative z-10"
                >
                    {/* Floating Header Card */}
                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-transparent blur-2xl" />

                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-8 group/back"
                        >
                            <ArrowLeft size={18} className="group-hover/back:-translate-x-1 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">Abort Mission</span>
                        </button>

                        <div className="flex flex-col items-center text-center mb-12">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/40 relative"
                            >
                                <div className="absolute inset-0 bg-white/20 rounded-[2rem] animate-ping opacity-20" />
                                <Users className="text-white" size={40} />
                            </motion.div>

                            <h1 className="text-4xl lg:text-5xl font-black text-white italic uppercase tracking-tighter leading-none mb-3">
                                Group <span className="text-indigo-400">Quiz</span> <br />Nexus
                            </h1>
                            <p className="text-white/40 text-sm font-medium italic max-w-sm">
                                Enter your distinct group access code to unlock collective quizzes, track team progress, and outpace the competition.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 relative">
                            <div className="relative group/input">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/input:text-indigo-400 transition-colors">
                                    <QrCode size={24} />
                                </div>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    placeholder="ENTER GROUP CODE (e.g. GRP-XXXX)"
                                    className="w-full h-20 bg-white/5 border border-white/10 focus:border-indigo-500/50 rounded-2xl pl-16 pr-6 text-xl font-black text-white placeholder:text-white/10 outline-none transition-all uppercase tracking-widest italic"
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isVerifying}
                                className="w-full h-20 bg-white text-[#0d0d0d] rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-white/10 group/btn overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                                <span className="relative z-10 font-black uppercase tracking-widest italic flex items-center gap-3 text-lg group-hover/btn:text-white transition-colors">
                                    {isVerifying ? 'Verifying Credentials...' : 'Access Group Quizzes'}
                                    <ChevronRight size={24} className="group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </form>

                        {/* Visual Cues */}
                        <div className="mt-12 grid grid-cols-3 gap-4">
                            {[
                                { icon: ShieldCheck, label: "Secure Path", color: "text-emerald-400" },
                                { icon: Globe, label: "Global Sync", color: "text-blue-400" },
                                { icon: Target, label: "Precision", color: "text-indigo-400" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <item.icon size={16} className={item.color} />
                                    <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Warning */}
                    <div className="mt-8 flex items-center justify-center gap-3 text-white/20">
                        <Sparkles size={14} className="animate-spin-slow" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] italic">Vanguard Authorization Required</span>
                    </div>
                </motion.div>
            </div>

            {/* Modal */}
            <VerifyGroupModal
                isOpen={isVerifyModalOpen}
                onClose={() => setIsVerifyModalOpen(false)}
                group={selectedGroup}
            />
        </DashboardLayout>
    );
}
