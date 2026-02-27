import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Video,
    ChevronDown,
    ChevronRight,
    Lock,
    Users,
    GraduationCap,
    Shield,
    Home,
    PlayCircle,
    FileText,
    CheckCircle,
    X,
    AmphoraIcon
} from 'lucide-react';

const Docs = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [activeSubsection, setActiveSubsection] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
        setActiveSubsection(null);
    };

    const toggleSubsection = (subsection) => {
        setActiveSubsection(activeSubsection === subsection ? null : subsection);
    };

    const documentation = {
        authentication: {
            title: "Authentication",
            icon: Lock,
            color: "from-purple-500 to-pink-500",
            pages: [
                {
                    name: "Sign Up",
                    path: "/auth/signup",
                    description: "Create a new account with email and password",
                    videoUrl: "video/signup.mp4"
                },
                {
                    name: "Login",
                    path: "/auth/login",
                    description: "Sign in to your existing account",
                    videoUrl: "/video/login.mp4"
                },
                {
                    name: "Forgot Password",
                    path: "/auth/forgot-password",
                    description: "Reset your password if you've forgotten it",
                    videoUrl: "/videos/forgot-password.mp4"
                }
            ]
        },
        general: {
            title: "General Pages",
            icon: Home,
            color: "from-blue-500 to-cyan-500",
            pages: [
                {
                    name: "Home",
                    path: "/",
                    description: "Landing page with overview of TechXplora platform",
                    videoUrl: "/video/index.mp4"
                },
                {
                    name: "How To Use",
                    path: "/how-to-use",
                    description: "Learn how to navigate and use the platform effectively",
                    videoUrl: "/video/use.mp4"
                },
                {
                    name: "Chess",
                    path: "/chess",
                    description: "Play chess to improve strategic thinking skills",
                    videoUrl: "/videos/chess.mp4"
                }
            ]
        },
        student: {
            title: "Student Pages",
            icon: GraduationCap,
            color: "from-green-500 to-emerald-500",
            pages: [
                {
                    name: "Dashboard",
                    path: "/dashboard",
                    description: "Your personalized student dashboard with overview of activities",
                    videoUrl: "/video/dashboard.mp4"
                },
                {
                    name: "Quiz Completion",
                    path: "/dashboard/quizzes/completion",
                    description: "View your quiz results and performance",
                    videoUrl: "/video/quiz.mp4"
                }
            ]
        },
        teacher: {
            title: "Teacher Pages",
            icon: Users,
            color: "from-orange-500 to-red-500",
            pages: [
                {
                    name: "Courses",
                    path: "/dashboard/teacher/courses",
                    description: "View and manage your created courses",
                    videoUrl: "/video/course.mp4"
                },
                {
                    name: "Wallet XP",
                    path: "/dashboard/wallet",
                    description: "View your wallet balance and transactions",
                    videoUrl: "/video/wallet.mp4"
                },
                {
                    name: "Bulk Upload",
                    path: "/dashboard/quiz/details",
                    description: "Bulk upload questions for a quiz",
                    videoUrl: "/video/bulk.mp4"
                }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] py-8 md:py-12 px-4 md:px-8">
            <div style={{ marginTop: "100px" }} className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8 md:mb-16"
                >
                    <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6">
                        <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-[#a6b1ff]" />
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase italic">
                            Documentation
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-white/60 font-medium max-w-3xl mx-auto">
                        Complete guide to using TechXplora platform. Learn how to navigate, create content, and maximize your learning experience.
                    </p>
                </motion.div>

                {/* Documentation Sections */}
                <div className="space-y-6">
                    {Object.entries(documentation).map(([key, section], index) => {
                        const Icon = section.icon;
                        const isActive = activeSection === key;

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
                            >
                                {/* Section Header */}
                                <button
                                    onClick={() => toggleSection(key)}
                                    className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-white/5 transition-all group"
                                >
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`p-3 md:p-4 rounded-2xl bg-gradient-to-br ${section.color}`}>
                                            <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <h2 className="text-xl md:text-2xl font-black text-white uppercase italic">
                                                {section.title}
                                            </h2>
                                            <p className="text-sm text-white/40 font-medium">
                                                {section.pages.length} pages
                                            </p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isActive ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-6 h-6 text-white/40 group-hover:text-white/60" />
                                    </motion.div>
                                </button>

                                {/* Section Content */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="border-t border-white/10"
                                        >
                                            <div className="p-6 space-y-4">
                                                {section.pages.map((page, pageIndex) => {
                                                    const isSubActive = activeSubsection === `${key}-${pageIndex}`;

                                                    return (
                                                        <div
                                                            key={pageIndex}
                                                            className="bg-white/5 rounded-2xl overflow-hidden border border-white/10"
                                                        >
                                                            {/* Page Header */}
                                                            <button
                                                                onClick={() => toggleSubsection(`${key}-${pageIndex}`)}
                                                                className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-white/5 transition-all group"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <FileText className="w-5 h-5 text-[#a6b1ff]" />
                                                                    <div className="text-left">
                                                                        <h3 className="text-base md:text-lg font-bold text-white">
                                                                            {page.name}
                                                                        </h3>
                                                                        <p className="text-xs text-white/40 font-mono">
                                                                            {page.path}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                <ChevronRight
                                                                    className={`w-5 h-5 text-white/40 transition-transform ${isSubActive ? 'rotate-90' : ''
                                                                        }`}
                                                                />
                                                            </button>

                                                            {/* Page Content */}
                                                            <AnimatePresence>
                                                                {isSubActive && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: "auto", opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        className="border-t border-white/10"
                                                                    >
                                                                        <div className="p-4 md:p-6 space-y-4">
                                                                            {/* Description */}
                                                                            <div className="flex items-start gap-3">
                                                                                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                                                                <p className="text-white/70 font-medium">
                                                                                    {page.description}
                                                                                </p>
                                                                            </div>

                                                                            {/* Video Tutorial */}
                                                                            <div className="bg-black/40 rounded-xl p-4 md:p-6 border border-white/10">
                                                                                <div className="flex items-center gap-3 mb-4">
                                                                                    <Video className="w-5 h-5 text-[#a6b1ff]" />
                                                                                    <h4 className="text-sm font-black text-white uppercase tracking-wider">
                                                                                        Video Tutorial
                                                                                    </h4>
                                                                                </div>
                                                                                <div
                                                                                    onClick={() => setSelectedVideo(page)}
                                                                                    className="aspect-video bg-white/5 rounded-lg flex items-center justify-center border border-white/10 group cursor-pointer hover:border-[#a6b1ff]/50 transition-all overflow-hidden relative"
                                                                                >
                                                                                    <div className="text-center z-10">
                                                                                        <PlayCircle className="w-12 h-12 md:w-16 md:h-16 text-[#a6b1ff] mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                                                                                        <p className="text-white/40 text-sm font-medium">
                                                                                            Click to play tutorial
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="absolute inset-0 bg-[#a6b1ff]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/40 font-medium">
                        Need more help? Contact support at{' '}
                        <a href="mailto:support@techxplora.com" className="text-[#a6b1ff] hover:underline">
                            support@techxplora.com
                        </a>
                    </p>
                </motion.div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        <div
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                            onClick={() => setSelectedVideo(null)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-5xl aspect-video bg-[#0d0d0d] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                                <button
                                    onClick={() => setSelectedVideo(null)}
                                    className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                                >
                                    <X className="w-5 h-5 md:w-6 md:h-6" />
                                </button>
                            </div>

                            <video
                                src={selectedVideo.videoUrl}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                            >
                                Your browser does not support the video tag.
                            </video>

                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-lg md:text-xl font-bold text-white">
                                    {selectedVideo.name}
                                </h3>
                                <p className="text-sm text-white/60">
                                    Tutorial Guide
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Docs;
