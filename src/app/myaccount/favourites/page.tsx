import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { fetchUserFavorites } from "@/util/actions";
import ProductItem from "@/components/products/ProductItem";

async function FavouritesPage() {
  const fetchedFavourites = await fetchUserFavorites();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Favourites</h1>
        <p className="text-gray-600 dark:text-gray-400">Your saved items for quick access</p>
      </div>

      <Card className="rounded-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Saved Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          {fetchedFavourites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {fetchedFavourites.map((item) => (
                <ProductItem key={item.id} product={item.product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                <Heart className="w-12 h-12 text-gray-400 dark:text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No favourite items yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">Start adding items to your favorites to see them here</p>
              <Button variant="default" className="rounded-none">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default FavouritesPage;