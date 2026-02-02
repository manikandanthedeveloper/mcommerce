import { Separator } from "@/components/ui/separator"

function SectionTitle({ title }: { title: string }) {
    return (
        <div>
            <h2 className="text-2xl font-medium tracking-wide capitalize mb-2">{title}</h2>
            <Separator className="mb-8" />
        </div>
    )
}

export default SectionTitle