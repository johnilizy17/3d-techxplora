import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
const Scene = React.lazy(() => import("../3d/Scene"));
const HeroExamples = React.lazy(() => import("../3d/HeroExamples"));

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1520] to-[#0a0a0a]" />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <React.Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-t-[#a6b1ff] border-r-transparent border-b-[#c7aff8] border-l-transparent rounded-full animate-spin"></div></div>}>
          <Scene>
            <HeroExamples />
          </Scene>
        </React.Suspense>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/40 to-[#0a0a0a] pointer-events-none z-1" />

      {/* Hero content with parallax */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: Math.max(0, 1 - scrollY / 500),
        }}
      >
        {/* Premium badge */}
        <div className="mb-8 inline-flex items-center gap-2 glass-morphism px-6 py-3 rounded-full animate-in fade-in slide-in-from-top duration-700">
          <Sparkles className="w-4 h-4 text-[#a6b1ff]" />
          <span className="text-sm text-gray-300 tracking-[0.2em] uppercase font-medium">Play Smart</span>
        </div>

        {/* Main headline with gradient shine */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="gradient-text-shine block mb-2">
            Join the Challenge
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-3xl text-gray-400/90 mb-14 max-w-3xl font-light tracking-wide leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          Quiz. Play. Win.
        </p>

        {/* CTA with halo effect */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full md:w-auto px-4">
          <Button
            onClick={scrollToNext}
            className="interactive halo-click relative w-full md:w-auto px-10 py-8 text-xl font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_6px_0_#8b95cc] active:shadow-none active:translate-y-[6px]"
          >
            <span className="relative z-10 tracking-wide">For Teacher & Student</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Button>
          <Button
            onClick={scrollToNext}
            className="interactive halo-click relative w-full md:w-auto px-10 py-8 text-xl font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_6px_0_#8b95cc] active:shadow-none active:translate-y-[6px]"
          >
            <span className="relative z-10 tracking-wide">For Sponsers & Partner</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#a6b1ff] drop-shadow-[0_0_12px_rgba(166,177,255,0.6)]" />
        </div>
      </div>
    </div>
  );
}
