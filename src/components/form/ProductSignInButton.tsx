"use client";

import { SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const ProductSignInButton = () => {
    return (
        <SignInButton mode='modal'>
            <Button type='button' className='mt-8 capitalize' asChild>
                sign in
            </Button>
        </SignInButton>
    );
}

export default ProductSignInButton