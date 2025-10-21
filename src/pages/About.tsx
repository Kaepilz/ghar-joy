import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Target, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-primary">ShoppingGhar</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          ShoppingGhar is Nepal's trusted online marketplace, connecting buyers and sellers
          across the country. We're committed to making online shopping safe, easy, and
          enjoyable for everyone.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-3xl font-bold mb-2">10K+</h3>
          <p className="text-sm text-muted-foreground">Active Sellers</p>
        </Card>

        <Card className="p-6 text-center">
          <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-3xl font-bold mb-2">50K+</h3>
          <p className="text-sm text-muted-foreground">Happy Customers</p>
        </Card>

        <Card className="p-6 text-center">
          <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-3xl font-bold mb-2">100K+</h3>
          <p className="text-sm text-muted-foreground">Products Listed</p>
        </Card>

        <Card className="p-6 text-center">
          <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="text-3xl font-bold mb-2">99%</h3>
          <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To empower Nepali entrepreneurs and provide consumers with access to quality
            products at competitive prices, while building trust through transparency and
            excellent service.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">🛡️ Buyer Protection</h3>
              <p className="text-muted-foreground">
                Your purchases are protected with our secure payment system and return policy
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">🚚 Reliable Delivery</h3>
              <p className="text-muted-foreground">
                Fast and tracked delivery across Nepal with trusted courier partners
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">✅ Verified Sellers</h3>
              <p className="text-muted-foreground">
                All sellers are verified to ensure authentic products and quality service
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold mb-2">💬 24/7 Support</h3>
              <p className="text-muted-foreground">
                Our customer service team is always ready to help you
              </p>
            </Card>
          </div>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join our growing community of buyers and sellers
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/products">
            <Button variant="hero" size="lg">Start Shopping</Button>
          </Link>
          <Link to="/sell">
            <Button variant="outline" size="lg">Become a Seller</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
