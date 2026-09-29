import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCreateGroupMutation } from '@/redux/api/teacherApi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { toast } from 'sonner';

export default function CreateGroup() {
    const navigate = useNavigate();
    const [createGroup, { isLoading }] = useCreateGroupMutation();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limit description to 150 characters
        if (name === 'description' && value.length > 150) {
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Group Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Group Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const result = await createGroup(formData).unwrap();
            toast.success('Group successfully created!');
            navigate('/dashboard/groups');
        } catch (error) {
            console.error('Failed to create group:', error);
            toast.error(error?.data?.message || 'Failed to create group. Please try again.');
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="w-full relative">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-4 sm:mx-6 lg:mx-10 mt-6 lg:mt-8"
                    >
                        {/* Back Button */}
                        <button
                            onClick={() => navigate('/dashboard/groups')}
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold text-sm uppercase tracking-wider">Back to Groups</span>
                        </button>

                        {/* Page Title */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                                    <Users className="text-white" size={28} />
                                </div>
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-none uppercase italic">
                                        Create a Group
                                    </h1>
                                    <p className="text-white/60 text-sm font-medium mt-1">
                                        Build your learning community
                                    </p>
                                </div>
                            </div>
                            <div className="h-1 w-20 bg-gradient-to-r from-[#a6b1ff] to-transparent rounded-full" />
                        </div>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mx-4 sm:mx-6 lg:mx-10 relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#1a1f4d] via-[#2a2f6d] to-[#1a1f4d] border border-[#a6b1ff]/20 shadow-2xl"
                    >
                        {/* Background Decorations */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px]" />

                        {/* Decorative Sparkles */}
                        <div className="absolute top-6 right-8 hidden lg:block">
                            <Sparkles className="text-purple-400 animate-pulse" size={20} />
                        </div>
                        <div className="absolute bottom-8 right-1/4 hidden lg:block">
                            <Sparkles className="text-indigo-400 animate-pulse" size={16} style={{ animationDelay: '0.5s' }} />
                        </div>

                        <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                                {/* Group Title Input */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-black uppercase tracking-wider text-white/80 mb-3">
                                        Group Title <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="Enter your group title"
                                            className={`w-full px-5 py-4 bg-white/5 backdrop-blur-xl border ${errors.title ? 'border-rose-500/50' : 'border-white/10'
                                                } rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#a6b1ff]/50 focus:bg-white/10 transition-all font-medium`}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                            <Users size={20} className="text-white/30" />
                                        </div>
                                    </div>
                                    {errors.title && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-rose-400 text-xs font-bold mt-2 flex items-center gap-1"
                                        >
                                            <span className="w-1 h-1 rounded-full bg-rose-400" />
                                            {errors.title}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Group Description Input */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-black uppercase tracking-wider text-white/80 mb-3">
                                        Group Description <span className="text-rose-400">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Enter your group description"
                                        rows={4}
                                        className={`w-full px-5 py-4 bg-white/5 backdrop-blur-xl border ${errors.description ? 'border-rose-500/50' : 'border-white/10'
                                            } rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-[#a6b1ff]/50 focus:bg-white/10 transition-all font-medium resize-none`}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        <div>
                                            {errors.description && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-rose-400 text-xs font-bold flex items-center gap-1"
                                                >
                                                    <span className="w-1 h-1 rounded-full bg-rose-400" />
                                                    {errors.description}
                                                </motion.p>
                                            )}
                                        </div>
                                        <span className={`text-xs font-bold ${formData.description.length >= 150 ? 'text-rose-400' : 'text-white/40'
                                            }`}>
                                            {formData.description.length}/150
                                        </span>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/20 mt-0.5">
                                            <Sparkles size={16} className="text-indigo-300" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-1">
                                                Quick Tip
                                            </h3>
                                            <p className="text-xs text-white/60 font-medium leading-relaxed">
                                                Choose a clear and descriptive title for your group. A good description helps students understand what the group is about.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Submit Button with 3D Effect */}
                                <div className="pt-4">
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{
                                            scale: isLoading ? 1 : 1.02,
                                            y: isLoading ? 0 : -2,
                                        }}
                                        whileTap={{
                                            scale: isLoading ? 1 : 0.98,
                                            y: isLoading ? 0 : 2,
                                        }}
                                        style={{
                                            transformStyle: 'preserve-3d',
                                            transform: 'perspective(1000px)',
                                        }}
                                        className={`relative w-full px-8 py-5 rounded-2xl font-black text-base uppercase tracking-wide transition-all flex items-center justify-center gap-2 group overflow-hidden ${isLoading ? 'cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {/* 3D Shadow Layers */}
                                        <div
                                            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isLoading
                                                    ? 'bg-white/10'
                                                    : 'bg-gradient-to-br from-indigo-600 to-purple-700 group-hover:from-indigo-700 group-hover:to-purple-800'
                                                }`}
                                            style={{
                                                transform: 'translateZ(-8px)',
                                                filter: 'blur(2px)',
                                            }}
                                        />

                                        {/* Main Button Surface */}
                                        <div
                                            className={`absolute inset-0 rounded-2xl transition-all duration-300 ${isLoading
                                                    ? 'bg-white/20'
                                                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:from-indigo-400 group-hover:to-purple-500'
                                                }`}
                                            style={{
                                                transform: 'translateZ(0px)',
                                                boxShadow: isLoading
                                                    ? 'none'
                                                    : '0 8px 32px rgba(99, 102, 241, 0.4), 0 4px 16px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                            }}
                                        />

                                        {/* Shine Effect */}
                                        {!isLoading && (
                                            <div
                                                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{ transform: 'translateZ(1px)' }}
                                            />
                                        )}

                                        {/* Button Content */}
                                        <span
                                            className={`relative z-10 flex items-center gap-2 ${isLoading ? 'text-white/40' : 'text-white'
                                                }`}
                                            style={{ transform: 'translateZ(4px)' }}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Creating Group...
                                                </>
                                            ) : (
                                                <>
                                                    Create Group
                                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                                </>
                                            )}
                                        </span>
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                    {/* Bottom Spacing */}
                    <div className="h-12" />
                </div>
            </div >
        </DashboardLayout >
    );
}
