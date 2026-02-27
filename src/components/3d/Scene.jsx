import React from 'react'
import VisualBackground from '@/components/collectors/VisualBackground'

/**
 * Scene component - Replaced heavy 3D Canvas with lightweight VisualBackground
 * Maintains the children prop for backward compatibility where needed.
 */
export default function Scene({ children }) {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            <VisualBackground />
            {children}
        </div>
    )
}
