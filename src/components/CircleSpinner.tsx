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
    <Card className="p-6 md:p-8 bg-gradient-to-br from-primary/5 via-card to-secondary/50 text-center relative overflow-hidden border-2 border-primary/20 shadow-2xl max-w-2xl mx-auto">
      {/* Enhanced Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
      
      {/* Background decorative sparkles */}
      <div className="absolute inset-0 opacity-20">
        <Sparkles className="absolute top-4 left-4 h-6 w-6 md:h-8 md:w-8 text-primary animate-pulse" />
        <Sparkles className="absolute bottom-4 right-4 h-6 w-6 md:h-8 md:w-8 text-accent animate-pulse" style={{ animationDelay: '0.5s' }} />
        <Sparkles className="absolute top-1/2 left-1/4 h-4 w-4 md:h-6 md:w-6 text-primary animate-pulse" style={{ animationDelay: '1s' }} />
        <Sparkles className="absolute top-1/4 right-1/4 h-4 w-4 md:h-6 md:w-6 text-accent animate-pulse" style={{ animationDelay: '1.5s' }} />
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
          <PartyPopper className="h-5 w-5 md:h-6 md:w-6 text-primary animate-bounce" />
          <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Spin & Win!
          </h3>
          <PartyPopper className="h-5 w-5 md:h-6 md:w-6 text-accent animate-bounce" style={{ animationDelay: '0.2s' }} />
        </div>
        <p className="text-muted-foreground text-sm md:text-base mb-4 md:mb-6">
          Try your luck and get amazing rewards
        </p>

        {/* Circular Spinner Wheel */}
        <div className="mb-4 md:mb-6 relative flex justify-center">
          {/* Wheel container */}
          <motion.div
            animate={{ rotate: rotation }}
            transition={{ 
              duration: 3, 
              ease: [0.32, 0.72, 0, 1], // Custom easing for smoother animation
            }}
            className="inline-block relative"
          >
            {/* Main circle with segments - Responsive sizing */}
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full border-[6px] md:border-8 border-primary relative overflow-hidden shadow-[0_0_40px_rgba(255,106,0,0.3)] bg-gradient-to-br from-background to-card">
              {rewards.map((r, index) => {
                const angle = (360 / rewards.length) * index;
                const nextAngle = (360 / rewards.length) * (index + 1);
                const colors = [
                  'from-primary/90 to-primary/60',
                  'from-accent/90 to-accent/60',
                  'from-brand-deep/90 to-brand-deep/60',
                  'from-warning/90 to-warning/60',
                  'from-success/90 to-success/60',
                  'from-primary/80 to-accent/60',
                ];
                
                return (
                  <div
                    key={index}
                    className="absolute inset-0"
                    style={{
                      background: `conic-gradient(from ${angle}deg, 
                        hsl(var(--primary) / 0.85) ${angle}deg, 
                        hsl(var(--accent) / 0.85) ${angle + 30}deg,
                        hsl(var(--primary) / 0.5) ${nextAngle}deg, 
                        transparent ${nextAngle}deg)`,
                    }}
                  >
                    <div
                      className="absolute text-[10px] sm:text-xs md:text-sm font-bold text-white drop-shadow-lg"
                      style={{
                        transform: `rotate(${angle + (360 / rewards.length) / 2}deg) translateY(-70px) sm:translateY(-80px) md:translateY(-90px) lg:translateY(-100px)`,
                        left: '50%',
                        top: '50%',
                      }}
                    >
                      <span className="block whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateX(-50%)' }}>
                        {r.text}
                      </span>
                    </div>
                  </div>
                );
              })}
              
              {/* Center gift icon with glow effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-background to-card flex items-center justify-center shadow-[0_0_30px_rgba(255,106,0,0.5)] border-4 border-primary/30">
                  <motion.div
                    animate={isSpinning ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    <Gift className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary drop-shadow-lg" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced Pointer/Arrow at top with glow */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="relative">
              <div className="w-0 h-0 border-l-[12px] md:border-l-[16px] border-r-[12px] md:border-r-[16px] border-t-[16px] md:border-t-[20px] border-l-transparent border-r-transparent border-t-primary drop-shadow-[0_0_8px_rgba(255,106,0,0.8)]" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full shadow-[0_0_10px_rgba(255,106,0,0.9)]" />
            </div>
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
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
          {!reward ? (
            <Button
              variant="hero"
              size="lg"
              onClick={handleSpin}
              disabled={isSpinning || disabled}
              className="min-w-[180px] sm:min-w-[200px] text-base md:text-lg py-5 md:py-6 shadow-lg hover:shadow-xl transition-all"
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
                className="min-w-[140px] sm:min-w-[150px] shadow-lg"
              >
                <PartyPopper className="h-5 w-5 mr-2" />
                Claim Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="min-w-[140px] sm:min-w-[150px]"
              >
                Close
              </Button>
            </>
          )}
        </div>

        {/* Daily spin info */}
        <p className="text-xs md:text-sm text-muted-foreground mt-4 px-4">
          🎯 Spin daily for amazing rewards! Come back tomorrow for more.
        </p>
      </div>
    </Card>
  );
};
