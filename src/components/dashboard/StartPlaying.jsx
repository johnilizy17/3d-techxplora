import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, LayoutGrid, Trophy, User } from 'lucide-react';

const categories = [
    { id: 1, title: 'Sport', color: 'bg-emerald-500', icon: <div className="text-4xl">⚽</div> },
    { id: 2, title: 'History', color: 'bg-blue-600', icon: <div className="text-4xl">📜</div> },
    { id: 3, title: 'Music', color: 'bg-rose-500', icon: <div className="text-4xl">🎵</div> },
    { id: 4, title: 'Science', color: 'bg-violet-600', icon: <div className="text-4xl">🧬</div> },
];

export default function StartPlaying() {
    return (
        <div className="px-6 space-y-4 pb-24">
            <h2 className="text-lg font-bold text-white">Start playing</h2>

            <div className="grid grid-cols-2 gap-4">
                {categories.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                        className={`h-32 rounded-[24px] ${category.color} relative overflow-hidden group cursor-pointer shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]`}
                    >
                        <div className="absolute -right-4 -bottom-4 opacity-30 text-8xl group-hover:scale-110 transition-transform duration-500">
                            {category.icon}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                        <div className="absolute top-4 left-4">
                            <h3 className="text-white font-bold text-lg">{category.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
