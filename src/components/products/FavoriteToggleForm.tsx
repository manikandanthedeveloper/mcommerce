"use client";

import { FavoriteToggleFormProps } from "@/types/FavoriteToggleFormProps"
import { toggleFavoriteAction } from "@/util/actions";
import { usePathname } from "next/navigation"
import FormContainer from "../form/FormContainer";
import CardSubmitButton from "../form/CardSubmitButton";

const FavoriteToggleForm = ({ productId, favoriteId }: FavoriteToggleFormProps) => {
    const pathname = usePathname();
    const toggleAction = toggleFavoriteAction.bind(null, {
        productId,
        favoriteId,
        pathname,
    });

    return (
        <FormContainer action={toggleAction}>
            <CardSubmitButton isFavorite={favoriteId ? true : false} />
        </FormContainer>
    )
}

export default FavoriteToggleForm