// Auto Bargain Bot - Witty and fair negotiator with personality
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, DollarSign, Sparkles, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getBargainResponse, type BargainMessage } from "@/lib/aiMock";

export const BargainBot = () => {
  const originalPrice = 3499;
  const [messages, setMessages] = useState<BargainMessage[]>([
    {
      role: "bot",
      message: `Hey there! 👋 The seller wants Rs. ${originalPrice} for this gem. What's your best offer? Let's find a sweet deal together!`
    }
  ]);
  const [offerAmount, setOfferAmount] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendOffer = () => {
    const offer = parseInt(offerAmount);
    if (!offer || offer <= 0) return;

    // Add buyer's offer
    const buyerMessage: BargainMessage = {
      role: "buyer",
      message: `I'd like to offer Rs. ${offer}`,
      price: offer
    };
    setMessages((prev) => [...prev, buyerMessage]);
    setOfferAmount("");
    setIsTyping(true);

    // Show typing indicator then bot response
    setTimeout(() => {
      const botResponse = getBargainResponse(originalPrice, offer, messages);
      setIsTyping(false);
      setMessages((prev) => [...prev, botResponse]);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header with Personality */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-blue-500/5 border-2 border-primary/20">
        <div className="flex items-start gap-4">
          <motion.div 
            className="p-3 bg-gradient-to-br from-primary to-blue-500 rounded-full"
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity
            }}
          >
            <Bot className="h-6 w-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold">Auto Bargain Bot</h2>
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <p className="text-muted-foreground">
              Hi! I'm your friendly negotiator 🤝 I'll make sure both you and the seller walk away happy. Let's make a deal!
            </p>
          </div>
        </div>
      </Card>

      {/* Price Info */}
      <Card className="p-4 mb-6 bg-muted/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Seller's Asking Price</p>
            <p className="text-2xl font-bold text-primary">Rs. {originalPrice}</p>
          </div>
          <DollarSign className="h-8 w-8 text-primary" />
        </div>
      </Card>

      {/* Chat Messages with Better UI */}
      <Card className="p-6 mb-6 min-h-[400px] max-h-[500px] overflow-y-auto bg-gradient-to-b from-muted/20 to-transparent">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === "buyer" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "bot"
                      ? "bg-primary/10"
                      : msg.role === "buyer"
                      ? "bg-blue-500/10"
                      : "bg-green-500/10"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Bot className="h-5 w-5 text-primary" />
                  ) : (
                    <User className="h-5 w-5 text-blue-500" />
                  )}
                </div>

                {/* Message Bubble with Better Styling */}
                <div
                  className={`flex-1 max-w-[80%] ${
                    msg.role === "buyer" ? "text-right" : ""
                  }`}
                >
                  <Badge
                    variant="secondary"
                    className="mb-2 gap-1"
                  >
                    {msg.role === "bot" ? (
                      <>
                        <Bot className="h-3 w-3" />
                        Bargain Bot
                      </>
                    ) : (
                      <>
                        <User className="h-3 w-3" />
                        You
                      </>
                    )}
                  </Badge>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-2xl shadow-sm ${
                      msg.role === "bot"
                        ? "bg-gradient-to-br from-muted to-muted/50"
                        : msg.role === "buyer"
                        ? "bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30"
                        : "bg-gradient-to-br from-green-500/20 to-green-500/10 border border-green-500/30"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                    {msg.price && (
                      <motion.p 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-xl font-bold text-primary mt-2 flex items-center gap-1"
                      >
                        <DollarSign className="h-5 w-5" />
                        Rs. {msg.price}
                      </motion.p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="flex gap-1 items-center p-4 bg-muted rounded-2xl">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{ 
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="w-2 h-2 bg-primary rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input Area */}
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="string"
              placeholder="Enter your offer amount..."
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendOffer()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSendOffer} variant="hero" className="gap-2">
            <Send className="h-4 w-4" />
            Send Offer
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          The bot will negotiate to find a fair price for both parties
        </p>
      </Card>
    </div>
  );
};
