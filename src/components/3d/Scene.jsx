import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

// Detect Safari before component renders
const detectSafari = () => {
    if (typeof window === 'undefined') return false;
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
};

export default function Scene({ children }) {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isSafari] = useState(detectSafari);

    useEffect(() => {
        setMounted(true);

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => {
            window.removeEventListener('resize', checkMobile);
            setMounted(false);
        };
    }, []);

    if (!mounted) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-t-[#a6b1ff] border-r-transparent border-b-[#c7aff8] border-l-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <Canvas
            shadows={!isMobile && !isSafari}
            dpr={isSafari ? [1, 1] : [1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{
                antialias: !isSafari,
                alpha: true,
                powerPreference: 'high-performance',
                preserveDrawingBuffer: true,
                failIfMajorPerformanceCaveat: false
            }}
            frameloop="always"
            performance={{ min: 0.5 }}
            onCreated={({ gl }) => {
                gl.setClearColor('#0a0a0a', 0);
            }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
            {children}
            {/* <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.5} />
            </EffectComposer> */}
        </Canvas>
    )
}
