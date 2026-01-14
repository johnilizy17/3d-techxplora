import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Sparkles,
    ArrowLeft,
    ArrowRight,
    Trophy,
    Clock,
    Calendar,
    Target,
    Users,
    BookOpen,
    CheckCircle2,
    Gamepad2,
    Info
} from 'lucide-react';
import {
    useCreateQuizMutation,
    useGetQuizDataQuery,
    useGetGroupsQuery,
    useGetQuizModesQuery
} from '@/redux/api/teacherApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { toast } from 'sonner';

const STEPS = [
    { title: 'Basic Info', icon: BookOpen },
    { title: 'Quiz Details', icon: Target },
    { title: 'Success', icon: CheckCircle2 }
];

export default function CreateQuiz() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";
    const [currentStep, setCurrentStep] = useState(1);
    const [createQuiz, { isLoading: isSubmitting }] = useCreateQuizMutation();

    // Fetch individual data sources
    const { data: quizModesResults } = useGetQuizModesQuery();
    const { data: groupsResults } = useGetGroupsQuery({ type, id: user?.id }, { skip: !user?.id });
    const { data: classesResults } = useGetQuizDataQuery(undefined, { skip: !user?.id });

    // Map data for selection fields
    const quizModes = quizModesResults?.data || quizModesResults || [];
    const groups = Array.isArray(groupsResults) ? groupsResults : (groupsResults?.data || []);
    const classes = Array.isArray(classesResults) ? classesResults : (classesResults?.data || []);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        model_id: '',
        group_code: '',
        class: '',
        start_at: '',
        end_at: '',
        xp: 0,
        p_xp: 0,
        min_age: '',
        max_age: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (!formData.group_code) newErrors.group_code = 'Group is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.start_at) newErrors.start_at = 'Start date is required';
        if (!formData.end_at) newErrors.end_at = 'End date is required';
        if (formData.xp < 0) newErrors.xp = 'XP must be non-negative';
        if (formData.p_xp < 0) newErrors.p_xp = 'XP per question must be non-negative';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handleBack = () => {
        if (currentStep === 3) {
            navigate('/dashboard/quizzes');
        } else if (currentStep === 2) {
            setCurrentStep(1);
        } else {
            navigate('/dashboard/quizzes');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        try {
            const payload = {
                ...formData,
                is_ai: false,
                status: true,
                mode_id: formData.model_id,
                teacher_id: user.id,
                admin_code: user.admin_code,
                xp: Number(formData.xp),
                p_xp: Number(formData.p_xp)
            };

            await createQuiz(payload).unwrap();
            toast.success('Quiz created successfully!');
            setCurrentStep(3);
        } catch (error) {
            console.error('Failed to create quiz:', error);
            toast.error(error?.data?.message || 'Failed to create quiz');
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                    {/* Sticky Progress Header */}
                    <div className="sticky top-0 z-30 pt-4 pb-6 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 mb-8">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-black text-sm uppercase tracking-wider">
                                    {currentStep === 3 ? 'Dashboard' : 'Back'}
                                </span>
                            </button>

                            <div className="flex items-center gap-3 sm:gap-4">
                                {STEPS.map((step, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${currentStep > idx + 1
                                            ? 'bg-emerald-500 text-white'
                                            : currentStep === idx + 1
                                                ? 'bg-[#a6b1ff] text-[#0a0a0a] scale-110 shadow-lg shadow-[#a6b1ff]/20'
                                                : 'bg-white/5 text-white/30 border border-white/10'
                                            }`}>
                                            <step.icon size={18} />
                                        </div>
                                        {idx < STEPS.length - 1 && (
                                            <div className={`w-4 sm:w-8 h-0.5 mx-1 sm:mx-2 rounded-full transition-all duration-500 ${currentStep > idx + 1 ? 'bg-emerald-500/50' : 'bg-white/10'
                                                }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <Step1
                                key="step1"
                                formData={formData}
                                handleChange={handleChange}
                                errors={errors}
                                handleNext={handleNext}
                                quizModes={quizModes}
                                groups={groups}
                                classes={classes}
                            />
                        )}
                        {currentStep === 2 && (
                            <Step2
                                key="step2"
                                formData={formData}
                                handleChange={handleChange}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                isSubmitting={isSubmitting}
                                userXp={user?.xp || 0}
                            />
                        )}
                        {currentStep === 3 && (
                            <SuccessStep
                                key="step3"
                                navigate={navigate}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout >
    );
}

const Step1 = ({ formData, handleChange, errors, handleNext, quizModes, groups, classes }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10">
            <div className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase italic mb-2">
                    Basic <span className="text-[#a6b1ff]">Information</span>
                </h1>
                <p className="text-white/60 font-medium">Set the foundation for your learning challenge</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <InputField
                        label="Quiz Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        error={errors.title}
                        placeholder="e.g. Master the Quantum Realm"
                        icon={BookOpen}
                    />
                    <div className="space-y-2">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Briefly describe what students will learn..."
                            className={`w-full bg-white/5 border ${errors.description ? 'border-rose-500/50' : 'border-white/10'} rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff]/50 transition-all resize-none font-medium`}
                        />
                        {errors.description && <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.description}</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <InputField
                        label="Duration (Minutes)"
                        name="duration"
                        type="number"
                        value={formData.duration}
                        onChange={handleChange}
                        error={errors.duration}
                        placeholder="e.g. 30"
                        icon={Clock}
                    />

                    <SelectField
                        label="Quiz Mode"
                        name="model_id"
                        value={formData.model_id}
                        onChange={handleChange}
                        options={quizModes?.map(q => ({ value: q.id, label: q.name })) || []}
                        icon={Sparkles}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <SelectField
                            label="Select Group"
                            name="group_code"
                            value={formData.group_code}
                            onChange={handleChange}
                            error={errors.group_code}
                            options={groups?.map(g => ({ value: g.group_code, label: g.title })) || []}
                            icon={Users}
                        />
                        <SelectField
                            label="Select Class"
                            name="class"
                            value={formData.class}
                            onChange={handleChange}
                            options={classes?.map(c => ({ value: c.id, label: c.name })) || []}
                            icon={Gamepad2}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-12 flex justify-end">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="px-10 py-4 rounded-2xl bg-[#a6b1ff] text-[#0a0a0a] font-black uppercase tracking-wider shadow-xl flex items-center gap-3 group"
                >
                    Continue
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </div>
    </motion.div>
);

const Step2 = ({ formData, handleChange, errors, handleSubmit, isSubmitting, userXp }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10 text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase italic mb-2">
                Advanced <span className="text-purple-400">Settings</span>
            </h1>
            <p className="text-white/60 font-medium">Fine-tune the rewards and requirements</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <h3 className="text-sm font-black text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <Calendar size={18} className="text-purple-400" />
                            Schedule
                        </h3>
                        <InputField
                            label="Start Date & Time"
                            name="start_at"
                            type="datetime-local"
                            value={formData.start_at}
                            onChange={handleChange}
                            error={errors.start_at}
                        />
                        <InputField
                            label="End Date & Time"
                            name="end_at"
                            type="datetime-local"
                            value={formData.end_at}
                            onChange={handleChange}
                            error={errors.end_at}
                        />
                    </div>

                    <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                                <Info size={20} className="text-indigo-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-black text-white uppercase tracking-wider mb-1">XP System</h4>
                                <p className="text-xs text-white/50 font-medium leading-relaxed">
                                    Your current balance: <span className="text-indigo-400 font-bold">{userXp} XP</span>.
                                    Allocating XP will freeze that amount until the quiz concludes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                        <h3 className="text-sm font-black text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <Trophy size={18} className="text-amber-400" />
                            Rewards & Limits
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <InputField
                                label="Total XP Pool"
                                name="xp"
                                type="number"
                                value={formData.xp}
                                onChange={handleChange}
                                error={errors.xp}
                                placeholder="Total XP"
                            />
                            <InputField
                                label="XP Per Answer"
                                name="p_xp"
                                type="number"
                                value={formData.p_xp}
                                onChange={handleChange}
                                error={errors.p_xp}
                                placeholder="Per Q"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <InputField
                                label="Min Age"
                                name="min_age"
                                type="number"
                                value={formData.min_age}
                                onChange={handleChange}
                                placeholder="Any"
                                icon={Users}
                            />
                            <InputField
                                label="Max Age"
                                name="max_age"
                                type="number"
                                value={formData.max_age}
                                onChange={handleChange}
                                placeholder="Any"
                                icon={Users}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-white/40 hover:text-white font-black uppercase text-xs tracking-widest transition-colors"
                >
                    Discard Changes
                </button>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative px-12 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black uppercase tracking-wider shadow-xl group overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : 'Launch Quiz'}
                        {!isSubmitting && <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />}
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
            </div>
        </form>
    </motion.div>
);

const SuccessStep = ({ navigate }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 text-center shadow-2xl relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px]" />

        <div className="relative z-10 py-8">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-32 h-32 bg-emerald-500 rounded-full mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20"
            >
                <CheckCircle2 size={64} className="text-white" />
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic mb-4">
                Mission <span className="text-emerald-400">Accomplished!</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-md mx-auto mb-12 leading-relaxed">
                Your quiz has been published successfully. Get ready to witness your students' brilliance!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    onClick={() => navigate('/dashboard/quizzes')}
                    className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white text-[#0a0a0a] font-black uppercase tracking-wider hover:bg-white/90 transition-all shadow-lg"
                >
                    Go to Quizzes
                </button>
                <button
                    onClick={() => window.location.reload()}
                    className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                    Create Another
                </button>
            </div>
        </div>
    </motion.div>
);

const InputField = ({ label, icon: Icon, error, ...props }) => (
    <div className="space-y-2">
        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">{label}</label>
        <div className="relative">
            <input
                {...props}
                className={`w-full bg-white/5 border ${error ? 'border-rose-500/50' : 'border-white/10'} rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff]/50 transition-all font-medium`}
            />
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />}
        </div>
        {error && <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{error}</p>}
    </div>
);

const SelectField = ({ label, options, icon: Icon, error, ...props }) => (
    <div className="space-y-2 text-left">
        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">{label}</label>
        <div className="relative">
            <select
                {...props}
                className={`w-full bg-white/5 border ${error ? 'border-rose-500/50' : 'border-white/10'} rounded-2xl px-12 py-4 text-white appearance-none focus:outline-none focus:border-[#a6b1ff]/50 transition-all font-medium cursor-pointer`}
            >
                <option value="" className="bg-[#121431]">Select option</option>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value} className="bg-[#121431]">
                        {opt.label}
                    </option>
                ))}
            </select>
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ArrowRight size={14} className="text-white/20 rotate-90" />
            </div>
        </div>
        {error && <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{error}</p>}
    </div>
);
