import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Award,
  Trophy,
  BookOpen,
  Bell,
  Calendar,
  Download,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Target,
  AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useGetBootcampDashboardQuery } from "@/redux/api/bootcampApi";
import { format, formatDistanceToNow } from "date-fns";
import BootcampQuizDrawer from "@/components/bootcamp/BootcampQuizDrawer";

export default function BootcampDashboard() {
  const navigate = useNavigate();
  const { data: dashboardResponse, isLoading, isError } = useGetBootcampDashboardQuery();
  
  const [isQuizDrawerOpen, setIsQuizDrawerOpen] = useState(false);

  // Auto-open drawer if pending/shortlisted and quiz not attempted
  useEffect(() => {
    if (dashboardResponse?.success) {
      const { application, quiz } = dashboardResponse.data;
      const shouldShowQuiz = 
        (application.status === "pending" || application.status === "shortlisted") &&
        !quiz.has_attempted;
      
      if (shouldShowQuiz) {
        // Auto-open after 1 second
        const timer = setTimeout(() => {
          setIsQuizDrawerOpen(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [dashboardResponse]);
  
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#4ADE80] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !dashboardResponse?.success) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Application Not Found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find your bootcamp application. Please apply first to access your dashboard.
            </p>
            <Button
              onClick={() => navigate("/dashboard/bootcamp/apply")}
              className="bg-[#4ADE80] hover:bg-[#4ADE80]/90 text-white"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const applicationData = dashboardResponse.data;
  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case "approved":
      case "completed":
      case "selected":
      case "sent":
      case "shortlisted":
        return "text-green-500 bg-green-500/10 border-green-500/20";
      case "pending":
      case "current":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "rejected":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Under Review",
      shortlisted: "Shortlisted",
      selected: "Selected",
      rejected: "Not Selected",
    };
    return labels[status?.toLowerCase()] || status;
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "TBD") return "TBD";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return dateString;
    }
  };

  const getProgressPercent = () => {
    const current = applicationData.application.current_progress || 1;
    const total = applicationData.application.total_steps || 8;
    return Math.round((current / total) * 100);
  };

  // Dynamic notifications based on application status
  const notifications = [];
  if (applicationData.application.status === "selected") {
    notifications.push({
      id: 1,
      title: "🎉 Congratulations! You've been selected",
      date: formatDistanceToNow(new Date(applicationData.application.submitted_at), { addSuffix: true }),
      type: "success",
    });
  }
  if (applicationData.datacamp.invite_sent) {
    notifications.push({
      id: 2,
      title: "📧 DataCamp invitation sent to your email",
      date: formatDistanceToNow(new Date(applicationData.datacamp.invited_at), { addSuffix: true }),
      type: "info",
    });
  }
  if (applicationData.quiz.has_attempted) {
    notifications.push({
      id: 3,
      title: `✅ Quiz completed with ${applicationData.quiz.score}%`,
      date: formatDistanceToNow(new Date(applicationData.quiz.completed_at), { addSuffix: true }),
      type: "success",
    });
  } else if (applicationData.application.status === "shortlisted") {
    notifications.push({
      id: 4,
      title: "📝 Assessment quiz available - Take it now!",
      date: "Now",
      type: "info",
    });
  }

  // Dummy events for future enhancement
  const events = [
    { id: 1, title: "Virtual Orientation", date: "TBD", time: "TBD" },
    { id: 2, title: "Meet Your Mentors", date: "TBD", time: "TBD" },
    { id: 3, title: "Learning Kickoff", date: "TBD", time: "TBD" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white dark:bg-black relative">
        {/* Visual Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" style={{ marginRight: '-16rem', marginTop: '-16rem' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/20 dark:bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" style={{ marginLeft: '-10rem', marginBottom: '-10rem' }} />
        
        {/* Main Content */}
        <div className="w-full relative z-10 px-6 lg:px-10 py-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#4ADE80]" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Bootcamp Dashboard
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-foreground mb-2 italic tracking-tight">
              Welcome back, {applicationData.application.fullname}! 🎉
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              Application ID: <span className="font-bold text-foreground">{applicationData.application.application_id}</span>
            </p>
          </motion.div>

          {/* Status Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
            {/* Application Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border hover:border-[#4ADE80]/30 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", getStatusColor(applicationData.application.status))}>
                  {getStatusLabel(applicationData.application.status)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Application Status</h3>
              <p className="text-sm text-muted-foreground">Submitted on {formatDate(applicationData.application.submitted_at)}</p>
            </motion.div>

            {/* Quiz Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border hover:border-[#A78BFA]/30 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-purple-500" />
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", getStatusColor(applicationData.quiz.has_attempted ? "completed" : "pending"))}>
                  {applicationData.quiz.has_attempted ? "Completed" : "Pending"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Quiz Status</h3>
              <p className="text-sm text-muted-foreground">
                {applicationData.quiz.has_attempted ? "Assessment completed" : "Take the assessment quiz"}
              </p>
              {!applicationData.quiz.has_attempted && applicationData.application.status === "shortlisted" && (
                <Button
                  onClick={() => navigate(applicationData.quiz.quiz_url)}
                  size="sm"
                  className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Start Quiz
                </Button>
              )}
            </motion.div>

            {/* Quiz Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border hover:border-[#F59E0B]/30 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
                <div className="text-3xl font-black text-foreground">
                  {applicationData.quiz.has_attempted ? `${applicationData.quiz.score}%` : "—"}
                </div>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Quiz Score</h3>
              <p className="text-sm text-muted-foreground">
                {applicationData.quiz.has_attempted 
                  ? applicationData.quiz.score >= 70 ? "Excellent performance!" : "Good effort!"
                  : "Complete the quiz to see your score"
                }
              </p>
            </motion.div>

            {/* Review Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border hover:border-[#06B6D4]/30 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyan-500" />
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", getStatusColor(applicationData.application.status !== "pending" ? "completed" : "pending"))}>
                  {applicationData.application.status !== "pending" ? "Reviewed" : "Pending"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Review Status</h3>
              <p className="text-sm text-muted-foreground">
                {applicationData.application.status !== "pending" ? "Application reviewed" : "Under review"}
              </p>
            </motion.div>

            {/* Selection Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={cn(
                "p-6 rounded-2xl lg:rounded-3xl backdrop-blur-xl border transition-all shadow-lg hover:shadow-xl",
                applicationData.application.status === "selected"
                  ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/40"
                  : "bg-card/80 border-border hover:border-[#4ADE80]/30"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  applicationData.application.status === "selected" ? "bg-green-500/20" : "bg-muted"
                )}>
                  <Sparkles className={cn(
                    "w-6 h-6",
                    applicationData.application.status === "selected" ? "text-green-500" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold",
                  applicationData.application.status === "selected"
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground"
                )}>
                  {applicationData.application.status === "selected" ? "✨ Selected" : getStatusLabel(applicationData.application.status)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">Selection Status</h3>
              <p className={cn(
                "text-sm font-semibold",
                applicationData.application.status === "selected"
                  ? "text-green-600 dark:text-green-400"
                  : "text-muted-foreground"
              )}>
                {applicationData.application.status === "selected" ? "Congratulations! 🎉" : "Results pending"}
              </p>
            </motion.div>

            {/* DataCamp Invitation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border hover:border-[#4ADE80]/30 transition-all shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <span className={cn("px-3 py-1 rounded-full text-xs font-semibold border", getStatusColor(applicationData.datacamp.invite_sent ? "sent" : "pending"))}>
                  {applicationData.datacamp.invite_sent ? "Sent" : "Pending"}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">DataCamp Invitation</h3>
              <p className="text-sm text-muted-foreground">
                {applicationData.datacamp.invite_sent ? "Check your email" : "Awaiting invitation"}
              </p>
            </motion.div>
        </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Timeline */}
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              {/* Progress Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border shadow-lg"
              >
                <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2 italic tracking-tight">
                  <Target className="w-6 h-6 text-[#4ADE80]" />
                  Progress Timeline
                </h2>
              
              <div className="space-y-4">
                {applicationData.timeline.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                          item.status === "completed"
                            ? "bg-green-500 border-green-500"
                            : item.status === "current"
                            ? "bg-blue-500 border-blue-500 animate-pulse"
                            : "bg-muted border-border"
                        )}
                      >
                        {item.status === "completed" && <CheckCircle2 className="w-5 h-5 text-white" />}
                        {item.status === "current" && <Clock className="w-5 h-5 text-white" />}
                        {item.status === "pending" && <div className="w-2 h-2 rounded-full bg-muted-foreground" />}
                      </div>
                      {index < applicationData.timeline.length - 1 && (
                        <div
                          className={cn(
                            "w-0.5 h-12 mt-2",
                            item.status === "completed" ? "bg-green-500" : "bg-border"
                          )}
                        />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h4 className={cn(
                        "font-bold mb-1",
                        item.status === "completed" ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

              {/* Learning Path */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 shadow-lg"
              >
                <h2 className="text-2xl font-black text-foreground mb-4 flex items-center gap-2 italic tracking-tight">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                  Your Learning Path
                </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Track</span>
                  <span className="font-bold text-foreground">{applicationData.application.preferred_track}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Courses</span>
                  <span className="font-bold text-foreground">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-bold text-foreground">6 months</span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-bold text-foreground">{getProgressPercent()}%</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercent()}%` }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

            {/* Right Column - Notifications & Events */}
            <div className="space-y-6 lg:space-y-8">
              {/* Recent Notifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border shadow-lg"
              >
                <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-2 italic tracking-tight">
                  <Bell className="w-5 h-5 text-[#4ADE80]" />
                  Recent Notifications
                </h2>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                    <p className="text-sm text-muted-foreground">No new notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 rounded-xl bg-muted/50 border border-border hover:border-[#4ADE80]/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-2",
                          notification.type === "success" ? "bg-green-500" : "bg-blue-500"
                        )} />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground mb-1">
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{notification.date}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border shadow-lg"
              >
                <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-2 italic tracking-tight">
                  <Calendar className="w-5 h-5 text-[#4ADE80]" />
                  Upcoming Events
                </h2>
              <div className="space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all cursor-pointer group"
                  >
                    <h4 className="font-bold text-foreground mb-2 flex items-center justify-between">
                      {event.title}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-[#4ADE80] transition-colors" />
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}</span>
                      {event.time !== "TBD" && (
                        <>
                          <span>•</span>
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="p-6 rounded-2xl lg:rounded-3xl bg-card/80 backdrop-blur-xl border border-border shadow-lg"
              >
                <h2 className="text-xl font-black text-foreground mb-4 italic tracking-tight">Quick Links</h2>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/bootcamp/application")}
                  disabled
                  className="w-full justify-between bg-muted hover:bg-muted text-muted-foreground cursor-not-allowed"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Apply Again
                  </span>
                  <span className="text-xs">(Disabled)</span>
                </Button>
                <Button
                  disabled={applicationData.application.status !== "selected"}
                  className="w-full justify-between bg-gradient-to-r from-[#4ADE80] to-emerald-500 hover:from-[#4ADE80]/90 hover:to-emerald-500/90 text-white disabled:from-muted disabled:to-muted disabled:text-muted-foreground"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Certificate
                  </span>
                  {applicationData.application.status !== "selected" && (
                    <span className="text-xs">(Not eligible)</span>
                  )}
                </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quiz Drawer - Shows when pending/shortlisted and quiz not attempted */}
      {dashboardResponse?.success && (
        <BootcampQuizDrawer
          isOpen={isQuizDrawerOpen}
          onClose={() => setIsQuizDrawerOpen(false)}
          quizCode={dashboardResponse.data.quiz.quiz_code}
          quizTitle={dashboardResponse.data.quiz.quiz_title}
        />
      )}
    </DashboardLayout>
  );
}
