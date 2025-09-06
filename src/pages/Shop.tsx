import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Shop = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample products data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      image: "🎧",
      rating: 4.5,
      reviews: 234,
      category: "Electronics",
      inStock: true,
      description: "Premium quality wireless headphones with noise cancellation"
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      image: "⌚",
      rating: 4.8,
      reviews: 156,
      category: "Wearables",
      inStock: true,
      description: "Track your fitness goals with advanced health monitoring"
    },
    {
      id: 3,
      name: "Organic Coffee Beans",
      price: 24.99,
      originalPrice: 29.99,
      image: "☕",
      rating: 4.6,
      reviews: 89,
      category: "Food & Beverage",
      inStock: true,
      description: "Premium organic coffee beans, freshly roasted"
    },
    {
      id: 4,
      name: "Professional Camera Lens",
      price: 449.99,
      originalPrice: 549.99,
      image: "📷",
      rating: 4.9,
      reviews: 67,
      category: "Photography",
      inStock: false,
      description: "High-quality lens for professional photography"
    },
    {
      id: 5,
      name: "Eco-Friendly Water Bottle",
      price: 19.99,
      originalPrice: 24.99,
      image: "🚰",
      rating: 4.3,
      reviews: 312,
      category: "Lifestyle",
      inStock: true,
      description: "Sustainable water bottle made from recycled materials"
    },
    {
      id: 6,
      name: "Gaming Mechanical Keyboard",
      price: 129.99,
      originalPrice: 159.99,
      image: "⌨️",
      rating: 4.7,
      reviews: 198,
      category: "Gaming",
      inStock: true,
      description: "RGB backlit mechanical keyboard for gaming enthusiasts"
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: typeof products[0]) => {
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleBuyNow = (product: typeof products[0]) => {
    toast({
      title: "Redirecting to Checkout",
      description: `Processing purchase for ${product.name}`,
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop Our Products
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover amazing products with our intelligent shopping experience
          </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="text-6xl text-center mb-4">{product.image}</div>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  {!product.inStock && (
                    <Badge variant="destructive">Out of Stock</Badge>
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    ${product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                
                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary to-primary-hover"
                    onClick={() => handleBuyNow(product)}
                    disabled={!product.inStock}
                  >
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;