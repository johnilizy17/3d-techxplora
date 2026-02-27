import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles, GraduationCap, Users, Handshake, Building, PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import VisualBackground from "./VisualBackground";

const ModalCard = ({ icon: Icon, title, description, to, onClick }) => {
  const CardContent = (
    <div className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:bg-accent hover:border-[#a6b1ff]/30 transition-all duration-300 cursor-pointer">
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#a6b1ff]/20 to-[#c7aff8]/20 flex items-center justify-center border border-[#a6b1ff]/20 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-[#a6b1ff]" />
      </div>
      <div className="text-left">
        <h3 className="text-lg font-bold text-foreground group-hover:text-[#a6b1ff] transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground leading-snug">{description}</p>
      </div>
    </div>
  );

  if (to) return <Link to={to} onClick={onClick}>{CardContent}</Link>;
  return <div onClick={onClick}>{CardContent}</div>;
};

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isStudentTeacherOpen, setIsStudentTeacherOpen] = useState(false);
  const [isSponsorPartnerOpen, setIsSponsorPartnerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen sm:h-screen w-full overflow-hidden bg-background transition-colors duration-300">
      {/* Aurora gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background" />

      {/* Optimized Visual Background */}
      <div className="absolute inset-0 z-[2]">
        <VisualBackground />
      </div>

      {/* Gradient overlay for depth - Moved behind content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none z-[5]" />

      {/* Hero content with parallax */}
      <div
        className="relative z-20 min-h-[800px] flex flex-col items-center justify-center text-center px-6 pt-32 md:pt-20 pb-20"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          opacity: Math.max(0, 1 - scrollY / 500),
        }}
      >
        {/* Premium badge */}
        <div className="mb-8 inline-flex items-center gap-2 glass-morphism px-6 py-3 rounded-full animate-in fade-in slide-in-from-top duration-700">
          <Sparkles className="w-4 h-4 text-[#a6b1ff]" />
          <span className="text-sm text-muted-foreground tracking-[0.2em] uppercase font-medium">Learn Faster</span>
        </div>

        {/* Main headline with gradient shine */}
        <h1 className="text-2xl md:text-2xl lg:text-3xl font-bold mb-8 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom duration-1000">
          <span className="gradient-text-shine block mb-2">
            Learning Made Fun!<br />
            Play, Learn, and Win Rewards
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-sm md:text-1xl text-muted-foreground/90 mb-14 max-w-3xl font-light tracking-wide leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          TechXplora turns learning into a fun game! Answer quiz questions, earn points, 
          and see how you're doing. Teachers and schools can create fun challenges for you to join.
        </p>

        {/* CTA with halo effect */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full md:w-auto px-4">
          <div className="flex flex-col items-center gap-3 space-y-2">
            <Button
              onClick={() => setIsStudentTeacherOpen(true)}
              className="interactive halo-click relative w-full md:w-80 px-10 py-8 text-xl font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_6px_0_#8b95cc] active:shadow-none active:translate-y-[6px]"
            >
              <span className="relative z-10 tracking-wide">Start as Student / Teacher</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Button>
            <p className="text-gray-400 text-sm font-medium tracking-wide animate-in fade-in slide-in-from-top-2 duration-1000 delay-300">
              Play quizzes, earn points, and see your progress!
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 space-y-2">
            <Button
              onClick={() => setIsSponsorPartnerOpen(true)}
              className="interactive halo-click relative w-full md:w-80 px-10 py-8 text-xl font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_6px_0_#8b95cc] active:shadow-none active:translate-y-[6px]"
            >
              <span className="relative z-10 tracking-wide">Sponsor a Challenge</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Button>
            <p className="text-gray-400 text-sm font-medium tracking-wide animate-in fade-in slide-in-from-top-2 duration-1000 delay-300">
              Create fun challenges and help students learn!
            </p>
          </div>
        </div>

        {/* Third CTA: Lightweight link */}
        <div className="mt-12 animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
          <button
            className="flex items-center gap-2 text-[#a6b1ff] hover:text-[#c7aff8] font-medium transition-colors group"
            onClick={() => navigate('/how-to-use')}
          >
            <PlayCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="border-b border-[#a6b1ff]/30 group-hover:border-[#c7aff8]">Watch a quick video (1 minute)</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#a6b1ff] drop-shadow-[0_0_12px_rgba(166,177,255,0.6)]" />
        </div>
      </div>

      {/* Student/Teacher Modal */}
      <Dialog open={isStudentTeacherOpen} onOpenChange={setIsStudentTeacherOpen}>
        <DialogContent className="max-w-md bg-card backdrop-blur-2xl border-border rounded-3xl p-8 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center text-foreground">Join as...</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <ModalCard
              icon={GraduationCap}
              title="I'm a Student"
              description="Play quizzes and earn rewards!"
              to="/auth/signup"
              onClick={() => setIsStudentTeacherOpen(false)}
            />
            <ModalCard
              icon={Users}
              title="I'm a Teacher"
              description="Create quizzes and see how students do"
              to="/auth/group"
              onClick={() => setIsStudentTeacherOpen(false)}
            />
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsStudentTeacherOpen(false)}
              className="text-foreground hover:text-muted-foreground transition-colors text-sm font-semibold tracking-wide uppercase"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sponsor/Partner Modal */}
      <Dialog open={isSponsorPartnerOpen} onOpenChange={setIsSponsorPartnerOpen}>
        <DialogContent className="max-w-md bg-card backdrop-blur-2xl border-border rounded-3xl p-8 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-center text-foreground">Partner with us...</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <ModalCard
              icon={Handshake}
              title="School Admin"
              description="Help your school with fun learning challenges"
              to="/auth/signup/?page=3"
              onClick={() => setIsSponsorPartnerOpen(false)}
            />
            <ModalCard
              icon={Building}
              title="Partner/Sponsor"
              description="Work with us to help students learn"
              to="/auth/signup/?page=3"
              onClick={() => setIsSponsorPartnerOpen(false)}
            />
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setIsSponsorPartnerOpen(false)}
              className="text-foreground hover:text-muted-foreground transition-colors text-sm font-semibold tracking-wide uppercase"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
