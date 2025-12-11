import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ChessEngine } from '@/lib/chess/chess-engine'
import { educationalFacts } from '@/lib/chess/educational-facts'
import ChessBoard3D from '@/components/chess/ChessBoard3D'
import EducationalPanel from '@/components/chess/EducationalPanel'
import GameControls from '@/components/chess/GameControls'
import { Toaster, toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"

const difficultySettings = {
    easy: { name: 'Easy', aiDepth: 2 },
    normal: { name: 'Normal', aiDepth: 4 },
    hard: { name: 'Advanced', aiDepth: 6 }
}

export default function ChessGame() {
    const navigate = useNavigate()
    const location = useLocation()

    // Parse query params mainly for difficulty
    const searchParams = new URLSearchParams(location.search)
    const initialDifficulty = searchParams.get('difficulty') || 'easy'

    const [currentDifficulty, setCurrentDifficulty] = useState(initialDifficulty)
    const [gameState, setGameState] = useState('waiting')
    const [isPlayerTurn, setIsPlayerTurn] = useState(true)
    const [selectedSquare, setSelectedSquare] = useState(null)
    const [moveHistory, setMoveHistory] = useState([])
    const [currentMove, setCurrentMove] = useState(0)
    const [isAIThinking, setIsAIThinking] = useState(false)
    const [educationalFact, setEducationalFact] = useState(null)
    const [chessEngine, setChessEngine] = useState(null)

    const [board, setBoard] = useState({}) // State to hold current visual board

    const difficulty = difficultySettings[currentDifficulty]

    // Initialize engine
    useEffect(() => {
        const engine = new ChessEngine(difficulty.aiDepth)
        setChessEngine(engine)
        setBoard(engine.getBoard())
        setGameState('ready')

        toast.info(`${difficulty.name} Mode`, {
            description: `AI thinking depth: ${difficulty.aiDepth}`
        })
    }, [currentDifficulty]) // Re-init if difficulty changes

    // Game Loop methods
    const startGame = useCallback(() => {
        if (chessEngine) {
            chessEngine.reset()
            setBoard(chessEngine.getBoard())
            setGameState('playing')
            setIsPlayerTurn(true)
            setSelectedSquare(null)
            setMoveHistory([])
            setCurrentMove(0)
            setEducationalFact(null)
            toast.success('Game Started!', { description: 'White pieces go first.' })
        }
    }, [chessEngine])

    const makePlayerMove = useCallback(async (from, to) => {
        if (!chessEngine || !isPlayerTurn || gameState !== 'playing') return false

        // Optimistic checking? No, engine is sync for player
        const result = chessEngine.makeMove(from, to)

        if (result.success) {
            const newMove = {
                from,
                to,
                piece: result.piece,
                captured: result.captured,
                moveNumber: currentMove + 1,
                timestamp: new Date(),
                isCheck: result.isCheck || false,
                isCheckmate: result.isCheckmate || false,
                // Assuming simplified format, if Engine returned more detail we use it
                ...result // contains moveType, promotion etc
            }

            setMoveHistory(prev => [...prev, newMove])
            setCurrentMove(prev => prev + 1)
            setBoard(chessEngine.getBoard()) // Update visual board
            setIsPlayerTurn(false)

            // Fact
            const fact = educationalFacts.getRandomFact(result.piece.type || result.piece, result.moveType || 'normal')
            setEducationalFact(fact)

            if (result.isCheckmate) {
                setGameState('checkmate')
                toast.success('Checkmate!', { description: 'You won the game!' })
            } else if (result.isCheck) {
                toast.warning('Check!', { description: 'Enemy king is in check.' })
            }

            return true
        } else {
            toast.error('Invalid Move', { description: result.message })
            return false
        }
    }, [chessEngine, isPlayerTurn, gameState, currentMove])

    // AI Turn
    useEffect(() => {
        if (!isPlayerTurn && gameState === 'playing' && chessEngine && !isAIThinking) {
            setIsAIThinking(true)

            // Artificial delay for realism
            const timer = setTimeout(() => {
                try {
                    const aiMove = chessEngine.getBestMove()

                    if (aiMove) {
                        // Apply move on engine
                        chessEngine.makeMove(aiMove.from, aiMove.to)

                        const aiMoveHistory = {
                            from: aiMove.from,
                            to: aiMove.to,
                            piece: aiMove.piece,
                            captured: aiMove.captured,
                            moveNumber: currentMove + 1,
                            timestamp: new Date(),
                            isCheck: aiMove.isCheck || false,
                            isCheckmate: aiMove.isCheckmate || false,
                            isAI: true
                        }

                        setMoveHistory(prev => [...prev, aiMoveHistory])
                        setCurrentMove(prev => prev + 1)
                        setBoard(chessEngine.getBoard())
                        setIsPlayerTurn(true)

                        if (aiMove.isCheckmate) {
                            setGameState('checkmate')
                            toast.error('Checkmate!', { description: 'The AI won the game.' })
                        } else if (aiMove.isCheck) {
                            toast.warning('Check!', { description: 'Your king is in check.' })
                        }

                        // AI Fact sometimes
                        if (Math.random() > 0.5) {
                            const fact = educationalFacts.getRandomFact('all', 'intermediate')
                            setEducationalFact(fact)
                        }
                    }
                } catch (err) {
                    console.error("AI Error", err)
                    toast.error('AI Error')
                }
                setIsAIThinking(false)
            }, 1000)

            return () => clearTimeout(timer)
        }
    }, [isPlayerTurn, gameState, chessEngine, currentMove, isAIThinking])


    const resetGame = () => {
        if (chessEngine) {
            chessEngine.reset()
            setBoard(chessEngine.getBoard())
            setGameState('ready')
            setIsPlayerTurn(true)
            setSelectedSquare(null)
            setMoveHistory([])
            setCurrentMove(0)
            setEducationalFact(null)
            setIsAIThinking(false)
        }
    }

    const undoMove = () => {
        if (chessEngine && moveHistory.length > 0 && gameState === 'playing') {
            chessEngine.undoMove() // Undo AI
            if (moveHistory.length > 1 && !isPlayerTurn) {
                // If it was AI's turn, we undid player's move. Wait, logic:
                // If player clicks undo while it's their turn, we undo AI move AND player move.
                // If it's AI turn (unlikely to click undo then), we shouldn't allow it.
            }
            // Actually typical undo: Undo AI move, then Undo Player move.
            // If it is player's turn, then last move was AI. So undo AI, then undo Player.

            if (isPlayerTurn && moveHistory.length >= 2) {
                chessEngine.undoMove() // Undo AI
                // Need to check if last move was actually AI.
                if (moveHistory[moveHistory.length - 1].isAI) {
                    chessEngine.undoMove() // Undo Player as well
                    const newHistory = moveHistory.slice(0, -2)
                    setMoveHistory(newHistory)
                    setCurrentMove(newHistory.length)
                }
            } else {
                // Just undo one move? (e.g. 2 player mode or manual)
                // For vs AI, usually undo 2 plies.
                // If we only made 1 move, undo 1.
                if (moveHistory.length === 1) {
                    chessEngine.undoMove()
                    setMoveHistory([])
                    setCurrentMove(0)
                }
            }

            // Sync board
            setBoard(chessEngine.getBoard())
            setIsPlayerTurn(true) // Always back to player
            setSelectedSquare(null)
        }
    }

    if (!chessEngine) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a] text-white">
                <Loader2 className="w-10 h-10 animate-spin text-[#a6b1ff]" />
                <span className="ml-4">Initializing Engine...</span>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-24 px-4 pb-10 text-white selection:bg-[#a6b1ff]/30">
            <Toaster position="top-center" theme="dark" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <Button variant="ghost" className="text-white/60 hover:text-white" onClick={() => navigate('/chess')}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Menu
                    </Button>

                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold font-['Bricolage_Grotesque'] bg-clip-text text-transparent bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8]">
                            3D Chess Arena
                        </h1>
                        {isAIThinking && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs">
                                <Loader2 className="w-3 h-3 animate-spin" /> AI Thinking...
                            </div>
                        )}
                    </div>
                </div>

                {/* Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: 3D Board (Main Stage) */}
                    <div className="lg:col-span-8 w-full">
                        <ChessBoard3D
                            gameState={gameState}
                            board={board}
                            isPlayerTurn={isPlayerTurn}
                            selectedSquare={selectedSquare}
                            onSquareClick={setSelectedSquare}
                            onMakeMove={makePlayerMove}
                            moveHistory={moveHistory}
                            isAIMoving={isAIThinking}
                        />
                    </div>

                    {/* Right: Controls & Info */}
                    <div className="lg:col-span-4 space-y-6 h-full flex flex-col">
                        <GameControls
                            gameState={gameState}
                            currentDifficulty={currentDifficulty}
                            onStartGame={startGame}
                            onResetGame={resetGame}
                            onUndoMove={undoMove}
                            canUndo={moveHistory.length > 0 && isPlayerTurn}
                            onDifficultyChange={setCurrentDifficulty}
                        />

                        <div className="flex-1 min-h-[400px]">
                            <EducationalPanel
                                educationalFact={educationalFact}
                                moveHistory={moveHistory}
                                currentMove={currentMove}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
