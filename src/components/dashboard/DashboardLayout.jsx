import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardBottomNav from './DashboardBottomNav';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutModal from '@/components/profile/LogoutModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectCurrentUser, updateUser, setHistory } from '@/redux/slices/authSlice';
import MoreMenuDrawer from './MoreMenuDrawer';
import { useGetXpHistoryMutation } from '@/redux/api/authApi';
import { useGetStudentProfileQuery } from '@/redux/api/studentApi';
import { useGetTeacherProfileQuery } from '@/redux/api/teacherApi';

export default function DashboardLayout({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const user = useSelector(selectCurrentUser);
    const [getXpHistory] = useGetXpHistoryMutation();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth/login');
    };

    // Centralized Data Fetching (Matches Legacy DashboardLayout)
    const isStudent = user?.accountable_type === "App\\Models\\Student" || user?.role === 'student';

    // Fetch fresh profile data
    const { data: studentProfile } = useGetStudentProfileQuery(undefined, {
        skip: !user?.id || !isStudent
    });

    const { data: teacherProfile } = useGetTeacherProfileQuery(user?.id, {
        skip: !user?.id || isStudent
    });

    const currentProfile = isStudent ? studentProfile : teacherProfile;
    // Handle potential nested data structure
    const fetchedXp = currentProfile?.data?.xp !== undefined ? currentProfile.data.xp : currentProfile?.xp;

    // Sync XP with Redux state if it changes from API
    useEffect(() => {
        if (fetchedXp !== undefined && fetchedXp !== user?.xp) {
            dispatch(updateUser({ xp: fetchedXp }));
        }
    }, [fetchedXp, user?.xp, dispatch]);

    // Fetch XP History on load and sync to Redux
    useEffect(() => {
        if (user?.id) {
            getXpHistory({ sender_id: user.id, account_id: user.id })
                .unwrap()
                .then((data) => {
                    console.log("XP History Fetch Result:", data);
                    dispatch(setHistory(data));
                })
                .catch((err) => console.error("Failed to fetch XP history:", err));
        }
    }, [user?.id, getXpHistory, dispatch]);

    // Determine current tab for mobile nav
    let currentTab = 'Home';
    if (location.pathname.includes('/groups')) currentTab = 'groups';
    else if (location.pathname.includes('/leaderboard')) currentTab = 'Leaderboard';
    else if (location.pathname.includes('/profile')) currentTab = 'Profile';

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Desktop Sidebar */}
            <Sidebar
                onLogout={() => setIsLogoutModalOpen(true)}
                onMoreToggle={() => setIsMoreOpen(true)}
            />

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 min-h-screen overflow-x-hidden">
                <div className="lg:max-w-7xl lg:mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden">
                <DashboardBottomNav
                    currentTab={currentTab}
                    onLogout={() => setIsLogoutModalOpen(true)}
                    onMoreToggle={() => setIsMoreOpen(true)}
                />
            </div>

            {/* Shared Logout Modal */}
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
            />

            {/* Shared More Menu Drawer */}
            <MoreMenuDrawer
                isOpen={isMoreOpen}
                onClose={() => setIsMoreOpen(false)}
                onLogoutTrigger={() => setIsLogoutModalOpen(true)}
            />
        </div>
    );
}
