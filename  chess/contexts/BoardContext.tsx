"use client";

import React, {createContext, useContext, useState, ReactNode, useRef, RefObject} from "react";
import PieceType from "@/ chess/types/interfaces/piece";

import PositionType from "@/ chess/types/interfaces/position";
import {loadFromFEN} from "@/ chess/fen/parseFen";
import MoveType from "@/ chess/types/interfaces/move";
import {idx2Coor, jsonToMoves} from "@/ chess/helpers";


export interface BoardContextValue {
    boardSize: number;

    pieces: PieceType[];

    getBoard: () => void;

    setPiece: (piece: PieceType) => void;
    removePieceByPos: (position: PositionType) => void;

    movePiece: (piece: PositionType, newPosition: PositionType) => Promise<boolean>;

    boardRef: RefObject<HTMLDivElement | null>

    possibleMoves: MoveType[];

    lastSelected: PositionType | null;
    setLastSelected: React.Dispatch<React.SetStateAction<PositionType | null>>;

    turn: string;

    isBlackKingChecked: boolean;
    isWhiteKingChecked: boolean;

    isMate: boolean;
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {

    const boardSize = 700;

    const boardRef = useRef<HTMLDivElement>(null);

    const [pieces, setPieces] = useState<PieceType[]>([]);

    const [turn, setTurn] = useState<string>("white");

    const [lastSelected, setLastSelected] = useState<PositionType | null>(null);

    const [possibleMoves, setPossibleMoves] = useState<MoveType[]>([]);

    const [isBlackKingChecked, setIsBlackKingChecked] = useState<boolean>(false);

    const [isWhiteKingChecked, setIsWhiteKingChecked] = useState<boolean>(false);

    const [isMate, setIsMate] = useState<boolean>(false);



    const setPiece = (piece: PieceType) => {
        setPieces(prev => {
            const idx = prev.findIndex(
                p => p.position.col === piece.position.col &&
                    p.position.row === piece.position.row
            );

            const copy = [...prev];

            if (idx !== -1) {
                copy.splice(idx, 1);
            }

            return [...prev, piece];
        });
    };

    const movePiece = async (piecePos: PositionType, newPos: PositionType) => {
        const availableMoves = possibleMoves.filter(move => move.from.row === piecePos.row && move.from.col === piecePos.col);

        if (availableMoves.findIndex(m => m.to.col === newPos.col && m.to.row === newPos.row) === -1) return false;

        if (newPos.col < 0 || newPos.col > 7 ||
            newPos.row < 0 || newPos.row > 7) {
            console.error("Invalid position: out of board bounds");
            return false;
        }

        const pieceCoordinates = idx2Coor(piecePos)
        const newCoordinates = idx2Coor(newPos)

        const data = await fetch("http://localhost:5095/api/v1/move", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: pieceCoordinates,
                to: newCoordinates
            })
        }).then(res => res.json());

        setPossibleMoves(jsonToMoves(data.moves));

        setTurn(data.turn);

        setIsBlackKingChecked(data.blackKingChecked);
        setIsWhiteKingChecked(data.whiteKingChecked);

        setIsMate(data.isMate);

        setPieces([]);
        loadFromFEN(
            data.fen,
            setPiece
        );

        return true;
    }

    const removePieceByIdx = (idx: number) => {
        setPieces(pieces.filter((_, index) => index !== idx));
    }

    const removePieceByPos = (position: PositionType) => {
        const foundPiece = pieces.findIndex(
            p => p.position.col === position.col
                && p.position.row === position.row);

        if (foundPiece !== -1) {
            setPieces(pieces.filter((_, index) => index !== foundPiece));
        }

        console.error("no piece found");
    }

    const getBoard = async () => {
        const data = await fetch("http://localhost:5095/api/v1/board")
            .then(res => res.json());

        setPossibleMoves(jsonToMoves(data.moves));

        setTurn(data.turn);

        setIsBlackKingChecked(data.blackKingChecked);
        setIsWhiteKingChecked(data.whiteKingChecked);

        setIsMate(data.isMate)

        setPieces([]);
        loadFromFEN(
            data.fen,
            setPiece
        );
    }


    return (
        <BoardContext.Provider value={{ pieces, getBoard, boardSize, removePieceByPos, setPiece, boardRef, movePiece, possibleMoves, lastSelected, setLastSelected, turn, isBlackKingChecked, isWhiteKingChecked, isMate }}>
            {children}
        </BoardContext.Provider>
    );
}

export function useBoard() {
    const ctx = useContext(BoardContext);
    if (!ctx) throw new Error("useMatrix must be used inside MatrixProvider");
    return ctx;
}
