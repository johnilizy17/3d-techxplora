import Navbar from "@/components/navigation/Navbar";
import React, { useState, useEffect } from "react";
import CustomCursor from "@/components/collectors/CustomCursor";
import ScrollProgress from "@/components/collectors/ScrollProgress";

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

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#a6b1ff]/30">
            <CustomCursor />
            <ScrollProgress progress={scrollProgress} />
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    )
}
