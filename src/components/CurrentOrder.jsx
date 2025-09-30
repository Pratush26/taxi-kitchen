import { use, useEffect } from "react";
import { LuUtensilsCrossed } from "react-icons/lu";

export default function CurrentOrder({ orderList, order, setOrder, handleOrder }) {
    const data = use(orderList)
    useEffect(() => {
        setOrder(data)
    },[data, setOrder])
    return (
        <div>
            {
                order.map(e => (
                    <button onClick={() => handleOrder(e)} key={e.id} className="p-6 text-start rounded-lg shadow-xl/50 shadow-gray-500 space-y-1">
                        <div className="flex w-full items-center justify-between gap-2">
                            <span className="px-3 py-2 rounded-full text-white bg-amber-400 text-xs">#{e.order_no}</span>
                            <span className="rounded-full bg-amber-300 text-white font-bold aspect-square px-3 grid place-content-center py-1 text-sm">{e.table_no}</span>
                        </div>
                    <div className="flex gap-2 items-center text-lg">
                        <LuUtensilsCrossed />
                        <span>{e.quantity}</span>
                        <span>{e.order_title}</span>
                    </div>
                    <p className="text-amber-400 font-semibold">Instruction</p>
                        <p className="text-sm text-gray-800">{e.special_instruction}</p>
                    </button>
                ))
            }
        </div>
    )
}