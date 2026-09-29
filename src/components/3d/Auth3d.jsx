import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Environment, SpotLight, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

class SafeEnvironment extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('Environment failed to load:', error);
    }

    render() {
        if (this.state.hasError) {
            return <ambientLight intensity={0.8} />;
        }
        return this.props.children;
    }
}

function Rig() {
    const vec = useMemo(() => new THREE.Vector3(), [])
    useFrame((state) => {
        if (!state.camera) return;
        try {
            vec.set(state.pointer.x * 2, state.pointer.y * 1 + 2, 6)
            state.camera.position.lerp(vec, 0.05)
            state.camera.lookAt(0, 0, 0)
        } catch (error) {
            console.error('Rig animation error:', error);
        }
    })
}

function Capsule({ position, color, size = 1, rotationSpeed, floatOffset, isMobile }) {
    const mesh = useRef()

    useFrame((state, delta) => {
        if (mesh.current) {
            try {
                mesh.current.rotation.y += rotationSpeed
            } catch (error) {
                console.error('Capsule animation error:', error);
            }
        }
    })

    return (
        <Float
            speed={2}
            rotationIntensity={1}
            floatIntensity={2}
            position={position}
        >
            <group scale={size} ref={mesh}>
                <mesh castShadow={!isMobile} receiveShadow={!isMobile}>
                    <cylinderGeometry args={[0.4, 0.4, 1.8, 32]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        metalness={0.1}
                        roughness={0.1}
                        transmission={0.9}
                        thickness={0.5}
                        transparent={true}
                        opacity={isMobile ? 0.5 : 0.7}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                        ior={1.5}
                    />
                </mesh>

                {/* Inner Content - Placeholder for 3D Figure */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.5, 0.7, 0.5]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={4}
                        toneMapped={false}
                    />
                </mesh>

                {/* Ring */}
                <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.45, 0.08, 16, 32]} />
                    <meshStandardMaterial
                        color="#ffb585"
                        emissive="#ffb585"
                        emissiveIntensity={2}
                        metalness={0.9}
                        roughness={0.1}
                        toneMapped={false}
                    />
                </mesh>

                {/* Local Light - Only on Desktop */}
                {!isMobile && (
                    <pointLight position={[0, 0, 0]} intensity={5} color={color} distance={3} decay={2} castShadow />
                )}
            </group>
        </Float>
    )
}

export default function HeroExamples() {
    const [isMobile, setIsMobile] = useState(false);
    const [isSafari] = useState(() => {
        if (typeof window === 'undefined') return false;
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1;
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const collectibles = useMemo(() => [
        { position: [-2.5, 0.5, -1], color: "#a6b1ff", size: 1 },
        { position: [2.5, -0.5, -2], color: "#c7aff8", size: 0.9 },
        { position: [0, 1, 0], color: "#ffb585", size: 1.1 },
        { position: [-1.5, -1, 1], color: "#a6b1ff", size: 0.8 },
        { position: [3, 0.8, 0.5], color: "#c7aff8", size: 0.85 },
        { position: [-3, 0, -0.5], color: "#ffb585", size: 0.95 },
    ], [])

    return (
        <group>
            <Rig />
            <SafeEnvironment>
                <Environment preset="night" />
            </SafeEnvironment>

            {/* Key Light 3 */}
            <SpotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={isSafari ? 1 : 2}
                castShadow={!isMobile && !isSafari}
            />

            <Sparkles
                count={isMobile ? 30 : (isSafari ? 50 : 100)}
                scale={12}
                size={4}
                speed={0.4}
                opacity={0.5}
                color="#a6b1ff"
            />

            {collectibles.map((props, i) => (
                <Capsule
                    key={i}
                    {...props}
                    isMobile={isMobile || isSafari}
                    rotationSpeed={0.002 + Math.random() * 0.001}
                    floatOffset={Math.random() * Math.PI * 2}
                />
            ))}

            {/* Ambient Fill */}
            <ambientLight intensity={0.5} />
        </group>
    )
}
