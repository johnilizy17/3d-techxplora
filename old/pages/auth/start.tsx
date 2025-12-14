import RightArrowIcon from "@/component/asset/RightArrowIcon";
import AuthLayout from "@/layout/AuthLayout";
import { COLORS } from "@/utils/theme";
import {
  Box,
  Button,
  Center,
  Image,
  Text,
  VStack,
  HStack,
  Circle,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Start() {

  const [display, setDisplay] = useState(0)
  const router = useRouter()
  const { user } = useSelector((a: { auth: { user: any } }) => a.auth)


  const startItems = [
    {
      title: "Play Quizzes",
      details: "Dive into interactive quizzes designed to be fun, challenging, and educational. Explore topics you love and discover new ones as you go."
    },
    {
      title: "Earn XP",
      details: "Gain experience points with every quiz you complete. The more you play, the more XP you collect — level up and unlock achievements!"
    },
    {
      title: "Climb the Leaderboard",
      details: "Compete with other players and see how high you can rank. Beat your friends, win streaks, and become the ultimate quiz champion."
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay((prev) => (prev + 1) % 3); // Cycles through 0, 1, 2
    }, 900); // 0.2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AuthLayout title="Start">
      <Box
        bg="white"
        borderRadius="lg"
        textAlign="center"
        minH="100vh"
        w="full"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        {startItems.map((a, b) => (<>
          <VStack w="full" display={display === b ? "flex" : "none"}>
            <Center w="full" h="300px" bgImage="url('/home/bg_home.png')" bgPos={"bottom"} bgRepeat={"no-repeat"} bgSize="cover">
              <Image
                src="/auth/start1.png" // Replace with actual path
                alt="Play Quizzes"
                boxSize="200px"
                objectFit={"contain"}
                mx="auto"
              />
            </Center>
            <Center flexDir={"column"} pr={4} pl={4}>
              <Text fontSize="30px" color={COLORS.light_black} fontFamily={"Poppins"} fontWeight="500" >
                {a.title}
              </Text>
              <Text fontSize="17px" w={"310px"} color={COLORS.gray} fontFamily={"Poppins"} mt={2}>

                {a.details}
              </Text>
            </Center>

            {/* Pagination Dots */}
            <HStack spaceX={2} mt={4}>
              <Circle size="2" bg={display === 0 ? COLORS.blue : COLORS.gray} />
              <Circle size="2" bg={display === 1 ? COLORS.blue : COLORS.gray} />
              <Circle size="2" bg={display === 2 ? COLORS.blue : COLORS.gray} />
            </HStack>
          </VStack>

          {/* Button */}
          <Center pb={6} mt={6} display={display === b ? "flex" : "none"}>
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
              borderRadius={"1234px"}
              onClick={() => user.accountable_type === "App\Models\Student"?router.push("/auth/option") : user && user.is_admin ? router.push("/dashboard/admin_code"): router.push("/dashboard")}
            >
              <Box mr="5px">
                Let's Go
              </Box>
              <RightArrowIcon />
            </Button>
          </Center>

        </>))}

      </Box>
    </AuthLayout>
  );
}
