import { ImageInputContainerProps } from "@/types/ImageInputContainerProps"
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";

const ImageInputContainer = (props: ImageInputContainerProps) => {
    const { image, name, action, text } = props;
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4">
            <Image src={image} width={200} height={200} alt={name} className="w-50 h-50 object-cover rounded-none" />
            <p className="text-sm text-gray-600 dark:text-gray-400">{text}</p>
            <Button
                variant="default"
                onClick={() => setIsUpdateFormVisible(!isUpdateFormVisible)}
                size="sm"
            >
                Update {text}
            </Button>
            {isUpdateFormVisible && (
                <div className="w-full max-w-md mt-4">
                    <FormContainer action={action}>
                        {props.children}
                        <ImageInput />
                    </FormContainer>
                </div>
            )}
        </div>
    )
}

export default ImageInputContainer