// AI Mentor Component - Provides feedback on product listings with personality
import { motion } from "framer-motion";
import { Sparkles, AlertCircle, Lightbulb, Clock, TrendingUp, Heart, Smile } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { analyzeProductPerformance } from "@/lib/aiMock";
import type { Product } from "@/lib/mockData";

interface AIMentorProps {
  product: Product;
}

export const AIMentor = ({ product }: AIMentorProps) => {
  const feedback = analyzeProductPerformance(product);
  const [isTyping, setIsTyping] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);

  // Show encouraging message after analysis
  useEffect(() => {
    const timer = setTimeout(() => setShowEncouragement(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* AI Mentor Header with Personality */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-primary/20">
        <div className="flex items-start gap-4">
          <motion.div 
            className="p-3 bg-gradient-to-br from-primary to-orange-500 rounded-full"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            <Sparkles className="h-6 w-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">AI Seller Mentor</h2>
              <Smile className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground mb-2">
              Hey there! 👋 I'm here to help you succeed. Let's make your listing shine!
            </p>
            {/* Typing Indicator */}
            <div className="flex gap-1 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                  className="w-2 h-2 bg-primary rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Score */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Listing Performance Score</h3>
          <Badge variant={feedback.score >= 80 ? "default" : "secondary"}>
            {feedback.score >= 80 ? "Good" : "Needs Improvement"}
          </Badge>
        </div>
        <div className="mb-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Overall Score</span>
            <span className="font-bold text-primary">{feedback.score}/100</span>
          </div>
          <Progress value={feedback.score} className="h-3" />
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Your listing is performing {feedback.score >= 80 ? "well" : "below average"}. 
          Follow the suggestions below to improve.
        </p>
      </Card>

      {/* Product Being Analyzed */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Analyzing Product</h3>
        <div className="flex gap-4">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div>
            <h4 className="font-medium mb-1">{product.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
            <p className="font-bold text-primary">Rs. {product.price}</p>
          </div>
        </div>
      </Card>

      {/* Issues Found */}
      {feedback.issues.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6 border-orange-500/20">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-1">Issues Detected</h3>
                <p className="text-sm text-muted-foreground">
                  These factors may be limiting your product's visibility and sales
                </p>
              </div>
            </div>
            <ul className="space-y-2">
              {feedback.issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}

      {/* AI Suggestions with Personality */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <div className="flex items-start gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Lightbulb className="h-5 w-5 text-green-500 mt-0.5" />
            </motion.div>
            <div>
              <h3 className="font-semibold mb-1">💡 My Suggestions for You</h3>
              <p className="text-sm text-muted-foreground">
                I've analyzed your listing — here's how to make it irresistible!
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {feedback.suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-start gap-3 text-sm p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer"
              >
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{suggestion}</span>
              </motion.li>
            ))}
          </ul>
          
          {/* Encouragement Message */}
          {showEncouragement && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-lg border border-primary/20"
            >
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">
                  You're doing great! Keep improving and your sales will soar! 🚀
                </p>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>

      {/* Best Posting Time */}
      <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-transparent">
        <div className="flex items-start gap-3">
          <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">Optimal Posting Time</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {feedback.bestPostingTime}
            </p>
            <Badge variant="secondary">Based on user activity patterns</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};
