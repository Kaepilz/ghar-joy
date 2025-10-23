// Barter Corner - Exchange items without money
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, Plus, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mockData";

interface BarterItem {
  id: string;
  offering: string;
  seeking: string;
  offeringImage: string;
  seekingCategory: string;
  user: string;
  condition: string;
}

const BarterCorner = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock barter listings
  const barterListings: BarterItem[] = [
    {
      id: "1",
      offering: "Gaming Keyboard RGB",
      seeking: "Wireless Mouse",
      offeringImage: products[4].images[0],
      seekingCategory: "Electronics",
      user: "TechStore Nepal",
      condition: "new"
    },
    {
      id: "2",
      offering: "Vintage Leather Bag",
      seeking: "Designer Sunglasses",
      offeringImage: products[2].images[0],
      seekingCategory: "Fashion",
      user: "Classic Collections",
      condition: "used"
    },
    {
      id: "3",
      offering: "Yoga Mat Premium",
      seeking: "Running Shoes",
      offeringImage: products[5].images[0],
      seekingCategory: "Sports",
      user: "Wellness Shop",
      condition: "new"
    },
    {
      id: "4",
      offering: "Coffee Maker Deluxe",
      seeking: "Electric Kettle",
      offeringImage: products[6].images[0],
      seekingCategory: "Home",
      user: "Home Essentials",
      condition: "new"
    }
  ];

  const filteredListings = barterListings.filter(
    (item) =>
      item.offering.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.seeking.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4"
          >
            <div className="p-4 bg-primary/10 rounded-full">
              <ArrowLeftRight className="h-12 w-12 text-primary" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">
            Barter <span className="text-primary">Corner</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trade items directly without using money. Find what you need and exchange what you don't!
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for items to trade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="hero" className="gap-2">
            <Plus className="h-5 w-5" />
            Post Trade Offer
          </Button>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 bg-gradient-to-br from-primary/5 to-transparent">
            <h3 className="font-semibold mb-1">📦 No Money Needed</h3>
            <p className="text-sm text-muted-foreground">
              Exchange items directly with other users
            </p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-green-500/5 to-transparent">
            <h3 className="font-semibold mb-1">♻️ Eco-Friendly</h3>
            <p className="text-sm text-muted-foreground">
              Give items a second life through trading
            </p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-500/5 to-transparent">
            <h3 className="font-semibold mb-1">🤝 Local Community</h3>
            <p className="text-sm text-muted-foreground">
              Connect with traders in your area
            </p>
          </Card>
        </div>

        {/* Barter Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  {/* Offering Item */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Offering:</p>
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={item.offeringImage}
                        alt={item.offering}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-semibold">{item.offering}</h3>
                        <Badge variant={item.condition === "new" ? "default" : "secondary"}>
                          {item.condition}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Exchange Icon */}
                  <div className="flex justify-center my-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <ArrowLeftRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Seeking Item */}
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Seeking:</p>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="font-medium">{item.seeking}</p>
                      <p className="text-sm text-muted-foreground">
                        Category: {item.seekingCategory}
                      </p>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <p className="text-sm text-muted-foreground">By {item.user}</p>
                    <Button variant="outline" size="sm">
                      Propose Trade
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              No barter listings found matching your search
            </p>
            <Button onClick={() => setSearchTerm("")}>Clear Search</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarterCorner;
