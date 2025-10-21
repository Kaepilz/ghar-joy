import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const rewards = [
  { text: "5% OFF", color: "text-orange-500" },
  { text: "10% OFF", color: "text-red-500" },
  { text: "Free Shipping", color: "text-green-500" },
  { text: "Buy 1 Get 1", color: "text-blue-500" },
  { text: "15% OFF", color: "text-purple-500" },
];

export const GamifiedSpinner = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<typeof rewards[0] | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSpin = () => {
    if (hasSpun) return;
    
    setIsSpinning(true);
    setReward(null);

    setTimeout(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setReward(randomReward);
      setIsSpinning(false);
      setHasSpun(true);
    }, 1200);
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-secondary text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Sparkles className="absolute top-4 left-4 h-8 w-8 text-primary" />
        <Sparkles className="absolute bottom-4 right-4 h-8 w-8 text-primary" />
        <Sparkles className="absolute top-1/2 left-1/4 h-6 w-6 text-primary" />
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2">Spin & Win!</h3>
        <p className="text-muted-foreground mb-6">Try your luck and get amazing deals</p>

        <div className="mb-6">
          <motion.div
            animate={isSpinning ? { rotate: 360 } : {}}
            transition={{ duration: 1.2, ease: "linear", repeat: isSpinning ? Infinity : 0 }}
            className="inline-block"
          >
            <Gift className="h-20 w-20 text-primary" />
          </motion.div>
        </div>

        <AnimatePresence>
          {reward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <div className={`text-4xl font-bold ${reward.color}`}>
                {reward.text}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your discount code: SPIN{Math.floor(Math.random() * 1000)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="hero"
          size="lg"
          onClick={handleSpin}
          disabled={isSpinning || hasSpun}
          aria-pressed={isSpinning}
          aria-live="polite"
        >
          {hasSpun ? "Already Spun!" : isSpinning ? "Spinning..." : "Spin Now!"}
        </Button>
      </div>
    </Card>
  );
};
