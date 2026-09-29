import { useMemo, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const VisualBackground = () => {
    const themeContext = useTheme();
    const darkMode = themeContext?.darkMode || false;
    
    useEffect(() => {
        console.log('VisualBackground - Dark Mode:', darkMode);
    }, [darkMode]);
    
    const auroraBlobs = useMemo(() => [
        {
            color: darkMode ? 'rgba(166, 177, 255, 0.15)' : 'rgba(99, 102, 241, 0.08)',
            size: 'min(60vw, 400px)',
            top: '-10%',
            left: '-10%',
            duration: '25s',
            delay: '0s'
        },
        {
            color: darkMode ? 'rgba(199, 175, 248, 0.12)' : 'rgba(139, 92, 246, 0.06)',
            size: 'min(50vw, 350px)',
            top: '20%',
            right: '-10%',
            duration: '30s',
            delay: '-5s'
        },
        {
            color: darkMode ? 'rgba(255, 181, 133, 0.1)' : 'rgba(249, 115, 22, 0.05)',
            size: 'min(55vw, 380px)',
            bottom: '-10%',
            left: '15%',
            duration: '28s',
            delay: '-10s'
        }
    ], [darkMode]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-background transition-colors duration-300">
            {/* Animated Aurora Blobs */}
            {auroraBlobs.map((blob, i) => (
                <div
                    key={i}
                    className={`absolute rounded-full blur-[80px] md:blur-[120px] animate-aurora-float ${darkMode ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
                    style={{
                        background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
                        width: blob.size,
                        height: blob.size,
                        top: blob.top,
                        left: blob.left,
                        right: blob.right,
                        bottom: blob.bottom,
                        animationDuration: blob.duration,
                        animationDelay: blob.delay,
                        opacity: darkMode ? 0.4 : 0.25,
                        willChange: 'transform' // Mobile optimization
                    }}
                />
            ))}

            {/* Grid Pattern Overlay - LIGHT MODE */}
            {!darkMode && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 90%)'
                    }}
                />
            )}

            {/* Grid Pattern Overlay - DARK MODE */}
            {darkMode && (
                <div
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #ffffff 1px, transparent 1px),
                            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse at center, black 60%, transparent 90%)',
                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 60%, transparent 90%)'
                    }}
                />
            )}

            {/* Vignette */}
            <div 
                className="absolute inset-0 transition-opacity duration-300"
                style={{
                    background: darkMode 
                        ? 'linear-gradient(to bottom, transparent 0%, transparent 60%, #0a0a0a 100%)'
                        : 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(248, 250, 252, 0.6) 100%)'
                }}
            />

            <style>{`
                @keyframes aurora-float {
                    0% { transform: translate(0, 0) scale(1) rotate(0deg); }
                    33% { transform: translate(2%, 4%) scale(1.1) rotate(5deg); }
                    66% { transform: translate(-3%, 2%) scale(0.9) rotate(-3deg); }
                    100% { transform: translate(0, 0) scale(1) rotate(0deg); }
                }
                .animate-aurora-float {
                    animation: aurora-float linear infinite alternate;
                }
            `}</style>
        </div>
    );
};

export default VisualBackground;
