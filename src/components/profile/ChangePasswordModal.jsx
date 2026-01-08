import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Lock, Eye, EyeOff } from 'lucide-react';

export default function ChangePasswordModal({ isOpen, onClose }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle password change logic here
        console.log('Password change requested:', formData);
        onClose();
    };

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
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 500 }}
                        className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
                    >
                        <div className="w-full max-w-md bg-[#1a1520] border-t border-white/10 rounded-t-[2.5rem] p-8 pointer-events-auto relative shadow-2xl backdrop-blur-xl">
                            {/* Drag Handle */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full" />

                            <div className="mt-2 mb-8 text-center">
                                <h2 className="text-xl font-bold text-white">Change Password</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="oldPassword" className="text-gray-400 font-normal ml-1">Old Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="oldPassword"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter old password"
                                                className="bg-black/20 border-white/10 h-14 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 px-4 text-base placeholder:text-gray-600"
                                                value={formData.oldPassword}
                                                onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword" className="text-gray-400 font-normal ml-1">New Password</Label>
                                        <div className="relative">
                                            <Input
                                                id="newPassword"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter new password"
                                                className="bg-black/20 border-white/10 h-14 text-white rounded-2xl focus:border-[#7c3aed] focus:ring-[#7c3aed]/20 px-4 text-base placeholder:text-gray-600"
                                                value={formData.newPassword}
                                                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-14 bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] hover:from-[#4c1d95] hover:to-[#6d28d9] text-white font-bold rounded-full text-lg tracking-wide uppercase shadow-lg shadow-purple-900/20"
                                >
                                    Save
                                </Button>
                                <div className="h-4" /> {/* Bottom spacer */}
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
