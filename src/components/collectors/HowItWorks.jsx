import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import {
  UserPlus,
  Hash,
  Sparkles,
  Trophy,
  Building2,
  Rocket,
  Share2,
  LineChart,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const learnSteps = [
  {
    icon: UserPlus,
    title: "Create your account",
    description: "Pick Student or Teacher in seconds.",
    color: "#a6b1ff",
  },
  {
    icon: Hash,
    title: "Join with a code",
    description: "Enter your class or challenge code.",
    color: "#c7aff8",
  },
  {
    icon: Sparkles,
    title: "Play daily & earn rewards",
    description: "Build streaks, win XP and coins.",
    color: "#ffb585",
  },
  {
    icon: Trophy,
    title: "Track progress & rank up",
    description: "Dashboard + leaderboard in one place.",
    color: "#a8d8ff",
  }
];

const sponsorSteps = [
  {
    icon: Building2,
    title: "Create a challenge",
    description: "Choose topic, rules, and duration.",
    color: "#a6b1ff",
  },
  {
    icon: Rocket,
    title: "Launch with schools",
    description: "Invite cohorts and partner schools fast.",
    color: "#c7aff8",
  },
  {
    icon: Share2,
    title: "Drive participation",
    description: "Rewards + leaderboards motivate students.",
    color: "#ffb585",
  },
  {
    icon: LineChart,
    title: "Measure real impact",
    description: "Get engagement and outcomes reports.",
    color: "#a8d8ff",
  }
];

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' or 'sponsor'
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    setVisibleSteps([]);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  const triggerAnimation = () => {
    setVisibleSteps([]);
    const steps = activeTab === 'learn' ? learnSteps : sponsorSteps;
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, index]);
      }, index * 150);
    });
  };

  const currentSteps = activeTab === 'learn' ? learnSteps : sponsorSteps;

  return (
    <div
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#030014]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">
            How It Works
          </h2>

          {/* Toggle Switch */}
          <div className="inline-flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl mb-12">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'learn'
                ? 'bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Learn & Compete
            </button>
            <button
              onClick={() => setActiveTab('sponsor')}
              className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'sponsor'
                ? 'bg-gradient-to-r from-[#c7aff8] to-[#ffb585] text-[#0a0a0a] shadow-lg'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              Sponsor a Challenge
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {currentSteps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);

            return (
              <div
                key={`${activeTab}-${index}`}
                className={`transform transition-all duration-700 ${isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-10 scale-95'
                  }`}
              >
                <Card className="interactive relative h-full glass-morphism bg-white/5 border-white/10 p-8 group hover:border-[#a6b1ff]/30 transition-all duration-500">
                  <div className="relative space-y-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent border border-white/10 group-hover:scale-110 transition-transform duration-500"
                      style={{ boxShadow: `0 0 40px ${step.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#a6b1ff] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* CTA Section for Learn Pathway */}
        {activeTab === 'learn' && (
          <div className="flex flex-col items-center gap-6 mb-32 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
              <Button
                className="interactive relative px-10 py-7 text-lg font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_5px_0_#8b95cc] active:shadow-none active:translate-y-[5px]"
                onClick={() => window.location.href = "/auth/signup"}
              >
                <span className="relative z-10 tracking-wide">Start Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Button>
              <Button
                variant="outline"
                className="interactive px-10 py-7 text-lg font-bold border-2 border-white/10 bg-transparent text-white rounded-xl hover:bg-white/5 hover:border-[#a6b1ff]/30 transition-all duration-300 flex items-center gap-2"
                onClick={() => window.location.href = "/auth/group"}
              >
                Join with a Code
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-500 text-sm font-medium tracking-wide">
              "No payment needed to start."
            </p>
          </div>
        )}

        {/* CTA Section for Sponsor Pathway */}
        {activeTab === 'sponsor' && (
          <div className="flex flex-col items-center gap-6 mb-32 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
              <Button
                className="interactive relative px-10 py-7 text-lg font-bold bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_5px_0_#8b95cc] active:shadow-none active:translate-y-[5px]"
                onClick={() => window.location.href = "/auth/signup"}
              >
                <span className="relative z-10 tracking-wide">Sponsor a Challenge</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffb585] via-[#a6b1ff] to-[#c7aff8] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Button>
              <Button
                variant="outline"
                className="interactive px-10 py-7 text-lg font-bold border-2 border-white/10 bg-transparent text-white rounded-xl hover:bg-white/5 hover:border-[#a6b1ff]/30 transition-all duration-300 flex items-center gap-2"
                onClick={() => window.location.href = "/auth/login"}
              >
                Login with ease
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-gray-500 text-sm font-medium tracking-wide">
              "Run challenges with measurable CSR outcomes."
            </p>
          </div>
        )}

        {/* Video Section */}
        <div className="mt-40 max-w-5xl mx-auto text-center">
          <div className="mb-12 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              See Techxplora in 60 seconds
            </h3>
            <p className="text-gray-400 text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Learn how students join challenges, earn rewards, and track progress; and how schools/sponsors run competitions.
            </p>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden glass-morphism border border-white/10 shadow-[0_0_80px_rgba(166,177,255,0.1)] group">
            {/* Cinematic Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#a6b1ff]/20 via-transparent to-[#ffb585]/20 mix-blend-overlay z-0" />
            <div className="absolute inset-0 bg-[#030014]/40 z-0" />

            {/* Animated Grid Overlay for "Tech" look */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-0" />

            <div
              className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group/play"
              onClick={() => setShowVideo(true)}
            >
              <div className="relative">
                {/* Pulsing play button rings */}
                <div className="absolute inset-0 rounded-full bg-[#a6b1ff]/20 animate-ping duration-[3000ms]" />
                <div className="absolute inset-0 rounded-full bg-[#a6b1ff]/10 animate-pulse duration-[2000ms]" />

                <div className="relative w-28 h-28 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover/play:scale-110 group-hover/play:border-[#a6b1ff]/50 transition-all duration-500 shadow-[0_0_50px_rgba(166,177,255,0.3)]">
                  <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[32px] border-l-white border-b-[18px] border-b-transparent ml-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Post-Video CTAs */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
            <Button
              className="interactive relative px-8 py-6 text-base font-bold bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_4px_0_#8b95cc] active:shadow-none active:translate-y-[4px]"
              onClick={() => window.location.href = "/auth/signup"}
            >
              <span className="relative z-10 tracking-wide">Start as Student/Teacher</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Button>

            <Button
              variant="outline"
              className="interactive px-8 py-6 text-base font-bold border border-white/10 bg-white/5 text-white rounded-xl hover:bg-white/10 hover:border-[#a6b1ff]/30 transition-all duration-300"
              onClick={() => window.location.href = "/auth/signup/?page=3"
              }
            >
              Sponsor a Challenge
            </Button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(166,177,255,0.15)] border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 border border-white/10"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/3Irx1TdHvfA?autoplay=1"
              title="Techxplora Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}