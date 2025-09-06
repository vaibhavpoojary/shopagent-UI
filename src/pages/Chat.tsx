import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, ShoppingCart, Package, HelpCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  type?: "text" | "product" | "order" | "quick-action";
  data?: any;
}

const Chat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your shopping assistant. I can help you find products, track orders, answer questions, or connect you with a human agent. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
    { icon: User, label: "Talk to Agent", action: "connect-agent" },
  ];

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let botResponse = "";
      let responseType: "text" | "product" | "order" = "text";
      let responseData = null;

      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes("product") || lowerMessage.includes("buy") || lowerMessage.includes("shop")) {
        botResponse = "I found some great products for you! Here are our top recommendations:";
        responseType = "product";
        responseData = {
          products: [
            { id: 1, name: "Wireless Headphones", price: 79.99, rating: 4.5 },
            { id: 2, name: "Smart Watch", price: 199.99, rating: 4.8 },
            { id: 3, name: "Coffee Beans", price: 24.99, rating: 4.6 }
          ]
        };
      } else if (lowerMessage.includes("order") || lowerMessage.includes("track")) {
        botResponse = "Let me check your recent orders:";
        responseType = "order";
        responseData = {
          orders: [
            { id: "ORD-001", status: "Shipped", items: "Wireless Headphones", date: "2024-01-15" },
            { id: "ORD-002", status: "Processing", items: "Smart Watch", date: "2024-01-14" }
          ]
        };
      } else if (lowerMessage.includes("help") || lowerMessage.includes("support")) {
        botResponse = "I'm here to help! I can assist you with:\n\n• Finding and purchasing products\n• Tracking your orders\n• Answering questions about our policies\n• Connecting you with a human agent\n\nWhat specific help do you need?";
      } else if (lowerMessage.includes("agent") || lowerMessage.includes("human")) {
        botResponse = "I'll connect you with a human agent right away. Please hold on while I find an available representative for you.";
        toast({
          title: "Connecting to Agent",
          description: "You'll be connected to a human agent shortly.",
        });
      } else {
        botResponse = "I understand you're asking about: \"" + userMessage + "\". Let me help you with that! Is there something specific you'd like to know about our products, orders, or services?";
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
    }, 1000 + Math.random() * 1000);
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
    
    return (
      <div key={message.id} className={`flex gap-3 ${isBot ? "" : "flex-row-reverse"} mb-4`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        }`}>
          {isBot ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
        </div>
        
        <div className={`flex-1 max-w-xs sm:max-w-md ${isBot ? "" : "flex flex-col items-end"}`}>
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
                  <div key={product.id} className="bg-background rounded-lg p-3 text-foreground">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-primary font-bold">${product.price}</p>
                      </div>
                      <Button size="sm" onClick={() => toast({ title: "Added to cart!", description: product.name })}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {message.type === "order" && message.data?.orders && (
              <div className="mt-3 space-y-2">
                {message.data.orders.map((order: any) => (
                  <div key={order.id} className="bg-background rounded-lg p-3 text-foreground">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{order.id}</span>
                      <Badge variant={order.status === "Shipped" ? "default" : "secondary"}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.items}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
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
        <Card className="h-[70vh] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Chat Assistant
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
            
            {/* Input Area */}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
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