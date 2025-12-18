"use client"

import {useEffect} from "react";
import {useBoard} from "@/ chess/contexts/BoardContext";
import PieceType from "@/ chess/types/interfaces/piece";
import Piece from "@/ chess/components/piece";
import PiecesList from "@/ chess/components/pieces/pieces-list";
import PossibleMovesList from "@/ chess/components/possible-moves/possible-moves-list";

export default function Board() {

    const { pieces, getBoard, boardSize, boardRef, possibleMoves, lastSelected, movePiece } = useBoard();

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div className="relative aspect-square bg-[url(/board.png)] bg-contain"
        style={{
            width: `${boardSize}px`,
        }}
             ref={boardRef}
        >
            <PiecesList />
            <PossibleMovesList />
        </div>
    )
}