import React from 'react';
import Sidebar from './Sidebar';
import DashboardBottomNav from './DashboardBottomNav';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutModal from '@/components/profile/LogoutModal';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    // Determine current tab for mobile nav
    let currentTab = 'Home';
    if (location.pathname.includes('/groups')) currentTab = 'groups';
    else if (location.pathname.includes('/leaderboard')) currentTab = 'Leaderboard';
    else if (location.pathname.includes('/profile')) currentTab = 'Profile';

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Desktop Sidebar */}
            <Sidebar onLogout={() => setIsLogoutModalOpen(true)} />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 min-h-screen overflow-x-hidden">
                <div className="lg:max-w-7xl lg:mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden">
                <DashboardBottomNav currentTab={currentTab} />
            </div>

            {/* Shared Logout Modal */}
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
}
