// Initial mock data for ShoppingGhar
// This data will be loaded into Zustand store on first app load
import type { User, Product, Post } from '@/store/useAppStore';

// === Mock Users ===
export const mockUsers: User[] = [
  {
    id: 'user_1',
    username: 'aayush_sharma',
    name: 'Aayush Sharma',
    email: 'aayush@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aayush',
    bio: 'Tech enthusiast and seller from Kathmandu 🇳🇵',
    location: 'Kathmandu, Nepal',
    xp: 450,
    level: 3,
    bazaarTokens: 12,
    friends: ['user_2', 'user_3'],
    joinedDate: '2024-01-15'
  },
  {
    id: 'user_2',
    username: 'priya_thapa',
    name: 'Priya Thapa',
    email: 'priya@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    bio: 'Fashion lover | Vintage collector 💍',
    location: 'Pokhara, Nepal',
    xp: 780,
    level: 5,
    bazaarTokens: 25,
    friends: ['user_1', 'user_4'],
    joinedDate: '2023-11-20'
  },
  {
    id: 'user_3',
    username: 'rohan_kc',
    name: 'Rohan KC',
    email: 'rohan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
    bio: 'Gaming setup specialist 🎮',
    location: 'Lalitpur, Nepal',
    xp: 1250,
    level: 7,
    bazaarTokens: 8,
    friends: ['user_1', 'user_2', 'user_4'],
    joinedDate: '2023-08-10'
  },
  {
    id: 'user_4',
    username: 'sunita_gurung',
    name: 'Sunita Gurung',
    email: 'sunita@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita',
    bio: 'Handmade jewelry creator ✨',
    location: 'Butwal, Nepal',
    xp: 620,
    level: 4,
    bazaarTokens: 15,
    friends: ['user_2', 'user_3', 'user_5'],
    joinedDate: '2024-02-01'
  },
  {
    id: 'user_5',
    username: 'bikash_rai',
    name: 'Bikash Rai',
    email: 'bikash@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bikash',
    bio: 'Electronics & gadgets 📱',
    location: 'Biratnagar, Nepal',
    xp: 920,
    level: 6,
    bazaarTokens: 18,
    friends: ['user_4'],
    joinedDate: '2023-12-05'
  }
];

// === Mock Products ===
export const mockProducts: Product[] = [
  {
    id: 'prod_1',
    title: 'Premium Wireless Headphones - Sony WH-1000XM5',
    description: 'High-quality wireless headphones with industry-leading noise cancellation. 30-hour battery life, multipoint connection, and premium sound quality. Perfect condition, barely used.',
    price: 3499,
    condition: 'almostNew',
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    sellerId: 'user_1',
    createdAt: '2025-01-20T10:30:00Z',
    rating: 4.8
  },
  {
    id: 'prod_2',
    title: 'Vintage Leather Messenger Bag',
    description: 'Beautiful vintage leather messenger bag in excellent condition. Genuine leather, multiple compartments, adjustable strap. A timeless classic piece.',
    price: 2499,
    condition: 'used',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'],
    sellerId: 'user_2',
    createdAt: '2025-01-19T14:20:00Z',
    rating: 4.5
  },
  {
    id: 'prod_3',
    title: 'Gaming Keyboard RGB - Mechanical Switches',
    description: 'Brand new mechanical gaming keyboard with customizable RGB lighting, tactile switches, and anti-ghosting technology. Perfect for gaming and productivity.',
    price: 4299,
    condition: 'new',
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500'],
    sellerId: 'user_3',
    createdAt: '2025-01-18T09:15:00Z',
    rating: 4.7
  },
  {
    id: 'prod_4',
    title: 'Handmade Silver Necklace Set',
    description: 'Gorgeous handmade silver necklace with matching earrings. Traditional Nepali design with modern touch. Perfect for special occasions.',
    price: 5999,
    condition: 'new',
    category: 'Jewelry',
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500'],
    sellerId: 'user_4',
    createdAt: '2025-01-17T16:45:00Z',
    rating: 5.0
  },
  {
    id: 'prod_5',
    title: 'Smart Watch Pro - Fitness Tracker',
    description: 'Feature-rich smartwatch with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Compatible with both iOS and Android.',
    price: 8999,
    condition: 'new',
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    sellerId: 'user_5',
    createdAt: '2025-01-16T11:00:00Z',
    rating: 4.6
  },
  {
    id: 'prod_6',
    title: 'Mountain Bike - 21 Speed Shimano',
    description: 'Durable mountain bike with 21-speed Shimano gear system. Perfect for trails and city roads. Well maintained, minor scratches only.',
    price: 15999,
    condition: 'used',
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500'],
    sellerId: 'user_1',
    createdAt: '2025-01-15T08:30:00Z',
    rating: 4.4
  },
  {
    id: 'prod_7',
    title: 'Bluetooth Speaker Portable - JBL',
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour battery. Perfect for outdoor adventures and parties.',
    price: 2799,
    condition: 'almostNew',
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    sellerId: 'user_3',
    createdAt: '2025-01-14T15:20:00Z',
    rating: 4.8
  },
  {
    id: 'prod_8',
    title: 'Designer Sunglasses - Ray-Ban Style',
    description: 'Stylish sunglasses with UV protection and polarized lenses. Classic design that never goes out of style.',
    price: 1899,
    condition: 'new',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
    sellerId: 'user_2',
    createdAt: '2025-01-13T12:10:00Z',
    rating: 4.3
  },
  {
    id: 'prod_9',
    title: 'Coffee Maker Deluxe - Programmable',
    description: 'Professional-grade coffee maker with multiple brewing options, timer, and keep-warm function. Makes perfect coffee every time.',
    price: 6499,
    condition: 'new',
    category: 'Home',
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
    sellerId: 'user_4',
    createdAt: '2025-01-12T10:00:00Z',
    rating: 4.5
  },
  {
    id: 'prod_10',
    title: 'Running Shoes - Nike Air Zoom',
    description: 'Lightweight running shoes with cushioned sole and breathable mesh. Perfect for daily runs and workouts.',
    price: 5499,
    condition: 'new',
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    sellerId: 'user_5',
    createdAt: '2025-01-11T09:45:00Z',
    rating: 4.9
  },
  {
    id: 'prod_11',
    title: 'Yoga Mat Premium - Extra Thick',
    description: 'Eco-friendly yoga mat with extra cushioning and non-slip surface. Perfect for yoga, pilates, and home workouts.',
    price: 1299,
    condition: 'new',
    category: 'Sports',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
    sellerId: 'user_2',
    createdAt: '2025-01-10T14:30:00Z',
    rating: 4.6
  },
  {
    id: 'prod_12',
    title: 'Canvas Backpack - Vintage Style',
    description: 'Durable canvas backpack with laptop compartment and multiple pockets. Perfect for students and travelers.',
    price: 1799,
    condition: 'almostNew',
    category: 'Fashion',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    sellerId: 'user_1',
    createdAt: '2025-01-09T11:20:00Z',
    rating: 4.4
  }
];

