import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
    BookOpen,
    Video,
    Target,
    CheckCircle2,
    UploadCloud,
    Plus,
    Trash2,
    ArrowRight,
    Sparkles,
    Image as ImageIcon,
    Settings,
    Zap,
    Loader2,
    HelpCircle,
    Globe,
    FileText,
    Check,
    Search,
    AlertCircle,
    Save
} from 'lucide-react';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { useCreateCourseMutation, useGetQuizzesQuery } from '@/redux/api/teacherApi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import CaseStudyBuilder from '@/components/course/CaseStudyBuilder';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { saveCourseDraft, loadCourseDraft, clearCourseDraft, hasCourseDraft } from '@/utils/courseCreationStorage';

const STEPS = [
    { title: 'Basic Info', icon: BookOpen },
    { title: 'Content', icon: Video },
    { title: 'Questions', icon: FileText },
    { title: 'Assessment', icon: Target },
    { title: 'Success', icon: CheckCircle2 }
];

export default function CreateCourse() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [currentStep, setCurrentStep] = useState(1);
    const [isUploading, setIsUploading] = useState({ banner: false, video: false, other: false, attachment: false });
    const [createCourse, { isLoading: isSubmitting }] = useCreateCourseMutation();
    const [draftRestored, setDraftRestored] = useState(false);
    const [fileInputKey, setFileInputKey] = useState(Date.now());

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty_level: 'beginner',
        amount: '',
        banner_url: '',
        video_url: '',
        instruction: '',
        case_studies: [],
        learn: [''],
        other: [], // additional videos
        attachments: [], // document modules
        quiz_id: null,
        questions: [],
        manual_quiz: []
    });

    const [errors, setErrors] = useState({});

    const { data: quizzesData } = useGetQuizzesQuery({
        type: user?.role === "student" ? "student" : "teacher",
        id: user?.id
    }, { skip: !user?.id });

    const quizzes = quizzesData?.data || quizzesData || [];

    // Load saved draft on mount
    useEffect(() => {
        if (!draftRestored) {
            const savedDraft = loadCourseDraft();

            if (savedDraft) {
                setFormData(savedDraft.formData);
                setCurrentStep(savedDraft.currentStep || 1);

                toast.success('Draft Restored!', {
                    description: 'Your course creation progress has been restored',
                    duration: 4000
                });
            }

            setDraftRestored(true);
        }
    }, [draftRestored]);

    // Save draft whenever form data or step changes
    useEffect(() => {
        if (draftRestored && currentStep < 5) {
            saveCourseDraft(formData, currentStep);
        }
    }, [formData, currentStep, draftRestored]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleFileUpload = async (e, field) => {
        // Check if this is a URL input (no files but has url property)
        if (e.target.url) {
            const videoUrl = e.target.url.trim();

            // Validate URL format
            const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|drive\.google\.com|.*\.(mp4|webm|ogg)).*$/i.test(videoUrl);

            if (!isValidUrl) {
                toast.error("Please enter a valid YouTube, Google Drive, or direct video link");
                return;
            }

            // Set the video URL directly without uploading
            setFormData(prev => ({ ...prev, [`${field}_url`]: videoUrl }));
            toast.success("Video link added successfully");
            return;
        }

        // Handle file upload
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(prev => ({ ...prev, [field]: true }));
        try {
            const url = await uploadToCloudinary(file);
            if (field === 'other') {
                if (formData.other.length >= 5) {
                    toast.error("Maximum 5 additional videos allowed");
                } else {
                    setFormData(prev => ({ ...prev, other: [...prev.other, url] }));
                    toast.success("Additional video uploaded");
                }
            } else if (field === 'attachment') {
                const attachmentData = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: url
                };
                setFormData(prev => ({ ...prev, attachments: [...prev.attachments, attachmentData] }));
                toast.success(`File "${file.name}" attached`);
            } else {
                setFormData(prev => ({ ...prev, [`${field}_url`]: url }));
                toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} uploaded`);
            }

            // Reset the file input
            e.target.value = '';
        } catch (error) {
            toast.error("Upload failed");
            console.error(error);
        } finally {
            setIsUploading(prev => ({ ...prev, [field]: false }));
        }
    };

    const removeAttachment = (index) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, i) => i !== index)
        }));
        setFileInputKey(Date.now()); // Reset file input
        toast.success("Document removed");
    };

    const removeOtherVideo = (index) => {
        setFormData(prev => ({
            ...prev,
            other: prev.other.filter((_, i) => i !== index)
        }));
    };

    const handleLearnChange = (index, value) => {
        const newLearn = [...formData.learn];
        newLearn[index] = value;
        setFormData(prev => ({ ...prev, learn: newLearn }));
    };

    const addLearnPoint = () => {
        setFormData(prev => ({ ...prev, learn: [...prev.learn, ''] }));
    };

    const removeLearnPoint = (index) => {
        if (formData.learn.length > 1) {
            const newLearn = formData.learn.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, learn: newLearn }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.category.trim()) newErrors.category = 'Category is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.banner_url) newErrors.banner = 'Banner image is required';
        if (!formData.instruction.trim()) newErrors.instruction = 'Instruction text is required';
        if (formData.learn.some(p => !p.trim())) newErrors.learn = 'Please fill all learn points';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        if (formData.questions.length === 0) return true; // Optional embedded questions
        for (const q of formData.questions) {
            // Skip validation for quiz strings (e.g., "quiz: CODE")
            if (typeof q === 'string') continue;

            if (!q.question_text?.trim()) {
                toast.error("Please fill all question texts");
                return false;
            }
            if (q.options?.some(o => !o.trim())) {
                toast.error("Please fill all options");
                return false;
            }
            if (!q.correct_answer) {
                toast.error(`Please select a correct answer for: "${q.question_text.slice(0, 20)}..."`);
                return false;
            }
        }
        return true;
    };

    const handleLaunch = async () => {
        try {
            // Mapping to match Admin payload structure
            const payload = {
                title: formData.title,
                description: formData.description, // Matches 'syllabusInstructions' in Admin logic
                instruction: formData.instruction,
                category: formData.category,
                case_study: JSON.stringify(formData.case_studies),
                teacher_id: user.id,
                admin_code: user.admin_code,
                status: true,
                amount: Number(formData.amount),
                banner: formData.banner_url,
                video: formData.video_url,
                other: formData.other, // Additional video resourcformData.attachments.map(a => a.url)es
                attachment: formData.attachments.length > 0 ? JSON.stringify(formData.attachments.map(a => a.url)) : null,
                attachments: formData.attachments.map(a => a.url),
                learn: formData.learn,
                difficulty_level: formData.difficulty_level,
                // Handle new logic: if quiz_code exists, send it in question array as per admin
                question: formData.quiz_code ? [`quiz: ${formData.quiz_code} `] : formData.questions,
                quiz_id: formData.quiz_id,
                manual_quiz: formData.manual_quiz
            };

            await createCourse(payload).unwrap();
            toast.success("Course launched successfully!");

            // Clear draft after successful creation
            clearCourseDraft();

            setCurrentStep(5);
        } catch (error) {
            toast.error(error?.data?.message || "Failed to launch course");
        }
    };

    const nextStep = () => {
        if (currentStep === 1 && validateStep1()) setCurrentStep(2);
        else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
        else if (currentStep === 3 && validateStep3()) setCurrentStep(4);
    };

    const prevStep = () => {
        if (currentStep > 1 && currentStep < 5) setCurrentStep(currentStep - 1);
        else navigate('/dashboard/courses');
    };

    // Check if a step is accessible (completed or current)
    const isStepAccessible = (stepIndex) => {
        const stepNumber = stepIndex + 1;

        // Step 1 is always accessible
        if (stepNumber === 1) return true;

        // Step 2 is accessible if step 1 is valid
        if (stepNumber === 2) {
            return formData.title.trim() && formData.description.trim() && formData.category.trim();
        }

        // Step 3 is accessible if step 1 and 2 are valid
        if (stepNumber === 3) {
            const step1Valid = formData.title.trim() && formData.description.trim() && formData.category.trim();
            const step2Valid = formData.banner_url && formData.instruction.trim() && !formData.learn.some(p => !p.trim());
            return step1Valid && step2Valid;
        }

        // Step 4 is accessible if step 1, 2, and 3 are valid
        if (stepNumber === 4) {
            const step1Valid = formData.title.trim() && formData.description.trim() && formData.category.trim();
            const step2Valid = formData.banner_url && formData.instruction.trim() && !formData.learn.some(p => !p.trim());
            return step1Valid && step2Valid;
        }

        // Step 5 (success) is only accessible after submission
        return false;
    };

    const handleStepClick = (stepIndex) => {
        console.log(stepIndex);
        const stepNumber = stepIndex + 1;

        // Don't allow clicking on success step or current step
        if (stepNumber === 5 || stepNumber === currentStep) return;

        // Only allow navigation to accessible steps
        if (isStepAccessible(stepIndex)) {
            setCurrentStep(stepNumber);
        } else {
            toast.error('Please complete the current step first');
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-12">
                <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-6 space-y-8">
                    {/* Stepper Header */}
                    <div className="flex flex-col gap-4 bg-gray-50 dark:bg-[#0a0a0a]/40 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 lg:px-12">
                        <div className="text-center sm:text-left">
                            <h2 className="text-[10px] sm:text-sm font-black text-indigo-600 dark:text-[#a6b1ff] uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-1 italic">Academy</h2>
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                {currentStep === 5 ? 'Launch Success' : 'Course Creator'}
                            </h1>
                        </div>

                        <div className="relative">
                            <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 overflow-x-auto overflow-y-hidden pb-3 sm:pb-2 -mb-1 sm:-mb-0 px-1 max-w-[290px] lg:max-w-[680px]" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(209 213 219) transparent' }}>
                                <div className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[60px] sm:min-w-[70px] lg:min-w-[80px] lg:display-none" >

                                </div>
                                {STEPS.map((step, idx) => {
                                    const stepNumber = idx + 1;
                                    const isAccessible = isStepAccessible(idx);
                                    const isCurrent = currentStep === stepNumber;
                                    const isCompleted = currentStep > stepNumber;

                                    return (
                                        <React.Fragment key={idx}>
                                            <div className="flex flex-col items-center gap-1.5 sm:gap-2 min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]">
                                                <button
                                                    onClick={() => handleStepClick(idx)}
                                                    disabled={!isAccessible || isCurrent || stepNumber === 5}
                                                    className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 shrink-0 ${isCompleted
                                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 cursor-pointer'
                                                            : isCurrent
                                                                ? 'bg-[#a6b1ff] text-[#0a0a0a] scale-105 sm:scale-110 shadow-lg shadow-indigo-500/20 cursor-default'
                                                                : isAccessible && stepNumber !== 5
                                                                    ? 'bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-white/30 border border-gray-300 dark:border-white/10 hover:bg-gray-300 dark:hover:bg-white/10 cursor-pointer'
                                                                    : 'bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-white/30 border border-gray-300 dark:border-white/10 cursor-not-allowed opacity-50'
                                                        }`}
                                                >
                                                    {isCompleted ? <Check size={14} className="sm:w-[18px] sm:h-[18px]" /> : <step.icon size={14} className="sm:w-[18px] sm:h-[18px]" />}
                                                </button>
                                                <span className={`text-[7px] sm:text-[8px] lg:text-[9px] font-black uppercase tracking-wider sm:tracking-widest text-center leading-tight ${isCurrent ? 'text-[#a6b1ff]' : 'text-gray-400 dark:text-white/20'}`}>
                                                    {step.title}
                                                </span>
                                            </div>
                                            {idx < STEPS.length - 1 && (
                                                <div className={`w-3 sm:w-4 lg:w-8 h-[2px] mb-6 sm:mb-7 rounded-full shrink-0 ${isCompleted ? 'bg-emerald-500/50' : 'bg-gray-300 dark:bg-white/10'}`} />
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Draft Restored Indicator */}
                    {draftRestored && loadCourseDraft() && currentStep < 5 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-between gap-4 px-4 py-3 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-500/10 dark:to-teal-500/10 border-2 border-emerald-300 dark:border-emerald-500/20 rounded-xl shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <Save size={16} className="text-emerald-600 dark:text-emerald-400" />
                                <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                    Draft Auto-Saved
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    clearCourseDraft();
                                    setFormData({
                                        title: '',
                                        description: '',
                                        category: '',
                                        difficulty_level: 'beginner',
                                        amount: '',
                                        banner_url: '',
                                        video_url: '',
                                        instruction: '',
                                        case_studies: [],
                                        learn: [''],
                                        other: [],
                                        attachments: [],
                                        quiz_id: null,
                                        questions: []
                                    });
                                    setCurrentStep(1);
                                    toast.info('Draft cleared');
                                }}
                                className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 uppercase tracking-wider underline"
                            >
                                Clear Draft
                            </button>
                        </motion.div>
                    )}

                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <Step1
                                key="step1"
                                formData={formData}
                                handleChange={handleChange}
                                errors={errors}
                                onNext={nextStep}
                            />
                        )}
                        {currentStep === 2 && (
                            <Step2
                                key="step2"
                                formData={formData}
                                setFormData={setFormData}
                                handleChange={handleChange}
                                handleFileUpload={handleFileUpload}
                                handleLearnChange={handleLearnChange}
                                addLearnPoint={addLearnPoint}
                                removeLearnPoint={removeLearnPoint}
                                removeOtherVideo={removeOtherVideo}
                                removeAttachment={removeAttachment}
                                isUploading={isUploading}
                                errors={errors}
                                onNext={nextStep}
                                onPrev={prevStep}
                                fileInputKey={fileInputKey}
                            />
                        )}
                        {currentStep === 3 && (
                            <Step3Questions
                                key="step3"
                                formData={formData}
                                setFormData={setFormData}
                                quizzes={quizzes}
                                onNext={nextStep}
                                onPrev={prevStep}
                            />
                        )}
                        {currentStep === 4 && (
                            <Step4Assessment
                                key="step4"
                                formData={formData}
                                setFormData={setFormData}
                                quizzes={quizzes}
                                onLaunch={handleLaunch}
                                isSubmitting={isSubmitting}
                                onPrev={prevStep}
                                navigate={navigate}
                            />
                        )}
                        {currentStep === 5 && (
                            <SuccessStep key="step5" navigate={navigate} />
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    );
}

