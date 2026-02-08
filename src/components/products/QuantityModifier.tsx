"use client"

import { FaCartPlus, FaMinus, FaPlus } from "react-icons/fa"
import { Button } from "../ui/button"
import { MouseEvent, useState } from "react";

function QuantityModifier() {
    const [count, setCount] = useState(0);

    const handleClick = (callback: () => void) => (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        callback();
    };

    return (
        <div className="relative z-20">
            {count ? (
                <div className="flex items-center">
                    <Button variant="default" size="sm" className="rounded-none mr-2 cursor-pointer" onClick={handleClick(() => setCount(count - 1))}><FaMinus /></Button>
                    <span className="mx-2">{count}</span>
                    <Button variant="default" size="sm" className="rounded-none ml-2 cursor-pointer" onClick={handleClick(() => setCount(count + 1))}><FaPlus /></Button>
                </div>
            ) : (<Button variant="default" size="sm" className="rounded-none cursor-pointer" onClick={handleClick(() => setCount(1))}><FaCartPlus /></Button>)}
        </div>
    )
}

export default QuantityModifier