import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp, Book, Layers } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SyllabusDrawer from '@/components/dashboard/SyllabusDrawer';
import { useGetSyllabusQuery, useDeleteSyllabusMutation } from '@/redux/api/teacherApi';
import { Button } from '@/components/ui/button';

export default function Syllabus() {
    const { data: apiResponse, isLoading } = useGetSyllabusQuery();
    const syllabus = apiResponse?.data || [];
    const [deleteSyllabus] = useDeleteSyllabusMutation();

    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState('chapter'); // 'chapter' or 'subtopic'
    const [selectedChapterId, setSelectedChapterId] = useState(null);

    // Expansion State
    const [expandedChapters, setExpandedChapters] = useState({});

    const toggleChapter = (id) => {
        setExpandedChapters(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddChapter = () => {
        setDrawerMode('chapter');
        setSelectedChapterId(null);
        setIsDrawerOpen(true);
    };

    const handleAddSubTopic = (chapterId) => {
        setDrawerMode('subtopic');
        setSelectedChapterId(chapterId);
        setIsDrawerOpen(true);
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this chapter?')) {
            try {
                await deleteSyllabus(id).unwrap();
            } catch (err) {
                console.error('Failed to delete syllabus:', err);
            }
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const card3DVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -15,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            rotateX: 5,
            boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
            zIndex: 10,
            transition: { duration: 0.3 }
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-20 px-6 lg:px-12 pt-10 overflow-x-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-white italic tracking-tighter mb-2">
                            My Syllabus
                        </h1>
                        <p className="text-purple-200/60 font-medium">
                            Manage your course roadmap and learning objectives.
                        </p>
                    </div>
                    <motion.button
                        onClick={handleAddChapter}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 2 }}
                        className="relative group bg-gradient-to-b from-purple-500 to-purple-700 text-white font-black rounded-2xl px-8 py-4 shadow-[0_10px_0_0_rgb(88,28,135),0_15px_20px_0_rgba(0,0,0,0.4)] hover:shadow-[0_12px_0_0_rgb(88,28,135),0_20px_25px_0_rgba(0,0,0,0.5)] active:shadow-[0_0_0_0_rgb(88,28,135),0_0_0_0_rgba(0,0,0,0)] active:translate-y-[10px] transition-all duration-150 border-2 border-purple-400/30"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30 shadow-inner">
                                <Plus className="text-white drop-shadow-md" size={24} strokeWidth={3} />
                            </div>
                            <span className="text-xl tracking-tight drop-shadow-md uppercase">Add Topic</span>
                        </div>

                        {/* Highlights for glossy 3D look */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-40 pointer-events-none" />
                        <div className="absolute top-1 left-2 right-2 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl opacity-50 pointer-events-none" />
                    </motion.button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-white/50 font-medium animate-pulse">Loading Syllabus...</p>
                    </div>
                ) : syllabus.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="text-8xl mb-6"
                        >
                            📚
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Syllabus Yet</h3>
                        <p className="text-white/50 max-w-sm mb-8">
                            Start creating your course structure by adding your first chapter.
                        </p>
                        <Button
                            onClick={handleAddChapter}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl px-8 py-3"
                        >
                            Create First Chapter
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-1000"
                    >
                        {syllabus.map((chapter) => (
                            <motion.div
                                key={chapter.id}
                                variants={card3DVariants}
                                whileHover="hover"
                                onClick={() => toggleChapter(chapter.id)}
                                className="group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden cursor-pointer"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Glass Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <div className="p-8 relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-purple-500/20 p-3 rounded-2xl text-purple-300">
                                            <Book size={24} />
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(chapter.id, e)}
                                            className="p-2 text-white/20 hover:text-red-400 hover:bg-white/5 rounded-full transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                                        {chapter.title}
                                    </h3>
                                    <p className="text-white/60 text-sm mb-6 line-clamp-2">
                                        {chapter.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-300">
                                            <Layers size={14} />
                                            {chapter.topics?.length || 0} Sub-Topics
                                        </div>
                                        {expandedChapters[chapter.id] ? (
                                            <ChevronUp className="text-white/50" />
                                        ) : (
                                            <ChevronDown className="text-white/50" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content (Paper Insert Look) */}
                                <AnimatePresence>
                                    {expandedChapters[chapter.id] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="bg-black/20 border-t border-white/5"
                                        >
                                            <div className="p-6 space-y-3">
                                                {chapter.topics && chapter.topics.length > 0 ? (
                                                    chapter.topics.map((sub, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ x: -20, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                                        >
                                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                            <span className="text-sm font-medium text-white/80">
                                                                {sub.topics}
                                                            </span>
                                                        </motion.div>
                                                    ))
                                                ) : (
                                                    <p className="text-white/30 text-center text-sm py-2 italic">
                                                        No sub-topics yet.
                                                    </p>
                                                )}

                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddSubTopic(chapter.id);
                                                    }}
                                                    className="w-full mt-4 bg-white/5 hover:bg-purple-500/20 text-purple-300 text-sm font-bold py-3 rounded-xl transition-all"
                                                >
                                                    <Plus size={16} className="mr-2" />
                                                    Add Sub-Topic
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Create Drawer */}
                <SyllabusDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    mode={drawerMode}
                    parentId={selectedChapterId}
                />
            </div>
        </DashboardLayout>
    );
}
