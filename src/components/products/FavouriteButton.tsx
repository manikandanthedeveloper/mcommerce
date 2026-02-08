import { auth } from "@clerk/nextjs/server";
import CardSignInButton from "../form/CardSignInButton";
import { fetchFavoriteId } from "@/util/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavouriteButton({ productId }: { productId: string }) {
    const { userId } = await auth();

    if (!userId) return <CardSignInButton />;

    const favoriteId = await fetchFavoriteId({ productId });

    return <FavoriteToggleForm productId={productId} favoriteId={favoriteId} />
}

export default FavouriteButton