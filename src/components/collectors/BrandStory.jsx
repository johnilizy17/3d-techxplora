import React, { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

export default function BrandStory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const storyPoints = [
    { text: "Founded in passion", delay: 0 },
    { text: "Crafted in detail", delay: 200 },
    { text: "Delivered with love", delay: 400 },
    { text: "Collected for life", delay: 600 }
  ];

  return (
    <div 
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]"
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#a8d8ff] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c9b3ff] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="mb-12 inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-[#ffb366]" />
          <span className="text-sm text-gray-300 tracking-wider">Our Journey</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-white">
          Where Art Meets
          <span className="block mt-2 bg-gradient-to-r from-[#a8d8ff] via-[#c9b3ff] to-[#ffb366] bg-clip-text text-transparent">
            Collectibility
          </span>
        </h2>

        <div className="space-y-8 mb-16">
          {storyPoints.map((point, index) => (
            <div
              key={index}
              className={`transform transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : index % 2 === 0 
                    ? 'opacity-0 -translate-x-20' 
                    : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: `${point.delay}ms` }}
            >
              <div className="inline-block glass-effect px-8 py-4 rounded-2xl border border-white/10 hover:border-[#a8d8ff]/50 transition-colors">
                <p className="text-2xl md:text-3xl font-light text-gray-300 tracking-wide">
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`transform transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            We curate the world's most exceptional collectible figures, bringing together 
            artistry, craftsmanship, and storytelling. Each piece in our collection represents 
            a moment captured in time, waiting to become part of your story.
          </p>
        </div>
      </div>
    </div>
  );
}