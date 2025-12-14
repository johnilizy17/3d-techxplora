import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "@/layout/DashboardLayout";
import QuizzesBanner from "@/component/dashboardTeacher/QuizzesBanner";
import QuizzesRecent from "@/component/dashboardTeacher/QuizzesRecent";
import { allQuiz, allQuizData } from "@/url/redux/slices/techerSlice";

const MotionBox = motion(Box);

export default function Quiz() {
  const dispatch = useDispatch();
  const { quizzes } = useSelector((a: { teacher: { quizzes: any[] } }) => a.teacher);
  const { user } = useSelector((a: { auth: { user: any } }) => a.auth);

  // animation controls (same pattern as LoginInForm)
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });

    const type = user.accountable_type === "App\\Models\\Student" ? "student" : "teacher";

    // ✅ Only fetch quizzes if not already loaded
    if (!quizzes || quizzes.length === 0) {
      dispatch(allQuiz({ type: type, id: user.id }) as any);

      if (type === "teacher") {
        dispatch(allQuizData("") as any);
      }
    }
  }, [dispatch, user, quizzes, controls]);

  return (
    <DashboardLayout title="Home Dashboard">
      <Box mt="100px">
        <MotionBox
          initial={{ y: 100, opacity: 0 }} // only used once
          animate={controls} // controlled animation
          fontFamily={"Poppins"}
        >
          <QuizzesBanner />
        </MotionBox>

        <MotionBox
          initial={{ y: 100, opacity: 0 }}
          animate={controls}
          fontFamily={"Poppins"}
        >
          <QuizzesRecent data={quizzes} />
        </MotionBox>

        <Box h="50px" />
      </Box>
    </DashboardLayout>
  );
}
