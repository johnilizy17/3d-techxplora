import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';

export default function EmptyState({ title = "No data found", description }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 px-4 text-center"
        >
            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5b21b6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <FolderOpen size={40} className="text-gray-500 relative z-10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            {description && (
                <p className="text-gray-400 text-sm max-w-xs mx-auto">
                    {description}
                </p>
            )}
        </motion.div>
    );
}
