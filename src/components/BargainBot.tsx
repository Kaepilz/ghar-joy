// Auto Bargain Bot - Negotiates between buyer and seller
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, DollarSign } from "lucide-react";
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
      message: `Welcome! The seller's asking price is Rs. ${originalPrice}. Make your offer and I'll help negotiate the best deal for both parties.`
    }
  ]);
  const [offerAmount, setOfferAmount] = useState("");

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

    // Get bot response
    setTimeout(() => {
      const botResponse = getBargainResponse(originalPrice, offer, messages);
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setOfferAmount("");
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-blue-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Bot className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Auto Bargain Bot</h2>
            <p className="text-muted-foreground">
              I'll help negotiate the best price between you and the seller. Just make an offer!
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

      {/* Chat Messages */}
      <Card className="p-6 mb-6 min-h-[400px] max-h-[500px] overflow-y-auto">
        <div className="space-y-4">
          <AnimatePresence>
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

                {/* Message Bubble */}
                <div
                  className={`flex-1 max-w-[80%] ${
                    msg.role === "buyer" ? "text-right" : ""
                  }`}
                >
                  <Badge
                    variant="secondary"
                    className="mb-1"
                  >
                    {msg.role === "bot" ? "Bargain Bot" : "You"}
                  </Badge>
                  <div
                    className={`p-4 rounded-lg ${
                      msg.role === "bot"
                        ? "bg-muted"
                        : msg.role === "buyer"
                        ? "bg-blue-500/10 border border-blue-500/20"
                        : "bg-green-500/10 border border-green-500/20"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    {msg.price && (
                      <p className="text-lg font-bold text-primary mt-2">
                        Rs. {msg.price}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>

      {/* Input Area */}
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="number"
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
