// Full-Screen Spin Wheel Page - Gamified reward system
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { useAppStore, type SpinResult } from '@/store/useAppStore';
import { CircleSpinner } from '@/components/CircleSpinner';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'; 
import { toast } from 'sonner';

const SpinWheel = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [result, setResult] = useState<SpinResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  const currentUser = useAppStore(state => state.currentUser);
  const spinsAvailable = useAppStore(state => state.spinsAvailable);
  const performSpin = useAppStore(state => state.useSpin);
  const addSpinResult = useAppStore(state => state.addSpinResult);
  const addBazaarTokens = useAppStore(state => state.addBazaarTokens);
  const addXP = useAppStore(state => state.addXP);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/10">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Please log in to spin the wheel</p>
        </Card>
      </div>
    );
  }

  // Handle spin result
  const handleSpinComplete = (prize: string) => {
    setIsSpinning(false);
    
    // Determine prize type and value
    let type: SpinResult['type'] = 'discount';
    const value = prize;
    
    if (prize.includes('Token') || prize.includes('token')) {
      type = 'token';
      const tokens = 5;
      addBazaarTokens(currentUser.id, tokens);
      addXP(currentUser.id, 10);
    } else if (prize.includes('Spin') || prize.includes('spin')) {
      type = 'extraSpin';
      useAppStore.getState().addSpin();
    } else if (prize.includes('Gift') || prize.includes('gift')) {
      type = 'gift';
      addBazaarTokens(currentUser.id, 3);
    } else if (prize.includes('Shipping') || prize.includes('shipping')) {
      type = 'shipping';
    }

    const newResult: SpinResult = {
      id: `spin_${Date.now()}`,
      type,
      value,
      claimed: false
    };

    setResult(newResult);
    addSpinResult(newResult);
    setShowConfetti(true);
    addXP(currentUser.id, 15);

    // Hide confetti after 5 seconds
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // Claim reward
  const handleClaim = () => {
    if (!result) return;
    
    useAppStore.getState().claimSpinResult(result.id);
    toast.success('Reward claimed! Check your gifts page! 🎉');
    
    // Navigate to gifts page if it's a gift reward
    if (result.type === 'gift' || result.type === 'token') {
      navigate('/gifts');
    } else {
      setResult(null);
    }
  };

  // Start spinning
  const handleStartSpin = () => {
    if (spinsAvailable <= 0) {
      toast.error('No spins available! Complete tasks to earn more.');
      return;
    }
    setIsSpinning(true);
    performSpin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-primary/10 py-8 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute"
          >
            <Sparkles className="h-4 w-4 text-primary opacity-30" />
          </motion.div>
        ))}
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            🎰 {t('spinner.title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            Every spin brings new rewards and surprises!
          </p>
          
          <div className="mt-6 flex justify-center gap-4">
            <Badge variant="secondary" className="text-lg px-6 py-2">
              <Gift className="h-5 w-5 mr-2" />
              {t('spinner.spinsLeft')}: {spinsAvailable}
            </Badge>
            <Badge variant="outline" className="text-lg px-6 py-2">
              <Sparkles className="h-5 w-5 mr-2" />
              {t('gifts.bazaarTokens')}: {currentUser.bazaarTokens}
            </Badge>
          </div>
        </motion.div>

        {/* Spinner */}
        <div className="flex flex-col items-center justify-center">
          <CircleSpinner 
            onSpinComplete={handleSpinComplete}
            disabled={spinsAvailable <= 0 || isSpinning}
          />
          
          {!isSpinning && !result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <Button
                size="lg"
                onClick={handleStartSpin}
                disabled={spinsAvailable <= 0}
                className="text-lg px-12 py-6 rounded-full"
              >
                {t('spinner.spin')}
              </Button>
            </motion.div>
          )}
        </div>

        {/* Result Modal */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              style={{ background: 'rgba(0,0,0,0.7)' }}
              onClick={() => setResult(null)}
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card className="p-8 max-w-md w-full text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                  >
                    <Gift className="h-24 w-24 mx-auto mb-4 text-primary" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold mb-2">{t('spinner.youWon')}</h2>
                  <p className="text-4xl font-bold text-primary mb-6">{result.value}</p>
                  
                  {result.type === 'token' && (
                    <p className="text-muted-foreground mb-6">
                      +5 Bazaar Tokens added to your account! 🎁
                    </p>
                  )}
                  
                  {result.type === 'extraSpin' && (
                    <p className="text-muted-foreground mb-6">
                      One extra spin added! Spin again! 🔄
                    </p>
                  )}
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={handleClaim}
                      size="lg"
                      className="flex-1"
                    >
                      {t('spinner.claim')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                      onClick={() => setResult(null)}
                      variant="outline"
                      size="lg"
                    >
                      Close
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* How to Earn More Spins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto mt-12"
        >
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">🎯 How to Earn More Spins</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✅ Daily login (+1 spin)</li>
              <li>✅ List a product (+1 spin)</li>
              <li>✅ Make a purchase (+2 spins)</li>
              <li>✅ Invite a friend (+3 spins)</li>
              <li>✅ Complete daily challenges (+1 spin each)</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SpinWheel;
