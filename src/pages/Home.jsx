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

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await Product.list('-created_date', 20);
    setProducts(data);
  };

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