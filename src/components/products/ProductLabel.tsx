import { ReactNode } from "react";

function ProductLabel({ position, color, children }: { position?: string; color?: string; children: ReactNode }) {

    return (
        <div className={`p-1 text-white text-center text-sm font-semibold w-16 absolute rounded-tr-md rounded-bl-md z-10 ${position} ${color}`}>{children}</div>
    )
}

export default ProductLabel