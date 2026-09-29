import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Briefcase,
  BookOpen,
  Clock,
  Trophy,
  Sparkles,
  ChevronDown,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { africanCountries } from "@/data/countries";
import { useSubmitBootcampApplicationForUserMutation } from "@/redux/api/bootcampApi";

const LEARNING_TRACKS = [
  "Data Analytics",
  "Excel Mastery",
  "Business Intelligence",
  "Data Visualization",
  "SQL & Databases",
];

const QUALIFICATIONS = [
  "High School",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Other",
];

const WEEKLY_HOURS = [
  "1-5 hours",
  "6-10 hours",
  "11-15 hours",
  "16-20 hours",
  "20+ hours",
];

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner - I'm just starting" },
  { value: "intermediate", label: "Intermediate - I have some experience" },
  { value: "advanced", label: "Advanced - I'm quite experienced" },
];

export default function BootcampApply() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  
  const [submitApplication, { isLoading: isSubmitting }] = useSubmitBootcampApplicationForUserMutation();

  const [formData, setFormData] = useState({
    institution: "",
    qualification: "",
    graduation_year: new Date().getFullYear(),
    country: "",
    state: "",
    occupation: "",
    learning_track: "",
    weekly_hours: "",
    experience: "beginner",
    motivation: "",
  });

  const [errors, setErrors] = useState({});
  const [statesData, setStatesData] = useState([]);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please log in to apply");
      navigate("/auth");
    }
  }, [user, navigate]);

  // Get states when country changes
  useEffect(() => {
    if (formData.country) {
      const country = africanCountries.find((c) => c.name === formData.country);
      setStatesData(country?.states || []);
      if (formData.state && !country?.states?.includes(formData.state)) {
        setFormData((prev) => ({ ...prev, state: "" }));
      }
    } else {
      setStatesData([]);
    }
  }, [formData.country, formData.state]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.institution.trim()) newErrors.institution = "Institution is required";
    if (!formData.qualification) newErrors.qualification = "Qualification is required";
    if (!formData.graduation_year || formData.graduation_year < 1950 || formData.graduation_year > 2030) {
      newErrors.graduation_year = "Valid graduation year required";
    }
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required";
    if (!formData.learning_track) newErrors.learning_track = "Learning track is required";
    if (!formData.weekly_hours) newErrors.weekly_hours = "Weekly commitment is required";
    if (!formData.experience) newErrors.experience = "Experience level is required";
    if (formData.motivation.trim().length < 100) {
      newErrors.motivation = "Motivation must be at least 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    try {
      const response = await submitApplication(formData).unwrap();

      if (response.success) {
        toast.success(response.message || "Application submitted successfully!");
        navigate("/dashboard/bootcamp");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error(error?.data?.message || "Failed to submit application. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white dark:bg-black relative py-8 px-4 sm:px-6 lg:px-8">
        {/* Visual Background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/20 dark:bg-green-600/5 rounded-full blur-[120px] pointer-events-none" style={{ marginRight: '-16rem', marginTop: '-16rem' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-200/20 dark:bg-emerald-600/5 rounded-full blur-[100px] pointer-events-none" style={{ marginLeft: '-10rem', marginBottom: '-10rem' }} />

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-[#4ADE80]" />
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Bootcamp Application
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-foreground mb-3 italic tracking-tight">
              Join Our <span className="text-[#4ADE80]">Bootcamp</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete this application to join our intensive bootcamp program and accelerate your learning journey.
            </p>
          </motion.div>

          {/* Application Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl space-y-8"
          >
            {/* Section 1: Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <GraduationCap className="w-5 h-5 text-[#4ADE80]" />
                <h2 className="text-xl font-black text-foreground italic">Education Background</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="institution" className="font-bold text-foreground">
                    Institution/School <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleChange("institution", e.target.value)}
                    placeholder="e.g., University of Lagos"
                    className={cn(
                      "bg-background border-2",
                      errors.institution ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                    )}
                  />
                  {errors.institution && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.institution}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualification" className="font-bold text-foreground">
                    Highest Qualification <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="qualification"
                      value={formData.qualification}
                      onChange={(e) => handleChange("qualification", e.target.value)}
                      className={cn(
                        "w-full bg-background border-2 rounded-md px-3 py-2 text-foreground appearance-none cursor-pointer",
                        errors.qualification ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                      )}
                    >
                      <option value="">Select qualification</option>
                      {QUALIFICATIONS.map((qual) => (
                        <option key={qual} value={qual}>
                          {qual}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.qualification && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.qualification}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduation_year" className="font-bold text-foreground">
                    Graduation Year <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="graduation_year"
                    type="number"
                    min="1950"
                    max="2030"
                    value={formData.graduation_year}
                    onChange={(e) => handleChange("graduation_year", parseInt(e.target.value))}
                    className={cn(
                      "bg-background border-2",
                      errors.graduation_year ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                    )}
                  />
                  {errors.graduation_year && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.graduation_year}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Location */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <MapPin className="w-5 h-5 text-[#4ADE80]" />
                <h2 className="text-xl font-black text-foreground italic">Location</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="country" className="font-bold text-foreground">
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className={cn(
                        "w-full bg-background border-2 rounded-md px-3 py-2 text-foreground appearance-none cursor-pointer",
                        errors.country ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                      )}
                    >
                      <option value="">Select country</option>
                      {africanCountries.map((country) => (
                        <option key={country.code} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.country && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.country}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state" className="font-bold text-foreground">
                    State/Region <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      disabled={!formData.country}
                      className={cn(
                        "w-full bg-background border-2 rounded-md px-3 py-2 text-foreground appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                        errors.state ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                      )}
                    >
                      <option value="">Select state</option>
                      {statesData.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.state && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Current Status */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Briefcase className="w-5 h-5 text-[#4ADE80]" />
                <h2 className="text-xl font-black text-foreground italic">Current Status</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation" className="font-bold text-foreground">
                  Current Occupation <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  placeholder="e.g., Student, Working Professional, Job Seeker"
                  className={cn(
                    "bg-background border-2",
                    errors.occupation ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                  )}
                />
                {errors.occupation && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.occupation}
                  </p>
                )}
              </div>
            </div>

            {/* Section 4: Learning Preferences */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <BookOpen className="w-5 h-5 text-[#4ADE80]" />
                <h2 className="text-xl font-black text-foreground italic">Learning Preferences</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="learning_track" className="font-bold text-foreground">
                    Preferred Track <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="learning_track"
                      value={formData.learning_track}
                      onChange={(e) => handleChange("learning_track", e.target.value)}
                      className={cn(
                        "w-full bg-background border-2 rounded-md px-3 py-2 text-foreground appearance-none cursor-pointer",
                        errors.learning_track ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                      )}
                    >
                      <option value="">Select track</option>
                      {LEARNING_TRACKS.map((track) => (
                        <option key={track} value={track}>
                          {track}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.learning_track && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.learning_track}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekly_hours" className="font-bold text-foreground">
                    Weekly Commitment <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="weekly_hours"
                      value={formData.weekly_hours}
                      onChange={(e) => handleChange("weekly_hours", e.target.value)}
                      className={cn(
                        "w-full bg-background border-2 rounded-md px-3 py-2 text-foreground appearance-none cursor-pointer",
                        errors.weekly_hours ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                      )}
                    >
                      <option value="">Select hours</option>
                      {WEEKLY_HOURS.map((hours) => (
                        <option key={hours} value={hours}>
                          {hours}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.weekly_hours && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.weekly_hours}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-foreground">
                  Experience Level <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <label
                      key={level.value}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        formData.experience === level.value
                          ? "border-[#4ADE80] bg-green-50 dark:bg-green-500/10"
                          : "border-border hover:border-[#4ADE80]/50"
                      )}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={level.value}
                        checked={formData.experience === level.value}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        className="w-4 h-4 text-[#4ADE80] focus:ring-[#4ADE80]"
                      />
                      <span className="text-sm font-semibold text-foreground">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 5: Motivation */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Trophy className="w-5 h-5 text-[#4ADE80]" />
                <h2 className="text-xl font-black text-foreground italic">Why Join?</h2>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation" className="font-bold text-foreground">
                  Tell us why you want to join this bootcamp <span className="text-red-500">*</span>
                </Label>
                <p className="text-xs text-muted-foreground">
                  Minimum 100 characters. Share your goals, aspirations, and what you hope to achieve.
                </p>
                <textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleChange("motivation", e.target.value)}
                  rows={6}
                  placeholder="Tell us about your learning goals, career aspirations, and why this bootcamp is right for you..."
                  className={cn(
                    "w-full bg-background border-2 rounded-md px-3 py-2 text-foreground resize-none",
                    errors.motivation ? "border-red-500" : "border-border focus:border-[#4ADE80]"
                  )}
                />
                <div className="flex justify-between items-center">
                  {errors.motivation ? (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.motivation}
                    </p>
                  ) : (
                    <p className={cn(
                      "text-xs",
                      formData.motivation.length < 100 ? "text-muted-foreground" : "text-green-500"
                    )}>
                      {formData.motivation.length} / 100 characters minimum
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gradient-to-r from-[#4ADE80] to-emerald-500 hover:from-[#4ADE80]/90 hover:to-emerald-500/90 text-white font-black text-lg rounded-xl shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting Application...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Sparkles className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </DashboardLayout>
  );
}
