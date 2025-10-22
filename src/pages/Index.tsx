import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { GamifiedSpinner } from "@/components/GamifiedSpinner";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products, categories } from "@/lib/mockData";
import { useCart } from "@/context/CartContext";
import { ArrowRight, Package, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-shopping.jpg";

const Index = () => {
  const { addItem } = useCart();
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Everyone is<span className="text-primary"> Buyer & Seller</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                <span className="text-primary text-2xl">Buy</span> what you want & <span className="text-primary text-2xl">Sell</span> what you don't.
                <br/>
                Your trusted marketplace for everything you need. Safe, fast, and reliable.
              </p>
              <div className="max-w-lg mb-6">
                <SearchBar placeholder="What are you looking for?" />
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button variant="hero" size="lg">
                    Browse Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/sell">
                  <Button variant="outline" size="lg">
                    Start Selling
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src={heroImage}
                alt="Shopping in Nepal"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Your transactions are safe and protected
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Quick and reliable shipping across Nepal
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Quality Products</h3>
              <p className="text-sm text-muted-foreground">
                Verified sellers and authentic items
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Gamified Spinner */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <GamifiedSpinner />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} to={`/products?category=${category.id}`}>
                <Card className="p-6 text-center hover:shadow-lg hover:scale-105 transition-all cursor-pointer">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <div className="font-medium">{category.name}</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Hot Deals</h2>
            <Link to="/products">
              <Button variant="ghost">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Hub CTA */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visit our Service Hub for customer support, seller assistance, and more
          </p>
          <Link to="/service-hub">
            <Button variant="hero" size="lg">
              Visit Service Hub
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
