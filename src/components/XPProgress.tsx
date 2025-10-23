// XP Progress Component - Shows user's level and progress
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { getLevelInfo, getCurrentUser } from "@/lib/userMock";
import { useState, useEffect } from "react";

interface XPProgressProps {
  compact?: boolean;
  showDetails?: boolean;
}

export const XPProgress = ({ compact = false, showDetails = true }: XPProgressProps) => {
  const [user, setUser] = useState(getCurrentUser());
  const levelInfo = getLevelInfo(user.xp);

  // Listen for XP updates
  useEffect(() => {
    const handleXPUpdate = () => {
      setUser(getCurrentUser());
    };
    
    window.addEventListener('xp-updated', handleXPUpdate);
    return () => window.removeEventListener('xp-updated', handleXPUpdate);
  }, []);

  if (compact) {
    return (
      <motion.div 
        className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className={`text-2xl ${levelInfo.color}`}>
          {levelInfo.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold truncate">{levelInfo.title}</span>
            <span className="text-xs text-muted-foreground ml-2">
              {user.xp} XP
            </span>
          </div>
          <Progress value={levelInfo.progress} className="h-2" />
        </div>
      </motion.div>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-orange-500/5 to-transparent border-2 border-primary/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-3 bg-gradient-to-br from-primary to-orange-500 rounded-full"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Sparkles className="h-6 w-6 text-white" />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg">Your Progress</h3>
            <p className="text-sm text-muted-foreground">Keep growing your rank!</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          Level {levelInfo.level}
        </Badge>
      </div>

      {/* Current Rank */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-3xl ${levelInfo.color}`}>{levelInfo.emoji}</span>
          <div>
            <p className={`font-bold text-xl ${levelInfo.color}`}>{levelInfo.title}</p>
            <p className="text-sm text-muted-foreground">{user.xp} XP earned</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress to next level</span>
          {levelInfo.nextLevel ? (
            <span className="font-semibold text-primary">
              {Math.round(levelInfo.progress)}%
            </span>
          ) : (
            <span className="font-semibold text-primary">Max Level! 🎉</span>
          )}
        </div>
        <Progress value={levelInfo.progress} className="h-3" />
        {levelInfo.nextLevel && (
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{levelInfo.xpRequired} XP</span>
            <span className="font-medium text-foreground">
              {levelInfo.nextLevel.title} {levelInfo.nextLevel.emoji}
            </span>
            <span>{levelInfo.nextLevel.xpRequired} XP</span>
          </div>
        )}
      </div>

      {/* Stats */}
      {showDetails && (
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <motion.div 
            className="text-center p-3 bg-muted/50 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-green-500" />
            <p className="text-2xl font-bold text-green-500">{user.totalSales}</p>
            <p className="text-xs text-muted-foreground">Items Sold</p>
          </motion.div>
          <motion.div 
            className="text-center p-3 bg-muted/50 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Award className="h-5 w-5 mx-auto mb-1 text-blue-500" />
            <p className="text-2xl font-bold text-blue-500">{user.badges.length}</p>
            <p className="text-xs text-muted-foreground">Badges Earned</p>
          </motion.div>
        </div>
      )}
    </Card>
  );
};
