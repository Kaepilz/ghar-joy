// ============================================
// Circle Spinner Wheel Component
// Beautiful circular spinning wheel with claim system
// Can work standalone or as controlled component
// ============================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Sparkles, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Reward options for the wheel
const rewards = [
  { text: "🎁 Free Gift!", color: "text-pink-500", isFreeGift: true },
  { text: "💸 99% OFF", color: "text-red-500" },
  { text: "🧦 Free Socks!", color: "text-blue-500", isFreeGift: true },
  { text: "🚚 Free Shipping", color: "text-green-500" },
  { text: "🎉 Double Spin", color: "text-purple-500" },
  { text: "🎁 Mystery Box", color: "text-orange-500", isFreeGift: true },
];

// Props interface - all optional for backward compatibility
interface CircleSpinnerProps {
  onSpinComplete?: (prize: string) => void; // Callback when spin finishes
  disabled?: boolean; // Disable spinning
  autoNavigate?: boolean; // Auto-navigate to gifts page (default: true)
}

export const CircleSpinner = ({ 
  onSpinComplete, 
  disabled = false,
  autoNavigate = true 
}: CircleSpinnerProps = {}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<typeof rewards[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  // Handle spin action
  const handleSpin = () => {
    if (isSpinning || reward || disabled) return;
    
    setIsSpinning(true);
    setShowConfetti(false);

    // Calculate random rotation (multiple full rotations + random segment)
    const spins = 5; // Number of full rotations
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (spins * 360) + randomDegree;
    
    setRotation(totalRotation);

    // After spinning, show result
    setTimeout(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setReward(randomReward);
      setIsSpinning(false);
      setShowConfetti(true);
      
      // Call callback if provided
      if (onSpinComplete) {
        onSpinComplete(randomReward.text);
      }
      
      // Show toast notification only if not using callback
      if (!onSpinComplete) {
        toast.success(`You won ${randomReward.text}!`, {
          description: "Click 'Claim Now' to redeem your reward"
        });
      }
    }, 3000);
  };

  // Handle claim action
  const handleClaim = () => {
    if (autoNavigate && reward?.isFreeGift) {
      navigate('/gifts');
    } else {
      toast.success('Reward claimed! Check your rewards tab.', {
        description: 'Your reward has been added to your account'
      });
      setReward(null);
    }
  };

  // Reset spinner for another try
  const handleReset = () => {
    setReward(null);
    setShowConfetti(false);
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card to-secondary text-center relative overflow-hidden">
      {/* Background decorative sparkles */}
      <div className="absolute inset-0 opacity-10">
        <Sparkles className="absolute top-4 left-4 h-8 w-8 text-primary animate-pulse" />
        <Sparkles className="absolute bottom-4 right-4 h-8 w-8 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute top-1/2 left-1/4 h-6 w-6 text-primary animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Confetti effect when winning */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                }}
                className="absolute w-3 h-3 bg-primary rounded-full"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <PartyPopper className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Spin & Win!</h3>
          <PartyPopper className="h-6 w-6 text-primary" />
        </div>
        <p className="text-muted-foreground mb-6">Try your luck and get amazing rewards</p>

        {/* Circular Spinner Wheel */}
        <div className="mb-6 relative">
          {/* Wheel container */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ 
              duration: 3, 
              ease: "easeOut",
            }}
            className="inline-block relative"
          >
            {/* Main circle with segments */}
            <div className="w-64 h-64 rounded-full border-8 border-primary relative overflow-hidden shadow-2xl">
              {rewards.map((r, index) => {
                const angle = (360 / rewards.length) * index;
                const nextAngle = (360 / rewards.length) * (index + 1);
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background: `conic-gradient(from ${angle}deg, 
                        hsl(var(--primary) / 0.8) ${angle}deg, 
                        hsl(var(--primary) / 0.4) ${nextAngle}deg, 
                        transparent ${nextAngle}deg)`,
                    }}
                  >
                    <div
                      className="absolute text-xs font-bold"
                      style={{
                        transform: `rotate(${angle + (360 / rewards.length) / 2}deg) translateY(-80px)`,
                      }}
                    >
                      <span className="block" style={{ transform: 'rotate(-90deg)' }}>
                        {r.text.slice(0, 4)}
                      </span>
                    </div>
                  </div>
                );
              })}
              
              {/* Center gift icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center shadow-lg">
                  <Gift className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Pointer/Arrow at top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary" />
          </div>
        </div>

        {/* Result display */}
        <AnimatePresence>
          {reward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6"
            >
              <div className={`text-4xl font-bold ${reward.color} mb-2`}>
                {reward.text}
              </div>
              <p className="text-sm text-muted-foreground">
                {reward.isFreeGift 
                  ? "Click 'Claim Now' to see your free gift!" 
                  : `Your reward code: SPIN${Math.floor(Math.random() * 1000)}`
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="flex gap-3 justify-center">
          {!reward ? (
            <Button
              variant="hero"
              size="lg"
              onClick={handleSpin}
              disabled={isSpinning || disabled}
              className="min-w-[200px]"
            >
              {isSpinning ? (
                <>
                  <Gift className="h-5 w-5 mr-2 animate-spin" />
                  Spinning...
                </>
              ) : (
                <>
                  <Gift className="h-5 w-5 mr-2" />
                  Spin Now!
                </>
              )}
            </Button>
          ) : (
            <>
              <Button
                variant="hero"
                size="lg"
                onClick={handleClaim}
                className="min-w-[150px]"
              >
                <PartyPopper className="h-5 w-5 mr-2" />
                Claim Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
              >
                Spin Again Tomorrow
              </Button>
            </>
          )}
        </div>

        {/* Daily spin info */}
        <p className="text-xs text-muted-foreground mt-4">
          🎯 You can spin once per day. Come back tomorrow for more rewards!
        </p>
      </div>
    </Card>
  );
};
