import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, BookOpen, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateSyllabusMutation, useCreateSubTopicMutation } from '@/redux/api/teacherApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';

export default function SyllabusDrawer({ isOpen, onClose, mode = 'chapter', parentId = null }) {
    const user = useSelector(selectCurrentUser);
    const [createSyllabus, { isLoading: isCreatingSyllabus }] = useCreateSyllabusMutation();
    const [createSubTopic, { isLoading: isCreatingSubTopic }] = useCreateSubTopicMutation();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        topics: '' // For sub-topic
    });

    // Reset form when drawer opens/closes or mode changes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: '',
                description: '',
                subject: '',
                topics: ''
            });
        }
    }, [isOpen, mode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'chapter') {
                await createSyllabus({
                    title: formData.title,
                    description: formData.description,
                    subject: formData.subject,
                    teacher_id: user?.id
                }).unwrap();
            } else {
                await createSubTopic({
                    topics: formData.topics,
                    syllabus_id: parentId
                }).unwrap();
            }
            onClose();
        } catch (err) {
            console.error('Failed to create syllabus item:', err);
        }
    };

    const isLoading = isCreatingSyllabus || isCreatingSubTopic;

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

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-6 pb-40">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-white italic tracking-tighter">
                                    {mode === 'chapter' ? 'New Chapter' : 'New Sub-Topic'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {mode === 'chapter' ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Title</label>
                                            <div className="relative">
                                                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Introduction to Physics"
                                                    required
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Description</label>
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                placeholder="Brief overview of this chapter..."
                                                required
                                                rows={4}
                                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 px-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium resize-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Subject</label>
                                            <div className="relative">
                                                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="e.g. Science"
                                                    required
                                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Sub-Topic Name</label>
                                        <textarea
                                            name="topics"
                                            value={formData.topics}
                                            onChange={handleChange}
                                            placeholder="e.g. Newton's First Law"
                                            required
                                            rows={3}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 px-4 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-medium resize-none"
                                        />
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-6 rounded-xl text-lg shadow-lg shadow-purple-500/20"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Save size={20} />
                                            Save {mode === 'chapter' ? 'Chapter' : 'Sub-Topic'}
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
