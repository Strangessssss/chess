import {useMatrix} from "@/contexts/MatrixContext";

export default function Cells() {
    const { setMouseOn } = useMatrix();

    return (
        <div className="z-0 left-0 top-0 absolute w-full h-full grid grid-cols-8 grid-rows-8">
            {
                Array(8).fill(null).map((i, iIdx) => (
                    Array(8).fill(null).map((j, jIdx) => (
                        <div onMouseOver={() => setMouseOn([iIdx, jIdx])} key={jIdx} className={`w-full h-full grid grid-cols-2 grid-rows-2 ${jIdx % 2 === (iIdx % 2) ? 'bg-amber-700' : ''} font-bold text-xl select-none`}>
                            <div className={`p-1 ${jIdx % 2 === (iIdx % 2) ? 'text-white' : 'text-amber-700'}`}>
                                {
                                    jIdx === 0 ?  8 - iIdx: null
                                }
                            </div>
                            <div className={`row-start-2 col-start-2 flex justify-end items-end p-1 ${jIdx % 2 === (iIdx % 2) ? 'text-white' : 'text-amber-700'}`}>
                                {
                                    iIdx === 7 ? String.fromCharCode(97 + jIdx) : null
                                }
                            </div>
                        </div>
                    ))
                ))
            }
        </div>
    )
}