"use client"

import {useEffect} from "react";
import {useBoard} from "@/ chess/contexts/BoardContext";
import PieceType from "@/ chess/types/interfaces/piece";
import Piece from "@/ chess/components/piece";

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
            {
                lastSelected &&
                possibleMoves.filter(move => move.from.row === lastSelected.row && move.from.col === lastSelected.col)
                    .map((possibleMove, index) => (
                    <div
                        key={index}
                        className={`absolute flex justify-center items-center border-neutral-500 border-7 rounded-full z-20 opacity-50 cursor-pointer
                         ${pieces.findIndex(p => p.position.row === possibleMove.to.row && p.position.col === possibleMove.to.col) !== -1 
                            ? "scale-95":
                            "scale-30 bg-neutral-500"}`}
                        style={{
                            width: `${boardSize / 8}px`,
                            height: `${boardSize / 8}px`,
                            left: `${boardSize / 8 * possibleMove.to.col}px`,
                            top: `${boardSize / 8 * possibleMove.to.row}px`,
                        }}
                        onClick={() => { movePiece({col: possibleMove.from.col, row: possibleMove.from.row}, {col: possibleMove.to.col, row: possibleMove.to.row})}} />
                ))
            }
            {
                pieces.map((piece: PieceType) => (
                    <Piece key={`${piece.position.col}${piece.position.row}`}  Piece={piece}/>
                ))
            }
        </div>
    )
}