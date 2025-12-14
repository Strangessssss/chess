"use client"

import Board from "@/ chess/components/board";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5">

        <div className="border-2">
            <Board/>
        </div>
        <div className="flex flex-row items-center justify-center gap-10">
            <button className="w-20 aspect-square bg-red-600 rounded-xl"/>
            <button className="w-20 aspect-square bg-green-600 rounded-xl"/>
        </div>
    </div>
  );
}
