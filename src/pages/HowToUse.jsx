import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, ChevronRight, X, Users, Handshake, Building } from 'lucide-react';
import VisualBackground from "@/components/collectors/VisualBackground";
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const ModalCard = ({ icon: Icon, title, description, to, onClick }) => {
    const CardContent = (
        <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white/90 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-indigo-400 dark:hover:border-[#a6b1ff]/30 transition-all duration-300 cursor-pointer">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 dark:from-[#a6b1ff]/20 dark:to-[#c7aff8]/20 flex items-center justify-center border-2 border-indigo-300 dark:border-[#a6b1ff]/20 group-hover:scale-110 transition-transform shadow-lg">
                <Icon className="w-7 h-7 text-white dark:text-[#a6b1ff]" />
            </div>
            <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-[#a6b1ff] transition-colors">{title}</h3>
                <p className="text-sm text-gray-900 dark:text-gray-400 leading-snug font-bold">{description}</p>
            </div>
        </div>
    );

    if (to) return <Link to={to} onClick={onClick}>{CardContent}</Link>;
    return <div onClick={onClick}>{CardContent}</div>;
};

export default function HowToUse() {
    const [showVideo, setShowVideo] = useState(false);
    const [isStudentTeacherOpen, setIsStudentTeacherOpen] = useState(false);
    const [isPartnerOpen, setIsPartnerOpen] = useState(false);

    return (
        <div className="relative min-h-screen pt-20 overflow-hidden">
            {/* Background with 3D elements (dimmed) */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <VisualBackground />
            </div>

            {/* Video Modal */}
            {showVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <iframe
                            src="https://www.youtube.com/embed/3Irx1TdHvfA?autoplay=1"
                            title="Techxplora Trailer"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

                {/* Video Section */}
                <div className="mb-24 relative rounded-[2rem] overflow-hidden aspect-video shadow-[0_0_100px_rgba(166,177,255,0.15)] group animate-in fade-in slide-in-from-top duration-1000 bg-gray-900 dark:bg-gray-900">
                    {/* Video Banner Image */}
                    <img 
                        src="/video.png" 
                        alt="TechXplora Demo" 
                        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
                    />

                    {/* Overlay on hover - lighter in light mode */}
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50 transition-all duration-300 z-[1]" />

                    {/* Play Button */}
                    <div
                        onClick={() => setShowVideo(true)}
                        className="absolute inset-0 flex items-center justify-center z-10"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/90 dark:bg-white/90 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-all duration-500 hover:bg-[#a6b1ff] hover:border-[#a6b1ff]">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-[#a6b1ff] border-b-[12px] border-b-transparent ml-2 group-hover:border-l-white transition-colors" />
                        </div>
                        <p className="absolute mt-32 text-white dark:text-white font-medium tracking-widest text-sm uppercase opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300 drop-shadow-lg">
                            Watch Tutorial
                        </p>
                    </div>

                    {/* Gradient Overlay - lighter in light mode */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent dark:from-black/80 pointer-events-none z-[2]" />

                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <h3 className="text-2xl font-bold text-white mb-2">Welcome to Techxplora</h3>
                        <p className="text-gray-300">A quick introduction to the future of education</p>
                    </div>
                </div>

                {/* Header */}
                <div className="text-center mb-24 animate-in fade-in slide-in-from-bottom duration-700">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        <span className="gradient-text-shine">How It Works</span>
                    </h1>
                    <p className="text-xl text-gray-900 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed font-bold">
                        Connect, Learn, and Earn in the Techxplora Metaverse. Choose your path below.
                    </p>
                </div>

                {/* Cards container */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">

                    {/* Teacher Card */}
                    <div className="group relative glass-morphism-strong p-10 rounded-[2rem] hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_50px_rgba(199,175,248,0.2)] bg-white/80 dark:bg-transparent border-2 border-purple-200 dark:border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 to-pink-100/50 dark:from-[#c7aff8]/5 dark:to-transparent rounded-[2rem]" />

                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 dark:bg-[#c7aff8]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-lg">
                                <BookOpen className="w-8 h-8 text-white dark:text-[#c7aff8]" />
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">For Teachers</h2>
                            <p className="text-gray-900 dark:text-gray-400 mb-8 leading-relaxed font-bold">
                                Create engaging quizzes and challenges for your students. Track progress and reward excellence with unique digital collectibles.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Create custom quizzes",
                                    "Monitor student performance",
                                    "Mint achievement badges"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-900 dark:text-gray-300 font-bold">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-[#c7aff8]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsPartnerOpen(true)}
                                className="flex items-center gap-2 text-purple-600 dark:text-[#c7aff8] font-semibold group-hover:gap-4 transition-all"
                            >
                                Start Teaching <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Student Card */}
                    <div className="group relative glass-morphism-strong p-10 rounded-[2rem] hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_50px_rgba(166,177,255,0.2)] bg-white/80 dark:bg-transparent border-2 border-blue-200 dark:border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 dark:from-[#a6b1ff]/5 dark:to-transparent rounded-[2rem]" />

                        <div className="relative">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 dark:bg-[#a6b1ff]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:-rotate-6 transition-transform shadow-lg">
                                <GraduationCap className="w-8 h-8 text-white dark:text-[#a6b1ff]" />
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">For Students</h2>
                            <p className="text-gray-900 dark:text-gray-400 mb-8 leading-relaxed font-bold">
                                Master your subjects, ace the quizzes, and collect rare digital artifacts to showcase in your personal gallery.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Complete daily challenges",
                                    "Earn experience points (XP)",
                                    "Unlock rare collectibles"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-900 dark:text-gray-300 font-bold">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-[#a6b1ff]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsStudentTeacherOpen(true)}
                                className="flex items-center gap-2 text-blue-600 dark:text-[#a6b1ff] font-semibold group-hover:gap-4 transition-all"
                            >
                                Start Learning <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            {/* Student/Teacher Modal */}
            <Dialog open={isStudentTeacherOpen} onOpenChange={setIsStudentTeacherOpen}>
                <DialogContent className="max-w-md bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-2xl border-2 border-gray-300 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Join as...</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <ModalCard
                            icon={GraduationCap}
                            title="Student"
                            description="Learn, join quizzes and get great scores"
                            to="/auth/signup"
                            onClick={() => setIsStudentTeacherOpen(false)}
                        />
                        <ModalCard
                            icon={Users}
                            title="Teacher"
                            description="Create quizzes or manage results"
                            to="/auth/group"
                            onClick={() => setIsStudentTeacherOpen(false)}
                        />
                        <ModalCard
                            icon={Award}
                            title="I'm an NJFP Fellow/Alumni"
                            description="Access NJFP courses and track progress"
                            to="/auth/alumni"
                            onClick={() => setIsStudentTeacherOpen(false)}
                        />
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setIsStudentTeacherOpen(false)}
                            className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-white/90 hover:font-bold transition-all text-sm font-semibold tracking-wide uppercase"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Partner Modal */}
            <Dialog open={isPartnerOpen} onOpenChange={setIsPartnerOpen}>
                <DialogContent className="max-w-md bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-2xl border-2 border-gray-300 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">Partner with us...</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <ModalCard
                            icon={Handshake}
                            title="Teacher Admin"
                            description="Support education and gain visibility"
                            to="/auth/signup/?page=3"
                            onClick={() => setIsPartnerOpen(false)}
                        />
                        <ModalCard
                            icon={Building}
                            title="Partner"
                            description="Collaborate with us for deeper integration"
                            to="/auth/signup/?page=3"
                            onClick={() => setIsPartnerOpen(false)}
                        />
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setIsPartnerOpen(false)}
                            className="text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-white/90 hover:font-bold transition-all text-sm font-semibold tracking-wide uppercase"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
