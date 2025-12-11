import { Chess } from 'chess.js'

export class ChessEngine {
    constructor(depth = 3) {
        this.game = new Chess()
        this.depth = depth
    }

    reset() {
        this.game = new Chess()
    }

    getGameState() {
        return this.game.fen()
    }

    getLegalMoves(from) {
        if (from) {
            return this.game.moves({ square: from, verbose: true }).map((m) => m.to)
        }
        return this.game.moves().map((m) => {
            if (typeof m === 'string') return m
            return `${m.from}-${m.to}`
        })
    }

    makeMove(from, to) {
        try {
            const move = this.game.move({ from, to, promotion: 'q' })

            if (move) {
                return {
                    success: true,
                    piece: this.getPieceType(move.piece),
                    captured: move.captured ? this.getPieceType(move.captured) : undefined,
                    isCheck: this.game.isCheck(),
                    isCheckmate: this.game.isCheckmate(),
                    moveType: this.getMoveType(move),
                    promotion: move.promotion
                }
            }

            return {
                success: false,
                message: 'Illegal move'
            }
        } catch (error) {
            return {
                success: false,
                message: 'Invalid move format'
            }
        }
    }

    undoMove() {
        return this.game.undo()
    }

    getBestMove() {
        const moves = this.game.moves({ verbose: true })

        if (moves.length === 0) return null

        let bestMove = moves[0]
        let bestScore = -Infinity

        for (const move of moves) {
            this.game.move(move)
            const score = this.evaluatePosition()
            this.game.undo()

            if (score > bestScore) {
                bestScore = score
                bestMove = move
            }
        }

        return {
            from: bestMove.from,
            to: bestMove.to,
            piece: this.getPieceType(bestMove.piece),
            captured: bestMove.captured ? this.getPieceType(bestMove.captured) : undefined,
            isCheck: bestMove.san?.includes('+') || false,
            isCheckmate: this.game.isCheckmate()
        }
    }

    evaluatePosition() {
        // Simple evaluation function
        const board = this.game.board()
        let score = 0

        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const piece = board[rank][file]
                if (piece) {
                    const value = this.getPieceValue(piece.type)
                    const positionValue = this.getPositionValue(piece, rank, file)
                    const total = value + positionValue

                    if (piece.color === 'w') {
                        score += total
                    } else {
                        score -= total
                    }
                }
            }
        }

        return score
    }

    getPieceValue(type) {
        const values = {
            'p': 100,
            'n': 320,
            'b': 330,
            'r': 500,
            'q': 900,
            'k': 20000
        }
        return values[type] || 0
    }

    getPositionValue(piece, rank, file) {
        // Position tables for piece-square evaluation
        // Simplified tables for brevity in this port, can expand if needed
        const whitePawnTable = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [5, 10, 10, -20, -20, 10, 10, 5],
            [5, -5, -10, 0, 0, -10, -5, 5],
            [0, 0, 0, 20, 20, 0, 0, 0],
            [5, 5, 10, 25, 25, 10, 5, 5],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];

        // For now, only using pawn table as example, returning 0 for others to keep it simple or adding generic centered bonus
        if (piece.type === 'p') {
            const tableRank = piece.color === 'w' ? rank : 7 - rank
            return whitePawnTable[tableRank][file]
        }

        // Generic center bias for other pieces
        const centerFiles = [3, 4];
        const centerRanks = [3, 4];
        if (centerFiles.includes(file) && centerRanks.includes(rank)) return 10;

        return 0
    }

    getPieceType(piece) {
        // If piece is already an object, return it (handled by chess.js sometimes)
        // But here we want our custom format
        const typeKey = typeof piece === 'string' ? piece : piece.type;

        const types = {
            'p': { name: 'Pawn', symbol: '♟' },
            'r': { name: 'Rook', symbol: '♜' },
            'n': { name: 'Knight', symbol: '♞' },
            'b': { name: 'Bishop', symbol: '♝' },
            'q': { name: 'Queen', symbol: '♛' },
            'k': { name: 'King', symbol: '♚' }
        }
        return types[typeKey] || piece
    }

    getMoveType(move) {
        if (move.promotion) return 'promotion'
        if (move.san && move.san.includes('O-O')) return 'castling'
        if (move.flags && move.flags.includes('e')) return 'enPassant'
        return 'normal'
    }

    isGameOver() {
        return this.game.isGameOver()
    }

    getResult() {
        return this.game.pgn() ? this.game.pgn() : null
    }

    getCurrentPlayer() {
        return this.game.turn()
    }

    isCheck() {
        return this.game.isCheck()
    }

    isCheckmate() {
        return this.game.isCheckmate()
    }

    isDraw() {
        return this.game.isDraw() || this.game.isStalemate() || this.game.isThreefoldRepetition()
    }

    getBoard() {
        const position = {}
        const board = this.game.board()

        for (let rank = 0; rank < 8; rank++) {
            for (let file = 0; file < 8; file++) {
                const piece = board[rank][file]
                if (piece) {
                    const square = `${String.fromCharCode(97 + file)}${8 - rank}`
                    position[square] = {
                        type: piece.type,
                        color: piece.color,
                        square
                    }
                }
            }
        }

        return position
    }
}
