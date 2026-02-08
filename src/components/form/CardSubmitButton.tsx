"use client";

import { useFormStatus } from "react-dom"
import { Button } from "../ui/button";
import { IoReload } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
    const { pending } = useFormStatus();


    return (
        <Button
            type='submit'
            size='icon'
            variant='outline'
            className='p-2 cursor-pointer z-20 rounded-none'
        >
            {pending ? (
                <IoReload className='animate-spin' />
            ) : isFavorite ? (
                <FaHeart />
            ) : (
                <FaRegHeart />
            )}
        </Button>
    )
}

export default CardSubmitButton