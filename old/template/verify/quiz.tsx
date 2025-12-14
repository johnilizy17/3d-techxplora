import CopyIcon from "@/component/asset/CopyIcon";
import useCustomToast from "@/hooks/useCustomToast";
import { completeQuizCode } from "@/url/route/verification";
import { COLORS } from "@/utils/theme";
import {
  Box,
  Text,
  Flex,
  Avatar,
  VStack,
  HStack,
  Button,
  useClipboard,
  Card,
  CardBody,
  CardRoot,
  AvatarRoot,
  AvatarFallback,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function QuizVerify({ temporary, user }: { temporary: any, user: any }) {
  const { copied, copy } = useClipboard();

  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const showMessage = useCustomToast();
  const router = useRouter();

  useEffect(() => {
    // Function to update the screen height
    const updateHeight = () => {
      setScreenHeight(window.innerHeight);
    };

    // Set initial height
    updateHeight();

    // Update on resize
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  async function JoinQuiz() {
    try {
      setLoading(true)
      const quiz = await completeQuizCode({ student_id: user.id, quiz_id: temporary.id })
      showMessage("You have Successfully Joined Quiz.", 'success');
      router.push("/dashboard/quizzes")
      setLoading(false)
    } catch (err: any) {
      setLoading(false)
      showMessage(err?.message || 'Quiz failed', 'error');

    }
  }


  return (
    <Box>
      <CardRoot w="full" rounded="2xl" shadow="lg" p={4} bg="white">
        <CardBody>
          <VStack spaceX={4}>
            {/* Profile + Name */}
            <Center mb="20px" justifyContent={"space-between"} w="full">
              <AvatarRoot>
                <AvatarFallback name={temporary.title} bg="gray.300" />
              </AvatarRoot>
              <Text fontSize={["16px", "lg"]} textAlign={"end"} w={["250px", "auto"]} fontWeight="semibold" color="blue.700">
                {temporary.title}
              </Text>
            </Center>

            {/* Address */}
            <Text fontSize="sm" color="gray.600" textAlign="center">
              {temporary.description}
            </Text>

            {/* Stats */}
            <HStack justify="space-between" w="full" px={6} mt={2}>
              <VStack spaceX={0}>
                <Text fontSize="lg" fontWeight="bold">{temporary.QuizQuestions}</Text>
                <Text fontSize="xs" color="gray.500">Total Questions</Text>
              </VStack>
             </HStack>

            {/* Code */}
            <Flex
              justify="space-between"
              align="center"
              bg="purple.100"
              px={4}
              py={2}
              rounded="xl"
              w="full"
              mt={3}
            >
              <Text fontFamily="mono" color="purple.700">
                {temporary.quiz_code}
              </Text>
              <CopyIcon code={temporary.quiz_code} />
            </Flex>

            {/* Action */}
            <Text fontSize="xs" color="gray.500" textAlign="center" mt={3}>
              To begin, kindly continue to join the quiz
            </Text>
          </VStack>
        </CardBody>
      </CardRoot>
      <Center flexDir="column" mt={screenHeight > 600 ? "calc(100vh - 550px)" : "80px"} mb="34px">
        <Button
          onClick={() => JoinQuiz()}
          colorScheme="light"
          bg={COLORS.blue}
          w="full"
          maxW={"350px"}
          color={COLORS.white}
          fontWeight={"500"}
          fontFamily={"Poppins"}
          loading={loading}
          disabled={loading}
          fontSize={"16px"}
          type="submit"
          h="48px"
          borderRadius={"1234px"}
        >
          <Box mr="5px">
            Join
          </Box>
        </Button>
      </Center>

    </Box>
  );
}
