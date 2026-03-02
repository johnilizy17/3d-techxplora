import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, X, Bot, User, Sparkles, MessageCircle, Headphones } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import MessageText from './MessageText';
import TiltCard from '../ui/TiltCard';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

// OpenAI ChatGPT Integration
const generateResponse = async (userInput, conversationHistory = []) => {
    try {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        
        if (!apiKey) {
            throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your .env file.');
        }

        // Build messages array with conversation history
        const messages = [
            {
                role: "system",
                content: `You are ChatGPT, a friendly learning helper for students using TechXplora. 
                         You help students with school subjects like math, science, history, reading, and homework questions.
                         Use simple, easy-to-understand language that kids can follow.
                         Be encouraging and positive! Make learning fun.
                         If someone asks about something not related to school or learning, kindly remind them you're here to help with schoolwork.
                         Keep your answers short and clear - no more than 3-4 sentences.`
            },
            ...conversationHistory,
            {
                role: "user",
                content: userInput
            }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
                messages: messages,
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Failed to get response from ChatGPT');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("ChatGPT API Error:", error);
        throw error;
    }
};

const ChatBot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode } = useTheme();
    
    // Hide ChatBot on course detail pages (e.g., /courses/18)
    const isCourseDetailPage = /^\/courses\/\d+/.test(location.pathname);
    
    // Check if current page is a dashboard page (has sidebar navigation)
    const isDashboardPage = location.pathname.startsWith('/dashboard') || 
                           location.pathname.startsWith('/courses') ||
                           location.pathname.startsWith('/quizzes') ||
                           location.pathname.startsWith('/syllabus') ||
                           location.pathname.startsWith('/groups') ||
                           location.pathname.startsWith('/profile') ||
                           location.pathname.startsWith('/settings') ||
                           location.pathname.startsWith('/support') ||
                           location.pathname.startsWith('/history') ||
                           location.pathname.startsWith('/analytics');
    
    const [showModal, setShowModal] = useState(false);
    const [chatMode, setChatMode] = useState(null); // 'ai' or 'support'
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
    const messagesEndRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isLoading, isOpen, scrollToBottom]);

    const handleModeSelection = (mode) => {
        setShowModal(false);
        
        if (mode === 'ai') {
            setChatMode(mode);
            setMessages([{
                id: 1,
                sender: 'bot',
                text: "Hello! I'm **Xplora AI**, your personalized assistant. How can I help you with your studies today?",
                timestamp: new Date(),
            }]);
            setIsOpen(true);
        } else if (mode === 'support') {
            navigate('/support');
        }
    };

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
            if (chatMode === 'ai') {
                // Build conversation history for ChatGPT (exclude the welcome message)
                const conversationHistory = messages
                    .filter(msg => msg.id !== 1) // Exclude initial welcome message
                    .map(msg => ({
                        role: msg.sender === 'user' ? 'user' : 'assistant',
                        content: msg.text
                    }));

                const responseText = await generateResponse(inputToUse, conversationHistory);
                const botMsg = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: responseText,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, botMsg]);
            } else if (chatMode === 'support') {
                // TODO: Integrate with your support API
                const botMsg = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: "Thank you for your message. A support representative will respond shortly. In the meantime, you can check our FAQ section.",
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, botMsg]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            const errorMessage = error.message.includes('API key') 
                ? "ChatGPT isn't set up yet. Please ask a teacher or contact support!"
                : "Oops! I'm having trouble connecting right now. Can you try again in a moment?";
            
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'bot',
                text: errorMessage,
                timestamp: new Date(),
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickActions = [
        "How does photosynthesis work?",
        "Help me with fractions",
        "Tell me about World War 2",
        "What is a metaphor?"
    ];

    const handleButtonClick = () => {
        if (isOpen) {
            setIsOpen(false);
            setChatMode(null);
        } else {
            setShowModal(true);
        }
    };

    // Don't render ChatBot on course detail pages
    if (isCourseDetailPage) {
        return null;
    }

    return (
        <div className={cn(
            "fixed z-50 flex flex-col items-end pointer-events-none",
            isDashboardPage 
                ? "bottom-[104px] md:bottom-6 right-6" // Floating position for dashboard pages
                : "bottom-[15px] right-0 left-0 md:left-auto md:right-6 md:bottom-6" // Bottom attached for non-dashboard pages with 15px spacing
        )}>
            <div className={cn(
                "pointer-events-auto flex flex-col items-end",
                !isDashboardPage && "w-full md:w-auto"
            )}>
                {/* Modal for Mode Selection */}
                <AnimatePresence>
                    {showModal && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60]"
                            onClick={() => setShowModal(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                    "backdrop-blur-xl border rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl",
                                    darkMode ? "bg-black/90 border-white/10" : "bg-white/95 border-gray-200"
                                )}
                            >
                                <div className="text-center mb-6">
                                    <h2 className="text-2xl font-bold text-foreground mb-2">How can we help you?</h2>
                                    <p className="text-muted-foreground text-sm">Choose what you need help with!</p>
                                </div>

                                <div className="space-y-4">
                                    {/* AI Assistant Option */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleModeSelection('ai')}
                                        className="w-full p-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 border border-blue-500/30 rounded-2xl transition-all group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                                                <Sparkles size={24} className="text-white" />
                                            </div>
                                            <div className="text-left flex-1">
                                                <h3 className="text-lg font-semibold text-foreground mb-1">Xplora AI Assistant</h3>
                                                <p className="text-muted-foreground text-sm">Get instant AI-powered help with your studies, homework, and learning questions.</p>
                                            </div>
                                        </div>
                                    </motion.button>

                                    {/* Support Chat Option */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleModeSelection('support')}
                                        className="w-full p-6 bg-gradient-to-br from-green-600/20 to-teal-600/20 hover:from-green-600/30 hover:to-teal-600/30 border border-green-500/30 rounded-2xl transition-all group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center shrink-0 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 transition-shadow">
                                                <Headphones size={24} className="text-white" />
                                            </div>
                                            <div className="text-left flex-1">
                                                <h3 className="text-lg font-semibold text-foreground mb-1">Get Support</h3>
                                                <p className="text-muted-foreground text-sm">Talk to our team for help with your account or technical problems.</p>
                                            </div>
                                        </div>
                                    </motion.button>
                                </div>

                                <button
                                    onClick={() => setShowModal(false)}
                                    className="mt-6 w-full py-3 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10, rotateY: -10, transformOrigin: 'bottom right' }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }}
                            exit={{ opacity: 0, y: 30, scale: 0.9, rotateX: 10, rotateY: -10 }}
                            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                            style={{ perspective: 1000 }}
                            className={cn(
                                "mb-4 w-[380px] h-[550px] backdrop-blur-xl border rounded-3xl shadow-2xl overflow-hidden flex flex-col",
                                darkMode ? "bg-black/80 border-white/10" : "bg-white/95 border-gray-200"
                            )}
                        >
                            {/* Header */}
                            <div className={cn(
                                "p-4 border-b flex items-center justify-between",
                                darkMode ? "border-white/10" : "border-gray-200",
                                chatMode === 'ai' 
                                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20"
                                    : "bg-gradient-to-r from-green-600/20 to-teal-600/20"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center shadow-lg",
                                        chatMode === 'ai' 
                                            ? "bg-blue-500 shadow-blue-500/20"
                                            : "bg-green-500 shadow-green-500/20"
                                    )}>
                                        {chatMode === 'ai' ? (
                                            <Bot size={22} className="text-white" />
                                        ) : (
                                            <Headphones size={22} className="text-white" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground text-sm">
                                            {chatMode === 'ai' ? 'Xplora AI Assistant' : 'Xplora Support'}
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "p-2 rounded-full transition-colors",
                                        darkMode ? "hover:bg-white/10 text-white/70" : "hover:bg-gray-100 text-gray-600"
                                    )}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {messages.map((msg) => (
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
                                            msg.sender === 'user' 
                                                ? "bg-purple-500" 
                                                : chatMode === 'ai' ? "bg-blue-500" : "bg-green-500"
                                        )}>
                                            {msg.sender === 'user' ? (
                                                <User size={16} />
                                            ) : chatMode === 'ai' ? (
                                                <Bot size={16} />
                                            ) : (
                                                <Headphones size={16} />
                                            )}
                                        </div>
                                        <div className={cn(
                                            "max-w-[80%] p-3 rounded-2xl text-sm",
                                            msg.sender === 'user'
                                                ? "bg-purple-600 text-white rounded-tr-none"
                                                : darkMode 
                                                    ? "bg-white/5 border border-white/10 text-white rounded-tl-none"
                                                    : "bg-gray-100 border border-gray-200 text-gray-900 rounded-tl-none"
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
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                            chatMode === 'ai' ? "bg-blue-500" : "bg-green-500"
                                        )}>
                                            {chatMode === 'ai' ? <Bot size={16} /> : <Headphones size={16} />}
                                        </div>
                                        <div className={cn(
                                            "p-4 rounded-2xl rounded-tl-none",
                                            darkMode ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"
                                        )}>
                                            <div className="flex gap-1">
                                                {[0, 1, 2].map((i) => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ y: [0, -5, 0] }}
                                                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                                                        className={cn(
                                                            "w-1.5 h-1.5 rounded-full",
                                                            chatMode === 'ai' ? "bg-blue-400" : "bg-green-400"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {messages.length < 3 && !isLoading && chatMode === 'ai' && (
                                    <div className="flex flex-wrap gap-2 pt-2 justify-center">
                                        {quickActions.map((action) => (
                                            <button
                                                key={action}
                                                type="button"
                                                onClick={() => handleSendMessage(null, action)}
                                                className={cn(
                                                    "px-3 py-1.5 border rounded-full text-xs transition-all hover:border-blue-500/50",
                                                    darkMode 
                                                        ? "bg-white/5 hover:bg-white/10 border-white/10 text-white/70"
                                                        : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-600"
                                                )}
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSendMessage} className={cn(
                                "p-4 border-t",
                                darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                            )}>
                                <div className="relative flex items-center gap-2">
                                    <button type="button" className={cn(
                                        "p-2 transition-colors",
                                        darkMode ? "text-white/40 hover:text-blue-400" : "text-gray-400 hover:text-blue-500"
                                    )}>
                                        <Mic size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={chatMode === 'ai' ? "Ask me anything about school..." : "Type your message..."}
                                        className={cn(
                                            "flex-1 border rounded-xl px-4 py-2 text-sm focus:outline-none transition-colors",
                                            darkMode 
                                                ? "bg-white/5 border-white/10 text-white placeholder:text-white/20"
                                                : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400",
                                            chatMode === 'ai' ? "focus:border-blue-500/50" : "focus:border-green-500/50"
                                        )}
                                    />
                                    <button
                                        disabled={!message.trim() || isLoading}
                                        className={cn(
                                            "p-2 rounded-xl text-white transition-all shadow-lg disabled:opacity-50",
                                            chatMode === 'ai' 
                                                ? "bg-blue-600 hover:bg-blue-500 disabled:hover:bg-blue-600 shadow-blue-600/20"
                                                : "bg-green-600 hover:bg-green-500 disabled:hover:bg-green-600 shadow-green-600/20"
                                        )}
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
                        onClick={handleButtonClick}
                        className={cn(
                            "group flex items-center gap-2 px-6 py-3 shadow-2xl transition-all duration-300",
                            isOpen ? "bg-red-500 shadow-red-500/20" : "bg-blue-600 shadow-blue-600/20",
                            isDashboardPage 
                                ? "rounded-2xl" // Rounded on all sides for floating button
                                : "rounded-t-2xl md:rounded-2xl w-full md:w-auto justify-center md:justify-start" // Rounded top only on mobile, full rounded on desktop
                        )}
                    >
                        <div className="relative">
                            {isOpen ? <X size={22} /> : <MessageCircle size={22} className="animate-pulse" />}
                            {!isOpen && (
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                            )}
                        </div>
                        <span className="font-semibold tracking-wide text-sm">
                            {isOpen ? "Close Chat" : "Get Help"}
                        </span>
                    </motion.button>
                </TiltCard>
            </div>
        </div>
    );
};

export default ChatBot;
