import { useState, useEffect } from "react";
import { Product } from "@/api/entities";
import FeaturedGallery from "../components/collectors/FeaturedGallery";
import HowItWorks from "../components/collectors/HowItWorks";
import FAQ from "../components/collectors/FAQ";
import HeroSection from "../components/collectors/HeroSection";
import ContactSection from "../components/collectors/ContactSection";
import DeveloperFooter from "../components/collectors/DeveloperFooter";
import CountUpStats from "../components/collectors/CountUpStats";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const data = await Product.list('-created_date', 20);
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show minimal loading state to prevent white screen
  if (isLoading) {
    return (
      <div className="relative bg-background overflow-hidden transition-colors duration-300 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a6b1ff] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-background overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />

      {/* Count Up Stats Section */}
      <CountUpStats />

      <HowItWorks />

      <FAQ />

      <ContactSection />

      {/* Footer with Chloe Hung credit - DO NOT REMOVE */}
      <DeveloperFooter />
    </div>
  );
}