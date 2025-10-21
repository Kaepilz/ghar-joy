import { motion } from "framer-motion";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import type { Product } from "@/lib/mockData";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart?.(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${product.id}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square relative overflow-hidden bg-muted">
            <img
              src={product.images[0]}
              alt={product.title}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
            {product.condition === 'used' && (
              <Badge className="absolute top-2 right-2" variant="secondary">
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
