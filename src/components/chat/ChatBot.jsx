import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, MessageSquare, Bot, User, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import MessageText from './MessageText';
import TiltCard from '../ui/TiltCard';
import { cn } from '@/lib/utils';

// Fallback AI logic or integration with your preferred service
import { model } from '@/utils/firebase';

const generateResponse = async (userInput) => {
    try {
        const result = await model.generateContent([
            {
                text: `You are TechXplora AI, a helpful AI tutor. 
                       You only answer questions related to school subjects such as math, science, history, and literature.
                       If a user asks something unrelated, politely say:
                       "Sorry, I only help with school subjects."`
            },
            { text: userInput }
        ]);

        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("AI Generation Error:", error);
        throw error;
    }
};

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hello! I'm **Xplora AI**, your personalized assistant. How can I help you with your studies today?",
            timestamp: new Date(),
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isLoading, isOpen, scrollToBottom]);

    const handleSendMessage = async (e, customMessage) => {
        e?.preventDefault();
        const inputToUse = customMessage || message;
        if (!inputToUse.trim() || isLoading) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputToUse,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMsg]);
        if (!customMessage) setMessage('');
        setIsLoading(true);

        try {
            const responseText = await generateResponse(inputToUse);
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: responseText,
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: "I'm having a bit of trouble connecting right now. Could you try again in a moment?",
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickActions = [
        "Explain photosynthesis",
        "Linear Equations help",
        "World War II overview",
        "What is a metaphor?"
    ];

    return (
        <div className="fixed bottom-[104px] md:bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <div className="pointer-events-auto flex flex-col items-end">
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10, rotateY: -10, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
                            exit={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10, rotateY: -10 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                            style={{ perspective: 1000 }}
                            className="mb-4 w-[380px] h-[550px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <Bot size={22} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-sm">Xplora AI</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] text-white/50 uppercase tracking-wider font-medium">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={cn(
                                            "flex gap-3",
                                            msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                            msg.sender === 'user' ? "bg-purple-500" : "bg-blue-500"
                                        )}>
                                            {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div className={cn(
                                            "max-w-[80%] p-3 rounded-2xl text-sm",
                                            msg.sender === 'user'
                                                ? "bg-purple-600 text-white rounded-tr-none"
                                                : "bg-white/5 border border-white/10 text-white rounded-tl-none"
                                        )}>
                                            {msg.sender === 'bot' ? (
                                                <MessageText text={msg.text} scrollUp={scrollToBottom} />
                                            ) : (
                                                <p>{msg.text}</p>
                                            )}
                                            <span className="text-[10px] opacity-40 mt-1 block">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                                            <Bot size={16} />
                                        </div>
                                        <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                            <div className="flex gap-1">
                                                {[0, 1, 2].map((i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                                                        className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {messages.length < 3 && !isLoading && (
                                    <div className="flex flex-wrap gap-2 pt-2 justify-center">
                                        {quickActions.map((action) => (
                                            <button
                                                key={action}
                                                type="button"
                                                onClick={() => handleSendMessage(null, action)}
                                                className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white/70 transition-all hover:border-blue-500/50"
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSendMessage} className="p-4 bg-white/5 border-t border-white/10">
                                <div className="relative flex items-center gap-2">
                                    <button type="button" className="p-2 text-white/40 hover:text-blue-400 transition-colors">
                                        <Mic size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Ask anything studying related..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                    <button
                                        disabled={!message.trim() || isLoading}
                                        className="p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 rounded-xl text-white transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Floating Toggle Button */}
                <TiltCard>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "group flex items-center gap-2 px-6 py-3 rounded-2xl shadow-2xl transition-all duration-300",
                            isOpen ? "bg-red-500 shadow-red-500/20" : "bg-blue-600 shadow-blue-600/20"
                        )}
                    >
                        <div className="relative">
                            {isOpen ? <X size={22} /> : <Sparkles size={22} className="animate-pulse" />}
                            {!isOpen && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                            )}
                        </div>
                        <span className="font-semibold tracking-wide text-sm">
                            {isOpen ? "Close Chat" : "Ask Xplora AI"}
                        </span>
                    </motion.button>
                </TiltCard>
            </div>
        </div>
    );
};

export default ChatBot;
