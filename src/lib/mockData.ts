// Mock product data for ShoppingGhar

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  condition: 'new' | 'used';
  images: string[];
  description: string;
  seller: {
    id: string;
    name: string;
  };
  rating: number;
  inventory: number;
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    price: 3499,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'],
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    seller: { id: 's1', name: 'TechStore Nepal' },
    rating: 4.5,
    inventory: 45,
    category: 'Electronics'
  },
  {
    id: '2',
    title: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    price: 8999,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'],
    description: 'Feature-rich smartwatch with fitness tracking and health monitoring.',
    seller: { id: 's2', name: 'Gadget Hub' },
    rating: 4.8,
    inventory: 30,
    category: 'Electronics'
  },
  {
    id: '3',
    title: 'Vintage Leather Bag',
    slug: 'vintage-leather-bag',
    price: 2499,
    condition: 'used',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500'],
    description: 'Beautiful vintage leather bag in excellent condition. Perfect for daily use.',
    seller: { id: 's3', name: 'Classic Collections' },
    rating: 4.2,
    inventory: 5,
    category: 'Fashion'
  },
  {
    id: '4',
    title: 'Mountain Bike - 21 Speed',
    slug: 'mountain-bike-21-speed',
    price: 15999,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500'],
    description: 'Durable mountain bike with 21-speed gear system. Perfect for trails and city roads.',
    seller: { id: 's4', name: 'Adventure Sports' },
    rating: 4.7,
    inventory: 12,
    category: 'Sports'
  },
  {
    id: '5',
    title: 'Gaming Keyboard RGB',
    slug: 'gaming-keyboard-rgb',
    price: 4299,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500'],
    description: 'Mechanical gaming keyboard with customizable RGB lighting and tactile switches.',
    seller: { id: 's1', name: 'TechStore Nepal' },
    rating: 4.6,
    inventory: 25,
    category: 'Electronics'
  },
  {
    id: '6',
    title: 'Yoga Mat Premium',
    slug: 'yoga-mat-premium',
    price: 1299,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500'],
    description: 'Eco-friendly yoga mat with extra cushioning and non-slip surface.',
    seller: { id: 's5', name: 'Wellness Shop' },
    rating: 4.4,
    inventory: 60,
    category: 'Sports'
  },
  {
    id: '7',
    title: 'Coffee Maker Deluxe',
    slug: 'coffee-maker-deluxe',
    price: 6499,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500'],
    description: 'Professional-grade coffee maker with multiple brewing options and timer.',
    seller: { id: 's6', name: 'Home Essentials' },
    rating: 4.3,
    inventory: 18,
    category: 'Home'
  },
  {
    id: '8',
    title: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    price: 1899,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500'],
    description: 'Stylish sunglasses with UV protection and polarized lenses.',
    seller: { id: 's3', name: 'Classic Collections' },
    rating: 4.5,
    inventory: 40,
    category: 'Fashion'
  },
  {
    id: '9',
    title: 'Bluetooth Speaker Portable',
    slug: 'bluetooth-speaker-portable',
    price: 2799,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'],
    description: 'Waterproof portable speaker with 360-degree sound and 12-hour battery.',
    seller: { id: 's2', name: 'Gadget Hub' },
    rating: 4.7,
    inventory: 35,
    category: 'Electronics'
  },
  {
    id: '10',
    title: 'Canvas Backpack',
    slug: 'canvas-backpack',
    price: 1799,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'],
    description: 'Durable canvas backpack with laptop compartment and multiple pockets.',
    seller: { id: 's4', name: 'Adventure Sports' },
    rating: 4.4,
    inventory: 50,
    category: 'Fashion'
  },
  {
    id: '11',
    title: 'Electric Kettle',
    slug: 'electric-kettle',
    price: 899,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1587080266227-677cc2a4e76e?w=500'],
    description: 'Fast-boiling electric kettle with auto shut-off and temperature control.',
    seller: { id: 's6', name: 'Home Essentials' },
    rating: 4.2,
    inventory: 70,
    category: 'Home'
  },
  {
    id: '12',
    title: 'Running Shoes',
    slug: 'running-shoes',
    price: 5499,
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    description: 'Lightweight running shoes with cushioned sole and breathable mesh.',
    seller: { id: 's5', name: 'Wellness Shop' },
    rating: 4.8,
    inventory: 28,
    category: 'Sports'
  }
];

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '💻' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'toys', name: 'Toys', icon: '🎮' }
];
