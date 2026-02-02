import { MdFavoriteBorder } from "react-icons/md";
import { Button } from "../ui/button";

function FavouriteButton() {
    return (
        <Button variant="ghost" size="icon-lg" className="cursor-pointer">
            <MdFavoriteBorder size={30} />
        </Button>
    )
}

export default FavouriteButton