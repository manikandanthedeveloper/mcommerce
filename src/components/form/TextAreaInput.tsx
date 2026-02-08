import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const TextAreaInput = ({ name, labelText, defaultValue }: { name: string; labelText?: string, defaultValue?: string }) => {
    return (
        <div>
            {labelText && <Label htmlFor={name} className="capitalize mb-2 text-primary-dark/50">{labelText || name}</Label>}
            <Textarea id={name} name={name} defaultValue={defaultValue} rows={5} required className="resize-none leading-loose rounded-none border cursor-text" />
        </div>
    )
}

export default TextAreaInput