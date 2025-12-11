import React from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Bot, Brain, Crown, Play } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Chess() {
    const navigate = useNavigate();

    const gameModes = [
        {
            id: 'tutorial',
            title: 'Learn Chess',
            description: 'Interactive tutorial for beginners',
            icon: GraduationCap,
            color: 'text-blue-400',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            border: 'border-blue-500/30',
            difficulty: 'Beginner',
            features: ['Step-by-step lessons', 'Visual explanations', 'Practice exercises']
        },
        {
            id: 'easy',
            title: 'Easy AI',
            description: 'Play against friendly AI',
            icon: Bot,
            color: 'text-green-400',
            gradient: 'from-green-500/20 to-emerald-500/20',
            border: 'border-green-500/30',
            difficulty: 'Beginner',
            features: ['Gentle mistakes', 'Teaching hints', 'Patience']
        },
        {
            id: 'normal',
            title: 'Normal AI',
            description: 'Balanced challenge',
            icon: Brain,
            color: 'text-yellow-400',
            gradient: 'from-yellow-500/20 to-orange-500/20',
            border: 'border-yellow-500/30',
            difficulty: 'Intermediate',
            features: ['Strategic thinking', 'Balanced play', 'Learning opportunities']
        },
        {
            id: 'hard',
            title: 'Advanced AI',
            description: 'Master-level challenge',
            icon: Crown,
            color: 'text-red-400',
            gradient: 'from-red-500/20 to-rose-500/20',
            border: 'border-red-500/30',
            difficulty: 'Advanced',
            features: ['High skill level', 'Complex strategies', 'Challenge mode']
        }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 px-6 pb-20 relative overflow-hidden">
            {/* Background Ambient */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto text-center mb-16">
                <div className="inline-block mb-4 p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                    <Crown className="w-8 h-8 text-[#a6b1ff]" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 font-['Bricolage_Grotesque'] bg-clip-text text-transparent bg-gradient-to-r from-white via-[#a6b1ff] to-[#c7aff8]">
                    Techxplora 3D Chess
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Master the royal game with our AI-powered educational chess platform.
                    Learn, practice, and challenge yourself in an immersive 3D environment.
                </p>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {gameModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                        <div
                            key={mode.id}
                            className={`group relative p-6 rounded-2xl bg-[#12121a] border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl overflow-hidden`}
                        >
                            {/* Hover Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-xl bg-white/5 ${mode.color} border border-white/10 group-hover:bg-white/10 transition-colors`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300`}>
                                        {mode.difficulty}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{mode.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">{mode.description}</p>

                                <div className="space-y-3 mb-8">
                                    {mode.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-gray-300 transition-colors">
                                            <Play className={`w-3 h-3 ${mode.color}`} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    className="w-full relative overflow-hidden group/btn bg-white/10 hover:bg-white/20 text-white border border-white/10"
                                    onClick={() => {
                                        if (mode.id === 'tutorial') {
                                            // Simple navigation to easiest mode for now or dedicated tutorial page if requested
                                            navigate(`/chess/game?difficulty=easy`)
                                        } else {
                                            navigate(`/chess/game?difficulty=${mode.id}`)
                                        }
                                    }}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {mode.id === 'tutorial' ? 'Start Learning' : 'Start Game'}
                                        <Play className="w-4 h-4" />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
