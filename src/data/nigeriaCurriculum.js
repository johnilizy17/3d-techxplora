import { School, Users, GraduationCap } from 'lucide-react';

// Metadata for UI rendering - icons, colors, titles
// All actual curriculum content comes from OpenRouter AI API
export const curriculumMetadata = {
    primary: {
        title: "Primary Education",
        subtitle: "Primary 1 - 6 (Ages 6-11)",
        color: "from-blue-500 to-cyan-500",
        icon: School
    },
    juniorSecondary: {
        title: "Junior Secondary School",
        subtitle: "JSS 1 - 3 (Ages 12-14)",
        color: "from-purple-500 to-pink-500",
        icon: Users
    },
    seniorSecondary: {
        title: "Senior Secondary School",
        subtitle: "SSS 1 - 3 (Ages 15-17)",
        color: "from-orange-500 to-red-500",
        icon: GraduationCap
    }
};
