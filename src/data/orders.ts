export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  tracking?: string;
  estimatedDelivery?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
}

export const orders: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 159.98,
    items: [
      { productId: 1, name: "Wireless Bluetooth Headphones Pro", quantity: 1, price: 79.99, image: "🎧" },
      { productId: 3, name: "Organic Coffee Beans Premium", quantity: 2, price: 24.99, image: "☕" },
      { productId: 9, name: "Yoga Mat Premium Non-Slip", quantity: 1, price: 34.99, image: "🧘" }
    ],
    tracking: "TRK123456789",
    estimatedDelivery: "2024-01-18",
    shippingAddress: {
      name: "John Smith",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA"
    },
    paymentMethod: "Credit Card ending in 4242"
  },
  {
    id: "ORD-2024-002", 
    date: "2024-01-14",
    status: "shipped",
    total: 289.98,
    items: [
      { productId: 2, name: "Smart Fitness Watch Ultra", quantity: 1, price: 199.99, image: "⌚" },
      { productId: 8, name: "Bluetooth Speaker Waterproof", quantity: 1, price: 59.99, image: "🔊" },
      { productId: 5, name: "Eco-Friendly Water Bottle", quantity: 1, price: 19.99, image: "🚰" }
    ],
    tracking: "TRK987654321",
    estimatedDelivery: "2024-01-17",
    shippingAddress: {
      name: "Sarah Johnson",
      street: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zip: "90210",
      country: "USA"
    },
    paymentMethod: "PayPal"
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-13", 
    status: "confirmed",
    total: 179.97,
    items: [
      { productId: 6, name: "Gaming Mechanical Keyboard RGB", quantity: 1, price: 129.99, image: "⌨️" },
      { productId: 12, name: "Portable Power Bank 20000mAh", quantity: 1, price: 49.99, image: "🔋" }
    ],
    tracking: "TRK456789123",
    estimatedDelivery: "2024-01-20",
    shippingAddress: {
      name: "Mike Chen",
      street: "789 Pine Road",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      country: "USA"
    },
    paymentMethod: "Credit Card ending in 9876"
  },
  {
    id: "ORD-2024-004",
    date: "2024-01-12",
    status: "processing",
    total: 169.98,
    items: [
      { productId: 10, name: "Smart Home Security Camera", quantity: 1, price: 89.99, image: "📹" },
      { productId: 11, name: "Electric Toothbrush Smart", quantity: 1, price: 79.99, image: "🪥" }
    ],
    tracking: null,
    estimatedDelivery: "2024-01-22",
    shippingAddress: {
      name: "Lisa Brown",
      street: "321 Elm Street",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      country: "USA"
    },
    paymentMethod: "Apple Pay"
  },
  {
    id: "ORD-2024-005",
    date: "2024-01-10",
    status: "cancelled",
    total: 449.99,
    items: [
      { productId: 4, name: "Professional Camera Lens 85mm", quantity: 1, price: 449.99, image: "📷" }
    ],
    tracking: null,
    estimatedDelivery: null,
    shippingAddress: {
      name: "David Wilson",
      street: "654 Maple Drive",
      city: "Austin",
      state: "TX",
      zip: "73301",
      country: "USA"
    },
    paymentMethod: "Credit Card ending in 1234"
  },
  {
    id: "ORD-2024-006",
    date: "2024-01-08",
    status: "delivered",
    total: 99.98,
    items: [
      { productId: 7, name: "Wireless Charging Pad Fast", quantity: 2, price: 39.99, image: "🔌" },
      { productId: 5, name: "Eco-Friendly Water Bottle", quantity: 1, price: 19.99, image: "🚰" }
    ],
    tracking: "TRK789123456",
    estimatedDelivery: "2024-01-11",
    shippingAddress: {
      name: "Emily Davis",
      street: "987 Cedar Lane",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "USA"
    },
    paymentMethod: "Google Pay"
  }
];

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: string): Order[] => {
  return orders.filter(order => order.status === status);
};