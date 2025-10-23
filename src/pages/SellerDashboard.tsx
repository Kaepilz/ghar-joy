// Seller Dashboard with AI Analytics and Mentor
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Eye,
  ShoppingCart,
  Sparkles,
  Package,
  MessageSquare
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateSellerAnalytics, analyzeProductPerformance } from "@/lib/aiMock";
import { products } from "@/lib/mockData";
import { BargainBot } from "@/components/BargainBot";
import { AIMentor } from "@/components/AIMentor";

const SellerDashboard = () => {
  const [analytics] = useState(generateSellerAnalytics());
  const [selectedProduct] = useState(products[0]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-muted-foreground">
            Track your performance and get AI-powered insights
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Views</p>
                <Eye className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{analytics.views.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">↑ 12% from last week</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <ShoppingCart className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold">{analytics.sales}</p>
              <p className="text-xs text-green-500 mt-1">↑ 8% from last week</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">Rs. {analytics.revenue.toLocaleString()}</p>
              <p className="text-xs text-green-500 mt-1">↑ 15% from last week</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <TrendingUp className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">{analytics.conversionRate.toFixed(1)}%</p>
              <p className="text-xs text-green-500 mt-1">↑ 3% from last week</p>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3 mb-6">
            <TabsTrigger value="analytics">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="mentor">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Mentor
            </TabsTrigger>
            <TabsTrigger value="bargain">
              <MessageSquare className="h-4 w-4 mr-2" />
              Auto Bargain
            </TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Views Over Time */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Views Over Time</h3>
                <div className="space-y-3">
                  {analytics.viewsOverTime.map((day, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground w-24">{day.date}</span>
                      <div className="flex-1 h-8 bg-muted rounded-md overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.views / 250) * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-primary-hover"
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{day.views}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Top Products */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Top Selling Products</h3>
                <div className="space-y-4">
                  {analytics.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <Badge variant="secondary">{product.sales} sales</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* AI Mentor Tab */}
          <TabsContent value="mentor">
            <AIMentor product={selectedProduct} />
          </TabsContent>

          {/* Bargain Bot Tab */}
          <TabsContent value="bargain">
            <BargainBot />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
