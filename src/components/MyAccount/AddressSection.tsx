import { MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

const AddressSection = () => {
    return (
        <Card className="rounded-none">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Saved Addresses
                    </CardTitle>
                    <Button size="sm" variant="outline" className="rounded-none">
                        + Add Address
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No saved addresses yet</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default AddressSection