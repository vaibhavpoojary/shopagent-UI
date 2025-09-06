export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  inStock: boolean;
  description: string;
  features?: string[];
  brand?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones Pro",
    price: 79.99,
    originalPrice: 99.99,
    image: "🎧",
    rating: 4.5,
    reviews: 234,
    category: "Electronics",
    brand: "AudioTech",
    inStock: true,
    description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life",
    features: ["Active Noise Cancellation", "30-hour battery", "Quick charge", "Premium sound quality"]
  },
  {
    id: 2,
    name: "Smart Fitness Watch Ultra",
    price: 199.99,
    originalPrice: 249.99,
    image: "⌚",
    rating: 4.8,
    reviews: 156,
    category: "Wearables",
    brand: "FitTech",
    inStock: true,
    description: "Track your fitness goals with advanced health monitoring and GPS",
    features: ["Heart rate monitor", "GPS tracking", "Sleep analysis", "Water resistant"]
  },
  {
    id: 3,
    name: "Organic Coffee Beans Premium",
    price: 24.99,
    originalPrice: 29.99,
    image: "☕",
    rating: 4.6,
    reviews: 89,
    category: "Food & Beverage",
    brand: "BrewMaster",
    inStock: true,
    description: "Premium organic coffee beans, freshly roasted from Colombian highlands",
    features: ["100% Organic", "Freshly roasted", "Colombian origin", "Fair trade"]
  },
  {
    id: 4,
    name: "Professional Camera Lens 85mm",
    price: 449.99,
    originalPrice: 549.99,
    image: "📷",
    rating: 4.9,
    reviews: 67,
    category: "Photography",
    brand: "ProLens",
    inStock: false,
    description: "High-quality 85mm lens for professional portrait photography",
    features: ["85mm focal length", "f/1.4 aperture", "Weather sealed", "Professional grade"]
  },
  {
    id: 5,
    name: "Eco-Friendly Water Bottle",
    price: 19.99,
    originalPrice: 24.99,
    image: "🚰",
    rating: 4.3,
    reviews: 312,
    category: "Lifestyle",
    brand: "EcoLife",
    inStock: true,
    description: "Sustainable water bottle made from recycled materials with temperature control",
    features: ["Made from recycled materials", "Temperature control", "Leak-proof", "BPA-free"]
  },
  {
    id: 6,
    name: "Gaming Mechanical Keyboard RGB",
    price: 129.99,
    originalPrice: 159.99,
    image: "⌨️",
    rating: 4.7,
    reviews: 198,
    category: "Gaming",
    brand: "GameTech",
    inStock: true,
    description: "RGB backlit mechanical keyboard for gaming enthusiasts with custom switches",
    features: ["RGB backlighting", "Mechanical switches", "Programmable keys", "Gaming optimized"]
  },
  {
    id: 7,
    name: "Wireless Charging Pad Fast",
    price: 39.99,
    originalPrice: 49.99,
    image: "🔌",
    rating: 4.4,
    reviews: 142,
    category: "Electronics",
    brand: "ChargeTech",
    inStock: true,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices",
    features: ["Fast charging", "Qi compatible", "LED indicator", "Non-slip design"]
  },
  {
    id: 8,
    name: "Bluetooth Speaker Waterproof",
    price: 59.99,
    originalPrice: 79.99,
    image: "🔊",
    rating: 4.6,
    reviews: 289,
    category: "Electronics",
    brand: "SoundWave",
    inStock: true,
    description: "Portable waterproof Bluetooth speaker with 360-degree sound",
    features: ["Waterproof IPX7", "360-degree sound", "12-hour battery", "Voice assistant"]
  },
  {
    id: 9,
    name: "Yoga Mat Premium Non-Slip",
    price: 34.99,
    originalPrice: 44.99,
    image: "🧘",
    rating: 4.5,
    reviews: 178,
    category: "Fitness",
    brand: "YogaPro",
    inStock: true,
    description: "Premium non-slip yoga mat with alignment lines and carrying strap",
    features: ["Non-slip surface", "Alignment lines", "Eco-friendly", "Carrying strap included"]
  },
  {
    id: 10,
    name: "Smart Home Security Camera",
    price: 89.99,
    originalPrice: 119.99,
    image: "📹",
    rating: 4.7,
    reviews: 203,
    category: "Smart Home",
    brand: "SecureHome",
    inStock: true,
    description: "1080p HD smart security camera with night vision and motion detection",
    features: ["1080p HD video", "Night vision", "Motion detection", "Mobile app control"]
  },
  {
    id: 11,
    name: "Electric Toothbrush Smart",
    price: 79.99,
    originalPrice: 99.99,
    image: "🪥",
    rating: 4.6,
    reviews: 167,
    category: "Health",
    brand: "SmileTech",
    inStock: true,
    description: "Smart electric toothbrush with app connectivity and multiple cleaning modes",
    features: ["App connectivity", "Multiple modes", "2-minute timer", "Pressure sensor"]
  },
  {
    id: 12,
    name: "Portable Power Bank 20000mAh",
    price: 49.99,
    originalPrice: 69.99,
    image: "🔋",
    rating: 4.4,
    reviews: 356,
    category: "Electronics",
    brand: "PowerMax",
    inStock: true,
    description: "High-capacity portable power bank with fast charging and multiple ports",
    features: ["20000mAh capacity", "Fast charging", "Multiple ports", "LED display"]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand?.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};