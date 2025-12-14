import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "What is TechXplora?",
        answer: "TechXplora is an interactive e-learning platform designed to help students learn through quizzes, leaderboards, groups, and personalized study tools."
    },
    {
        question: "How do I start using TechXplora?",
        answer: "Create an account by clicking the Sign Up button, then log in to access quizzes, your dashboard, and learning resources."
    },
    {
        question: "Is TechXplora free?",
        answer: "Yes, basic registration is free. You can start learning and engaging with quizzes and groups right away."
    },
    {
        question: "Can I track my progress?",
        answer: "Yes! TechXplora includes a dashboard and XP (experience) history so you can monitor your learning progress over time."
    },
    {
        question: "What learning tools are available?",
        answer: "You’ll find quizzes, syllabus tracking, group study features, and a leaderboard to gamify your learning experience."
    },
    {
        question: "Who can use TechXplora?",
        answer: "TechXplora is designed for students, educators, and lifelong learners looking for interactive educational tools."
    },
    {
        question: "How do I reset my password if I forget it?",
        answer: "On the login screen, use the 'Forgot Password' link to receive instructions via email to reset your password."
    },
    {
        question: "Can I interact with other learners?",
        answer: "Yes — you can join groups and participate in collaborative learning activities and discussions."
    },
    {
        question: "Is my data secure?",
        answer: "Yes. We follow standard security practices to protect your personal information and learning records."
    },
    {
        question: "Where can I get help if I have issues?",
        answer: "Contact our support team through the support page or email provided in the site footer for any help with your account or platform features."
    }
];


export default function FAQ() {
    return (
        <div className="w-full max-w-3xl mx-auto px-6 py-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">
                Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border border-white/10 rounded-lg px-4 bg-white/5 data-[state=open]:bg-white/10 transition-colors"
                    >
                        <AccordionTrigger className="text-white hover:text-[#a8d8ff] text-lg font-medium text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-300 text-base leading-relaxed pb-4">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
