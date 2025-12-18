import {fenToPiece} from "@/ chess/helpers";
import PieceType from "@/ chess/types/interfaces/piece";

export function loadFromFEN(
    fen: string,
    setPiece: (pieceInfo: PieceType) => void
) {
    const boardPart = fen.split(' ')[0];
    const ranks = boardPart.split('/');

    for (let fenRow = 0; fenRow < 8; fenRow++) {
        const rank = ranks[fenRow];
        let col = 0;

        for (const char of rank) {
            if (!isNaN(Number(char))) {
                col += Number(char);
            } else {
                const pieceInfo = fenToPiece[char];
                if (!pieceInfo) continue;

                setPiece({
                    id: `${col}_${fenRow}_${char}`,
                    color: pieceInfo.color,
                    piece: pieceInfo.piece,
                    position: {
                        col,
                        row: fenRow
                    }
                });

                col++;
            }
        }
    }
}