/* --- STEP COMPONENTS --- */

const Step1 = ({ formData, handleChange, errors, onNext }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        className="bg-white dark:bg-white/5 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-8 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10">
            <div className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white uppercase italic mb-2">
                    Basic <span className="text-indigo-600 dark:text-[#a6b1ff]">Information</span>
                </h1>
                <p className="text-gray-700 dark:text-white/60 font-medium">Define the core identity of your educational resource</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <InputField label="Course Title" name="title" value={formData.title} onChange={handleChange} error={errors.title} placeholder="e.g. Creative Coding Masterclass" icon={BookOpen} />
                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Detailed overview of the course..."
                            className={`w-full bg-gray-50 dark:bg-white/5 border ${errors.description ? 'border-rose-500/50' : 'border-gray-300 dark:border-white/10'} rounded-2xl px-5 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff]/50 transition-all resize-none font-medium`}
                        />
                        {errors.description && <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.description}</p>}
                    </div>
                </div>

                <div className="space-y-6">
                    <InputField label="Category" name="category" value={formData.category} onChange={handleChange} error={errors.category} placeholder="e.g. Technology" icon={Settings} />
                    <SelectField
                        label="Difficulty Level"
                        name="difficulty_level"
                        value={formData.difficulty_level}
                        onChange={handleChange}
                        options={[{ value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }, { value: 'advanced', label: 'Advanced' }]}
                        icon={Target}
                    />
                </div>
            </div>

            <div className="mt-12 flex justify-end">
                <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={onNext}
                    className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#a6b1ff] text-[#0a0a0a] font-black uppercase text-xs sm:text-sm tracking-wider shadow-xl flex items-center justify-center gap-3 group"
                >
                    Next Step
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </div>
    </motion.div>
);

