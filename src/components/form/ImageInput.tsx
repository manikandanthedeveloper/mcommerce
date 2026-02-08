import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ImageInput = () => {
    const name = "image";

    return (
        <div className="flex flex-col gap-1">
            <Label htmlFor={name} className="capitalize">Upload Image</Label>
            <Input
                type="file"
                name={name}
                id={name}
                accept="image/*"
            />
        </div>
    )
}

export default ImageInput