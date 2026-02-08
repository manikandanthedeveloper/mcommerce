"use client";

import { ActionFunction } from "@/types/ActionFuction";
import { ReactNode, useActionState, useEffect, forwardRef } from "react";
import { toast } from "sonner";

const initialState = {
    message: '',
}

const FormContainer = forwardRef<HTMLFormElement, { action: ActionFunction; children: ReactNode }>(
    ({ action, children }, ref) => {
        const [state, formAction] = useActionState(action, initialState);

        useEffect(() => {
            if (state && state.message) {
                toast.success(state.message);
            }
        }, [state])
        return (
            <form action={formAction} ref={ref}>{children}</form>
        )
    }
)

FormContainer.displayName = 'FormContainer';

export default FormContainer