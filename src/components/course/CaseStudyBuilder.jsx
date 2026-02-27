import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    Eye,
    EyeOff,
    CheckCircle2,
    XCircle,
    AlertCircle,
    BookOpen,
    Lightbulb,
    Target,
    ArrowRight,
    ListChecks,
    Circle,
    CheckSquare,
    Type
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const QUESTION_TYPES = {
    SINGLE_CHOICE: 'single_choice',
    MULTIPLE_CHOICE: 'multiple_choice',
    SHORT_ANSWER: 'short_answer'
};

const CaseStudyBuilder = ({ caseStudies, onChange }) => {
    const [previewIndex, setPreviewIndex] = useState(null);
    const [expandedCaseStudy, setExpandedCaseStudy] = useState(0);

    // Initialize case studies structure if not present
    const initializeCaseStudies = () => {
        if (!caseStudies || caseStudies.length === 0) {
            return [
                {
                    id: `case-${Date.now()}`,
                    title: '',
                    segments: [
                        {
                            id: `segment-${Date.now()}`,
                            scenario: '',
                            question: '',
                            questionType: QUESTION_TYPES.SINGLE_CHOICE,
                            options: [
                                { id: 'opt-a', label: 'A', text: '', isCorrect: false, feedback: '' },
                                { id: 'opt-b', label: 'B', text: '', isCorrect: false, feedback: '' },
                                { id: 'opt-c', label: 'C', text: '', isCorrect: false, feedback: '' }
                            ],
                            correctAnswer: '', // For short answer
                            correctFeedback: '',
                            incorrectFeedback: ''
                        }
                    ],
                    outcomes: {
                        success: '',
                        failure: ''
                    },
                    learningTakeaway: ''
                }
            ];
        }
        return caseStudies;
    };

    const currentCaseStudies = initializeCaseStudies();

    const updateCaseStudies = (newCaseStudies) => {
        onChange(newCaseStudies);
    };

    const addCaseStudy = () => {
        const newCaseStudy = {
            id: `case-${Date.now()}`,
            title: '',
            segments: [
                {
                    id: `segment-${Date.now()}`,
                    scenario: '',
                    question: '',
                    questionType: QUESTION_TYPES.SINGLE_CHOICE,
                    options: [
                        { id: `opt-a-${Date.now()}`, label: 'A', text: '', isCorrect: false, feedback: '' },
                        { id: `opt-b-${Date.now()}`, label: 'B', text: '', isCorrect: false, feedback: '' },
                        { id: `opt-c-${Date.now()}`, label: 'C', text: '', isCorrect: false, feedback: '' }
                    ],
                    correctAnswer: '',
                    correctFeedback: '',
                    incorrectFeedback: ''
                }
            ],
            outcomes: {
                success: '',
                failure: ''
            },
            learningTakeaway: ''
        };
        updateCaseStudies([...currentCaseStudies, newCaseStudy]);
        setExpandedCaseStudy(currentCaseStudies.length);
    };

    const removeCaseStudy = (index) => {
        const newCaseStudies = currentCaseStudies.filter((_, i) => i !== index);
        updateCaseStudies(newCaseStudies);
        if (expandedCaseStudy >= newCaseStudies.length) {
            setExpandedCaseStudy(Math.max(0, newCaseStudies.length - 1));
        }
    };

    const updateCaseStudy = (index, updates) => {
        const newCaseStudies = [...currentCaseStudies];
        newCaseStudies[index] = { ...newCaseStudies[index], ...updates };
        updateCaseStudies(newCaseStudies);
    };

    if (previewIndex !== null) {
        return (
            <CaseStudyPreview
                caseStudy={currentCaseStudies[previewIndex]}
                onClose={() => setPreviewIndex(null)}
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="p-6 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
                        <BookOpen size={24} className="text-[#a6b1ff]" />
                        Case Study Builder
                    </h3>
                    <p className="text-xs text-white/40 font-medium">
                        {currentCaseStudies.length} case stud{currentCaseStudies.length !== 1 ? 'ies' : 'y'}
                    </p>
                </div>
                <Button
                    onClick={addCaseStudy}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider"
                >
                    <Plus size={18} className="mr-2" />
                    Add Case Study
                </Button>
            </div>

            {/* Case Studies */}
            <div className="space-y-4">
                {currentCaseStudies.map((caseStudy, caseIndex) => (
                    <CaseStudyEditor
                        key={caseStudy.id}
                        caseStudy={caseStudy}
                        caseIndex={caseIndex}
                        isExpanded={expandedCaseStudy === caseIndex}
                        onToggle={() => setExpandedCaseStudy(expandedCaseStudy === caseIndex ? -1 : caseIndex)}
                        onUpdate={(updates) => updateCaseStudy(caseIndex, updates)}
                        onRemove={() => removeCaseStudy(caseIndex)}
                        onPreview={() => setPreviewIndex(caseIndex)}
                    />
                ))}
            </div>
        </div>
    );
};

const CaseStudyEditor = ({ caseStudy, caseIndex, isExpanded, onToggle, onUpdate, onRemove, onPreview }) => {
    const [expandedSegment, setExpandedSegment] = useState(0);

    const addSegment = () => {
        const newSegment = {
            id: `segment-${Date.now()}`,
            scenario: '',
            question: '',
            questionType: QUESTION_TYPES.SINGLE_CHOICE,
            options: [
                { id: `opt-a-${Date.now()}`, label: 'A', text: '', isCorrect: false, feedback: '' },
                { id: `opt-b-${Date.now()}`, label: 'B', text: '', isCorrect: false, feedback: '' },
                { id: `opt-c-${Date.now()}`, label: 'C', text: '', isCorrect: false, feedback: '' }
            ],
            correctAnswer: '',
            correctFeedback: '',
            incorrectFeedback: ''
        };
        onUpdate({ segments: [...caseStudy.segments, newSegment] });
        setExpandedSegment(caseStudy.segments.length);
    };

    const removeSegment = (segmentIndex) => {
        if (caseStudy.segments.length === 1) {
            toast.error("Case study must have at least one segment");
            return;
        }
        const newSegments = caseStudy.segments.filter((_, i) => i !== segmentIndex);
        onUpdate({ segments: newSegments });
        if (expandedSegment >= newSegments.length) {
            setExpandedSegment(newSegments.length - 1);
        }
    };

    const updateSegment = (segmentIndex, updates) => {
        const newSegments = [...caseStudy.segments];
        newSegments[segmentIndex] = { ...newSegments[segmentIndex], ...updates };
        onUpdate({ segments: newSegments });
    };

    return (
        <div className="border border-white/10 rounded-[2rem] overflow-hidden bg-white/5">
            {/* Case Study Header */}
            <div
                onClick={onToggle}
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <BookOpen size={20} className="text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-lg font-black text-white uppercase tracking-wide">
                            {caseStudy.title || `Case Study ${caseIndex + 1}`}
                        </p>
                        <p className="text-xs text-white/40 mt-1">
                            {caseStudy.segments.length} segment{caseStudy.segments.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={(e) => { e.stopPropagation(); onPreview(); }}
                        className="p-2 text-white/40 hover:text-white transition-colors"
                        title="Preview"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                        className="p-2 text-rose-500/50 hover:text-rose-500 transition-colors"
                        title="Remove case study"
                    >
                        <Trash2 size={18} />
                    </button>
                    <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowRight size={20} className="text-white/40" />
                    </motion.div>
                </div>
            </div>

            {/* Case Study Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10"
                    >
                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">
                                    Case Study Title
                                </label>
                                <input
                                    type="text"
                                    value={caseStudy.title}
                                    onChange={(e) => onUpdate({ title: e.target.value })}
                                    placeholder="e.g., Introduction to Simple Machines"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all"
                                />
                            </div>

                            {/* Segments */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-black text-white/60 uppercase tracking-widest flex items-center gap-2">
                                        <Target size={16} className="text-amber-400" />
                                        Scenario Segments
                                    </h4>
                                    <Button
                                        onClick={addSegment}
                                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold text-xs uppercase tracking-wider"
                                    >
                                        <Plus size={16} className="mr-2" />
                                        Add Segment
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    {caseStudy.segments.map((segment, segmentIndex) => (
                                        <SegmentEditor
                                            key={segment.id}
                                            segment={segment}
                                            segmentIndex={segmentIndex}
                                            isExpanded={expandedSegment === segmentIndex}
                                            onToggle={() => setExpandedSegment(expandedSegment === segmentIndex ? -1 : segmentIndex)}
                                            onUpdate={(updates) => updateSegment(segmentIndex, updates)}
                                            onRemove={() => removeSegment(segmentIndex)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Outcomes */}
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-6">
                                <h4 className="text-sm font-black text-white/60 uppercase tracking-widest flex items-center gap-2">
                                    <AlertCircle size={16} className="text-purple-400" />
                                    Final Outcomes
                                </h4>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-emerald-400/80 uppercase tracking-widest pl-1 flex items-center gap-2">
                                            <CheckCircle2 size={14} />
                                            Success Outcome
                                        </label>
                                        <textarea
                                            value={caseStudy.outcomes.success}
                                            onChange={(e) => onUpdate({ outcomes: { ...caseStudy.outcomes, success: e.target.value } })}
                                            rows={3}
                                            placeholder="Positive outcome when student makes correct choices..."
                                            className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-emerald-500/50 outline-none font-medium transition-all resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-rose-400/80 uppercase tracking-widest pl-1 flex items-center gap-2">
                                            <XCircle size={14} />
                                            Failure Outcome
                                        </label>
                                        <textarea
                                            value={caseStudy.outcomes.failure}
                                            onChange={(e) => onUpdate({ outcomes: { ...caseStudy.outcomes, failure: e.target.value } })}
                                            rows={3}
                                            placeholder="Outcome when student makes incorrect choices..."
                                            className="w-full bg-rose-500/5 border border-rose-500/20 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-rose-500/50 outline-none font-medium transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Learning Takeaway */}
                            <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 space-y-3">
                                <label className="text-xs font-black text-amber-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                    <Lightbulb size={16} />
                                    Key Learning Takeaway
                                </label>
                                <textarea
                                    value={caseStudy.learningTakeaway}
                                    onChange={(e) => onUpdate({ learningTakeaway: e.target.value })}
                                    rows={2}
                                    placeholder="Key concept students should remember..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-amber-500/50 outline-none font-medium transition-all resize-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SegmentEditor = ({ segment, segmentIndex, isExpanded, onToggle, onUpdate, onRemove }) => {
    const addOption = () => {
        if (segment.options.length >= 6) {
            toast.error("Maximum 6 options allowed");
            return;
        }
        const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
        const newOption = {
            id: `opt-${Date.now()}`,
            label: labels[segment.options.length],
            text: '',
            isCorrect: false,
            feedback: ''
        };
        onUpdate({ options: [...segment.options, newOption] });
    };

    const removeOption = (optionIndex) => {
        if (segment.options.length <= 2) {
            toast.error("Minimum 2 options required");
            return;
        }
        const newOptions = segment.options.filter((_, i) => i !== optionIndex);
        const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
        newOptions.forEach((opt, i) => opt.label = labels[i]);
        onUpdate({ options: newOptions });
    };

    const updateOption = (optionIndex, updates) => {
        const newOptions = [...segment.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], ...updates };

        // For single choice, unmark others when marking one as correct
        if (segment.questionType === QUESTION_TYPES.SINGLE_CHOICE && updates.isCorrect === true) {
            newOptions.forEach((opt, i) => {
                if (i !== optionIndex) opt.isCorrect = false;
            });
        }

        onUpdate({ options: newOptions });
    };

    const getQuestionTypeIcon = () => {
        switch (segment.questionType) {
            case QUESTION_TYPES.SINGLE_CHOICE:
                return <Circle size={16} className="text-blue-400" />;
            case QUESTION_TYPES.MULTIPLE_CHOICE:
                return <CheckSquare size={16} className="text-purple-400" />;
            case QUESTION_TYPES.SHORT_ANSWER:
                return <Type size={16} className="text-green-400" />;
            default:
                return <Circle size={16} />;
        }
    };

    const hasCorrectAnswer = segment.questionType === QUESTION_TYPES.SHORT_ANSWER
        ? segment.correctAnswer?.trim()
        : segment.options.some(opt => opt.isCorrect);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
            {/* Segment Header */}
            <div
                onClick={onToggle}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#a6b1ff]/10 flex items-center justify-center">
                        <span className="text-[#a6b1ff] font-black text-sm">{segmentIndex + 1}</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-white">
                            {segment.scenario ? `Segment ${segmentIndex + 1}` : `Segment ${segmentIndex + 1} (Empty)`}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            {getQuestionTypeIcon()}
                            <p className="text-xs text-white/40">
                                {hasCorrectAnswer ? '✓ Answer set' : '⚠ No answer'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(); }}
                        className="p-2 text-rose-500/50 hover:text-rose-500 transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                    <motion.div
                        animate={{ rotate: isExpanded ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ArrowRight size={18} className="text-white/40" />
                    </motion.div>
                </div>
            </div>

            {/* Segment Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10"
                    >
                        <div className="p-4 space-y-4">
                            {/* Scenario */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">
                                    Scenario
                                </label>
                                <textarea
                                    value={segment.scenario}
                                    onChange={(e) => onUpdate({ scenario: e.target.value })}
                                    rows={3}
                                    placeholder="Describe the situation..."
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all resize-none"
                                />
                            </div>

                            {/* Question */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">
                                    Question
                                </label>
                                <input
                                    type="text"
                                    value={segment.question}
                                    onChange={(e) => onUpdate({ question: e.target.value })}
                                    placeholder="What should the student decide?"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all"
                                />
                            </div>

                            {/* Question Type Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">
                                    Question Type
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => onUpdate({ questionType: QUESTION_TYPES.SINGLE_CHOICE })}
                                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${segment.questionType === QUESTION_TYPES.SINGLE_CHOICE
                                                ? 'border-blue-500 bg-blue-500/10'
                                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <Circle size={18} className={segment.questionType === QUESTION_TYPES.SINGLE_CHOICE ? 'text-blue-400' : 'text-white/40'} />
                                        <span className="text-[10px] font-bold text-white/60 uppercase">Single</span>
                                    </button>
                                    <button
                                        onClick={() => onUpdate({ questionType: QUESTION_TYPES.MULTIPLE_CHOICE })}
                                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${segment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE
                                                ? 'border-purple-500 bg-purple-500/10'
                                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <CheckSquare size={18} className={segment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE ? 'text-purple-400' : 'text-white/40'} />
                                        <span className="text-[10px] font-bold text-white/60 uppercase">Multiple</span>
                                    </button>
                                    <button
                                        onClick={() => onUpdate({ questionType: QUESTION_TYPES.SHORT_ANSWER })}
                                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${segment.questionType === QUESTION_TYPES.SHORT_ANSWER
                                                ? 'border-green-500 bg-green-500/10'
                                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <Type size={18} className={segment.questionType === QUESTION_TYPES.SHORT_ANSWER ? 'text-green-400' : 'text-white/40'} />
                                        <span className="text-[10px] font-bold text-white/60 uppercase">Text</span>
                                    </button>
                                </div>
                            </div>

                            {/* Options or Short Answer */}
                            {segment.questionType === QUESTION_TYPES.SHORT_ANSWER ? (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">
                                            Correct Answer
                                        </label>
                                        <input
                                            type="text"
                                            value={segment.correctAnswer || ''}
                                            onChange={(e) => onUpdate({ correctAnswer: e.target.value })}
                                            placeholder="Expected answer..."
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-emerald-400/60 uppercase tracking-widest pl-1">
                                            Correct Feedback
                                        </label>
                                        <textarea
                                            value={segment.correctFeedback || ''}
                                            onChange={(e) => onUpdate({ correctFeedback: e.target.value })}
                                            rows={2}
                                            placeholder="✅ Feedback for correct answer..."
                                            className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-lg px-4 py-2 text-xs text-white placeholder:text-white/20 focus:border-emerald-500/50 outline-none font-medium transition-all resize-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-rose-400/60 uppercase tracking-widest pl-1">
                                            Incorrect Feedback
                                        </label>
                                        <textarea
                                            value={segment.incorrectFeedback || ''}
                                            onChange={(e) => onUpdate({ incorrectFeedback: e.target.value })}
                                            rows={2}
                                            placeholder="❌ Feedback for incorrect answer..."
                                            className="w-full bg-rose-500/5 border border-rose-500/20 rounded-lg px-4 py-2 text-xs text-white placeholder:text-white/20 focus:border-rose-500/50 outline-none font-medium transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">
                                            Options
                                        </label>
                                        <button
                                            onClick={addOption}
                                            className="text-xs font-black text-[#a6b1ff] hover:text-[#a6b1ff]/80 uppercase tracking-wider flex items-center gap-1"
                                        >
                                            <Plus size={14} />
                                            Add
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        {segment.options.map((option, optIndex) => (
                                            <OptionEditor
                                                key={option.id}
                                                option={option}
                                                questionType={segment.questionType}
                                                onUpdate={(updates) => updateOption(optIndex, updates)}
                                                onRemove={() => removeOption(optIndex)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const OptionEditor = ({ option, questionType, onUpdate, onRemove }) => {
    return (
        <div className={`p-3 rounded-lg border-2 transition-all ${option.isCorrect
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : 'border-white/10 bg-white/5'
            }`}>
            <div className="flex items-start gap-2">
                <div className={`w-6 h-6 rounded flex items-center justify-center font-black text-xs shrink-0 ${option.isCorrect
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-white/60'
                    }`}>
                    {option.label}
                </div>

                <div className="flex-1 space-y-2">
                    <input
                        type="text"
                        value={option.text}
                        onChange={(e) => onUpdate({ text: e.target.value })}
                        placeholder={`Option ${option.label}...`}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all"
                    />
                    <textarea
                        value={option.feedback}
                        onChange={(e) => onUpdate({ feedback: e.target.value })}
                        rows={2}
                        placeholder={option.isCorrect ? "✅ Correct feedback..." : "❌ Incorrect feedback..."}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all resize-none"
                    />
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                    <button
                        onClick={() => onUpdate({ isCorrect: !option.isCorrect })}
                        className={`p-1.5 rounded transition-all ${option.isCorrect
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white/5 text-white/40 hover:bg-white/10'
                            }`}
                        title={questionType === QUESTION_TYPES.MULTIPLE_CHOICE ? "Toggle correct" : "Mark as correct"}
                    >
                        {questionType === QUESTION_TYPES.MULTIPLE_CHOICE ? (
                            <CheckSquare size={14} />
                        ) : (
                            <Circle size={14} />
                        )}
                    </button>
                    <button
                        onClick={onRemove}
                        className="p-1.5 rounded bg-white/5 text-rose-500/50 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

const CaseStudyPreview = ({ caseStudy, onClose }) => {
    const [currentSegment, setCurrentSegment] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showFeedback, setShowFeedback] = useState({});
    const [completed, setCompleted] = useState(false);

    const segment = caseStudy.segments[currentSegment];

    const handleAnswer = (answer) => {
        setAnswers({ ...answers, [currentSegment]: answer });
        setShowFeedback({ ...showFeedback, [currentSegment]: true });
    };

    const handleNext = () => {
        if (currentSegment < caseStudy.segments.length - 1) {
            setCurrentSegment(currentSegment + 1);
        } else {
            setCompleted(true);
        }
    };

    if (completed) {
        // Calculate score
        let correct = 0;
        caseStudy.segments.forEach((seg, index) => {
            const answer = answers[index];
            if (seg.questionType === QUESTION_TYPES.SHORT_ANSWER) {
                if (answer?.toLowerCase().trim() === seg.correctAnswer?.toLowerCase().trim()) correct++;
            } else if (seg.questionType === QUESTION_TYPES.SINGLE_CHOICE) {
                if (typeof answer === 'number' && seg.options[answer]?.isCorrect) correct++;
            } else if (seg.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
                const correctIndices = seg.options.map((opt, i) => opt.isCorrect ? i : -1).filter(i => i !== -1);
                if (Array.isArray(answer) && answer.length === correctIndices.length && answer.every(i => correctIndices.includes(i))) {
                    correct++;
                }
            }
        });

        const isSuccess = correct === caseStudy.segments.length;

        return (
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-white uppercase italic">Preview Complete</h3>
                    <Button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white">
                        <EyeOff size={18} className="mr-2" />
                        Close
                    </Button>
                </div>

                <div className="text-center space-y-6 py-8">
                    <div className={`w-20 h-20 rounded-2xl mx-auto flex items-center justify-center ${isSuccess ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}>
                        {isSuccess ? <CheckCircle2 size={40} className="text-white" /> : <XCircle size={40} className="text-white" />}
                    </div>

                    <div>
                        <h4 className="text-xl font-black text-white uppercase mb-2">Case Study Complete</h4>
                        <p className="text-white/60">Score: {correct}/{caseStudy.segments.length}</p>
                    </div>

                    <div className={`p-6 rounded-xl ${isSuccess ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'
                        }`}>
                        <p className="text-sm text-white/80 font-medium">
                            {isSuccess ? caseStudy.outcomes.success : caseStudy.outcomes.failure}
                        </p>
                    </div>

                    {caseStudy.learningTakeaway && (
                        <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb size={18} className="text-amber-400" />
                                <h5 className="text-xs font-black text-amber-400 uppercase tracking-widest">Key Takeaway</h5>
                            </div>
                            <p className="text-sm text-white/80 font-medium">{caseStudy.learningTakeaway}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const currentAnswer = answers[currentSegment];
    const showingFeedback = showFeedback[currentSegment];

    return (
        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-black text-white uppercase italic">Preview Mode</h3>
                    <p className="text-xs text-white/40 mt-1">Segment {currentSegment + 1} of {caseStudy.segments.length}</p>
                </div>
                <Button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white">
                    <EyeOff size={18} className="mr-2" />
                    Close
                </Button>
            </div>

            <div className="space-y-6">
                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-xs font-black text-[#a6b1ff] uppercase tracking-widest mb-3">Scenario</h4>
                    <p className="text-white/80 font-medium leading-relaxed">{segment.scenario}</p>
                </div>

                <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white font-bold">{segment.question}</p>
                </div>

                {segment.questionType === QUESTION_TYPES.SHORT_ANSWER ? (
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={currentAnswer || ''}
                            onChange={(e) => !showingFeedback && setAnswers({ ...answers, [currentSegment]: e.target.value })}
                            disabled={showingFeedback}
                            placeholder="Type your answer..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:border-[#a6b1ff]/50 outline-none font-medium transition-all disabled:opacity-50"
                        />
                        {!showingFeedback && (
                            <Button
                                onClick={() => handleAnswer(currentAnswer)}
                                disabled={!currentAnswer?.trim()}
                                className="w-full bg-[#a6b1ff] hover:bg-[#a6b1ff]/90 text-[#0a0a0a] font-black uppercase"
                            >
                                Submit Answer
                            </Button>
                        )}
                        {showingFeedback && (
                            <div className={`p-4 rounded-xl ${currentAnswer?.toLowerCase().trim() === segment.correctAnswer?.toLowerCase().trim()
                                    ? 'bg-emerald-500/10 border border-emerald-500/20'
                                    : 'bg-rose-500/10 border border-rose-500/20'
                                }`}>
                                <p className="text-sm text-white/80 font-medium">
                                    {currentAnswer?.toLowerCase().trim() === segment.correctAnswer?.toLowerCase().trim()
                                        ? segment.correctFeedback
                                        : segment.incorrectFeedback}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {segment.options.map((option, optIndex) => {
                            const isSelected = segment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE
                                ? Array.isArray(currentAnswer) && currentAnswer.includes(optIndex)
                                : currentAnswer === optIndex;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => {
                                        if (showingFeedback) return;
                                        if (segment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
                                            const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                                            const newAnswer = current.includes(optIndex)
                                                ? current.filter(i => i !== optIndex)
                                                : [...current, optIndex];
                                            setAnswers({ ...answers, [currentSegment]: newAnswer });
                                        } else {
                                            handleAnswer(optIndex);
                                        }
                                    }}
                                    disabled={showingFeedback}
                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${isSelected && showingFeedback
                                            ? option.isCorrect
                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                : 'border-rose-500 bg-rose-500/10'
                                            : isSelected
                                                ? 'border-[#a6b1ff] bg-[#a6b1ff]/10'
                                                : 'border-white/10 bg-white/5 hover:bg-white/10'
                                        } ${showingFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 ${isSelected && showingFeedback
                                                ? option.isCorrect
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-rose-500 text-white'
                                                : isSelected
                                                    ? 'bg-[#a6b1ff] text-white'
                                                    : 'bg-white/10 text-white/60'
                                            }`}>
                                            {option.label}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white font-medium">{option.text}</p>
                                            {showingFeedback && isSelected && option.feedback && (
                                                <p className={`text-sm mt-2 ${option.isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                    {option.feedback}
                                                </p>
                                            )}
                                        </div>
                                        {showingFeedback && isSelected && (
                                            option.isCorrect ? <CheckCircle2 size={20} className="text-emerald-500 shrink-0" /> : <XCircle size={20} className="text-rose-500 shrink-0" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                        {segment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE && !showingFeedback && (
                            <Button
                                onClick={() => handleAnswer(currentAnswer || [])}
                                disabled={!Array.isArray(currentAnswer) || currentAnswer.length === 0}
                                className="w-full bg-[#a6b1ff] hover:bg-[#a6b1ff]/90 text-[#0a0a0a] font-black uppercase"
                            >
                                Submit Answer
                            </Button>
                        )}
                    </div>
                )}

                {showingFeedback && (
                    <Button
                        onClick={handleNext}
                        className="w-full bg-[#a6b1ff] hover:bg-[#a6b1ff]/90 text-[#0a0a0a] font-black uppercase tracking-wider"
                    >
                        {currentSegment < caseStudy.segments.length - 1 ? 'Continue to Next Segment' : 'View Results'}
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CaseStudyBuilder;
