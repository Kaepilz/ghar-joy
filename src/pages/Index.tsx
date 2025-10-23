import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Shield, Zap, Package, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { GamifiedSpinner } from "@/components/GamifiedSpinner";
import { ProductCard } from "@/components/ProductCard";
import { products, categories } from "@/lib/mockData";
import { getCurrentUser, getTimeBasedGreeting } from "@/lib/userMock";
import { XPProgress } from "@/components/XPProgress";
import { CommunityFeed } from "@/components/CommunityFeed";
import { AIHelper } from "@/components/AIHelper";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/hero-shopping.jpg";

const Index = () => {
  const featuredProducts = products.slice(0, 6);
  const [user] = useState(getCurrentUser());
  const greeting = getTimeBasedGreeting(user.name);
  
  return (
    <div className="min-h-screen">
      <AIHelper />
      
      {/* Personalized Greeting */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary/10 to-orange-500/10 py-4 border-b"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <motion.span className="text-3xl" animate={{ rotate: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                {greeting.emoji}
              </motion.span>
              <div>
                <h2 className="text-xl font-bold">{greeting.greeting}</h2>
                <p className="text-sm text-muted-foreground">{greeting.message}</p>
              </div>
            </div>
            <div className="w-full sm:w-auto"><XPProgress compact /></div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Everyone is<span className="text-primary"> Buyer & Seller</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                <span className="text-primary text-2xl">Buy</span> what you want & <span className="text-primary text-2xl">Sell</span> what you don't.
                <br/>Your trusted marketplace for everything you need. Safe, fast, and reliable.
              </p>
              <div className="max-w-lg mb-6"><SearchBar placeholder="What are you looking for?" /></div>
              <div className="flex flex-wrap gap-4">
                <Link to="/products"><Button variant="hero" size="lg">Browse Products <ArrowRight className="ml-2 h-5 w-5" /></Button></Link>
                <Link to="/sell"><Button variant="outline" size="lg">Start Selling</Button></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden md:block">
              <img src={heroImage} alt="Shopping in Nepal" className="rounded-2xl shadow-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gamified Spinner */}
      <section className="py-12"><div className="container mx-auto px-4"><div className="max-w-md mx-auto"><GamifiedSpinner /></div></div></section>

      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div key={category.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
                <Link to={`/products?category=${category.id}`}>
                  <Card className="p-6 text-center hover:shadow-xl transition-all cursor-pointer">
                    <span className="text-4xl mb-2 block">{category.icon}</span>
                    <p className="font-medium">{category.name}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Hot Deals 🔥</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProducts.map((product) => (<ProductCard key={product.id} product={product} onAddToCart={() => {}} />))}
          </div>
        </div>
      </section>

      {/* Community Feed */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"><CommunityFeed /></div>
            <div><XPProgress showDetails /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
