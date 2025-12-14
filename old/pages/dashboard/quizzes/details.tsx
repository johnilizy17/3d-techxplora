// components/QuizDetailCard.tsx
import DaimondIcon from "@/component/asset/DaimondIcon";
import DownloadIcon from "@/component/asset/DownloadIcon";
import LeftIcon from "@/component/asset/LeftIcon";
import LoveIcon from "@/component/asset/LoveIcon";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import QuizLeaderboard from "@/component/quiz/LeaderBoard";
import QuizMetaInfo from "@/component/quiz/QuizDate";
import QuizTime from "@/component/quiz/QuizTime";
import CloseLayout from "@/layout/CloseLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { ShareModel } from "@/template/model/ShareModel";
import { setKYC, setTemporaryStorage } from "@/url/redux/slices/authSlice";
import { getQuestion } from "@/url/redux/slices/questionSlice";
import { getQuizLeaderBoard, getUserByQuiz, verifyQroupCode, verifyQuizCode } from "@/url/route/verification";
import { hasDatePassed, studentExists } from "@/utils/constants";
import { startCountdown } from "@/utils/date";
import ReadMore from "@/utils/ReadMore";
import { COLORS } from "@/utils/theme";
import {
  Box,
  Flex,
  Text,
  Icon,
  AvatarGroup,
  Avatar,
  Button,
  Badge,
  Image,
  VStack,
  HStack,
  Center,
  IconButton,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const QuizDetailCard = () => {

  const router = useRouter();
  const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
  const { questions } = useSelector((a: { question: any }) => a.question)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [people, setPeople] = useState([])
  const [quizBoard, setQuizBoard] = useState([])
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    if (temporary.start_at) {
      startCountdown(temporary.start_at, setTime)
    }
  }, [temporary.start_at])

  async function QuizDetails() {
    setLoading(true)
    if (router.query && router.query.code) {
      const { data } = await verifyQuizCode(router.query.code)
      dispatch(setTemporaryStorage(data) as any)
      dispatch(getQuestion(data.id) as any)
      const quiz = await getUserByQuiz(router.query.code)
      const leader = await getQuizLeaderBoard(router.query.code)
      setQuizBoard(leader)
      setPeople(quiz)
      setLoading(false)
    }

  }

  useEffect(() => {
    QuizDetails()
  }, [router.query && router.query.code])


  return (
    <DashboardLayout chat={true} title="Quiz Details">
      <CloseLayout>
        {loading || !temporary.end_at ?
          <Spinner size={"xl"} color={COLORS.blue} />
          : !hasDatePassed(temporary.end_at) ? <>
            <Box px={4} mt="100px" w="full" fontFamily={"Poppins"}>
              <Center onClick={() => router.back()} justifyContent={"start"}>
                <LeftIcon />
                <Text ml="23px" fontWeight="700" color={COLORS.lighter_blue} fontSize={["16px", "18px"]} fontFamily={"Poppins"}>
                  {temporary.title}
                </Text>
              </Center>
              <Text mt="8px" fontSize={["14px", "16px"]} color={COLORS.gray} mb={3}>
                Code: {temporary.quiz_code}
              </Text>

              {/* Quiz Image Card */}
              <Box
                borderRadius="xl"
                overflow="hidden"
                h="269px"
                position="relative"
                bgImage="url('/dashboard/quiz.jpg')" bgPos={"bottom"} bgRepeat={"no-repeat"} bgSize="cover"
                p={4}
                pos="relative"
              >
                {/* Overlay Content */}
                <Flex justify="space-between" align="start" mb={3}>
                  <Center justifyContent={"space-between"} w="full">
                    <Center bg={"rgba(255, 255, 255, 0.32)"} borderRadius={"100px"} h="38px" w="84px" gap={1}>
                      <DaimondIcon />
                      <Text color="white" fontWeight="bold" fontSize="sm">
                        {temporary.xp}
                      </Text>
                    </Center>
                    <Center>
                      <IconButton mr={4} bg={"white"} h="40px" w="40px" borderRadius={"40px"} aria-label="Download">
                        <ShareModel shareUrl={`/dashboard/quizzes/start?code=${router.query.code}`} />
                      </IconButton>
                      <IconButton bg={"white"} h="40px" w="40px" borderRadius={"40px"} aria-label="Love">
                        <LoveIcon />
                      </IconButton>
                    </Center>
                  </Center>
                </Flex>
                <QuizTime temporary={temporary} />
              </Box>

              {/* Quiz Info */}
              <Box mt={"24px"}>
                <Text fontWeight="700" color={COLORS.lighter_blue} fontSize={["20px", "24px"]}>
                  {temporary.title}
                </Text>
                <ReadMore temporary={temporary} />
                <Separator my={4} />
                <QuizMetaInfo people={people} />
              </Box>

              <Center mt="74px" mb="20px">
                {!hasDatePassed(temporary.start_at) ?
                  <Text fontSize={["18px", "24px"]} color={COLORS.deep_purple}>
                    Starting in {time}
                  </Text>
                  : hasDatePassed(temporary.end_at) ?
                    <Text fontSize={["10px", "12px"]} color={COLORS.red}>
                      this quiz is Closed
                    </Text>
                    : temporary.QuizQuestions > 0 ?
                      <Button
                        colorScheme="light"
                        bg={COLORS.blue}
                        w="full"
                        maxW={"350px"}
                        color={COLORS.white}
                        fontWeight={"500"}
                        fontFamily={"Poppins"}
                        fontSize={"16px"}
                        h="48px"
                        onClick={() => !user.state ? dispatch(setKYC(true)) : studentExists(people, user.id) ? router.push(`/dashboard/quizzes/result?code=${router.query.code}`) : router.push(`/dashboard/quizzes/start?code=${router.query.code}`)}
                        type="submit"
                        borderRadius={"1234px"}
                      >
                        <Box mr="5px">
                          {studentExists(people, user.id) ? "View Report" : "Let's Go"}
                        </Box>
                        <RightArrowIcon />
                      </Button>
                      :
                      <Text fontSize={["13px", "20px"]} color={COLORS.deep_purple}>
                        No Question is Attach to this quiz
                      </Text>
                }
              </Center>
            </Box>
          </>
            :
            <QuizLeaderboard quizBoard={quizBoard} />
        }
      </CloseLayout>
    </DashboardLayout>
  );
};

export default QuizDetailCard;
