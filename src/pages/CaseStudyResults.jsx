import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    Trophy,
    ChevronLeft,
    ChevronRight,
    Loader2,
    Calendar,
    Target
} from 'lucide-react';
import { useGetCourseProgressQuery } from '@/redux/api/studentApi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';

export default function CaseStudyResults() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: progressData, isLoading, error } = useGetCourseProgressQuery(courseId);

    const results = progressData?.data?.data || progressData?.data || [];
    const pagination = progressData?.data?.meta || progressData?.meta || {};
    
    const totalPages = pagination.last_page || 1;
    const currentPageData = pagination.current_page || currentPage;

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-[#a6b1ff] animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout>
                <div className="min-h-screen p-10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Failed to load results</h2>
                    <Button onClick={() => navigate(`/dashboard/courses/view/${courseId}`)} className="bg-[#a6b1ff] text-black">
                        Back to Course
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="px-6 lg:px-10 mt-6 space-y-8">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <button
                                onClick={() => navigate(`/dashboard/courses/view/${courseId}`)}
                                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group mb-4"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-black text-sm uppercase tracking-wider">Back to Course</span>
                            </button>
                            <h1 className="text-4xl lg:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Case Study <span className="text-[#a6b1ff]">Results</span>
                            </h1>
                            <p className="text-white/60 font-medium">
                                View all your submitted case study answers and scores
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-white/5 dark:to-white/5 backdrop-blur-xl border-2 border-amber-300 dark:border-white/10 rounded-[2rem] p-6 pr-10 shadow-lg">
                            <div className="w-16 h-16 rounded-2xl bg-amber-400 dark:bg-[#a6b1ff] flex items-center justify-center text-white dark:text-black shadow-xl shrink-0">
                                <Trophy size={32} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-amber-700 dark:text-white/20 uppercase tracking-[0.2em]">Total Submissions</p>
                                <p className="text-3xl font-black text-amber-900 dark:text-white leading-none italic">{pagination.total || results.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Results List */}
                    {results.length === 0 ? (
                        <Card className="bg-white/5 border-white/10 rounded-[2.5rem] p-12">
                            <div className="text-center space-y-4">
                                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto">
                                    <FileText size={40} className="text-white/20" />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase italic">No Submissions Yet</h3>
                                <p className="text-white/40 font-medium">You haven't submitted any case study answers for this course.</p>
                                <Button 
                                    onClick={() => navigate(`/courses/${courseId}`)}
                                    className="bg-[#a6b1ff] text-black hover:bg-white mt-4"
                                >
                                    Start Learning
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {results.map((result, index) => (
                                <motion.div
                                    key={result.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="bg-white/5 border-white/10 rounded-[2.5rem] overflow-hidden hover:border-[#a6b1ff]/30 transition-all">
                                        <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <Badge className="bg-[#a6b1ff]/10 text-[#a6b1ff] border-[#a6b1ff]/20 font-black italic">
                                                            {result.case_study_id}
                                                        </Badge>
                                                        <span className="text-[10px] text-white/30 font-black uppercase tracking-widest flex items-center gap-2">
                                                            <Calendar size={12} />
                                                            {format(new Date(result.created_at), 'MMM dd, yyyy • HH:mm')}
                                                        </span>
                                                    </div>
                                                    <CardTitle className="text-xl font-black text-white uppercase italic tracking-tight">
                                                        {result.case_study_title}
                                                    </CardTitle>
                                                    {result.student && (
                                                        <div className="flex items-center gap-3 pt-2">
                                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-black text-white italic text-sm">
                                                                {result.student.first_name?.[0]}{result.student.last_name?.[0]}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-white/80">
                                                                    {result.student.first_name} {result.student.last_name}
                                                                </p>
                                                                <p className="text-[10px] text-white/40 font-medium">
                                                                    {result.student.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Score</p>
                                                        <p className="text-3xl font-black text-[#a6b1ff] italic">{result.score}%</p>
                                                    </div>
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                                        result.score >= 70 ? 'bg-emerald-500/10 text-emerald-400' :
                                                        result.score >= 50 ? 'bg-amber-500/10 text-amber-400' :
                                                        'bg-rose-500/10 text-rose-400'
                                                    }`}>
                                                        {result.score >= 50 ? <CheckCircle size={24} /> : <XCircle size={24} />}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6 lg:p-8">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-white/40 text-xs font-black uppercase tracking-widest">
                                                    <Target size={14} />
                                                    Your Answers
                                                </div>
                                                <div className="grid gap-4">
                                                    {(result.answers || []).map((answer, idx) => (
                                                        <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-3">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1 space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black text-white/60">
                                                                            {idx + 1}
                                                                        </span>
                                                                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">
                                                                            Segment {answer.segment_id}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-sm font-bold text-white/80 leading-relaxed">
                                                                        {answer.question_text || 'Question text not available'}
                                                                    </p>
                                                                </div>
                                                                <Badge className={`shrink-0 ${
                                                                    answer.is_correct 
                                                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                                                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                                } font-black text-[9px] uppercase tracking-widest`}>
                                                                    {answer.is_correct ? 'Correct' : 'Incorrect'}
                                                                </Badge>
                                                            </div>
                                                            
                                                            <div className="pl-8 space-y-2">
                                                                <div className="space-y-1">
                                                                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Your Answer:</p>
                                                                    <p className={`text-xs font-bold ${
                                                                        answer.is_correct ? 'text-emerald-400' : 'text-rose-400'
                                                                    }`}>
                                                                        {answer.student_answer || 'No answer provided'}
                                                                    </p>
                                                                </div>
                                                                {!answer.is_correct && answer.correct_answer && (
                                                                    <div className="space-y-1">
                                                                        <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">Correct Answer:</p>
                                                                        <p className="text-xs font-bold text-emerald-400">
                                                                            {answer.correct_answer}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-4 pt-8">
                                    <Button
                                        variant="outline"
                                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPageData === 1}
                                    >
                                        <ChevronLeft size={18} />
                                        Previous
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${
                                                    page === currentPageData
                                                        ? 'bg-[#a6b1ff] text-black'
                                                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPageData === totalPages}
                                    >
                                        Next
                                        <ChevronRight size={18} />
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
