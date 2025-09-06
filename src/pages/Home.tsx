import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, ShoppingBag, Package, HelpCircle, ArrowRight, Zap, Shield, Clock } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "AI-Powered Chat",
      description: "Get instant help with orders, products, and customer service through our intelligent chatbot."
    },
    {
      icon: ShoppingBag,
      title: "Easy Shopping",
      description: "Browse and purchase products seamlessly with our intuitive shopping experience."
    },
    {
      icon: Package,
      title: "Order Tracking",
      description: "Keep track of all your orders in one place with real-time status updates."
    },
    {
      icon: HelpCircle,
      title: "Quick FAQ",
      description: "Find answers to common questions instantly with our comprehensive FAQ section."
    }
  ];

  const benefits = [
    { icon: Zap, text: "Lightning Fast Responses" },
    { icon: Shield, text: "Secure & Reliable" },
    { icon: Clock, text: "24/7 Available" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-light via-background to-secondary-light py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Smart Shopping
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent block">
              Assistant
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Experience the future of e-commerce with our AI-powered chatbot. Shop, track orders, get support - all through intelligent conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary text-primary-foreground">
              <Link to="/chat" className="flex items-center">
                Start Chatting <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  <span>{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines the best of e-commerce with intelligent conversation to create an unmatched shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="bg-primary-light p-3 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers who've made the switch to intelligent shopping.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
            <Link to="/chat" className="flex items-center">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;