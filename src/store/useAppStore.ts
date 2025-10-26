// Zustand store for global app state management
// Handles user, products, posts, friends, tokens, and more
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ===== Types =====
export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  location: string;
  xp: number;
  level: number;
  bazaarTokens: number;
  friends: string[]; // array of user IDs
  joinedDate: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'almostNew' | 'used';
  category: string;
  images: string[];
  sellerId: string;
  createdAt: string;
  rating: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  addedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  productId?: string;
  likes: string[]; // array of user IDs
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface SpinResult {
  id: string;
  type: 'discount' | 'shipping' | 'token' | 'extraSpin' | 'gift';
  value: string;
  claimed: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
}

// ===== Store Interface =====
interface AppStore {
  // Current User
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  
  // Users (mock database)
  users: User[];
  addUser: (user: User) => void;
  getUserById: (id: string) => User | undefined;
  getUserByUsername: (username: string) => User | undefined;
  
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsBySeller: (sellerId: string) => Product[];
  
  // Posts (Community Buzz)
  posts: Post[];
  addPost: (post: Post) => void;
  likePost: (postId: string, userId: string) => void;
  unlikePost: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  getPostsByUser: (userId: string) => Post[];
  
  // Friends
  addFriend: (userId: string, friendId: string) => void;
  removeFriend: (userId: string, friendId: string) => void;
  getMutualFriends: (user1Id: string, user2Id: string) => User[];
  
  // Bazaar Tokens & XP
  addBazaarTokens: (userId: string, amount: number) => void;
  spendBazaarTokens: (userId: string, amount: number) => boolean;
  addXP: (userId: string, amount: number) => void;
  
  // Spin Results
  spinResults: SpinResult[];
  addSpinResult: (result: SpinResult) => void;
  claimSpinResult: (resultId: string) => void;
  
  // Spins Available
  spinsAvailable: number;
  addSpin: () => void;
  useSpin: () => void;
  
  // Chat History (AI conversations)
  mentorChat: ChatMessage[];
  bargainChat: ChatMessage[];
  addMentorMessage: (message: ChatMessage) => void;
  addBargainMessage: (message: ChatMessage) => void;
  clearMentorChat: () => void;
  clearBargainChat: () => void;
  
  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (userId: string, productId: string) => void;
  removeFromWishlist: (userId: string, productId: string) => void;
  isInWishlist: (userId: string, productId: string) => boolean;
  getWishlistByUser: (userId: string) => WishlistItem[];
}

