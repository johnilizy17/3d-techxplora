import AIQuestionEdit from "@/component/ai/AIQuestionEdit";
import DashboardQuiz from "@/component/dashboard/DashboardQuiz";
import QuizzesBanner from "@/component/dashboardTeacher/QuizzesBanner";
import QuizzesRecent from "@/component/dashboardTeacher/QuizzesRecent";
import SelectionUploadType from "@/component/teacher/SelectUploadForm";
import DashboardLayout from "@/layout/DashboardLayout";
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
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";


export default function AiQuestion() {

    const MotionBox = motion(Box);
    const dispatch = useDispatch();

    return (
        <DashboardLayout chat={true} title="AI Question">
            <Box>
                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    zIndex={"2"}
                    fontFamily={"Poppins"}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <AIQuestionEdit />
                </MotionBox>
            </Box>
        </DashboardLayout>
    );
}
