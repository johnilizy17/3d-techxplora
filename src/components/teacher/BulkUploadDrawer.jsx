import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Trash2
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTemporaryStorage, selectTempStorage } from '@/redux/slices/authSlice';
import { validateQuestionsFile, extractQuestionsFromExcel } from '@/utils/excelUtils';
import { toast } from 'sonner';

export default function BulkUploadDrawer({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, validating, ready, error
    const [validationErrors, setValidationErrors] = useState([]);
    const [isExtracting, setIsExtracting] = useState(false);

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
        if (!file.name.endsWith('.xlsx')) {
            toast.error("Please upload a valid .xlsx file");
            return;
        }

        setSelectedFile(file);
        setUploadStatus('validating');
        setValidationErrors([]);

        try {
            const result = await validateQuestionsFile(file);
            if (result.valid) {
                setUploadStatus('ready');
                toast.success("File validated successfully!");
            } else {
                setUploadStatus('error');
                setValidationErrors(result.errors);
                toast.error("File validation failed.");
            }
        } catch (error) {
            console.error("File processing error:", error);
            setUploadStatus('error');
            setValidationErrors(["Failed to read the file structure."]);
        }
    };

    const handleExtract = async () => {
        if (!selectedFile || uploadStatus !== 'ready') return;

        setIsExtracting(true);
        try {
            const questions = await extractQuestionsFromExcel(selectedFile);
            dispatch(setTemporaryStorage({
                ...tempStorage,
                questions: questions
            }));
            toast.success(`${questions.length} questions extracted successfully!`);
            navigate('/dashboard/teacher/ai-review'); // Using same review page as AI
            onClose();
        } catch (error) {
            console.error("Extraction error:", error);
            toast.error("An error occurred during extraction.");
        } finally {
            setIsExtracting(false);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setUploadStatus('idle');
        setValidationErrors([]);
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
                            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Bulk Question <span className="text-emerald-400">Upload</span></h2>
                            <p className="text-white/40 text-xs font-medium tracking-wider uppercase">Import from Excel Spreadsheet</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-white/50 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <div className="space-y-8">
                        {/* Sample Download */}
                        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <FileSpreadsheet className="text-blue-400" size={20} />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-bold text-white">Need a template?</h4>
                                    <p className="text-xs text-white/40 font-medium">Download our standardized XLSX format</p>
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
                                    MAX FILE SIZE: 15MB
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    accept=".xlsx"
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
                                    {uploadStatus === 'validating' ? (
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
                                            uploadStatus === 'validating' ? 'Analyzing structure...' :
                                                uploadStatus === 'error' ? 'Invalid configuration' : 'Ready for extraction'
                                        }
                                    </p>
                                </div>

                                {uploadStatus === 'error' && validationErrors.length > 0 && (
                                    <div className="w-full bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 text-left space-y-3">
                                        <p className="text-xs font-black text-rose-400 uppercase tracking-widest flex items-center gap-2">
                                            <AlertCircle size={14} />
                                            Structure Mismatch
                                        </p>
                                        <ul className="space-y-1.5">
                                            {validationErrors.map((err, i) => (
                                                <li key={i} className="text-[11px] text-white/60 font-medium flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-rose-500" />
                                                    {err}
                                                </li>
                                            ))}
                                        </ul>
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
                        disabled={uploadStatus !== 'ready' || isExtracting}
                        onClick={handleExtract}
                        className={`w-full relative h-[64px] rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black uppercase tracking-widest text-sm overflow-hidden shadow-xl group transition-all duration-300 ${uploadStatus !== 'ready' || isExtracting ? 'opacity-50 grayscale' : 'hover:scale-[1.02] active:scale-[0.98]'
                            }`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isExtracting ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Synchronizing Knowledge...
                                </>
                            ) : (
                                <>
                                    Extract & Preview Questions
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
