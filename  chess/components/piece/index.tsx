"use client";

import Image from "next/image";
import {useEffect, useRef, useState} from "react";
import {useBoard} from "@/ chess/contexts/BoardContext";
import PieceType from "@/ chess/types/interfaces/piece";
import {PieceEnum} from "@/ chess/types/enums/piece";

export default function Piece({ Piece }: { Piece: PieceType }) {

    const { boardSize, boardRef, movePiece, setLastSelected, turn, isWhiteKingChecked, isBlackKingChecked, isMate} = useBoard();

    const pieceRef = useRef<HTMLDivElement | null>(null);

    const [dragged, setDragged] = useState(false);

    const checked = () => ((
            Piece.color[0].toLowerCase() === "w" && isWhiteKingChecked)
        || (Piece.color[0].toLowerCase() === "b" && isBlackKingChecked))
        && Piece.piece === PieceEnum.king;


    const followMouse = (e) => {
        if (!pieceRef.current) return;
        if (!boardRef.current) return;

        pieceRef.current.style.left = `${e.clientX - boardRef.current.offsetLeft - boardSize / 8 / 2}px`
        pieceRef.current.style.top = `${e.clientY - boardRef.current.offsetTop - boardSize / 8 / 2}px`
    }

    const handleMouseDown = () => {
        if (!boardRef.current) return;
        if (!pieceRef.current) return;
        if (isMate) return;
        if (turn[0].toLowerCase() !== Piece.color) return;

        setDragged(true);

        setLastSelected(Piece.position)

        document.addEventListener("mousemove", followMouse);

        pieceRef.current.style.scale = "120%"

        document.addEventListener("mouseup", handleMouseUp);
    }

    const handleMouseUp = async (e) => {
        if (!boardRef.current) return;
        if (!pieceRef.current) return;

        setDragged(false);

        const col = Math.floor(map(e.clientX - boardRef.current.offsetLeft, 0, boardSize, 0, 8))
        const row = Math.floor(map(e.clientY - boardRef.current.offsetTop, 0, boardSize, 0, 8))

        pieceRef.current.style.scale = "100%"

        await movePiece(Piece.position, {row: row, col: col})
        centralizePiece();

        document.removeEventListener("mousemove", followMouse);
        document.removeEventListener("mouseup", handleMouseUp);
    }

    const centralizePiece = () => {
        if (!pieceRef.current) return;

        pieceRef.current.style.left = `${boardSize / 8 * Piece.position.col}px`
        pieceRef.current.style.top = `${boardSize / 8 * Piece.position.row}px`
    }

    useEffect(() => {
        centralizePiece();
    }, []);

    return (
        <div
            className={`absolute flex justify-center items-center select-none small
             ${dragged ? "z-50": "z-auto"} ${dragged ? "cursor-grabbing": ""}
             ${turn[0].toLowerCase() === Piece.color && !isMate ? "cursor-grab": ""}
             ${checked() && !isMate ? "shaking": ""}
             ${checked() && isMate ? "transition-all duration-700 rotate-45": ""}
             ${isMate && Piece.piece !== PieceEnum.king ? "transition-all duration-700 scale-90": ""}
             `}
            style={{
                width: `${boardSize / 8}px`,
                height: `${boardSize / 8}px`,
            }}
            ref={pieceRef}
            onMouseDown={handleMouseDown}
        >

            <div className={`relative transition-all duration-300 w-[80%] aspect-square no-drag`}>
                {
                    <Image
                        src={`/1024h/${Piece.color}_${Piece.piece}_png_1024px.png`}
                        alt="piece"
                        fill
                        className="object-contain"
                    />
                }
            </div>
        </div>
    );
}

function map(x:number, in_min:number, in_max:number, out_min:number, out_max:number) {
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
