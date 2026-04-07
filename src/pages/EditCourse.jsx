import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
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
    ArrowLeft,
    Search
} from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import {
    useUpdateCourseMutation,
    useGetCourseByIdQuery,
    useGetQuizzesQuery
} from '@/redux/api/teacherApi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { uploadToCloudinary } from '@/lib/cloudinary';
import CaseStudyBuilder from '@/components/course/CaseStudyBuilder';

const STEPS = [
    { title: 'Basic Info', icon: BookOpen },
    { title: 'Content', icon: Video },
    { title: 'Questions', icon: FileText },
    { title: 'Assessment', icon: Target },
    { title: 'Finish', icon: CheckCircle2 }
];

export default function EditCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [currentStep, setCurrentStep] = useState(1);
    const [isUploading, setIsUploading] = useState({ banner: false, video: false, other: false });

    const { data: courseData, isLoading: isLoadingCourse } = useGetCourseByIdQuery(courseId);
    const [updateCourse, { isLoading: isSubmitting }] = useUpdateCourseMutation();

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
        other: [],
        quiz_id: null,
        questions: [],
        manual_quiz: []
    });

    const [errors, setErrors] = useState({});

    // Hydrate form data
    useEffect(() => {
        if (courseData) {
            const course = courseData?.data || courseData;

            // Parse case_studies from JSON if it exists
            let parsedCaseStudies = [];
            if (course.case_study) {
                try {
                    parsedCaseStudies = JSON.parse(course.case_study);
                    if (!Array.isArray(parsedCaseStudies)) {
                        parsedCaseStudies = [];
                    }
                } catch (e) {
                    console.error('Failed to parse case studies:', e);
                    parsedCaseStudies = [];
                }
            }

            // Parse manual_quiz from JSON if it exists
            let parsedManualQuiz = [];
            if (course.manual_quiz) {
                try {
                    parsedManualQuiz = typeof course.manual_quiz === 'string' 
                        ? JSON.parse(course.manual_quiz) 
                        : course.manual_quiz;
                    if (!Array.isArray(parsedManualQuiz)) {
                        parsedManualQuiz = [];
                    }
                } catch (e) {
                    console.error('Failed to parse manual quiz:', e);
                    parsedManualQuiz = [];
                }
            }

            setFormData({
                title: course.title || '',
                description: course.description || '',
                category: course.category || '',
                difficulty_level: course.difficulty_level || 'beginner',
                amount: course.amount ? Number(course.amount) : '',
                banner_url: course.banner_url || '',
                video_url: course.video_url || '',
                instruction: course.instruction || course.instruction_url || '',
                case_studies: parsedCaseStudies,
                learn: Array.isArray(course.learn) ? course.learn : [''],
                other: Array.isArray(course.other) ? course.other : [],
                quiz_id: course.quiz_id || null,
                questions: Array.isArray(course.question) ? course.question : (Array.isArray(course.questions) ? course.questions : []),
                manual_quiz: parsedManualQuiz
            });
        }
    }, [courseData]);

    const { data: quizzesData } = useGetQuizzesQuery({
        type: user?.role === "student" ? "student" : "teacher",
        id: user?.id
    }, { skip: !user?.id });

    const quizzes = quizzesData?.data || quizzesData || [];

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
                setFormData(prev => ({ ...prev, other: [...prev.other, url] }));
            } else {
                setFormData(prev => ({ ...prev, [`${field}_url`]: url }));
            }
            toast.success("Uploaded successfully");
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setIsUploading(prev => ({ ...prev, [field]: false }));
        }
    };

    const removeOtherVideo = (index) => {
        setFormData(prev => ({ ...prev, other: prev.other.filter((_, i) => i !== index) }));
    };

    const handleLearnChange = (index, value) => {
        const newLearn = [...formData.learn];
        newLearn[index] = value;
        setFormData(prev => ({ ...prev, learn: newLearn }));
    };

    // Question Handlers
    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [...prev.questions, {
                question_text: '',
                options: ['', ''],
                correct_answer: '',
                points: 1,
                order: prev.questions.length + 1
            }]
        }));
    };

    const updateQuestion = (index, field, value) => {
        const newQuestions = [...formData.questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const updateOption = (qIndex, oIndex, value) => {
        const newQuestions = [...formData.questions];
        const newOptions = [...newQuestions[qIndex].options];
        newOptions[oIndex] = value;
        newQuestions[qIndex] = { ...newQuestions[qIndex], options: newOptions };
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const addOption = (qIndex) => {
        const newQuestions = [...formData.questions];
        if (newQuestions[qIndex].options.length >= 4) return;
        newQuestions[qIndex].options.push('');
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                id: courseId,
                title: formData.title,
                description: formData.description,
                instruction: formData.instruction,
                category: formData.category,
                difficulty_level: formData.difficulty_level,
                status: true, // or keep existing status if available
                amount: Number(formData.amount),
                banner: formData.banner_url,
                video: formData.video_url,
                learn: formData.learn,
                other: formData.other,
                quiz_id: formData.quiz_id,
                case_study: JSON.stringify(formData.case_studies),
                question: formData.questions,
                manual_quiz: formData.manual_quiz
            };
            await updateCourse(payload).unwrap();
            toast.success("Course updated successfully!");
            navigate(`/dashboard/courses/view/${courseId}`);
        } catch (error) {
            toast.error("Failed to update course");
        }
    };

    if (isLoadingCourse) {
        return (
            <DashboardLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="animate-spin text-[#a6b1ff]" size={48} />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-12">
                <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-6 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:px-12">
                        <div className="flex items-center gap-4">
                            <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 dark:text-white/40 hover:text-foreground dark:hover:text-white transition-all hover:font-bold">
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h2 className="text-sm font-black text-[#a6b1ff] uppercase tracking-[0.3em] mb-1 italic">Academy</h2>
                                <h1 className="text-2xl lg:text-3xl font-black text-white uppercase italic tracking-tighter">Edit Course</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                            {STEPS.map((step, idx) => (
                                <div key={idx} className="flex items-center">
                                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all ${currentStep > idx + 1 ? 'bg-emerald-500 text-white' :
                                        currentStep === idx + 1 ? 'bg-[#a6b1ff] text-[#0a0a0a] scale-110 shadow-lg' :
                                            'bg-white/5 text-white/30'
                                        }`}>
                                        <step.icon size={18} />
                                    </div>
                                    {idx < STEPS.length - 1 && (
                                        <div className={`w-4 sm:w-8 h-0.5 mx-1 sm:mx-2 rounded-full ${currentStep > idx + 1 ? 'bg-emerald-500/50' : 'bg-white/10'}`} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} onNext={() => setCurrentStep(2)} />}
                        {currentStep === 2 && <Step2 formData={formData} setFormData={setFormData} handleChange={handleChange} handleFileUpload={handleFileUpload} handleLearnChange={handleLearnChange} addLearnPoint={() => setFormData(p => ({ ...p, learn: [...p.learn, ''] }))} removeLearnPoint={(i) => setFormData(p => ({ ...p, learn: p.learn.filter((_, idx) => idx !== i) }))} removeOtherVideo={removeOtherVideo} isUploading={isUploading} onNext={() => setCurrentStep(3)} onPrev={() => setCurrentStep(1)} />}
                        {currentStep === 3 && <Step3Questions formData={formData} setFormData={setFormData} quizzes={quizzes} addQuestion={addQuestion} removeQuestion={(i) => setFormData(p => ({ ...p, questions: p.questions.filter((_, idx) => idx !== i) }))} updateQuestion={updateQuestion} updateOption={updateOption} addOption={addOption} onNext={() => setCurrentStep(4)} onPrev={() => setCurrentStep(2)} />}
                        {currentStep === 4 && <Step4Assessment formData={formData} setFormData={setFormData} quizzes={quizzes} onLaunch={handleSubmit} isSubmitting={isSubmitting} onPrev={() => setCurrentStep(3)} navigate={navigate} />}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    );
}

/* Reusing Step Components - In a real app these should be imported */
const Step1 = ({ formData, handleChange, onNext }) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-8">
        <h1 className="text-3xl font-black text-white uppercase italic">Basic <span className="text-[#a6b1ff]">Info</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <InputField label="Title" name="title" value={formData.title} onChange={handleChange} icon={BookOpen} />
                <div className="space-y-2">
                    <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white resize-none font-medium focus:border-[#a6b1ff]/50 outline-none" />
                </div>
            </div>
            <div className="space-y-6">
                <InputField label="Category" name="category" value={formData.category} onChange={handleChange} icon={Settings} />
                <SelectField label="Difficulty" name="difficulty_level" value={formData.difficulty_level} onChange={handleChange} options={[{ value: 'beginner', label: 'Beginner' }, { value: 'intermediate', label: 'Intermediate' }, { value: 'advanced', label: 'Advanced' }]} icon={Target} />
            </div>
        </div>
        <div className="flex justify-end pt-6"><Button onClick={onNext} className="px-10 py-5 bg-[#a6b1ff] text-black font-black uppercase tracking-widest rounded-2xl">Next Step</Button></div>
    </motion.div>
);

const Step2 = ({ formData, setFormData, handleChange, handleFileUpload, handleLearnChange, addLearnPoint, removeLearnPoint, removeOtherVideo, isUploading, onNext, onPrev }) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-8">
        <h1 className="text-3xl font-black text-white uppercase italic">Visuals & <span className="text-[#a6b1ff]">Content</span></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
                <FileUploadField label="Banner" field="banner" url={formData.banner_url} isUploading={isUploading.banner} onUpload={handleFileUpload} setFormData={setFormData} />
                <FileUploadField label="Main Video" field="video" url={formData.video_url} isUploading={isUploading.video} onUpload={handleFileUpload} isVideo setFormData={setFormData} />
            </div>
            <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-xs font-black text-white/60 uppercase tracking-widest">Learning Objectives</h3>
                    {formData.learn.map((p, i) => (
                        <div key={i} className="flex gap-2">
                            <input value={p} onChange={(e) => handleLearnChange(i, e.target.value)} className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white" />
                            {formData.learn.length > 1 && <button onClick={() => removeLearnPoint(i)} className="text-rose-500"><Trash2 size={16} /></button>}
                        </div>
                    ))}
                    <button onClick={addLearnPoint} className="text-[#a6b1ff] text-[10px] font-black uppercase">+ Add Objective</button>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Final Instruction</label>
                    <textarea name="instruction" value={formData.instruction} onChange={handleChange} rows={2} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white resize-none font-medium focus:border-[#a6b1ff]/50 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Case Studies</label>
                    <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 rounded-2xl">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                                <BookOpen size={18} className="text-indigo-400" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-black text-white uppercase mb-1">Interactive Case Studies</h4>
                                <p className="text-xs text-white/60 leading-relaxed">
                                    Configure scenario-based assessments in <span className="text-indigo-400 font-bold">Step 4: Assessment</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex justify-between pt-6"><button onClick={onPrev} className="text-white/40 font-black uppercase">Back</button><Button onClick={onNext} className="px-10 py-5 bg-[#a6b1ff] text-black font-black uppercase tracking-widest rounded-2xl">Questions</Button></div>
    </motion.div>
);

const Step3Questions = ({ formData, setFormData, quizzes, addQuestion, removeQuestion, updateQuestion, updateOption, addOption, onNext, onPrev }) => {
    const [activeTab, setActiveTab] = useState('link'); // 'link' or 'manual'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedQuiz, setSelectedQuiz] = useState(() => {
        // Try to find if a quiz is already linked via code in questions or explicitly
        const quizCode = formData.questions?.[0]?.toString().startsWith('quiz:')
            ? formData.questions[0].split('quiz: ')[1]?.trim()
            : null;

        if (quizCode && quizzes) {
            return quizzes.find(q => q.quiz_code === quizCode);
        }
        if (formData.quiz_id && quizzes) {
            return quizzes.find(q => q.id === formData.quiz_id);
        }
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

    const addManualOption = (questionIndex) => {
        const updated = [...manualQuestions];
        updated[questionIndex].options.push({ option: '', is_correct: false });
        setManualQuestions(updated);
        setFormData(prev => ({ ...prev, manual_quiz: updated }));
    };

    const removeManualOption = (questionIndex, optionIndex) => {
        const updated = [...manualQuestions];
        if (updated[questionIndex].options.length > 2) {
            updated[questionIndex].options = updated[questionIndex].options.filter((_, i) => i !== optionIndex);
            setManualQuestions(updated);
            setFormData(prev => ({ ...prev, manual_quiz: updated }));
        }
    };

    const updateManualOption = (questionIndex, optionIndex, field, value) => {
        const updated = [...manualQuestions];
        updated[questionIndex].options[optionIndex] = {
            ...updated[questionIndex].options[optionIndex],
            [field]: value
        };
        setManualQuestions(updated);
        setFormData(prev => ({ ...prev, manual_quiz: updated }));
    };

    return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase italic mb-2">
                        Add <span className="text-[#a6b1ff]">Assessment</span>
                    </h1>
                    <p className="text-white/60 font-medium">Link an existing quiz or create manual questions</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 p-2 bg-white/5 rounded-2xl border border-white/10">
                <button
                    onClick={() => setActiveTab('link')}
                    className={`flex-1 py-3 px-6 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                        activeTab === 'link'
                            ? 'bg-[#a6b1ff] text-black shadow-lg'
                            : 'text-white/40 hover:text-white/60'
                    }`}
                >
                    Link Quiz
                </button>
                <button
                    onClick={() => setActiveTab('manual')}
                    className={`flex-1 py-3 px-6 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                        activeTab === 'manual'
                            ? 'bg-[#a6b1ff] text-black shadow-lg'
                            : 'text-white/40 hover:text-white/60'
                    }`}
                >
                    Manual Quiz
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'link' ? (
                <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Search & Select Quiz</label>
                        <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#a6b1ff] transition-colors"><Search size={20} /></div>
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by quiz name or unique code..."
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all"
                            />
                        </div>
                    </div>

                    {selectedQuiz ? (
                        <div className="p-8 rounded-[2rem] border-2 border-[#a6b1ff]/20 bg-[#a6b1ff]/5 flex items-center justify-between gap-6 animate-in zoom-in-95 duration-300 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#a6b1ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="space-y-2 min-w-0 relative">
                                <p className="text-[10px] font-black text-[#a6b1ff] uppercase tracking-[0.3em]">Currently Selected</p>
                                <h4 className="text-2xl font-black text-white truncate italic tracking-tight">{selectedQuiz.title}</h4>
                                <div className="flex items-center gap-2">
                                    <div className="px-2 py-1 rounded bg-white/10 text-[10px] font-mono text-white/60">{selectedQuiz.quiz_code}</div>
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
                        <div className="border border-white/10 rounded-[2rem] overflow-hidden bg-white/5 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {filteredQuizzes.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {filteredQuizzes.map((quiz) => (
                                        <div
                                            key={quiz.id}
                                            onClick={() => handleQuizSelect(quiz)}
                                            className="p-6 flex items-center justify-between hover:bg-white/5 cursor-pointer transition-colors group"
                                        >
                                            <div className="min-w-0 space-y-1">
                                                <p className="font-bold text-lg text-white group-hover:text-[#a6b1ff] transition-colors">{quiz.title}</p>
                                                <p className="text-[10px] text-white/30 uppercase tracking-widest">Code: {quiz.quiz_code}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#a6b1ff] group-hover:text-black transition-all transform group-hover:scale-110">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-24 flex flex-col items-center justify-center text-center px-6">
                                    <div className="w-16 h-16 rounded-full bg-dashed border-2 border-white/10 flex items-center justify-center mb-4">
                                        <Search className="text-white/20" size={24} />
                                    </div>
                                    <p className="text-lg font-bold text-white/40">No quizzes match "{searchTerm}"</p>
                                    <p className="text-xs text-white/20 mt-2 uppercase tracking-widest">Try searching for a different name or code</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Manual Questions</label>
                        <Button
                            onClick={addManualQuestion}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl px-4 py-2 flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Add Question
                        </Button>
                    </div>

                    {manualQuestions.length === 0 ? (
                        <div className="py-24 flex flex-col items-center justify-center text-center px-6 border-2 border-dashed border-white/10 rounded-[2rem]">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <HelpCircle className="text-white/20" size={24} />
                            </div>
                            <p className="text-lg font-bold text-white/40">No manual questions yet</p>
                            <p className="text-xs text-white/20 mt-2 uppercase tracking-widest">Click "Add Question" to create your first question</p>
                        </div>
                    ) : (
                        <div className="space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                            {manualQuestions.map((q, qIndex) => (
                                <div key={qIndex} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Question {qIndex + 1}</label>
                                            <input
                                                value={q.question}
                                                onChange={(e) => updateManualQuestion(qIndex, 'question', e.target.value)}
                                                placeholder="Enter your question..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium"
                                            />
                                        </div>
                                        <Button
                                            onClick={() => removeManualQuestion(qIndex)}
                                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 rounded-xl p-2"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Options</label>
                                            <Button
                                                onClick={() => addManualOption(qIndex)}
                                                className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-lg px-3 py-1 text-xs"
                                            >
                                                <Plus size={14} />
                                            </Button>
                                        </div>
                                        {q.options.map((opt, optIndex) => (
                                            <div key={optIndex} className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={opt.is_correct}
                                                    onChange={(e) => updateManualOption(qIndex, optIndex, 'is_correct', e.target.checked)}
                                                    className="w-5 h-5 rounded border-white/20 text-emerald-500 focus:ring-emerald-500"
                                                />
                                                <input
                                                    value={opt.option}
                                                    onChange={(e) => updateManualOption(qIndex, optIndex, 'option', e.target.value)}
                                                    placeholder={`Option ${optIndex + 1}`}
                                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none"
                                                />
                                                {q.options.length > 2 && (
                                                    <Button
                                                        onClick={() => removeManualOption(qIndex, optIndex)}
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

            <div className="flex justify-between pt-6">
                <button onClick={onPrev} className="text-white/40 font-black uppercase">Back</button>
                <Button onClick={onNext} className="px-10 py-5 bg-[#a6b1ff] text-black font-black uppercase tracking-widest rounded-2xl">Summary</Button>
            </div>
        </motion.div>
    );
};

const Step4Assessment = ({ formData, setFormData, quizzes, onLaunch, isSubmitting, onPrev }) => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl space-y-8">
        <h1 className="text-3xl font-black text-white uppercase italic">Assessment <span className="text-[#a6b1ff]">Configuration</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quiz Linking Section */}
            <div className="space-y-6">
                <h3 className="text-sm font-black text-white/60 uppercase tracking-widest flex items-center gap-2">
                    <HelpCircle size={16} className="text-purple-400" />
                    Graduation Quiz
                </h3>
                <SelectField
                    label="Link Graduation Quiz"
                    name="quiz_id"
                    value={formData.quiz_id || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, quiz_id: e.target.value || null }))}
                    options={quizzes.map(q => ({ value: q.id, label: q.title }))}
                    icon={HelpCircle}
                />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-xs text-white/40 leading-relaxed italic">
                    <Info size={16} className="text-[#a6b1ff] inline mr-2 mb-1" />
                    Linking a quiz enables course certification.
                </div>
            </div>

            {/* Summary Section */}
            <div className="p-8 bg-gradient-to-br from-[#121431] to-transparent rounded-[2rem] border border-white/10 flex flex-col justify-center gap-4">
                <h3 className="text-lg font-black text-white uppercase italic">Update Summary</h3>
                <SummaryItem label="Modules" value={`${formData.other.length + 1} Lessons`} />
                <SummaryItem label="Questions" value={`${formData.questions.length} Items`} />
                <SummaryItem label="Case Studies" value={formData.case_studies?.length > 0 ? `${formData.case_studies.length} Active` : 'None'} />
            </div>
        </div>

        {/* Case Study Builder Section */}
        <div>
            <CaseStudyBuilder
                caseStudies={formData.case_studies}
                onChange={(caseStudies) => setFormData(prev => ({ ...prev, case_studies: caseStudies }))}
            />
        </div>

        <div className="flex justify-between pt-10">
            <button onClick={onPrev} className="text-white/40 font-black uppercase">Back</button>
            <Button onClick={onLaunch} disabled={isSubmitting} className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl overflow-hidden relative group">
                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Changes'}
            </Button>
        </div>
    </motion.div>
);

/* Helper Components */
const InputField = ({ label, icon: Icon, error, ...props }) => (
    <div className="space-y-2">
        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">{label}</label>
        <div className="relative">
            <input {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all" />
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />}
        </div>
    </div>
);

const SelectField = ({ label, options, icon: Icon, error, ...props }) => (
    <div className="space-y-2">
        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">{label}</label>
        <div className="relative">
            <select {...props} className="w-full bg-white/5 border border-white/10 rounded-2xl px-12 py-4 text-white appearance-none focus:border-[#a6b1ff]/50 outline-none font-medium cursor-pointer">
                <option value="" className="bg-[#0a0a0a]">Select Option</option>
                {options.map(opt => <option key={opt.value} value={opt.value} className="bg-[#0a0a0a]">{opt.label}</option>)}
            </select>
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />}
        </div>
    </div>
);

const FileUploadField = ({ label, field, url, isUploading, onUpload, isVideo = false, setFormData }) => {
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
            onUpload({ target: { files: [], url: urlInput.trim() } }, field);
            setUrlInput('');
            setShowUrlInput(false);
        }
    };

    const handleRemoveVideo = (e) => {
        e.stopPropagation();
        if (setFormData) {
            setFormData(prev => ({ ...prev, [`${field}_url`]: '' }));
            setShowUrlInput(false);
            toast.success("Video removed");
        }
    };

    return (
        <div className="space-y-2">
            <label className="text-xs font-black text-gray-600 dark:text-white/40 uppercase tracking-widest pl-1">{label}</label>
            
            {isVideo && !url && (
                <div className="flex gap-2 mb-2">
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(false)}
                        className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                            !showUrlInput 
                                ? 'bg-[#a6b1ff] text-black' 
                                : 'bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-white/40'
                        }`}
                    >
                        Upload File
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowUrlInput(true)}
                        className={`flex-1 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                            showUrlInput 
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
                    className={`relative h-32 rounded-3xl bg-gray-100 dark:bg-white/5 border-2 border-dashed ${isDragging ? 'border-[#a6b1ff] bg-[#a6b1ff]/10' : 'border-gray-300 dark:border-white/10'} hover:border-[#a6b1ff]/30 transition-all overflow-hidden group cursor-pointer`}
                >
                    {url ? (
                        <div className="w-full h-full relative">
                            {isVideo ? (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 dark:bg-black/40 gap-2">
                                    <Video className="text-emerald-500" size={24} />
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
                                <img src={url} className="w-full h-full object-cover" />
                            )}
                            {!isVideo && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-black text-white uppercase underline">
                                    <span className="cursor-pointer">Change</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400 dark:text-white/20 group-hover:text-gray-600 dark:group-hover:text-white/40 transition-colors">
                            {isUploading ? <Loader2 size={24} className="animate-spin text-[#a6b1ff]" /> : <UploadCloud size={24} />}
                            <span className="text-[10px] font-black uppercase tracking-widest">{isUploading ? 'Uploading...' : (isDragging ? 'Drop File Here' : `Upload ${field}`)}</span>
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
        </div>
    );
};

const SummaryItem = ({ label, value }) => (
    <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{label}</span>
        <span className="text-sm font-black text-white uppercase italic">{value}</span>
    </div>
);

const Info = ({ ...props }) => <HelpCircle {...props} />;
