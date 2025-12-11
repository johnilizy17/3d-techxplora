import React, { useState } from 'react'
import { Lightbulb, History, Trophy, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import * as Collapsible from '@radix-ui/react-collapsible'

export default function EducationalPanel({ educationalFact, moveHistory, currentMove }) {
    const [expandedSections, setExpandedSections] = useState({
        facts: true,
        history: true,
        analysis: false
    })

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    // Calculate move analysis
    const analysis = {
        totalMoves: moveHistory.length,
        whiteMoves: moveHistory.filter((_, index) => index % 2 === 0).length,
        blackMoves: moveHistory.filter((_, index) => index % 2 === 1).length,
        mistakes: 0,
    }

    const getMoveEfficiency = () => {
        if (moveHistory.length === 0) return 0
        const blackMoveCount = Math.floor(currentMove / 2)
        const whiteMoveCount = Math.ceil(currentMove / 2)
        return Math.min((blackMoveCount / whiteMoveCount) * 100, 100)
    }

    const Card = ({ children, className = "" }) => (
        <div className={`bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 shadow-lg ${className}`}>
            {children}
        </div>
    )

    const SectionHeader = ({ icon: Icon, title, sectionKey }) => (
        <div className="flex items-center justify-between w-full mb-4">
            <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#a6b1ff]" />
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection(sectionKey)}
                className="text-white/60 hover:text-white hover:bg-white/10"
            >
                {expandedSections[sectionKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
        </div>
    )

    return (
        <div className="flex flex-col gap-4 w-full h-full overflow-y-auto pr-2 custom-scrollbar">
            {/* Educational Fact */}
            <Card>
                <SectionHeader icon={Lightbulb} title="Educational Insight" sectionKey="facts" />

                <Collapsible.Root open={expandedSections.facts}>
                    <Collapsible.Content className="animate-in slide-in-from-top-2 duration-200">
                        {educationalFact ? (
                            <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border-l-4 border-yellow-500">
                                <div className="text-sm leading-relaxed text-gray-200 whitespace-pre-line">
                                    {educationalFact}
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-white/5 rounded-lg text-center">
                                <p className="text-white/40 italic text-sm">
                                    Make a move to receive educational insights about chess strategy and history!
                                </p>
                            </div>
                        )}
                    </Collapsible.Content>
                </Collapsible.Root>
            </Card>

            {/* Game Statistics */}
            <Card>
                <SectionHeader icon={Trophy} title="Game Progress" sectionKey="analysis" />

                <Collapsible.Root open={expandedSections.analysis}>
                    <Collapsible.Content className="flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">Moves Played:</span>
                            <span className="font-bold">{moveHistory.length}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">White Moves:</span>
                            <span className="bg-white/10 px-2 py-0.5 rounded text-xs">{analysis.whiteMoves}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">Black Moves (AI):</span>
                            <span className="bg-black/40 px-2 py-0.5 rounded text-xs">{analysis.blackMoves}</span>
                        </div>

                        <div className="h-px bg-white/10 my-2" />

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-white/60">Game Progress</span>
                                <span className="font-bold">{Math.round((moveHistory.length / 40) * 100)}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${(moveHistory.length / 40) * 100}%` }}
                                />
                            </div>
                            <p className="text-xs text-white/40">Average game length: 40 moves</p>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </Card>

            {/* Move History */}
            <Card>
                <SectionHeader icon={History} title="Move History" sectionKey="history" />

                <Collapsible.Root open={expandedSections.history}>
                    <Collapsible.Content>
                        {moveHistory.length === 0 ? (
                            <div className="p-4 bg-white/5 rounded-lg text-center">
                                <p className="text-white/40 italic text-sm">
                                    No moves yet. Start the game!
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
                                {moveHistory.map((move, index) => (
                                    <div
                                        key={index}
                                        className={`p-2 rounded flex justify-between items-center ${index % 2 === 0 ? 'bg-white/5' : 'transparent'}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs px-1.5 py-0.5 rounded ${move.isAI ? 'bg-red-500/20 text-red-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                                {Math.floor(index / 2) + 1}.
                                            </span>
                                            {move.isCheck && <span className="text-xs bg-yellow-500/20 text-yellow-300 px-1 rounded">+</span>}
                                            {move.isCheckmate && <span className="text-xs bg-purple-500/20 text-purple-300 px-1 rounded">#</span>}

                                            <span className="text-sm font-mono text-white/90">
                                                {move.from} → {move.to}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {move.captured && (
                                                <span className="text-xs text-white/40">x {move.captured.name}</span>
                                            )}
                                            <span className="text-xs border border-white/20 px-1 rounded uppercase min-w-[1.5rem] text-center">
                                                {typeof move.piece === 'string' ? move.piece : move.piece.symbol}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Collapsible.Content>
                </Collapsible.Root>
            </Card>
        </div>
    )
}
