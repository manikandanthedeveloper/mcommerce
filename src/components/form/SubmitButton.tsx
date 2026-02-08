"use client";

import { SubmitButtonProps } from "@/types/SubmitButtonProps";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { IoReload } from "react-icons/io5";

const SubmitButton = ({ className, text = "Submit", size = "lg" }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={cn('capitalize', className)} size={size} disabled={pending}>
            {pending ? (<>
                <IoReload className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
            </>) : text}
        </Button>
    )
}

export default SubmitButton