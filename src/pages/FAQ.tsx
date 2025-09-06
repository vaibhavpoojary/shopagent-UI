import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, HelpCircle, ShoppingBag, Package, CreditCard, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqCategories = [
    {
      title: "Shopping & Products",
      icon: ShoppingBag,
      color: "text-primary",
      faqs: [
        {
          question: "How do I place an order?",
          answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You can also use our chat assistant to help you find and purchase products through conversation."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "You can modify or cancel your order within 1 hour of placement if it hasn't been processed yet. Contact our chat assistant or customer service for immediate assistance."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets like Apple Pay and Google Pay."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Yes, we ship internationally to most countries. Shipping costs and delivery times vary by location. Check our shipping calculator at checkout for exact details."
        }
      ]
    },
    {
      title: "Orders & Shipping",
      icon: Package,
      color: "text-secondary",
      faqs: [
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your orders in the 'Orders' section of your account or ask our chat assistant for updates."
        },
        {
          question: "What are your shipping options?",
          answer: "We offer standard shipping (5-7 business days), expedited shipping (2-3 business days), and overnight shipping. Free standard shipping is available on orders over $50."
        },
        {
          question: "My package was damaged during shipping. What do I do?",
          answer: "We're sorry to hear that! Please contact our chat assistant immediately with photos of the damaged item and packaging. We'll arrange a replacement or full refund right away."
        },
        {
          question: "Can I change my shipping address after placing an order?",
          answer: "Address changes are possible if your order hasn't been processed yet (usually within 1 hour). Contact our chat assistant immediately for assistance."
        }
      ]
    },
    {
      title: "Account & Support",
      icon: Shield,
      color: "text-success",
      faqs: [
        {
          question: "How do I create an account?",
          answer: "You can create an account during checkout or by clicking the 'Sign Up' button. You can also ask our chat assistant to help guide you through the process."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link within a few minutes."
        },
        {
          question: "How do I contact customer service?",
          answer: "Our chat assistant is available 24/7 and can handle most questions instantly. For complex issues, the chat assistant can connect you with a human agent during business hours (9 AM - 6 PM EST)."
        },
        {
          question: "Is my personal information secure?",
          answer: "Absolutely! We use industry-standard encryption and security measures to protect your personal and payment information. We never share your data with third parties without your consent."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      icon: CreditCard,
      color: "text-warning",
      faqs: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for most items. Items must be unused and in original packaging. Some restrictions apply to certain categories like electronics and perishables."
        },
        {
          question: "How do I return an item?",
          answer: "Start a return through your account or ask our chat assistant to help. We'll provide a prepaid return label for eligible items."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned item. You'll receive an email confirmation when the refund is processed."
        },
        {
          question: "Can I exchange an item instead of returning it?",
          answer: "Yes! We offer exchanges for different sizes, colors, or similar products. Our chat assistant can help you process an exchange quickly."
        }
      ]
    }
  ];

  const allFaqs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({
      ...faq,
      category: category.title,
      categoryIcon: category.icon,
      categoryColor: category.color
    }))
  );

  const filteredFaqs = searchQuery.trim() 
    ? allFaqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const shouldShowCategories = !searchQuery.trim();
  const shouldShowSearchResults = searchQuery.trim() && filteredFaqs.length > 0;
  const shouldShowNoResults = searchQuery.trim() && filteredFaqs.length === 0;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find answers to common questions or chat with our AI assistant for instant help
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Chat CTA */}
          <div className="bg-gradient-to-r from-primary-light to-secondary-light p-6 rounded-xl">
            <div className="flex items-center justify-center gap-3 mb-3">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Can't find what you're looking for?
              </h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Our AI assistant is available 24/7 and can answer questions, help with orders, and connect you with human agents.
            </p>
            <Button asChild className="bg-gradient-to-r from-primary to-primary-hover">
              <Link to="/chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat with Assistant
              </Link>
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {shouldShowSearchResults && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Search Results ({filteredFaqs.length})
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqs.map((faq, index) => {
                const CategoryIcon = faq.categoryIcon;
                return (
                  <AccordionItem key={index} value={`search-${index}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="text-left hover:no-underline">
                      <div className="flex items-start gap-3">
                        <CategoryIcon className={`h-5 w-5 mt-0.5 ${faq.categoryColor}`} />
                        <div>
                          <p className="font-medium">{faq.question}</p>
                          <p className="text-sm text-muted-foreground mt-1">{faq.category}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground ml-8">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}

        {/* No Results */}
        {shouldShowNoResults && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No results found
            </h3>
            <p className="text-muted-foreground mb-6">
              Try different keywords or ask our chat assistant for help
            </p>
            <Button asChild variant="outline">
              <Link to="/chat">Ask Chat Assistant</Link>
            </Button>
          </div>
        )}

        {/* Categories */}
        {shouldShowCategories && (
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <Card key={categoryIndex} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <CategoryIcon className={`h-6 w-6 ${category.color}`} />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="space-y-2">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem 
                          key={faqIndex} 
                          value={`${categoryIndex}-${faqIndex}`}
                          className="border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex items-center gap-3">
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground ml-7">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;