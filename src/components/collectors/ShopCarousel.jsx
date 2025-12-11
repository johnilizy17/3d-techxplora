
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Custom Sparkles component as it's not a standard lucide-react icon
const Sparkles = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M11 2a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0V2zM3.464 4.05a1 1 0 0 1 1.414 0l2.121 2.121a1 1 0 0 1-1.414 1.414L3.464 5.464a1 1 0 0 1 0-1.414zm17.072 0a1 1 0 0 1 0 1.414l-2.121 2.121a1 1 0 0 1-1.414-1.414l2.121-2.121a1 1 0 0 1 1.414 0zM18 11a1 1 0 0 1 0 2h3a1 1 0 0 1 0-2h-3zM2 11a1 1 0 0 1 0 2h3a1 1 0 0 1 0-2H2zM4.05 20.536a1 1 0 0 1 0-1.414l2.121-2.121a1 1 0 0 1 1.414 1.414L5.464 20.536a1 1 0 0 1-1.414 0zm17.072 0a1 1 0 0 1-1.414 0l-2.121-2.121a1 1 0 0 1 1.414-1.414l2.121 2.121a1 1 0 0 1 0 1.414zM11 19a1 1 0 0 1 2 0v3a1 1 0 0 1-2 0v-3zM12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
  </svg>
);

export default function ShopCarousel({ products }) {
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      // Adjusted scrollRight check for better boundary detection, accounting for potential partial elements
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5); 
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // Ensure checkScroll runs after layout might have changed
      const resizeObserver = new ResizeObserver(checkScroll);
      resizeObserver.observe(scrollElement);

      scrollElement.addEventListener('scroll', checkScroll);
      return () => {
        scrollElement.removeEventListener('scroll', checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, [products]); // Re-run effect if products change to re-evaluate scroll state

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Increased scroll amount for larger steps
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const displayProducts = products.length > 0 ? products : Array(8).fill({});

  return (
    <div className="relative py-32 px-6 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
      {/* Aurora glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] bg-[#ffb366] rounded-full blur-[200px] opacity-10 transform -translate-x-1/2" />
      </div>

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute breath-float"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Sparkles className="w-3 h-3 text-[#ffb585]/30" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Explore the Shop
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Scroll through our latest arrivals
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              variant="outline"
              size="icon"
              className="interactive glass-morphism border-white/20 hover:border-[#a6b1ff]/50 disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-[#a6b1ff]" />
            </Button>
            <Button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              variant="outline"
              size="icon"
              className="interactive glass-morphism border-white/20 hover:border-[#a6b1ff]/50 disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-[#a6b1ff]" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="interactive flex-shrink-0 w-80 glass-morphism rounded-2xl border border-white/10 overflow-hidden group hover:border-[#a6b1ff]/50 transition-all duration-300 hover:scale-105"
            >
              {/* PRODUCT IMAGE PLACEHOLDER - Replace with actual product photography */}
              <div className="aspect-square bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] flex items-center justify-center overflow-hidden relative">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy" // Added loading="lazy"
                  />
                ) : (
                  /* Popmart-style gradient placeholder */
                  <div className="w-48 h-48 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-2xl breath-float shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/90 rounded-full shadow-inner" />
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#a6b1ff] transition-colors">
                    {product.name || "Collectible Figure"}
                  </h3>
                  {product.category && (
                    <Badge className="glass-morphism text-xs">{product.category}</Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] bg-clip-text text-transparent">
                    ${product.price?.toFixed(2) || "0.00"}
                  </span>
                  <Button 
                    size="icon"
                    className="bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#1a1a1a] hover:scale-110 transition-transform"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
