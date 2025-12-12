import React from 'react';
import { Sparkles, Heart, Globe, Shield } from 'lucide-react';
const Scene = React.lazy(() => import("@/components/3d/Scene"));
const HeroExamples = React.lazy(() => import("@/components/3d/HeroExamples"));

export default function About() {
    return (
        <div className="relative min-h-screen pt-20 overflow-hidden">

            {/* Background with 3D elements (dimmed) */}
            <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
                <React.Suspense fallback={null}>
                    <Scene>
                        <HeroExamples />
                    </Scene>
                </React.Suspense>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">

                {/* Header */}
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom duration-700">
                    <h1 className="text-5xl md:text-8xl font-bold mb-8">
                        <span className="gradient-text-shine">Techxplora</span>
                    </h1>
                    <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                        Reimagining education through the power of 3D interactivity and digital ownership.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    {[
                        {
                            icon: <Sparkles className="w-6 h-6 text-[#ffb585]" />,
                            title: "Engagement",
                            desc: "Gamifying the learning process to keep students motivated and excited."
                        },
                        {
                            icon: <Globe className="w-6 h-6 text-[#a6b1ff]" />,
                            title: "Accessibility",
                            desc: "Bringing high-quality educational tools to anyone with a browser."
                        },
                        {
                            icon: <Shield className="w-6 h-6 text-[#c7aff8]" />,
                            title: "Ownership",
                            desc: "Giving students true digital ownership of their achievements."
                        }
                    ].map((item, i) => (
                        <div key={i} className="glass-morphism p-8 rounded-2xl hover:bg-white/5 transition-colors">
                            <div className="mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Story Section */}
                <div className="glass-morphism-strong rounded-[3rem] p-12 md:p-16 mb-20 bg-gradient-to-br from-[#0a0a0a] to-[#1a1520]">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl font-bold mb-6 text-white">The Story</h2>
                            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                                <p>
                                    Techxplora started with a simple question: <span className="text-[#a6b1ff]">Why can't homework be as fun as video games?</span>
                                </p>
                                <p>
                                    We built a platform where academic success translates directly into tangible digital rewards. By combining state-of-the-art 3D web technologies with proven pedagogical methods, we're creating a new standard for ed-tech.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="aspect-square rounded-2xl bg-gradient-to-tr from-[#a6b1ff] to-[#c7aff8] opacity-20 animate-pulse" />
                            {/* Placeholder for story image */}
                        </div>
                    </div>
                </div>

                {/* Credits */}

            </div>
        </div>
    );
}
