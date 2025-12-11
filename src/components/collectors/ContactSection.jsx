import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div 
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] bg-[#a8d8ff] rounded-full blur-[150px] opacity-20 transition-transform duration-1000 ease-out"
          style={{
            left: `${mousePosition.x * 100}%`,
            top: `${mousePosition.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] bg-[#c9b3ff] rounded-full blur-[150px] opacity-20 transition-transform duration-1000 ease-out delay-100"
          style={{
            left: `${(1 - mousePosition.x) * 100}%`,
            top: `${(1 - mousePosition.y) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="mb-8 inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-[#ffb366]" />
          <span className="text-sm text-gray-300 tracking-wider">Stay Connected</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Join the
          <span className="block mt-2 bg-gradient-to-r from-[#a8d8ff] via-[#c9b3ff] to-[#ffb366] bg-clip-text text-transparent">
            Challenger's Circle
          </span>
        </h2>

        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Be the first to know about new quiz, exclusive drops xp, and rewards
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#a8d8ff] transition-colors" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="interactive w-full pl-12 pr-32 py-6 glass-effect border-white/20 text-white placeholder:text-gray-500 rounded-full focus:border-[#a8d8ff] focus:ring-2 focus:ring-[#a8d8ff]/50 transition-all"
              required
            />
            <Button
              type="submit"
              className="interactive absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#a8d8ff] to-[#c9b3ff] text-[#1a1a1a] hover:scale-105 transition-transform rounded-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Collectors", value: "10K+" },
            { label: "Products", value: "500+" },
            { label: "Countries", value: "50+" }
          ].map((stat, index) => (
            <div key={index} className="glass-effect rounded-2xl p-6 border border-white/10">
              <div className="text-4xl font-bold bg-gradient-to-r from-[#a8d8ff] to-[#c9b3ff] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-light">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}