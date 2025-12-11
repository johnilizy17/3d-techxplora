import React, { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor ring */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-screen transition-all duration-200 ease-out hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
        }}
      >
        <div 
          className={`rounded-full border-2 transition-all duration-300 ${
            isHovering 
              ? 'w-12 h-12 border-[#c7aff8] bg-[#c7aff8]/20' 
              : 'w-8 h-8 border-[#a6b1ff] bg-[#a6b1ff]/10'
          }`}
          style={{
            boxShadow: isHovering 
              ? '0 0 20px rgba(199, 175, 248, 0.6)' 
              : '0 0 12px rgba(166, 177, 255, 0.4)'
          }}
        />
      </div>
      
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
    </>
  );
}