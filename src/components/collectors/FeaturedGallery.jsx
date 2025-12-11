import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ShoppingCart, X, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CollectiblePlaceholder from "./CollectiblePlaceholder";

function ProductCard({ product, index, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // 3D tilt (max 6-8°)
    setTilt({ x: y * 8, y: -x * 8 });
    
    // Magnetic hover (follow cursor a few px)
    setMagneticOffset({ 
      x: x * 12,
      y: y * 12
    });
  };

  const handleMouseLeave = () => {
    // Spring easing on release
    setTilt({ x: 0, y: 0 });
    setMagneticOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const rarityColors = {
    Common: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    Rare: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Ultra Rare": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    Legendary: "bg-amber-500/20 text-amber-300 border-amber-500/30"
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <Card
        className="interactive group relative overflow-hidden glass-morphism-strong border-white/10 cursor-pointer transition-all duration-500 hover:border-[#a6b1ff]/50 hover:shadow-[0_12px_40px_rgba(166,177,255,0.25)]"
        style={{
          transform: `
            perspective(1000px) 
            rotateX(${tilt.x}deg) 
            rotateY(${tilt.y}deg)
            translate(${magneticOffset.x}px, ${magneticOffset.y}px)
          `,
          transition: isHovered 
            ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' 
            : 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={() => onSelect(product)}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#a6b1ff]/10 via-transparent to-[#c7aff8]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Spotlight sweep effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1500"
            style={{ width: '50%' }}
          />
        </div>

        <div className="relative p-6">
          {/* PRODUCT IMAGE PLACEHOLDER - Replace with actual product photography */}
          <div className="aspect-square mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1520] to-[#0a0a0a] flex items-center justify-center relative">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={`${product.name || "Collectible Figure"}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="w-32 h-32 bg-gradient-to-br from-[#a6b1ff] to-[#c7aff8] rounded-lg animate-pulse" />
            )}
            
            {/* Quick-view overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 gap-3">
              <Button 
                size="icon"
                className="glass-morphism border-white/30 hover:bg-[#a6b1ff]/20 hover:border-[#a6b1ff]/50 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(product);
                }}
              >
                <Eye className="w-5 h-5 text-white" />
              </Button>
              <Button 
                size="icon"
                className="glass-morphism border-white/30 hover:bg-[#c7aff8]/20 hover:border-[#c7aff8]/50 transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ShoppingCart className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-semibold text-white group-hover:gradient-text-shine transition-all duration-500">
                {product.name || "Collectible Figure"}
              </h3>
              {product.rarity && (
                <Badge className={`${rarityColors[product.rarity]} border shrink-0`}>
                  {product.rarity}
                </Badge>
              )}
            </div>

            <p className="text-sm text-gray-400/90 line-clamp-2 leading-relaxed">
              {product.description || "Premium collectible figure from our exclusive collection"}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-2xl font-bold gradient-text-shine">
                ${product.price?.toFixed(2) || "0.00"}
              </span>
              <Badge 
                variant={product.in_stock ? "default" : "secondary"} 
                className="glass-morphism border-white/20"
              >
                {product.in_stock ? "In Stock" : "Sold Out"}
              </Badge>
            </div>
          </div>

          {/* Corner sparkle */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-12">
            <Sparkles className="w-5 h-5 text-[#ffb585]" />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function FeaturedGallery({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div 
        ref={sectionRef}
        className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#12091a] to-[#0a0a0a] overflow-hidden"
      >
        {/* Aurora glow effect */}
        <div className="absolute inset-0 aurora-glow opacity-30" />

        {/* Ambient sparkle particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section header with animation */}
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="mb-6 inline-flex items-center gap-2 glass-morphism px-5 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-[#ffb585]" />
              <span className="text-sm text-gray-300 tracking-[0.15em] uppercase font-medium">Avarta Selection</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text-shine">
              Featured Collection
            </h2>
            <p className="text-xl text-gray-400/90 max-w-2xl mx-auto font-light leading-relaxed">
         Select your agent to increase your experience
            </p>
          </div>

          {/* Popmart-style placeholder showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {[0, 1, 2].map((i) => (
              <CollectiblePlaceholder
                key={i}
                index={i}
                name={i === 0?"Dewode": i === 1? "Grace":"Fola"}
                size="default"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick-view dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="glass-morphism-strong border-white/20 text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold gradient-text-shine">
              {selectedProduct?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1520] to-[#0a0a0a] flex items-center justify-center">
                {selectedProduct.image_url ? (
                  <img 
                    src={selectedProduct.image_url} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gradient-to-br from-[#a6b1ff] to-[#c7aff8] rounded-lg" />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  {selectedProduct.rarity && (
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                      {selectedProduct.rarity}
                    </Badge>
                  )}
                  {selectedProduct.category && (
                    <Badge className="glass-morphism border-white/20">{selectedProduct.category}</Badge>
                  )}
                </div>

                <p className="text-gray-300/90 leading-relaxed text-lg">
                  {selectedProduct.description || "Premium collectible figure from our exclusive collection. Each piece is crafted with meticulous attention to detail and comes with a certificate of authenticity."}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <span className="text-4xl font-bold gradient-text-shine">
                    ${selectedProduct.price?.toFixed(2)}
                  </span>
                  <Button 
                    className="halo-click bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] hover:scale-105 hover:shadow-[0_0_30px_rgba(166,177,255,0.5)] transition-all duration-300"
                    disabled={!selectedProduct.in_stock}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {selectedProduct.in_stock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}