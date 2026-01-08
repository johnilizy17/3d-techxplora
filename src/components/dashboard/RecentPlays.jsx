import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const recentGames = [
    { id: 1, title: 'Breaking bad', progress: 30, color: 'from-green-500 to-emerald-700', icon: '🧪' },
    { id: 2, title: 'Guess the logo', progress: 82, color: 'from-yellow-400 to-orange-600', icon: '🤔' },
    { id: 3, title: 'Name the flag', progress: 20, color: 'from-blue-500 to-indigo-700', icon: '🏳️' },
    { id: 4, title: 'Math Quiz', progress: 95, color: 'from-pink-500 to-rose-700', icon: '🔢' },
];

export default function RecentPlays() {
    return (
        <div className="py-6 space-y-4">
            <div className="px-6 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Recent Plays</h2>
                <button className="text-xs font-medium text-[#a6b1ff] hover:text-white flex items-center gap-1 transition-colors">
                    View All <ChevronRight size={14} />
                </button>
            </div>

            <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex gap-4 px-6">
                    {recentGames.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="w-36 h-40 shrink-0 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer overflow-hidden relative group"
                        >
                            {/* Background Gradient opacity */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-20 group-hover:opacity-30 transition-opacity`} />

                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-black/40 flex items-center justify-center text-[10px] text-white font-bold border border-white/10">
                                {game.icon}
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-xs font-bold text-white mb-2 whitespace-normal line-clamp-1">{game.title}</h3>
                                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#a6b1ff] rounded-full"
                                        style={{ width: `${game.progress}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1 font-medium">{game.progress}%</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="opacity-0" />
            </ScrollArea>
        </div>
    );
}
