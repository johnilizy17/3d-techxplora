import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, ShieldCheck, ShieldAlert, ArrowUpRight, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGroupsQuery } from '@/redux/api/teacherApi';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { setTemporaryStorage } from '@/redux/slices/authSlice';
import EmptyState from './EmptyState';
import CopyIcon from './CopyIcon';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from '@/utils/date';

export default function RecentGroups() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";

    const { data: groupsData, isLoading } = useGetGroupsQuery({ type, id: user?.id }, {
        skip: !user?.id
    });


    const groups = Array.isArray(groupsData) ? groupsData : (groupsData?.data || []);
    // Only show first 3 for the dashboard
    const displayGroups = groups.slice(0, 3);

    const handleGroupClick = (group) => {
        dispatch(setTemporaryStorage(group));
        navigate(`/dashboard/teacher/groups?code=${group.group_code}`);
    };

    if (isLoading) {
        return (
            <div className="py-12 flex justify-center">
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-[#a6b1ff]/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#a6b1ff] animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 space-y-6">
            <div className="px-6 lg:px-0 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-2 uppercase">Recent Groups</h2>
                    <div className="h-1 w-12 bg-gradient-to-r from-[#a6b1ff] to-transparent rounded-full" />
                </div>
                <button
                    onClick={() => navigate('/dashboard/groups')}
                    className="group text-sm font-black text-[#a6b1ff] hover:text-white flex items-center gap-2 transition-all duration-300 uppercase tracking-widest"
                >
                    Expand All
                    <div className="p-1 rounded-full bg-white/5 group-hover:bg-[#a6b1ff]/20 transition-colors">
                        <ChevronRight size={16} />
                    </div>
                </button>
            </div>

            {groups.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12">
                    <EmptyState title="No Groups Found" description="You haven't joined or created any groups yet." />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-0">
                    {displayGroups.map((group, index) => (
                        <GroupCard key={group.id || index} group={group} index={index} onClick={() => handleGroupClick(group)} />
                    ))}
                </div>
            )}
        </div>
    );
}

const GroupCard = ({ group, index, onClick }) => {
    const isActive = group.status === "1" || group.status === 1;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            onClick={onClick}
            className="rounded-[2.5rem] bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#a6b1ff]/30 transition-all duration-500 cursor-pointer p-6 relative group overflow-hidden shadow-2xl flex flex-col min-h-[220px]"
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none" />

            {/* Background Decorative Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all duration-700" />

            <div className="flex items-start gap-5 mb-8 relative z-10">
                <div className="relative">
                    <Avatar className="h-16 w-16 rounded-2xl  group-hover:border-[#a6b1ff]/50 transition-all duration-500 shadow-xl group-hover:scale-110">
                        <AvatarImage src={group.image} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-[#a6b1ff]/20 to-[#c7aff8]/20 text-[#a6b1ff] font-black text-xl italic uppercase">
                            {group.title?.charAt(0) || <Users size={24} />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-[#0a0a0a] border border-white/10 shadow-lg">
                        <Users size={12} className="text-[#a6b1ff]" />
                    </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'} text-[9px] font-black uppercase tracking-tighter italic shadow-sm`}>
                            {isActive ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
                            {isActive ? 'Active' : 'Disabled'}
                        </div>
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{timeAgo(group.created_at)}</span>
                    </div>
                    <h3 className="text-xl font-black text-white italic line-clamp-1 uppercase tracking-tighter group-hover:text-[#a6b1ff] transition-colors leading-tight">{group.title}</h3>
                    <p className="text-xs text-white/40 line-clamp-1 font-medium italic mt-1">{group.description || "No group description available"}</p>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
                <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-xl bg-white/5 border border-[#0a0a0a] flex items-center justify-center backdrop-blur-md">
                            <span className="text-[10px] text-white/40 font-black italic">?</span>
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-xl bg-[#a6b1ff]/10 border border-[#0a0a0a] flex items-center justify-center backdrop-blur-md">
                        <span className="text-[9px] text-[#a6b1ff] font-black italic">10+</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] leading-none mb-1">Group Code</span>
                        <span className="text-sm font-black text-[#a6b1ff] uppercase tracking-wider leading-none italic">{group.group_code}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#a6b1ff] hover:text-[#0a0a0a] transition-all duration-300 group/link">
                        <ArrowUpRight size={18} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
