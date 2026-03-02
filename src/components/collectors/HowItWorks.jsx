import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  UserPlus,
  Hash,
  Sparkles,
  Trophy,
  Building2,
  Rocket,
  Share2,
  LineChart,
  X,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const learnSteps = [
  {
    icon: UserPlus,
    title: "Sign up for free",
    description: "Choose Student or Teacher - it's quick and easy!",
    color: "#a6b1ff",
  },
  {
    icon: Hash,
    title: "Enter your class code",
    description: "Type in the code your teacher gives you.",
    color: "#c7aff8",
  },
  {
    icon: Sparkles,
    title: "Play and earn points",
    description: "Answer questions every day and win coins!",
    color: "#ffb585",
  },
  {
    icon: Trophy,
    title: "See how you're doing",
    description: "Check your score and compete with friends!",
    color: "#a8d8ff",
  }
];

const sponsorSteps = [
  {
    icon: Building2,
    title: "Create a challenge",
    description: "Pick a topic and set up your quiz challenge.",
    color: "#a6b1ff",
  },
  {
    icon: Rocket,
    title: "Invite schools to join",
    description: "Share with schools and get students excited!",
    color: "#c7aff8",
  },
  {
    icon: Share2,
    title: "Students play and learn",
    description: "Rewards and scores keep students motivated.",
    color: "#ffb585",
  },
  {
    icon: LineChart,
    title: "See the results",
    description: "Get reports showing how students did.",
    color: "#a8d8ff",
  }
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learn'); // 'learn' or 'sponsor'
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [showVideo, setShowVideo] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    setVisibleSteps([]);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  const triggerAnimation = () => {
    setVisibleSteps([]);
    const steps = activeTab === 'learn' ? learnSteps : sponsorSteps;
    steps.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSteps(prev => [...prev, index]);
      }, index * 150);
    });
  };

  const currentSteps = activeTab === 'learn' ? learnSteps : sponsorSteps;

  return (
    <div
      ref={sectionRef}
      className="relative pt-32 pb-60 px-6 bg-gradient-to-b from-background via-muted to-background transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground tracking-tight">
            How It Works
          </h2>

          {/* Toggle Switch */}
          <div className="inline-flex p-1 bg-card backdrop-blur-xl border border-border rounded-2xl mb-12">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'learn'
                ? 'bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Learn & Compete
            </button>
            <button
              onClick={() => setActiveTab('sponsor')}
              className={`px-8 py-3 rounded-xl transition-all duration-500 font-bold tracking-wide text-sm ${activeTab === 'sponsor'
                ? 'bg-gradient-to-r from-[#c7aff8] to-[#ffb585] text-[#0a0a0a] shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              Sponsor a Challenge
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {currentSteps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);

            return (
              <div
                key={`${activeTab}-${index}`}
                className={`transform transition-all duration-700 ${isVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-10 scale-95'
                  }`}
              >
                <Card
                  onClick={() => {
                    if (activeTab === 'learn') {
                      switch (index) {
                        case 0: setShowRegistrationModal(true); break;
                        case 1: navigate('/auth/group'); break;
                        case 2: navigate('/auth/login'); break;
                        case 3: navigate('/auth/login'); break;
                        default: break;
                      }
                    } else {
                      switch (index) {
                        case 0: setShowPartnerModal(true); break;
                        case 1: navigate('/auth/signup/?page=3'); break;
                        case 2: navigate('/auth/login'); break;
                        case 3: navigate('/auth/login'); break;
                        default: break;
                      }
                    }
                  }}
                  className="interactive relative h-full glass-morphism bg-card border-border p-8 group hover:border-[#a6b1ff]/30 transition-all duration-500 cursor-pointer"
                >
                  <div className="relative space-y-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-accent/50 to-transparent border border-border group-hover:scale-110 transition-transform duration-500"
                      style={{ boxShadow: `0 0 40px ${step.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: step.color }} />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-[#a6b1ff] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* CTA Section for Learn Pathway */}
        {activeTab === 'learn' && (
          <div className="flex flex-col items-center gap-6 mb-48 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
              <Button
                className="interactive relative px-10 py-7 text-lg font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_5px_0_#8b95cc] active:shadow-none active:translate-y-[5px]"
                onClick={() => navigate("/auth/signup")}
              >
                <span className="relative z-10 tracking-wide">Start Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Button>
              <Button
                variant="outline"
                className="interactive px-10 py-7 text-lg font-bold border-2 border-border bg-transparent text-foreground rounded-xl hover:bg-accent hover:border-[#a6b1ff]/30 transition-all duration-300 flex items-center gap-2"
                onClick={() => navigate("/auth/group")}
              >
                I Have a Code
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm font-medium tracking-wide">
              No credit card needed - it's free!
            </p>
          </div>
        )}

        {/* CTA Section for Sponsor Pathway */}
        {activeTab === 'sponsor' && (
          <div className="flex flex-col items-center gap-6 mb-48 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
              <Button
                className="interactive relative px-10 py-7 text-lg font-bold bg-gradient-to-r from-[#c7aff8] via-[#ffb585] to-[#a6b1ff] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_5px_0_#8b95cc] active:shadow-none active:translate-y-[5px]"
                onClick={() => navigate("/auth/signup")}
              >
                <span className="relative z-10 tracking-wide">Sponsor a Challenge</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ffb585] via-[#a6b1ff] to-[#c7aff8] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </Button>
              <Button
                variant="outline"
                className="interactive px-10 py-7 text-lg font-bold border-2 border-border bg-transparent text-foreground rounded-xl hover:bg-accent hover:border-[#a6b1ff]/30 transition-all duration-300 flex items-center gap-2"
                onClick={() => navigate("/auth/login")}
              >
                Sign In
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-muted-foreground text-sm font-medium tracking-wide">
              Help students learn and make a difference!
            </p>
          </div>
        )}

        {/* Video Section */}
        <div className="mt-40 max-w-5xl mx-auto text-center">
          <div className="mb-12 space-y-4">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              See TechXplora in 1 Minute
            </h3>
            <p className="text-muted-foreground text-lg md:text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Watch how students play quizzes, earn rewards, and track their progress. 
              See how teachers and schools create fun challenges!
            </p>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden glass-morphism border border-border shadow-[0_0_80px_rgba(166,177,255,0.1)] group bg-gray-900 dark:bg-gray-900">
            {/* Video Banner Image */}
            <img 
              src="/video.png" 
              alt="TechXplora Demo" 
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-90"
            />

            {/* Overlay on hover - adapts to theme */}
            <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/40 dark:group-hover:bg-black/50 transition-all duration-300 z-[1]" />

            <div
              className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer group/play"
              onClick={() => setShowVideo(true)}
            >
              <div className="relative">
                {/* Pulsing play button rings */}
                <div className="absolute inset-0 rounded-full bg-[#a6b1ff]/20 animate-ping duration-[3000ms]" />
                <div className="absolute inset-0 rounded-full bg-[#a6b1ff]/10 animate-pulse duration-[2000ms]" />

                <div className="relative w-28 h-28 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-xl flex items-center justify-center border border-border group-hover/play:scale-110 group-hover/play:border-[#a6b1ff]/50 transition-all duration-500 shadow-[0_0_50px_rgba(166,177,255,0.3)]">
                  <div className="w-0 h-0 border-t-[18px] border-t-transparent border-l-[32px] border-l-[#a6b1ff] border-b-[18px] border-b-transparent ml-2 drop-shadow-[0_0_15px_rgba(166,177,255,0.5)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Post-Video CTAs */}
          <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
            <Button
              className="interactive relative px-8 py-6 text-base font-bold bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] rounded-xl overflow-hidden group hover:scale-105 transition-all duration-300 shadow-[0_4px_0_#8b95cc] active:shadow-none active:translate-y-[4px]"
              onClick={() => navigate("/auth/signup")}
            >
              <span className="relative z-10 tracking-wide">Start as Student or Teacher</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#c7aff8] to-[#a6b1ff] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </Button>

            <Button
              variant="outline"
              className="interactive px-8 py-6 text-base font-bold border border-border bg-card text-foreground rounded-xl hover:bg-accent hover:border-[#a6b1ff]/30 transition-all duration-300"
              onClick={() => navigate("/auth/signup/?page=3")}
            >
              Create a Challenge
            </Button>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(166,177,255,0.15)] border border-border"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 z-10 p-3 bg-card/80 hover:bg-accent text-foreground rounded-full transition-all duration-300 border border-border"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe
              src="https://www.youtube.com/embed/3Irx1TdHvfA?autoplay=1"
              title="Techxplora Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Registration Selection Modal */}
      <Dialog open={showRegistrationModal} onOpenChange={setShowRegistrationModal}>
        <DialogContent className="bg-card border-border text-foreground max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] bg-clip-text text-transparent italic">
              Account Registration
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Choose your role to start your journey with TechXplora.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-6">
            <Button
              onClick={() => navigate('/auth/signup')}
              className="h-16 bg-accent hover:bg-[#a6b1ff] hover:text-black border border-border text-foreground font-bold text-lg rounded-xl flex items-center justify-between px-6 group transition-all"
            >
              <span>Student Account</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/auth/signup/?page=2')}
              className="h-16 bg-accent hover:bg-[#c7aff8] hover:text-black border border-border text-foreground font-bold text-lg rounded-xl flex items-center justify-between px-6 group transition-all"
            >
              <span>Teacher Account</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Partner/Teacher/Admin Selection Modal */}
      <Dialog open={showPartnerModal} onOpenChange={setShowPartnerModal}>
        <DialogContent className="bg-card border-border text-foreground max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#c7aff8] to-[#ffb585] bg-clip-text text-transparent italic">
              Create a Challenge
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              Select your organization type to customize your challenge.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-6">
            <Button
              onClick={() => navigate('/auth/signup/?page=3')}
              className="h-16 bg-accent hover:bg-[#c7aff8] hover:text-black border border-border text-foreground font-bold text-lg rounded-xl flex items-center justify-between px-6 group transition-all"
            >
              <span>Partner</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/auth/signup/?page=2')}
              className="h-16 bg-accent hover:bg-[#ffb585] hover:text-black border border-border text-foreground font-bold text-lg rounded-xl flex items-center justify-between px-6 group transition-all"
            >
              <span>Teacher</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/auth/login')}
              className="h-16 bg-accent hover:bg-[#a6b1ff] hover:text-black border border-border text-foreground font-bold text-lg rounded-xl flex items-center justify-between px-6 group transition-all"
            >
              <span>Admin</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}