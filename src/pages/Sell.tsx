import { Store, Upload, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Sell = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Start Selling on <span className="text-primary">ShoppingGhar</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Join thousands of sellers reaching customers across Nepal
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
          <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">List Your Products</h3>
          <p className="text-sm text-muted-foreground">
            Easy product listing with photos and descriptions
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Reach Customers</h3>
          <p className="text-sm text-muted-foreground">
            Access millions of buyers across Nepal
          </p>
        </Card>
        
        <Card className="p-6 text-center">
          <DollarSign className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">Get Paid Fast</h3>
          <p className="text-sm text-muted-foreground">
            Quick and secure payment processing
          </p>
        </Card>
      </div>

      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Store className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">Seller Registration</h2>
          <p className="text-muted-foreground">
            Complete this form to start your selling journey
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Business Name</label>
            <input
              type="text"
              placeholder="Enter your business name"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              type="tel"
              placeholder="+977 XXXXXXXXXX"
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              What will you sell?
            </label>
            <textarea
              placeholder="Describe your products..."
              rows={4}
              className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <Button variant="hero" size="lg" className="w-full">
            Submit Application
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you agree to our Terms of Service and Seller Policy
          </p>
        </div>
      </Card>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">Already a seller?</p>
        <Link to="/login">
          <Button variant="outline" size="lg">
            Login to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sell;
