import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    UploadCloud,
    X,
    FileText,
    CheckCircle2,
    AlertCircle,
    Download,
    FileSpreadsheet,
    ArrowRight,
    Loader2,
    Trash2,
    Sparkles
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTemporaryStorage, selectTempStorage } from '@/redux/slices/authSlice';
import { processFileWithAI } from '@/utils/fileParser';
import { toast } from 'sonner';

export default function BulkUploadDrawer({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, processing, ready, error
    const [errorMessage, setErrorMessage] = useState('');
    const [extractedQuestions, setExtractedQuestions] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            processFile(files[0]);
        }
    };

    const processFile = async (file) => {
        const validExtensions = ['xlsx', 'xls', 'pdf', 'doc', 'docx', 'txt'];
        const extension = file.name.split('.').pop().toLowerCase();
        
        if (!validExtensions.includes(extension)) {
            toast.error(`Unsupported file type. Please upload: Excel, PDF, Word, or Text files`);
            return;
        }

        const maxSize = 15 * 1024 * 1024; // 15MB
        if (file.size > maxSize) {
            toast.error("File size exceeds 15MB limit");
            return;
        }

        setSelectedFile(file);
        setUploadStatus('processing');
        setErrorMessage('');
        setExtractedQuestions([]);
        setIsProcessing(true);

        try {
            toast.info('🤖 AI is analyzing your file...');
            
            const result = await processFileWithAI(file);
            
            if (result.success && result.questions.length > 0) {
                setExtractedQuestions(result.questions);
                setUploadStatus('ready');
                toast.success(result.message);
            } else {
                setUploadStatus('error');
                setErrorMessage(result.message || 'No questions found in the file');
                toast.error(result.message);
            }
        } catch (error) {
            console.error("File processing error:", error);
            setUploadStatus('error');
            setErrorMessage(error.message || 'Failed to process file');
            toast.error('Failed to process file');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleExtract = async () => {
        if (!selectedFile || uploadStatus !== 'ready' || extractedQuestions.length === 0) return;

        try {
            dispatch(setTemporaryStorage({
                ...tempStorage,
                questions: extractedQuestions
            }));
            toast.success(`${extractedQuestions.length} questions loaded successfully!`);
            navigate('/dashboard/teacher/ai-review');
            onClose();
        } catch (error) {
            console.error("Navigation error:", error);
            toast.error("An error occurred");
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setUploadStatus('idle');
        setErrorMessage('');
        setExtractedQuestions([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-xl h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <UploadCloud className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">
                                <span className="text-emerald-400">AI-Powered</span> Bulk Upload
                            </h2>
                            <p className="text-white/40 text-xs font-medium tracking-wider uppercase">
                                PDF • Excel • Word • Text
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-white/50 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="space-y-8">
                        {/* AI Feature Banner */}
                        <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 border border-white/10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                    <Sparkles className="text-white" size={24} />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                                        AI-Powered Smart Parsing
                                    </h4>
                                    <p className="text-xs text-white/60 font-medium leading-relaxed">
                                        Upload questions in any format - Our AI will intelligently parse and structure them automatically
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sample Download */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <FileSpreadsheet className="text-blue-400" size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-white">Need a template?</h4>
                                    <p className="text-xs text-white/40 font-medium">Download our sample XLSX format (optional)</p>
                                </div>
                            </div>
                            <a
                                href="/questions.xlsx"
                                download
                                className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all"
                            >
                                <Download size={14} />
                                Sample
                            </a>
                        </div>

                        {/* Upload Area */}
                        {!selectedFile ? (
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current.click()}
                                className={`relative h-[300px] rounded-[2.5rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-6 cursor-pointer group overflow-hidden ${isDragging
                                    ? 'bg-emerald-500/10 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[0.98]'
                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <motion.div
                                    animate={isDragging ? { y: [0, -10, 0] } : {}}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center relative z-10"
                                >
                                    <UploadCloud size={40} className={isDragging ? 'text-emerald-400' : 'text-white/20 group-hover:text-white/40'} />
                                </ motion.div>

                                <div className="text-center relative z-10">
                                    <p className="text-lg font-black text-white italic uppercase tracking-tight mb-2">
                                        Drop your <span className="text-emerald-400">Spreadsheet</span> here
                                    </p>
                                    <p className="text-sm text-white/40 font-medium">or click to browse from your device</p>
                                </div>

                                <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] relative z-10">
                                    <FileText size={12} />
                                    PDF • EXCEL • WORD • TEXT • MAX 15MB
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    accept=".xlsx,.xls,.pdf,.doc,.docx,.txt"
                                />
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-8 rounded-[2.5rem] border flex flex-col items-center text-center gap-6 relative overflow-hidden ${uploadStatus === 'error'
                                    ? 'bg-rose-500/5 border-rose-500/20'
                                    : 'bg-emerald-500/5 border-emerald-500/20'
                                    }`}
                            >
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${uploadStatus === 'error' ? 'bg-rose-500/20' : 'bg-emerald-500/20'
                                    }`}>
                                    {uploadStatus === 'processing' ? (
                                        <Loader2 className="text-blue-400 animate-spin" size={40} />
                                    ) : uploadStatus === 'error' ? (
                                        <AlertCircle className="text-rose-400" size={40} />
                                    ) : (
                                        <CheckCircle2 className="text-emerald-400" size={40} />
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-xl font-black text-white italic uppercase tracking-tight">
                                        {selectedFile.name}
                                    </h4>
                                    <p className="text-sm text-white/40 font-bold">
                                        {(selectedFile.size / 1024).toFixed(1)} KB • {
                                            uploadStatus === 'processing' ? '🤖 AI is parsing questions...' :
                                                uploadStatus === 'error' ? 'Processing failed' : 
                                                `✨ ${extractedQuestions.length} questions extracted`
                                        }
                                    </p>
                                </div>

                                {uploadStatus === 'error' && errorMessage && (
                                    <div className="w-full bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-left space-y-3">
                                        <p className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-2">
                                            <AlertCircle size={14} />
                                            Processing Error
                                        </p>
                                        <p className="text-sm text-white/60 font-medium">
                                            {errorMessage}
                                        </p>
                                    </div>
                                )}

                                {uploadStatus === 'ready' && extractedQuestions.length > 0 && (
                                    <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-left space-y-3">
                                        <p className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                            <Sparkles size={14} />
                                            AI Extraction Complete
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-sm text-white/80 font-medium">
                                                Successfully extracted and structured {extractedQuestions.length} questions
                                            </p>
                                            <p className="text-xs text-white/40 font-medium">
                                                Each question has been validated and formatted with 4 options
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={removeFile}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-rose-400 transition-colors"
                                >
                                    <Trash2 size={12} />
                                    Choose different file
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-white/10 bg-white/[0.02]">
                    <button
                        disabled={uploadStatus !== 'ready' || isProcessing || extractedQuestions.length === 0}
                        onClick={handleExtract}
                        className={`w-full relative h-[64px] rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black uppercase tracking-widest text-sm overflow-hidden shadow-xl group transition-all duration-300 ${uploadStatus !== 'ready' || isProcessing || extractedQuestions.length === 0 ? 'opacity-50 grayscale' : 'hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    AI is Processing...
                                </>
                            ) : (
                                <>
                                    Review {extractedQuestions.length} Questions
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
