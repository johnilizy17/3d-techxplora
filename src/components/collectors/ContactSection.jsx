import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, Sparkles, Loader2 } from "lucide-react";
import { useEmailSubscribeMutation } from "@/redux/api/authApi";
import { toast } from "../ui/use-toast";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef();
  const [emailSubscribe, { isLoading }] = useEmailSubscribeMutation();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await emailSubscribe(email).unwrap();

      toast({
        title: "Email successful",
        description: "Welcome to the Circle! 🚀 Check your inbox soon for updates."
      });
      setEmail("");
    } catch (error) {
      console.error("Newsletter signup error:", error);
      const errorMessage = error?.data?.message || "Oops! We couldn't sign you up right now. Please check your connection.";
      toast({
        title: "Email failed",
        description: errorMessage,
        variant: "destructive"
      });
    }
  };

  return (
    <div
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background to-muted transition-colors duration-300"
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
          <Sparkles className="w-4 h-4 text-[#a6b1ff]" />
          <span className="text-sm text-muted-foreground tracking-widest uppercase font-medium">Community</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight font-['Bricolage_Grotesque']">
          Join the Fun!
        </h2>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Get updates about new quizzes, fun challenges, and cool rewards. 
          Find out about competitions you can join from your school or other sponsors!
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-[#a6b1ff] transition-colors" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="interactive w-full pl-12 pr-36 py-7 glass-morphism border-border text-foreground placeholder:text-muted-foreground rounded-2xl focus:border-[#a6b1ff] focus:ring-2 focus:ring-[#a6b1ff]/50 transition-all text-base"
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="interactive absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-5 bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] hover:scale-105 transition-transform rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Get Updates"
              )}
            </Button>
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground font-medium tracking-wide">
            We won't spam you. You can unsubscribe anytime!
          </p>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-16">
          <button
            onClick={() => window.location.href = "/auth/signup"}
            className="text-sm text-muted-foreground hover:text-[#a6b1ff] transition-colors flex items-center gap-2 group"
          >
            I'm a Student/Teacher
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <div className="w-1 h-1 rounded-full bg-border hidden md:block" />
          <button
            onClick={() => window.location.href = "/auth/signup/?page=3"
            }
            className="text-sm text-muted-foreground hover:text-[#ffb585] transition-colors flex items-center gap-2 group"
          >
            I'm a Sponsor/Partner
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Learners", value: "4,000+" },
            { label: "Partner Schools", value: "40+" },
            { label: "Challenges Played", value: "5K+" }
          ].map((stat, index) => (
            <div key={index} className="glass-morphism rounded-2xl p-8 border border-border group hover:border-[#a6b1ff]/30 transition-all duration-500">
              <div className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-muted-foreground font-medium text-sm tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}