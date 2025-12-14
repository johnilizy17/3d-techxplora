import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Search, Palette, TentTreeIcon, Package, X } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Register",
    description: "Click the get Start Button to start",
    color: "#1175c7ff",
    delay: 0
  },
  {
    icon: Palette,
    title: "Start a Quiz",
    description: "start a quiz by a quiz code",
    color: "#5f2fdaff",
    delay: 200
  },
  {
    icon: TentTreeIcon,
    title: "Manage Teachers",
    description: "add the teachers and quiz with ea",
    color: "#ffb366",
    delay: 400
  },
  {
    icon: Package,
    title: "Full Access",
    description: "Start a zero cost",
    color: "#a8d8ff",
    delay: 600
  }
];

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, index) => {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Four simple steps to start your collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`transform transition-all duration-1000 ${isVisible
                  ? 'opacity-100 translate-y-0'
                  : isEven
                    ? 'opacity-0 -translate-y-20'
                    : 'opacity-0 translate-y-20'
                  }`}
              >
                <Card className="interactive relative h-full glass-effect bg-gray-900/80 border-white/10 p-8 group hover:border-[#a8d8ff]/50 transition-all duration-300 hover:scale-105">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg"
                    style={{ background: `linear-gradient(135deg, ${step.color}, transparent)` }}
                  />

                  <div className="relative space-y-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center glass-effect border border-white/20 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        boxShadow: `0 0 30px ${step.color}40`
                      }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full glass-effect"
                          style={{ color: step.color }}
                        >
                          Step {index + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white group-hover:text-[#a8d8ff] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-gradient-to-r from-[#a8d8ff] to-transparent" />
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>

        {/* Video Section */}
        <div className="mt-32 max-w-5xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden glass-effect border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 mix-blend-overlay" />

            {/* Placeholder for Video - Replace src with actual video URL */}
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/40 group cursor-pointer hover:bg-black/30 transition-colors"
              onClick={() => setShowVideo(true)}
            >
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-2" />
              </div>
              <p className="absolute bottom-8 text-white/80 font-light tracking-widest text-sm uppercase">
                Watch Tutorial
              </p>
            </div>

            {/* If using actual video, uncomment and use this:
            <video 
              className="w-full h-full object-cover"
              controls
              poster="/path/to/poster-image.jpg"
            >
              <source src="/path/to/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            */}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
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