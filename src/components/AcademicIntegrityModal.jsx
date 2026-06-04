import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import {
    ShieldAlert,
    Video,
    Monitor,
    Eye,
    AlertTriangle,
    CheckCircle2,
    X,
    GraduationCap,
    Ban,
    Camera,
    Users,
    FileText,
    MessageSquare
} from 'lucide-react';

export default function AcademicIntegrityModal({ isOpen, onClose, onAccept }) {
    const prohibitedActivities = [
        { icon: Monitor, text: "Switch to other tabs, applications, or devices" },
        { icon: Users, text: "Communicate with other individuals (in person or online)" },
        { icon: FileText, text: "Use unauthorized materials, notes, or external resources" },
        { icon: Camera, text: "Allow another person to appear on your camera" },
        { icon: Video, text: "Turn off your camera or screen sharing at any time" }
    ];

    const monitoringFeatures = [
        "Video recorded (camera)",
        "Screen recorded",
        "Monitored for suspicious activity"
    ];

    const suspiciousBehaviors = [
        "Looking away frequently",
        "Multiple faces detected",
        "Background voices or assistance",
        "Attempting to bypass monitoring"
    ];

    const guidelines = [
        "Stay focused on your screen at all times",
        "Ensure you are alone in a quiet environment",
        "Keep your camera and screen sharing active",
        "Follow all instructions carefully"
    ];

    return (
        <AnimatePresence style={{zIndex:"500"}}>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999]"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full max-h-[75vh] sm:max-h-[90vh] overflow-hidden pointer-events-auto border-2 border-gray-200 dark:border-white/10 flex flex-col"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700 p-4 sm:p-6 relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                                <div className="relative flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                                            <ShieldAlert className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                            <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight leading-tight">
                                                Academic Integrity Notice
                                            </h2>
                                            <p className="text-white/80 text-xs sm:text-sm font-medium">
                                                Online Examination Rules
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors shrink-0"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
                                {/* Academic Honesty */}
                                <div className="bg-blue-50 dark:bg-blue-500/10 border-2 border-blue-200 dark:border-blue-500/20 rounded-2xl p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shrink-0">
                                            <GraduationCap className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">
                                                🎓 Academic Honesty
                                            </h3>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                                By continuing with this exam, you agree to uphold the highest standards of integrity. 
                                                Any form of cheating or dishonest behavior is strictly prohibited.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Prohibited Activities */}
                                <div className="bg-red-50 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/20 rounded-2xl p-5">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
                                            <Ban className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-1">
                                                🚫 Prohibited Activities
                                            </h3>
                                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                                During this exam, you must NOT:
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-3 ml-13">
                                        {prohibitedActivities.map((activity, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <activity.icon className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                                    {activity.text}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Monitoring & Recording */}
                                <div className="bg-purple-50 dark:bg-purple-500/10 border-2 border-purple-200 dark:border-purple-500/20 rounded-2xl p-5">
                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shrink-0">
                                            <Eye className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-1">
                                                🎥 Monitoring & Recording
                                            </h3>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                                This exam session is being:
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="space-y-2 ml-13 mb-4">
                                        {monitoringFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    {/* Important Screen Share Notice */}
                                    <div className="ml-13 mb-4 bg-amber-50 dark:bg-amber-500/10 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-500/20">
                                        <div className="flex items-start gap-3">
                                            <Monitor className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm font-black text-amber-900 dark:text-amber-400 mb-2 uppercase">
                                                    ⚠️ Important: Entire Screen Required
                                                </p>
                                                <p className="text-xs text-amber-800 dark:text-amber-500 mb-2">
                                                    When prompted to share your screen, you MUST select:
                                                </p>
                                                <div className="bg-white dark:bg-white/5 rounded-lg p-3 border border-amber-200 dark:border-amber-500/20">
                                                    <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-1">
                                                        ✓ "Entire Screen" or "Your Entire Screen"
                                                    </p>
                                                    <p className="text-xs text-red-700 dark:text-red-400 mb-1">
                                                        ✗ NOT "Window" or "Chrome Tab"
                                                    </p>
                                                </div>
                                                <p className="text-xs text-amber-700 dark:text-amber-500 mt-2 italic">
                                                    Selecting anything other than the entire screen will prevent you from starting the exam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="ml-13 bg-white dark:bg-white/5 rounded-xl p-4 border border-purple-200 dark:border-purple-500/20">
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                                            Any unusual behavior such as:
                                        </p>
                                        <ul className="space-y-1.5">
                                            {suspiciousBehaviors.map((behavior, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <AlertTriangle className="w-3 h-3 text-orange-500 shrink-0" />
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                                        {behavior}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                                            may be flagged and reviewed.
                                        </p>
                                    </div>
                                </div>

                                {/* Consequences */}
                                <div className="bg-orange-50 dark:bg-orange-500/10 border-2 border-orange-200 dark:border-orange-500/20 rounded-2xl p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                                            <AlertTriangle className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">
                                                ⚠️ Consequences of Cheating
                                            </h3>
                                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                                                If you are found violating any of the rules:
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        Your exam may be automatically terminated
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        Your results may be invalidated
                                                    </span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        Further disciplinary actions may be taken according to institutional policies
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* What You Should Do */}
                                <div className="bg-green-50 dark:bg-green-500/10 border-2 border-green-200 dark:border-green-500/20 rounded-2xl p-5">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">
                                                ✅ What You Should Do
                                            </h3>
                                            <ul className="space-y-2">
                                                {guidelines.map((guideline, index) => (
                                                    <li key={index} className="flex items-start gap-2">
                                                        <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                                            {guideline}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t-2 border-gray-200 dark:border-white/10 p-4 sm:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-6 bg-gray-50 dark:bg-gray-800/50 shrink-0">
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={onClose}
                                        className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold uppercase text-xs sm:text-sm tracking-wide hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={onAccept}
                                        className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-black uppercase text-xs sm:text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                        I Agree & Accept
                                    </button>
                                </div>
                                <p className="text-[10px] sm:text-xs text-center text-gray-500 dark:text-gray-400 mt-3 sm:mt-4 leading-relaxed">
                                    By clicking "I Agree & Accept", you acknowledge that you have read and understood all the rules above.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );

    // Render modal using portal to ensure it's above all other elements
    return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
