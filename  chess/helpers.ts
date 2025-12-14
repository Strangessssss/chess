import {ColorEnum} from "@/ chess/types/enums/color";
import {PieceEnum} from "@/ chess/types/enums/piece";
import MoveType from "@/ chess/types/interfaces/move";
import PositionType from "@/ chess/types/interfaces/position";

export const fenToPiece: Record<string, { color: ColorEnum; piece: PieceEnum }> = {
    'K': { color: ColorEnum.white, piece: PieceEnum.king },
    'Q': { color: ColorEnum.white, piece: PieceEnum.queen },
    'R': { color: ColorEnum.white, piece: PieceEnum.rook },
    'B': { color: ColorEnum.white, piece: PieceEnum.bishop },
    'N': { color: ColorEnum.white, piece: PieceEnum.knight },
    'P': { color: ColorEnum.white, piece: PieceEnum.pawn },

    'k': { color: ColorEnum.black, piece: PieceEnum.king },
    'q': { color: ColorEnum.black, piece: PieceEnum.queen },
    'r': { color: ColorEnum.black, piece: PieceEnum.rook },
    'b': { color: ColorEnum.black, piece: PieceEnum.bishop },
    'n': { color: ColorEnum.black, piece: PieceEnum.knight },
    'p': { color: ColorEnum.black, piece: PieceEnum.pawn }
};


export function jsonToMoves(data): MoveType[] {
    const moves: MoveType[] =  [];

    for (const move of data) {
        const from =  coor2Idx(move.from)
        const to =  coor2Idx(move.to)
        moves.push({
            from: {
                col: from.col,
                row: from.row
            },
            to: {
                col: to.col,
                row: to.row
            }
        });
    }

    return moves;
}

export function coor2Idx(coordinate: string): PositionType {
    if (!/^[a-h][1-8]$/i.test(coordinate)) {
        throw new Error(`Invalid chess coordinate: ${coordinate}`);
    }

    const colChar = coordinate[0].toLowerCase();
    const rowChar = coordinate[1];

    const columnIndex = colChar.charCodeAt(0) - 'a'.charCodeAt(0);

    const rowIndex = 8 - parseInt(rowChar, 10);

    return {
        row: rowIndex,
        col: columnIndex
    };
}

export function idx2Coor(position: PositionType): string {
    const { row, col } = position;

    if (row < 0 || row > 7 || col < 0 || col > 7) {
        throw new Error(`Invalid chess position: row=${row}, col=${col}`);
    }

    const columnChar = String.fromCharCode('a'.charCodeAt(0) + col);
    const rowNumber = 8 - row;

    return `${columnChar}${rowNumber}`;
}