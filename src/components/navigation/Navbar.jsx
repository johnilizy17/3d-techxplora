import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Link } from 'react-router-dom';
import { Sparkles, Menu, X, GraduationCap, Users, LayoutDashboard } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const ModalCard = ({ icon: Icon, title, description, to, onClick }) => {
    const CardContent = (
        <div className="group flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#a6b1ff]/30 transition-all duration-300 cursor-pointer">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#a6b1ff]/20 to-[#c7aff8]/20 flex items-center justify-center border border-[#a6b1ff]/20 group-hover:scale-110 transition-transform">
                <Icon className="w-7 h-7 text-[#a6b1ff]" />
            </div>
            <div className="text-left flex-1">
                <h3 className="text-lg font-bold text-white group-hover:text-[#a6b1ff] transition-colors">{title}</h3>
                <p className="text-sm text-gray-400 leading-snug">{description}</p>
            </div>
        </div>
    );

    if (to) return <Link to={to} onClick={onClick}>{CardContent}</Link>;
    return <div onClick={onClick}>{CardContent}</div>;
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const isAuthPage = location.pathname.startsWith('/auth/login') || location.pathname.startsWith('/auth/signup');

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
        { name: 'Courses', path: '/courses' },
        { name: 'Chess', path: '/chess' },
    ];

    const handleAuthAction = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
            return;
        }
        if (isAuthPage) {
            setIsRegisterModalOpen(true);
        } else {
            navigate('/auth/login');
        }
    };

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
                        <img src="../favicon.ico" alt="Logo" className="w-8" />
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

                    {isAuthenticated ? (
                        <Button
                            className="ml-4 relative px-6 py-2 text-sm font-bold bg-[#004BEE] text-white rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_4px_0_#003ec7] active:shadow-none active:translate-y-[4px] flex items-center gap-2"
                            size="sm"
                            onClick={() => navigate('/dashboard')}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Button>
                    ) : (
                        <Button
                            className="ml-4 relative px-6 py-2 text-sm font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-lg overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_4px_0_#8b95cc] active:shadow-none active:translate-y-[4px]"
                            size="sm"
                            onClick={handleAuthAction}
                        >
                            {isAuthPage ? 'Sign Up' : 'Sign in'}
                        </Button>
                    )}
                </div>

                {/* Mobile specific controls */}
                <div className="flex md:hidden items-center gap-4">
                    {isAuthenticated ? (
                        <Button
                            onClick={() => navigate('/dashboard')}
                            className="relative px-4 py-2 text-xs font-bold bg-[#004BEE] text-white rounded-lg overflow-hidden group active:scale-95 transition-all duration-300 shadow-[0_3px_0_#003ec7] active:shadow-none active:translate-y-[3px] flex items-center gap-1"
                        >
                            <LayoutDashboard className="w-3 h-3" />
                            Dashboard
                        </Button>
                    ) : (
                        <Button
                            onClick={handleAuthAction}
                            className="relative px-4 py-2 text-xs font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-lg overflow-hidden group active:scale-95 transition-all duration-300 shadow-[0_3px_0_#8b95cc] active:shadow-none active:translate-y-[3px]"
                        >
                            {isAuthPage ? 'Sign Up' : 'Sign In'}
                        </Button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        className="text-white p-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
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
                </div>
            </div>

            {/* Student/Teacher Modal */}
            <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
                <DialogContent className="max-w-md bg-[#0d0d0d]/95 backdrop-blur-2xl border-white/10 rounded-3xl p-8 shadow-2xl">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-center text-white">Join as...</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <ModalCard
                            icon={GraduationCap}
                            title="Student"
                            description="Learn, join quizzes and get great scores"
                            to="/auth/signup"
                            onClick={() => setIsRegisterModalOpen(false)}
                        />
                        <ModalCard
                            icon={Users}
                            title="Teacher"
                            description="Create quizzes or manage results"
                            to="/auth/signup/?page=3"
                            onClick={() => setIsRegisterModalOpen(false)}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </nav>
    );
}
