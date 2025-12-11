import React, { useState, useEffect } from "react";
import { Product } from "@/api/entities";
import HeroSection from "../components/collectors/HeroSection";
import FeaturedGallery from "../components/collectors/FeaturedGallery";
import BrandStory from "../components/collectors/BrandStory";
import HowItWorks from "../components/collectors/HowItWorks";
import ShopCarousel from "../components/collectors/ShopCarousel";
import ContactSection from "../components/collectors/ContactSection";
import DeveloperFooter from "../components/collectors/DeveloperFooter";
import AmbientParticles from "../components/collectors/AmbientParticles";

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
    <div className="relative bg-[#0a0a0a] overflow-hidden">
      {/* HERO 3D RENDER PLACEHOLDER - Replace with actual 3D scene or hero image */}
      <HeroSection />

      {/* PRODUCT IMAGE PLACEHOLDERS - Replace with actual product photography */}
      <FeaturedGallery products={products} />

      <HowItWorks />


      <ContactSection />

      {/* Footer with Chloe Hung credit - DO NOT REMOVE */}
      <DeveloperFooter />
    </div>
  );
}