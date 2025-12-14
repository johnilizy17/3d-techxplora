import DashboardQuiz from "@/component/dashboard/DashboardQuiz";
import QuizzesBanner from "@/component/dashboardTeacher/QuizzesBanner";
import QuizzesRecent from "@/component/dashboardTeacher/QuizzesRecent";
import QuizStat from "@/component/quiz/QuizStat";
import SelectionUploadType from "@/component/teacher/SelectUploadForm";
import DashboardLayout from "@/layout/DashboardLayout";
import { getSyllabus } from "@/url/redux/slices/questionSlice";
import { allQuiz, allQuizData } from "@/url/redux/slices/techerSlice";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Heading,
    Input,
    InputGroup,
    Separator,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";


export default function TeacherQuiz() {

    const MotionBox = motion(Box);
    const dispatch = useDispatch();
    const router = useRouter();
    const { quizzes } = useSelector((a: { teacher: { quizzes: any[] } }) => a.teacher);
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const { questions } = useSelector((a: { question: any }) => a.question)
    const [loading, setLoading] = useState(true);
    // animation controls (same pattern as LoginInForm)
    const controls = useAnimation();


    useEffect(() => {
        if (quizzes.length === 0) {
            router.back()
        }
        controls.start({ y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });
       dispatch(getSyllabus("") as any)
    }, []);


    return (
        <DashboardLayout title="Home Dashboard">
            <Box>
                {questions.length < 1 || !questions || loading ?
                    <SelectionUploadType loading={loading} setLoading={setLoading} />
                    :
                    <QuizStat />
                }
            </Box>
        </DashboardLayout>
    );
}
