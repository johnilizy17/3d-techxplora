import QuestionUpload from "@/component/ai/QuestionUpload";
import DashboardLayout from "@/layout/DashboardLayout";
import React from "react";

export default function EditQuiz() {
    return (
        <DashboardLayout chat={true} title="Edit Quiz">
            <QuestionUpload />
        </DashboardLayout>
    );
}   