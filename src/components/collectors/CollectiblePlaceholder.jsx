import React, { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function CollectiblePlaceholder({
  index = 0,
  name = "Assitant",
  imageUrl = null,
  size = "default" // "small", "default", "large"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();

  const sizeClasses = {
    small: "w-48 h-48",
    default: "w-64 h-64",
    large: "w-80 h-80"
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({ x: y * 12, y: -x * 12 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Popmart-style pastel colors for placeholders
  const placeholderColors = [
    'from-pink-300 via-purple-300 to-blue-300',
    'from-yellow-300 via-orange-300 to-pink-300',
    'from-green-300 via-teal-300 to-cyan-300',
    'from-purple-300 via-pink-300 to-rose-300',
    'from-blue-300 via-indigo-300 to-purple-300',
    'from-amber-300 via-orange-300 to-red-300',
  ];

  const colorGradient = placeholderColors[index % placeholderColors.length];

  return (
    <div
      ref={cardRef}
      className={`relative ${sizeClasses[size]} mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Sparkle particles */}
      <div className="absolute -top-2 -right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Sparkles className="w-5 h-5 text-[#ffb585] animate-pulse" />
      </div>
      <div className="absolute -bottom-2 -left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
        <Sparkles className="w-4 h-4 text-[#c7aff8] animate-pulse" />
      </div>

      {/* Glass capsule container */}
      <div
        className="group relative w-full h-full"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
          transition: isHovered
            ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {/* Outer glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#a6b1ff]/20 via-[#c7aff8]/20 to-[#ffb585]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Glass capsule frame */}
        <div className="relative w-full h-full glass-morphism-strong rounded-3xl p-6 overflow-hidden">
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#c7aff8]/10 via-transparent to-transparent opacity-50" />

          {/* Top light reflection */}
          <div className="absolute top-0 left-1/4 right-1/4 h-20 bg-gradient-to-b from-white/20 to-transparent rounded-full blur-xl" />

          {/* <!-- POPMART STYLE PLACEHOLDER IMAGE --> */}
          <div className="relative w-full h-full flex items-center justify-center breath-float">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${name} - Assitant`}
                className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            ) : (
              /* Popmart-inspired gradient placeholder */
              <div className={`w-full h-full bg-gradient-to-br ${colorGradient} rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl`}>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-50" />

                {/* Character silhouette placeholder */}
                <div className="relative z-10 w-3/4 h-3/4 bg-white/90 rounded-full flex items-center justify-center shadow-inner">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full shadow-lg" />
                </div>

                {/* Cute details */}
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/80 rounded-full shadow-md" />
                <div className="absolute top-1/3 left-1/3 w-4 h-4 bg-pink-400 rounded-full shadow-sm" />
                <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-pink-400 rounded-full shadow-sm" />
              </div>
            )}
          </div>

          {/* Glass floor reflection */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent backdrop-blur-sm" />

          {/* Bottom glow pedestal */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] rounded-full blur-md opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500" />
        </div>

        {/* Corner frame accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
      </div>

      {/* Label underneath */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400/70 tracking-wide uppercase">
          {/* Replace this placeholder with 3D model (GLB) */}
          Assitant
        </p>
        <p className="text-sm text-white/80 font-medium mt-1">
          {name}
        </p>
      </div>
    </div>
  );
}