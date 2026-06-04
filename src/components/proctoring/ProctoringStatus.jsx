import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye,
    Users,
    Mic,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Activity,
    Shield,
    Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProctoringStatus({
    status,
    riskScore,
    facePresent,
    faceCount,
    headPose,
    isTalking,
    audioDetected,
    currentFlags,
    violations,
    className
}) {
    const getStatusColor = () => {
        if (status === 'cheating') return 'from-red-500/10 to-rose-500/10 border-red-500/20';
        if (status === 'suspicious') return 'from-orange-500/10 to-amber-500/10 border-orange-500/20';
        if (status === 'normal') return 'from-green-500/10 to-emerald-500/10 border-green-500/20';
        return 'from-blue-500/10 to-indigo-500/10 border-blue-500/20';
    };
    
    const getStatusIcon = () => {
        if (status === 'cheating') return <XCircle className="w-5 h-5 text-red-500" />;
        if (status === 'suspicious') return <AlertTriangle className="w-5 h-5 text-orange-500" />;
        if (status === 'normal') return <CheckCircle className="w-5 h-5 text-green-500" />;
        return <Activity className="w-5 h-5 text-blue-500 animate-pulse" />;
    };
    
    const getStatusText = () => {
        if (status === 'cheating') return 'Cheating Detected';
        if (status === 'suspicious') return 'Suspicious Activity';
        if (status === 'normal') return 'All Clear';
        return 'Initializing...';
    };
    
    const getRiskColor = () => {
        if (riskScore >= 80) return 'text-red-500';
        if (riskScore >= 50) return 'text-orange-500';
        if (riskScore >= 20) return 'text-yellow-500';
        return 'text-green-500';
    };
    
    return (
        <div className={cn('space-y-4', className)}>
            {/* Main Status Card */}
            <motion.div
                animate={{
                    boxShadow: status === 'cheating' 
                        ? ["0 0 0px rgba(239,68,68,0)", "0 0 30px rgba(239,68,68,0.4)", "0 0 0px rgba(239,68,68,0)"]
                        : status === 'suspicious'
                        ? ["0 0 0px rgba(249,115,22,0)", "0 0 20px rgba(249,115,22,0.3)", "0 0 0px rgba(249,115,22,0)"]
                        : "none"
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={cn(
                    'p-5 bg-gradient-to-br rounded-[2rem] border-2 shadow-lg',
                    getStatusColor()
                )}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            'w-10 h-10 rounded-xl flex items-center justify-center',
                            status === 'cheating' ? 'bg-red-500' :
                            status === 'suspicious' ? 'bg-orange-500' :
                            status === 'normal' ? 'bg-green-500' : 'bg-blue-500'
                        )}>
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-wide">
                                Exam Proctoring
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                {getStatusIcon()}
                                <span className={cn(
                                    'text-[9px] font-bold uppercase tracking-wider',
                                    status === 'cheating' ? 'text-red-600 dark:text-red-500' :
                                    status === 'suspicious' ? 'text-orange-600 dark:text-orange-500' :
                                    status === 'normal' ? 'text-green-600 dark:text-green-500' :
                                    'text-blue-600 dark:text-blue-500'
                                )}>
                                    {getStatusText()}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Risk Score */}
                    <div className="text-right">
                        <p className="text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                            Risk Score
                        </p>
                        <p className={cn('text-2xl font-black', getRiskColor())}>
                            {riskScore}
                        </p>
                    </div>
                </div>
                
                {/* Risk Bar */}
                <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(riskScore, 100)}%` }}
                        className={cn(
                            'h-full transition-colors',
                            riskScore >= 80 ? 'bg-red-500' :
                            riskScore >= 50 ? 'bg-orange-500' :
                            riskScore >= 20 ? 'bg-yellow-500' : 'bg-green-500'
                        )}
                    />
                </div>
            </motion.div>
            
            {/* Detection Indicators */}
            <div className="grid grid-cols-2 gap-3">
                {/* Face Detection */}
                <div className={cn(
                    'p-4 rounded-2xl border-2',
                    faceCount === 1 
                        ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'
                        : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20'
                )}>
                    <div className="flex items-center gap-2 mb-2">
                        <Users className={cn(
                            'w-4 h-4',
                            faceCount === 1 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                        )} />
                        <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase">
                            Face
                        </span>
                    </div>
                    <p className={cn(
                        'text-sm font-black',
                        faceCount === 1 ? 'text-green-700 dark:text-green-500' : 'text-red-700 dark:text-red-500'
                    )}>
                        {faceCount === 0 ? 'None' : faceCount === 1 ? 'Detected' : `${faceCount} Faces`}
                    </p>
                </div>
                
                {/* Gaze Direction */}
                <div className={cn(
                    'p-4 rounded-2xl border-2',
                    Math.abs(headPose.yaw) < 25 && Math.abs(headPose.pitch) < 20
                        ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'
                        : 'bg-orange-50 dark:bg-orange-500/5 border-orange-200 dark:border-orange-500/20'
                )}>
                    <div className="flex items-center gap-2 mb-2">
                        <Eye className={cn(
                            'w-4 h-4',
                            Math.abs(headPose.yaw) < 25 && Math.abs(headPose.pitch) < 20
                                ? 'text-green-600 dark:text-green-500'
                                : 'text-orange-600 dark:text-orange-500'
                        )} />
                        <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase">
                            Gaze
                        </span>
                    </div>
                    <p className={cn(
                        'text-sm font-black',
                        Math.abs(headPose.yaw) < 25 && Math.abs(headPose.pitch) < 20
                            ? 'text-green-700 dark:text-green-500'
                            : 'text-orange-700 dark:text-orange-500'
                    )}>
                        {Math.abs(headPose.yaw) < 25 && Math.abs(headPose.pitch) < 20 ? 'On Screen' : 'Away'}
                    </p>
                </div>
                
                {/* Talking Detection */}
                <div className={cn(
                    'p-4 rounded-2xl border-2',
                    !isTalking
                        ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'
                        : 'bg-red-50 dark:bg-red-500/5 border-red-200 dark:border-red-500/20'
                )}>
                    <div className="flex items-center gap-2 mb-2">
                        <Mic className={cn(
                            'w-4 h-4',
                            !isTalking ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                        )} />
                        <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase">
                            Mouth
                        </span>
                    </div>
                    <p className={cn(
                        'text-sm font-black',
                        !isTalking ? 'text-green-700 dark:text-green-500' : 'text-red-700 dark:text-red-500'
                    )}>
                        {isTalking ? 'Moving' : 'Still'}
                    </p>
                </div>
                
                {/* Audio Detection */}
                <div className={cn(
                    'p-4 rounded-2xl border-2',
                    !audioDetected
                        ? 'bg-green-50 dark:bg-green-500/5 border-green-200 dark:border-green-500/20'
                        : 'bg-orange-50 dark:bg-orange-500/5 border-orange-200 dark:border-orange-500/20'
                )}>
                    <div className="flex items-center gap-2 mb-2">
                        <Radio className={cn(
                            'w-4 h-4',
                            !audioDetected ? 'text-green-600 dark:text-green-500' : 'text-orange-600 dark:text-orange-500'
                        )} />
                        <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase">
                            Audio
                        </span>
                    </div>
                    <p className={cn(
                        'text-sm font-black',
                        !audioDetected ? 'text-green-700 dark:text-green-500' : 'text-orange-700 dark:text-orange-500'
                    )}>
                        {audioDetected ? 'Detected' : 'Silent'}
                    </p>
                </div>
            </div>
            
            {/* Current Flags */}
            <AnimatePresence>
                {currentFlags.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-4 bg-orange-50 dark:bg-orange-500/5 border-2 border-orange-200 dark:border-orange-500/20 rounded-2xl"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-500" />
                            <span className="text-[9px] font-bold text-orange-700 dark:text-orange-500 uppercase tracking-wider">
                                Recent Flags
                            </span>
                        </div>
                        <div className="space-y-1">
                            {currentFlags.slice(-3).map((flag, idx) => (
                                <motion.p
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[9px] text-orange-600 dark:text-orange-500 font-medium"
                                >
                                    • {flag}
                                </motion.p>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Violations Count */}
            {violations.length > 0 && (
                <div className="p-4 bg-red-50 dark:bg-red-500/5 border-2 border-red-200 dark:border-red-500/20 rounded-2xl">
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-red-700 dark:text-red-500 uppercase tracking-wider">
                            Total Violations
                        </span>
                        <span className="text-xl font-black text-red-700 dark:text-red-500">
                            {violations.length}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
