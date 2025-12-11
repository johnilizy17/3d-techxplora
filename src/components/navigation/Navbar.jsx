import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'How To Use', path: '/how-to-use' },
        { name: 'About', path: '/about' },
        { name: 'Chess', path: '/chess' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen
                ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 group">
                    <div className="relative">
                        <img src="/public/favicon.ico" alt="Logo" className="w-6 h-6" />
                        <div className="absolute inset-0 bg-[#a6b1ff] blur-lg opacity-20 group-hover:opacity-50 transition-opacity" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-wide font-['Bricolage_Grotesque']">
                        Techxplora
                    </span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `relative text-sm font-medium tracking-wide transition-colors duration-300 hover:text-[#a6b1ff] ${isActive ? 'text-white' : 'text-gray-400'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a6b1ff] to-transparent shadow-[0_0_8px_rgba(166,177,255,0.8)]" />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}

                    <Button
                        className="ml-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-[#a6b1ff]/50 transition-all duration-300"
                        size="sm"
                    >
                        Sign in
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-20 left-0 right-0 bg-[#0a0a0a] border-b border-white/10 transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="flex flex-col p-6 gap-4">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `text-lg font-medium transition-colors ${isActive ? 'text-[#a6b1ff]' : 'text-gray-400'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <Button className="w-full mt-4 bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-black font-semibold">
                        Sign In
                    </Button>
                </div>
            </div>
        </nav>
    );
}
