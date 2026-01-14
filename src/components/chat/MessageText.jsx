import React, { useState, useEffect, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const MessageText = ({ text, onComplete, scrollUp }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
                if (scrollUp) scrollUp();
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
                if (onComplete) onComplete();
            }
        }, 20);

        return () => clearInterval(typingInterval);
    }, [text]);

    return (
        <div className="prose prose-invert max-w-none text-sm leading-relaxed">
            <ReactMarkdown>
                {displayedText}
            </ReactMarkdown>
            {isTyping && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1 h-4 ml-1 bg-blue-500 align-middle"
                    aria-hidden="true"
                />
            )}
        </div>
    );
};

export default memo(MessageText);
