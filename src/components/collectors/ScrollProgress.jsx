import React from 'react';

export default function ScrollProgress({ progress }) {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2">
      {/* Progress line */}
      <div className="relative w-0.5 h-64 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] transition-all duration-300 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      
      {/* Glowing node */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#a6b1ff] transition-all duration-300 ease-out"
        style={{ 
          top: `${progress * 100}%`,
          boxShadow: '0 0 12px rgba(166, 177, 255, 0.8), 0 0 24px rgba(199, 175, 248, 0.4)'
        }}
      />
    </div>
  );
}