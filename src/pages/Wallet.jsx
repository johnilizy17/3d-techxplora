import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, ArrowUpRight, ArrowDownLeft, MoreHorizontal } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import DashboardBottomNav from '@/components/dashboard/DashboardBottomNav';
import WithdrawModal from '@/components/dashboard/WithdrawModal';

const transactions = [
    { id: 1, name: 'Payoneer', status: 'Successful', amount: '30,000', date: 'July 11, 2023 | 11:56', type: 'incoming', icon: '🔵' },
    { id: 2, name: 'Airwallex', status: 'Unsuccessful', amount: '200', date: 'July 13, 2023 | 10:22', type: 'outgoing', icon: '🅰️' },
    { id: 3, name: 'Payoneer', status: 'Successful', amount: '150.66', date: 'April 29, 2023 | 10:45', type: 'incoming', icon: '🔵' },
];

export default function Wallet() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative overflow-hidden">
            {/* Background Gradients to match the purple vibe */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#4c1d95] to-[#0a0a0a] opacity-50 z-0 pointer-events-none" />

            <div className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-8 pb-6">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors text-white">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Wallet</h1>
                    <button className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors text-white">
                        <Settings size={24} />
                    </button>
                </div>

                <ScrollArea className="flex-1 px-6 pb-6">
                    {/* Balance Card */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-full bg-gradient-to-br from-[#6d28d9] via-[#8b5cf6] to-[#d946ef] rounded-[32px] p-8 relative overflow-hidden shadow-2xl mb-8"
                    >
                        {/* Decorative Circles */}
                        <div className="absolute top-4 right-8 w-4 h-4 rounded-full bg-yellow-300 animate-pulse" />
                        <div className="absolute bottom-8 left-8 w-6 h-6 rounded-full bg-blue-400 opacity-80" />
                        <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-pink-300 opacity-60" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            {/* 3D Icon Placeholder (Money Stack) */}
                            <div className="mb-4 text-6xl drop-shadow-xl animate-bounce-slow">
                                💸
                            </div>

                            <p className="text-purple-100 text-sm font-medium mb-1">Current Earning</p>
                            <h2 className="text-4xl font-bold text-white mb-8 tracking-tight"> 47 XP <span className="text-xl text-[#a6b1ff]"> (4.7 XD)</span></h2>

                            <WithdrawModal
                                balance="478.86"
                                trigger={
                                    <Button className="w-full max-w-[200px] h-14 bg-gradient-to-r from-[#f472b6] to-[#e879f9] border-t border-white/30 rounded-full font-bold text-white shadow-[0_6px_0_#be185d] hover:shadow-[0_6px_0_#be185d] hover:brightness-110 active:shadow-none active:translate-y-[6px] transition-all text-lg relative top-0">
                                        Withdraw
                                    </Button>
                                }
                            />
                        </div>
                    </motion.div>

                    {/* Transaction History */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[32px] p-6 text-black min-h-[400px]"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Transaction History</h3>
                            <button className="text-gray-400 text-sm font-medium hover:text-gray-600">See All</button>
                        </div>

                        <div className="space-y-6">
                            {transactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl shadow-sm border border-gray-200">
                                            {tx.icon}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{tx.name}</p>
                                            <p className={`text-xs font-medium ${tx.status === 'Successful' ? 'text-green-500' : 'text-red-500'}`}>
                                                {tx.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900">₦{tx.amount}</p>
                                        <p className="text-[10px] text-gray-400 mt-1">{tx.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </ScrollArea>
                <DashboardBottomNav currentTab='Wallet' />
            </div>
        </div>
    );
}
