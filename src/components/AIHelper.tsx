// Floating AI Helper - Contextual AI assistant that appears when needed
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AIHelperMessage {
  text: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const AIHelper = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState<AIHelperMessage | null>(null);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  // Show contextual messages based on page/actions
  useEffect(() => {
    const welcomed = localStorage.getItem('ai_helper_welcomed');
    if (!welcomed && !hasSeenWelcome) {
      setTimeout(() => {
        setMessage({
          text: "Hi! 👋 I'm your AI shopping assistant. I'm here to help you find great deals and boost your sales!",
          action: {
            label: "Got it!",
            onClick: () => {
              localStorage.setItem('ai_helper_welcomed', 'true');
              setHasSeenWelcome(true);
              setIsExpanded(false);
            }
          }
        });
        setIsVisible(true);
        setIsExpanded(true);
      }, 2000);
    }

    // Listen for custom events to show contextual help
    const handleAIHelp = (e: any) => {
      setMessage(e.detail);
      setIsVisible(true);
      setIsExpanded(true);
    };

    window.addEventListener('show-ai-help', handleAIHelp);
    return () => window.removeEventListener('show-ai-help', handleAIHelp);
  }, [hasSeenWelcome]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && message && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 mr-2"
          >
            <Card className="p-4 max-w-xs bg-gradient-to-br from-primary/10 to-orange-500/10 border-2 border-primary/20 shadow-xl">
              {/* Close Button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>

              {/* AI Avatar */}
              <div className="flex items-start gap-3 mb-3">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="p-2 bg-gradient-to-br from-primary to-orange-500 rounded-full"
                >
                  <Bot className="h-5 w-5 text-white" />
                </motion.div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-medium mb-1">AI Assistant</p>
                  <div className="flex gap-1">
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
                        className="w-1.5 h-1.5 bg-primary rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <p className="text-sm mb-3 leading-relaxed">{message.text}</p>

              {/* Action Button */}
              {message.action && (
                <Button
                  onClick={message.action.onClick}
                  variant="hero"
                  size="sm"
                  className="w-full"
                >
                  {message.action.label}
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90"
        >
          <motion.div
            animate={{ 
              rotate: isExpanded ? 180 : 0
            }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isExpanded ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <MessageCircle className="h-6 w-6 text-white" />
            )}
          </motion.div>
        </Button>

        {/* Notification Dot */}
        {!isExpanded && message && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-full h-full bg-red-500 rounded-full"
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

// Helper function to trigger AI help from anywhere
export const showAIHelp = (text: string, action?: { label: string; onClick: () => void }) => {
  window.dispatchEvent(new CustomEvent('show-ai-help', { 
    detail: { text, action } 
  }));
};
