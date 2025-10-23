import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Users, TrendingUp, Shield, Sparkles, Award, Target } from "lucide-react";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-orange-500/5 to-transparent py-20">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="inline-block mb-6">
              <div className="p-4 bg-gradient-to-br from-primary to-orange-500 rounded-full">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to <span className="text-primary">ShoppingGhar</span></h1>
            <motion.p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              Where Nepal's marketplace spirit comes alive online 🇳🇵
            </motion.p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <motion.div ref={ref} style={{ opacity, scale }} className="max-w-3xl mx-auto mb-20">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-card to-muted/30">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story ❤️</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg"><strong className="text-foreground">ShoppingGhar</strong> was built to bring Nepal's vibrant marketplace spirit online — a place where <span className="text-primary font-semibold">everyone is both buyer and seller</span>.</p>
              <p>We believe commerce should feel warm, human, and community-driven. That's why we've created a platform that combines modern technology with the trust and friendliness of traditional Nepalese markets.</p>
              <p className="text-center text-xl font-semibold text-primary mt-6">Join us in building Nepal's digital marketplace! 🚀</p>
            </div>
          </Card>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Users, label: "10K+ Active Users", color: "text-blue-500" },
            { icon: Heart, label: "50K+ Happy Customers", color: "text-red-500" },
            { icon: Award, label: "Most Trusted", color: "text-yellow-500" },
            { icon: Target, label: "99% Satisfaction", color: "text-green-500" }
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}>
              <Card className="p-6 text-center"><stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} /><p className="font-semibold">{stat.label}</p></Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products"><Button variant="hero" size="lg">Start Shopping</Button></Link>
            <Link to="/sell"><Button variant="outline" size="lg">Become a Seller</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
