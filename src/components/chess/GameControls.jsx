import React from 'react'
import { Play, RotateCcw, Settings, MessageCircle, Pause, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const difficultySettings = {
    easy: {
        name: 'Easy',
        color: 'text-green-400',
        borderColor: 'border-green-500/50',
        description: 'Perfect for learning',
        aiDepth: 2
    },
    normal: {
        name: 'Normal',
        color: 'text-yellow-400',
        borderColor: 'border-yellow-500/50',
        description: 'Balanced challenge',
        aiDepth: 4
    },
    hard: {
        name: 'Advanced',
        color: 'text-red-400',
        borderColor: 'border-red-500/50',
        description: 'Master level',
        aiDepth: 6
    }
}

export default function GameControls({
    gameState,
    currentDifficulty,
    onStartGame,
    onResetGame,
    onUndoMove,
    canUndo,
    onDifficultyChange // Added to allow changing difficulty
}) {
    const currentSettings = difficultySettings[currentDifficulty] || difficultySettings.easy

    const getStatusMessage = () => {
        switch (gameState) {
            case 'waiting': return 'Ready to start'
            case 'ready': return 'Game ready to begin'
            case 'playing': return 'Game in progress'
            case 'checkmate': return 'Checkmate!'
            case 'stalemate': return 'Stalemate'
            case 'draw': return 'Draw'
            default: return 'Unknown state'
        }
    }

    const getStatusColorClass = () => {
        switch (gameState) {
            case 'playing': return 'bg-green-500/20 text-green-300 border-green-500/40'
            case 'checkmate': return 'bg-purple-500/20 text-purple-300 border-purple-500/40'
            case 'waiting': case 'ready': return 'bg-blue-500/20 text-blue-300 border-blue-500/40'
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/40'
        }
    }

    return (
        <div className="space-y-4">
            {/* Game Status Card */}
            <div className={`p-4 rounded-xl border-2 ${currentSettings.borderColor} bg-white/5 backdrop-blur-md`}>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <Settings className={`w-6 h-6 ${currentSettings.color}`} />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">{currentSettings.name} Mode</span>
                            <span className="text-xs text-white/50">{currentSettings.description}</span>
                        </div>
                    </div>

                    <div className={`mt-2 py-1 px-3 rounded-full border text-center text-sm font-bold ${getStatusColorClass()}`}>
                        {getStatusMessage()}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md space-y-3">
                {gameState === 'waiting' || gameState === 'ready' || gameState === 'checkmate' ? (
                    <Button
                        onClick={onStartGame}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold h-10 shadow-lg"
                    >
                        <Play className="w-4 h-4 mr-2" /> Start Game
                    </Button>
                ) : (
                    <div className="flex gap-2 w-full">
                        <Button
                            onClick={onUndoMove}
                            disabled={!canUndo}
                            variant="outline"
                            className="flex-1 border-white/20 hover:bg-white/10 text-white"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" /> Undo
                        </Button>
                        <Button
                            onClick={onResetGame}
                            variant="outline"
                            className="flex-1 border-white/20 hover:bg-white/10 text-white"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Reset
                        </Button>
                    </div>
                )}
            </div>

            {/* Settings Dropdown */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <h3 className="font-bold text-md mb-2">Quick Settings</h3>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start border-white/20 bg-white/10 text-white">
                            <Settings className="w-4 h-4 mr-2" />
                            Difficulty: {currentSettings.name}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#1a1a2e] border-white/10 text-white w-56 z-[100]" align="start">
                        {Object.entries(difficultySettings).map(([key, settings]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => onDifficultyChange && onDifficultyChange(key)}
                                className="hover:bg-white/10 cursor-pointer"
                            >
                                <div className="flex flex-col">
                                    <span className={currentDifficulty === key ? 'font-bold text-[#a6b1ff]' : ''}>
                                        {settings.name}
                                    </span>
                                    <span className="text-xs text-white/50">{settings.description}</span>
                                </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Tips */}
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className={`w-5 h-5 ${currentSettings.color}`} />
                    <h3 className="font-bold">{currentSettings.name} Tips</h3>
                </div>
                <div className="space-y-1 text-sm text-white/60">
                    {currentDifficulty === 'easy' && (
                        <>
                            <p>• Take your time to think</p>
                            <p>• Focus on basic piece development</p>
                            <p>• Don't be afraid to experiment</p>
                        </>
                    )}
                    {currentDifficulty === 'normal' && (
                        <>
                            <p>• Plan 2-3 moves ahead</p>
                            <p>• Watch for tactical opportunities</p>
                            <p>• Control the center squares</p>
                        </>
                    )}
                    {currentDifficulty === 'hard' && (
                        <>
                            <p>• Think about positional themes</p>
                            <p>• Calculate multiple variations</p>
                            <p>• Focus on long-term planning</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
