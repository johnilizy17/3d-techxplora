import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    GraduationCap,
    ChevronDown,
    ChevronRight,
    School,
    Users,
    Target,
    Sparkles,
    Calendar,
    AlertTriangle,
    CheckCircle2,
    X,
    Loader2,
    Info
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { curriculumMetadata } from '@/data/nigeriaCurriculum';
import { useGenerateCurriculumWithAIMutation } from '@/redux/api/curriculumApi';

export default function NigeriaCurriculum() {
    const [selectedLevel, setSelectedLevel] = useState('primary');
    const [expandedSubject, setExpandedSubject] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [showYearSelector, setShowYearSelector] = useState(false);
    const [versionInfo, setVersionInfo] = useState(null);
    const [showUpdateNotification, setShowUpdateNotification] = useState(false);
    const [curriculum, setCurriculum] = useState(null);
    
    const [generateCurriculum, { isLoading, error }] = useGenerateCurriculumWithAIMutation();

    // Initialize - Check if first time user
    useEffect(() => {
        const hasSelectedYear = localStorage.getItem('nigeria_curriculum_year');
        const hasSeenSelector = localStorage.getItem('nigeria_curriculum_selector_shown');
        
        if (!hasSelectedYear && !hasSeenSelector) {
            setShowYearSelector(true);
            localStorage.setItem('nigeria_curriculum_selector_shown', 'true');
        } else if (hasSelectedYear) {
            setSelectedYear(parseInt(hasSelectedYear));
            checkCurriculumVersion(parseInt(hasSelectedYear));
        } else {
            const currentYear = new Date().getFullYear();
            setSelectedYear(currentYear);
            localStorage.setItem('nigeria_curriculum_year', currentYear.toString());
        }
    }, []);

    // Load curriculum when year is selected
    useEffect(() => {
        if (!selectedYear) return;
        
        const loadCurriculum = async () => {
            // Check cache first
            const cacheKey = `nigeria_curriculum_${selectedYear}`;
            const cachedCurriculum = localStorage.getItem(cacheKey);
            const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
            const cacheExpiry = 30 * 24 * 60 * 60 * 1000; // 30 days
            
            if (cachedCurriculum && cacheTimestamp) {
                const age = Date.now() - parseInt(cacheTimestamp);
                if (age < cacheExpiry) {
                    const parsed = JSON.parse(cachedCurriculum);
                    const enrichedData = enrichCurriculumWithMetadata(parsed);
                    setCurriculum(enrichedData);
                    return;
                }
            }
            
            // Generate with AI
            try {
                const result = await generateCurriculum({ year: selectedYear }).unwrap();
                if (result) {
                    const enrichedData = enrichCurriculumWithMetadata(result);
                    setCurriculum(enrichedData);
                    
                    // Cache the result
                    localStorage.setItem(cacheKey, JSON.stringify(result));
                    localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
                }
            } catch (err) {
                console.error('Failed to generate curriculum:', err);
            }
        };
        
        loadCurriculum();
    }, [selectedYear, generateCurriculum]);

    // Enrich AI data with UI metadata
    const enrichCurriculumWithMetadata = (data) => {
        return {
            primary: { ...data.primary, ...curriculumMetadata.primary },
            juniorSecondary: { ...data.juniorSecondary, ...curriculumMetadata.juniorSecondary },
            seniorSecondary: { ...data.seniorSecondary, ...curriculumMetadata.seniorSecondary }
        };
    };

    // Check if curriculum is outdated
    const checkCurriculumVersion = (year) => {
        const currentYear = new Date().getFullYear();
        const isCurrent = year >= 2020;
        
        const versionData = {
            year,
            isCurrent,
            latestYear: currentYear,
            message: isCurrent 
                ? `The ${year} curriculum is based on recent NERDC standards.`
                : `The ${year} curriculum predates major NERDC reforms in 2020-2021. Consider updating to ${currentYear} for current standards.`,
            changes: isCurrent ? [] : [
                "Updated digital literacy and ICT curriculum",
                "Enhanced STEM focus across all levels",
                "New entrepreneurship education components"
            ],
            source: 'local'
        };
        
        setVersionInfo(versionData);
        
        if (!isCurrent) {
            setShowUpdateNotification(true);
        }
    };

    // Handle year selection
    const handleYearSelect = (year) => {
        setSelectedYear(year);
        localStorage.setItem('nigeria_curriculum_year', year.toString());
        setShowYearSelector(false);
        checkCurriculumVersion(year);
    };

    // Handle update to latest curriculum
    const handleUpdateCurriculum = () => {
        if (!versionInfo?.latestYear) return;
        
        const latestYear = parseInt(versionInfo.latestYear);
        
        // Clear old cache
        const oldCacheKey = `nigeria_curriculum_${selectedYear}`;
        localStorage.removeItem(oldCacheKey);
        localStorage.removeItem(`${oldCacheKey}_timestamp`);
        
        setSelectedYear(latestYear);
        localStorage.setItem('nigeria_curriculum_year', latestYear.toString());
        setShowUpdateNotification(false);
        setCurriculum(null);
    };

    // Handle refresh
    const handleRefresh = () => {
        const cacheKey = `nigeria_curriculum_${selectedYear}`;
        localStorage.removeItem(cacheKey);
        localStorage.removeItem(`${cacheKey}_timestamp`);
        setCurriculum(null);
    };

    // Generate year options
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 2009 + 1 }, (_, i) => currentYear - i);

    // Get current level data
    const currentData = curriculum?.[selectedLevel];
    const Icon = currentData?.icon || School;

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-black dark:via-gray-900 dark:to-gray-900 py-12 lg:py-20 pb-24 lg:pb-12">
                {/* Year Selection Modal */}
                {showYearSelector && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-700 p-8 max-w-2xl w-full shadow-2xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                                    <Calendar size={32} className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase">
                                        Select Curriculum Year
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        Choose the academic year for Nigerian curriculum
                                    </p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto mb-6">
                                {yearOptions.map((year) => (
                                    <motion.button
                                        key={year}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleYearSelect(year)}
                                        className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-black text-lg shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        {year}
                                    </motion.button>
                                ))}
                            </div>
                            
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    Your selection will be saved to your device
                                </p>
                                <button
                                    onClick={() => {
                                        setShowYearSelector(false);
                                        const currentYear = new Date().getFullYear();
                                        setSelectedYear(currentYear);
                                        localStorage.setItem('nigeria_curriculum_year', currentYear.toString());
                                    }}
                                    className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 underline"
                                >
                                    Skip and use current year
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Update Notification */}
                <AnimatePresence>
                    {showUpdateNotification && versionInfo && !versionInfo.isCurrent && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="fixed top-4 left-4 right-4 lg:left-auto lg:right-4 lg:max-w-md z-40"
                        >
                            <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-2xl border-2 border-orange-300 dark:border-orange-700 p-6 shadow-2xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-lg">
                                        <AlertTriangle size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-2">
                                            Curriculum Update Available
                                        </h3>
                                        <p className="text-sm text-gray-800 dark:text-gray-300 mb-3">
                                            {versionInfo.message}
                                        </p>
                                        {versionInfo.changes && versionInfo.changes.length > 0 && (
                                            <div className="mb-3">
                                                <p className="text-xs font-bold text-gray-700 dark:text-gray-400 mb-1">
                                                    Major Changes:
                                                </p>
                                                <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
                                                    {versionInfo.changes.slice(0, 3).map((change, idx) => (
                                                        <li key={idx} className="flex items-start gap-2">
                                                            <ChevronRight size={14} className="shrink-0 mt-0.5" />
                                                            <span>{change}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleUpdateCurriculum}
                                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-shadow"
                                            >
                                                Update to {versionInfo.latestYear}
                                            </button>
                                            <button
                                                onClick={() => setShowUpdateNotification(false)}
                                                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                                            >
                                                Later
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowUpdateNotification(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                            {selectedYear && (
                                <button
                                    onClick={() => setShowYearSelector(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-500/10 border-2 border-green-300 dark:border-green-500/20 hover:bg-green-200 dark:hover:bg-green-500/20 transition-colors"
                                >
                                    <Calendar size={16} className="text-green-600 dark:text-green-400" />
                                    <span className="text-xs font-black uppercase tracking-wider text-green-700 dark:text-green-400">
                                        {selectedYear} Curriculum
                                    </span>
                                </button>
                            )}
                            
                            {versionInfo?.isCurrent && (
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border-2 border-emerald-300 dark:border-emerald-500/20">
                                    <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                        Up to Date
                                    </span>
                                </div>
                            )}
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white uppercase italic tracking-tight">
                            Nigeria <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Curriculum</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto font-medium">
                            AI-powered comprehensive overview of the Nigerian educational curriculum
                        </p>
                        
                        {isLoading && (
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <Loader2 size={20} className="animate-spin text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Generating {selectedYear} curriculum with AI...
                                </span>
                            </div>
                        )}
                        
                        {error && (
                            <div className="mt-4 p-4 rounded-2xl bg-orange-100 dark:bg-orange-900/20 border-2 border-orange-300 dark:border-orange-500/20">
                                <div className="flex items-start gap-3">
                                    <Info size={20} className="text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-medium text-orange-700 dark:text-orange-400">
                                            {error.status === 'NO_API_KEY' 
                                                ? 'OpenRouter API key not configured. Add your API key to generate curriculum.'
                                                : 'Failed to generate curriculum. Please try refreshing or check your API key.'}
                                        </p>
                                        <p className="text-xs text-orange-600 dark:text-orange-500 mt-1">
                                            See documentation: OPENROUTER_API_SETUP.md
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {!isLoading && curriculum && (
                            <button
                                onClick={handleRefresh}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-500/10 border-2 border-purple-300 dark:border-purple-500/20 hover:bg-purple-200 dark:hover:bg-purple-500/20 transition-colors"
                            >
                                <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
                                <span className="text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-400">
                                    Regenerate with AI
                                </span>
                            </button>
                        )}
                    </motion.div>
                </div>

                {/* Level Selector */}
                {curriculum && (
                    <div className="max-w-7xl mx-auto px-6 mb-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Object.entries(curriculum).map(([key, data]) => {
                            const LevelIcon = data.icon;
                            return (
                                <motion.button
                                    key={key}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedLevel(key)}
                                    className={`relative p-8 rounded-3xl border-2 transition-all shadow-lg ${
                                        selectedLevel === key
                                            ? `bg-gradient-to-br ${data.color} text-white border-transparent shadow-2xl`
                                            : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-700 hover:shadow-xl'
                                    }`}
                                >
                                    <div className="flex flex-col items-center text-center space-y-4">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                                            selectedLevel === key
                                                ? 'bg-white/20'
                                                : 'bg-indigo-100 dark:bg-gradient-to-br dark:' + data.color
                                        }`}>
                                            <LevelIcon size={32} className={selectedLevel === key ? 'text-white' : 'text-indigo-600 dark:text-white'} />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-black uppercase ${
                                                selectedLevel === key ? 'text-white' : 'text-gray-900 dark:text-white'
                                            }`}>
                                                {data.title}
                                            </h3>
                                            <p className={`text-sm font-medium mt-1 ${
                                                selectedLevel === key ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                                {data.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
                )}

                {/* Curriculum Content */}
                {curriculum && currentData && (
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedLevel}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {currentData.classes?.map((classData, classIndex) => (
                                <div key={classIndex} className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-800 p-8 shadow-xl">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-gradient-to-br dark:from-blue-500 dark:to-cyan-500 flex items-center justify-center shadow-lg">
                                            <Icon size={24} className="text-indigo-600 dark:text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase">
                                                {classData.level}
                                            </h2>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                {classData.subjects.length} Subjects
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        {classData.subjects.map((subject, subjectIndex) => {
                                            const isExpanded = expandedSubject === `${classIndex}-${subjectIndex}`;
                                            
                                            return (
                                                <motion.div
                                                    key={subjectIndex}
                                                    className="border-2 border-gray-300 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-gray-400 dark:hover:border-gray-700 transition-colors shadow-md hover:shadow-lg"
                                                >
                                                    <button
                                                        onClick={() => setExpandedSubject(isExpanded ? null : `${classIndex}-${subjectIndex}`)}
                                                        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-800 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-gradient-to-br dark:from-blue-500 dark:to-cyan-500 flex items-center justify-center shadow-md">
                                                                <BookOpen size={20} className="text-indigo-600 dark:text-white" />
                                                            </div>
                                                            <div className="text-left">
                                                                <h3 className="text-lg font-black text-gray-900 dark:text-white">
                                                                    {subject.name}
                                                                </h3>
                                                                {subject.description && (
                                                                    <p className="text-xs text-gray-500 dark:text-gray-500 font-medium mt-1 max-w-md">
                                                                        {subject.description}
                                                                    </p>
                                                                )}
                                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                                                                    {subject.topics?.length || 0} Topics
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <motion.div
                                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <ChevronDown size={24} className="text-gray-500 dark:text-gray-400" />
                                                        </motion.div>
                                                    </button>

                                                    <AnimatePresence>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="p-6 bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-800 space-y-6">
                                                                    {subject.topics?.map((topic, topicIndex) => {
                                                                        // Handle both old format (string) and new format (object)
                                                                        const topicName = typeof topic === 'string' ? topic : topic.name;
                                                                        const topicDescription = typeof topic === 'object' ? topic.description : null;
                                                                        const subtopics = typeof topic === 'object' ? topic.subtopics : null;
                                                                        
                                                                        return (
                                                                            <div
                                                                                key={topicIndex}
                                                                                className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800/50 border-2 border-blue-200 dark:border-gray-700"
                                                                            >
                                                                                <div className="flex items-start gap-3 mb-2">
                                                                                    <div className="w-8 h-8 rounded-lg bg-blue-500 dark:bg-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                                                                                        <Target size={16} className="text-white" />
                                                                                    </div>
                                                                                    <div className="flex-1">
                                                                                        <h5 className="text-base font-black text-gray-900 dark:text-white mb-1">
                                                                                            {topicName}
                                                                                        </h5>
                                                                                        {topicDescription && (
                                                                                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium mb-3">
                                                                                                {topicDescription}
                                                                                            </p>
                                                                                        )}
                                                                                        {subtopics && subtopics.length > 0 && (
                                                                                            <div className="space-y-2">
                                                                                                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                                                                                    Subtopics:
                                                                                                </p>
                                                                                                <div className="grid grid-cols-1 gap-2">
                                                                                                    {subtopics.map((subtopic, subIndex) => (
                                                                                                        <div
                                                                                                            key={subIndex}
                                                                                                            className="flex items-start gap-2 p-2 rounded-lg bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700"
                                                                                                        >
                                                                                                            <ChevronRight size={14} className="text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                                                                                                            <span className="text-sm text-gray-800 dark:text-gray-300 font-medium">
                                                                                                                {subtopic}
                                                                                                            </span>
                                                                                                        </div>
                                                                                                    ))}
                                                                                                </div>
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
                )}

                {/* Loading State */}
                {isLoading && (
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="bg-white dark:bg-gray-900 rounded-3xl border-2 border-gray-300 dark:border-gray-800 p-12 shadow-xl">
                            <div className="flex flex-col items-center gap-4">
                                <Loader2 size={48} className="animate-spin text-blue-600 dark:text-blue-400" />
                                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                                    Generating comprehensive curriculum for {selectedYear}...
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500">
                                    This may take a few seconds
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Info Section */}
                <div className="max-w-7xl mx-auto px-6 mt-16">
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 border-2 border-green-300 dark:border-green-800 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center shrink-0 shadow-lg">
                                <Target size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">
                                    About Nigerian Curriculum
                                </h3>
                                <p className="text-gray-800 dark:text-gray-300 leading-relaxed font-medium">
                                    The Nigerian educational system follows the 9-3-4 structure: 9 years of basic education (Primary 1-6 and JSS 1-3), 
                                    3 years of senior secondary education (SSS 1-3), and 4 years of tertiary education. The curriculum is designed 
                                    by the Nigerian Educational Research and Development Council (NERDC) to provide quality education aligned with 
                                    national development goals.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
