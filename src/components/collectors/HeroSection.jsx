import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VisualBackground from "./VisualBackground";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ModalCard({ icon, title, description, to, onClick }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        onClick();
        navigate(to);
      }}
      className="bg-white/5 dark:bg-white/5 p-6 rounded-2xl hover:bg-white/10 dark:hover:bg-white/10 transition-all duration-300 text-left w-full group border-2 border-gray-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-white/30 backdrop-blur-sm"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:gradient-text-shine transition-all">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-semibold">{description}</p>
    </button>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);
  const [isStudentTeacherOpen, setIsStudentTeacherOpen] = useState(false);
  const [isSponsorOpen, setIsSponsorOpen] = useState(false);

  return (
    <div className="relative h-[700px] md:h-[750px] lg:h-[700px] flex items-center justify-center overflow-hidden py-16 md:py-20">
      {/* Background with 3D elements */}
      <div className="fixed inset-0 z-0 opacity-60 dark:opacity-40 pointer-events-none">
        <VisualBackground />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20 text-center">
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 bg-white/90 dark:bg-white/10 border-indigo-200 dark:border-white/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span className="text-sm text-gray-900 dark:text-white font-bold tracking-[0.15em] uppercase">
              Play, Learn, and Win Rewards
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="gradient-text-shine">Learning Made Fun!</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-100 font-bold max-w-3xl mx-auto leading-relaxed mb-12">
            TechXplora turns learning into a fun game! Answer quiz questions, earn points, and see how you're doing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => setIsStudentTeacherOpen(true)}
              className="halo-click bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] text-[#0a0a0a] hover:scale-105 hover:shadow-[0_0_30px_rgba(166,177,255,0.5)] transition-all duration-300 text-lg px-8 py-6"
            >
              Start as Student or Teacher
            </Button>
            <Button
              onClick={() => setIsSponsorOpen(true)}
              variant="outline"
              className="bg-white/90 dark:bg-white/10 border-2 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-white/20 text-lg px-8 py-6 backdrop-blur-sm"
            >
              Create a Challenge
            </Button>

          </div>
        </div>
      </div>

      {/* Student/Teacher Modal */}
      <Dialog open={isStudentTeacherOpen} onOpenChange={setIsStudentTeacherOpen}>
        <DialogContent className="max-w-md bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-2xl border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-bold gradient-text-shine text-center">Choose Your Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <ModalCard
              icon="🎓"
              title="I'm a Student"
              description="Play quizzes and earn rewards!"
              to="/auth/signup"
              onClick={() => setIsStudentTeacherOpen(false)}
            />
            <ModalCard
              icon="👨‍🏫"
              title="I'm a Teacher"
              description="Create quizzes and see how students do"
              to="/auth/group"
              onClick={() => setIsStudentTeacherOpen(false)}
            />
            <ModalCard
              icon="🏆"
              title="I'm an NJFP Fellow/Alumni"
              description="Access NJFP courses and track progress"
              to="/auth/alumni"
              onClick={() => setIsStudentTeacherOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Sponsor/Partner Modal */}
      <Dialog open={isSponsorOpen} onOpenChange={setIsSponsorOpen}>
        <DialogContent className="max-w-md bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-2xl border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-bold gradient-text-shine text-center">Join as Sponsor</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <ModalCard
              icon="🏫"
              title="School Admin"
              description="Help your school with fun learning challenges"
              to="/auth/signup/?page=3"
              onClick={() => setIsSponsorOpen(false)}
            />
            <ModalCard
              icon="🤝"
              title="Partner/Sponsor"
              description="Work with us to help students learn"
              to="/auth/signup/?page=3"
              onClick={() => setIsSponsorOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Modal */}
      <Dialog open={showVideo} onOpenChange={setShowVideo}>
        <DialogContent className="max-w-4xl bg-white/95 dark:bg-[#0d0d0d]/95 backdrop-blur-2xl border-gray-200 dark:border-white/10 rounded-3xl p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-3xl font-bold gradient-text-shine text-center">
              See TechXplora in 1 Minute
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-[#1a1520] dark:to-[#0a0a0a] rounded-2xl flex items-center justify-center">
            <p className="text-gray-600 dark:text-gray-400 text-center px-8">
              Watch how students play quizzes, earn rewards, and track their progress. See how teachers and schools create fun challenges!
            </p>
            {/* Add your video embed here */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
