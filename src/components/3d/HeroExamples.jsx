import React, { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial, SpotLight, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function Rig() {
    useFrame((state) => {
        state.camera.position.lerp({ x: state.pointer.x * 2, y: state.pointer.y * 1 + 2, z: 6 }, 0.05)
        state.camera.lookAt(0, 0, 0)
    })
}

function Capsule({ position, color, size = 1, rotationSpeed, floatOffset, isMobile }) {
    const mesh = useRef()

    useFrame((state, delta) => {
        if (mesh.current) {
            mesh.current.rotation.y += rotationSpeed
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
                    {isMobile ? (
                        <meshPhysicalMaterial
                            color="#ffffff"
                            metalness={0.1}
                            roughness={0.1}
                            transmission={0.9}
                            thickness={0.5}
                            transparent={true}
                            opacity={0.5}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                        />
                    ) : (
                        <MeshTransmissionMaterial
                            backside={false}
                            samples={6}
                            thickness={0.2}
                            anisotropicBlur={0.1}
                            iridescence={1}
                            iridescenceIOR={1}
                            iridescenceThicknessRange={[0, 1400]}
                            clearcoat={1}
                            clearcoatRoughness={0.1}
                            chromaticAberration={0.1}
                            color="#ffffff"
                            resolution={512}
                            distortion={0.5}
                            distortionScale={0.5}
                            temporalDistortion={0.2}
                        />
                    )}
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
            <Environment preset="night" />

            {/* Key Light */}
            <SpotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={2}
                castShadow={!isMobile}
            />

            <Sparkles
                count={isMobile ? 30 : 100}
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
                    isMobile={isMobile}
                    rotationSpeed={0.002 + Math.random() * 0.001}
                    floatOffset={Math.random() * Math.PI * 2}
                />
            ))}

            {/* Ambient Fill */}
            <ambientLight intensity={0.5} />
        </group>
    )
}
