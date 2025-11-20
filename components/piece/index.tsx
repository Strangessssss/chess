"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {useMatrix} from "@/contexts/MatrixContext";

export default function Piece({ piece, white, initPos }: { piece: string | null, white: boolean, initPos: number[] }) {

    const [dragged, setDragged] = useState(false);
    const [position, setPosition] = useState(initPos);

    const { setPiece, mouseOn } = useMatrix();

    const handleUndrag = () => {
        if (position[0] === mouseOn[0] && position[1] === mouseOn[1]) {
            setDragged(false);
            return;
        }

        setPosition(mouseOn);

        setPiece(null, position);
        setPiece(piece, mouseOn);


        setDragged(false);
    }

    useEffect(() => {
        if (!dragged) return;

        const handleMouseUp = () => {
            handleUndrag();
        };

        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragged, position, mouseOn]);

    return (
        <div
            className="flex justify-center items-center w-full h-full select-none"
            onDragStart={(e) => e.preventDefault()}
            onMouseDown={() => setDragged(true)}
        >

            <div className={`relative transition-all duration-300 ${dragged ? "w-[70%]": "w-[80%]"} aspect-square `}>
                {
                   piece &&
                    <Image
                        src={`/1024h/${white ? "w" : "b"}_${piece}_png_1024px.png`}
                        alt="piece"
                        fill
                        className="object-contain cursor-pointer"
                    />
                }
            </div>
        </div>
    );
}
