import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const RatingInput = ({ name, labelText }: { name: string, labelText?: string }) => {
    const numberOfStars = Array.from({ length: 5 }, (_, i) => (i + 1).toString()).reverse();

    return (
        <div className="max-w-xs mb-4">
            <Label htmlFor={name} className="text-sm mb-2 text-primary-dark/50 capitalize">{labelText || name}</Label>
            <Select name={name} defaultValue={numberOfStars[0]} required>
                <SelectTrigger className="w-full rounded-none border cursor-pointer">
                    <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent className="rounded-none border cursor-pointer">
                    {numberOfStars.map((star) => (
                        <SelectItem key={star} value={star}>
                            {star} Star{star !== "1" && "s"}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}

export default RatingInput