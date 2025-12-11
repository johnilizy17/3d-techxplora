import React, { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Box, Cylinder, Sphere, Cone, Torus } from '@react-three/drei'

function ChessPiece({ position, piece, color, isHighlighted = false, isDragging = false }) {
    const meshRef = useRef(null)

    useFrame((state) => {
        if (isDragging) {
            if (meshRef.current) {
                meshRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 5) * 0.1
            }
        }
    })

    // Theme colors
    const pieceColor = color === 'w' ? '#f0f0f0' : '#000000'
    const highlightColor = isHighlighted ? '#ffb585' : pieceColor

    // Materials
    const Material = ({ roughness = 0.3, metalness = 0.6 }) => {
        // Different material properties for black pieces to ensure they look "pure black"
        const finalRoughness = color === 'b' ? 0.7 : roughness
        const finalMetalness = color === 'b' ? 0.2 : metalness

        return (
            <meshStandardMaterial
                color={highlightColor}
                roughness={finalRoughness}
                metalness={finalMetalness}
                emissive={highlightColor}
                emissiveIntensity={isHighlighted ? 0.3 : 0}
            />
        )
    }

    const renderPiece = () => {
        switch (piece) {
            case 'p': // Pawn
                return (
                    <group position={[0, 0.4, 0]}>
                        <Cylinder args={[0.3, 0.4, 0.2]} position={[0, -0.3, 0]}><Material /></Cylinder>
                        <Cylinder args={[0.15, 0.25, 0.6]} position={[0, 0.1, 0]}><Material /></Cylinder>
                        <Sphere args={[0.25, 16, 16]} position={[0, 0.5, 0]}><Material /></Sphere>
                    </group>
                )
            case 'r': // Rook
                return (
                    <group position={[0, 0.5, 0]}>
                        <Cylinder args={[0.35, 0.45, 0.2]} position={[0, -0.4, 0]}><Material /></Cylinder>
                        <Cylinder args={[0.25, 0.3, 0.8]} position={[0, 0.1, 0]}><Material /></Cylinder>
                        <Cylinder args={[0.35, 0.35, 0.3]} position={[0, 0.6, 0]}><Material /></Cylinder>
                        {/* Battlements */}
                        <Box args={[0.15, 0.2, 0.75]} position={[0, 0.7, 0]}><Material /></Box>
                        <Box args={[0.75, 0.2, 0.15]} position={[0, 0.7, 0]}><Material /></Box>
                    </group>
                )
            case 'n': // Knight (Abstract Horse Head)
                return (
                    <group position={[0, 0.5, 0]}>
                        <Cylinder args={[0.35, 0.45, 0.2]} position={[0, -0.4, 0]}><Material /></Cylinder>
                        <Cylinder args={[0.2, 0.3, 0.6]} position={[0, 0, 0]}><Material /></Cylinder>
                        {/* Head */}
                        <Box args={[0.2, 0.4, 0.5]} position={[0, 0.5, -0.1]} rotation={[Math.PI / 4, 0, 0]}><Material /></Box>
                        <Box args={[0.1, 0.4, 0.1]} position={[0, 0.6, 0.2]} rotation={[Math.PI / 4, 0, 0]}><Material /></Box>
                        <Box args={[0.18, 0.2, 0.2]} position={[0, 0.55, -0.4]} rotation={[Math.PI / 4, 0, 0]}><Material /></Box>
                    </group>
                )
            case 'b': // Bishop
                return (
                    <group position={[0, 0.6, 0]}>
                        <Cylinder args={[0.35, 0.45, 0.2]} position={[0, -0.5, 0]}><Material /></Cylinder>
                        <Cylinder args={[0.15, 0.3, 1.0]} position={[0, 0.1, 0]}><Material /></Cylinder>
                        <Sphere args={[0.22, 16, 16]} position={[0, 0.7, 0]}><Material /></Sphere>
                        <Sphere args={[0.08, 16, 16]} position={[0, 0.95, 0]}><Material /></Sphere>
                        <Torus args={[0.15, 0.05, 16, 32]} position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}><Material /></Torus>
                    </group>
                )
            case 'q': // Queen
                return (
                    <group position={[0, 0.75, 0]}>
                        <Cylinder args={[0.4, 0.5, 0.2]} position={[0, -0.65, 0]}><Material /></Cylinder>
                        <Cylinder args={[0.2, 0.3, 1.3]} position={[0, 0.1, 0]}><Material /></Cylinder>
                        <Torus args={[0.25, 0.05, 16, 32]} position={[0, 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}><Material /></Torus>
                        <Sphere args={[0.3, 16, 16]} position={[0, 0.9, 0]}><Material /></Sphere>
                        <Cone args={[0.35, 0.2, 8]} position={[0, 1.1, 0]}><Material /></Cone>
                        <Sphere args={[0.1, 16, 16]} position={[0, 1.25, 0]}><Material /></Sphere>
                    </group>
                )
            case 'k': // King
                return (
                    <group position={[0, 0.85, 0]}>
                        <Cylinder args={[0.4, 0.5, 0.2]} position={[0, -0.75, 0]}><Material /></Cylinder>
                        <Cylinder args={[0.25, 0.35, 1.5]} position={[0, 0.1, 0]}><Material /></Cylinder>
                        <Torus args={[0.3, 0.08, 16, 32]} position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}><Material /></Torus>
                        <Box args={[0.15, 0.6, 0.15]} position={[0, 1.1, 0]}><Material /></Box>
                        <Box args={[0.4, 0.15, 0.15]} position={[0, 1.2, 0]}><Material /></Box>
                    </group>
                )
            default: return null
        }
    }

    return (
        <group ref={meshRef} position={position}>
            {/* Shadow plane specifically for the piece */}
            <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.4, 32]} />
                <meshBasicMaterial color="#000000" transparent opacity={0.3} />
            </mesh>
            {renderPiece()}
        </group>
    )
}

