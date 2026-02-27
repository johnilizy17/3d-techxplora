import { useLocation } from "react-router-dom";
import Navbar from "@/components/navigation/Navbar";
import React, { useState, useEffect } from "react";
import CustomCursor from "@/components/collectors/CustomCursor";
import ScrollProgress from "@/components/collectors/ScrollProgress";
import ChatBot from "@/components/chat/ChatBot";

export default function Layout({ children }) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress(currentScroll / totalScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');
    const isSupport = location.pathname === '/support';

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-[#a6b1ff]/30 transition-colors duration-300">
            {!isSupport && <CustomCursor />}
            {!isSupport && <ScrollProgress progress={scrollProgress} />}
            {!isDashboard && !isSupport && <Navbar />}
            <main>
                {children}
            </main>
            {!isSupport && <ChatBot />}
        </div>
    )
}
