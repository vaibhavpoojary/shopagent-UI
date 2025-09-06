import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Truck, CheckCircle, Clock, AlertCircle, Eye } from "lucide-react";

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample orders data
  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 79.99,
      items: [
        { name: "Wireless Bluetooth Headphones", quantity: 1, price: 79.99, image: "🎧" }
      ],
      tracking: "TRK123456789",
      estimatedDelivery: "2024-01-18"
    },
    {
      id: "ORD-2024-002", 
      date: "2024-01-14",
      status: "shipped",
      total: 199.99,
      items: [
        { name: "Smart Fitness Watch", quantity: 1, price: 199.99, image: "⌚" }
      ],
      tracking: "TRK987654321",
      estimatedDelivery: "2024-01-17"
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-13", 
      status: "processing",
      total: 44.98,
      items: [
        { name: "Organic Coffee Beans", quantity: 2, price: 24.99, image: "☕" }
      ],
      tracking: null,
      estimatedDelivery: "2024-01-20"
    },
    {
      id: "ORD-2024-004",
      date: "2024-01-10",
      status: "cancelled",
      total: 449.99,
      items: [
        { name: "Professional Camera Lens", quantity: 1, price: 449.99, image: "📷" }
      ],
      tracking: null,
      estimatedDelivery: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      case "cancelled": return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "success";
      case "shipped": return "default";
      case "processing": return "secondary";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Orders
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Track and manage all your orders in one place
          </p>
          
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Package className="h-5 w-5 text-primary" />
                      {order.id}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(order.status) as any} className="flex items-center gap-1">
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${order.total}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl">{item.image}</div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity} × ${item.price}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Order Details */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                  <div className="flex-1 space-y-2">
                    {order.tracking && (
                      <div>
                        <p className="text-sm font-medium text-foreground">Tracking Number</p>
                        <p className="text-sm text-muted-foreground font-mono">{order.tracking}</p>
                      </div>
                    )}
                    
                    {order.estimatedDelivery && order.status !== "cancelled" && (
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {order.status === "delivered" ? "Delivered" : "Estimated Delivery"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                    
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                    
                    {order.tracking && order.status === "shipped" && (
                      <Button size="sm" className="bg-gradient-to-r from-primary to-primary-hover">
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {searchQuery ? "No orders found" : "No orders yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? "Try adjusting your search criteria"
                : "Start shopping to see your orders here"
              }
            </p>
            {!searchQuery && (
              <Button asChild className="bg-gradient-to-r from-primary to-primary-hover">
                <a href="/shop">Start Shopping</a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;