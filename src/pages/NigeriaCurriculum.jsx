import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    GraduationCap,
    Award,
    ChevronDown,
    ChevronRight,
    School,
    Users,
    Target,
    Sparkles
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const curriculumData = {
    primary: {
        title: "Primary Education",
        subtitle: "Primary 1 - 6 (Ages 6-11)",
        color: "from-blue-500 to-cyan-500",
        icon: School,
        classes: [
            {
                level: "Primary 1-3 (Lower Primary)",
                subjects: [
                    { name: "English Language", topics: ["Phonics", "Reading", "Writing", "Speaking", "Listening"] },
                    { name: "Mathematics", topics: ["Numbers 1-100", "Addition", "Subtraction", "Shapes", "Measurement"] },
                    { name: "Basic Science & Technology", topics: ["Living Things", "Non-Living Things", "Our Environment", "Simple Machines"] },
                    { name: "Social Studies", topics: ["Family", "Community", "Culture", "National Symbols"] },
                    { name: "Cultural & Creative Arts", topics: ["Drawing", "Singing", "Dancing", "Drama"] },
                    { name: "Physical & Health Education", topics: ["Basic Movements", "Games", "Personal Hygiene", "Safety"] },
                    { name: "Religious Studies", topics: ["Moral Values", "Religious Stories", "Good Behavior"] },
                    { name: "Home Economics", topics: ["Personal Care", "Food", "Clothing", "Shelter"] },
                    { name: "Computer Studies", topics: ["Parts of Computer", "Basic Operations", "Drawing Programs"] }
                ]
            },
            {
                level: "Primary 4-6 (Upper Primary)",
                subjects: [
                    { name: "English Language", topics: ["Grammar", "Comprehension", "Composition", "Literature", "Speech Work"] },
                    { name: "Mathematics", topics: ["Fractions", "Decimals", "Geometry", "Word Problems", "Data Handling"] },
                    { name: "Basic Science & Technology", topics: ["Energy", "Matter", "Forces", "Technology", "Health Education"] },
                    { name: "Social Studies", topics: ["Nigerian History", "Geography", "Government", "Economics", "Citizenship"] },
                    { name: "Cultural & Creative Arts", topics: ["Nigerian Art", "Music", "Drama", "Crafts"] },
                    { name: "Physical & Health Education", topics: ["Athletics", "Team Sports", "First Aid", "Drug Education"] },
                    { name: "Religious Studies", topics: ["Religious Texts", "Moral Teachings", "Religious Practices"] },
                    { name: "Home Economics", topics: ["Nutrition", "Home Management", "Sewing", "Cooking"] },
                    { name: "Computer Studies", topics: ["MS Office", "Internet Basics", "Typing", "Programming Intro"] },
                    { name: "Agricultural Science", topics: ["Crop Farming", "Animal Husbandry", "Farm Tools", "Soil"] }
                ]
            }
        ]
    },
    juniorSecondary: {
        title: "Junior Secondary School",
        subtitle: "JSS 1 - 3 (Ages 12-14)",
        color: "from-purple-500 to-pink-500",
        icon: Users,
        classes: [
            {
                level: "JSS 1-3 (Basic Education)",
                subjects: [
                    { name: "English Language", topics: ["Advanced Grammar", "Literature", "Essay Writing", "Oral English", "Comprehension"] },
                    { name: "Mathematics", topics: ["Algebra", "Geometry", "Statistics", "Trigonometry Basics", "Sets"] },
                    { name: "Basic Science", topics: ["Physics Concepts", "Chemistry Basics", "Biology Fundamentals", "Scientific Method"] },
                    { name: "Basic Technology", topics: ["Technical Drawing", "Woodwork", "Metalwork", "Electronics", "Auto Mechanics"] },
                    { name: "Social Studies", topics: ["Nigerian History", "Civics", "Geography", "Economics", "Social Issues"] },
                    { name: "Civic Education", topics: ["Democracy", "Human Rights", "Rule of Law", "Citizenship", "National Values"] },
                    { name: "Computer Studies/ICT", topics: ["Programming", "Web Design", "Database", "Networking", "Digital Literacy"] },
                    { name: "Cultural & Creative Arts", topics: ["Fine Arts", "Music", "Drama", "Nigerian Culture", "Crafts"] },
                    { name: "Physical & Health Education", topics: ["Sports", "Fitness", "Health Science", "First Aid", "Drug Education"] },
                    { name: "Home Economics", topics: ["Food & Nutrition", "Clothing & Textiles", "Home Management", "Child Development"] },
                    { name: "Agricultural Science", topics: ["Crop Production", "Animal Production", "Farm Management", "Agricultural Economics"] },
                    { name: "Business Studies", topics: ["Commerce", "Accounting Basics", "Office Practice", "Entrepreneurship"] },
                    { name: "French Language", topics: ["Basic French", "Grammar", "Conversation", "Reading", "Writing"] },
                    { name: "Arabic Language", topics: ["Arabic Alphabet", "Basic Grammar", "Reading", "Islamic Studies"] },
                    { name: "Religious Studies", topics: ["Christian Religious Studies", "Islamic Studies", "Moral Education"] }
                ]
            }
        ]
    },
    seniorSecondary: {
        title: "Senior Secondary School",
        subtitle: "SSS 1 - 3 (Ages 15-17)",
        color: "from-orange-500 to-red-500",
        icon: GraduationCap,
        classes: [
            {
                level: "SSS 1-3 (Arts & Humanities)",
                subjects: [
                    { name: "English Language", topics: ["Advanced Literature", "Critical Analysis", "Creative Writing", "Language Studies"] },
                    { name: "Literature in English", topics: ["Poetry", "Drama", "Prose", "African Literature", "Literary Criticism"] },
                    { name: "Government", topics: ["Political Systems", "Nigerian Government", "International Relations", "Public Administration"] },
                    { name: "Economics", topics: ["Microeconomics", "Macroeconomics", "Development Economics", "International Trade"] },
                    { name: "Geography", topics: ["Physical Geography", "Human Geography", "Map Reading", "Environmental Studies"] },
                    { name: "History", topics: ["Nigerian History", "African History", "World History", "Historiography"] },
                    { name: "Christian Religious Studies", topics: ["Bible Studies", "Church History", "Christian Ethics", "Theology"] },
                    { name: "Islamic Studies", topics: ["Quran", "Hadith", "Islamic History", "Islamic Jurisprudence"] },
                    { name: "French", topics: ["Advanced Grammar", "Literature", "Composition", "Oral French"] },
                    { name: "Arabic", topics: ["Advanced Grammar", "Literature", "Composition", "Islamic Texts"] },
                    { name: "Fine Arts", topics: ["Drawing", "Painting", "Sculpture", "Art History", "Graphic Design"] },
                    { name: "Music", topics: ["Music Theory", "Composition", "Performance", "Music History"] }
                ]
            },
            {
                level: "SSS 1-3 (Sciences)",
                subjects: [
                    { name: "English Language", topics: ["Technical Writing", "Scientific Reports", "Research Papers", "Communication"] },
                    { name: "Mathematics", topics: ["Calculus", "Further Mathematics", "Statistics", "Mechanics", "Probability"] },
                    { name: "Physics", topics: ["Mechanics", "Electricity", "Waves", "Modern Physics", "Thermodynamics"] },
                    { name: "Chemistry", topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Chemistry"] },
                    { name: "Biology", topics: ["Cell Biology", "Genetics", "Ecology", "Human Physiology", "Evolution"] },
                    { name: "Agricultural Science", topics: ["Crop Science", "Animal Science", "Soil Science", "Farm Management", "Agribusiness"] },
                    { name: "Further Mathematics", topics: ["Advanced Algebra", "Calculus", "Vectors", "Complex Numbers", "Mechanics"] },
                    { name: "Computer Science", topics: ["Programming", "Data Structures", "Algorithms", "Database Systems", "Software Engineering"] },
                    { name: "Technical Drawing", topics: ["Geometric Construction", "Orthographic Projection", "Isometric Drawing", "Building Plans"] },
                    { name: "Health Science", topics: ["Anatomy", "Physiology", "Public Health", "Nutrition", "Disease Prevention"] }
                ]
            },
            {
                level: "SSS 1-3 (Commercial/Business)",
                subjects: [
                    { name: "English Language", topics: ["Business Communication", "Report Writing", "Correspondence", "Presentations"] },
                    { name: "Mathematics", topics: ["Business Mathematics", "Statistics", "Financial Mathematics", "Quantitative Methods"] },
                    { name: "Commerce", topics: ["Trade", "Banking", "Insurance", "Transportation", "Warehousing"] },
                    { name: "Accounting", topics: ["Financial Accounting", "Cost Accounting", "Management Accounting", "Auditing"] },
                    { name: "Economics", topics: ["Business Economics", "Market Analysis", "Economic Policy", "Development Economics"] },
                    { name: "Business Studies", topics: ["Entrepreneurship", "Business Management", "Marketing", "Human Resource Management"] },
                    { name: "Office Practice", topics: ["Office Management", "Secretarial Duties", "Office Technology", "Business Ethics"] },
                    { name: "Data Processing", topics: ["Database Management", "Spreadsheets", "Business Software", "Data Analysis"] },
                    { name: "Insurance", topics: ["Principles of Insurance", "Types of Insurance", "Risk Management", "Claims Processing"] },
                    { name: "Marketing", topics: ["Marketing Principles", "Consumer Behavior", "Advertising", "Sales Management"] }
                ]
            },
            {
                level: "SSS 1-3 (Technical/Vocational)",
                subjects: [
                    { name: "English Language", topics: ["Technical Communication", "Documentation", "Safety Manuals", "Reports"] },
                    { name: "Mathematics", topics: ["Applied Mathematics", "Engineering Mathematics", "Technical Calculations"] },
                    { name: "Technical Drawing", topics: ["Engineering Drawing", "CAD", "Blueprint Reading", "Design"] },
                    { name: "Auto Mechanics", topics: ["Engine Systems", "Electrical Systems", "Maintenance", "Diagnostics"] },
                    { name: "Woodwork", topics: ["Carpentry", "Joinery", "Furniture Making", "Wood Finishing"] },
                    { name: "Metalwork", topics: ["Welding", "Fabrication", "Sheet Metal Work", "Machining"] },
                    { name: "Electrical Installation", topics: ["Wiring", "Circuit Design", "Safety", "Maintenance"] },
                    { name: "Electronics", topics: ["Circuit Analysis", "Digital Electronics", "Microcontrollers", "Repair"] },
                    { name: "Building Construction", topics: ["Masonry", "Concrete Work", "Plumbing", "Construction Management"] },
                    { name: "Printing", topics: ["Typography", "Graphic Design", "Print Production", "Digital Printing"] }
                ]
            }
        ]
    }
};

export default function NigeriaCurriculum() {
    const [selectedLevel, setSelectedLevel] = useState('primary');
    const [expandedSubject, setExpandedSubject] = useState(null);

    const currentData = curriculumData[selectedLevel];
    const Icon = currentData.icon;

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 dark:from-black dark:via-gray-900 dark:to-gray-900 py-12 lg:py-20 pb-24 lg:pb-12">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 mb-12 lg:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-500/10 border-2 border-green-300 dark:border-green-500/20">
                            <Sparkles size={16} className="text-green-600 dark:text-green-400" />
                            <span className="text-xs font-black uppercase tracking-wider text-green-700 dark:text-green-400">
                                Nigerian Education System
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white uppercase italic tracking-tight">
                            Nigeria <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Curriculum</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-400 max-w-3xl mx-auto font-medium">
                            Comprehensive overview of the Nigerian educational curriculum from Primary to Senior Secondary School
                        </p>
                    </motion.div>
                </div>

                {/* Level Selector */}
                <div className="max-w-7xl mx-auto px-6 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(curriculumData).map(([key, data]) => {
                            const LevelIcon = data.icon;
                            return (
                                <motion.button
                                    key={key}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        setSelectedLevel(key);
                                        setExpandedSubject(null);
                                    }}
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

                {/* Curriculum Content */}
                <div className="max-w-7xl mx-auto px-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedLevel}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {currentData.classes.map((classData, classIndex) => (
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
                                                                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                                                    {subject.topics.length} Topics
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
                                                                <div className="p-6 bg-white dark:bg-gray-900 border-t-2 border-gray-300 dark:border-gray-800">
                                                                    <h4 className="text-sm font-black text-gray-700 dark:text-gray-400 uppercase tracking-wider mb-4">
                                                                        Topics Covered:
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                                        {subject.topics.map((topic, topicIndex) => (
                                                                            <div
                                                                                key={topicIndex}
                                                                                className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 border border-blue-200 dark:border-gray-700"
                                                                            >
                                                                                <ChevronRight size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                                                                <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                                                                                    {topic}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
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
