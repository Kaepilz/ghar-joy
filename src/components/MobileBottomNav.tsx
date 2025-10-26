// ============================================
// Mobile Bottom Navigation
// Sticky bottom tabs for mobile users
// ============================================

import { Home, Gift, TrendingUp, User, ShoppingCart, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export const MobileBottomNav = () => {
  const location = useLocation();
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Gift, label: "Gifts", path: "/gifts" },
    { icon: TrendingUp, label: "Buzz", path: "/buzz" },
    { icon: Heart, label: "Wishlist", path: "/wishlist" },
    { icon: ShoppingCart, label: "Cart", path: "/cart", badge: itemCount },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.label}
              to={item.path}
              className="relative flex flex-col items-center justify-center flex-1 h-full"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center gap-1 ${
                  active ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <div className="relative">
                  <Icon className="h-6 w-6" />
                  
                  {/* Badge for cart count */}
                  {item.badge && item.badge > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {item.badge}
                    </motion.div>
                  )}
                </div>
                
                <span className="text-xs font-medium">{item.label}</span>
              </motion.div>

              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
