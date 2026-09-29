import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Briefcase,
  BookOpen,
  Clock,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Rocket,
  Globe,
  ChevronDown,
  Loader2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import AuthLayout from "./auth/AuthLayout";
import { africanCountries } from "@/data/countries";
import { useSubmitBootcampApplicationMutation } from "@/redux/api/bootcampApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useLoginMutation } from "@/redux/api/authApi";

const STORAGE_KEY = "bootcamp_application_data";
const STEP_KEY = "bootcamp_application_step";

export default function BootcampApplication() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitApplication, { isLoading: isSubmitting }] = useSubmitBootcampApplicationMutation();

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem(STEP_KEY);
    return saved ? parseInt(saved) : 1;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      password: "",
      password_confirmation: "",
      institution: "",
      qualification: "",
      graduation_year: "",
      country: "",
      state: "",
      occupation: "",
      learning_track: "",
      weekly_hours: "",
      experience: "",
      motivation: "",
    };
  });

  const [errors, setErrors] = useState({});
  const [availableStates, setAvailableStates] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  useEffect(() => {
    if (formData.country) {
      const countryData = africanCountries.find(c => c.name === formData.country);
      if (countryData) {
        setAvailableStates(countryData.states);
      } else {
        setAvailableStates([]);
      }
    } else {
      setAvailableStates([]);
      if (formData.state) {
        setFormData(prev => ({ ...prev, state: "" }));
      }
    }
  }, [formData.country]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    localStorage.setItem(STEP_KEY, currentStep.toString());
  }, [formData, currentStep]);

  const learningTracks = [
    "Data Literacy",
    "Data Analytics",
    "Artificial Intelligence",
    "Python Programming",
    "SQL & Databases",
    "Excel Mastery",
    "Data Visualization",
    "Business Intelligence",
    "Machine Learning",
    "Career Readiness",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.full_name.trim()) newErrors.full_name = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
      else if (!/[A-Z]/.test(formData.password)) newErrors.password = "Must contain uppercase letter";
      else if (!/[a-z]/.test(formData.password)) newErrors.password = "Must contain lowercase letter";
      else if (!/[0-9]/.test(formData.password)) newErrors.password = "Must contain a number";
      if (!formData.password_confirmation) newErrors.password_confirmation = "Please confirm password";
      else if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = "Passwords don't match";
      }
    } else if (step === 2) {
      if (!formData.institution.trim()) newErrors.institution = "Institution is required";
      if (!formData.qualification) newErrors.qualification = "Qualification is required";
      if (!formData.graduation_year) newErrors.graduation_year = "Graduation year is required";
    } else if (step === 3) {
      if (!formData.country.trim()) newErrors.country = "Country is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";
    } else if (step === 4) {
      if (!formData.learning_track) newErrors.learning_track = "Learning track is required";
      if (!formData.weekly_hours) newErrors.weekly_hours = "Weekly hours is required";
      if (!formData.experience) newErrors.experience = "Experience level is required";
    } else if (step === 5) {
      if (!formData.motivation.trim()) newErrors.motivation = "Motivation essay is required";
      else if (formData.motivation.length < 500) {
        newErrors.motivation = `Please write at least 500 characters (${formData.motivation.length}/500)`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 6));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    try {
      const response2 = await submitApplication(formData).unwrap();

      // Auto-login: Save credentials to Redux if user was created
      if (response2.data?.token && response2.data?.user) {
        const response = await login({
          ...formData
        }).unwrap();

        // Save credentials to Redux
        dispatch(setCredentials({
          user: response.data.user || response.data,
          token: response.data.token,
        }));
      }

      toast({
        title: "Application Submitted! 🎉",
        description: response2.message || "We'll review your application and get back to you within 2 weeks.",
      });

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STEP_KEY);

      setTimeout(() => {
        navigate("/dashboard/bootcamp");
      }, 2000);
    } catch (error) {
      console.error("Application submission error:", error);
      const errorMessage = error?.data?.message || error?.message || "Failed to submit application";
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const progress = (currentStep / 6) * 100;

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <div
                key={step}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-500",
                  currentStep >= step ? "bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]" : "bg-white/20"
                )}
              />
            ))}
          </div>
          <div className="mx-auto w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-3xl mb-2">
            {currentStep === 1 && "📝"}
            {currentStep === 2 && "🎓"}
            {currentStep === 3 && "📍"}
            {currentStep === 4 && "🎯"}
            {currentStep === 5 && "✨"}
            {currentStep === 6 && "✅"}
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Bootcamp Application</h2>
          <p className="text-gray-400">Step {currentStep} of 6 • {Math.round(progress)}% Complete</p>
          
          {/* Sign in link */}
          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/auth/login")}
                className="text-[#4ADE80] hover:text-[#22c55e] font-semibold underline underline-offset-2 transition-colors"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4ADE80] to-[#22c55e]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
          <div className="absolute -inset-1 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-[#4ADE80]/10 to-transparent" />
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && <Step1 formData={formData} handleInputChange={handleInputChange} errors={errors} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} />}
                {currentStep === 2 && <Step2 formData={formData} handleInputChange={handleInputChange} errors={errors} />}
                {currentStep === 3 && <Step3 formData={formData} handleInputChange={handleInputChange} errors={errors} availableStates={availableStates} />}
                {currentStep === 4 && <Step4 formData={formData} handleInputChange={handleInputChange} errors={errors} learningTracks={learningTracks} />}
                {currentStep === 5 && <Step5 formData={formData} handleInputChange={handleInputChange} errors={errors} />}
                {currentStep === 6 && <Step6 formData={formData} setCurrentStep={setCurrentStep} />}
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-4 mt-8">
              {currentStep > 1 && currentStep < 6 && (
                <Button onClick={handleBack} variant="outline" className="flex-1 h-14 bg-black/40 border-white/10 text-white hover:bg-black/60 rounded-xl">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>
              )}
              {currentStep < 5 && (
                <Button onClick={handleNext} className={cn("h-14 bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all", currentStep === 1 ? "flex-1" : "flex-1")}>
                  Next Step
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              {currentStep === 5 && (
                <Button onClick={handleNext} className="flex-1 h-14 bg-[#4ADE80] hover:bg-[#22c55e] text-[#022c22] font-bold rounded-xl shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] transition-all">
                  Review Application
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              {currentStep === 6 && (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 h-14 bg-gradient-to-r from-[#4ADE80] to-[#22c55e] text-[#022c22] font-black text-lg rounded-xl hover:scale-[1.02] transition-all shadow-[0_4px_0_#15803d] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? <Loader2 className="w-6 h-6 mr-2 animate-spin" /> : <Rocket className="w-6 h-6 mr-2" />}
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm">Your data is auto-saved. You can continue later.</p>
        
        {/* Sign in link at bottom */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              className="text-[#4ADE80] hover:text-[#22c55e] font-semibold underline underline-offset-2 transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

function Step1({ formData, handleInputChange, errors, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Personal Information</h3>
        <p className="text-gray-400">Tell us about yourself</p>
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Full Name</Label>
        <div className="relative group">
          <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors" />
          <Input value={formData.full_name} onChange={(e) => handleInputChange("full_name", e.target.value)} placeholder="John Doe" className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-xl transition-all" />
        </div>
        {errors.full_name && <p className="text-xs text-red-400 ml-1">{errors.full_name}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Email Address</Label>
        <div className="relative group">
          <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors" />
          <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} placeholder="john@example.com" className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-xl transition-all" />
        </div>
        {errors.email && <p className="text-xs text-red-400 ml-1">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Phone Number</Label>
        <div className="relative group">
          <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors" />
          <Input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} placeholder="+234 800 000 0000" className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-xl transition-all" />
        </div>
        {errors.phone && <p className="text-xs text-red-400 ml-1">{errors.phone}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Gender</Label>
        <select value={formData.gender} onChange={(e) => handleInputChange("gender", e.target.value)} className="w-full h-12 px-4 bg-black/30 border border-white/10 text-white rounded-xl focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] transition-all">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="text-xs text-red-400 ml-1">{errors.gender}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Password</Label>
        <div className="relative group">
          <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors" />
          <Input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} placeholder="••••••••" className="pl-12 pr-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-xl transition-all" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors">
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400 ml-1">{errors.password}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Confirm Password</Label>
        <div className="relative group">
          <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors" />
          <Input type={showConfirmPassword ? "text" : "password"} value={formData.password_confirmation} onChange={(e) => handleInputChange("password_confirmation", e.target.value)} placeholder="••••••••" className="pl-12 pr-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-xl transition-all" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition-colors">
            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password_confirmation && <p className="text-xs text-red-400 ml-1">{errors.password_confirmation}</p>}
      </div>
    </div>
  );
}

function Step2({ formData, handleInputChange, errors }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-4">
          <GraduationCap className="w-8 h-8 text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Education</h2>
        <p className="text-slate-400">Your academic background</p>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Institution</Label>
        <div className="relative">
          <BookOpen className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <Input value={formData.institution} onChange={(e) => handleInputChange("institution", e.target.value)} placeholder="University of Lagos" className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500 rounded-xl" />
        </div>
        {errors.institution && <p className="text-sm text-red-400">{errors.institution}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Highest Qualification</Label>
        <select value={formData.qualification} onChange={(e) => handleInputChange("qualification", e.target.value)} className="w-full h-12 px-4 bg-black/30 border border-white/10 text-white rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
          <option value="">Select qualification</option>
          <option value="High School">High School</option>
          <option value="Diploma">Diploma</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="PhD">PhD</option>
          <option value="Other">Other</option>
        </select>
        {errors.qualification && <p className="text-sm text-red-400">{errors.qualification}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Graduation Year</Label>
        <Input type="number" value={formData.graduation_year} onChange={(e) => handleInputChange("graduation_year", e.target.value)} placeholder="2024" min="1950" max="2030" className="h-12 bg-black/30 border-white/10 text-white placeholder:text-slate-500 focus:border-purple-500 rounded-xl" />
        {errors.graduation_year && <p className="text-sm text-red-400">{errors.graduation_year}</p>}
      </div>
    </div>
  );
}

function Step3({ formData, handleInputChange, errors, availableStates }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Location</h3>
        <p className="text-gray-400">Where are you based?</p>
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Country</Label>
        <div className="relative group">
          <Globe className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors z-10 pointer-events-none" />
          <ChevronDown className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
          <select value={formData.country} onChange={(e) => handleInputChange("country", e.target.value)} className="w-full pl-12 pr-12 h-12 bg-black/30 border border-white/10 text-white rounded-xl focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] transition-all appearance-none cursor-pointer">
            <option value="">Select your country</option>
            {africanCountries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        {errors.country && <p className="text-xs text-red-400 ml-1">{errors.country}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">State/Region</Label>
        <div className="relative group">
          <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors z-10 pointer-events-none" />
          <ChevronDown className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
          <select value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} disabled={!formData.country} className="w-full pl-12 pr-12 h-12 bg-black/30 border border-white/10 text-white rounded-xl focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] transition-all appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
            <option value="">{formData.country ? "Select state/region" : "Select country first"}</option>
            {availableStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        {errors.state && <p className="text-xs text-red-400 ml-1">{errors.state}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-gray-400 ml-1">Current Occupation</Label>
        <div className="relative group">
          <Briefcase className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#4ADE80] transition-colors" />
          <Input value={formData.occupation} onChange={(e) => handleInputChange("occupation", e.target.value)} placeholder="Student / Developer / Analyst" className="pl-12 h-12 bg-black/30 border-white/10 text-white placeholder:text-gray-500 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] rounded-xl transition-all" />
        </div>
        {errors.occupation && <p className="text-xs text-red-400 ml-1">{errors.occupation}</p>}
      </div>
    </div>
  );
}

function Step4({ formData, handleInputChange, errors, learningTracks }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
          <Trophy className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Learning Journey</h2>
        <p className="text-slate-400">Your learning goals</p>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Preferred Learning Track</Label>
        <select value={formData.learning_track} onChange={(e) => handleInputChange("learning_track", e.target.value)} className="w-full h-12 px-4 bg-black/30 border border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500">
          <option value="">Select a learning track</option>
          {learningTracks.map((track) => (
            <option key={track} value={track}>
              {track}
            </option>
          ))}
        </select>
        {errors.learning_track && <p className="text-sm text-red-400">{errors.learning_track}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Weekly Learning Hours</Label>
        <div className="relative">
          <Clock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <select value={formData.weekly_hours} onChange={(e) => handleInputChange("weekly_hours", e.target.value)} className="w-full pl-12 h-12 bg-black/30 border border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500">
            <option value="">How many hours can you commit?</option>
            <option value="1-5 hours">1-5 hours per week</option>
            <option value="5-10 hours">5-10 hours per week</option>
            <option value="10-20 hours">10-20 hours per week</option>
            <option value="20+ hours">20+ hours per week</option>
          </select>
        </div>
        {errors.weekly_hours && <p className="text-sm text-red-400">{errors.weekly_hours}</p>}
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Learning Experience</Label>
        <select value={formData.experience} onChange={(e) => handleInputChange("experience", e.target.value)} className="w-full h-12 px-4 bg-black/30 border border-white/10 text-white rounded-xl focus:border-green-500 focus:ring-1 focus:ring-green-500">
          <option value="">Select your experience level</option>
          <option value="beginner">Beginner - Just starting out</option>
          <option value="intermediate">Intermediate - Some experience</option>
          <option value="advanced">Advanced - Confident with concepts</option>
        </select>
        {errors.experience && <p className="text-sm text-red-400">{errors.experience}</p>}
      </div>
    </div>
  );
}

function Step5({ formData, handleInputChange, errors }) {
  const charCount = formData.motivation.length;
  const minChars = 500;
  const isValid = charCount >= minChars;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-4">
          <Sparkles className="w-8 h-8 text-orange-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Why You?</h2>
        <p className="text-slate-400">Tell us your story</p>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-300">Why do you deserve this bootcamp opportunity?</Label>
        <textarea value={formData.motivation} onChange={(e) => handleInputChange("motivation", e.target.value)} placeholder="Share your passion for data science, your goals, and how this bootcamp will help you achieve them..." rows={10} className="w-full p-4 bg-black/30 border border-white/10 text-white placeholder:text-slate-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl resize-none" />
        <div className="flex justify-between items-center">
          <p className={cn("text-sm", isValid ? "text-green-400" : "text-slate-400")}>
            {charCount} / {minChars} characters {isValid && "✓"}
          </p>
          {!isValid && <p className="text-sm text-orange-400">{minChars - charCount} more needed</p>}
        </div>
        {errors.motivation && <p className="text-sm text-red-400">{errors.motivation}</p>}
      </div>
    </div>
  );
}

function Step6({ formData, setCurrentStep }) {
  const sections = [
    {
      title: "Personal Information",
      step: 1,
      items: [
        { label: "Full Name", value: formData.full_name },
        { label: "Email", value: formData.email },
        { label: "Phone", value: formData.phone },
        { label: "Gender", value: formData.gender },
      ],
    },
    {
      title: "Education",
      step: 2,
      items: [
        { label: "Institution", value: formData.institution },
        { label: "Qualification", value: formData.qualification },
        { label: "Graduation Year", value: formData.graduation_year },
      ],
    },
    {
      title: "Location",
      step: 3,
      items: [
        { label: "Country", value: formData.country },
        { label: "State", value: formData.state },
        { label: "Occupation", value: formData.occupation },
      ],
    },
    {
      title: "Learning Information",
      step: 4,
      items: [
        { label: "Learning Track", value: formData.learning_track },
        { label: "Weekly Hours", value: formData.weekly_hours },
        { label: "Experience", value: formData.experience },
      ],
    },
    {
      title: "Motivation",
      step: 5,
      items: [{ label: "Essay", value: formData.motivation, multiline: true }],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Review Your Application</h2>
        <p className="text-slate-400">Make sure everything is correct</p>
      </div>
      {sections.map((section) => (
        <div key={section.title} className="p-6 bg-black/20 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">{section.title}</h3>
            <button onClick={() => setCurrentStep(section.step)} className="text-sm text-cyan-400 hover:text-cyan-300 underline">
              Edit
            </button>
          </div>
          <div className="space-y-3">
            {section.items.map((item) => (
              <div key={item.label}>
                <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                <p className={cn("text-white", item.multiline && "whitespace-pre-wrap")}>
                  {item.value || "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
        <p className="text-sm text-cyan-300 text-center">
          By submitting, you agree that all information provided is accurate and complete.
        </p>
      </div>
    </div>
  );
}
