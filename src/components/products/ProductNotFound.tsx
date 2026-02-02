import { LiaOpencart } from "react-icons/lia"

function ProductNotFound() {
    return (
        <div className="text-center text-muted-foreground h-64 flex flex-col justify-center items-center">
            <LiaOpencart size={48} className="mx-auto mb-4 text-muted-foreground" />
            No products found.
        </div>
    )
}

export default ProductNotFound