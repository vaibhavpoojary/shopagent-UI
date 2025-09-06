import { ReactNode } from "react";
import Navigation from "./Navigation";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      
      {/* Floating Chat Button */}
      <Link
        to="/chat"
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-hover text-primary-foreground p-4 rounded-full shadow-float transition-all duration-300 hover:scale-105 z-50"
        aria-label="Open Chat"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default Layout;