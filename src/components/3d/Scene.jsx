import React from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function Scene({ children }) {
    return (
        <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 6], fov: 50 }}
            gl={{ antialias: false, alpha: true }}
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
