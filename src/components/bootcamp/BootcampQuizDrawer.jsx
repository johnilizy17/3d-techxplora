import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trophy,
  Clock,
  FileText,
  Sparkles,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLazyVerifyQuizCodeQuery, useJoinQuizMutation } from "@/redux/api/studentApi";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function BootcampQuizDrawer({ isOpen, onClose, quizCode, quizTitle }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [verifyQuiz, { isLoading: isVerifying }] = useLazyVerifyQuizCodeQuery();
  const [joinQuiz, { isLoading: isJoining }] = useJoinQuizMutation();
  
  const [quizDetails, setQuizDetails] = useState(null);
  const [step, setStep] = useState("info"); // "info" | "details" | "joining"

  const handleGetQuizInfo = async () => {
    try {
      setStep("details");
      const result = await verifyQuiz(quizCode).unwrap();
      setQuizDetails(result.data || result);
      toast.success("Quiz information loaded!");
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
      toast.error(error?.data?.message || "Failed to load quiz information");
      setStep("info");
    }
  };

  const handleStartQuiz = async () => {
    if (!quizDetails) {
      toast.error("Quiz information not loaded");
      return;
    }

    try {
      setStep("joining");
      
      await joinQuiz({
        student_id: user.id,
        quiz_id: quizDetails.id,
      }).unwrap();

      toast.success("Successfully joined the quiz!");
      onClose();
      navigate(`/dashboard/quizzes/details?code=${quizCode}`);
    } catch (error) {
      console.error("Join failed:", error);
      toast.error(error?.data?.message || "Failed to join quiz");
      setStep("details");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Drawer */}
        <motion.div
          initial={{ opacity: 0, y: "100%", scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: "100%", scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full sm:max-w-2xl bg-white dark:bg-[#0a0a0a] border-t sm:border border-border dark:border-white/10 sm:rounded-3xl shadow-2xl max-h-[85vh] sm:max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-200/20 dark:bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border dark:border-white/10 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center border border-green-500/20 dark:border-green-500/30">
                <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-foreground italic tracking-tight">
                  Bootcamp Assessment
                </h2>
                <p className="text-xs text-muted-foreground font-semibold">Required for application review</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10">
            {step === "info" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Info Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-500/10 dark:to-emerald-500/10 border border-green-200 dark:border-green-500/20">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                      <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-foreground mb-2 italic">
                        Complete Your Assessment
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        This quiz is a required part of your bootcamp application. Your performance will help us understand your current skill level and place you in the right track.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quiz Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-border">
                    <Target className="w-4 h-4 text-[#4ADE80]" />
                    <h4 className="font-bold text-foreground">Quiz Information</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-card border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span className="text-xs font-bold text-muted-foreground uppercase">Quiz Code</span>
                      </div>
                      <p className="text-lg font-black text-foreground font-mono">{quizCode}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-card border border-border">
                      <div className="flex items-center gap-3 mb-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <span className="text-xs font-bold text-muted-foreground uppercase">Title</span>
                      </div>
                      <p className="text-sm font-bold text-foreground">{quizTitle}</p>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                        Important Notes
                      </p>
                      <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
                        <li>Click "View Quiz Details" to see full information</li>
                        <li>Make sure you have stable internet connection</li>
                        <li>Complete the quiz in one sitting</li>
                        <li>Your score will be reviewed by our team</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleGetQuizInfo}
                  disabled={isVerifying}
                  className="w-full h-12 bg-gradient-to-r from-[#4ADE80] to-emerald-500 hover:from-[#4ADE80]/90 hover:to-emerald-500/90 text-white font-black rounded-xl"
                >
                  {isVerifying ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin mr-2" />
                      Loading Details...
                    </>
                  ) : (
                    <>
                      View Quiz Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {step === "details" && quizDetails && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Quiz Details Card */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-foreground mb-1 italic">
                        {quizDetails.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {quizDetails.description || "Assessment quiz for bootcamp applicants"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold text-muted-foreground uppercase">Duration</span>
                      </div>
                      <p className="text-lg font-black text-foreground">
                        {quizDetails.duration} <span className="text-sm">mins</span>
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-muted border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-purple-500" />
                        <span className="text-xs font-bold text-muted-foreground uppercase">Questions</span>
                      </div>
                      <p className="text-lg font-black text-foreground">
                        {quizDetails.QuizQuestions || quizDetails.no_of_questions || 0}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ready to Start */}
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-green-800 dark:text-green-300 mb-1">
                        Ready to Begin
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-400">
                        Click "Start Quiz" to begin your assessment. Make sure you're in a quiet environment with stable internet.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setStep("info")}
                    variant="outline"
                    className="flex-1"
                    disabled={isJoining}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleStartQuiz}
                    disabled={isJoining}
                    className="flex-1 bg-gradient-to-r from-[#4ADE80] to-emerald-500 hover:from-[#4ADE80]/90 hover:to-emerald-500/90 text-white font-black"
                  >
                    {isJoining ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin mr-2" />
                        Starting...
                      </>
                    ) : (
                      <>
                        Start Quiz
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "joining" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-green-600 dark:text-green-400 animate-spin" />
                </div>
                <p className="text-lg font-bold text-foreground mb-2">Preparing Quiz...</p>
                <p className="text-sm text-muted-foreground">Please wait while we set everything up</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
