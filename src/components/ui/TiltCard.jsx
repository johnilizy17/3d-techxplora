import React, { useRef, useState } from 'react';

export default function TiltCard({ children, className = "" }) {
    const ref = useRef(null);
    const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        // Calculate rotation based on cursor position relative to center
        // Integrating a slight dampening factor for smoother feel
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;

        setTransform(`perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={ref}
            className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform, transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    );
}
