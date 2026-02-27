import React, { useState } from 'react';
import { BookOpen, GraduationCap, Trophy, ChevronRight, X, Users, Handshake, Building } from 'lucide-react';
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
        <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#a6b1ff]/30 transition-all duration-300 cursor-pointer">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#a6b1ff]/20 to-[#c7aff8]/20 flex items-center justify-center border border-[#a6b1ff]/20 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7 text-[#a6b1ff]" />
            </div>
            <div className="text-left">
                <h3 className="text-lg font-bold text-white group-hover:text-[#a6b1ff] transition-colors">{title}</h3>
                <p className="text-sm text-gray-400 leading-snug">{description}</p>
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
                <div className="mb-24 relative rounded-[2rem] overflow-hidden aspect-video shadow-[0_0_100px_rgba(166,177,255,0.15)] group animate-in fade-in slide-in-from-top duration-1000">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a1520] to-[#0a0a0a] z-0" />

                    {/* Placeholder Grid Animation */}
                    <div className="absolute inset-0 z-0 opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Play Button */}
                    <div
                        onClick={() => setShowVideo(true)}
                        className="absolute inset-0 flex items-center justify-center z-10"
                    >
                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-all duration-500 hover:bg-[#a6b1ff] hover:border-[#a6b1ff]">
                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2 group-hover:border-l-black transition-colors" />
                        </div>
                        <p className="absolute mt-32 text-gray-400 font-medium tracking-widest text-sm uppercase opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                            Watch Tutorial
                        </p>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

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
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Connect, Learn, and Earn in the Techxplora Metaverse. Choose your path below.
                    </p>
                </div>

                {/* Cards container */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">

                    {/* Teacher Card */}
                    <div className="group relative glass-morphism-strong p-10 rounded-[2rem] hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_50px_rgba(199,175,248,0.2)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#c7aff8]/5 to-transparent rounded-[2rem]" />

                        <div className="relative">
                            <div className="w-16 h-16 bg-[#c7aff8]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                                <BookOpen className="w-8 h-8 text-[#c7aff8]" />
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-white">For Teachers</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Create engaging quizzes and challenges for your students. Track progress and reward excellence with unique digital collectibles.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Create custom quizzes",
                                    "Monitor student performance",
                                    "Mint achievement badges"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#c7aff8]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsPartnerOpen(true)}
                                className="flex items-center gap-2 text-[#c7aff8] font-semibold group-hover:gap-4 transition-all"
                            >
                                Start Teaching <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Student Card */}
                    <div className="group relative glass-morphism-strong p-10 rounded-[2rem] hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_0_50px_rgba(166,177,255,0.2)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#a6b1ff]/5 to-transparent rounded-[2rem]" />

                        <div className="relative">
                            <div className="w-16 h-16 bg-[#a6b1ff]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:-rotate-6 transition-transform">
                                <GraduationCap className="w-8 h-8 text-[#a6b1ff]" />
                            </div>

                            <h2 className="text-3xl font-bold mb-4 text-white">For Students</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Master your subjects, ace the quizzes, and collect rare digital artifacts to showcase in your personal gallery.
                            </p>

                            <ul className="space-y-4 mb-8">
                                {[
                                    "Complete daily challenges",
                                    "Earn experience points (XP)",
                                    "Unlock rare collectibles"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#a6b1ff]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsStudentTeacherOpen(true)}
                                className="flex items-center gap-2 text-[#a6b1ff] font-semibold group-hover:gap-4 transition-all"
                            >
                                Start Learning <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                </div>

            </div>

            {/* Student/Teacher Modal */}
            <Dialog open={isStudentTeacherOpen} onOpenChange={setIsStudentTeacherOpen}>
                <DialogContent className="max-w-md bg-[#0d0d0d]/95 backdrop-blur-2xl border-white/10 rounded-3xl p-8 shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-center text-white">Join as...</DialogTitle>
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
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setIsStudentTeacherOpen(false)}
                            className="text-white hover:text-white/80 transition-colors text-sm font-semibold tracking-wide uppercase"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Partner Modal */}
            <Dialog open={isPartnerOpen} onOpenChange={setIsPartnerOpen}>
                <DialogContent className="max-w-md bg-[#0d0d0d]/95 backdrop-blur-2xl border-white/10 rounded-3xl p-8 shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-center text-white">Partner with us...</DialogTitle>
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
                            className="text-white hover:text-white/80 transition-colors text-sm font-semibold tracking-wide uppercase"
                        >
                            Cancel
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
