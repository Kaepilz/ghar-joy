// ============================================
// Gifts Page - Temu-Style Free Gifts with Twists
// Users can claim free items by completing challenges
// ============================================

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Star, ShoppingBag, Users, Share2, Trophy, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getMockGifts, type Gift as GiftType } from "@/lib/userMock";
import { toast } from "sonner";

const Gifts = () => {
  const [gifts, setGifts] = useState(getMockGifts());
  const [dailyStars, setDailyStars] = useState(2); // Mock daily stars earned

  // Handle claiming a gift
  const handleClaim = (giftId: string) => {
    const gift = gifts.find(g => g.id === giftId);
    if (!gift) return;

    if (gift.progress >= gift.total) {
      setGifts(gifts.map(g => 
        g.id === giftId ? { ...g, claimed: true } : g
      ));
      
      toast.success(`🎉 ${gift.name} claimed!`, {
        description: "Your gift will be shipped with your next order"
      });
    } else {
      toast.error("Not yet unlocked", {
        description: `Complete ${gift.requirement} to claim this gift`
      });
    }
  };

  // Get challenge icon
  const getChallengeIcon = (requirement: string) => {
    if (requirement.includes('Buy')) return <ShoppingBag className="h-5 w-5" />;
    if (requirement.includes('star')) return <Star className="h-5 w-5" />;
    if (requirement.includes('Invite')) return <Users className="h-5 w-5" />;
    if (requirement.includes('Share')) return <Share2 className="h-5 w-5" />;
    return <Gift className="h-5 w-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background py-8">
      <div className="container mx-auto px-4">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="h-12 w-12 text-primary animate-bounce" />
            <h1 className="text-4xl font-bold">
              Free <span className="text-primary">Gifts</span> Zone
            </h1>
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete fun challenges and unlock amazing free gifts! 🎁 
            The more you shop, play, and connect, the more you earn.
          </p>
        </motion.div>

        {/* Daily Challenge Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/10 to-secondary border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 bg-primary/20 rounded-full">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Daily Star Challenge</h2>
                <p className="text-muted-foreground mb-3">
                  Collect 5 stars today to unlock special gifts! 
                  Visit daily, make purchases, or share products to earn stars.
                </p>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-8 w-8 ${
                        i < dailyStars 
                          ? 'fill-warning text-warning' 
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {dailyStars}/5 Stars
              </Badge>
            </div>
          </Card>
        </motion.div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gifts.map((gift, index) => {
            const progressPercent = (gift.progress / gift.total) * 100;
            const isUnlocked = gift.progress >= gift.total;
            const isClaimed = gift.claimed;

            return (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`p-4 h-full relative overflow-hidden ${
                  isClaimed ? 'opacity-60' : ''
                }`}>
                  {/* Claimed badge */}
                  {isClaimed && (
                    <div className="absolute top-2 right-2 z-10">
                      <Badge variant="default" className="bg-green-500">
                        ✓ Claimed
                      </Badge>
                    </div>
                  )}

                  {/* Unlocked sparkle effect */}
                  {isUnlocked && !isClaimed && (
                    <div className="absolute top-0 right-0">
                      <Sparkles className="h-6 w-6 text-warning animate-pulse" />
                    </div>
                  )}

                  {/* Gift Image */}
                  <div className="aspect-square relative overflow-hidden rounded-lg mb-4 bg-muted">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="object-cover w-full h-full"
                    />
                    {isUnlocked && !isClaimed && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <Gift className="h-16 w-16 text-white" />
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Gift Info */}
                  <h3 className="text-xl font-bold mb-2">{gift.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    {getChallengeIcon(gift.requirement)}
                    <span>{gift.requirement}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {gift.progress}/{gift.total}
                      </span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>

                  {/* Action Button */}
                  <Button
                    variant={isUnlocked && !isClaimed ? "hero" : "outline"}
                    className="w-full"
                    onClick={() => handleClaim(gift.id)}
                    disabled={!isUnlocked || isClaimed}
                  >
                    {isClaimed ? (
                      '✓ Claimed'
                    ) : isUnlocked ? (
                      <>
                        <Gift className="h-4 w-4 mr-2" />
                        Claim Now!
                      </>
                    ) : (
                      `${gift.total - gift.progress} more to unlock`
                    )}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">
              How to Earn Free Gifts 🎁
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Shop & Earn</h3>
                <p className="text-sm text-muted-foreground">
                  Make purchases and get closer to unlocking gifts with every order
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Invite Friends</h3>
                <p className="text-sm text-muted-foreground">
                  Share ShoppingGhar with friends and unlock exclusive rewards
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Daily Challenges</h3>
                <p className="text-sm text-muted-foreground">
                  Complete daily tasks and collect stars to claim amazing gifts
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Gifts;
