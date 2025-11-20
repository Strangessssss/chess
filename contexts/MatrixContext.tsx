"use client";

import {createContext, useContext, useState, ReactNode, SetStateAction, Dispatch, useEffect} from "react";

export type MatrixType = (string | null)[][];

export interface MatrixContextValue {
    matrix: MatrixType;
    setPiece: (piece: string | null, pos: number[]) => void;

    setMouseOn: Dispatch<SetStateAction<number[]>>;
    mouseOn: number[];
}

const MatrixContext = createContext<MatrixContextValue | undefined>(undefined);

export function MatrixProvider({ children }: { children: ReactNode }) {
    const initialMatrix: MatrixType = Array.from({ length: 8 }, () =>
        Array(8).fill(null)
    );

    const [matrix, setMatrix] = useState<MatrixType>(initialMatrix);
    const [mouseOn, setMouseOn] = useState([-1, -1]);

    useEffect(() => {
        // console.log(mouseOn);
    }, [mouseOn]);

    const setPiece = (piece: string | null, pos: number[]) => {
        setMatrix(prev => {
            const copy = prev.map(r => [...r]);
            copy[pos[0]][pos[1]] = piece;
            return copy;
        });
    };

    return (
        <MatrixContext.Provider value={{ matrix, setPiece, mouseOn, setMouseOn }}>
            {children}
        </MatrixContext.Provider>
    );
}

export function useMatrix() {
    const ctx = useContext(MatrixContext);
    if (!ctx) throw new Error("useMatrix must be used inside MatrixProvider");
    return ctx;
}
