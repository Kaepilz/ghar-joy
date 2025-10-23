// Mock user data and XP system for ShoppingGhar
// Simulates user profiles, XP levels, and achievements

export interface User {
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  rank: string;
  joinedDate: string;
  totalPurchases: number;
  totalSales: number;
  badges: string[];
}

export interface XPLevel {
  level: number;
  title: string;
  emoji: string;
  xpRequired: number;
  color: string;
}

// XP Level System
export const XP_LEVELS: XPLevel[] = [
  { level: 1, title: "Beginner Trader", emoji: "🌱", xpRequired: 0, color: "text-green-500" },
  { level: 2, title: "Active Shopper", emoji: "🛍️", xpRequired: 100, color: "text-blue-500" },
  { level: 3, title: "Smart Seller", emoji: "💼", xpRequired: 300, color: "text-purple-500" },
  { level: 4, title: "Trusted Trader", emoji: "💎", xpRequired: 600, color: "text-cyan-500" },
  { level: 5, title: "Market Expert", emoji: "⭐", xpRequired: 1000, color: "text-yellow-500" },
  { level: 6, title: "Elite Merchant", emoji: "👑", xpRequired: 1500, color: "text-amber-500" },
  { level: 7, title: "Market Legend", emoji: "🔥", xpRequired: 2500, color: "text-orange-500" },
];

// Get current level info based on XP
export const getLevelInfo = (xp: number): XPLevel & { nextLevel: XPLevel | null; progress: number } => {
  let currentLevel = XP_LEVELS[0];
  
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].xpRequired) {
      currentLevel = XP_LEVELS[i];
      break;
    }
  }
  
  const currentIndex = XP_LEVELS.findIndex(l => l.level === currentLevel.level);
  const nextLevel = currentIndex < XP_LEVELS.length - 1 ? XP_LEVELS[currentIndex + 1] : null;
  
  const progress = nextLevel 
    ? ((xp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100
    : 100;
  
  return { ...currentLevel, nextLevel, progress };
};

// XP rewards for different actions
export const XP_REWARDS = {
  productView: 2,
  productPurchase: 50,
  productListed: 30,
  productSold: 80,
  spinWheel: 10,
  completeProfile: 100,
  dailyLogin: 15,
  shareProduct: 20,
  writeReview: 25,
};

// Mock current user
export const getCurrentUser = (): User => {
  const stored = localStorage.getItem('shoppingghar_user');
  if (stored) {
    return JSON.parse(stored);
  }
  
  const defaultUser: User = {
    id: 'user_1',
    name: 'Aayush Sharma',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aayush',
    xp: 450,
    level: 3,
    rank: 'Smart Seller 💼',
    joinedDate: '2024-01-15',
    totalPurchases: 12,
    totalSales: 8,
    badges: ['🎯 First Sale', '⭐ 5-Star Seller', '🎁 Early Adopter']
  };
  
  localStorage.setItem('shoppingghar_user', JSON.stringify(defaultUser));
  return defaultUser;
};

// Add XP to user
export const addUserXP = (amount: number, reason: string): { newXP: number; leveledUp: boolean; newLevel?: XPLevel } => {
  const user = getCurrentUser();
  const oldLevelInfo = getLevelInfo(user.xp);
  const newXP = user.xp + amount;
  const newLevelInfo = getLevelInfo(newXP);
  
  user.xp = newXP;
  user.level = newLevelInfo.level;
  user.rank = `${newLevelInfo.title} ${newLevelInfo.emoji}`;
  
  localStorage.setItem('shoppingghar_user', JSON.stringify(user));
  
  const leveledUp = newLevelInfo.level > oldLevelInfo.level;
  
  return {
    newXP,
    leveledUp,
    newLevel: leveledUp ? newLevelInfo : undefined
  };
};

// Get greeting based on time of day
export const getTimeBasedGreeting = (name: string): { greeting: string; emoji: string; message: string } => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    return {
      greeting: `Good morning, ${name}`,
      emoji: "🌅",
      message: "Ready to discover amazing deals today?"
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      greeting: `Good afternoon, ${name}`,
      emoji: "☀️",
      message: "Perfect time to list some items or find great bargains!"
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      greeting: `Good evening, ${name}`,
      emoji: "🌆",
      message: "The marketplace is buzzing tonight!"
    };
  } else {
    return {
      greeting: `Hello night owl, ${name}`,
      emoji: "🌙",
      message: "Late night shopping? We've got you covered!"
    };
  }
};

// Mock community activity
export interface CommunityActivity {
  id: string;
  type: 'sale' | 'listing' | 'review' | 'achievement';
  user: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
}

export const getCommunityFeed = (): CommunityActivity[] => {
  return [
    {
      id: '1',
      type: 'sale',
      user: 'Priya Thapa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      content: 'Just sold my vintage camera for Rs. 15,000! 📸 Thanks to the AI pricing tip!',
      time: '5 minutes ago',
      likes: 12
    },
    {
      id: '2',
      type: 'achievement',
      user: 'Rohan KC',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      content: 'Reached Level 5: Market Expert ⭐ Feeling proud!',
      time: '15 minutes ago',
      likes: 28
    },
    {
      id: '3',
      type: 'listing',
      user: 'Sunita Gurung',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
      content: 'Listed my handmade jewelry collection! Check it out 💍',
      time: '1 hour ago',
      likes: 45
    },
    {
      id: '4',
      type: 'review',
      user: 'Bikash Rai',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bikash',
      content: 'Amazing experience buying my first laptop here! Delivery was super fast 🚀',
      time: '2 hours ago',
      likes: 19
    }
  ];
};
