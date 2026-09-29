import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Globe, Lock, School, Hash, Users, Plus, X, 
    Mail, AlertCircle, Check, Loader2, Copy, Eye, EyeOff 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const VISIBILITY_OPTIONS = [
    {
        value: 'public',
        label: 'Public',
        description: 'Anyone can access this course',
        icon: Globe,
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30'
    },
    {
        value: 'private',
        label: 'Private',
        description: 'Only invited students can access',
        icon: Lock,
        color: 'text-rose-600 dark:text-rose-400',
        bgColor: 'bg-rose-500/10',
        borderColor: 'border-rose-500/30'
    },
    {
        value: 'school',
        label: 'School',
        description: 'Students from your school',
        icon: School,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/30'
    },
    {
        value: 'quiz_code',
        label: 'Quiz Code',
        description: 'Access via quiz completion code',
        icon: Hash,
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/30'
    },
    {
        value: 'group_code',
        label: 'Group Code',
        description: 'Access via group join code',
        icon: Users,
        color: 'text-cyan-600 dark:text-cyan-400',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/30'
    }
];

export default function VisibilitySettings({ visibility, setVisibility, allowedStudents, setAllowedStudents, accessCode, setAccessCode }) {
    const [emailInput, setEmailInput] = useState('');
    const [showCode, setShowCode] = useState(false);
    const [isGeneratingCode, setIsGeneratingCode] = useState(false);

    const handleAddStudent = () => {
        const email = emailInput.trim();
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            return;
        }

        // Check for duplicates
        if (allowedStudents.includes(email)) {
            toast.error('This email is already added');
            return;
        }

        setAllowedStudents(prev => [...prev, email]);
        setEmailInput('');
        toast.success(`Added ${email}`);
    };

    const handleRemoveStudent = (email) => {
        setAllowedStudents(prev => prev.filter(e => e !== email));
        toast.success('Student removed');
    };

    const handleBulkAdd = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            const emails = text.split(/[\n,;]/)
                .map(email => email.trim())
                .filter(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                .filter(email => !allowedStudents.includes(email));
            
            if (emails.length === 0) {
                toast.error('No valid emails found in file');
                return;
            }

            setAllowedStudents(prev => [...prev, ...emails]);
            toast.success(`Added ${emails.length} students`);
        };
        reader.readAsText(file);
        e.target.value = ''; // Reset input
    };

    const generateAccessCode = () => {
        setIsGeneratingCode(true);
        setTimeout(() => {
            const code = Math.random().toString(36).substring(2, 10).toUpperCase();
            setAccessCode(code);
            setIsGeneratingCode(false);
            toast.success('Access code generated');
        }, 500);
    };

    const copyAccessCode = () => {
        navigator.clipboard.writeText(accessCode);
        toast.success('Code copied to clipboard');
    };

    return (
        <div className="space-y-8">
            {/* Visibility Options */}
            <div>
                <h3 className="text-sm font-black text-gray-700 dark:text-white/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Eye size={18} className="text-indigo-600 dark:text-[#a6b1ff]" />
                    Course Visibility
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {VISIBILITY_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isSelected = visibility === option.value;
                        
                        return (
                            <motion.button
                                key={option.value}
                                onClick={() => setVisibility(option.value)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                                    isSelected 
                                        ? `${option.borderColor} ${option.bgColor}` 
                                        : 'border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-gray-300 dark:hover:border-white/20'
                                }`}
                            >
                                {isSelected && (
                                    <div className="absolute top-3 right-3">
                                        <Check size={16} className={option.color} />
                                    </div>
                                )}
                                
                                <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-xl ${option.bgColor}`}>
                                        <Icon size={20} className={option.color} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                                            {option.label}
                                        </h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {option.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Conditional Settings Based on Visibility */}
            <AnimatePresence mode="wait">
                {/* Private: Email Management */}
                {visibility === 'private' && (
                    <motion.div
                        key="private"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-500/5 border-2 border-rose-200 dark:border-rose-500/20 space-y-6"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-rose-500/10">
                                <Lock size={20} className="text-rose-600 dark:text-rose-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Private Course Settings
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                    Add student email addresses who should have access to this course
                                </p>

                                {/* Add Student Input */}
                                <div className="flex gap-2 mb-4">
                                    <Input
                                        type="email"
                                        placeholder="student@example.com"
                                        value={emailInput}
                                        onChange={(e) => setEmailInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddStudent()}
                                        className="flex-1 bg-white dark:bg-white/5"
                                    />
                                    <Button 
                                        onClick={handleAddStudent}
                                        className="bg-rose-600 hover:bg-rose-700 text-white"
                                    >
                                        <Plus size={16} className="mr-1" />
                                        Add
                                    </Button>
                                </div>

                                {/* Bulk Upload */}
                                <div className="mb-4">
                                    <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-sm font-medium cursor-pointer hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                                        <Mail size={16} />
                                        <span>Upload Email List (.txt or .csv)</span>
                                        <input
                                            type="file"
                                            accept=".txt,.csv"
                                            onChange={handleBulkAdd}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                                        Upload a file with one email per line or comma-separated
                                    </p>
                                </div>

                                {/* Student List */}
                                {allowedStudents.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between mb-2">
                                            <h5 className="text-xs font-black text-gray-700 dark:text-white/70 uppercase tracking-wider">
                                                Allowed Students ({allowedStudents.length})
                                            </h5>
                                        </div>
                                        <div className="max-h-48 overflow-y-auto space-y-2 p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                            {allowedStudents.map((email, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-white/5 group"
                                                >
                                                    <span className="text-sm text-gray-900 dark:text-white font-medium flex items-center gap-2">
                                                        <Mail size={14} className="text-gray-400" />
                                                        {email}
                                                    </span>
                                                    <button
                                                        onClick={() => handleRemoveStudent(email)}
                                                        className="p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-500/20 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {allowedStudents.length === 0 && (
                                    <div className="p-6 text-center rounded-xl bg-white dark:bg-white/5 border border-dashed border-gray-300 dark:border-white/10">
                                        <Users size={32} className="mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            No students added yet
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Quiz Code or Group Code: Access Code Generation */}
                {(visibility === 'quiz_code' || visibility === 'group_code') && (
                    <motion.div
                        key="code"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-6 rounded-2xl border-2 space-y-4 ${
                            visibility === 'quiz_code'
                                ? 'bg-purple-50 dark:bg-purple-500/5 border-purple-200 dark:border-purple-500/20'
                                : 'bg-cyan-50 dark:bg-cyan-500/5 border-cyan-200 dark:border-cyan-500/20'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-xl ${visibility === 'quiz_code' ? 'bg-purple-500/10' : 'bg-cyan-500/10'}`}>
                                <Hash size={20} className={visibility === 'quiz_code' ? 'text-purple-600 dark:text-purple-400' : 'text-cyan-600 dark:text-cyan-400'} />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    {visibility === 'quiz_code' ? 'Quiz Code Access' : 'Group Code Access'}
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                    {visibility === 'quiz_code' 
                                        ? 'Students must enter this code after completing the associated quiz'
                                        : 'Students need this code to join and access the course'}
                                </p>

                                {/* Access Code Display/Generate */}
                                <div className="space-y-3">
                                    {!accessCode ? (
                                        <Button
                                            onClick={generateAccessCode}
                                            disabled={isGeneratingCode}
                                            className={`w-full ${
                                                visibility === 'quiz_code'
                                                    ? 'bg-purple-600 hover:bg-purple-700'
                                                    : 'bg-cyan-600 hover:bg-cyan-700'
                                            } text-white`}
                                        >
                                            {isGeneratingCode ? (
                                                <>
                                                    <Loader2 size={16} className="mr-2 animate-spin" />
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <Hash size={16} className="mr-2" />
                                                    Generate Access Code
                                                </>
                                            )}
                                        </Button>
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="p-4 rounded-xl bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-wider">
                                                        Access Code
                                                    </span>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => setShowCode(!showCode)}
                                                        className="h-6 px-2"
                                                    >
                                                        {showCode ? <EyeOff size={14} /> : <Eye size={14} />}
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <code className="flex-1 text-2xl font-black text-gray-900 dark:text-white tracking-wider">
                                                        {showCode ? accessCode : '••••••••'}
                                                    </code>
                                                    <Button
                                                        size="sm"
                                                        onClick={copyAccessCode}
                                                        className={`${
                                                            visibility === 'quiz_code'
                                                                ? 'bg-purple-600 hover:bg-purple-700'
                                                                : 'bg-cyan-600 hover:bg-cyan-700'
                                                        } text-white`}
                                                    >
                                                        <Copy size={14} className="mr-1" />
                                                        Copy
                                                    </Button>
                                                </div>
                                            </div>

                                            <Button
                                                onClick={generateAccessCode}
                                                variant="outline"
                                                className="w-full"
                                            >
                                                Regenerate Code
                                            </Button>

                                            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                                                <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                                <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                                                    Share this code with your students. They'll need it to access this course.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* School: Info Message */}
                {visibility === 'school' && (
                    <motion.div
                        key="school"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/5 border-2 border-blue-200 dark:border-blue-500/20"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-blue-500/10">
                                <School size={20} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    School-Wide Access
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    This course will be automatically available to all students registered under your school's admin code.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Public: Info Message */}
                {visibility === 'public' && (
                    <motion.div
                        key="public"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border-2 border-emerald-200 dark:border-emerald-500/20"
                    >
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-emerald-500/10">
                                <Globe size={20} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                    Public Course
                                </h4>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    This course will be visible and accessible to all users on the platform.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
