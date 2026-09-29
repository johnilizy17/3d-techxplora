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
import { Send, CheckCircle2, Loader2, Search, User, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransferXPMutation, useVerifyAccountMutation } from '@/redux/api/authApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { toast } from 'sonner';

export default function TransferModal({ trigger }) {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1); // 1: Verify, 2: Amount, 3: Success
    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState(null);
    const user = useSelector(selectCurrentUser);

    const [verifyAccount, { isLoading: isVerifying }] = useVerifyAccountMutation();
    const [transferXP, { isLoading: isTransferring }] = useTransferXPMutation();

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            const res = await verifyAccount({ email }).unwrap();
            if (res.status === "success" || res.message === "Account verified successfully") {
                setRecipient(res.data);
                setStep(2);
            } else {
                toast.error("Account not found");
            }
        } catch (err) {
            toast.error(err?.data?.message || "Verification failed");
        }
    };

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!amount || parseFloat(amount) <= 0) return;

        try {
            await transferXP({
                email,
                amount: parseFloat(amount),
                from_id: user?.id,
                from_type: user?.accountable_type?.includes('Teacher') ? 'teacher' : 'student',
                to_id: recipient.id,
                to_type: recipient.accountable_type.includes('Teacher') ? 'teacher' : 'student'
            }).unwrap();
            setStep(3);
        } catch (err) {
            toast.error(err?.data?.message || "Transfer failed");
        }
    };

    const reset = () => {
        setStep(1);
        setEmail('');
        setAmount('');
        setRecipient(null);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setTimeout(() => reset(), 300);
        }}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#0a0a0a]/90 backdrop-blur-2xl border-white/10 text-white p-0 overflow-hidden gap-0 rounded-[2.5rem] shadow-2xl">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8"
                        >
                            <DialogHeader className="mb-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-pink-500/10 rounded-lg border border-pink-500/20">
                                        <Send className="text-pink-400" size={20} />
                                    </div>
                                    <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">Transfer XP</DialogTitle>
                                </div>
                                <DialogDescription className="text-white/40 font-medium">
                                    Send XP to another operative in the Xplora network.
                                </DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleVerify} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Recipient Email</Label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="operative@techxplora.com"
                                            className="bg-white/5 border-white/10 h-14 font-bold text-white rounded-xl focus:border-pink-500/50 focus:ring-pink-500/10 transition-all pl-12"
                                        />
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isVerifying || !email}
                                    className="w-full h-14 bg-white text-black hover:bg-pink-100 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                >
                                    {isVerifying ? <Loader2 className="animate-spin" size={20} /> : "Verify Identity"}
                                    <ArrowRight size={18} />
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8"
                        >
                            <DialogHeader className="mb-6">
                                <DialogTitle className="text-2xl font-black uppercase italic tracking-tight">Confirm Amount</DialogTitle>
                            </DialogHeader>

                            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/20">
                                    <User size={24} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none mb-1">Recipient Verified</p>
                                    <p className="font-bold text-white text-lg leading-none">{recipient?.fullname || recipient?.name}</p>
                                    <p className="text-xs text-white/40">{email}</p>
                                </div>
                                <button onClick={() => setStep(1)} className="p-2 hover:bg-white/5 rounded-lg text-white/20 dark:text-white/20 hover:text-foreground dark:hover:text-white/80 transition-all hover:font-bold">
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleTransfer} className="space-y-8">
                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">Transfer Amount (XP)</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                        autoFocus
                                        className="bg-white/5 border-white/10 h-20 text-4xl font-black text-white rounded-2xl focus:border-pink-500/50 focus:ring-pink-500/10 text-center transition-all"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isTransferring || !amount || parseFloat(amount) <= 0}
                                    className="w-full h-16 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-lg shadow-pink-500/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                                >
                                    {isTransferring ? (
                                        <Loader2 className="animate-spin" size={24} />
                                    ) : (
                                        <>
                                            Synchronize Transfer
                                            <Send size={20} />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-10 flex flex-col items-center text-center space-y-6"
                        >
                            <div className="h-24 w-24 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-2 border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.2)]">
                                <CheckCircle2 size={48} className="animate-bounce" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter">Transfer Complete</h2>
                                <p className="text-white/40 font-medium">
                                    Operative <span className="text-white">{recipient?.fullname}</span> has received {amount} XP.
                                </p>
                            </div>
                            <Button onClick={reset} className="w-full h-14 bg-white text-black hover:bg-pink-100 rounded-2xl font-black uppercase tracking-widest transition-all">
                                Mission Accomplished
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
