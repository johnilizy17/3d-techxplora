import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, ArrowUpRight, ArrowDownLeft, MoreHorizontal } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import WithdrawModal from '@/components/dashboard/WithdrawModal';

const transactions = [
    { id: 1, name: 'Payoneer', status: 'Successful', amount: '30,000', date: 'July 11, 2023 | 11:56', type: 'incoming', icon: '🔵' },
    { id: 2, name: 'Airwallex', status: 'Unsuccessful', amount: '200', date: 'July 13, 2023 | 10:22', type: 'outgoing', icon: '🅰️' },
    { id: 3, name: 'Payoneer', status: 'Successful', amount: '150.66', date: 'April 29, 2023 | 10:45', type: 'incoming', icon: '🔵' },
];

export default function Wallet() {
    const navigate = useNavigate();

    return (
        <DashboardLayout>
            <div className="min-h-screen relative overflow-hidden pb-10">
                {/* Background Gradients to match the purple vibe */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#4c1d95]/40 to-transparent z-0 pointer-events-none" />

                <div className="relative z-10 w-full max-w-md lg:max-w-none lg:px-10 mx-auto min-h-screen flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 lg:px-0 pt-8 lg:pt-12 pb-6">
                        <button onClick={() => navigate(-1)} className="p-3 lg:p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white border border-white/10 shadow-xl">
                            <ArrowLeft size={24} />
                        </button>
                        <h1 className="text-2xl font-black uppercase tracking-tighter italic">My Wallet</h1>
                        <button className="p-3 lg:p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white border border-white/10 shadow-xl">
                            <Settings size={24} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:mt-6">
                        {/* Balance Column */}
                        <div className="lg:col-span-5 px-6 lg:px-0">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-full bg-gradient-to-br from-[#6d28d9] via-[#8b5cf6] to-[#d946ef] rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(109,40,217,0.3)]"
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20" />

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="mb-6 text-7xl drop-shadow-2xl animate-bounce-slow">
                                        💸
                                    </div>

                                    <p className="text-purple-100 text-sm font-black uppercase tracking-[0.2em] mb-2 opacity-80">Total Earnings</p>
                                    <h2 className="text-5xl lg:text-6xl font-black text-white mb-10 tracking-tighter">
                                        47 XP
                                        <span className="block text-2xl text-purple-200/60 mt-2 font-bold tracking-normal italic">(4.7 XD)</span>
                                    </h2>

                                    <WithdrawModal
                                        balance="478.86"
                                        trigger={
                                            <Button className="w-full h-16 bg-white hover:bg-purple-50 text-purple-700 rounded-2xl font-black text-xl shadow-[0_8px_0_#9333ea] active:shadow-none active:translate-y-[8px] transition-all uppercase tracking-widest relative">
                                                Withdraw
                                            </Button>
                                        }
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Transaction History Column */}
                        <div className="lg:col-span-7 px-6 lg:px-0">
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-[2.5rem] lg:rounded-[3rem] p-8 text-black min-h-[400px] shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 italic">History</h3>
                                    <button className="text-purple-600 text-sm font-black uppercase tracking-widest hover:text-purple-800 transition-colors">See All</button>
                                </div>

                                <div className="space-y-8">
                                    {transactions.map((tx) => (
                                        <div key={tx.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl shadow-inner border border-gray-100 group-hover:scale-110 transition-transform">
                                                    {tx.icon}
                                                </div>
                                                <div>
                                                    <p className="font-black text-gray-900 text-lg leading-tight uppercase tracking-tight">{tx.name}</p>
                                                    <p className={`text-xs font-black uppercase tracking-widest mt-1 ${tx.status === 'Successful' ? 'text-green-500' : 'text-red-500'}`}>
                                                        {tx.status}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-gray-900 text-xl tracking-tighter">₦{tx.amount}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 opacity-60 tracking-wider">{tx.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