function Square({ position, square, isSelected, isLastMove, onClick, piece }) {
    const [isHovered, setIsHovered] = useState(false)
    const file = square.charCodeAt(0) - 97
    const rank = parseInt(square[1]) - 1
    const isLight = (file + rank) % 2 === 0

    const tileColor = isLight ? '#E8E8E8' : '#36454F' // Off-white vs Charcoal

    const hoverColor = '#a6b1ff'
    const selectedColor = '#c7aff8'
    const lastMoveColor = '#ffb585'

    const finalColor = isSelected ? selectedColor : isLastMove ? lastMoveColor : isHovered ? hoverColor : tileColor

    return (
        <group>
            <Box
                position={position}
                args={[1, 0.2, 1]} // Thicker squares
                onClick={onClick}
                onPointerOver={() => setIsHovered(true)}
                onPointerOut={() => setIsHovered(false)}
            >
                <meshStandardMaterial
                    color={finalColor}
                    roughness={0.2}
                    metalness={0.1}
                />
            </Box>

            {(rank === 0 || file === 0) && (
                <Text
                    position={[position[0] - 0.4, position[1] + 0.11, position[2] + 0.4]}
                    fontSize={0.15}
                    color={isLight ? "#333" : "#ccc"}
                    anchorX="center"
                    anchorY="middle"
                    rotation={[-Math.PI / 2, 0, 0]}
                    fillOpacity={0.7}
                >
                    {rank === 0 && square[0]}
                    {file === 0 && square[1]}
                </Text>
            )}

            {piece && (
                <ChessPiece
                    position={[position[0], position[1] + 0.2 + 0.01, position[2]]} // Adjust Y for thicker square
                    piece={piece.type || piece}
                    color={piece.color || (piece === piece.toUpperCase() ? 'w' : 'b')}
                />
            )}
        </group>
    )
}

function ChessBoard({ board, isPlayerTurn, selectedSquare, onSquareClick, onMakeMove, moveHistory, isAIMoving }) {
    const squares = useMemo(() => {
        const result = []
        for (let rank = 1; rank <= 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const square = `${String.fromCharCode(97 + file)}${rank}`
                const position = [file - 3.5, 0, rank - 4.5]
                const piece = board && board[square] ? board[square] : null
                result.push({ square, position, piece })
            }
        }
        return result
    }, [board])

    const lastMoveSquares = useMemo(() => {
        if (moveHistory.length === 0) return { from: null, to: null }
        const lastMove = moveHistory[moveHistory.length - 1]
        return { from: lastMove.from, to: lastMove.to }
    }, [moveHistory])

    const handleSquareClick = (square) => {
        if (!isPlayerTurn || isAIMoving) return
        if (!selectedSquare) {
            const piece = board[square]
            if (piece && piece.color === 'w') onSquareClick(square)
        } else {
            if (selectedSquare === square) {
                onSquareClick(null);
            } else {
                onMakeMove(selectedSquare, square)
                onSquareClick(null)
            }
        }
    }

    return (
        <group>
            {/* Board Frame */}
            <Box position={[0, -0.2, 0]} args={[9.5, 0.4, 9.5]}>
                <meshStandardMaterial color="#5c4033" roughness={0.4} /> {/* Dark wood */}
            </Box>
            <Box position={[0, -0.05, 0]} args={[8.5, 0.1, 8.5]}>
                <meshStandardMaterial color="#000" roughness={0.8} /> {/* Inner Gap */}
            </Box>

            {squares.map(({ square, position, piece }) => (
                <Square
                    key={square}
                    position={position}
                    square={square}
                    piece={piece}
                    isSelected={selectedSquare === square}
                    isLastMove={lastMoveSquares.from === square || lastMoveSquares.to === square}
                    onClick={() => handleSquareClick(square)}
                />
            ))}
        </group>
    )
}

export default function ChessBoard3D({ board, ...props }) {
    const [windowHeight, setWindowHeight] = useState(600)
    const [windowWidth, setWindowWidth] = useState(800)

    useEffect(() => {
        const updateSize = () => {
            setWindowHeight(Math.min(600, window.innerHeight * 0.6))
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const cameraPosition = windowWidth < 768 ? [0, 12, 8] : [0, 10, 8]

    return (
        <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/10" style={{ height: windowHeight }}>
            <Canvas camera={{ position: cameraPosition, fov: 45 }} shadows>
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[5, 10, 5]}
                    castShadow
                    intensity={1.2}
                    shadow-mapSize={[2048, 2048]}
                    shadow-bias={-0.001}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#fff" />

                <ChessBoard board={board} {...props} />

                <OrbitControls
                    enablePan={false}
                    minPolarAngle={0.1}
                    maxPolarAngle={Math.PI / 2.2}
                    minDistance={6}
                    maxDistance={18}
                />
            </Canvas>
        </div>
    )
}
