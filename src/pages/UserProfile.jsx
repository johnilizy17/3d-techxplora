import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Loader2, Save, User, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useUpdateStudentProfileMutation } from '@/redux/api/studentApi';
import { useUpdateTeacherProfileMutation } from '@/redux/api/teacherApi';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { toast } from 'sonner';
import { nigeriaStates } from '@/data/nigeriaStates';
import { usaStates } from '@/data/usaStates';

export default function UserProfile() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [updateStudent, { isLoading: isStudentUpdating }] = useUpdateStudentProfileMutation();
    const [updateTeacher, { isLoading: isTeacherUpdating }] = useUpdateTeacherProfileMutation();

    const isTeacher = user?.accountable_type === "App\\Models\\Teacher" || user?.role === 'teacher';
    const isUpdating = isTeacher ? isTeacherUpdating : isStudentUpdating;

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        alternate_phone_number: '',
        country: '',
        state: '',
        lga: '',
        city: '',
        postal_code: '',
        date_of_birth: '',
        photo: ''
    });

    const [isUploading, setIsUploading] = useState(false);
    const [availableStates, setAvailableStates] = useState([]);
    const [availableLGAs, setAvailableLGAs] = useState([]);

    useEffect(() => {
        if (user) {
            // Handle different data structures from API
            let normalizedState = user.state || '';
            let normalizedCountry = user.country || '';
            
            // Normalize country name
            if (normalizedCountry) {
                const countryLower = normalizedCountry.toLowerCase();
                if (countryLower === 'nigeria') {
                    normalizedCountry = 'Nigeria';
                } else if (countryLower === 'usa' || countryLower === 'united states') {
                    normalizedCountry = 'USA';
                }
            }

            // Normalize state name to match dropdown options (proper case)
            if (normalizedState && normalizedCountry) {
                const countryLower = normalizedCountry.toLowerCase();
                if (countryLower === 'nigeria') {
                    const matchedState = nigeriaStates.find(s => s.name.toLowerCase() === normalizedState.toLowerCase());
                    if (matchedState) {
                        normalizedState = matchedState.name;
                    }
                } else if (countryLower === 'usa') {
                    const matchedState = usaStates.find(s => s.name.toLowerCase() === normalizedState.toLowerCase());
                    if (matchedState) {
                        normalizedState = matchedState.name;
                    }
                }
            }

            const userData = {
                ...user,
                first_name: user.first_name || user.name?.split(' ')[0] || user.fullname?.split(' ')[0] || '',
                last_name: user.last_name || user.name?.split(' ').slice(1).join(' ') || user.fullname?.split(' ').slice(1).join(' ') || '',
                email: user.email || '',
                phone_number: user.phone_number || user.mobile || user.phone || '',
                alternate_phone_number: user.alternate_phone_number || user.alternate_phone || '',
                country: normalizedCountry,
                state: normalizedState,
                lga: user.lga || '',
                city: user.city || user.address || '',
                postal_code: user.postal_code || '',
                date_of_birth: user.date_of_birth || '',
             };

            setFormData(userData);

            // Set available states based on country
            if (normalizedCountry) {
                const countryLower = normalizedCountry.toLowerCase();
                if (countryLower === 'nigeria') {
                    setAvailableStates(nigeriaStates.map(s => s.name));
                    
                    // Set available LGAs if state is already selected
                    if (normalizedState) {
                        const selectedState = nigeriaStates.find(s => s.name === normalizedState);
                        if (selectedState) {
                            setAvailableLGAs(selectedState.lgas);
                        }
                    }
                } else if (countryLower === 'usa') {
                    setAvailableStates(usaStates.map(s => s.name));
                    
                    // Set available LGAs/Counties if state is already selected
                    if (normalizedState) {
                        const selectedState = usaStates.find(s => s.name === normalizedState);
                        if (selectedState) {
                            setAvailableLGAs(selectedState.counties);
                        }
                    }
                }
            }
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle country change to update states
        if (name === 'country') {
            if (value === 'Nigeria') {
                setAvailableStates(nigeriaStates.map(s => s.name));
            } else if (value === 'USA') {
                setAvailableStates(usaStates.map(s => s.name));
            } else {
                setAvailableStates([]);
            }
            setAvailableLGAs([]);
            setFormData(prev => ({ ...prev, country: value, state: '', lga: '' })); // Reset state and LGA when country changes
            return; // Exit early to prevent duplicate state update
        }

        // Handle state change to update LGAs/Counties
        if (name === 'state') {
            if (formData.country === 'Nigeria') {
                const selectedState = nigeriaStates.find(s => s.name === value);
                if (selectedState) {
                    setAvailableLGAs(selectedState.lgas);
                } else {
                    setAvailableLGAs([]);
                }
            } else if (formData.country === 'USA') {
                const selectedState = usaStates.find(s => s.name === value);
                if (selectedState) {
                    setAvailableLGAs(selectedState.counties);
                } else {
                    setAvailableLGAs([]);
                }
            }
            setFormData(prev => ({ ...prev, state: value, lga: '' })); // Reset LGA when state changes
            return; // Exit early to prevent duplicate state update
        }

        // For all other fields
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const url = await uploadToCloudinary(file);
            setFormData(prev => ({ ...prev, photo: url }));
            toast.success("Avatar uploaded successfully");
        } catch (error) {
            toast.error("Failed to upload avatar");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Combine first and last name for the 'name' field if backend expects it, 
            // or send them separately if backend supports it. 
            // Based on template, it sends 'fullname' or creates it. 
            // The API endpoints usually expect specific fields. 
            // Assuming the backend handles 'name' or 'first_name'/'last_name' update via 'updateProfile' logic.
            // Let's construct a payload that matches common patterns.
            const payload = {
                ...formData,
                name: `${formData.first_name} ${formData.last_name}`.trim(),
                first_name: formData.first_name,
                last_name: formData.last_name,
                id: user.id,
                photo:formData.photo
            };

            if (isTeacher) {
                await updateTeacher(payload).unwrap();
            } else {
                await updateStudent(payload).unwrap();
            }
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to update profile");
            console.error(error);
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen relative pb-24 lg:pb-10">
                <div className="relative z-10 w-full max-w-4xl lg:px-10 mx-auto min-h-screen flex flex-col pt-8 lg:pt-12">
                    {/* Header */}
                    <div className="flex items-center gap-6 px-6 lg:px-0 mb-12">
                        <button onClick={() => navigate("/dashboard/profile")} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all text-white border border-white/10 shadow-xl group">
                            <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black uppercase tracking-tighter italic text-white leading-none">Edit Profile</h1>
                            <p className="text-[#a6b1ff] text-xs font-black uppercase tracking-[0.2em] mt-2">Manage your account details</p>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 lg:p-12 backdrop-blur-xl shadow-2xl mx-6 lg:mx-0 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a6b1ff]/5 rounded-full blur-[120px] pointer-events-none" />

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-12">

                            {/* Avatar Section */}
                            <div className="flex flex-col items-center justify-center space-y-6">
                                <div className="relative group">
                                    <Avatar className="w-32 h-32 lg:w-40 lg:h-40 border-4 border-white/10 shadow-2xl transition-all group-hover:border-[#a6b1ff]/50">
                                        <AvatarImage src={formData.photo || "https://github.com/shadcn.png"} className="object-cover" />
                                        <AvatarFallback className="bg-gradient-to-br from-[#1a1f4d] to-[#121431] text-white text-4xl font-black italic">
                                            {formData.first_name?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <label className={`absolute bottom-0 right-0 p-3 bg-white text-[#0a0a0a] rounded-2xl shadow-xl cursor-pointer hover:bg-[#a6b1ff] transition-colors border-4 border-[#0a0a0a] ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        {isUploading ? <Loader2 size={20} className="animate-spin" /> : <Camera size={20} />}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </label>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black text-white uppercase tracking-widest">Profile Photo</p>
                                    <p className="text-gray-600 dark:text-white/40 text-xs mt-1">Click the camera icon to update</p>
                                </div>
                            </div>

                            {/* Personal Info Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <User className="text-[#a6b1ff]" size={18} />
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Personal Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
                                    <InputField label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField label="Email Address" name="email" value={formData.email} onChange={handleChange} placeholder="Email" icon={Mail} readOnly className="opacity-60 cursor-not-allowed" />
                                    <InputField label="Phone Number" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" icon={Phone} />
                                    <InputField label="Alternate Phone" name="alternate_phone_number" value={formData.alternate_phone_number} onChange={handleChange} placeholder="Alternate Phone" icon={Phone} />
                                    <InputField label="Date of Birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} type="date" icon={Calendar} />
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="space-y-6 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3 mb-2">
                                    <MapPin className="text-[#a6b1ff]" size={18} />
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Location Details</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SelectField 
                                        label="Country" 
                                        name="country" 
                                        value={formData.country} 
                                        onChange={handleChange}
                                        options={['Nigeria', 'USA']}
                                        placeholder="Select Country"
                                    />
                                    <SelectField 
                                        label="State" 
                                        name="state" 
                                        value={formData.state} 
                                        onChange={handleChange}
                                        options={availableStates}
                                        placeholder="Select State"
                                        disabled={!formData.country}
                                    />
                                    <SelectField 
                                        label={formData.country === 'USA' ? 'County' : 'LGA'} 
                                        name="lga" 
                                        value={formData.lga} 
                                        onChange={handleChange}
                                        options={availableLGAs}
                                        placeholder={formData.country === 'USA' ? 'Select County' : 'Select LGA'}
                                        disabled={!formData.state}
                                    />
                                    <InputField label="City" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
                                    <InputField label="Postal Code" name="postal_code" value={formData.postal_code} onChange={handleChange} placeholder="Zip Code" />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-8 flex justify-end gap-4">
                                <Button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    variant="ghost"
                                    className="h-14 px-8 rounded-2xl text-gray-600 dark:text-white/60 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 font-black uppercase tracking-widest"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isUpdating || isUploading}
                                    className="h-14 px-10 bg-[#a6b1ff] text-[#0a0a0a] hover:bg-[#a6b1ff]/90 font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_rgba(166,177,255,0.3)] transition-all flex items-center gap-3"
                                >
                                    {isUpdating ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                                    Save Changes
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Helper Component for consistent input styling
const InputField = ({ label, icon: Icon, className = "", ...props }) => (
    <div className="space-y-2">
        <Label className="text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-widest ml-1">{label}</Label>
        <div className="relative">
            <Input
                {...props}
                className={`bg-gray-50 dark:bg-black/20 border-gray-300 dark:border-white/10 h-16 text-gray-900 dark:text-white rounded-2xl focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/10 px-6 text-base font-bold placeholder:text-gray-400 dark:placeholder:text-white/20 transition-all ${Icon ? 'pl-12' : ''} ${className}`}
            />
            {Icon && <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />}
        </div>
    </div>
);

// Helper Component for select dropdown
const SelectField = ({ label, options, className = "", disabled = false, placeholder = "Select...", ...props }) => (
    <div className="space-y-2">
        <Label className="text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-widest ml-1">{label}</Label>
        <select
            {...props}
            disabled={disabled}
            className={`bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-white/10 h-16 text-gray-900 dark:text-white rounded-2xl focus:border-[#a6b1ff] focus:ring-[#a6b1ff]/10 px-6 text-base font-bold transition-all w-full ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            style={{ 
                color: props.value ? undefined : 'rgba(128, 128, 128, 0.5)',
            }}
        >
            <option value="" className="bg-white dark:bg-[#0a0a0a] text-gray-400 dark:text-white/40">{placeholder}</option>
            {options.map((option) => (
                <option key={option} value={option} className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
                    {option}
                </option>
            ))}
        </select>
    </div>
);
