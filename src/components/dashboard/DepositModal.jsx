import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, CheckCircle2, Loader2, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDepositXPMutation } from '@/redux/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';

export default function DepositModal({ trigger }) {
    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector(selectCurrentUser);
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState(false);
    const [depositXP, { isLoading }] = useDepositXPMutation();

    const handleDeposit = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        try {
            const role = user.accountable_type === "App\\Models\\Teacher" ? "teacher" : "student"

            await depositXP({ amount: parseFloat(amount), type: role, id: user.id }).unwrap();
            setSuccess(true);
            toast.success("XP Synchronized Successfully");
        } catch (err) {
            toast.error(err?.data?.message || "Failed to add XP");
        }
    };

    const reset = () => {
        setSuccess(false);
        setAmount('');
        setIsOpen(false);
    };

    const xdValue = amount ? (parseFloat(amount) / 10).toFixed(2) : '0.00';

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setTimeout(() => setSuccess(false), 300);
        }}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border-white/10 text-white p-0 overflow-hidden gap-0 rounded-[2.5rem] shadow-2xl">
                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="p-10 flex flex-col items-center text-center space-y-6"
                        >
                            <div className="h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2 border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                <CheckCircle2 size={48} className="animate-pulse" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter">XP Synchronized</h2>
                                <p className="text-white/40 font-medium">
                                    {amount} XP has been successfully injected into your core balance.
                                </p>
                            </div>
                            <Button onClick={reset} className="w-full h-14 bg-white text-black hover:bg-[#a6b1ff] rounded-2xl font-black uppercase tracking-widest transition-all">
                                Return to Command
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <DialogHeader className="p-8 pb-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-[#a6b1ff]/10 rounded-lg border border-[#a6b1ff]/20">
                                        <Wallet className="text-[#a6b1ff]" size={20} />
                                    </div>
                                    <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">Deposit XP</DialogTitle>
                                </div>
                                <DialogDescription className="text-white/40 font-medium">
                                    Inject XP to increase your influence and create more challenges.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleDeposit} className="p-8 pt-2 space-y-8">
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <Label htmlFor="amount" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1 mb-2 block">Amount (XP)</Label>
                                        <div className="relative">
                                            <Input
                                                id="amount"
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                placeholder="Enter XP amount"
                                                className="bg-white/5 border-white/10 h-16 text-2xl font-black text-white rounded-2xl focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/20 placeholder:text-white/10 transition-all pl-6"
                                            />
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end pointer-events-none">
                                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">In Diamonds</span>
                                                <span className="text-sm font-bold text-[#a6b1ff] italic">💎 {xdValue} XD</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                            <TrendingUp size={16} className="text-emerald-400 mb-2" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Bonus</span>
                                            <span className="text-sm font-bold text-white">1.2x Active</span>
                                        </div>
                                        <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                                            <Sparkles size={16} className="text-[#a6b1ff] mb-2" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Speed</span>
                                            <span className="text-sm font-bold text-white">Instant</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading || !amount || parseFloat(amount) <= 0}
                                    className="w-full h-16 bg-gradient-to-br from-[#a6b1ff] to-[#6d28d9] hover:from-[#b9c4ff] hover:to-[#7c3aed] text-white rounded-2xl font-black text-lg uppercase tracking-[0.1em] shadow-[0_10px_30px_rgba(109,40,217,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={24} />
                                    ) : (
                                        <>
                                            Initiate Injection
                                            <Sparkles size={20} className="animate-pulse" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
