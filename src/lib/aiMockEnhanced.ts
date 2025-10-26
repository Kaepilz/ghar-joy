// Enhanced AI Mock Logic - Simulates AI Seller Mentor and Bargain Bot
// Structured to be easily replaced with real API calls later

import type { Product } from '@/store/useAppStore';

// ===== AI Seller Mentor =====
// Persona: Warm, encouraging, strategic, Nepali-English friendly

export interface MentorAnalysis {
  score: number; // 1-100
  suggestion: string;
  reasons: string[];
  quickActions: string[];
}

// Analyze product listing and provide suggestions
export const analyzeListing = (product: Partial<Product>): MentorAnalysis => {
  const issues: string[] = [];
  const actions: string[] = [];
  let score = 100;

  // Check title
  if (!product.title || product.title.length < 10) {
    issues.push('Title is too short - add more details');
    actions.push('Improve title');
    score -= 20;
  }

  // Check description
  if (!product.description || product.description.length < 30) {
    issues.push('Description needs more detail');
    actions.push('Expand description');
    score -= 25;
  }

  // Check price
  if (!product.price || product.price === 0) {
    issues.push('Price not set');
    actions.push('Set price');
    score -= 30;
  }

  // Check images
  if (!product.images || product.images.length === 0) {
    issues.push('No photos uploaded');
    actions.push('Add photos');
    score -= 25;
  }

  // Generate suggestion message
  let suggestion = '';
  if (score >= 90) {
    suggestion = 'Excellent listing! Your product looks great and will attract many buyers. 🎉';
  } else if (score >= 70) {
    suggestion = 'Good start! A few quick improvements will make this listing even better. 👍';
  } else if (score >= 50) {
    suggestion = 'Your listing needs some work. Follow the quick actions below to improve it. 💪';
  } else {
    suggestion = 'Let\'s improve this listing together! Complete the missing information to attract buyers. 🚀';
  }

  return {
    score: Math.max(0, score),
    suggestion,
    reasons: issues.length > 0 ? issues : ['Everything looks good!'],
    quickActions: actions.length > 0 ? actions : ['Share your listing']
  };
};

// Generate contextual mentor message
export const generateMentorMessage = (context: string, userMessage?: string): string => {
  // Simple rule-based responses (replace with API call later)
  const responses: { [key: string]: string[] } = {
    greeting: [
      'Namaste! 🙏 I\'m here to help you become a successful seller. What would you like to know?',
      'Hello! Ready to boost your sales? Ask me anything about selling on ShoppingGhar!',
      'Hi there! Let\'s make your products shine! How can I help you today?'
    ],
    photos: [
      'Great question! 📸 Use natural lighting, clean background, and show multiple angles. Customers love clear photos!',
      'Photo tips: 1) Good lighting 2) Clean product 3) Show details 4) Use plain background. This increases trust!',
      'Professional photos can increase sales by 50%! Take photos in daylight near a window. Show front, back, and details.'
    ],
    pricing: [
      'Pricing tip: Check similar products on ShoppingGhar, consider condition, and be competitive but fair. 💰',
      'For used items: 60-70% of original price is good. For almost new: 80-85%. New items: match market price or slightly lower.',
      'Great question! Look at similar listings, factor in your costs, and remember - fair pricing attracts serious buyers!'
    ],
    description: [
      'Good descriptions answer: What is it? What condition? Why buy it? Include size, color, flaws (if any). Be honest! ✍️',
      'Write like you\'re talking to a friend. Mention benefits, condition, and anything special. Honesty builds trust!',
      'Pro tip: Use bullet points for features, mention any defects honestly, and explain why you\'re selling. Buyers appreciate transparency!'
    ],
    shipping: [
      'For local delivery, offer meetups in safe public places. For shipping, partner with local couriers or use ShoppingGhar partners. 📦',
      'Shipping tips: Pack well, get tracking, and communicate delivery time clearly. Happy buyers leave good reviews!',
      'Offer both pickup and delivery if possible. Local buyers love convenience, and it reduces return chances!'
    ],
    default: [
      'That\'s a great question! As a general tip: clear photos, honest descriptions, and fair prices are the key to success. What specific area would you like help with?',
      'I\'m here to help! 😊 Can you tell me more about what you need assistance with? Pricing, photos, descriptions, or something else?',
      'Good question! The most important things for selling: 1) Clear photos 2) Detailed description 3) Fair price 4) Quick responses. Which one would you like to focus on?'
    ]
  };

  // Determine context and pick response
  let contextKey = 'default';
  const lower = (userMessage || context || '').toLowerCase();
  
  if (lower.includes('photo') || lower.includes('image') || lower.includes('picture')) {
    contextKey = 'photos';
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('kati')) {
    contextKey = 'pricing';
  } else if (lower.includes('description') || lower.includes('detail') || lower.includes('write')) {
    contextKey = 'description';
  } else if (lower.includes('ship') || lower.includes('delivery') || lower.includes('courier')) {
    contextKey = 'shipping';
  } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('namaste')) {
    contextKey = 'greeting';
  }

  const options = responses[contextKey] || responses.default;
  return options[Math.floor(Math.random() * options.length)];
};

