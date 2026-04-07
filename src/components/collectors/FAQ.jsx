import React, { useState } from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const studentFaqs = [
    {
        question: "1. What is TechXplora?",
        answer: "TechXplora is a fun learning app where you play quizzes, earn rewards, and see how you're improving!"
    },
    {
        question: "2. How do I start?",
        answer: "Click Sign Up, create your account, then start a quiz or enter a code from your teacher to join a challenge."
    },
    {
        question: "3. Is it free?",
        answer: "Yes! You can start playing for free. Some special challenges from schools might have extra prizes."
    },
    {
        question: "4. Can I see my progress?",
        answer: "Yes! Your dashboard shows your points, how well you're doing, and how much you're improving."
    },
    {
        question: "5. What can I do on TechXplora?",
        answer: "You can play quizzes, join challenges, compete with friends on leaderboards, and even play chess!"
    },
    {
        question: "6. Who can use TechXplora?",
        answer: "Students, teachers, and schools can use it. Companies can also create fun challenges to help students learn."
    },
    {
        question: "7. What if I forget my password?",
        answer: "On the sign-in page, click 'Forgot Password' and we'll send you an email to reset it."
    },
    {
        question: "8. Can I play with my friends?",
        answer: "Yes! You can see your friends on leaderboards and join the same challenges together."
    },
    {
        question: "9. Is my information safe?",
        answer: "Yes! We keep your account and information secure and private."
    },
    {
        question: "10. What if I need help?",
        answer: "Click the support button on the website, or ask your teacher if you're in a school group."
    }
];

const sponsorFaqs = [
    {
        question: "1. What does it mean to sponsor a challenge?",
        answer: "It means you help create a fun learning competition for students. You provide support, and students play quizzes to learn and win prizes!"
    },
    {
        question: "2. What do sponsors get?",
        answer: "You get to see how many students joined, how they did, and the positive impact you made on their learning."
    },
    {
        question: "3. What information can sponsors see?",
        answer: "You can see: how many students played, how many questions they answered, completion rates, and which schools participated."
    },
    {
        question: "4. How do we start a challenge?",
        answer: "It's easy! Pick a topic → decide how long it runs → we invite schools to join → the challenge starts with scores and prizes!"
    },
    {
        question: "5. Can we choose what students learn about?",
        answer: "Yes! You can pick topics like science, math, safety, environment, or technology - anything that helps students learn."
    },
    {
        question: "6. How much does it cost?",
        answer: "It depends on how many schools join and how long the challenge runs. Contact us and we'll create a plan for you!"
    },
    {
        question: "7. Is it safe for children?",
        answer: "Yes! We make sure everything is safe and appropriate for students. Your brand appears in a friendly, educational way."
    },
    {
        question: "8. Can we work with many schools?",
        answer: "Yes! Challenges can be for one class, one school, or many schools across different areas."
    },
    {
        question: "9. Do sponsors see student names?",
        answer: "No. You only see overall numbers and results, not individual student information."
    },
    {
        question: "10. How do we become a partner?",
        answer: "Click 'Partner with Us' or email us, and we'll set up a quick call to discuss how we can work together!"
    }
];

