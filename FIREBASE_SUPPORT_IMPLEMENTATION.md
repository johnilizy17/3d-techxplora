# Firebase Support Chat Implementation Guide

## Overview
This document outlines the Firebase integration for the support chat system in `/v2/src/pages/Support.jsx`.

## Firebase Setup Complete
✅ Firebase Firestore has been added to `v2/src/utils/firebase.js`
✅ Imports added: `getFirestore` and `db` export

## Required Changes to Support.jsx

### 1. Add Firebase Imports (DONE)
```javascript
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
```

### 2. Add State Variables (DONE)
```javascript
const user = useSelector(selectCurrentUser);
const isAuthenticated = useSelector(selectIsAuthenticated);
const [showEmailModal, setShowEmailModal] = useState(false);
const [guestEmail, setGuestEmail] = useState('');
const [chatId, setChatId] = useState(null);
const [chatHistory, setChatHistory] = useState([]); // Changed from mock data
```

### 3. Add Firebase Functions

Add these functions after the emoji array:

```javascript
// Initialize chat on mount
useEffect(() => {
    if (!isAuthenticated) {
        setShowEmailModal(true);
    } else {
        initializeChat();
    }
}, [isAuthenticated]);

// Load chat history
useEffect(() => {
    if (chatId) {
        loadChatHistory();
    }
}, [chatId]);

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

const initializeChat = async () => {
    try {
        const userId = user?.id || guestEmail;
        if (!userId) return;

        // Check if user has existing active chat
        const chatsRef = collection(db, 'supportChats');
        const q = query(
            chatsRef,
            where('userId', '==', userId),
            where('status', '==', 'active')
        );
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
            // Use existing chat
            const existingChat = querySnapshot.docs[0];
            setChatId(existingChat.id);
        } else {
            // Create new chat
            const newChat = await addDoc(collection(db, 'supportChats'), {
                userId: userId,
                userEmail: user?.email || guestEmail,
                userName: user?.name || 'Guest',
                status: 'active',
                createdAt: serverTimestamp(),
                lastMessage: 'Chat started',
                unread: 0
            });
            setChatId(newChat.id);
            
            // Send welcome message
            await addDoc(collection(db, 'supportChats', newChat.id, 'messages'), {
                sender: 'support',
                text: "👋 Hello! Welcome to Xplora Support.\n\nI'm your automated assistant. I can help you with common questions or connect you with our live support team.",
                timestamp: serverTimestamp(),
                type: 'text'
            });
            
            setTimeout(() => {
                setShowOptions(true);
                setCurrentStep('categories');
            }, 1000);
        }
    } catch (error) {
        console.error('Error initializing chat:', error);
    }
};

const loadChatHistory = async () => {
    try {
        const userId = user?.id || guestEmail;
        const chatsRef = collection(db, 'supportChats');
        const q = query(
            chatsRef,
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const history = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().createdAt?.toDate() || new Date()
        }));
        
        setChatHistory(history);
    } catch (error) {
        console.error('Error loading chat history:', error);
    }
};

const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (guestEmail.trim() && guestEmail.includes('@')) {
        setShowEmailModal(false);
        initializeChat();
    }
};
```

### 4. Update handleSendMessage Function

Replace the existing `handleSendMessage` with:

```javascript
const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!message.trim() || isLoading || !chatId) return;

    const userMsg = {
        sender: 'user',
        text: message,
        timestamp: serverTimestamp(),
        type: 'text'
    };

    try {
        // Add message to Firestore
        await addDoc(collection(db, 'supportChats', chatId, 'messages'), userMsg);
        
        // Update last message in chat document
        await updateDoc(doc(db, 'supportChats', chatId), {
            lastMessage: message,
            updatedAt: serverTimestamp()
        });

        setMessage('');

        if (conversationMode === 'live') {
            // Live mode - message sent to admin
            // Admin will respond through their interface
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
```

### 5. Update handleOptionClick Function

Update to save bot responses to Firebase:

```javascript
const handleOptionClick = async (option) => {
    if (!chatId) return;

    const userMsg = {
        sender: 'user',
        text: option.label,
        timestamp: serverTimestamp(),
        type: 'text'
    };

    try {
        await addDoc(collection(db, 'supportChats', chatId, 'messages'), userMsg);
        setShowOptions(false);
        setIsLoading(true);

        setTimeout(async () => {
            let responseText = '';
            
            if (option.action === 'category') {
                responseText = `Great! Here are common questions about ${option.label}:`;
                setCurrentStep('questions');
                setShowOptions(true);
            } else if (option.action === 'faq') {
                responseText = option.answer;
                setTimeout(async () => {
                    await addDoc(collection(db, 'supportChats', chatId, 'messages'), {
                        sender: 'support',
                        text: "Did this answer your question?",
                        timestamp: serverTimestamp(),
                        type: 'text'
                    });
                    setCurrentStep('followup');
                    setShowOptions(true);
                }, 1000);
            } else if (option.action === 'live') {
                setConversationMode('live');
                responseText = "🔄 Connecting you to a live support agent...\n\nPlease describe your issue and an agent will respond shortly.";
                await updateDoc(doc(db, 'supportChats', chatId), {
                    status: 'pending',
                    mode: 'live'
                });
                setShowOptions(false);
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
                await updateDoc(doc(db, 'supportChats', chatId), {
                    status: 'resolved'
                });
                setShowOptions(false);
            }

            if (responseText) {
                await addDoc(collection(db, 'supportChats', chatId, 'messages'), {
                    sender: 'support',
                    text: responseText,
                    timestamp: serverTimestamp(),
                    type: 'text'
                });
            }

            setIsLoading(false);
        }, 800);
    } catch (error) {
        console.error('Error handling option:', error);
        setIsLoading(false);
    }
};
```

### 6. Add Email Modal UI

Add this before the main return statement:

```javascript
// Email Modal for Guest Users
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
```

## Firestore Database Structure

```
supportChats (collection)
├── {chatId} (document)
│   ├── userId: string
│   ├── userEmail: string
│   ├── userName: string
│   ├── status: 'active' | 'pending' | 'resolved'
│   ├── mode: 'bot' | 'live'
│   ├── createdAt: timestamp
│   ├── updatedAt: timestamp
│   ├── lastMessage: string
│   ├── unread: number
│   └── messages (subcollection)
│       └── {messageId} (document)
│           ├── sender: 'user' | 'support'
│           ├── text: string
│           ├── timestamp: timestamp
│           └── type: 'text'
```

## Admin Interface Requirements

The admin panel needs to:
1. Listen to `supportChats` collection where `status === 'pending'` or `mode === 'live'`
2. Display real-time messages from the `messages` subcollection
3. Send responses by adding documents to the `messages` subcollection with `sender: 'support'`
4. Update chat status when resolved

## Next Steps

1. Remove the mock `chatHistory` array (lines 60-85 in current file)
2. Add the Firebase functions after the emojis array
3. Update `handleSendMessage` and `handleOptionClick` functions
4. Add the email modal UI
5. Test with Firebase Firestore enabled in your Firebase console

## Firebase Console Setup

1. Go to Firebase Console
2. Enable Firestore Database
3. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /supportChats/{chatId} {
      allow read, write: if request.auth != null || 
                           resource.data.userId == request.resource.data.userId;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null ||
                             get(/databases/$(database)/documents/supportChats/$(chatId)).data.userId == request.resource.data.userId;
      }
    }
  }
}
```

## Testing

1. Test as logged-in user (should use user.id)
2. Test as guest (should prompt for email)
3. Test message sending
4. Test chat history loading
5. Test real-time message updates
6. Test switching between bot and live mode

