// ============================================
// Feedback & Help Page
// User feedback submission, help center, and AI assistance
// ============================================

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, HelpCircle, Bot, Send, Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const FeedbackHelp = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'bot'; message: string }>>([
    { role: 'bot', message: "Hi! 👋 I'm your AI assistant. How can I help you today?" }
  ]);

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    if (!feedback.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Feedback submitted!", {
      description: "Thank you for helping us improve ShoppingGhar 🙏"
    });
    
    setFeedback("");
    setEmail("");
  };

  // Handle AI chat
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    // Add user message
    setChatHistory([...chatHistory, { role: 'user', message: chatMessage }]);
    setChatMessage("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! For selling items, go to the 'Sell' page and fill in the product details. Our AI Mentor will help you optimize your listing! 📦",
        "The Spin-to-Win wheel gives you a chance to win daily rewards! You can spin once per day. Try your luck! 🎰",
        "To add friends, visit their profile and click 'Add Friend'. You'll see mutual friends and can connect easily! 👥",
        "Free gifts can be claimed from the Gifts page. Complete challenges like buying items or inviting friends to unlock them! 🎁",
        "Our Bargain Bot helps negotiate prices between buyers and sellers automatically. It's fair, fast, and fun! 🤖"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setChatHistory(prev => [...prev, { role: 'bot', message: randomResponse }]);
    }, 1000);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I sell items on ShoppingGhar?",
      answer: "Click on the 'Sell' button in the navigation, fill in your product details, upload photos, and set your price. Our AI Mentor will provide tips to optimize your listing!"
    },
    {
      question: "How does the Spin-to-Win work?",
      answer: "You can spin the wheel once per day to win rewards like discounts, free shipping, or free gifts. Just click the 'Spin Now' button and see what you win!"
    },
    {
      question: "What is the Bargain Bot?",
      answer: "The Bargain Bot is an AI negotiator that helps buyers and sellers agree on a fair price. It makes negotiation fun and efficient!"
    },
    {
      question: "How can I earn XP and level up?",
      answer: "Earn XP by buying products, selling items, spinning the wheel, completing your profile, and daily logins. As you level up, you unlock badges and special features!"
    },
    {
      question: "What are free gifts and how do I claim them?",
      answer: "Free gifts are rewards you can earn by completing challenges like buying items, inviting friends, or collecting daily stars. Visit the Gifts page to see available gifts and their requirements."
    },
    {
      question: "How do I add friends?",
      answer: "Visit a user's profile and click 'Add Friend'. You can see mutual friends and build your ShoppingGhar community!"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            Help & <span className="text-primary">Support</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            We're here to help! Get assistance, send feedback, or chat with our AI assistant.
          </p>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="feedback" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="feedback" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Send Feedback
            </TabsTrigger>
            <TabsTrigger value="help" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Bot className="h-4 w-4" />
              Ask AI
            </TabsTrigger>
          </TabsList>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Share Your Thoughts 💭</h2>
                  <p className="text-muted-foreground">
                    Your feedback helps us make ShoppingGhar better for everyone!
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Feedback</label>
                    <Textarea
                      placeholder="Tell us what you think! Suggestions, bugs, or compliments - we want to hear it all 😊"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full" 
                    size="lg"
                    onClick={handleSubmitFeedback}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Feedback
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-bold mb-4">Other Ways to Reach Us</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>support@shoppingghar.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>+977 98-12345678</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>Kathmandu, Nepal</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Help Center Tab */}
          <TabsContent value="help">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground">
                    Find quick answers to common questions
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                          <div className="p-2 bg-primary/10 rounded-full h-fit">
                            <HelpCircle className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold mb-2">{faq.question}</h3>
                            <p className="text-sm text-muted-foreground">{faq.answer}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="ai">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Bot className="h-7 w-7 text-primary" />
                    AI Assistant
                  </h2>
                  <p className="text-muted-foreground">
                    Ask me anything about ShoppingGhar!
                  </p>
                </div>

                {/* Chat History */}
                <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-muted/30 rounded-lg">
                  {chatHistory.map((chat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex gap-3 ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {chat.role === 'bot' && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          chat.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border'
                        }`}
                      >
                        <p className="text-sm">{chat.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your question here..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FeedbackHelp;
