// Level Up Celebration Animation - Shows when user levels up
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Award, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { XPLevel } from "@/lib/userMock";

interface LevelUpCelebrationProps {
  show: boolean;
  newLevel: XPLevel;
  onClose: () => void;
}

export const LevelUpCelebration = ({ show, newLevel, onClose }: LevelUpCelebrationProps) => {
  const [confetti, setConfetti] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50,
        delay: Math.random() * 0.5
      }));
      setConfetti(particles);

      // Auto close after 4 seconds
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Confetti */}
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute top-1/4 left-1/2"
              initial={{ 
                x: 0, 
                y: 0, 
                scale: 0, 
                rotate: 0,
                opacity: 1 
              }}
              animate={{ 
                x: particle.x * 10,
                y: [0, -100, 300],
                scale: [0, 1, 0.5],
                rotate: Math.random() * 720,
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: particle.delay,
                ease: "easeOut"
              }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ 
                  background: ['#FF6A00', '#FFA733', '#FFD700', '#FF4500'][Math.floor(Math.random() * 4)]
                }}
              />
            </motion.div>
          ))}

          {/* Main Celebration Card */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: [0, -10, 0]
            }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ 
              type: "spring", 
              stiffness: 200,
              damping: 20,
              y: {
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            className="relative bg-gradient-to-br from-primary via-orange-500 to-amber-500 p-8 rounded-3xl shadow-2xl max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
            
            {/* Content */}
            <div className="relative text-center text-white">
              {/* Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="mb-4"
              >
                <Award className="h-20 w-20 mx-auto drop-shadow-lg" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mb-2"
              >
                Level Up! 🎉
              </motion.h2>

              {/* Level Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-block bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-4"
              >
                <p className="text-sm font-medium mb-1">You're now a</p>
                <p className="text-3xl font-bold">
                  {newLevel.emoji} {newLevel.title}
                </p>
              </motion.div>

              {/* Message */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg mb-6"
              >
                Keep up the amazing work! 💪
              </motion.p>

              {/* Sparkles */}
              <div className="flex justify-center gap-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  >
                    <Sparkles className="h-6 w-6" />
                  </motion.div>
                ))}
              </div>

              {/* Close Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="mt-6 px-6 py-2 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-colors"
              >
                Awesome!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
