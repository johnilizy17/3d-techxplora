import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="w-full max-w-sm bg-[#1a1520] border border-white/10 rounded-[2rem] p-6 pointer-events-auto shadow-2xl backdrop-blur-xl relative overflow-hidden">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7c3aed]/10 rounded-full blur-2xl translate-x-10 -translate-y-10"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#a6b1ff]/10 rounded-full blur-2xl -translate-x-10 translate-y-10"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-[#ef4444]">
                                    <LogOut size={32} strokeWidth={1.5} className="ml-1" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">Logout</h3>
                                <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                    Are you sure you want to logout? You will need to login again to access your account.
                                </p>

                                <div className="flex gap-3 w-full">
                                    <Button
                                        onClick={onClose}
                                        className="flex-1 h-12 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-all"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={onConfirm}
                                        className="flex-1 h-12 bg-[#ef4444] hover:bg-[#dc2626] text-white rounded-xl font-semibold shadow-lg shadow-red-900/20"
                                    >
                                        Yes, Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
