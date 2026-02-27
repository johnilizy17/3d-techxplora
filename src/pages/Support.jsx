import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, ArrowLeft, Bot, MoreVertical, Smile, Image as ImageIcon, X, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthenticated } from '@/redux/slices/authSlice';
import { db } from '@/utils/firebase';
import { 
    collection, 
    addDoc, 
    query, 
    where, 
    orderBy, 
    onSnapshot, 
    serverTimestamp,
    getDocs,
    doc,
    updateDoc
} from 'firebase/firestore';
import { cn } from '@/lib/utils';

const Support = () => {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [conversationMode, setConversationMode] = useState('bot'); // 'bot' or 'live'
    const [currentStep, setCurrentStep] = useState('welcome');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [guestEmail, setGuestEmail] = useState('');
    const [chatId, setChatId] = useState(null);
    const [chatHistory, setChatHistory] = useState([]);
    const messagesEndRef = useRef(null);
    const emojiPickerRef = useRef(null);

    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊',
        '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
        '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
        '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕',
        '🤢', '🤮', '🤧', '🥵', '🥶', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐',
        '👍', '�', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '�👈', '👉', '👆', '👇',
        '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤝', '🙏', '💪', '🦾', '🦿', '🦵',
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕',
        '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️',
        '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌',
        '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⚽', '🏀', '🏈', '⚾',
        '🎯', '🎮', '🎲', '🎰', '🎳', '🎪', '🎭', '🎨', '🎬', '🎤', '🎧', '🎼'
    ];

    const faqs = {
        account: [
            { id: 'reset-password', question: 'How do I reset my password?', answer: 'To reset your password:\n\n1. Go to Settings > Security\n2. Click "Change Password"\n3. Verify your identity via email or phone\n4. Enter your new password\n\nWould you like me to guide you through this process?' },
            { id: 'update-profile', question: 'How do I update my profile?', answer: 'You can update your profile by:\n\n1. Going to Dashboard > Profile\n2. Click "Edit Profile"\n3. Update your information\n4. Click "Save Changes"\n\nIs there anything specific you\'d like to update?' },
            { id: 'delete-account', question: 'How do I delete my account?', answer: 'To delete your account:\n\n1. Go to Settings > Account\n2. Scroll to "Delete Account"\n3. Confirm your decision\n\n⚠️ This action is permanent and cannot be undone. Would you like to speak with a live agent about this?' }
        ],
        quizzes: [
            { id: 'create-quiz', question: 'How do I create a quiz?', answer: 'Creating a quiz is easy!\n\n1. Go to Dashboard > Teacher > Create Quiz\n2. Enter quiz details (title, description, duration)\n3. Add questions using AI or manually\n4. Review and publish\n\nWould you like tips on creating engaging quizzes?' },
            { id: 'join-quiz', question: 'How do I join a quiz?', answer: 'To join a quiz:\n\n1. Go to Dashboard > Quizzes\n2. Click "Join Quiz"\n3. Enter the quiz code provided by your teacher\n4. Click "Join"\n\nDo you have a quiz code ready?' },
            { id: 'quiz-results', question: 'Where can I see my quiz results?', answer: 'You can view your quiz results:\n\n1. Go to Dashboard > Quizzes\n2. Click on "Completed Quizzes"\n3. Select the quiz you want to review\n\nYou\'ll see your score, correct answers, and detailed feedback!' }
        ],
        groups: [
            { id: 'create-group', question: 'How do I create a group?', answer: 'To create a group:\n\n1. Go to Dashboard > Groups\n2. Click "Create Group"\n3. Enter group name and description\n4. Set group settings (public/private)\n5. Share the group code with members\n\nWould you like help setting up your first group?' },
            { id: 'join-group', question: 'How do I join a group?', answer: 'Joining a group is simple:\n\n1. Go to Dashboard > Groups\n2. Click "Join Group"\n3. Enter the group code\n4. Click "Join"\n\nYou can join multiple groups!' },
            { id: 'leave-group', question: 'How do I leave a group?', answer: 'To leave a group:\n\n1. Go to Dashboard > Groups\n2. Select the group\n3. Click "Leave Group"\n4. Confirm your decision\n\nYou can rejoin anytime with the group code.' }
        ],
        technical: [
            { id: 'app-slow', question: 'The app is running slow', answer: 'Let\'s try to fix that:\n\n1. Clear your browser cache\n2. Check your internet connection\n3. Try refreshing the page\n4. Update your browser to the latest version\n\nIf the issue persists, would you like to connect with our technical support team?' },
            { id: 'login-issue', question: 'I can\'t log in', answer: 'Let\'s troubleshoot your login issue:\n\n1. Check if your email/phone is correct\n2. Try resetting your password\n3. Clear browser cookies\n4. Try a different browser\n\nAre you getting any specific error message?' },
            { id: 'payment-failed', question: 'My payment failed', answer: 'I\'m sorry about the payment issue. Let\'s resolve this:\n\n1. Check if your payment method is valid\n2. Ensure you have sufficient funds\n3. Try a different payment method\n\nFor payment issues, I recommend connecting with our live support team who can access your account securely.' }
        ]
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        // Initial welcome message only if no chatId yet
        if (!chatId) {
            const welcomeMsg = {
                id: Date.now(),
                sender: 'support',
                text: "👋 Hello! Welcome to Xplora Support.\n\nI'm your automated assistant. I can help you with common questions or connect you with our live support team.",
                timestamp: new Date(),
                type: 'text'
            };
            setMessages([welcomeMsg]);

            // Show category options after a delay
            setTimeout(() => {
                setShowOptions(true);
                setCurrentStep('categories');
            }, 1000);
        }
    }, [chatId]);

    // Close emoji picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Initialize chat on mount - ONLY load existing chats, don't create new ones
    useEffect(() => {
        if (!isAuthenticated && conversationMode === 'live') {
            setShowEmailModal(true);
        } else if (isAuthenticated || guestEmail) {
            loadExistingChat();
        }
    }, [isAuthenticated, guestEmail]);

    // Load chat history when user is authenticated or email is provided
    useEffect(() => {
        const userId = user?.id || guestEmail;
        if (!userId) return;

        console.log('Setting up chat history listener for userId:', userId);
        
        // Query without orderBy to avoid composite index
        const chatsRef = collection(db, 'supportChats');
        const q = query(chatsRef, where('userId', '==', userId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log('Chat history updated:', snapshot.docs.length, 'chats');
            
            // Sort client-side
            const history = snapshot.docs
                .map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate() || new Date(),
                        updatedAt: data.updatedAt?.toDate() || new Date(),
                        timestamp: data.updatedAt?.toDate() || data.createdAt?.toDate() || new Date()
                    };
                })
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            
            console.log('Updated chat history:', history);
            setChatHistory(history);
        }, (error) => {
            console.error('Error in chat history listener:', error);
        });

        return () => unsubscribe();
    }, [user?.id, guestEmail]);

    // Listen to messages in real-time
    useEffect(() => {
        if (!chatId) return;

        const messagesRef = collection(db, 'supportChats', chatId, 'messages');
        const q = query(messagesRef, orderBy('timestamp', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp?.toDate() || new Date()
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [chatId]);

    const loadExistingChat = async () => {
        try {
            const userId = user?.id || guestEmail;
            if (!userId) return;

            console.log('Loading existing chat for userId:', userId);

            // Check if user has any existing chats (prioritize active/pending over resolved)
            const chatsRef = collection(db, 'supportChats');
            
            // Query without orderBy to avoid index requirement
            const activeQuery = query(
                chatsRef,
                where('userId', '==', userId),
                where('status', 'in', ['active', 'pending'])
            );
            
            const activeSnapshot = await getDocs(activeQuery);
            
            if (!activeSnapshot.empty) {
                // Sort client-side by updatedAt
                const sortedDocs = activeSnapshot.docs.sort((a, b) => {
                    const aTime = a.data().updatedAt?.toMillis() || 0;
                    const bTime = b.data().updatedAt?.toMillis() || 0;
                    return bTime - aTime;
                });
                
                // Use the most recent active/pending chat
                const existingChat = sortedDocs[0];
                console.log('Found active/pending chat:', existingChat.id);
                setChatId(existingChat.id);
                const chatData = existingChat.data();
                setConversationMode(chatData.mode || 'bot');
            } else {
                console.log('No active/pending chats found');
            }
        } catch (error) {
            console.error('Error loading existing chat:', error);
        }
    };

    const createLiveChat = async () => {
        try {
            const userId = user?.id || guestEmail;
            if (!userId) return null;

            // Create new live chat
            const newChat = await addDoc(collection(db, 'supportChats'), {
                userId: userId,
                userEmail: user?.email || guestEmail,
                userName: user?.name || 'Guest',
                status: 'pending',
                mode: 'live',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastMessage: 'User requested live support',
                unread: 0
            });
            
            return newChat.id;
        } catch (error) {
            console.error('Error creating live chat:', error);
            return null;
        }
    };

    const loadChatHistory = async () => {
        try {
            const userId = user?.id || guestEmail;
            if (!userId) {
                console.log('No userId available for loading chat history');
                return;
            }

            console.log('Loading chat history for userId:', userId);
            
            const chatsRef = collection(db, 'supportChats');
            // Query without orderBy to avoid composite index
            const q = query(chatsRef, where('userId', '==', userId));
            
            const querySnapshot = await getDocs(q);
            console.log('Chat history loaded:', querySnapshot.docs.length, 'chats found');
            
            // Sort client-side
            const history = querySnapshot.docs
                .map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        createdAt: data.createdAt?.toDate() || new Date(),
                        updatedAt: data.updatedAt?.toDate() || new Date(),
                        timestamp: data.updatedAt?.toDate() || data.createdAt?.toDate() || new Date()
                    };
                })
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
            
            console.log('Processed chat history:', history);
            setChatHistory(history);
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (guestEmail.trim() && guestEmail.includes('@')) {
            setShowEmailModal(false);
            // Don't initialize chat here, just close modal
            // Chat will be created when user clicks "Talk to Live Agent"
        }
    };

    const handleEmojiClick = (emoji) => {
        setMessage(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-blue-400';
            case 'pending':
                return 'text-yellow-400';
            case 'resolved':
                return 'text-green-400';
            default:
                return 'text-gray-400';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <MessageSquare size={16} />;
            case 'pending':
                return <Clock size={16} />;
            case 'resolved':
                return <CheckCircle2 size={16} />;
            default:
                return <MessageSquare size={16} />;
        }
    };

    const formatTimestamp = (date) => {
        const now = new Date();
        const diff = now - date;
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    };

    const handleOptionClick = async (option) => {
        // For bot mode, handle locally without Firebase
        if (option.action !== 'live') {
            // Add user message locally
            const userMsg = {
                id: Date.now(),
                sender: 'user',
                text: option.label,
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, userMsg]);
            setShowOptions(false);
            setIsLoading(true);

            setTimeout(() => {
                let responseText = '';
                
                if (option.action === 'category') {
                    responseText = `Great! Here are common questions about ${option.label}:`;
                    setCurrentStep('questions');
                    setShowOptions(true);
                } else if (option.action === 'faq') {
                    responseText = option.answer;
                    const botMsg = {
                        id: Date.now(),
                        sender: 'support',
                        text: responseText,
                        timestamp: new Date(),
                        type: 'text'
                    };
                    setMessages(prev => [...prev, botMsg]);
                    
                    setTimeout(() => {
                        const followupMsg = {
                            id: Date.now() + 1,
                            sender: 'support',
                            text: "Did this answer your question?",
                            timestamp: new Date(),
                            type: 'text'
                        };
                        setMessages(prev => [...prev, followupMsg]);
                        setCurrentStep('followup');
                        setShowOptions(true);
                    }, 1000);
                    setIsLoading(false);
                    return;
                } else if (option.action === 'yes') {
                    responseText = "Glad I could help! 😊\n\nIs there anything else you need assistance with?";
                    setCurrentStep('more-help');
                    setShowOptions(true);
                } else if (option.action === 'no') {
                    responseText = "I understand. Would you like to:\n\n1. Try another FAQ topic\n2. Connect with a live support agent";
                    setCurrentStep('escalate');
                    setShowOptions(true);
                } else if (option.action === 'restart') {
                    responseText = "Sure! Let's start over. What would you like help with?";
                    setCurrentStep('categories');
                    setShowOptions(true);
                } else if (option.action === 'done') {
                    responseText = "Thank you for contacting Xplora Support! Have a great day! 👋";
                    setShowOptions(false);
                }

                if (responseText) {
                    const botMsg = {
                        id: Date.now(),
                        sender: 'support',
                        text: responseText,
                        timestamp: new Date(),
                        type: 'text'
                    };
                    setMessages(prev => [...prev, botMsg]);
                }

                setIsLoading(false);
            }, 800);
            return;
        }

        // For live agent - create chat in Firebase
        try {
            // Check if user needs to provide email
            if (!isAuthenticated && !guestEmail) {
                setShowEmailModal(true);
                return;
            }

            setIsLoading(true);
            
            // Add user message locally first
            const userMsg = {
                id: Date.now(),
                sender: 'user',
                text: option.label,
                timestamp: new Date(),
                type: 'text'
            };
            setMessages(prev => [...prev, userMsg]);
            setShowOptions(false);

            // Create live chat in Firebase
            const newChatId = await createLiveChat();
            
            if (newChatId) {
                setChatId(newChatId);
                setConversationMode('live');
                
                // Add messages to Firebase
                await addDoc(collection(db, 'supportChats', newChatId, 'messages'), {
                    sender: 'user',
                    text: option.label,
                    timestamp: serverTimestamp(),
                    type: 'text'
                });

                const responseText = "🔄 Connecting you to a live support agent...\n\nPlease describe your issue and an agent will respond shortly.";
                
                await addDoc(collection(db, 'supportChats', newChatId, 'messages'), {
                    sender: 'support',
                    text: responseText,
                    timestamp: serverTimestamp(),
                    type: 'text'
                });

                await updateDoc(doc(db, 'supportChats', newChatId), {
                    lastMessage: responseText,
                    updatedAt: serverTimestamp()
                });

                // Reload chat history
                loadChatHistory();
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Error handling live agent request:', error);
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!message.trim() || isLoading) return;

        // Only allow sending messages in live mode (when chatId exists)
        if (!chatId) {
            // In bot mode, messages are not sent - user should use options
            return;
        }

        const userMsg = {
            sender: 'user',
            text: message,
            timestamp: serverTimestamp(),
            type: 'text'
        };

        try {
            await addDoc(collection(db, 'supportChats', chatId, 'messages'), userMsg);
            
            await updateDoc(doc(db, 'supportChats', chatId), {
                lastMessage: message,
                updatedAt: serverTimestamp()
            });

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleChatSelect = async (selectedChatId) => {
        try {
            // Set the new chat ID
            setChatId(selectedChatId);
            
            // Clear current messages (they will be loaded by the useEffect listener)
            setMessages([]);
            
            // Reset conversation state
            setShowOptions(false);
            setCurrentStep('welcome');
            setConversationMode('bot');
            
            // Close the drawer
            setShowDrawer(false);
            
            // Load the selected chat's data
            const chatDoc = chatHistory.find(chat => chat.id === selectedChatId);
            if (chatDoc) {
                setConversationMode(chatDoc.mode || 'bot');
            }
        } catch (error) {
            console.error('Error selecting chat:', error);
        }
    };

    const handleStartNewConversation = async () => {
        try {
            const userId = user?.id || guestEmail;
            if (!userId) return;

            // Create new chat
            const newChat = await addDoc(collection(db, 'supportChats'), {
                userId: userId,
                userEmail: user?.email || guestEmail,
                userName: user?.name || 'Guest',
                status: 'active',
                mode: 'bot',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastMessage: 'Chat started',
                unread: 0
            });
            
            // Set the new chat ID
            setChatId(newChat.id);
            
            // Reset state
            setMessages([]);
            setShowOptions(false);
            setCurrentStep('welcome');
            setConversationMode('bot');
            setShowDrawer(false);
            
            // Add welcome message
            setTimeout(async () => {
                const welcomeMsg = {
                    sender: 'support',
                    text: "👋 Hello! Welcome to Xplora Support.\n\nI'm your automated assistant. I can help you with common questions or connect you with our live support team.",
                    timestamp: serverTimestamp(),
                    type: 'text'
                };
                
                await addDoc(collection(db, 'supportChats', newChat.id, 'messages'), welcomeMsg);
                
                setTimeout(() => {
                    setShowOptions(true);
                    setCurrentStep('categories');
                }, 1000);
            }, 500);
            
            // Reload chat history
            loadChatHistory();
        } catch (error) {
            console.error('Error starting new conversation:', error);
        }
    };

    const getOptionsForStep = () => {
        switch (currentStep) {
            case 'categories':
                return [
                    { label: '👤 Account & Profile', value: 'account', action: 'category' },
                    { label: '📝 Quizzes', value: 'quizzes', action: 'category' },
                    { label: '👥 Groups', value: 'groups', action: 'category' },
                    { label: '⚙️ Technical Issues', value: 'technical', action: 'category' },
                    { label: '💬 Talk to Live Agent', value: 'live', action: 'live' }
                ];
            case 'questions':
                const category = messages[messages.length - 2]?.text.toLowerCase();
                let categoryKey = 'account';
                if (category.includes('quiz')) categoryKey = 'quizzes';
                else if (category.includes('group')) categoryKey = 'groups';
                else if (category.includes('technical')) categoryKey = 'technical';
                
                return [
                    ...faqs[categoryKey].map(faq => ({
                        label: faq.question,
                        value: faq.id,
                        answer: faq.answer,
                        action: 'faq'
                    })),
                    { label: '⬅️ Back to Categories', value: 'back', action: 'restart' },
                    { label: '💬 Talk to Live Agent', value: 'live', action: 'live' }
                ];
            case 'followup':
                return [
                    { label: '✅ Yes, that helped!', value: 'yes', action: 'yes' },
                    { label: '❌ No, I need more help', value: 'no', action: 'no' }
                ];
            case 'escalate':
                return [
                    { label: '📚 Try Another Topic', value: 'restart', action: 'restart' },
                    { label: '💬 Connect to Live Agent', value: 'live', action: 'live' }
                ];
            case 'more-help':
                return [
                    { label: '✅ Yes, I have another question', value: 'restart', action: 'restart' },
                    { label: '👋 No, I\'m all set', value: 'done', action: 'done' }
                ];
            default:
                return [];
        }
    };

    return (
        <>
            {/* Email Modal for Guest Users */}
            {showEmailModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 max-w-md w-full mx-4"
                    >
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center mx-auto mb-4">
                                <MessageSquare size={32} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Welcome to Support</h2>
                            <p className="text-white/60 text-sm">Please enter your email to continue</p>
                        </div>

                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={guestEmail}
                                onChange={(e) => setGuestEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-green-500/50 transition-colors"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-xl text-white font-semibold transition-all shadow-lg shadow-green-600/20"
                            >
                                Start Chat
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}

        <div className="h-screen bg-[#0a0a0a] flex flex-col overflow-hidden">
            {/* WhatsApp-style Header - Fixed */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-3 flex items-center gap-4 shadow-lg flex-shrink-0">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot size={22} className="text-white" />
                </div>
                
                <div className="flex-1">
                    <h1 className="text-white font-semibold text-lg">Xplora Support</h1>
                    <p className="text-white/80 text-xs">
                        {conversationMode === 'live' ? '🟢 Live Agent' : '🤖 Automated Assistant'}
                    </p>
                </div>

                <button
                    onClick={() => {
                        console.log('Opening drawer, chat history:', chatHistory);
                        setShowDrawer(true);
                    }}
                    className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                    <MoreVertical size={22} />
                </button>
            </div>

            {/* Drawer for Chat History */}
            <AnimatePresence>
                {showDrawer && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDrawer(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1a1a1a] shadow-2xl z-50 flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-4 flex items-center justify-between">
                                <h2 className="text-white font-semibold text-lg">Chat History</h2>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => loadChatHistory()}
                                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                                        title="Refresh"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setShowDrawer(false)}
                                        className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                                    >
                                        <X size={22} />
                                    </button>
                                </div>
                            </div>

                            {/* Chat History List */}
                            <div className="flex-1 overflow-y-auto">
                                {chatHistory.map((chat, idx) => (
                                    <motion.div
                                        key={chat.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className={cn(
                                            "border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer",
                                            chatId === chat.id && "bg-white/10"
                                        )}
                                        onClick={() => handleChatSelect(chat.id)}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-teal-600 flex items-center justify-center shrink-0">
                                                        <Bot size={20} className="text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-white font-semibold text-sm truncate">
                                                            Support Chat - {chat.mode === 'live' ? 'Live Agent' : 'Bot'}
                                                        </h3>
                                                        <p className="text-white/60 text-xs truncate mt-0.5">
                                                            {chat.lastMessage || 'No messages yet'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1 ml-2">
                                                    <span className="text-white/40 text-xs whitespace-nowrap">
                                                        {formatTimestamp(chat.timestamp)}
                                                    </span>
                                                    {chat.unread > 0 && (
                                                        <span className="bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                                            {chat.unread}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 ml-15">
                                                <div className={cn("flex items-center gap-1", getStatusColor(chat.status))}>
                                                    {getStatusIcon(chat.status)}
                                                    <span className="text-xs capitalize">{chat.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                {chatHistory.length === 0 && (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                            <MessageSquare size={32} className="text-white/40" />
                                        </div>
                                        <h3 className="text-white font-semibold mb-2">No Chat History</h3>
                                        <p className="text-white/60 text-sm">
                                            Your previous conversations will appear here
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-4 border-t border-white/10">
                                <button
                                    onClick={handleStartNewConversation}
                                    className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-xl text-white font-semibold transition-all shadow-lg shadow-green-600/20"
                                >
                                    Start New Conversation
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* WhatsApp-style Background Pattern - Scrollable Messages */}
            <div className="flex-1 overflow-y-auto bg-[#0a0a0a] relative" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}>
                <div className="max-w-4xl mx-auto p-4 space-y-3">
                    {/* Messages */}
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                                "flex",
                                msg.sender === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[75%] rounded-lg px-4 py-2 shadow-lg relative",
                                msg.sender === 'user'
                                    ? "bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-br-none"
                                    : "bg-[#1a1a1a] text-white border border-white/10 rounded-bl-none"
                            )}>
                                {msg.sender === 'support' && (
                                    <div className="flex items-center gap-2 mb-1">
                                        <Bot size={14} className="text-green-400" />
                                        <span className="text-xs text-green-400 font-semibold">Support Bot</span>
                                    </div>
                                )}
                                <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                                <div className="flex items-center justify-end gap-1 mt-1">
                                    <span className="text-[10px] opacity-60">
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {msg.sender === 'user' && (
                                        <svg viewBox="0 0 16 15" width="16" height="15" className="opacity-60">
                                            <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg rounded-bl-none px-4 py-3 shadow-lg">
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                                            className="w-2 h-2 bg-green-400 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Quick Reply Options */}
                    <AnimatePresence>
                        {showOptions && !isLoading && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex flex-col gap-2 items-start"
                            >
                                {getOptionsForStep().map((option, idx) => (
                                    <motion.button
                                        key={option.value}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => handleOptionClick(option)}
                                        className="bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 hover:border-green-500/50 text-white px-4 py-2.5 rounded-lg text-sm transition-all shadow-lg max-w-[75%] text-left"
                                    >
                                        {option.label}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* WhatsApp-style Input - Fixed */}
            <div className="bg-[#1a1a1a] border-t border-white/10 px-4 py-3 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-4xl mx-auto relative">
                    {/* Emoji Picker */}
                    <AnimatePresence>
                        {showEmojiPicker && (
                            <motion.div
                                ref={emojiPickerRef}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full left-0 mb-2 bg-[#2a2a2a] border border-white/10 rounded-2xl p-4 shadow-2xl w-80 max-h-64 overflow-y-auto"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-white font-semibold text-sm">Emojis</h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowEmojiPicker(false)}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-8 gap-2">
                                    {emojis.map((emoji, idx) => (
                                        <button
                                            key={idx}
                                            type="button"
                                            onClick={() => handleEmojiClick(emoji)}
                                            className="text-2xl hover:bg-white/10 rounded-lg p-2 transition-colors"
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className={cn(
                            "text-white/60 hover:text-white transition-colors p-2",
                            showEmojiPicker && "text-green-400"
                        )}
                    >
                        <Smile size={24} />
                    </button>
                    
                    <button
                        type="button"
                        className="text-white/60 hover:text-white transition-colors p-2"
                    >
                        <Paperclip size={24} />
                    </button>

                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={conversationMode === 'live' ? "Type a message..." : "Use options above to chat with bot..."}
                            className="w-full bg-[#2a2a2a] border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                    </div>

                    {message.trim() ? (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-br from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 disabled:opacity-50 p-3 rounded-full text-white transition-all shadow-lg shadow-green-600/20"
                        >
                            <Send size={20} />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="text-white/60 hover:text-white transition-colors p-2"
                        >
                            <ImageIcon size={24} />
                        </button>
                    )}
                </form>
            </div>
        </div>
        </>
    );
};

export default Support;
