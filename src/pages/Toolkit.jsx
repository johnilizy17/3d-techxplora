import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BookOpen, Users, Trophy, Sparkles, PlayCircle, 
    FileText, Download, ChevronRight, GraduationCap,
    Lightbulb, Target, Zap, CheckCircle, Star,
    Award, Rocket, Heart, Smile, Gift, Crown,
    MessageCircle, Calendar, Clock, TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function Toolkit() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const isTeacher = user?.accountable_type === "App\\Models\\Teacher" || user?.role === 'teacher';
    const [activeTab, setActiveTab] = useState(isTeacher ? 'teacher' : 'student');
    const [expandedGuide, setExpandedGuide] = useState(null);

    const studentGuides = [
        {
            icon: Rocket,
            title: "Getting Started",
            emoji: "🚀",
            description: "Your first steps to becoming a TechXplora champion!",
            color: "from-blue-500 to-cyan-500",
            steps: [
                {
                    title: "Create Your Account",
                    description: "Sign up with your email and create a strong password",
                    icon: Smile,
                    tip: "Use a password you can remember but others can't guess!"
                },
                {
                    title: "Complete Your Profile",
                    description: "Add your photo, name, and other details",
                    icon: Star,
                    tip: "A complete profile helps teachers know you better"
                },
                {
                    title: "Join Your Class Group",
                    description: "Enter the group code your teacher gives you",
                    icon: Users,
                    tip: "Ask your teacher if you don't have the code yet"
                },
                {
                    title: "Explore Your Dashboard",
                    description: "Check out quizzes, leaderboard, and your wallet",
                    icon: Sparkles,
                    tip: "Spend a few minutes clicking around to learn where everything is"
                }
            ]
        },
        {
            icon: Target,
            title: "Taking Quizzes",
            emoji: "🎯",
            description: "Learn how to ace your quizzes and have fun!",
            color: "from-purple-500 to-pink-500",
            steps: [
                {
                    title: "Find Available Quizzes",
                    description: "Go to Dashboard → Quizzes to see what's ready",
                    icon: PlayCircle,
                    tip: "New quizzes appear when your teacher creates them"
                },
                {
                    title: "Read Instructions Carefully",
                    description: "Check the time limit and number of questions",
                    icon: BookOpen,
                    tip: "Take a deep breath before starting - you've got this!"
                },
                {
                    title: "Answer Questions",
                    description: "Think carefully and choose the best answer",
                    icon: Lightbulb,
                    tip: "If you're not sure, eliminate wrong answers first"
                },
                {
                    title: "Review Your Results",
                    description: "See what you got right and learn from mistakes",
                    icon: CheckCircle,
                    tip: "Learning from mistakes helps you do better next time"
                }
            ]
        },
        {
            icon: Trophy,
            title: "Earning XP & Rewards",
            emoji: "🏆",
            description: "Collect points and become a top Xplora!",
            color: "from-amber-500 to-orange-500",
            steps: [
                {
                    title: "Complete Quizzes",
                    description: "Every correct answer earns you XP points",
                    icon: Zap,
                    tip: "The more you practice, the more points you earn"
                },
                {
                    title: "Check Your Wallet",
                    description: "See how many XP points you've collected",
                    icon: Gift,
                    tip: "Your XP shows how much you've learned"
                },
                {
                    title: "Climb the Leaderboard",
                    description: "Compare your score with classmates",
                    icon: Crown,
                    tip: "Friendly competition makes learning more fun"
                },
                {
                    title: "Track Your Progress",
                    description: "Watch yourself improve over time",
                    icon: TrendingUp,
                    tip: "Celebrate every improvement, big or small"
                }
            ]
        },
        {
            icon: Heart,
            title: "Study Tips & Tricks",
            emoji: "💡",
            description: "Smart ways to learn better and faster!",
            color: "from-green-500 to-emerald-500",
            steps: [
                {
                    title: "Use Learning Mode",
                    description: "Practice quizzes as many times as you want",
                    icon: PlayCircle,
                    tip: "Repetition helps your brain remember better"
                },
                {
                    title: "Read Case Studies",
                    description: "Learn from real-world examples",
                    icon: BookOpen,
                    tip: "Stories make learning stick in your memory"
                },
                {
                    title: "Take Notes",
                    description: "Write down important things you learn",
                    icon: FileText,
                    tip: "Writing helps you remember what you learned"
                },
                {
                    title: "Study Regularly",
                    description: "Set aside time each day to practice",
                    icon: Calendar,
                    tip: "15 minutes every day is better than 2 hours once a week"
                }
            ]
        }
    ];

    const teacherGuides = [
        {
            icon: Users,
            title: "Creating Groups",
            emoji: "👥",
            description: "Organize your students into classes or subjects",
            color: "from-blue-500 to-indigo-500",
            steps: [
                {
                    title: "Navigate to Groups",
                    description: "Click Dashboard → Groups in your menu",
                    icon: Target,
                    tip: "Groups help you organize students by class or subject"
                },
                {
                    title: "Create New Group",
                    description: "Click the 'Create New Group' button",
                    icon: Sparkles,
                    tip: "You can create multiple groups for different classes"
                },
                {
                    title: "Fill Group Details",
                    description: "Add a clear name and helpful description",
                    icon: FileText,
                    tip: "Use names like 'Grade 5 Math' or 'Science Club'"
                },
                {
                    title: "Share Group Code",
                    description: "Give the code to students so they can join",
                    icon: MessageCircle,
                    tip: "Write the code on the board or send it via message"
                }
            ]
        },
        {
            icon: FileText,
            title: "Creating Quizzes",
            emoji: "📝",
            description: "Design fun and engaging quizzes for your students",
            color: "from-purple-500 to-violet-500",
            steps: [
                {
                    title: "Start New Quiz",
                    description: "Go to Dashboard → Create Quiz",
                    icon: Rocket,
                    tip: "Plan your quiz before you start creating it"
                },
                {
                    title: "Choose Quiz Mode",
                    description: "Learning, Practice, or Competition mode",
                    icon: Target,
                    tip: "Learning mode lets students retry, Competition is one-time"
                },
                {
                    title: "Add Questions",
                    description: "Type manually, upload Excel, or use AI",
                    icon: Lightbulb,
                    tip: "Mix easy and hard questions to challenge all students"
                },
                {
                    title: "Set Schedule & Points",
                    description: "Choose when quiz starts/ends and XP rewards",
                    icon: Calendar,
                    tip: "Give students enough time but create urgency"
                }
            ]
        },
        {
            icon: Zap,
            title: "Managing XP Budget",
            emoji: "⚡",
            description: "Understand and allocate your XP points wisely",
            color: "from-amber-500 to-yellow-500",
            steps: [
                {
                    title: "Check Available XP",
                    description: "See your XP balance in the dashboard",
                    icon: Gift,
                    tip: "You have a limited XP pool to allocate"
                },
                {
                    title: "Allocate Points Wisely",
                    description: "Distribute XP across your quizzes",
                    icon: Target,
                    tip: "Important assessments can have more points"
                },
                {
                    title: "XP Returns After Quiz",
                    description: "Points come back when quiz ends",
                    icon: Clock,
                    tip: "Plan quiz schedules to optimize your XP"
                },
                {
                    title: "Monitor Points Left",
                    description: "Watch the 'Points Left' indicator",
                    icon: TrendingUp,
                    tip: "Don't create too many high-XP quizzes at once"
                }
            ]
        },
        {
            icon: Award,
            title: "Viewing Results",
            emoji: "📊",
            description: "Track student performance and identify areas for improvement",
            color: "from-green-500 to-teal-500",
            steps: [
                {
                    title: "Access Quiz Results",
                    description: "Navigate to Dashboard → Quiz Results",
                    icon: Trophy,
                    tip: "Review results regularly to track progress"
                },
                {
                    title: "View Statistics",
                    description: "See overall completion rates and averages",
                    icon: TrendingUp,
                    tip: "Look for patterns in student performance"
                },
                {
                    title: "Analyze Individual Performance",
                    description: "Check each student's scores and attempts",
                    icon: Users,
                    tip: "Identify students who need extra help"
                },
                {
                    title: "Export Data",
                    description: "Download results for offline analysis",
                    icon: Download,
                    tip: "Keep records for parent-teacher meetings"
                }
            ]
        }
    ];

    const quickTips = [
        {
            icon: Rocket,
            title: "Start Small",
            description: "Begin with simple quizzes and gradually increase difficulty",
            color: "bg-blue-500"
        },
        {
            icon: Heart,
            title: "Make it Fun",
            description: "Use engaging topics and reward good performance",
            color: "bg-pink-500"
        },
        {
            icon: Clock,
            title: "Be Consistent",
            description: "Regular practice leads to better learning outcomes",
            color: "bg-purple-500"
        },
        {
            icon: MessageCircle,
            title: "Ask for Help",
            description: "Contact support anytime you need assistance",
            color: "bg-green-500"
        }
    ];

    const guides = activeTab === 'teacher' ? teacherGuides : studentGuides;

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-10 py-8">
                    
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 glass-morphism px-5 py-2 rounded-full mb-6">
                            <Sparkles className="w-4 h-4 text-[#a6b1ff]" />
                            <span className="text-sm text-gray-600 dark:text-gray-300 tracking-[0.15em] uppercase font-medium">
                                Learning Made Easy
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            <span className="gradient-text-shine">Your Learning Toolkit</span>
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-light max-w-3xl mx-auto">
                            {activeTab === 'student' 
                                ? "Everything you need to become a quiz champion! 🌟"
                                : "Complete guides to help you teach better! 🎓"
                            }
                        </p>
                    </motion.div>

                    {/* Tab Switcher */}
                    <div className="flex justify-center mb-12">
                        <div className="glass-morphism p-2 rounded-2xl inline-flex gap-2">
                            <button
                                onClick={() => setActiveTab('student')}
                                className={`px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-wider transition-all flex items-center gap-2 ${
                                    activeTab === 'student'
                                        ? 'bg-[#a6b1ff] text-black'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <GraduationCap size={18} />
                                For Students
                            </button>
                            <button
                                onClick={() => setActiveTab('teacher')}
                                className={`px-8 py-3 rounded-xl font-bold uppercase text-sm tracking-wider transition-all flex items-center gap-2 ${
                                    activeTab === 'teacher'
                                        ? 'bg-[#a6b1ff] text-black'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <Users size={18} />
                                For Teachers
                            </button>
                        </div>
                    </div>

                    {/* Guides Grid */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {guides.map((guide, index) => (
                            <motion.div
                                key={guide.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-morphism-strong rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform"
                            >
                                {/* Guide Header */}
                                <div className={`p-8 bg-gradient-to-br ${guide.color} relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 text-9xl opacity-10">
                                        {guide.emoji}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                                            <guide.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {guide.title}
                                        </h3>
                                        <p className="text-white/90 text-sm">
                                            {guide.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Guide Steps */}
                                <div className="p-6 space-y-4">
                                    {guide.steps.map((step, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (index * 0.1) + (i * 0.05) }}
                                            className="group"
                                        >
                                            <button
                                                onClick={() => setExpandedGuide(expandedGuide === `${index}-${i}` ? null : `${index}-${i}`)}
                                                className="w-full text-left"
                                            >
                                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                                                    <div className="w-10 h-10 rounded-xl bg-[#a6b1ff]/20 flex items-center justify-center shrink-0">
                                                        <step.icon className="w-5 h-5 text-[#a6b1ff]" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                                                                Step {i + 1}: {step.title}
                                                            </h4>
                                                            <ChevronRight 
                                                                className={`w-4 h-4 text-gray-400 transition-transform ${
                                                                    expandedGuide === `${index}-${i}` ? 'rotate-90' : ''
                                                                }`}
                                                            />
                                                        </div>
                                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                                            {step.description}
                                                        </p>
                                                        
                                                        <AnimatePresence>
                                                            {expandedGuide === `${index}-${i}` && (
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="mt-3 pt-3 border-t border-gray-200 dark:border-white/10"
                                                                >
                                                                    <div className="flex items-start gap-2">
                                                                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                                        <p className="text-xs text-gray-700 dark:text-gray-300 italic">
                                                                            <span className="font-bold text-amber-500">Pro Tip:</span> {step.tip}
                                                                        </p>
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Tips Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            Quick Tips for Success 💫
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickTips.map((tip, index) => (
                                <motion.div
                                    key={tip.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                    className="glass-morphism p-6 rounded-2xl text-center hover:scale-105 transition-transform"
                                >
                                    <div className={`w-12 h-12 ${tip.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                        <tip.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                                        {tip.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {tip.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-morphism-strong rounded-3xl p-8 text-center"
                    >
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                            {activeTab === 'student'
                                ? "Jump into your first quiz and start earning XP! Remember, every expert was once a beginner."
                                : "Create your first group and quiz! Your students are waiting to learn from you."
                            }
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-8 py-4 bg-[#a6b1ff] text-black rounded-2xl font-bold uppercase text-sm tracking-wider hover:scale-105 transition-transform shadow-lg shadow-[#a6b1ff]/20"
                            >
                                Go to Dashboard
                            </button>
                            <button
                                onClick={() => navigate('/support')}
                                className="px-8 py-4 glass-morphism text-gray-900 dark:text-white rounded-2xl font-bold uppercase text-sm tracking-wider hover:bg-white/10 dark:hover:bg-white/10 transition-all"
                            >
                                Need Help?
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
