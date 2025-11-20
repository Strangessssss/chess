"use client"

import {useEffect} from "react";
import Cells from "@/components/cells";
import Piece from "@/components/piece";
import {useMatrix} from "@/contexts/MatrixContext";

export default function Board() {
    const boardSize = 700;

    const { matrix, setPiece } = useMatrix();

    useEffect(() => {
        setPiece("pawn", [6, 6])
    }, []);

    return (
        <div className="relative aspect-square border-2"
        style={{
            width: `${boardSize}px`,
        }}
        >
            <Cells />
            <div className="z-40 w-full h-full grid grid-cols-8 grid-rows-8">
                {
                    matrix.map((row, rowIndex) => (
                        row.map((piece, cellIndex: number) => (
                            <Piece key={cellIndex} initPos={[rowIndex, cellIndex]} piece={piece} white/>
                        ))
                    ))
                }
            </div>
        </div>
    )
}