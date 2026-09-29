import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  Trophy,
  Sparkles,
  Code,
  Database,
  Brain,
  BarChart3,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Globe,
  Target,
  Zap,
  Star,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Bootcamp() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const heroRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Countdown timer effect - Calculate time until July 22, 2026
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2026-07-22T23:59:59').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const highlights = [
    {
      icon: Sparkles,
      title: "100% Free",
      description: "No hidden fees - completely free scholarship",
      gradient: "from-cyan-400 via-blue-500 to-indigo-600",
      glow: "shadow-[0_0_40px_rgba(6,182,212,0.3)]",
    },
    {
      icon: BookOpen,
      title: "Learn on DataCamp",
      description: "Access premium courses and interactive learning",
      gradient: "from-violet-400 via-purple-500 to-fuchsia-600",
      glow: "shadow-[0_0_40px_rgba(139,92,246,0.3)]",
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Get guidance from industry professionals",
      gradient: "from-orange-400 via-red-500 to-pink-600",
      glow: "shadow-[0_0_40px_rgba(249,115,22,0.3)]",
    },
    {
      icon: Code,
      title: "Portfolio Projects",
      description: "Build real-world projects to showcase",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      glow: "shadow-[0_0_40px_rgba(16,185,129,0.3)]",
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Earn recognized completion certificates",
      gradient: "from-amber-400 via-yellow-500 to-orange-600",
      glow: "shadow-[0_0_40px_rgba(245,158,11,0.3)]",
    },
    {
      icon: Trophy,
      title: "Digital Badges",
      description: "Display achievements on LinkedIn",
      gradient: "from-blue-400 via-cyan-500 to-sky-600",
      glow: "shadow-[0_0_40px_rgba(59,130,246,0.3)]",
    },
    {
      icon: Globe,
      title: "Networking",
      description: "Connect with peers and professionals",
      gradient: "from-purple-400 via-indigo-500 to-blue-600",
      glow: "shadow-[0_0_40px_rgba(124,58,237,0.3)]",
    },
    {
      icon: Target,
      title: "Community Challenges",
      description: "Participate in competitions and events",
      gradient: "from-pink-400 via-rose-500 to-red-600",
      glow: "shadow-[0_0_40px_rgba(236,72,153,0.3)]",
    },
  ];

  const learningPaths = [
    {
      icon: BookOpen,
      title: "Data Literacy",
      description: "Foundation of data understanding and interpretation",
      color: "from-cyan-500 via-blue-600 to-indigo-700",
      accent: "bg-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Master data analysis and insights",
      color: "from-blue-500 via-indigo-600 to-purple-700",
      accent: "bg-blue-500",
    },
    {
      icon: Brain,
      title: "Artificial Intelligence",
      description: "Build intelligent systems and models",
      color: "from-violet-500 via-purple-600 to-fuchsia-700",
      accent: "bg-violet-500",
    },
    {
      icon: Code,
      title: "Python Programming",
      description: "Learn the most versatile language",
      color: "from-green-500 via-emerald-600 to-teal-700",
      accent: "bg-green-500",
    },
    {
      icon: Database,
      title: "SQL",
      description: "Query and manage databases",
      color: "from-orange-500 via-red-600 to-pink-700",
      accent: "bg-orange-500",
    },
    {
      icon: TrendingUp,
      title: "Excel for Data Analysis",
      description: "Advanced spreadsheet skills",
      color: "from-teal-500 via-cyan-600 to-blue-700",
      accent: "bg-teal-500",
    },
    {
      icon: BarChart3,
      title: "Data Visualisation",
      description: "Create compelling data stories",
      color: "from-indigo-500 via-blue-600 to-cyan-700",
      accent: "bg-indigo-500",
    },
    {
      icon: Briefcase,
      title: "Business Intelligence",
      description: "Turn data into business insights",
      color: "from-purple-500 via-violet-600 to-indigo-700",
      accent: "bg-purple-500",
    },
    {
      icon: Zap,
      title: "Machine Learning Foundations",
      description: "Build predictive models",
      color: "from-rose-500 via-pink-600 to-fuchsia-700",
      accent: "bg-rose-500",
    },
    {
      icon: Rocket,
      title: "Career Readiness",
      description: "Prepare for your dream job",
      color: "from-amber-500 via-yellow-600 to-orange-700",
      accent: "bg-amber-500",
    },
  ];

  const eligibility = [
    { icon: CheckCircle2, text: "Students" },
    { icon: CheckCircle2, text: "Graduates" },
    { icon: CheckCircle2, text: "NYSC Members" },
    { icon: CheckCircle2, text: "Job Seekers" },
    { icon: CheckCircle2, text: "Professionals" },
    { icon: CheckCircle2, text: "Teachers" },
    { icon: CheckCircle2, text: "Entrepreneurs" },
    { icon: CheckCircle2, text: "Researchers" },
    { icon: CheckCircle2, text: "Tech Enthusiasts" },
    { icon: CheckCircle2, text: "Community Members" },
  ];

  const faqs = [
    {
      question: "Who can apply for the scholarship?",
      answer: "The scholarship is open to anyone aged 18+ who is passionate about learning data science and AI. We welcome students, graduates, career switchers, and tech enthusiasts from across Africa.",
    },
    {
      question: "Is this really 100% free?",
      answer: "Yes! This scholarship is completely free with no hidden costs. You'll get full access to DataCamp's premium content, mentorship, and all program resources at no charge.",
    },
    {
      question: "What will I learn?",
      answer: "You'll learn data analytics, Python, SQL, machine learning, data visualization, and more. The program covers everything from fundamentals to advanced topics with hands-on projects.",
    },
    {
      question: "How long is the program?",
      answer: "The program is self-paced, but we recommend completing it within 6 months. You'll have access to all resources and mentorship throughout this period.",
    },
    {
      question: "Do I need prior experience?",
      answer: "No prior experience is required! The program is designed for beginners and includes foundational courses. However, basic computer skills and enthusiasm to learn are essential.",
    },
    {
      question: "Will I get a certificate?",
      answer: "Yes! You'll earn certificates for each completed course and a final program completion certificate that you can share on LinkedIn and your resume.",
    },
    {
      question: "What is the application deadline?",
      answer: "Applications close in 45 days. We encourage you to apply early as spaces are limited to 150 scholarships.",
    },
    {
      question: "How do I apply?",
      answer: "Simply create a free TechXplora account and complete the scholarship application form. You'll hear back within 2 weeks of the deadline.",
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-slate-50 via-blue-50 to-slate-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950 overflow-hidden">
      {/* Unique animated grid background */}
      <div className="fixed inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Floating orbs with mouse tracking */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20 blur-[100px]"
          animate={{
            x: mousePosition.x * 2,
            y: mousePosition.y * 2,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 50 }}
          style={{ top: '10%', left: '10%' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 dark:from-purple-500/20 dark:to-fuchsia-500/20 blur-[120px]"
          animate={{
            x: -mousePosition.x * 1.5,
            y: -mousePosition.y * 1.5,
          }}
          transition={{ type: "spring", damping: 50, stiffness: 50 }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6"
      >
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Premium badge */}
            <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-purple-500/10 border border-cyan-500/30 dark:border-cyan-500/20 backdrop-blur-xl">
              <Star className="w-5 h-5 text-cyan-600 dark:text-cyan-400 fill-cyan-600 dark:fill-cyan-400" />
              <span className="text-sm text-cyan-900 dark:text-cyan-100 font-bold tracking-wider uppercase">
                Exclusive Scholarship Programme
              </span>
              <Star className="w-5 h-5 text-purple-600 dark:text-purple-400 fill-purple-600 dark:fill-purple-400" />
            </div>

            {/* Main Heading with unique gradient */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9]">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                Data & AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(192,132,252,0.3)]">
                Scholarships
              </span>
            </h1>

            {/* Powered by badge */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-lg text-cyan-700 dark:text-cyan-300 font-medium tracking-wider">POWERED BY</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500/50" />
            </div>

            <div className="mb-12 text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-cyan-700 to-slate-900 dark:from-white dark:via-cyan-100 dark:to-white bg-clip-text text-transparent">
              DataCamp Donates × TechXplora
            </div>

            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              Build in-demand Data, Analytics and  skills completely FREE

              <br />      <span className="text-cyan-700 dark:text-cyan-400 font-semibold"> and Artificial Intelligence</span> through TechXplora and DataCamp.

            </p>

            {/* Floating stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
              {[
                { label: "Scholarships", value: "150", icon: Award, color: "from-cyan-400 to-blue-500" },
                { label: "Premium Courses", value: "200+", icon: BookOpen, color: "from-purple-400 to-fuchsia-500" },
                { label: "Learning Paths", value: "9", icon: Target, color: "from-green-400 to-emerald-500" },
                { label: "Success Rate", value: "85%", icon: TrendingUp, color: "from-orange-400 to-pink-500" },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                    <div className="relative p-6 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:border-slate-300 dark:hover:border-slate-600/50 transition-all">
                      <Icon className={`w-8 h-8 mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                      <div className={`text-4xl font-black mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons with unique style */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => navigate("/bootcamp/apply")}
                className="group relative px-12 py-8 text-xl font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <Rocket className="w-6 h-6" />
                  Apply Now
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>

              <Button
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                className="px-12 py-8 text-xl font-bold border-2 border-cyan-500/50 dark:border-cyan-500/30 bg-white/80 dark:bg-slate-900/50 text-cyan-700 dark:text-cyan-100 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:border-cyan-600 dark:hover:border-cyan-400/50 backdrop-blur-sm transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Scroll indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-16 flex flex-col items-center gap-2 text-slate-600 dark:text-slate-400"
            >
              <span className="text-sm font-medium tracking-wider uppercase">Scroll to Explore</span>
              <div className="w-6 h-10 rounded-full border-2 border-slate-400 dark:border-slate-600 flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-cyan-600 dark:bg-cyan-400"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Programme Overview Section - Unique Diagonal Design */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Animated diagonal background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50 to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950">
          <div className="absolute inset-0 opacity-30 dark:opacity-20" style={{
            backgroundImage: `linear-gradient(135deg, rgba(6,182,212,0.1) 25%, transparent 25%, transparent 50%, rgba(6,182,212,0.1) 50%, rgba(6,182,212,0.1) 75%, transparent 75%, transparent)`,
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Floating gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 dark:from-cyan-400/10 dark:to-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-l from-purple-400/20 to-fuchsia-400/20 dark:from-purple-400/10 dark:to-fuchsia-400/10 rounded-full blur-3xl"
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Decorative top element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 blur-2xl opacity-30 animate-pulse" />
              <div className="relative px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-2 border-cyan-500/30 dark:border-cyan-400/20 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-sm md:text-base font-bold bg-gradient-to-r from-cyan-700 via-blue-700 to-purple-700 dark:from-cyan-300 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent tracking-wider">
                    STEAMLEDGE COMMUNITY × DATACAMP DONATES
                  </span>
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main content with asymmetric layout */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Main text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                  <span className="inline-block bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                    Become Part of
                  </span>
                  <br />
                  <span className="inline-block bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                    Africa's Next Generation
                  </span>
                  <br />
                  <span className="inline-block text-slate-900 dark:text-white">
                    of Data & AI Professionals
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  Steamledge Community, in partnership with <span className="font-bold text-cyan-600 dark:text-cyan-400">DataCamp Donates</span>, is offering <span className="relative inline-block">
                    <span className="relative z-10 font-black text-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 dark:from-purple-400 dark:to-fuchsia-400 bg-clip-text text-transparent">150 fully sponsored scholarships</span>
                    <span className="absolute -bottom-1 left-0 right-0 h-3 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 blur-sm" />
                  </span> for learners passionate about Data, Artificial Intelligence, Programming and Digital Skills.
                </p>

                <p className="text-base text-slate-600 dark:text-slate-400">
                  Selected applicants will receive access to premium learning content on the DataCamp platform while participating in TechXplora learning missions, mentorship sessions, community activities and project-based learning.
                </p>
              </div>

              {/* Target audience statement */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-800/50 dark:to-slate-900/50 border border-slate-300 dark:border-slate-700">
                <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                  Whether you're a <span className="font-bold text-cyan-600 dark:text-cyan-400">student</span>, <span className="font-bold text-blue-600 dark:text-blue-400">graduate</span>, <span className="font-bold text-purple-600 dark:text-purple-400">teacher</span>, <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400">entrepreneur</span> or <span className="font-bold text-pink-600 dark:text-pink-400">working professional</span>, this is your opportunity to gain globally recognised digital skills.
                </p>
              </div>

              {/* Target audience tags */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Students", gradient: "from-cyan-500 to-blue-500" },
                  { label: "Graduates", gradient: "from-blue-500 to-indigo-500" },
                  { label: "Teachers", gradient: "from-purple-500 to-fuchsia-500" },
                  { label: "Entrepreneurs", gradient: "from-fuchsia-500 to-pink-500" },
                  { label: "Professionals", gradient: "from-pink-500 to-rose-500" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-50 blur-lg transition-opacity`} />
                    <div className={`relative px-5 py-2.5 rounded-full bg-gradient-to-r ${item.gradient} text-white font-bold text-sm shadow-lg hover:scale-105 transition-transform cursor-default`}>
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>

            </motion.div>

            {/* Right side - Visual cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: BookOpen,
                  title: "Premium DataCamp Access",
                  desc: "Full access to DataCamp's world-class learning platform with 200+ courses",
                  gradient: "from-cyan-500 via-blue-500 to-indigo-600",
                  delay: 0.1
                },
                {
                  icon: Users,
                  title: "Mentorship & Community",
                  desc: "Expert guidance and vibrant learning community with regular sessions",
                  gradient: "from-purple-500 via-fuchsia-500 to-pink-600",
                  delay: 0.2
                },
                {
                  icon: Code,
                  title: "Project-Based Learning",
                  desc: "Build real-world projects on TechXplora to showcase your skills",
                  gradient: "from-orange-500 via-pink-500 to-rose-600",
                  delay: 0.3
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: item.delay }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />

                    {/* Card */}
                    <div className="relative p-6 rounded-2xl bg-white/90 dark:bg-slate-900/80 border-2 border-slate-200 dark:border-slate-700/50 backdrop-blur-xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Call to action indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="pt-4"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 border-2 border-emerald-300 dark:border-emerald-500/30 text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    Your opportunity to gain globally recognised digital skills
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>100% Free • No Hidden Costs • Limited Spots</span>
                  </div>
                </div>
              </motion.div>

              {/* Applications Now Open Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Button
                  onClick={() => navigate("/bootcamp/apply")}
                  className="w-full group relative px-8 py-6 text-lg font-black bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    Applications Now Open!
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Animated shine effect */}
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                  />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scholarship Highlights */}
      <section className="relative py-32 px-6 bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-300 dark:border-cyan-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-sm text-cyan-800 dark:text-cyan-300 font-semibold tracking-wider uppercase">What You Get</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6">
              Scholarship <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">Highlights</span>
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything you need to launch your data science career
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`} />

                  <div className="relative p-8 rounded-3xl bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm hover:border-slate-300 dark:hover:border-slate-600/50 transition-all duration-300 h-full">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          {/* Applications Now Open Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-4"
          >
            <Button
              onClick={() => navigate("/bootcamp/apply")}
              className="group relative px-10 py-7 text-xl font-black bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-6 h-6 animate-pulse" />

                Applications Now Open!
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Animated shine effect */}
              <motion.div
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </Button>
          </motion.div>

        </div>
      </section>

      {/* About the Programme */}
      <section id="about" className="py-20 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About the Programme
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-cyan-600 dark:text-cyan-400 mb-6">
              What is the TechXplora Data & AI Scholarship?
            </h3>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              The TechXplora Data & AI Scholarship is an initiative of <span className="font-semibold text-foreground">Steamledge Community</span>, powered by <span className="font-semibold text-foreground">DataCamp Donates</span>, designed to equip young Africans with practical skills in Data Analytics, Artificial Intelligence, Programming and emerging digital technologies.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/30">
                <GraduationCap className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Interactive Learning on DataCamp</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access premium courses from DataCamp's world-class library. Learn from industry experts through interactive lessons and hands-on exercises.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800/30">
                <Target className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Gamified Learning on TechXplora</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complete structured learning missions designed to take you from beginner to professional. Track your progress with our gamified platform.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800/30">
                <Users className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Community Engagement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join a vibrant community of learners and participate in group projects, discussions, and peer learning sessions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200 dark:border-cyan-800/30">
                <Users className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Mentorship</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get guidance from experienced mentors who will support your learning journey and help you overcome challenges.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800/30">
                <Code className="w-12 h-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Practical Projects</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Build a portfolio of real-world projects that demonstrate your skills to employers. Work on datasets from actual companies and industries.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border border-pink-200 dark:border-pink-800/30">
                <Briefcase className="w-12 h-12 text-pink-600 mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-3">Career Development Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Receive guidance on career paths, resume building, and job opportunities in the data and AI field.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 border-2 border-orange-300 dark:border-orange-500/30 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                <h3 className="text-2xl font-bold text-foreground">Competitive Selection</h3>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The scholarship is <span className="font-bold text-orange-600 dark:text-orange-400">competitive</span> and only <span className="font-bold text-orange-600 dark:text-orange-400">selected applicants</span> will receive access to the DataCamp learning licence. Apply early and showcase your passion for learning!
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 px-6 bg-gradient-to-b from-muted to-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Who Can Apply?
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              This opportunity is open to:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {eligibility.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover:border-emerald-500/30 transition-all group"
                >
                  <Icon className="w-8 h-8 text-emerald-500 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-lg font-semibold text-foreground">{item.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Nigeria-specific note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-300 dark:border-green-500/30">
              <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                Applicants from every state in Nigeria are encouraged to apply
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Learning Paths
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your track and master in-demand skills
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, idx) => {
              const Icon = path.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-2xl bg-card border border-border hover:border-[#a6b1ff]/30 transition-all duration-300 hover:shadow-xl cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#a6b1ff] transition-colors">
                    {path.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {path.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Deadline Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Application Deadline
            </h2>
            <p className="text-xl text-white/90 mb-8">Don't miss this opportunity!</p>

            {/* Countdown */}
            <div className="flex justify-center gap-4 md:gap-8 mb-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white/20 backdrop-blur-md rounded-2xl p-4 md:p-6 min-w-[80px] md:min-w-[100px]"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-sm text-white/80 font-semibold">{item.label}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => navigate("/bootcamp/apply")}
              className="px-10 py-7 text-lg font-bold bg-white text-rose-600 rounded-xl hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Apply Before It's Too Late
            </Button>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers!
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-2 border-border rounded-2xl px-6 bg-card hover:border-[#a6b1ff]/30 transition-all"
              >
                <AccordionTrigger className="text-lg font-bold text-foreground hover:text-[#a6b1ff] py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-muted to-background">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#a6b1ff]/20 to-[#c7aff8]/20 border-2 border-[#a6b1ff]/30">
              <Sparkles className="w-4 h-4 text-[#a6b1ff]" />
              <span className="text-sm text-foreground font-bold">Transform Your Future</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Join 150 aspiring data scientists and AI engineers. Build skills,
              create projects, and launch your career - all for free!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                onClick={() => navigate("/bootcamp/apply")}
                className="px-12 py-8 text-xl font-bold bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_6px_0_#8b95cc] active:shadow-none active:translate-y-[6px] flex items-center gap-3"
              >
                <GraduationCap className="w-6 h-6" />
                Apply for Bootcamp
              </Button>
              <Button
                onClick={() => navigate("/bootcamp/apply")}
                variant="outline"
                className="px-12 py-8 text-xl font-bold border-2 border-border bg-card text-foreground rounded-xl hover:bg-accent hover:border-[#a6b1ff]/30 transition-all duration-300 flex items-center gap-3"
              >
                <Award className="w-6 h-6" />
                Sign Up for Bootcamp
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              No credit card required • 100% Free • Limited spots available
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
