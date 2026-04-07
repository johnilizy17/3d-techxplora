import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import useAnalytics from "@/hooks/useAnalytics";
import ScrollToTop from "@/components/ScrollToTop";

import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Chess from "./chess.jsx";
import ChessGame from "./ChessGame.jsx";
import HowToUse from "./HowToUse.jsx";
import About from "./About.jsx";
import Auth from "./auth/Auth.jsx";
import Dashboard from "./Dashboard.jsx";
import Wallet from "./Wallet.jsx";
import Profile from "./Profile.jsx";
import UserProfile from "./UserProfile.jsx";
import Courses from "./Courses.jsx";
import CoursePreview from "./CoursePreview.jsx";
import Groups from "./Groups.jsx";
import Quizzes from "./Quizzes.jsx";
import Leaderboard from "./Leaderboard.jsx";
import Syllabus from "./Syllabus.jsx";
import Teachers from "./Teachers.jsx";
import CreateQuiz from "./CreateQuiz.jsx";
import Questions from "./Questions.jsx";
import AIReview from "./AIReview.jsx";
import Drafts from "./Drafts.jsx";
import QuizDetails from "./QuizDetails.jsx";
import StartQuiz from "./StartQuiz.jsx";
import QuizCompletion from "./QuizCompletion.jsx";
import QuizResult from "./QuizResult.jsx";
import TeacherGroupDetails from "./TeacherGroupDetails.jsx";
import JoinQuiz from './JoinQuiz.jsx';
import JoinGroup from './JoinGroup.jsx';
import Start from "./auth/Start.jsx";
import Signup from "./auth/Signup.jsx";
import Alumni from "./auth/Alumni.jsx";
import PhoneVerify from "./auth/PhoneVerify.jsx";
import OTPVerify from "./auth/OTPVerify.jsx";
import PinCreate from "./auth/PinCreate.jsx";
import ForgotPassword from "./auth/ForgotPassword.jsx";
import ResetPassword from "./auth/ResetPassword.jsx";
import VerifySuccess from "./auth/VerifySuccess.jsx";
import CreateGroup from "./auth/CreateGroup.jsx";
import GroupCode from "./auth/GroupCode.jsx";
import GroupInfo from "./auth/GroupInfo.jsx";
import Options from "./auth/Options.jsx";
import Option from "./auth/Option.jsx";
import CreateGroupTeacher from "./CreateGroup.jsx";
import ManageCourses from "./ManageCourses.jsx";
import CreateCourse from "./CreateCourse.jsx";
import NigeriaCurriculum from "./NigeriaCurriculum.jsx";
import ViewManagedCourse from "./ViewManagedCourse.jsx";
import CaseStudyResults from "./CaseStudyResults.jsx";
import EditCourse from './EditCourse';
import Docs from './Docs.jsx';
import Pin from "./auth/Pin.jsx";
import EditQuiz from "./EditQuiz.jsx";
import AddManual from "./AddManual.jsx";
import KYC from "./auth/KYC.jsx";
import Support from "./Support.jsx";
import Toolkit from "./Toolkit.jsx";
import Stats from "./Stats.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import TermsOfService from "./TermsOfService.jsx";
import Pricing from "./Pricing.jsx";

// Mapping of page names for Layout highlighting (optional)
const PAGES = {
  Home: "Home",
  HowToUse: "How To Use",
  About: "About",
  Chess: "Chess",
  Auth: "Login",
  Courses: "Courses",
};

// Helper to get current page from URL
function _getCurrentPage(url) {
  if (url.endsWith("/")) url = url.slice(0, -1);
  const lastPart = url.split("/").pop();
  return Object.keys(PAGES).find(
    (page) => page.toLowerCase() === lastPart.toLowerCase()
  ) || "Home";
}

// Wrapper to use useLocation inside Router
function PagesContent() {
  const location = useLocation();
  const currentPage = _getCurrentPage(location.pathname);

  // Track page views with analytics
  useAnalytics();

  return (
    <Layout currentPageName={currentPage}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/nigeria-curriculum" element={<NigeriaCurriculum />} />
        <Route path="/dashboard/nigeria-curriculum" element={<NigeriaCurriculum />} />
        <Route path="/about" element={<About />} />
        <Route path="/chess" element={<Chess />} />
        <Route path="/chess/game" element={<ChessGame />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CoursePreview />} />
        <Route path="/docs" element={<Docs />} />

        {/* Auth Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/groups" element={<Groups />} />
        <Route path="/dashboard/groups/join" element={<JoinGroup />} />
        <Route path="/dashboard/create_group" element={<CreateGroupTeacher />} />
        <Route path="/dashboard/quizzes" element={<Quizzes />} />
        <Route path="/dashboard/quizzes/details" element={<QuizDetails />} />
        <Route path="/dashboard/quizzes/start" element={<StartQuiz />} />
        <Route path="/dashboard/quizzes/completion" element={<QuizCompletion />} />
        <Route path="/dashboard/quizzes/result" element={<QuizResult />} />
        <Route path="/dashboard/teacher/groups" element={<TeacherGroupDetails />} />
        <Route path="/dashboard/quizzes/join" element={<JoinQuiz />} />
        <Route path="/dashboard/teacher/quizzes" element={<CreateQuiz />} />
        <Route path="/dashboard/teacher/editquiz" element={<EditQuiz />} />
        <Route path="/dashboard/teacher/add-manual" element={<AddManual />} />
        <Route path="/dashboard/teacher/question" element={<Questions />} />
        <Route path="/dashboard/teacher/draft" element={<Drafts />} />
        <Route path="/dashboard/teacher/ai-review" element={<AIReview />} />
        <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard/syllabus" element={<Syllabus />} />
        <Route path="/dashboard/teachers" element={<Teachers />} />
        <Route path="/dashboard/wallet" element={<Wallet />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/profile/edit" element={<UserProfile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/dashboard/toolkit" element={<Toolkit />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/price" element={<Pricing />} />

        {/* Course Directed Routes */}
        <Route path="/dashboard/courses" element={<ManageCourses />} />
        <Route path="/dashboard/courses/create" element={<CreateCourse />} />
        <Route path="/dashboard/courses/view/:courseId" element={<ViewManagedCourse />} />
        <Route path="/dashboard/courses/:courseId/case-study-results" element={<CaseStudyResults />} />
        <Route path="/dashboard/courses/edit/:courseId" element={<EditCourse />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/auth/start" element={<Start />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/alumni" element={<Alumni />} />
        <Route path="/auth/kyc" element={<KYC />} />
        <Route path="/auth/phone" element={<PhoneVerify />} />
        <Route path="/auth/otp" element={<OTPVerify />} />
        <Route path="/auth/otp_verify" element={<Pin />} />
        <Route path="/auth/pin" element={<PinCreate />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-success" element={<VerifySuccess />} />
        <Route path="/auth/create-group" element={<CreateGroup />} />
        <Route path="/auth/group" element={<GroupCode />} />
        <Route path="/auth/info" element={<GroupInfo />} />
        <Route path="/auth/options" element={<Options />} />
        <Route path="/auth/option" element={<Option />} />

        {/* Fallback for unknown routes */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <ScrollToTop />
      <PagesContent />
    </Router>
  );
}