// === Mock Posts ===
export const mockPosts: Post[] = [
  {
    id: 'post_1',
    userId: 'user_2',
    content: 'Just listed my vintage leather messenger bag! Perfect condition and ready for a new owner. 💼✨',
    productId: 'prod_2',
    likes: ['user_1', 'user_3', 'user_4'],
    comments: [
      {
        id: 'comment_1',
        userId: 'user_1',
        content: 'Beautiful bag! Is the leather genuine?',
        createdAt: '2025-01-19T15:00:00Z'
      }
    ],
    createdAt: '2025-01-19T14:30:00Z'
  },
  {
    id: 'post_2',
    userId: 'user_3',
    content: 'Reached Level 7: Market Legend! 🔥 Feeling proud of this journey with ShoppingGhar!',
    likes: ['user_1', 'user_2', 'user_4', 'user_5'],
    comments: [
      {
        id: 'comment_2',
        userId: 'user_4',
        content: 'Congratulations! Well deserved! 🎉',
        createdAt: '2025-01-18T10:00:00Z'
      },
      {
        id: 'comment_3',
        userId: 'user_1',
        content: 'Awesome achievement bro!',
        createdAt: '2025-01-18T10:15:00Z'
      }
    ],
    createdAt: '2025-01-18T09:30:00Z'
  },
  {
    id: 'post_3',
    userId: 'user_4',
    content: 'New handmade jewelry collection just dropped! 💍 Each piece is unique and crafted with love.',
    productId: 'prod_4',
    likes: ['user_2', 'user_3', 'user_5'],
    comments: [],
    createdAt: '2025-01-17T17:00:00Z'
  },
  {
    id: 'post_4',
    userId: 'user_1',
    content: 'Thanks to AI Mentor for helping me improve my product photos! Sales have increased by 30%! 📸🚀',
    likes: ['user_2', 'user_5'],
    comments: [
      {
        id: 'comment_4',
        userId: 'user_5',
        content: 'That\'s amazing! I should try the AI Mentor too.',
        createdAt: '2025-01-16T12:00:00Z'
      }
    ],
    createdAt: '2025-01-16T11:30:00Z'
  },
  {
    id: 'post_5',
    userId: 'user_5',
    content: 'Just sold my first smart watch! 🎉 ShoppingGhar community is the best!',
    productId: 'prod_5',
    likes: ['user_1', 'user_3', 'user_4'],
    comments: [],
    createdAt: '2025-01-15T13:00:00Z'
  }
];

// Function to initialize store with mock data
export const initializeMockData = () => {
  return {
    users: mockUsers,
    products: mockProducts,
    posts: mockPosts,
    currentUser: mockUsers[0] // Set Aayush as default user
  };
};
