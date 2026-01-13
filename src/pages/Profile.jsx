import React, { useState } from 'react';
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
    Settings
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

export default function Profile() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const [pushEnabled, setPushEnabled] = useState(true);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    const MenuItem = ({ icon: Icon, label, onClick, showArrow = true, color = "text-white" }) => (
        <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 group"
        >
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full bg-white/5 group-hover:bg-white/10 ${color}`}>
                    <Icon size={20} />
                </div>
                <span className="text-white font-medium">{label}</span>
            </div>
            {showArrow && <ChevronRight className="text-gray-500" size={20} />}
        </motion.button>
    );

    return (
        <DashboardLayout>
            <div className="min-h-screen relative pb-10">
                <div className="relative z-10 w-full max-w-md lg:max-w-none lg:px-10 mx-auto min-h-screen flex flex-col">
                    {/* Header */}
                    <div className="px-6 lg:px-0 pt-8 lg:pt-12 pb-6 bg-gradient-to-b from-[#1a1520] to-transparent lg:from-transparent lg:to-transparent lg:mb-10">
                        <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white mb-8">Settings</h1>

                        <div className="flex items-center gap-6 p-6 lg:p-8 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl shadow-2xl">
                            <Avatar className="w-20 h-20 border-4 border-[#a6b1ff]/30 shadow-2xl">
                                <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                                <AvatarFallback className="bg-indigo-500 text-white text-2xl font-black italic">
                                    {user?.name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-1">Authenticated Account</p>
                                <h2 className="text-1xl lg:text-3xl font-black text-white italic tracking-tighter uppercase">{user?.name || "Mr. John Doe"}</h2>
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
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Account Settings</span>
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
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Notifications</span>
                            </div>
                            {/* Push Notification Toggle */}
                            <div className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-white/5 text-white">
                                        <Bell size={20} />
                                    </div>
                                    <span className="text-white font-bold uppercase tracking-tight text-sm">Push Notifications</span>
                                </div>
                                <Switch
                                    checked={pushEnabled}
                                    onCheckedChange={setPushEnabled}
                                    className="data-[state=checked]:bg-[#7c3aed]"
                                />
                            </div>
                        </div>

                        {/* Support & Community Section */}
                        <div className="space-y-6">
                            <div className="px-2 mb-2">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Support</span>
                            </div>

                            <MenuItem
                                icon={HelpCircle}
                                label="Help Center & FAQs"
                                onClick={() => navigate('/')}
                            />

                            {/* Premium Support Card */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_20px_50px_rgba(79,70,229,0.3)] group cursor-pointer transition-all hover:scale-[1.02]">
                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md">
                                        <MessageCircle className="text-white" size={24} />
                                    </div>
                                    <h3 className="text-white font-black text-xl uppercase tracking-tighter mb-2 italic">Need Assistance?</h3>
                                    <p className="text-indigo-100 font-medium mb-6 text-sm leading-relaxed opacity-80 uppercase tracking-tight">
                                        Join our official Discord community for real-time support and community events.
                                    </p>
                                    <button className="h-12 px-8 bg-white text-indigo-700 font-black uppercase tracking-widest text-xs rounded-xl shadow-xl transition-all active:scale-95 group-hover:bg-indigo-50">
                                        Discord Server
                                    </button>
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
