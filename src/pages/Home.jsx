import React, { useState, useEffect } from "react";
import { Product } from "@/api/entities";
import HeroSection from "../components/collectors/HeroSection";
import FeaturedGallery from "../components/collectors/FeaturedGallery";
import BrandStory from "../components/collectors/BrandStory";
import HowItWorks from "../components/collectors/HowItWorks";
import ShopCarousel from "../components/collectors/ShopCarousel";
import ContactSection from "../components/collectors/ContactSection";
import DeveloperFooter from "../components/collectors/DeveloperFooter";
import CustomCursor from "../components/collectors/CustomCursor";
import ScrollProgress from "../components/collectors/ScrollProgress";
import AmbientParticles from "../components/collectors/AmbientParticles";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    loadProducts();
    
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(currentScroll / totalScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadProducts = async () => {
    const data = await Product.list('-created_date', 20);
    setProducts(data);
  };

  return (
    <div className="relative bg-[#0a0a0a] overflow-hidden">
      <CustomCursor />
      <ScrollProgress progress={scrollProgress} />
      <AmbientParticles />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Bricolage Grotesque', sans-serif;
        }
        
        body {
          background: #0a0a0a;
          overflow-x: hidden;
        }
        
        @supports (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a6b1ff 0%, #c7aff8 50%, #ffb585 100%);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #b8c0ff 0%, #d6bfff 50%, #ffc599 100%);
        }
        
        .glass-morphism {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 
            inset 0 1px 1px rgba(255, 255, 255, 0.1),
            0 8px 32px rgba(0, 0, 0, 0.3);
        }
        
        .glass-morphism-strong {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            inset 0 1px 2px rgba(255, 255, 255, 0.15),
            0 12px 40px rgba(0, 0, 0, 0.4);
        }
        
        .aurora-glow {
          background: radial-gradient(ellipse at center, rgba(166, 177, 255, 0.15) 0%, transparent 60%);
        }
        
        .gradient-text-shine {
          background: linear-gradient(
            135deg,
            #c7aff8 0%,
            #a6b1ff 25%,
            #ffb585 50%,
            #a6b1ff 75%,
            #c7aff8 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 8s ease-in-out infinite;
        }
        
        @keyframes shine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .magnetic-hover {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .spring-bounce {
          transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .breath-float {
          animation: breathFloat 4s ease-in-out infinite;
        }
        
        @keyframes breathFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
        }
        
        .glow-pulse {
          animation: glowPulse 3s ease-in-out infinite;
        }
        
        @keyframes glowPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(166, 177, 255, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(199, 175, 248, 0.6);
          }
        }
        
        .halo-click {
          position: relative;
        }
        
        .halo-click::after {
          content: '';
          position: absolute;
          inset: -20px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(166, 177, 255, 0.4) 0%, transparent 70%);
          opacity: 0;
          pointer-events: none;
        }
        
        .halo-click:active::after {
          animation: haloExpand 0.6s ease-out;
        }
        
        @keyframes haloExpand {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.5); }
        }
      `}</style>

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