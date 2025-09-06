import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Truck, CheckCircle, Clock, AlertCircle, Eye, MapPin, CreditCard } from "lucide-react";
import { orders } from "@/data/orders";
import { useToast } from "@/hooks/use-toast";

const Orders = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleTrackOrder = (tracking: string) => {
    toast({
      title: "Tracking Order",
      description: `Opening tracking details for ${tracking}`,
    });
  };

  const handleViewDetails = (orderId: string) => {
    toast({
      title: "Order Details",
      description: `Viewing details for order ${orderId}`,
    });
  };

  const handleReorder = (orderId: string) => {
    toast({
      title: "Reordering Items",
      description: `Adding items from order ${orderId} to cart`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />;
      case "shipped": return <Truck className="h-4 w-4" />;
      case "confirmed": return <Package className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      case "cancelled": return <AlertCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "success";
      case "shipped": return "default";
      case "confirmed": return "secondary";
      case "processing": return "secondary";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="space-y-3">
                    {/* Shipping Address */}
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Shipping Address</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">Payment Method</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {order.tracking && (
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <p className="text-sm font-medium text-foreground mb-1">Tracking Number</p>
                        <p className="text-sm text-muted-foreground font-mono">{order.tracking}</p>
                      </div>
                    )}
                    
                    {order.estimatedDelivery && order.status !== "cancelled" && (
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <p className="text-sm font-medium text-foreground mb-1">
                          {order.status === "delivered" ? "Delivered On" : "Estimated Delivery"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.estimatedDelivery).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => handleViewDetails(order.id)}
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                  
                  {order.status === "delivered" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReorder(order.id)}
                    >
                      Reorder
                    </Button>
                  )}
                  
                  {order.tracking && (order.status === "shipped" || order.status === "confirmed") && (
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-primary-hover"
                      onClick={() => handleTrackOrder(order.tracking!)}
                    >
                      Track Package
                    </Button>
                  )}
                  
                  {order.status === "processing" && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => toast({
                        title: "Cancel Order",
                        description: `Cancelling order ${order.id}`,
                      })}
                    >
                      Cancel Order
                    </Button>
                  )}
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