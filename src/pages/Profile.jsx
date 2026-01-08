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
import DashboardBottomNav from '@/components/dashboard/DashboardBottomNav';
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
        <div className="min-h-screen bg-[#0a0a0a] pb-24 font-sans relative">
            <div className="max-w-md mx-auto w-full min-h-screen relative shadow-2xl bg-[#0a0a0a]">

                {/* Header */}
                <div className="px-6 pt-8 pb-6 bg-gradient-to-b from-[#1a1520] to-[#0a0a0a]">
                    <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16 border-2 border-[#a6b1ff]/30">
                            <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
                            <AvatarFallback className="bg-indigo-500 text-white text-xl">
                                {user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-gray-400 text-sm">Welcome</p>
                            <h2 className="text-xl font-bold text-white">{user?.name || "Mr. John Doe"}</h2>
                        </div>
                        <button
                            onClick={() => setIsLogoutModalOpen(true)}
                            className="ml-auto p-2 bg-white/5 rounded-full hover:bg-white/10 text-white"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Menu */}
                <div className="px-6 space-y-4">
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
                    <MenuItem
                        icon={HelpCircle}
                        label="FAQs"
                        onClick={() => navigate('/')}
                    />

                    {/* Push Notification Toggle */}
                    <div className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-white/5 text-white">
                                <Bell size={20} />
                            </div>
                            <span className="text-white font-medium">Push Notification</span>
                        </div>
                        <Switch
                            checked={pushEnabled}
                            onCheckedChange={setPushEnabled}
                            className="data-[state=checked]:bg-[#7c3aed]"
                        />
                    </div>
                </div>

                {/* Support Card */}
                <div className="px-6 mt-8">
                    <div className="bg-[#eef2ff] rounded-3xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-[#1a1520] font-medium mb-4 max-w-[80%] text-sm leading-relaxed">
                                If you have any other query you can reach out to us.
                            </p>
                            <button className="text-[#7c3aed] font-bold text-sm hover:underline flex items-center gap-1">
                                Discord
                            </button>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#a6b1ff]/20 rounded-full blur-xl translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#7c3aed]/10 rounded-full blur-xl -translate-x-1/2 translate-y-1/2"></div>
                    </div>
                </div>

                <DashboardBottomNav currentTab="Profile" />

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
        </div>
    );
}
