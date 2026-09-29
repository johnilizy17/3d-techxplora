import { motion } from 'framer-motion';
import { 
    Sparkles, Globe, Shield, BookOpen, Award, Users, Brain, 
    Video, GraduationCap, Trophy, Target, Zap, Code, Database,
    BarChart3, MessageSquare, Lock, CheckCircle, Clock, TrendingUp,
    Camera, MonitorPlay, FileText, LineChart
} from 'lucide-react';
import VisualBackground from "@/components/collectors/VisualBackground";

export default function About() {
    const coreFeatures = [
        {
            icon: <Trophy className="w-7 h-7 text-amber-600 dark:text-amber-400" />,
            title: "Gamified Learning & Competitions",
            desc: "Engaging quiz-based learning and gaming modes that turn academic challenges into exciting, motivation-driven experiences for students.",
            gradient: "from-amber-500/10 to-orange-500/10"
        },
        {
            icon: <Database className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />,
            title: "Digital Ecosystems & CBT",
            desc: "Robust tools for computer-based testing (CBT) and structured course hosting, equipping schools and educational institutions.",
            gradient: "from-cyan-500/10 to-blue-500/10"
        },
        {
            icon: <BookOpen className="w-7 h-7 text-purple-600 dark:text-purple-400" />,
            title: "Online Courses",
            desc: "We offer courses online to help scholars upskill in their comfort, with video-based content and interactive elements.",
            gradient: "from-purple-500/10 to-fuchsia-500/10"
        },
        {
            icon: <Award className="w-7 h-7 text-green-600 dark:text-green-400" />,
            title: "Teacher Empowerment",
            desc: "Through elite initiatives like our Teacher Ambassador Program, we partner with standout educators to drive community growth.",
            gradient: "from-green-500/10 to-emerald-500/10"
        }
    ];

    const teacherFeatures = [
        {
            icon: <FileText className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
            title: "Create Quizzes",
            desc: "Build custom quizzes with multiple question types and difficulty levels."
        },
        {
            icon: <BookOpen className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
            title: "Course Builder",
            desc: "Design comprehensive courses with videos, materials, and assessments."
        },
        {
            icon: <Camera className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
            title: "Proctored Exams",
            desc: "Monitor quiz attempts with face detection and activity tracking."
        },
        {
            icon: <BarChart3 className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
            title: "Analytics Dashboard",
            desc: "Track student performance with detailed analytics and insights."
        },
        {
            icon: <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
            title: "Group Management",
            desc: "Create and manage student groups for organized learning."
        },
        {
            icon: <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
            title: "Live & Scheduled",
            desc: "Run live quizzes or schedule them with automatic expiration."
        }
    ];

    const advancedFeatures = [
        {
            icon: <Lock className="w-6 h-6" />,
            title: "Secure Proctoring",
            desc: "WebRTC video streaming with face detection and environment checks",
            color: "text-red-600 dark:text-red-400"
        },
        {
            icon: <LineChart className="w-6 h-6" />,
            title: "Leaderboards",
            desc: "Global, regional, and quiz-specific rankings with filter options",
            color: "text-green-600 dark:text-green-400"
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Nigeria Curriculum",
            desc: "Aligned with WAEC, NECO, and JAMB examination standards",
            color: "text-blue-600 dark:text-blue-400"
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: "Bootcamp Scholarships",
            desc: "Apply for data science and AI scholarships through DataCamp",
            color: "text-purple-600 dark:text-purple-400"
        },
        {
            icon: <CheckCircle className="w-6 h-6" />,
            title: "KYC Verification",
            desc: "Secure identity verification for alumni and fellowship programs",
            color: "text-cyan-600 dark:text-cyan-400"
        },
        {
            icon: <MonitorPlay className="w-6 h-6" />,
            title: "Live Quiz Monitoring",
            desc: "Real-time monitoring of active quiz sessions with participant tracking",
            color: "text-orange-600 dark:text-orange-400"
        }
    ];

    const platformStats = [
        { label: "Active Users", value: "10K+", gradient: "from-cyan-500 to-blue-500" },
        { label: "Quizzes Created", value: "5K+", gradient: "from-purple-500 to-fuchsia-500" },
        { label: "Courses Available", value: "500+", gradient: "from-green-500 to-emerald-500" },
        { label: "Learning Groups", value: "200+", gradient: "from-orange-500 to-pink-500" }
    ];

    return (
        <div className="relative min-h-screen pt-20 overflow-hidden">
            {/* Background with 3D elements */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                <VisualBackground />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-8xl font-bold mb-8">
                        <span className="gradient-text-shine">About TechXplora</span>
                    </h1>
                    <p className="text-2xl text-gray-900 dark:text-gray-400 font-bold max-w-4xl mx-auto leading-relaxed">
                        An innovative educational technology platform operating across Nigeria, dedicated to building 
                        robust digital learning ecosystems with NERDC-aligned curriculum.
                    </p>
                </motion.div>

                {/* Platform Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32">
                    {platformStats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative group"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                            <div className="relative glass-morphism p-6 rounded-2xl bg-white/80 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 text-center">
                                <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-400 font-bold uppercase tracking-wide">
                                    {stat.label}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Who We Are & Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <div className="glass-morphism-strong rounded-3xl p-12 bg-white/90 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Who We Are</h2>
                        <p className="text-lg text-gray-900 dark:text-gray-300 leading-relaxed font-bold">
                            TechXplora is an innovative educational technology platform operating across Nigeria that is dedicated to building 
                            robust digital learning ecosystems, integrating a flexible, NERDC-aligned Nigerian curriculum with context-aware 
                            AI support to deliver structured, classroom-relevant learning that boosts student performance. We bridge traditional 
                            schooling with immersive, modern technology.
                        </p>
                    </div>

                    <div className="glass-morphism-strong rounded-3xl p-12 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-500/10 dark:to-purple-500/10 border-2 border-indigo-200 dark:border-indigo-500/20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">Our Core Mission</h2>
                        <p className="text-lg text-gray-900 dark:text-gray-300 leading-relaxed font-bold">
                            Our mission is to transform traditional education into an interactive, dynamic experience where educators and 
                            students thrive. We empower teachers to efficiently host courses, manage quizzes, and facilitate competitive, 
                            gamified learning environments that drive genuine student engagement and academic excellence.
                        </p>
                    </div>
                </motion.div>

                {/* What We Offer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                        What We Offer
                    </h2>
                    <p className="text-center text-lg text-gray-700 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
                        Comprehensive solutions for modern education in Nigeria
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        {coreFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 blur-xl transition-opacity`} />
                                <div className="relative glass-morphism p-8 rounded-2xl bg-white/80 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all h-full">
                                    <div className="mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-gray-900 dark:text-gray-400 leading-relaxed font-bold text-sm">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Teacher Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                        For Teachers & Educators
                    </h2>
                    <p className="text-center text-lg text-gray-700 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
                        Powerful tools to create, manage, and monitor student learning
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teacherFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                viewport={{ once: true }}
                                className="glass-morphism p-6 rounded-xl bg-white/80 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 hover:shadow-xl transition-all"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">{feature.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                        <p className="text-sm text-gray-900 dark:text-gray-400 leading-relaxed font-bold">{feature.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Advanced Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-32"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white">
                        Advanced Capabilities
                    </h2>
                    <p className="text-center text-lg text-gray-700 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
                        Enterprise-grade features for secure and effective learning
                    </p>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advancedFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-morphism p-6 rounded-xl bg-white/80 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 ${feature.color}`}>{feature.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                                        <p className="text-sm text-gray-900 dark:text-gray-400 leading-relaxed font-bold">{feature.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Vision Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="glass-morphism-strong rounded-[3rem] p-12 md:p-16 mb-20 bg-gradient-to-br from-white/90 to-gray-100/90 dark:from-[#0a0a0a] dark:to-[#1a1520] border-2 border-gray-200 dark:border-white/10"
                >
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Our Vision for the Future</h2>
                            <div className="space-y-6 text-gray-900 dark:text-gray-300 text-lg leading-relaxed font-bold">
                                <p>
                                    We envision a <span className="text-[#6366f1] dark:text-[#a6b1ff] font-black">fully digitized educational landscape</span> across 
                                    Nigeria where every student has access to interactive tools and competitive learning frameworks.
                                </p>
                                <p>
                                    By fostering strategic partnerships with corporate sponsors, foundations, and forward-thinking schools, TechXplora is 
                                    committed to expanding digital literacy and positioning the next generation of learners for sustainable, long-term success.
                                </p>
                                <p>
                                    Through our NERDC-aligned curriculum, AI support, and comprehensive digital ecosystem, we're bridging the gap between 
                                    traditional education and modern technology to create the learning experience Nigeria deserves.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="relative rounded-2xl overflow-hidden bg-gray-200/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 border-gray-300 dark:border-white/10">
                                <img 
                                    src="/about.png" 
                                    alt="TechXplora Platform" 
                                    className="w-full h-full object-cover opacity-90"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center glass-morphism p-12 rounded-3xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 border-2 border-gray-200 dark:border-white/10"
                >
                    <GraduationCap className="w-16 h-16 mx-auto mb-6 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        Join the Digital Learning Revolution
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-400 mb-8 max-w-2xl mx-auto font-bold">
                        Be part of Nigeria's educational transformation. Experience NERDC-aligned curriculum, gamified learning, 
                        and AI-powered support that drives genuine academic excellence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a 
                            href="/signup" 
                            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
                        >
                            Get Started Free
                        </a>
                        <a 
                            href="/bootcamp" 
                            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl border-2 border-gray-300 dark:border-gray-700 hover:scale-105 transition-transform"
                        >
                            Explore Scholarships
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
