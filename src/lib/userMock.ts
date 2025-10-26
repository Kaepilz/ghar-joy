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

// Mock community activity with social features
export interface CommunityActivity {
  id: string;
  type: 'sale' | 'listing' | 'review' | 'achievement';
  user: string;
  userId: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  comments: Comment[];
  productId?: string;
  productImage?: string;
}

export interface Comment {
  id: string;
  user: string;
  userId: string;
  avatar: string;
  content: string;
  time: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  mutualFriends: number;
  isFriend: boolean;
}

export const getCommunityFeed = (): CommunityActivity[] => {
  return [
    {
      id: '1',
      type: 'sale',
      user: 'Priya Thapa',
      userId: 'user_2',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      content: 'Just sold my vintage camera for Rs. 15,000! 📸 Thanks to the AI pricing tip!',
      time: '5 minutes ago',
      likes: 12,
      comments: [],
      productId: '1',
      productImage: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f'
    },
    {
      id: '2',
      type: 'achievement',
      user: 'Rohan KC',
      userId: 'user_3',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      content: 'Reached Level 5: Market Expert ⭐ Feeling proud!',
      time: '15 minutes ago',
      likes: 28,
      comments: [
        {
          id: 'c1',
          user: 'AI Mentor',
          userId: 'ai_mentor',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AIMentor',
          content: 'Congratulations! 🎉 Keep up the amazing work!',
          time: '10 minutes ago'
        }
      ]
    },
    {
      id: '3',
      type: 'listing',
      user: 'Sunita Gurung',
      userId: 'user_4',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
      content: 'Listed my handmade jewelry collection! Check it out 💍',
      time: '1 hour ago',
      likes: 45,
      comments: [],
      productId: '3',
      productImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338'
    },
    {
      id: '4',
      type: 'review',
      user: 'Bikash Rai',
      userId: 'user_5',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bikash',
      content: 'Amazing experience buying my first laptop here! Delivery was super fast 🚀',
      time: '2 hours ago',
      likes: 19,
      comments: [
        {
          id: 'c2',
          user: 'Bargain Bot',
          userId: 'bargain_bot',
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=BargainBot',
          content: 'Glad you got a great deal! 😉 I can help with your next purchase too!',
          time: '1 hour ago'
        }
      ]
    }
  ];
};

// Get suggested friends
export const getSuggestedFriends = (): Friend[] => {
  return [
    {
      id: 'user_2',
      name: 'Priya Thapa',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      mutualFriends: 5,
      isFriend: false
    },
    {
      id: 'user_3',
      name: 'Rohan KC',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
      mutualFriends: 3,
      isFriend: true
    },
    {
      id: 'user_4',
      name: 'Sunita Gurung',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
      mutualFriends: 8,
      isFriend: false
    },
    {
      id: 'user_5',
      name: 'Bikash Rai',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bikash',
      mutualFriends: 2,
      isFriend: true
    }
  ];
};

// Mock gifts data
export interface Gift {
  id: string;
  name: string;
  image: string;
  value: number;
  requirement: string;
  progress: number;
  total: number;
  claimed: boolean;
}

export const getMockGifts = (): Gift[] => {
  return [
    {
      id: 'gift_1',
      name: '🧦 Free Socks',
      image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82',
      value: 0,
      requirement: 'Buy 5 items',
      progress: 3,
      total: 5,
      claimed: false
    },
    {
      id: 'gift_2',
      name: '🔑 Keychain',
      image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b',
      value: 0,
      requirement: 'Collect 5 daily stars',
      progress: 2,
      total: 5,
      claimed: false
    },
    {
      id: 'gift_3',
      name: '✏️ Pen Set',
      image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338',
      value: 0,
      requirement: 'Invite 3 friends',
      progress: 1,
      total: 3,
      claimed: false
    },
    {
      id: 'gift_4',
      name: '🎨 Sticker Pack',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64',
      value: 0,
      requirement: 'Share 10 products',
      progress: 7,
      total: 10,
      claimed: false
    }
  ];
};
