import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Product } from "@/lib/mockData";
import { toast } from "sonner";
import { useAppStore } from "@/store/useAppStore";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const currentUser = useAppStore(state => state.currentUser);
  const addToWishlist = useAppStore(state => state.addToWishlist);
  const removeFromWishlist = useAppStore(state => state.removeFromWishlist);
  const isInWishlist = useAppStore(state => state.isInWishlist);
  
  const [isWishlisted, setIsWishlisted] = useState(
    currentUser ? isInWishlist(currentUser.id, product.id) : false
  );
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
    toast.success(`${product.title} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!currentUser) {
      toast.error("Please login to add items to wishlist");
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(currentUser.id, product.id);
      setIsWishlisted(false);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(currentUser.id, product.id);
      setIsWishlisted(true);
      toast.success("Added to wishlist! ❤️");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square relative overflow-hidden bg-muted group">
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
            
            {/* Wishlist Heart Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-colors"
            >
              <Heart 
                className={`h-5 w-5 transition-all ${
                  isWishlisted 
                    ? 'fill-red-500 text-red-500 scale-110' 
                    : 'text-muted-foreground hover:text-red-500'
                }`}
              />
            </motion.button>
            
            {product.condition === 'used' && (
              <Badge className="absolute top-2 left-2" variant="secondary">
                Used
              </Badge>
            )}
          </div>
          
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>
            
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">
                ({Math.floor(Math.random() * 500) + 50})
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">
                NPR {product.price.toLocaleString()}
              </span>
            </div>
          </CardContent>
          
          <CardFooter className="p-4 pt-0">
            <Button
              variant="default"
              size="sm"
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};