const Step2 = ({ formData, setFormData, handleChange, handleFileUpload, handleLearnChange, addLearnPoint, removeLearnPoint, removeOtherVideo, removeAttachment, isUploading, errors, onNext, onPrev, fileInputKey }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        className="bg-white dark:bg-white/5 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-10 relative overflow-hidden"
    >
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10">
            <div className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white uppercase italic mb-2">
                    Visuals & <span className="text-indigo-600 dark:text-[#a6b1ff]">Content</span>
                </h1>
                <p className="text-gray-600 dark:text-white/60 font-medium">Bring your course to life with high-quality media</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                    <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-6">
                        <h3 className="text-sm font-black text-gray-700 dark:text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <ImageIcon size={18} className="text-indigo-600 dark:text-[#a6b1ff]" />
                            Course Assets
                        </h3>
                        <FileUploadField label="Banner Image (16:9)" field="banner" url={formData.banner_url} isUploading={isUploading.banner} onUpload={handleFileUpload} error={errors.banner} setFormData={setFormData} />
                        <FileUploadField label="Main Video" field="video" url={formData.video_url} isUploading={isUploading.video} onUpload={handleFileUpload} isVideo setFormData={setFormData} />
                    </div>

                    <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-6">
                        <h3 className="text-sm font-black text-gray-700 dark:text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <Plus size={18} className="text-emerald-600 dark:text-emerald-400" />
                            Additional Resources
                        </h3>
                        <AdditionalResourcesUpload
                            resources={formData.other}
                            onAdd={(url) => {
                                if (formData.other.length >= 5) {
                                    toast.error("Maximum 5 additional videos allowed");
                                } else {
                                    setFormData(prev => ({ ...prev, other: [...prev.other, url] }));
                                    toast.success("Additional video added");
                                }
                            }}
                            onRemove={removeOtherVideo}
                            isUploading={isUploading.other}
                            setIsUploading={(value) => setIsUploading(prev => ({ ...prev, other: value }))}
                            onFileUpload={handleFileUpload}
                        />
                    </div>

                    <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-6">
                        <h3 className="text-sm font-black text-gray-700 dark:text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                            Module Documents
                        </h3>
                        <div className="space-y-3">
                            {formData.attachments.map((file, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 text-xs text-gray-700 dark:text-white/60 group">
                                    <div className="flex items-center gap-3 truncate min-w-0">
                                        <FileText size={14} className="text-indigo-600 dark:text-[#a6b1ff] shrink-0" />
                                        <span className="truncate">{file.name}</span>
                                    </div>
                                    <button onClick={() => removeAttachment(i)} className="text-rose-500 hover:text-rose-400 transition-colors shrink-0">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                            <label className={`w-full h-12 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center gap-2 cursor-pointer hover:border-[#a6b1ff]/30 hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-sm font-bold text-gray-600 dark:text-white/40 ${isUploading.attachment ? 'opacity-50 pointer-events-none' : ''}`}>
                                {isUploading.attachment ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                                {isUploading.attachment ? 'Uploading...' : 'Add Document (PDF/Doc/Zip)'}
                                <input key={fileInputKey} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt,.zip,.rar" onChange={(e) => handleFileUpload(e, 'attachment')} />
                            </label>
                            <p className="text-[10px] text-gray-500 dark:text-white/30 text-center uppercase tracking-widest">Course reading materials</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-6">
                        <h3 className="text-sm font-black text-gray-700 dark:text-white/80 uppercase tracking-widest flex items-center gap-2">
                            <Sparkles size={18} className="text-amber-600 dark:text-amber-400" />
                            Learning Objectives
                        </h3>
                        <div className="space-y-4">
                            {formData.learn.map((point, i) => (
                                <div key={i} className="flex gap-3">
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => handleLearnChange(i, e.target.value)}
                                        placeholder={`Learning outcome #${i + 1}...`}
                                        className="flex-1 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:border-[#a6b1ff]/50 transition-all font-medium"
                                    />
                                    {formData.learn.length > 1 && (
                                        <button onClick={() => removeLearnPoint(i)} className="p-3 text-rose-500/50 hover:text-rose-500 transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button onClick={addLearnPoint} className="flex items-center gap-2 text-indigo-600 dark:text-[#a6b1ff] text-xs font-black uppercase tracking-widest hover:text-indigo-700 dark:hover:text-[#b8c2ff] transition-colors">
                                <Plus size={16} /> Add Objective
                            </button>
                            {errors.learn && <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider">{errors.learn}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1">Final Instruction</label>
                        <textarea
                            name="instruction"
                            value={formData.instruction}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Final steps for the students..."
                            className={`w-full bg-gray-50 dark:bg-white/5 border ${errors.instruction ? 'border-rose-500/50' : 'border-gray-300 dark:border-white/10'} rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:border-[#a6b1ff]/50 transition-all resize-none font-medium`}
                        />
                        {errors.instruction && <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.instruction}</p>}
                    </div>

                    <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-100 to-transparent dark:from-purple-500/10 dark:to-transparent border border-purple-300 dark:border-purple-500/20 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-200 dark:bg-purple-500/10 flex items-center justify-center">
                                <BookOpen size={20} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">Case Study Assessment</h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-white/40 leading-relaxed font-medium">
                            Create interactive scenario-based assessments in Step 4. Students will make decisions and receive immediate feedback based on their choices.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-purple-600 dark:text-purple-400/60 uppercase tracking-widest font-black">
                            <ArrowRight size={12} />
                            Configure in Assessment Step
                        </div>
                    </div>
                </div>
            </div >

            <div className="mt-12 flex justify-between items-center">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onPrev}
                    className="px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-black uppercase text-[10px] sm:text-xs tracking-widest hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all shadow-md"
                >
                    Back
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={onNext}
                    className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#a6b1ff] text-[#0a0a0a] font-black uppercase text-xs sm:text-sm tracking-wider shadow-xl flex items-center justify-center gap-3 group"
                >
                    Questions
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </div >
    </motion.div >
);

const Step3Questions = ({ formData, setFormData, quizzes, onNext, onPrev }) => {
    const [activeTab, setActiveTab] = useState('link'); // 'link' or 'manual'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState(() => {
        const quizCode = formData.questions?.[0]?.toString().startsWith('quiz:')
            ? formData.questions[0].split('quiz: ')[1]?.trim()
            : null;

        if (quizCode && quizzes) return quizzes.find(q => q.quiz_code === quizCode);
        if (formData.quiz_id && quizzes) return quizzes.find(q => q.id === formData.quiz_id);
        return null;
    });

    const [manualQuestions, setManualQuestions] = useState(formData.manual_quiz || []);

    const filteredQuizzes = quizzes?.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.quiz_code?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
        setFormData(prev => ({
            ...prev,
            quiz_id: quiz.id,
            questions: [`quiz: ${quiz.quiz_code}`],
            manual_quiz: [] // Clear manual quiz when selecting a linked quiz
        }));
        setManualQuestions([]);
        toast.success(`Quiz selected: ${quiz.title}`);
    };

    const addManualQuestion = () => {
        const newQuestion = {
            question: '',
            options: [
                { option: '', is_correct: false },
                { option: '', is_correct: false }
            ]
        };
        const updated = [...manualQuestions, newQuestion];
        setManualQuestions(updated);
        setFormData(prev => ({
            ...prev,
            manual_quiz: updated,
            quiz_id: null, // Clear linked quiz when adding manual questions
            questions: []
        }));
        setSelectedQuiz(null);
    };

    const removeManualQuestion = (index) => {
        const updated = manualQuestions.filter((_, i) => i !== index);
        setManualQuestions(updated);
        setFormData(prev => ({ ...prev, manual_quiz: updated }));
    };

    const updateManualQuestion = (index, field, value) => {
        const updated = [...manualQuestions];
        updated[index] = { ...updated[index], [field]: value };
        setManualQuestions(updated);
        setFormData(prev => ({ ...prev, manual_quiz: updated }));
    };

    const addOption = (questionIndex) => {
        const updated = [...manualQuestions];
        updated[questionIndex].options.push({ option: '', is_correct: false });
        setManualQuestions(updated);
        setFormData(prev => ({ ...prev, manual_quiz: updated }));
    };

    const removeOption = (questionIndex, optionIndex) => {
        const updated = [...manualQuestions];
        if (updated[questionIndex].options.length > 2) {
            updated[questionIndex].options = updated[questionIndex].options.filter((_, i) => i !== optionIndex);
            setManualQuestions(updated);
            setFormData(prev => ({ ...prev, manual_quiz: updated }));
        }
    };

    const updateOption = (questionIndex, optionIndex, field, value) => {
        const updated = [...manualQuestions];
        updated[questionIndex].options[optionIndex] = {
            ...updated[questionIndex].options[optionIndex],
            [field]: value
        };
        setManualQuestions(updated);
        setFormData(prev => ({ ...prev, manual_quiz: updated }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-white/5 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-10 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[100px]" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white uppercase italic mb-2">
                            Add <span className="text-indigo-600 dark:text-[#a6b1ff]">Assessment</span>
                        </h1>
                        <p className="text-gray-600 dark:text-white/60 font-medium">Link an existing quiz or create manual questions</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 p-2 bg-gray-100 dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/10">
                    <button
                        onClick={() => setActiveTab('link')}
                        className={`flex-1 py-3 px-6 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'link'
                            ? 'bg-[#a6b1ff] text-gray-900 dark:text-black shadow-lg'
                            : 'text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60'
                            }`}
                    >
                        Link Quiz
                    </button>
                    <button
                        onClick={() => setActiveTab('manual')}
                        className={`flex-1 py-3 px-6 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'manual'
                            ? 'bg-[#a6b1ff] text-gray-900 dark:text-black shadow-lg'
                            : 'text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60'
                            }`}
                    >
                        Manual Quiz
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'link' ? (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1">Search & Select Quiz</label>
                            <div className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20 group-focus-within:text-[#a6b1ff] transition-colors"><Search size={20} /></div>
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by quiz name or unique code..."
                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl pl-14 pr-6 py-5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all"
                                />
                            </div>
                        </div>

                        {selectedQuiz ? (
                            <div className="p-8 rounded-[2rem] border-2 border-[#a6b1ff]/20 bg-blue-50 dark:bg-[#a6b1ff]/5 flex items-center justify-between gap-6 animate-in zoom-in-95 duration-300 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#a6b1ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="space-y-2 min-w-0 relative">
                                    <p className="text-[10px] font-black text-indigo-600 dark:text-[#a6b1ff] uppercase tracking-[0.3em]">Currently Selected</p>
                                    <h4 className="text-2xl font-black text-gray-900 dark:text-white truncate italic tracking-tight">{selectedQuiz.title}</h4>
                                    <div className="flex items-center gap-2">
                                        <div className="px-2 py-1 rounded bg-gray-200 dark:bg-white/10 text-[10px] font-mono text-gray-700 dark:text-white/60">{selectedQuiz.quiz_code}</div>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => { setSelectedQuiz(null); setFormData(prev => ({ ...prev, quiz_id: null, questions: [] })); }}
                                    className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-xl px-6 relative"
                                >
                                    Detach
                                </Button>
                            </div>
                        ) : (
                            <div className="border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden bg-gray-50 dark:bg-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {filteredQuizzes.length > 0 ? (
                                    <div className="divide-y divide-gray-200 dark:divide-white/5">
                                        {filteredQuizzes.map((quiz) => (
                                            <div
                                                key={quiz.id}
                                                onClick={() => handleQuizSelect(quiz)}
                                                className="p-6 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer transition-colors group"
                                            >
                                                <div className="min-w-0 space-y-1">
                                                    <p className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#a6b1ff] transition-colors">{quiz.title}</p>
                                                    <p className="text-[10px] text-gray-500 dark:text-white/30 uppercase tracking-widest">Code: {quiz.quiz_code}</p>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#a6b1ff] group-hover:text-black transition-all transform group-hover:scale-110">
                                                    <ArrowRight size={18} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-24 flex flex-col items-center justify-center text-center px-6">
                                        <div className="w-16 h-16 rounded-full bg-dashed border-2 border-gray-300 dark:border-white/10 flex items-center justify-center mb-4">
                                            <Search className="text-gray-400 dark:text-white/20" size={24} />
                                        </div>
                                        <p className="text-lg font-bold text-gray-600 dark:text-white/40">No quizzes match "{searchTerm}"</p>
                                        <p className="text-xs text-gray-400 dark:text-white/20 mt-2 uppercase tracking-widest">Try searching for a different name or code</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1">Manual Questions</label>
                            <Button
                                onClick={addManualQuestion}
                                className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 border border-emerald-500/20 rounded-xl px-4 py-2 flex items-center gap-2"
                            >
                                <Plus size={16} color="green" />
                                Add Question
                            </Button>
                        </div>

                        {manualQuestions.length === 0 ? (
                            <div className="py-24 flex flex-col items-center justify-center text-center px-6 border-2 border-dashed border-gray-300 dark:border-white/10 rounded-[2rem]">
                                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center mb-4">
                                    <HelpCircle className="text-gray-400 dark:text-white/20" size={24} />
                                </div>
                                <p className="text-lg font-bold text-gray-600 dark:text-white/40">No manual questions yet</p>
                                <p className="text-xs text-gray-500 dark:text-white/20 mt-2 uppercase tracking-widest">Click "Add Question" to create your first question</p>
                            </div>
                        ) : (
                            <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                {manualQuestions.map((q, qIndex) => (
                                    <div key={qIndex} className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-4">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <label className="text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-widest mb-2 block">Question {qIndex + 1}</label>
                                                <input
                                                    value={q.question}
                                                    onChange={(e) => updateManualQuestion(qIndex, 'question', e.target.value)}
                                                    placeholder="Enter your question..."
                                                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium"
                                                />
                                            </div>
                                            <Button
                                                onClick={() => removeManualQuestion(qIndex)}
                                                className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-xl p-2"
                                            >
                                                <Trash2 size={16} color="red" />
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-widest">Options</label>
                                                <Button
                                                    onClick={() => addOption(qIndex)}
                                                    className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-lg px-3 py-1 text-xs"
                                                >
                                                    <Plus size={14} color="#2563eb" />
                                                </Button>
                                            </div>
                                            {q.options.map((opt, optIndex) => (
                                                <div key={optIndex} className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={opt.is_correct}
                                                        onChange={(e) => updateOption(qIndex, optIndex, 'is_correct', e.target.checked)}
                                                        className="w-5 h-5 rounded border-gray-300 dark:border-white/20 text-emerald-500 focus:ring-emerald-500"
                                                    />
                                                    <input
                                                        value={opt.option}
                                                        onChange={(e) => updateOption(qIndex, optIndex, 'option', e.target.value)}
                                                        placeholder={`Option ${optIndex + 1}`}
                                                        className="flex-1 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none"
                                                    />
                                                    {q.options.length > 2 && (
                                                        <Button
                                                            onClick={() => removeOption(qIndex, optIndex)}
                                                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-lg p-2"
                                                        >
                                                            <Trash2 size={14} />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-12 flex justify-between items-center">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onPrev}
                        className="px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-black uppercase text-[10px] sm:text-xs tracking-widest hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all shadow-md"
                    >
                        Back
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={onNext}
                        className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#a6b1ff] text-[#0a0a0a] font-black uppercase text-xs sm:text-sm tracking-wider shadow-xl flex items-center justify-center gap-3 group"
                    >
                        Review
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

const Step4Assessment = ({ formData, setFormData, quizzes, onLaunch, isSubmitting, onPrev, navigate }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
        className="bg-white dark:bg-white/5 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-10 relative overflow-hidden"
    >
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px]" />

        <div className="relative z-10">
            <div className="mb-10 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black text-gray-900 dark:text-white uppercase italic mb-2">
                    Final <span className="text-indigo-600 dark:text-[#a6b1ff]">Assessment</span>
                </h1>
                <p className="text-gray-600 dark:text-white/60 font-medium">Configure quizzes and interactive case studies</p>
            </div>

            <div className="space-y-10">
                {/* Quiz Linking Section */}
                <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center">
                            <HelpCircle size={20} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider">Certification Quiz</h3>
                    </div>

                    <SelectField
                        label="Select Certification Quiz (Optional)"
                        name="quiz_id"
                        value={formData.quiz_id || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, quiz_id: e.target.value || null }))}
                        options={quizzes.map(q => ({ value: q.id, label: q.title }))}
                        icon={HelpCircle}
                    />

                    <div className="p-6 rounded-xl bg-blue-50 dark:bg-indigo-500/5 border border-blue-200 dark:border-indigo-500/10 space-y-3">
                        <div className="flex items-center gap-2">
                            <AlertCircle size={16} className="text-indigo-600 dark:text-indigo-400" />
                            <h4 className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">About Certification</h4>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-white/40 leading-relaxed font-medium">
                            Linking a full quiz allows students to earn a formal certificate upon completion. The in-course questions are used for engagement and quick checks during the lessons.
                        </p>
                    </div>
                </div>

                {/* Case Study Builder Section */}
                <div>
                    <CaseStudyBuilder
                        caseStudies={formData.case_studies}
                        onChange={(caseStudies) => setFormData(prev => ({ ...prev, case_studies: caseStudies }))}
                    />
                </div>

                {/* Summary Section */}
                <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-100 to-transparent dark:from-indigo-500/10 dark:to-transparent border border-indigo-200 dark:border-white/10 space-y-6 relative group overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Globe size={120} />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Final Summary</h3>
                    <div className="space-y-4">
                        <SummaryItem label="Video Lessons" value={`${formData.other.length + 1} Modules`} />
                        <SummaryItem label="Linked Quiz" value={formData.questions.length > 0 ? 'Connected' : 'None'} />
                        <SummaryItem label="Certification" value={formData.quiz_id ? 'Active' : 'Not Set'} />
                        <SummaryItem label="Case Studies" value={formData.case_studies?.length > 0 ? `${formData.case_studies.length} Active` : 'None'} />
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-200 dark:border-white/5">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full sm:w-auto">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onPrev}
                        className="w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white font-black uppercase text-[10px] sm:text-xs tracking-widest hover:from-gray-300 hover:to-gray-400 dark:hover:from-gray-600 dark:hover:to-gray-700 transition-all shadow-md"
                    >
                        Back
                    </motion.button>
                    <button onClick={() => navigate('/dashboard/courses')} className="text-rose-400/50 hover:text-rose-400 font-black uppercase text-xs tracking-widest transition-colors">Discard</button>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={onLaunch}
                    disabled={isSubmitting}
                    className="w-full px-8 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black uppercase text-xs sm:text-sm tracking-widest shadow-2xl flex items-center justify-center gap-3 sm:gap-4 transition-all"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : 'Launch Academy'}
                    {!isSubmitting && <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />}
                </motion.button>
            </div>
        </div>
    </motion.div>
);

const SuccessStep = ({ navigate }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-white/5 backdrop-blur-3xl border border-gray-200 dark:border-white/10 rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden"
    >
        <div className="absolute inset-0 bg-emerald-500/5 blur-[100px]" />
        <div className="relative z-10 py-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 12, stiffness: 200 }} className="w-32 h-32 bg-emerald-500 rounded-2xl mx-auto flex items-center justify-center mb-10 shadow-2xl shadow-emerald-500/30 rotate-12">
                <CheckCircle2 size={64} className="text-white" />
            </motion.div>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white uppercase italic mb-4">Academy <span className="text-emerald-600 dark:text-emerald-400">Live!</span></h1>
            <p className="text-gray-600 dark:text-white/60 text-lg font-medium max-w-md mx-auto mb-16 leading-relaxed uppercase tracking-tighter">Your knowledge is now shared. Keep inspiring and empowering your students!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button onClick={() => navigate('/dashboard/courses')} className="w-full sm:w-auto px-12 py-7 rounded-2xl bg-white text-[#0a0a0a] font-black uppercase tracking-widest hover:bg-white/90 shadow-xl transition-all">My Courses</Button>
                <Button onClick={() => {
                    clearCourseDraft();
                    window.location.reload();
                }} className="w-full sm:w-auto px-12 py-7 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest hover:bg-white/10 transition-all">New Course</Button>
            </div>
        </div>
    </motion.div>
);

/* --- HELPER COMPONENTS --- */

const InputField = ({ label, icon: Icon, error, ...props }) => (
    <div className="space-y-2">
        <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1 italic">{label}</label>
        <div className="relative">
            <input {...props} className={`w-full bg-gray-50 dark:bg-white/5 border ${error ? 'border-rose-500/50' : 'border-gray-300 dark:border-white/10'} rounded-2xl px-12 py-5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff]/50 transition-all font-medium`} />
            {Icon && <Icon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20" />}
        </div>
        {error && <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{error}</p>}
    </div>
);

const SelectField = ({ label, options, icon: Icon, error, ...props }) => (
    <div className="space-y-2 text-left">
        <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1 italic">{label}</label>
        <div className="relative">
            <select {...props} className={`w-full bg-gray-50 dark:bg-white/5 border ${error ? 'border-rose-500/50' : 'border-gray-300 dark:border-white/10'} rounded-2xl px-12 py-5 text-gray-900 dark:text-white appearance-none focus:outline-none focus:border-[#a6b1ff]/50 transition-all font-medium cursor-pointer`}>
                <option value="" className="bg-white dark:bg-[#0a0a0a]">Select Option</option>
                {options.map(opt => <option key={opt.value} value={opt.value} className="bg-white dark:bg-[#0a0a0a]">{opt.label}</option>)}
            </select>
            {Icon && <Icon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/20" />}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"><ArrowRight size={14} className="rotate-90" /></div>
        </div>
        {error && <p className="text-rose-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{error}</p>}
    </div>
);

const FileUploadField = ({ label, field, url, isUploading, onUpload, isVideo = false, error, setFormData }) => {
    const inputRef = React.useRef(null);
    const [isDragging, setIsDragging] = React.useState(false);
    const [showUrlInput, setShowUrlInput] = React.useState(false);
    const [urlInput, setUrlInput] = React.useState('');

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            onUpload({ target: { files: [file] } }, field);
        }
    };

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            // Simulate file upload event with URL
            onUpload({ target: { files: [], url: urlInput.trim() } }, field);
            setUrlInput('');
            setShowUrlInput(false);
        }
    };

    const handleRemoveVideo = (e) => {
        e.stopPropagation();
        // Clear the video URL directly using setFormData
        if (setFormData) {
            setFormData(prev => ({ ...prev, [`${field}_url`]: '' }));
            setShowUrlInput(false);
            toast.success("Video removed");
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1 italic">{label}</label>

            {isVideo && !url && (
                <div className="flex gap-2 mb-2">
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(false)}
                        className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${!showUrlInput
                            ? 'bg-[#a6b1ff] text-black'
                            : 'bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-white/40'
                            }`}
                    >
                        Upload File
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(true)}
                        className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${showUrlInput
                            ? 'bg-[#a6b1ff] text-black'
                            : 'bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-white/40'
                            }`}
                    >
                        Use Link
                    </button>
                </div>
            )}

            {isVideo && showUrlInput && !url ? (
                <div className="space-y-3">
                    <div className="p-6 rounded-3xl bg-gray-100 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10">
                        <div className="space-y-3">
                            <input
                                type="url"
                                value={urlInput}
                                onChange={(e) => setUrlInput(e.target.value)}
                                placeholder="Paste YouTube or Google Drive link..."
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff] transition-all text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleUrlSubmit}
                                disabled={!urlInput.trim()}
                                className="w-full px-4 py-3 bg-[#a6b1ff] text-black rounded-xl font-bold uppercase text-xs tracking-wider hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Add Video Link
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-white/30 mt-3 text-center">
                            Supports YouTube, Google Drive, and direct video links
                        </p>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative h-40 rounded-3xl bg-gray-100 dark:bg-white/5 border-2 border-dashed ${isDragging ? 'border-[#a6b1ff] bg-[#a6b1ff]/10' : 'border-gray-300 dark:border-white/10'} hover:border-[#a6b1ff]/50 transition-all overflow-hidden group cursor-pointer`}
                >
                    {url ? (
                        <div className="w-full h-full relative">
                            {isVideo ? (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-black/40 gap-2">
                                    <Video className="text-emerald-500" size={32} />
                                    <span className="text-[10px] font-black uppercase text-gray-600 dark:text-white/60">Video Ready</span>
                                    <button
                                        type="button"
                                        onClick={handleRemoveVideo}
                                        className="mt-2 px-4 py-1 bg-rose-500 text-white rounded-lg text-xs font-bold uppercase hover:bg-rose-600 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <img src={url} alt="Preview" className="w-full h-full object-cover" />
                            )}
                            {!isVideo && (
                                <div className="absolute inset-0 bg-[#0a0a0a]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-black text-xs uppercase underline tracking-widest decoration-indigo-500 underline-offset-4">Change File</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-gray-400 dark:text-white/20 group-hover:text-gray-600 dark:group-hover:text-white/40 transition-colors">
                            {isUploading ? <Loader2 size={32} className="animate-spin text-[#a6b1ff]" /> : <UploadCloud size={32} />}
                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{isUploading ? 'Syncing...' : (isDragging ? 'Drop File Here' : 'Upload Resource')}</span>
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        accept={isVideo ? "video/*" : "image/*"}
                        onChange={(e) => onUpload(e, field)}
                    />
                </div>
            )}
            {error && <p className="text-rose-400 text-[10px] font-bold uppercase tracking-wider pl-1">{error}</p>}
        </div>
    );
};

const SummaryItem = ({ label, value }) => (
    <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/5 pb-4">
        <span className="text-[11px] font-black text-gray-500 dark:text-white/30 uppercase tracking-widest">{label}</span>
        <span className="text-sm font-black text-gray-900 dark:text-white uppercase italic tracking-tight">{value}</span>
    </div>
);

const AdditionalResourcesUpload = ({ resources, onAdd, onRemove, isUploading, setIsUploading, onFileUpload }) => {
    const fileInputRef = React.useRef(null);
    const [showUrlInput, setShowUrlInput] = React.useState(false);
    const [urlInput, setUrlInput] = React.useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Use the parent's handleFileUpload function which uploads to Cloudinary
        await onFileUpload(e, 'other');

        // Reset file input to allow uploading the same file again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUrlSubmit = () => {
        if (urlInput.trim()) {
            // Validate URL format
            const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|drive\.google\.com|.*\.(mp4|webm|ogg)).*$/i.test(urlInput.trim());

            if (!isValidUrl) {
                toast.error("Please enter a valid YouTube, Google Drive, or direct video link");
                return;
            }

            onAdd(urlInput.trim());
            setUrlInput('');
            setShowUrlInput(false);
        }
    };

    const handleFileButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSwitchToUpload = () => {
        setShowUrlInput(false);
        setUrlInput('');
        // Trigger file input after state update
        setTimeout(() => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        }, 50);
    };

    return (
        <div className="space-y-3">
            {resources.map((url, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 text-xs text-gray-700 dark:text-white/60 group">
                    <div className="flex items-center gap-2 truncate min-w-0">
                        <Video size={14} className="text-emerald-600 dark:text-emerald-500 shrink-0" />
                        <span className="truncate max-w-[200px]">{url}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onRemove(i)}
                        className="text-rose-500 hover:text-rose-400 transition-colors shrink-0"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}

            {/* Hidden file input - always present */}
            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="video/*"
                onChange={handleFileUpload}
                disabled={isUploading}
            />

            {!showUrlInput ? (
                <div className="space-y-2">
                    <button
                        type="button"
                        onClick={handleFileButtonClick}
                        disabled={isUploading}
                        className={`w-full h-12 rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center gap-2 hover:border-[#a6b1ff]/30 hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-sm font-bold text-gray-600 dark:text-white/40 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />}
                        {isUploading ? 'Uploading...' : 'Upload Video File'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(true)}
                        disabled={isUploading}
                        className="w-full h-10 rounded-xl border border-gray-300 dark:border-white/10 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-xs font-bold text-gray-600 dark:text-white/40 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Globe size={14} />
                        Or Use Video Link
                    </button>
                </div>
            ) : (
                <div className="space-y-2">
                    <div className="p-4 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 space-y-3">
                        <input
                            type="url"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && urlInput.trim()) {
                                    handleUrlSubmit();
                                }
                            }}
                            placeholder="Paste YouTube or Google Drive link..."
                            className="w-full px-4 py-2 rounded-lg bg-white dark:bg-black/20 border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff] transition-all text-sm"
                        />
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={handleUrlSubmit}
                                disabled={!urlInput.trim()}
                                className="flex-1 px-4 py-2 bg-[#a6b1ff] text-black rounded-lg font-bold uppercase text-xs tracking-wider hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                Add Link
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowUrlInput(false);
                                    setUrlInput('');
                                }}
                                className="px-4 py-2 bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-white/60 rounded-lg font-bold uppercase text-xs tracking-wider hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleSwitchToUpload}
                        className="w-full h-10 rounded-xl border border-gray-300 dark:border-white/10 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-xs font-bold text-gray-600 dark:text-white/40"
                    >
                        <UploadCloud size={14} />
                        Or Upload File
                    </button>
                </div>
            )}

            <p className="text-[10px] text-gray-500 dark:text-white/30 text-center uppercase tracking-widest">Max 5 additional modules</p>
        </div>
    );
};