// ===== Store Implementation =====
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // === Current User ===
      currentUser: null,
      
      setCurrentUser: (user) => set({ currentUser: user }),
      
      updateUser: (updates) => set((state) => ({
        currentUser: state.currentUser 
          ? { ...state.currentUser, ...updates }
          : null,
        users: state.users.map(u => 
          u.id === state.currentUser?.id ? { ...u, ...updates } : u
        )
      })),
      
      // === Users ===
      users: [],
      
      addUser: (user) => set((state) => ({
        users: [...state.users, user]
      })),
      
      getUserById: (id) => {
        return get().users.find(u => u.id === id);
      },
      
      getUserByUsername: (username) => {
        return get().users.find(u => u.username === username);
      },
      
      // === Products ===
      products: [],
      
      addProduct: (product) => set((state) => ({
        products: [...state.products, product]
      })),
      
      getProductById: (id) => {
        return get().products.find(p => p.id === id);
      },
      
      getProductsBySeller: (sellerId) => {
        return get().products.filter(p => p.sellerId === sellerId);
      },
      
      // === Posts ===
      posts: [],
      
      addPost: (post) => set((state) => ({
        posts: [post, ...state.posts] // newest first
      })),
      
      likePost: (postId, userId) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId && !post.likes.includes(userId)
            ? { ...post, likes: [...post.likes, userId] }
            : post
        )
      })),
      
      unlikePost: (postId, userId) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId
            ? { ...post, likes: post.likes.filter(id => id !== userId) }
            : post
        )
      })),
      
      addComment: (postId, comment) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId
            ? { ...post, comments: [...post.comments, comment] }
            : post
        )
      })),
      
      getPostsByUser: (userId) => {
        return get().posts.filter(p => p.userId === userId);
      },
      
      // === Friends ===
      addFriend: (userId, friendId) => set((state) => ({
        users: state.users.map(user => 
          user.id === userId
            ? { ...user, friends: [...user.friends, friendId] }
            : user.id === friendId
            ? { ...user, friends: [...user.friends, userId] }
            : user
        ),
        currentUser: state.currentUser?.id === userId
          ? { ...state.currentUser, friends: [...state.currentUser.friends, friendId] }
          : state.currentUser
      })),
      
      removeFriend: (userId, friendId) => set((state) => ({
        users: state.users.map(user => 
          user.id === userId
            ? { ...user, friends: user.friends.filter(id => id !== friendId) }
            : user.id === friendId
            ? { ...user, friends: user.friends.filter(id => id !== userId) }
            : user
        ),
        currentUser: state.currentUser?.id === userId
          ? { ...state.currentUser, friends: state.currentUser.friends.filter(id => id !== friendId) }
          : state.currentUser
      })),
      
      getMutualFriends: (user1Id, user2Id) => {
        const user1 = get().getUserById(user1Id);
        const user2 = get().getUserById(user2Id);
        if (!user1 || !user2) return [];
        
        const mutualIds = user1.friends.filter(id => user2.friends.includes(id));
        return mutualIds.map(id => get().getUserById(id)).filter(Boolean) as User[];
      },
      
      // === Bazaar Tokens & XP ===
      addBazaarTokens: (userId, amount) => set((state) => ({
        users: state.users.map(user => 
          user.id === userId
            ? { ...user, bazaarTokens: user.bazaarTokens + amount }
            : user
        ),
        currentUser: state.currentUser?.id === userId
          ? { ...state.currentUser, bazaarTokens: state.currentUser.bazaarTokens + amount }
          : state.currentUser
      })),
      
      spendBazaarTokens: (userId, amount) => {
        const user = get().getUserById(userId);
        if (!user || user.bazaarTokens < amount) return false;
        
        set((state) => ({
          users: state.users.map(u => 
            u.id === userId
              ? { ...u, bazaarTokens: u.bazaarTokens - amount }
              : u
          ),
          currentUser: state.currentUser?.id === userId
            ? { ...state.currentUser, bazaarTokens: state.currentUser.bazaarTokens - amount }
            : state.currentUser
        }));
        
        return true;
      },
      
      addXP: (userId, amount) => set((state) => {
        const user = state.users.find(u => u.id === userId);
        if (!user) return state;
        
        const newXP = user.xp + amount;
        const newLevel = Math.floor(newXP / 500) + 1; // Simple level calculation
        
        return {
          users: state.users.map(u => 
            u.id === userId
              ? { ...u, xp: newXP, level: newLevel }
              : u
          ),
          currentUser: state.currentUser?.id === userId
            ? { ...state.currentUser, xp: newXP, level: newLevel }
            : state.currentUser
        };
      }),
      
      // === Spin Results ===
      spinResults: [],
      
      addSpinResult: (result) => set((state) => ({
        spinResults: [...state.spinResults, result]
      })),
      
      claimSpinResult: (resultId) => set((state) => ({
        spinResults: state.spinResults.map(result => 
          result.id === resultId
            ? { ...result, claimed: true }
            : result
        )
      })),
      
      // === Spins Available ===
      spinsAvailable: 3, // default 3 spins
      
      addSpin: () => set((state) => ({
        spinsAvailable: state.spinsAvailable + 1
      })),
      
      useSpin: () => set((state) => ({
        spinsAvailable: Math.max(0, state.spinsAvailable - 1)
      })),
      
      // === Chat History ===
      mentorChat: [],
      bargainChat: [],
      
      addMentorMessage: (message) => set((state) => ({
        mentorChat: [...state.mentorChat, message]
      })),
      
      addBargainMessage: (message) => set((state) => ({
        bargainChat: [...state.bargainChat, message]
      })),
      
      clearMentorChat: () => set({ mentorChat: [] }),
      
      clearBargainChat: () => set({ bargainChat: [] }),
      
      // === Wishlist ===
      wishlist: [],
      
      addToWishlist: (userId, productId) => set((state) => {
        // Check if already in wishlist
        const exists = state.wishlist.some(
          item => item.userId === userId && item.productId === productId
        );
        if (exists) return state;
        
        const newItem: WishlistItem = {
          id: `wishlist_${Date.now()}`,
          userId,
          productId,
          addedAt: new Date().toISOString()
        };
        
        return {
          wishlist: [...state.wishlist, newItem]
        };
      }),
      
      removeFromWishlist: (userId, productId) => set((state) => ({
        wishlist: state.wishlist.filter(
          item => !(item.userId === userId && item.productId === productId)
        )
      })),
      
      isInWishlist: (userId, productId) => {
        return get().wishlist.some(
          item => item.userId === userId && item.productId === productId
        );
      },
      
      getWishlistByUser: (userId) => {
        return get().wishlist.filter(item => item.userId === userId);
      },
    }),
    {
      name: 'shoppingghar-storage', // localStorage key
    }
  )
);
