"use client";

import { ActionFunction } from "@/types/ActionFuction";
import { ReactNode, useActionState, useEffect } from "react";
import { toast } from "sonner";

const initialState = {
    message: '',
}

const FormContainer = ({ action, children }: { action: ActionFunction; children: ReactNode }) => {
    const [state, formAction] = useActionState(action, initialState);

    useEffect(() => {
        if (state && state.message) {
            toast.success(state.message);
        }
    }, [state])
    return (
        <form action={formAction}>{children}</form>
    )
}

export default FormContainer