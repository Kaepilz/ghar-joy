// Mock AI utility functions for ShoppingGhar
// These simulate intelligent recommendations and feedback

import type { Product } from "./mockData";

// AI Product Recommendations
export const getAIRecommendations = (userId: string, currentProduct?: Product): Product[] => {
  // Mock recommendation logic based on browsing history
  return [];
};

// AI Seller Mentor - Analyzes why a product isn't selling
export interface SellerFeedback {
  score: number;
  issues: string[];
  suggestions: string[];
  bestPostingTime: string;
}

export const analyzeProductPerformance = (product: Product): SellerFeedback => {
  const feedback: SellerFeedback = {
    score: Math.floor(Math.random() * 40) + 60, // 60-100
    issues: [],
    suggestions: [],
    bestPostingTime: "Post between 7-9 PM for maximum visibility"
  };

  // Mock analysis based on product data
  if (product.price > 10000) {
    feedback.issues.push("Price may be too high for this category");
    feedback.suggestions.push("Consider lowering price by 10-15% to attract more buyers");
  }

  if (!product.images || product.images.length < 2) {
    feedback.issues.push("Limited product images");
    feedback.suggestions.push("Add 3-5 high-quality images showing different angles");
  }

  if (product.description.length < 50) {
    feedback.issues.push("Product description is too short");
    feedback.suggestions.push("Write a detailed description highlighting key features and benefits");
  }

  if (feedback.issues.length === 0) {
    feedback.suggestions.push("Your listing looks great! Consider promoting it during peak hours.");
    feedback.suggestions.push("Add customer reviews to build trust.");
  }

  return feedback;
};

// Auto Bargain Bot - Negotiates between buyer and seller
export interface BargainMessage {
  role: "buyer" | "seller" | "bot";
  message: string;
  price?: number;
}

export const getBargainResponse = (
  originalPrice: number,
  buyerOffer: number,
  history: BargainMessage[]
): BargainMessage => {
  const difference = originalPrice - buyerOffer;
  const percentOff = (difference / originalPrice) * 100;

  if (percentOff > 30) {
    return {
      role: "bot",
      message: `The seller's price is Rs. ${originalPrice}. Your offer is ${percentOff.toFixed(1)}% lower. How about meeting at Rs. ${Math.round((originalPrice + buyerOffer) / 2)}?`,
      price: Math.round((originalPrice + buyerOffer) / 2)
    };
  } else if (percentOff > 15) {
    return {
      role: "bot",
      message: `That's a reasonable offer! I'll suggest Rs. ${Math.round(originalPrice - (originalPrice * 0.10))} to the seller.`,
      price: Math.round(originalPrice - (originalPrice * 0.10))
    };
  } else {
    return {
      role: "bot",
      message: `Great! Your offer is close to the asking price. The seller might accept Rs. ${buyerOffer + Math.round(difference / 2)}.`,
      price: buyerOffer + Math.round(difference / 2)
    };
  }
};

// AI Price Suggestion
export const suggestOptimalPrice = (category: string, condition: string): { min: number; max: number; recommended: number } => {
  const priceRanges: Record<string, { min: number; max: number }> = {
    electronics: { min: 2000, max: 15000 },
    fashion: { min: 500, max: 5000 },
    sports: { min: 1000, max: 20000 },
    home: { min: 800, max: 8000 },
    books: { min: 200, max: 2000 },
    toys: { min: 300, max: 3000 }
  };

  const range = priceRanges[category.toLowerCase()] || { min: 500, max: 5000 };
  const conditionMultiplier = condition === "new" ? 1 : 0.7;

  return {
    min: Math.round(range.min * conditionMultiplier),
    max: Math.round(range.max * conditionMultiplier),
    recommended: Math.round(((range.min + range.max) / 2) * conditionMultiplier)
  };
};

// Analytics data generator
export interface AnalyticsData {
  views: number;
  clicks: number;
  sales: number;
  conversionRate: number;
  revenue: number;
  topProducts: { name: string; sales: number }[];
  viewsOverTime: { date: string; views: number }[];
}

export const generateSellerAnalytics = (): AnalyticsData => {
  return {
    views: Math.floor(Math.random() * 5000) + 1000,
    clicks: Math.floor(Math.random() * 500) + 100,
    sales: Math.floor(Math.random() * 50) + 10,
    conversionRate: Math.random() * 10 + 2,
    revenue: Math.floor(Math.random() * 50000) + 10000,
    topProducts: [
      { name: "Wireless Headphones", sales: 45 },
      { name: "Smart Watch", sales: 38 },
      { name: "Leather Bag", sales: 32 }
    ],
    viewsOverTime: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      views: Math.floor(Math.random() * 200) + 50
    }))
  };
};
