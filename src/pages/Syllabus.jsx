import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp, Book, Layers, Upload, FileSpreadsheet, Download, X } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SyllabusDrawer from '@/components/dashboard/SyllabusDrawer';
import { useGetSyllabusQuery, useDeleteSyllabusMutation, useCreateSyllabusMutation, useCreateSubTopicMutation } from '@/redux/api/teacherApi';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';

export default function Syllabus() {
    const user = useSelector(selectCurrentUser);
    const { data: apiResponse, isLoading } = useGetSyllabusQuery();
    const syllabus = apiResponse?.data || [];
    const [deleteSyllabus] = useDeleteSyllabusMutation();
    const [createSyllabus] = useCreateSyllabusMutation();
    const [createSubTopic] = useCreateSubTopicMutation();

    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerMode, setDrawerMode] = useState('chapter'); // 'chapter' or 'subtopic'
    const [selectedChapterId, setSelectedChapterId] = useState(null);

    // Upload Modal State
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [previewData, setPreviewData] = useState(null);
    const [showReviewModal, setShowReviewModal] = useState(false);

    // Delete Modal State
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Expansion State
    const [expandedChapters, setExpandedChapters] = useState({});

    // Debug effect
    useEffect(() => {
        console.log('State changed:', {
            showReviewModal,
            hasPreviewData: !!previewData,
            previewDataKeys: previewData ? Object.keys(previewData).length : 0,
            uploadedFile
        });
    }, [showReviewModal, previewData, uploadedFile]);

    const toggleChapter = (id) => {
        setExpandedChapters(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleAddChapter = () => {
        setShowUploadModal(true);
    };

    const handleManualEntry = () => {
        setShowUploadModal(false);
        setDrawerMode('chapter');
        setSelectedChapterId(null);
        setIsDrawerOpen(true);
    };

    const handleFileUpload = () => {
        // Don't close the modal, just trigger file input
        const fileInput = document.getElementById('excel-upload');
        if (fileInput) {
            fileInput.click();
            console.log('File input triggered');
        } else {
            console.error('File input not found');
        }
    };

    const downloadSampleExcel = () => {
        // Create sample data
        const sampleData = [
            { 'Main Topic': 'Introduction to Programming', 'Subject': 'Computer Science', 'Description': 'Learn the basics of programming', 'Sub-Topic': 'Variables and Data Types' },
            { 'Main Topic': 'Introduction to Programming', 'Subject': 'Computer Science', 'Description': 'Learn the basics of programming', 'Sub-Topic': 'Control Structures' },
            { 'Main Topic': 'Introduction to Programming', 'Subject': 'Computer Science', 'Description': 'Learn the basics of programming', 'Sub-Topic': 'Functions and Methods' },
            { 'Main Topic': 'Object-Oriented Programming', 'Subject': 'Computer Science', 'Description': 'Understanding OOP concepts', 'Sub-Topic': 'Classes and Objects' },
            { 'Main Topic': 'Object-Oriented Programming', 'Subject': 'Computer Science', 'Description': 'Understanding OOP concepts', 'Sub-Topic': 'Inheritance' },
            { 'Main Topic': 'Object-Oriented Programming', 'Subject': 'Computer Science', 'Description': 'Understanding OOP concepts', 'Sub-Topic': 'Polymorphism' },
            { 'Main Topic': 'Data Structures', 'Subject': 'Computer Science', 'Description': 'Learn about data organization', 'Sub-Topic': 'Arrays and Lists' },
            { 'Main Topic': 'Data Structures', 'Subject': 'Computer Science', 'Description': 'Learn about data organization', 'Sub-Topic': 'Stacks and Queues' },
            { 'Main Topic': 'Data Structures', 'Subject': 'Computer Science', 'Description': 'Learn about data organization', 'Sub-Topic': 'Trees and Graphs' },
        ];

        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(sampleData);
        
        // Set column widths
        ws['!cols'] = [
            { wch: 35 }, // Main Topic
            { wch: 20 }, // Subject
            { wch: 35 }, // Description
            { wch: 30 }  // Sub-Topic
        ];

        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Syllabus');

        // Download
        XLSX.writeFile(wb, 'syllabus_sample.xlsx');
        toast.success('Sample file downloaded!');
    };

    const handleExcelUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.log('No file selected');
            return;
        }

        console.log('File selected:', file.name, file.type);

        // Validate file type
        const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please upload a valid Excel file (.xlsx or .xls)');
            return;
        }

        setIsUploading(true);
        console.log('Starting file processing...');

        try {
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Group by Main Topic
            const groupedData = {};
            jsonData.forEach(row => {
                const mainTopic = row['Main Topic'] || row['main topic'] || row['Main topic'] || row['main_topic'];
                const subject = row['Subject'] || row['subject'] || row['SUBJECT'];
                const description = row['Description'] || row['description'] || row['DESCRIPTION'];
                const subTopic = row['Sub-Topic'] || row['sub-topic'] || row['Sub-topic'] || row['sub_topic'] || row['Subtopic'] || row['subtopic'];

                if (!mainTopic) return;

                if (!groupedData[mainTopic]) {
                    groupedData[mainTopic] = {
                        subject: subject || 'General',
                        description: description || `Chapter: ${mainTopic}`,
                        subTopics: []
                    };
                }

                if (subTopic) {
                    groupedData[mainTopic].subTopics.push(subTopic);
                }
            });

            // Store preview data
            console.log('Grouped data:', groupedData);
            console.log('Number of topics:', Object.keys(groupedData).length);
            
            setUploadedFile(file.name);
            setPreviewData(groupedData);
            setShowUploadModal(false); // Close upload modal
            setShowReviewModal(true); // Open review modal
            
            console.log('Review modal should now be visible');
            
            event.target.value = ''; // Reset file input
        } catch (error) {
            console.error('Error processing Excel file:', error);
            toast.error('Failed to process Excel file. Please check the format.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmitImport = async () => {
        if (!previewData) return;

        setIsUploading(true);

        try {
            let successCount = 0;
            let failedCount = 0;

            for (const [title, data] of Object.entries(previewData)) {
                try {
                    // Step 1: Create main chapter/topic
                    const chapterPayload = {
                        title: title,
                        description: data.description,
                        subject: data.subject,
                        teacher_id: user?.id
                    };

                    const chapterResponse = await createSyllabus(chapterPayload).unwrap();
                    const syllabusId = chapterResponse?.data?.id;

                    // Step 2: Create sub-topics if any
                    if (syllabusId && data.subTopics.length > 0) {
                        for (const subTopic of data.subTopics) {
                            try {
                                await createSubTopic({
                                    topics: subTopic,
                                    syllabus_id: syllabusId
                                }).unwrap();
                            } catch (subError) {
                                console.error(`Failed to create sub-topic "${subTopic}":`, subError);
                            }
                        }
                    }

                    successCount++;
                } catch (error) {
                    console.error(`Failed to create syllabus for "${title}":`, error);
                    failedCount++;
                }
            }

            if (successCount > 0) {
                toast.success(`Successfully imported ${successCount} topic${successCount > 1 ? 's' : ''}!`);
            }
            if (failedCount > 0) {
                toast.error(`Failed to import ${failedCount} topic${failedCount > 1 ? 's' : ''}`);
            }

            // Close modal and reset
            setShowReviewModal(false);
            setPreviewData(null);
            setUploadedFile(null);
        } catch (error) {
            console.error('Error importing data:', error);
            toast.error('Failed to import data. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancelImport = () => {
        setShowReviewModal(false);
        setPreviewData(null);
        setUploadedFile(null);
    };

    const handleAddSubTopic = (chapterId) => {
        setDrawerMode('subtopic');
        setSelectedChapterId(chapterId);
        setIsDrawerOpen(true);
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        setDeleteTarget(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        
        try {
            await deleteSyllabus(deleteTarget).unwrap();
            toast.success('Topic deleted successfully!');
        } catch (err) {
            console.error('Failed to delete syllabus:', err);
            toast.error('Failed to delete topic');
        } finally {
            setShowDeleteModal(false);
            setDeleteTarget(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteTarget(null);
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const card3DVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            rotateX: -15,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            y: -10,
            scale: 1.02,
            rotateX: 5,
            boxShadow: "0px 20px 40px rgba(0,0,0,0.4)",
            zIndex: 10,
            transition: { duration: 0.3 }
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-20 px-6 lg:px-12 pt-10 overflow-x-hidden">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-foreground italic tracking-tighter mb-2">
                            My Syllabus
                        </h1>
                        <p className="text-muted-foreground font-medium">
                            Manage your course roadmap and learning objectives.
                        </p>
                    </div>
                    <motion.button
                        onClick={handleAddChapter}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 2 }}
                        className="relative group bg-gradient-to-b from-purple-500 to-purple-700 text-white font-black rounded-2xl px-8 py-4 shadow-[0_10px_0_0_rgb(88,28,135),0_15px_20px_0_rgba(0,0,0,0.4)] hover:shadow-[0_12px_0_0_rgb(88,28,135),0_20px_25px_0_rgba(0,0,0,0.5)] active:shadow-[0_0_0_0_rgb(88,28,135),0_0_0_0_rgba(0,0,0,0)] active:translate-y-[10px] transition-all duration-150 border-2 border-purple-400/30"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30 shadow-inner">
                                <Plus className="text-white drop-shadow-md" size={24} strokeWidth={3} />
                            </div>
                            <span className="text-xl tracking-tight drop-shadow-md uppercase">Add Topic</span>
                        </div>

                        {/* Highlights for glossy 3D look */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-40 pointer-events-none" />
                        <div className="absolute top-1 left-2 right-2 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl opacity-50 pointer-events-none" />
                    </motion.button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-muted-foreground font-medium animate-pulse">Loading Syllabus...</p>
                    </div>
                ) : syllabus.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="text-8xl mb-6"
                        >
                            📚
                        </motion.div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">No Syllabus Yet</h3>
                        <p className="text-muted-foreground max-w-sm mb-8">
                            Start creating your course structure by adding your first chapter.
                        </p>
                        <Button
                            onClick={handleAddChapter}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl px-8 py-3"
                        >
                            Create First Chapter
                        </Button>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 perspective-1000"
                    >
                        {syllabus.map((chapter) => (
                            <motion.div
                                key={chapter.id}
                                variants={card3DVariants}
                                whileHover="hover"
                                onClick={() => toggleChapter(chapter.id)}
                                className="group relative bg-card backdrop-blur-xl border border-border rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Glass Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <div className="p-8 relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-purple-500/20 p-3 rounded-2xl text-purple-500 border border-purple-500/30">
                                            <Book size={24} />
                                        </div>
                                        <button
                                            onClick={(e) => handleDelete(chapter.id, e)}
                                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-accent rounded-full transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight">
                                        {chapter.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                                        {chapter.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-500">
                                            <Layers size={14} />
                                            {chapter.topics?.length || 0} Sub-Topics
                                        </div>
                                        {expandedChapters[chapter.id] ? (
                                            <ChevronUp className="text-muted-foreground" />
                                        ) : (
                                            <ChevronDown className="text-muted-foreground" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content (Paper Insert Look) */}
                                <AnimatePresence>
                                    {expandedChapters[chapter.id] && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="bg-accent/30 border-t border-border"
                                        >
                                            <div className="p-6 space-y-3">
                                                {chapter.topics && chapter.topics.length > 0 ? (
                                                    chapter.topics.map((sub, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ x: -20, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: idx * 0.1 }}
                                                            className="flex items-center gap-3 p-3 rounded-xl bg-accent hover:bg-accent/80 transition-colors border border-border"
                                                        >
                                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                            <span className="text-sm font-medium text-foreground">
                                                                {sub.topics}
                                                            </span>
                                                        </motion.div>
                                                    ))
                                                ) : (
                                                    <p className="text-muted-foreground text-center text-sm py-2 italic">
                                                        No sub-topics yet.
                                                    </p>
                                                )}

                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddSubTopic(chapter.id);
                                                    }}
                                                    className="w-full mt-4 bg-accent hover:bg-purple-500/20 text-purple-500 hover:text-purple-600 text-sm font-bold py-3 rounded-xl transition-all border border-border"
                                                >
                                                    <Plus size={16} className="mr-2" />
                                                    Add Sub-Topic
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Create Drawer */}
                <SyllabusDrawer
                    isOpen={isDrawerOpen}
                    onClose={() => setIsDrawerOpen(false)}
                    mode={drawerMode}
                    parentId={selectedChapterId}
                />

                {/* Upload Modal */}
                <AnimatePresence>
                    {showUploadModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                            onClick={() => setShowUploadModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-card border border-border rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">
                                        Add Syllabus
                                    </h2>
                                    <button
                                        onClick={() => setShowUploadModal(false)}
                                        className="p-2 hover:bg-accent rounded-xl transition-colors"
                                    >
                                        <X className="text-muted-foreground" size={24} />
                                    </button>
                                </div>

                                <p className="text-muted-foreground mb-8">
                                    Choose how you want to add your syllabus content
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Manual Entry Option */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleManualEntry}
                                        className="group relative bg-gradient-to-br from-purple-500/10 to-indigo-500/10 hover:from-purple-500/20 hover:to-indigo-500/20 border border-purple-500/30 rounded-2xl p-8 transition-all overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                                                <Plus size={32} className="text-purple-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-foreground mb-2 uppercase italic">
                                                    Manual Entry
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Add topics one by one using the form
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>

                                    {/* File Upload Option */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleFileUpload}
                                        className="group relative bg-gradient-to-br from-green-500/10 to-teal-500/10 hover:from-green-500/20 hover:to-teal-500/20 border border-green-500/30 rounded-2xl p-8 transition-all overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        
                                        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                                <Upload size={32} className="text-green-500" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-foreground mb-2 uppercase italic">
                                                    Upload Excel
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Import multiple topics from Excel file
                                                </p>
                                            </div>
                                        </div>
                                    </motion.button>
                                </div>

                                {/* Download Sample */}
                                <div className="mt-8 pt-6 border-t border-border">
                                    <button
                                        onClick={downloadSampleExcel}
                                        className="w-full flex items-center justify-center gap-3 py-4 bg-accent hover:bg-accent/80 border border-border rounded-xl transition-all group"
                                    >
                                        <FileSpreadsheet size={20} className="text-blue-500" />
                                        <span className="text-foreground font-bold uppercase tracking-tight text-sm">
                                            Download Nigeria Curriculum
                                        </span>
                                        <Download size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </button>
                                    <p className="text-xs text-muted-foreground text-center mt-3">
                                        Use this template to format your syllabus data correctly
                                    </p>
                                </div>

                                {/* Hidden File Input */}
                                <input
                                    id="excel-upload"
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleExcelUpload}
                                    className="hidden"
                                />

                                {/* Loading Overlay */}
                                {isUploading && (
                                    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                                        <div className="text-center">
                                            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                                            <p className="text-foreground font-bold">Processing Excel file...</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Review Modal */}
                <AnimatePresence>
                    {showReviewModal && previewData && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                            onClick={handleCancelImport}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-card border border-border rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] shadow-2xl flex flex-col"
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">
                                            Review Import
                                        </h2>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            File: <span className="text-foreground font-medium">{uploadedFile}</span>
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleCancelImport}
                                        className="p-2 hover:bg-accent rounded-xl transition-colors"
                                    >
                                        <X className="text-muted-foreground" size={24} />
                                    </button>
                                </div>

                                {/* Summary Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-black text-purple-500">
                                            {Object.keys(previewData).length}
                                        </div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                                            Main Topics
                                        </div>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-black text-blue-500">
                                            {Object.values(previewData).reduce((acc, curr) => acc + curr.subTopics.length, 0)}
                                        </div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                                            Sub-Topics
                                        </div>
                                    </div>
                                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                                        <div className="text-3xl font-black text-green-500">
                                            {new Set(Object.values(previewData).map(d => d.subject)).size}
                                        </div>
                                        <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                                            Subjects
                                        </div>
                                    </div>
                                </div>

                                {/* Preview Content - Scrollable */}
                                <div className="flex-1 overflow-y-auto space-y-4 mb-6 pr-2">
                                    {Object.entries(previewData).map(([title, data], idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-accent/30 border border-border rounded-2xl p-6"
                                        >
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="bg-purple-500/20 p-3 rounded-xl border border-purple-500/30">
                                                    <Book size={20} className="text-purple-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-black text-foreground mb-1">
                                                        {title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        {data.description}
                                                    </p>
                                                    <div className="inline-flex items-center gap-2 bg-accent px-3 py-1 rounded-lg border border-border">
                                                        <Layers size={12} className="text-purple-500" />
                                                        <span className="text-xs font-bold text-foreground">
                                                            {data.subject}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {data.subTopics.length > 0 && (
                                                <div className="ml-16 space-y-2">
                                                    {data.subTopics.map((subTopic, subIdx) => (
                                                        <div
                                                            key={subIdx}
                                                            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                                                        >
                                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                            <span className="text-sm font-medium text-foreground">
                                                                {subTopic}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4 border-t border-border">
                                    <Button
                                        onClick={handleCancelImport}
                                        disabled={isUploading}
                                        className="flex-1 bg-accent hover:bg-accent/80 text-foreground border border-border font-bold py-6 rounded-xl text-lg"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleSubmitImport}
                                        disabled={isUploading}
                                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-6 rounded-xl text-lg shadow-lg shadow-purple-500/20"
                                    >
                                        {isUploading ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                <span>Importing...</span>
                                            </div>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <Upload size={20} />
                                                Submit Import
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {showDeleteModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] p-4"
                            onClick={cancelDelete}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-card border border-border rounded-3xl p-8 max-w-md w-full shadow-2xl"
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-20 h-20 rounded-full bg-red-500/20 border-2 border-red-500/30 flex items-center justify-center">
                                        <Trash2 size={40} className="text-red-500" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-black text-foreground mb-3 uppercase italic tracking-tighter">
                                        Delete Topic?
                                    </h2>
                                    <p className="text-muted-foreground">
                                        Are you sure you want to delete this topic? This action cannot be undone and will remove all sub-topics as well.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    <Button
                                        onClick={cancelDelete}
                                        className="flex-1 bg-accent hover:bg-accent/80 text-foreground border border-border font-bold py-4 rounded-xl"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={confirmDelete}
                                        className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/20"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <Trash2 size={18} />
                                            Delete
                                        </span>
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
