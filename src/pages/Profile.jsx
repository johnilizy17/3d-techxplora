import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    User,
    Lock,
    HelpCircle,
    MessageCircle,
    LogOut,
    Bell,
    Moon,
    Sun
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import LogoutModal from '@/components/profile/LogoutModal';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useTheme } from '@/contexts/ThemeContext';

export default function Profile() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const { darkMode, toggleTheme } = useTheme();
    const [pushEnabled, setPushEnabled] = useState(true);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    useEffect(() => {
        console.log(user, "user");
    }, []);

    const MenuItem = ({ icon: Icon, label, onClick, showArrow = true, color = "text-foreground" }) => (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 bg-accent/50 rounded-2xl hover:bg-accent transition-colors border border-border group"
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-accent group-hover:bg-accent/80 ${color}`}>
                    <Icon size={20} />
                </div>
                <span className="text-foreground font-medium">{label}</span>
            </div>
            {showArrow && <ChevronRight className="text-muted-foreground" size={20} />}
        </motion.button>
    );

    return (
        <DashboardLayout>
            <div className="min-h-screen relative pb-10">
                <div className="relative z-10 w-full max-w-md lg:max-w-none lg:px-10 mx-auto min-h-screen flex flex-col">
                    {/* Header */}
                    <div className="px-6 lg:px-0 pt-8 lg:pt-12 pb-6 lg:mb-10">
                        <h1 className="text-3xl font-black uppercase tracking-tighter italic text-foreground mb-8">Settings</h1>

                        <div className="flex items-center gap-6 p-6 lg:p-8 bg-card border border-border rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
                            <Avatar className="w-20 h-20 border-4 border-[#a6b1ff]/30 shadow-2xl">
                                <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                                <AvatarFallback className="bg-indigo-500 text-white text-2xl font-black italic">
                                    {user?.fullname?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Authenticated Account</p>
                                <h2 className="text-1xl lg:text-3xl font-black text-foreground italic tracking-tighter uppercase">{user?.fullname || "Mr. John Doe"}</h2>
                            </div>
                            <button
                                onClick={() => setIsLogoutModalOpen(true)}
                                className="ml-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500/20 text-red-400 transition-all shadow-lg"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-0">
                        {/* Menu Section */}
                        <div className="space-y-4">
                            <div className="px-2 mb-2">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Account Settings</span>
                            </div>
                            <MenuItem
                                icon={User}
                                label="User Profile"
                                onClick={() => navigate('/dashboard/profile/edit')}
                            />
                            <MenuItem
                                icon={Lock}
                                label="Change Password"
                                onClick={() => setIsPasswordModalOpen(true)}
                            />

                            <div className="px-2 mt-8 mb-2">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Notifications</span>
                            </div>
                            {/* Push Notification Toggle */}
                            <div className="w-full flex items-center justify-between p-4 bg-accent/50 rounded-2xl border border-border hover:bg-accent transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-accent text-foreground">
                                        <Bell size={20} />
                                    </div>
                                    <span className="text-foreground font-bold uppercase tracking-tight text-sm">Push Notifications</span>
                                </div>
                                <Switch
                                    checked={pushEnabled}
                                    onCheckedChange={setPushEnabled}
                                    className="data-[state=checked]:bg-[#7c3aed]"
                                />
                            </div>

                            <div className="px-2 mt-8 mb-2">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Appearance</span>
                            </div>
                            {/* Dark Mode Toggle */}
                            <div className="w-full flex items-center justify-between p-4 bg-accent/50 rounded-2xl border border-border hover:bg-accent transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl transition-colors ${
                                        darkMode 
                                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                                            : 'bg-amber-500/20 text-amber-600 border border-amber-500/30'
                                    }`}>
                                        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
                                    </div>
                                    <span className="text-foreground font-bold uppercase tracking-tight text-sm">
                                        {darkMode ? 'Dark Mode' : 'Light Mode'}
                                    </span>
                                </div>
                                <Switch
                                    checked={darkMode}
                                    onCheckedChange={toggleTheme}
                                    className="data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-amber-500"
                                />
                            </div>
                        </div>

                        {/* Support & Community Section */}
                        <div className="space-y-6">
                            <div className="px-2 mb-2">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Support</span>
                            </div>

                            <MenuItem
                                icon={HelpCircle}
                                label="Help Center & FAQs"
                                onClick={() => navigate('/')}
                            />

                            {/* Premium Support Card */}
                            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(34,197,94,0.3)] group cursor-pointer transition-all hover:scale-[1.02]">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                                        <MessageCircle className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-2 italic">Need Assistance?</h3>
                                    <p className="text-green-100 font-medium mb-6 text-sm leading-relaxed opacity-80 uppercase tracking-tight">
                                        Chat with us on WhatsApp for real-time support and assistance.
                                    </p>
                                    <a 
                                        href="https://wa.me/080xxxxxxxx" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-block h-12 px-8 bg-white text-green-700 font-black uppercase tracking-widest text-xs rounded-xl shadow-xl transition-all active:scale-95 group-hover:bg-green-50 leading-[3rem]"
                                    >
                                        Chat on WhatsApp
                                    </a>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl translate-x-12 -translate-y-12"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-2xl -translate-x-12 translate-y-12"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Change Password Modal */}
                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                />

                {/* Logout Modal */}
                <LogoutModal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={handleLogout}
                />
            </div>
        </DashboardLayout>
    );
}