export default function FAQ() {
    const [activeTab, setActiveTab] = useState('students'); // 'students' or 'sponsors'
    const currentFaqs = activeTab === 'students' ? studentFaqs : sponsorFaqs;

    // Bold colorful alternating color schemes for FAQ items
    const colorSchemes = [
        {
            // Blue theme - bold and vibrant
            lightBg: "from-blue-200 to-indigo-200",
            lightBorder: "border-blue-500",
            lightHover: "hover:from-blue-300 hover:to-indigo-300 hover:border-blue-600",
            lightOpenBg: "data-[state=open]:from-blue-300 data-[state=open]:to-indigo-300",
            lightOpenBorder: "data-[state=open]:border-blue-700",
            darkBg: "dark:from-blue-900/50 dark:to-indigo-900/50",
            darkBorder: "dark:border-blue-500/50",
            darkHover: "dark:hover:from-blue-800/60 dark:hover:to-indigo-800/60 dark:hover:border-blue-400",
            darkOpenBg: "dark:data-[state=open]:from-blue-800/70 dark:data-[state=open]:to-indigo-800/70",
            darkOpenBorder: "dark:data-[state=open]:border-blue-400",
            textColor: "text-blue-950 font-black",
            hoverText: "hover:text-blue-900",
            openText: "group-data-[state=open]:text-blue-900",
            darkTextColor: "dark:text-blue-100 dark:font-black",
            darkHoverText: "dark:hover:text-blue-50",
            darkOpenText: "dark:group-data-[state=open]:text-blue-50",
            contentText: "text-blue-950 font-extrabold",
            darkContentText: "dark:text-blue-50 dark:font-extrabold"
        },
        {
            // Purple theme - bold and vibrant
            lightBg: "from-purple-200 to-pink-200",
            lightBorder: "border-purple-500",
            lightHover: "hover:from-purple-300 hover:to-pink-300 hover:border-purple-600",
            lightOpenBg: "data-[state=open]:from-purple-300 data-[state=open]:to-pink-300",
            lightOpenBorder: "data-[state=open]:border-purple-700",
            darkBg: "dark:from-purple-900/50 dark:to-pink-900/50",
            darkBorder: "dark:border-purple-500/50",
            darkHover: "dark:hover:from-purple-800/60 dark:hover:to-pink-800/60 dark:hover:border-purple-400",
            darkOpenBg: "dark:data-[state=open]:from-purple-800/70 dark:data-[state=open]:to-pink-800/70",
            darkOpenBorder: "dark:data-[state=open]:border-purple-400",
            textColor: "text-purple-950 font-black",
            hoverText: "hover:text-purple-900",
            openText: "group-data-[state=open]:text-purple-900",
            darkTextColor: "dark:text-purple-100 dark:font-black",
            darkHoverText: "dark:hover:text-purple-50",
            darkOpenText: "dark:group-data-[state=open]:text-purple-50",
            contentText: "text-purple-950 font-extrabold",
            darkContentText: "dark:text-purple-50 dark:font-extrabold"
        },
        {
            // Emerald theme - bold and vibrant
            lightBg: "from-emerald-200 to-teal-200",
            lightBorder: "border-emerald-500",
            lightHover: "hover:from-emerald-300 hover:to-teal-300 hover:border-emerald-600",
            lightOpenBg: "data-[state=open]:from-emerald-300 data-[state=open]:to-teal-300",
            lightOpenBorder: "data-[state=open]:border-emerald-700",
            darkBg: "dark:from-emerald-900/50 dark:to-teal-900/50",
            darkBorder: "dark:border-emerald-500/50",
            darkHover: "dark:hover:from-emerald-800/60 dark:hover:to-teal-800/60 dark:hover:border-emerald-400",
            darkOpenBg: "dark:data-[state=open]:from-emerald-800/70 dark:data-[state=open]:to-teal-800/70",
            darkOpenBorder: "dark:data-[state=open]:border-emerald-400",
            textColor: "text-emerald-950 font-black",
            hoverText: "hover:text-emerald-900",
            openText: "group-data-[state=open]:text-emerald-900",
            darkTextColor: "dark:text-emerald-100 dark:font-black",
            darkHoverText: "dark:hover:text-emerald-50",
            darkOpenText: "dark:group-data-[state=open]:text-emerald-50",
            contentText: "text-emerald-950 font-extrabold",
            darkContentText: "dark:text-emerald-50 dark:font-extrabold"
        },
        {
            // Amber theme - bold and vibrant
            lightBg: "from-amber-200 to-orange-200",
            lightBorder: "border-amber-500",
            lightHover: "hover:from-amber-300 hover:to-orange-300 hover:border-amber-600",
            lightOpenBg: "data-[state=open]:from-amber-300 data-[state=open]:to-orange-300",
            lightOpenBorder: "data-[state=open]:border-amber-700",
            darkBg: "dark:from-amber-900/50 dark:to-orange-900/50",
            darkBorder: "dark:border-amber-500/50",
            darkHover: "dark:hover:from-amber-800/60 dark:hover:to-orange-800/60 dark:hover:border-amber-400",
            darkOpenBg: "dark:data-[state=open]:from-amber-800/70 dark:data-[state=open]:to-orange-800/70",
            darkOpenBorder: "dark:data-[state=open]:border-amber-400",
            textColor: "text-amber-950 font-black",
            hoverText: "hover:text-amber-900",
            openText: "group-data-[state=open]:text-amber-900",
            darkTextColor: "dark:text-amber-100 dark:font-black",
            darkHoverText: "dark:hover:text-amber-50",
            darkOpenText: "dark:group-data-[state=open]:text-amber-50",
            contentText: "text-amber-950 font-extrabold",
            darkContentText: "dark:text-amber-50 dark:font-extrabold"
        },
        {
            // Rose theme - bold and vibrant
            lightBg: "from-rose-200 to-pink-200",
            lightBorder: "border-rose-500",
            lightHover: "hover:from-rose-300 hover:to-pink-300 hover:border-rose-600",
            lightOpenBg: "data-[state=open]:from-rose-300 data-[state=open]:to-pink-300",
            lightOpenBorder: "data-[state=open]:border-rose-700",
            darkBg: "dark:from-rose-900/50 dark:to-pink-900/50",
            darkBorder: "dark:border-rose-500/50",
            darkHover: "dark:hover:from-rose-800/60 dark:hover:to-pink-800/60 dark:hover:border-rose-400",
            darkOpenBg: "dark:data-[state=open]:from-rose-800/70 dark:data-[state=open]:to-pink-800/70",
            darkOpenBorder: "dark:data-[state=open]:border-rose-400",
            textColor: "text-rose-950 font-black",
            hoverText: "hover:text-rose-900",
            openText: "group-data-[state=open]:text-rose-900",
            darkTextColor: "dark:text-rose-100 dark:font-black",
            darkHoverText: "dark:hover:text-rose-50",
            darkOpenText: "dark:group-data-[state=open]:text-rose-50",
            contentText: "text-rose-950 font-extrabold",
            darkContentText: "dark:text-rose-50 dark:font-extrabold"
        }
    ];

    return (
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight font-['Bricolage_Grotesque'] drop-shadow-sm">
                    Questions & Answers
                </h2>

                {/* Premium Toggle Switch */}
                <div className="inline-flex p-1.5 bg-card backdrop-blur-xl border border-border rounded-2xl mb-8">
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'students'
                            ? 'bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] shadow-lg scale-[1.02]'
                            : 'text-gray-700 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground'
                            }`}
                    >
                        Students/Teachers
                    </button>
                    <button
                        onClick={() => setActiveTab('sponsors')}
                        className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'sponsors'
                            ? 'bg-gradient-to-r from-[#c7aff8] to-[#ffb585] text-[#0a0a0a] shadow-lg scale-[1.02]'
                            : 'text-gray-700 dark:text-muted-foreground hover:text-gray-900 dark:hover:text-foreground'
                            }`}
                    >
                        Sponsors/Partners
                    </button>
                </div>
                <p className="text-gray-800 dark:text-gray-200 text-lg font-bold tracking-wide max-w-2xl mx-auto">
                    {activeTab === 'students'
                        ? "Everything you need to know about using TechXplora!"
                        : "How your company can help students learn and grow."}
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {currentFaqs.map((faq, index) => {
                    // Cycle through color schemes
                    const colorScheme = colorSchemes[index % colorSchemes.length];
                    
                    return (
                        <AccordionItem
                            key={`${activeTab}-${index}`}
                            value={`item-${index}`}
                            className={`border-2 ${colorScheme.lightBorder} ${colorScheme.darkBorder} rounded-2xl px-6 bg-gradient-to-br ${colorScheme.lightBg} ${colorScheme.darkBg} ${colorScheme.lightHover} ${colorScheme.darkHover} ${colorScheme.lightOpenBg} ${colorScheme.darkOpenBg} ${colorScheme.lightOpenBorder} ${colorScheme.darkOpenBorder} transition-all duration-300 shadow-lg hover:shadow-xl`}
                        >
                            <AccordionTrigger className={`${colorScheme.textColor} ${colorScheme.darkTextColor} ${colorScheme.hoverText} ${colorScheme.darkHoverText} text-lg py-6 text-left hover:no-underline transition-colors group uppercase italic tracking-tight`}>
                                <span className={`${colorScheme.openText} ${colorScheme.darkOpenText} transition-colors`}>
                                    {faq.question}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className={`${colorScheme.contentText} ${colorScheme.darkContentText} text-base leading-relaxed pb-6`}>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
}