// ===== AI Bargain Bot =====
// Persona: Playful negotiator, fair, uses Nepali-English mix

export interface BargainOffer {
  suggestedPrice: number;
  message: string;
  reasoning: string;
}

// Generate counter-offer for negotiation
export const generateCounterOffer = (
  originalPrice: number,
  condition: string,
  round: number = 1
): BargainOffer => {
  // Discount percentage based on condition and round
  let discountPercent = 0;
  
  if (condition === 'used') {
    discountPercent = round === 1 ? 15 : round === 2 ? 20 : 25;
  } else if (condition === 'almostNew') {
    discountPercent = round === 1 ? 10 : round === 2 ? 15 : 18;
  } else {
    discountPercent = round === 1 ? 5 : round === 2 ? 8 : 10;
  }

  const suggestedPrice = Math.floor(originalPrice * (1 - discountPercent / 100));

  // Generate friendly message in Nepali-English mix
  const messages = [
    `Dai/Didi, ${suggestedPrice} ma kasto huncha? 😊 Fair price ho, both parties happy huncha!`,
    `Let's meet in the middle at NPR ${suggestedPrice}! Ramro deal ho, what do you say? 🤝`,
    `How about NPR ${suggestedPrice}? Milyo bhane seller lai pani message garum! 👍`,
    `Bargain time! ${suggestedPrice} ma done? Ekdum fair price lagyo malai! 💰`
  ];

  const reasoning = `Based on ${condition} condition and market prices, ${discountPercent}% discount is fair for both parties.`;

  return {
    suggestedPrice,
    message: messages[Math.floor(Math.random() * messages.length)],
    reasoning
  };
};

// Generate bargain bot message
export const generateBargainMessage = (context: string): string => {
  const responses = [
    'Namaste! 🙏 I can help you get a better deal! Tell me which product you\'re interested in.',
    'Hi there! Ready to negotiate? I\'ll help you get the best price while keeping it fair for the seller! 😊',
    'Hello! I\'m your friendly negotiation assistant. Let\'s find a price that makes everyone happy! 🤝',
    'Bargain mode activated! 💪 Which product caught your eye? Let\'s see if we can get you a better deal.'
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

// ===== Auto-Generated Reply System =====
// Used for Accept/Edit/Send flow

export interface AutoReply {
  text: string;
  editable: boolean;
}

// Generate auto-reply based on context
export const generateAutoReply = (botType: 'mentor' | 'bargain', context: string): AutoReply => {
  if (botType === 'mentor') {
    return {
      text: generateMentorMessage(context),
      editable: true
    };
  } else {
    return {
      text: generateBargainMessage(context),
      editable: true
    };
  }
};

// NOTE FOR FUTURE: Replace all functions above with actual API calls
// Example structure for API integration:
//
// export const analyzeListing = async (product: Partial<Product>): Promise<MentorAnalysis> => {
//   const response = await fetch('/api/ai/mentor/analyze', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ product })
//   });
//   return await response.json();
// };
