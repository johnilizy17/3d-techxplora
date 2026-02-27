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

    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-24">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 tracking-tight font-['Bricolage_Grotesque']">
                    Questions & Answers
                </h2>

                {/* Premium Toggle Switch */}
                <div className="inline-flex p-1.5 bg-card backdrop-blur-xl border border-border rounded-2xl mb-8">
                    <button
                        onClick={() => setActiveTab('students')}
                        className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'students'
                            ? 'bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] shadow-lg scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Students/Teachers
                    </button>
                    <button
                        onClick={() => setActiveTab('sponsors')}
                        className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'sponsors'
                            ? 'bg-gradient-to-r from-[#c7aff8] to-[#ffb585] text-[#0a0a0a] shadow-lg scale-[1.02]'
                            : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Sponsors/Partners
                    </button>
                </div>
                <p className="text-muted-foreground text-lg font-light tracking-wide max-w-2xl mx-auto">
                    {activeTab === 'students'
                        ? "Everything you need to know about using TechXplora!"
                        : "How your company can help students learn and grow."}
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {currentFaqs.map((faq, index) => (
                    <AccordionItem
                        key={`${activeTab}-${index}`}
                        value={`item-${index}`}
                        className="border border-border rounded-2xl px-6 bg-card hover:bg-accent data-[state=open]:bg-accent data-[state=open]:border-[#a6b1ff]/20 transition-all duration-300"
                    >
                        <AccordionTrigger className="text-foreground hover:text-[#a6b1ff] text-lg font-semibold py-6 text-left hover:no-underline transition-colors group">
                            <span className="group-data-[state=open]:text-[#a6b1ff] transition-colors">
                                {faq.question}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6 font-light">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
