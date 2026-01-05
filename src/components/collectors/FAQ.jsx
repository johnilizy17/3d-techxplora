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
        answer: "TechXplora is a gamified learning platform where students learn by playing quizzes and challenges, earning rewards, and tracking progress over time."
    },
    {
        question: "2. How do I start using TechXplora?",
        answer: "Click Sign Up, create your account, then start a quiz or join a challenge using a code from your school or teacher."
    },
    {
        question: "3. Is TechXplora free?",
        answer: "Yes, you can get started for free. Some school or sponsor-led challenges may include extra features or rewards."
    },
    {
        question: "4. Can I track my progress?",
        answer: "Yes. Your dashboard shows your XP history, performance, and progress so you can see how you’re improving."
    },
    {
        question: "5. What learning tools are available?",
        answer: "Quizzes, challenges, leaderboards, and your progress dashboard, plus other learning modes (like Courses/Chess) where available."
    },
    {
        question: "6. Who can use TechXplora?",
        answer: "Students, teachers, and schools; and partners/sponsors who want to run challenges and support learning outcomes."
    },
    {
        question: "7. How do I reset my password if I forget it?",
        answer: "On the sign-in page, click Forgot Password and follow the instructions sent to your email."
    },
    {
        question: "8. Can I interact with other learners?",
        answer: "Yes, through shared challenges and leaderboards with classmates and other learners. (Community features may vary by school/cohort.)"
    },
    {
        question: "9. Is my data secure?",
        answer: "Yes. We use standard security practices to protect your account and learning records."
    },
    {
        question: "10. Where can I get help if I have issues?",
        answer: "Use the support option on the platform or contact us via the email in the website footer. If you’re in a school cohort, your teacher can also help."
    }
];

const sponsorFaqs = [
    {
        question: "1. What does it mean to sponsor a TechXplora challenge?",
        answer: "Sponsoring a challenge means funding or supporting a learning competition that students participate in through quizzes and gamified tasks, with measurable engagement results."
    },
    {
        question: "2. What do sponsors get in return?",
        answer: "Sponsors get visibility (where agreed), measurable participation metrics, and a clear impact story they can use for CSR, community engagement, or brand campaigns."
    },
    {
        question: "3. What impact metrics can sponsors receive?",
        answer: "Depending on the challenge setup, you can receive metrics like: number of participants, quiz attempts, completion rates, engagement over time, leaderboard activity, and school/cohort participation summaries."
    },
    {
        question: "4. How do we launch a sponsored challenge?",
        answer: "It’s simple: choose a challenge theme → set duration and rewards → we onboard partner schools/cohorts → the challenge goes live with a leaderboard and reporting."
    },
    {
        question: "5. Can sponsors choose the topic or learning goal?",
        answer: "Yes. Sponsors can align challenges with approved themes (e.g., digital skills, STEM, safety, climate, entrepreneurship) while keeping content school-appropriate."
    },
    {
        question: "6. How much does it cost to sponsor a challenge?",
        answer: "Costs depend on the number of schools/cohorts, duration, and reward structure. Contact us for a sponsorship package and a quick proposal."
    },
    {
        question: "7. How do you ensure child safety and responsible brand placement?",
        answer: "We prioritise student safety and school standards. Sponsor visibility follows clear rules and is designed to be age-appropriate, non-intrusive, and education-first."
    },
    {
        question: "8. Can a sponsor run challenges across multiple schools or regions?",
        answer: "Yes. Challenges can be run by class, school, or multi-school leagues depending on the rollout plan."
    },
    {
        question: "9. Do sponsors get access to student personal data?",
        answer: "No. Sponsors receive aggregated reporting for impact measurement, not individual student personal data."
    },
    {
        question: "10. How do we partner with TechXplora?",
        answer: "Click Partner with Us (or contact the email in the footer) and we’ll schedule a short call to understand your goals and share the next steps."
    }
];

export default function FAQ() {
    const [activeTab, setActiveTab] = useState('students'); // 'students' or 'sponsors'
    const currentFaqs = activeTab === 'students' ? studentFaqs : sponsorFaqs;

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight font-['Bricolage_Grotesque']">
                    Frequently Asked Questions
                </h2>

                {/* Premium Toggle Switch */}
                <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-8">
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'students'
                            ? 'bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] shadow-lg scale-[1.02]'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Students/Teachers
                    </button>
                    <button
                        onClick={() => setActiveTab('sponsors')}
                        className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'sponsors'
                            ? 'bg-gradient-to-r from-[#c7aff8] to-[#ffb585] text-[#0a0a0a] shadow-lg scale-[1.02]'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Sponsors/Partners
                    </button>
                </div>
                <p className="text-gray-400 text-lg font-light tracking-wide max-w-2xl mx-auto">
                    {activeTab === 'students'
                        ? "Everything you need to know about using TechXplora for learning."
                        : "How your organization can drive impact and engage with students."}
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {currentFaqs.map((faq, index) => (
                    <AccordionItem
                        key={`${activeTab}-${index}`}
                        value={`item-${index}`}
                        className="border border-white/5 rounded-2xl px-6 bg-white/5 hover:bg-white/[0.07] data-[state=open]:bg-white/[0.08] data-[state=open]:border-white/20 transition-all duration-300"
                    >
                        <AccordionTrigger className="text-white hover:text-[#a6b1ff] text-lg font-semibold py-6 text-left hover:no-underline transition-colors group">
                            <span className="group-data-[state=open]:text-[#a6b1ff] transition-colors">
                                {faq.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6 font-light">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
