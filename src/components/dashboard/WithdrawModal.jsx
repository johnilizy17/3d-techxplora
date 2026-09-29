import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Landmark, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WithdrawModal({ trigger, balance }) {
    const [success, setSuccess] = React.useState(false);

    const handleWithdraw = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSuccess(true);
        }, 1000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#1a1520] border-white/10 text-white p-0 overflow-hidden gap-0 rounded-[32px]">
                {success ? (
                    <SuccessView onClose={() => setSuccess(false)} />
                ) : (
                    <WithdrawForm onSubmit={handleWithdraw} balance={balance} />
                )}
            </DialogContent>
        </Dialog>
    );
}

function WithdrawForm({ onSubmit, balance }) {
    return (
        <>
            <DialogHeader className="p-6 pb-2">
                <DialogTitle className="text-xl font-bold">Withdraw Funds</DialogTitle>
                <DialogDescription className="text-purple-200/60">
                    Select your withdrawal method and amount.
                </DialogDescription>
            </DialogHeader>
            <div className="p-6 pt-2 space-y-6">
                {/* Balance Info */}
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex justify-between items-center">
                    <span className="text-sm text-gray-400">Available Balance</span>
                    <span className="text-lg font-bold text-white">₦{balance}</span>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount" className="text-gray-300 ml-1">Amount</Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
                            <Input
                                id="amount"
                                placeholder="0.00"
                                className="bg-black/20 border-white/10 pl-8 h-12 text-white rounded-xl focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/20 placeholder:text-gray-600"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bankName" className="text-gray-300 ml-1">Bank Name</Label>
                        <Input
                            id="bankName"
                            placeholder="e.g. Chase Bank"
                            className="bg-black/20 border-white/10 h-12 text-white rounded-xl focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/20 placeholder:text-gray-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="account" className="text-gray-300 ml-1">Account Number</Label>
                        <Input
                            id="account"
                            placeholder="0000 0000 0000"
                            className="bg-black/20 border-white/10 h-12 text-white rounded-xl focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/20 placeholder:text-gray-600"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="w-full h-12 bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] hover:from-[#4c1d95] hover:to-[#6d28d9] rounded-xl font-bold text-white shadow-lg">
                            Confirm Bank Transfer
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

function SuccessView({ onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 py-12 flex flex-col items-center text-center space-y-4"
        >
            <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 mb-2">
                <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold">Request Sent!</h2>
            <p className="text-gray-400">
                Your withdrawal request has been submitted successfully. Funds will arrive within 24-48 hours.
            </p>
            <Button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white rounded-xl mt-4 w-full h-12">
                Close
            </Button>
        </motion.div>
    )
}
