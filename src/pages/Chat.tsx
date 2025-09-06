import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, ShoppingCart, Package, HelpCircle, Clock, UserCheck, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products, searchProducts } from "@/data/products";
import { orders, getOrderById } from "@/data/orders";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "product" | "order" | "quick-action" | "agent-connect";
  data?: any;
}

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your ShopAgent assistant. I can help you find products, track orders, answer questions, or connect you with a human agent. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isConnectedToAgent, setIsConnectedToAgent] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { icon: ShoppingCart, label: "Browse Products", action: "show-products" },
    { icon: Package, label: "Track Order", action: "track-order" },
    { icon: HelpCircle, label: "Get Help", action: "get-help" },
    { icon: UserCheck, label: "Talk to Agent", action: "connect-agent" },
  ];

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = "";
      let responseType: "text" | "product" | "order" | "agent-connect" = "text";
      let responseData = null;

      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes("product") || lowerMessage.includes("buy") || lowerMessage.includes("shop") || lowerMessage.includes("find")) {
        if (lowerMessage.includes("headphone") || lowerMessage.includes("audio")) {
          const audioProducts = products.filter(p => p.category === "Electronics" && p.name.toLowerCase().includes("headphone"));
          botResponse = "I found some great headphones for you! Here are our top recommendations:";
          responseType = "product";
          responseData = { products: audioProducts.slice(0, 3) };
        } else if (lowerMessage.includes("watch") || lowerMessage.includes("fitness")) {
          const watchProducts = products.filter(p => p.category === "Wearables" || p.category === "Fitness");
          botResponse = "Here are some excellent fitness watches and equipment:";
          responseType = "product";
          responseData = { products: watchProducts.slice(0, 3) };
        } else {
          botResponse = "I found some great products for you! Here are our top recommendations:";
          responseType = "product";
          responseData = { products: products.slice(0, 4) };
        }
      } else if (lowerMessage.includes("order") || lowerMessage.includes("track")) {
        if (lowerMessage.includes("ord-") || lowerMessage.includes("trk")) {
          // Try to extract order ID
          const orderMatch = lowerMessage.match(/ord-\d{4}-\d{3}/i);
          if (orderMatch) {
            const foundOrder = getOrderById(orderMatch[0].toUpperCase());
            if (foundOrder) {
              botResponse = `I found your order! Here are the details:`;
              responseType = "order";
              responseData = { orders: [foundOrder] };
            } else {
              botResponse = "I couldn't find that specific order. Here are your recent orders:";
              responseType = "order";
              responseData = { orders: orders.slice(0, 3) };
            }
          } else {
            botResponse = "Here are your recent orders:";
            responseType = "order";
            responseData = { orders: orders.slice(0, 3) };
          }
        } else {
          botResponse = "Let me check your recent orders:";
          responseType = "order";
          responseData = { orders: orders.slice(0, 4) };
        }
      } else if (lowerMessage.includes("help") || lowerMessage.includes("support") || lowerMessage.includes("question")) {
        botResponse = "I'm here to help! I can assist you with:\n\n🛍️ Finding and purchasing products\n📦 Tracking your orders and shipments\n❓ Answering questions about policies and services\n👤 Connecting you with a human agent\n💳 Payment and billing inquiries\n🔄 Returns and exchanges\n\nWhat specific help do you need?";
      } else if (lowerMessage.includes("agent") || lowerMessage.includes("human") || lowerMessage.includes("representative")) {
        botResponse = "I'll connect you with one of our human agents right away. Please hold on while I find an available representative for you.";
        responseType = "agent-connect";
        
        // Simulate agent connection
        setTimeout(() => {
          setIsConnectedToAgent(true);
          const agentMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: "Hi! This is Sarah from ShopAgent customer support. I see you were chatting with our AI assistant. How can I help you today?",
            sender: "bot",
            timestamp: new Date(),
            type: "agent-connect"
          };
          setMessages(prev => [...prev, agentMessage]);
        }, 3000);
        
        toast({
          title: "Connecting to Agent",
          description: "You'll be connected to a human agent shortly.",
        });
      } else if (lowerMessage.includes("return") || lowerMessage.includes("refund") || lowerMessage.includes("exchange")) {
        botResponse = "I can help you with returns and refunds! Our return policy allows:\n\n✅ 30-day return window\n✅ Items in original condition\n✅ Free return shipping\n✅ Full refund or exchange\n\nDo you have a specific order you'd like to return? Please provide your order number (ORD-XXXX-XXX) and I'll help you start the process.";
      } else if (lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
        botResponse = "Here's our shipping information:\n\n🚚 **Shipping Options:**\n• Standard (5-7 days) - FREE on orders $50+\n• Express (2-3 days) - $9.99\n• Overnight (1 day) - $19.99\n\n🌍 We ship worldwide!\n📍 Track packages in real-time\n📦 Secure packaging guaranteed\n\nNeed help with a specific shipment?";
      } else if (lowerMessage.includes("payment") || lowerMessage.includes("billing") || lowerMessage.includes("card")) {
        botResponse = "I can help with payment questions! We accept:\n\n💳 All major credit cards\n🟦 PayPal\n📱 Apple Pay & Google Pay\n🔒 100% secure checkout\n\nIf you're having payment issues or need to update billing information, I can connect you with our billing specialist. What specific payment help do you need?";
      } else {
        botResponse = `I understand you're asking about: "${userMessage}". Let me help you with that! \n\nI can assist with:\n• Product searches and recommendations\n• Order tracking and status updates\n• Returns, exchanges, and refunds\n• Shipping information\n• Account questions\n• Technical support\n\nWhat would you like to know more about?`;
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
        type: responseType,
        data: responseData
      };

      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1500);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(inputValue);
    setInputValue("");
  };

  const handleQuickAction = (action: string, label: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: label,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    simulateBotResponse(label);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessage = (message: Message) => {
    const isBot = message.sender === "bot";
    const isAgentMessage = message.type === "agent-connect" && isBot;
    
    return (
      <div key={message.id} className={`flex gap-3 ${isBot ? "" : "flex-row-reverse"} mb-4`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAgentMessage
            ? "bg-success text-success-foreground"
            : isBot 
              ? "bg-primary text-primary-foreground" 
              : "bg-secondary text-secondary-foreground"
        }`}>
          {isAgentMessage ? (
            <Headphones className="h-4 w-4" />
          ) : isBot ? (
            <Bot className="h-4 w-4" />
          ) : (
            <User className="h-4 w-4" />
          )}
        </div>
        
        <div className={`flex-1 max-w-xs sm:max-w-md ${isBot ? "" : "flex flex-col items-end"}`}>
          {isAgentMessage && (
            <div className="mb-1">
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success">
                Human Agent - Sarah
              </Badge>
            </div>
          )}
          
          <div className={`rounded-2xl px-4 py-2 ${
            isBot 
              ? "bg-chat-bot text-chat-bot-foreground" 
              : "bg-chat-user text-chat-user-foreground"
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            
            {/* Render special content based on message type */}
            {message.type === "product" && message.data?.products && (
              <div className="mt-3 space-y-2">
                {message.data.products.map((product: any) => (
                  <div key={product.id} className="bg-background rounded-lg p-3 text-foreground border">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{product.image}</div>
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">{product.name}</p>
                        {product.brand && (
                          <p className="text-xs text-muted-foreground mb-1">by {product.brand}</p>
                        )}
                        <div className="flex items-center gap-2">
                          <p className="text-primary font-bold">${product.price}</p>
                          {product.originalPrice && product.originalPrice > product.price && (
                            <p className="text-xs text-muted-foreground line-through">
                              ${product.originalPrice}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs">⭐</span>
                          <span className="text-xs text-muted-foreground">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => toast({ 
                          title: "Added to cart!", 
                          description: product.name 
                        })}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {message.type === "order" && message.data?.orders && (
              <div className="mt-3 space-y-2">
                {message.data.orders.map((order: any) => (
                  <div key={order.id} className="bg-background rounded-lg p-3 text-foreground border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium text-sm">{order.id}</span>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        order.status === "delivered" ? "default" :
                        order.status === "shipped" ? "secondary" :  
                        order.status === "cancelled" ? "destructive" : "outline"
                      }>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {order.items.length} item(s) - ${order.total}
                    </p>
                    {order.tracking && (
                      <p className="text-xs text-muted-foreground font-mono">
                        Tracking: {order.tracking}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="h-[75vh] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              {isConnectedToAgent ? (
                <>
                  <Headphones className="h-5 w-5 text-success" />
                  Connected to Agent
                  <Badge variant="outline" className="ml-2 bg-success/10 text-success border-success">
                    Live
                  </Badge>
                </>
              ) : (
                <>
                  <Bot className="h-5 w-5 text-primary" />
                  ShopAgent Assistant
                </>
              )}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto mb-4 pr-2">
              {messages.map(renderMessage)}
              
              {isTyping && (
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-chat-bot text-chat-bot-foreground rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Quick Actions */}
            {!isConnectedToAgent && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.action}
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 text-xs"
                      onClick={() => handleQuickAction(action.action, action.label)}
                    >
                      <Icon className="h-3 w-3" />
                      {action.label}
                    </Button>
                  );
                })}
              </div>
            )}
            
            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isConnectedToAgent ? "Type your message to the agent..." : "Type your message..."}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;