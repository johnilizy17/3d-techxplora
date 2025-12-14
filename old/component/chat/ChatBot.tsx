import { useEffect, useRef, useState } from 'react'
import { FiMessageCircle, FiSend } from 'react-icons/fi'
import { FaMicrophone } from 'react-icons/fa'
import XIcon from '../asset/XIcon'
import { Box, Center } from '@chakra-ui/react'
import ChatIcon from '../asset/ChatIcon'
import { COLORS } from '@/utils/theme'
import { LuSend } from 'react-icons/lu'
import { model } from '@/utils/firebase'
import MessageText from './MessageText'
import { useSelector } from 'react-redux'

function ChatBot({ activeSection = 'general' }) {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const [type, setType] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    function ScrollUp() {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }
    useEffect(() => {
        ScrollUp()
    }, [message.length, isLoading])

    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hello! I'm Xplora AI, your personalized assistant. How can I help you today?",
            timestamp: new Date(),
            badge: "Xplora AI"
        }
    ])

    const getQuickActions = () => {
        return ['Result Tracking', 'School Question', 'Mathmatical Question', 'Explore Xplora']
    }

    useEffect(() => {
        setTimeout(() => {
            setType(false)
        }, 500)
    }, [])


    const handleSendMessage = async () => {
        if (message.trim() && !isLoading) {
            const newMessage = {
                id: messages.length + 1,
                sender: 'user',
                text: message,
                timestamp: new Date(),
                badge: user.fullname
            }
            setMessages([...messages, newMessage])
            const currentMessage = message
            setMessage('')
            setIsLoading(true)

            try {
                const result: any = await model.generateContent([
                    {
                        text: `You are TechXplora IA, a helpful AI tutor. 
                               You only answer questions related to school subjects such as math, science, history, and literature.
                               If a user asks something unrelated, politely say:
                               "Sorry, I only help with school subjects."`
                    },
                    { text: message } // user’s actual question
                ]);
                result.response.candidates[0].content.parts.map((a: any) => {
                    const botResponse = {
                        id: messages.length + 2,
                        sender: 'bot',
                        text: a.text,
                        timestamp: new Date(),
                        badge: "Xplora AI"
                    }
                    setMessages(prev => [...prev, botResponse])

                })
            } catch (error) {
                console.error('Error sending message:', error)
                const errorResponse = {
                    id: messages.length + 2,
                    sender: 'bot',
                    text: "I'm sorry, there was an error processing your message. Please try again.",
                    timestamp: new Date(),
                    badge: 'Xplora AI'
                }
                setMessages(prev => [...prev, errorResponse])
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleKeyPress = (e: any) => {
        if (e.key === 'Enter' && !isLoading) {
            handleSendMessage()
        }
    }

    const handleQuickAction = async (action: any) => {
        if (isLoading) return

        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: action,
            timestamp: new Date(),
            badge: user.fullname
        }
        setMessages([...messages, newMessage])
        setIsLoading(true)

        try {
            const result: any = await model.generateContent([
                {
                    text: `You are TechXplora IA, a helpful AI tutor. 
                               You only answer questions related to school subjects such as math, science, history, and literature.
                               If a user asks something unrelated, politely say:
                               "Sorry, I only help with school subjects."`
                },
                { text: message } // user’s actual question
            ]);

            result.response.candidates[0].content.parts.map((a: any) => {
                const botResponse = {
                    id: messages.length + 2,
                    sender: 'bot',
                    text: a.text,
                    timestamp: new Date(),
                    badge: "Xplora AI"
                }
                setMessages(prev => [...prev, botResponse])

            })

        } catch (error) {
            console.error('Error with quick action:', error)
            const errorResponse = {
                id: messages.length + 2,
                sender: 'bot',
                text: "I'm sorry, there was an error processing your request. Please try again.",
                timestamp: new Date(),
                badge: 'Xplora AI'
            }
            setMessages(prev => [...prev, errorResponse])
        } finally {
            setIsLoading(false)
        }
    }



    return (
        <>
            {/* Chat Icon */}
            <Center cursor="pointer" className='chatbot-icon' h="48px" w="151px" bg={"#0051FF"} borderRadius={"16px"} color={COLORS.white}
                onClick={() => setIsOpen(!isOpen)}
            >
                <ChatIcon /> <Box fontSize={"16px"} fontFamily={"Poppins"} ml="8px">Ask Xplora AI</Box>
            </Center>

            {/* Chat Popup */}
            {isOpen && (
                <div className="chatbot-popup">
                    <div className="chat-header">
                        <div className="chat-title">
                            <div className="bot-avatar">🤖</div>
                            <span>Xplora AI</span>
                        </div>
                        <button
                            className="close-btn"
                            onClick={() => setIsOpen(false)}
                        >
                            <XIcon />
                        </button>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg: any) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                {msg.sender === 'bot' && (
                                    <div className="message-avatar">🤖</div>
                                )}
                                <div className="message-content">
                                    {msg.badge && (
                                        <span className={msg.sender === 'bot' ? "message-badge" : "message-badge2"}>{msg.badge}</span>
                                    )}
                                    {msg.sender === "bot" ?
                                        <MessageText ScrollUp={ScrollUp} text={msg.text} />
                                        :
                                        <p>{msg.text}</p>
                                    }
                                </div>
                                {msg.sender === 'user' && (
                                    <div className="message-avatar">👤</div>
                                )}
                            </div>
                        ))}

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="message bot">
                                <div className="message-avatar">🤖</div>
                                <div className="message-content">
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                        {/* Quick Actions - Show for first few messages */}
                        {messages.length <= 2 && !isLoading && (
                            <div className="quick-actions">
                                {getQuickActions().map((action, index) => (
                                    <button
                                        key={index}
                                        className="quick-action-btn"
                                        onClick={() => handleQuickAction(action)}
                                        disabled={isLoading}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="chat-input">
                        <button className="mic-btn" disabled={isLoading}>
                            <FaMicrophone className="mic-icon" />
                        </button>
                        <input
                            type="text"
                            placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="message-input"
                            disabled={isLoading}
                        />
                        <button
                            className="send-btn"
                            onClick={handleSendMessage}
                            disabled={isLoading || !message.trim()}
                        >
                            <LuSend />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatBot