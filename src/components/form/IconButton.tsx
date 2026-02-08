"use client";

import { CiTrash } from "react-icons/ci";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { IoReload } from "react-icons/io5";

type actionType = "edit" | "delete";

const IconButton = ({ action }: { action: actionType }) => {
    const { pending } = useFormStatus();

    const renderIcon = () => {
        switch (action) {
            case "edit":
                return <FaRegPenToSquare className="h-10 w-10" />;
            case "delete":
                return <CiTrash className="h-10 w-10" />;
            default:
                const never: never = action;
                throw new Error(`Unhandled action type: ${never}`);
        }
    }

    return (
        <Button type="submit" size="icon" variant="link" className="p-2 cursor-pointer">
            {pending ? <IoReload className="h-4 w-4 animate-spin" /> : renderIcon()}
        </Button>
    )
}

export default IconButton