import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hi! I am your AI assistant. How can I help you regarding your courses or quiz today?' }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");

        // Simulate AI response
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: "That's an interesting question! I'm still in beta, but I'm learning more every day."
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <>

            {/* Floating Trigger Button */}
            <div className="absolute bottom-full mb-4 right-0 z-50">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="h-14 w-14 rounded-full bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] flex items-center justify-center shadow-lg border border-white/20 relative group"
                >
                    {isOpen ? (
                        <X className="text-white" />
                    ) : (
                        <>
                            <Bot className="text-white h-7 w-7" />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                            </span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-[calc(100%+5rem)] right-0 z-50 w-80 rounded-3xl bg-[#1a1520]/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden origin-bottom-right"
                    >
                        {/* Header */}
                        <div className="h-16 bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] p-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
                                <Bot className="text-white h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">AI Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                                    <span className="text-purple-100 text-xs text-opacity-80">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="h-80 bg-[#0a0a0a]/50 p-4 overflow-y-auto flex flex-col gap-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {msg.type === 'bot' && (
                                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#5b21b6] to-[#7c3aed] flex-shrink-0 flex items-center justify-center text-xs text-white border border-white/10">
                                            <Bot size={16} />
                                        </div>
                                    )}

                                    <div
                                        className={`rounded-2xl p-3 text-sm max-w-[80%] ${msg.type === 'user'
                                            ? 'bg-[#7c3aed] text-white rounded-br-none'
                                            : 'bg-white/10 text-gray-200 rounded-bl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSend} className="p-4 bg-[#1a1520] border-t border-white/5">
                            <div className="relative">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="bg-black/20 border-white/10 text-white rounded-xl pr-12 focus:border-[#7c3aed] focus:ring-[#7c3aed]/20"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-1 top-1 h-8 w-8 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-lg text-white"
                                    disabled={!inputValue.trim()}
                                >
                                    <Send size={16} />
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
