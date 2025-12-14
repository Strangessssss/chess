"use client"

import Board from "@/ chess/components/board";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">
        <div className="border-2">
            <Board/>
        </div>
    </div>
  );
}
