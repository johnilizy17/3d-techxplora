// components/GroupStatsCard.tsx
import { COLORS } from "@/utils/theme";
import { Box, Flex, Grid, Image, Separator, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CopyIcon from "../asset/CopyIcon";
import { getQuizStats } from "@/utils/constants";
import { useRouter } from "next/router";

export default function DashboardBanner() {

  const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
  const { resultStatics } = useSelector((a: { question: any }) => a.question)
  const { Group } = useSelector((a: { teacher: { Group: any } }) => a.teacher);
  const { quizzes } = useSelector((a: { teacher: { quizzes: any } }) => a.teacher)
  const router = useRouter();

  return (
    <Flex flexDir={{ base: "column", md: "row" }} justify="space-between" gap={4} px={{ base: 4, md: 16 }}>
      {/* Top Group Info Card */}
      <Flex
        bg="#4559A8"
        borderRadius="20px"
        _hover={{ transform: "scale(1.01)", transition: "0.2s ease" }}
        w="full"
        maxW={"450px"}
        h="122px"
        color="white"
        overflow="hidden"
        pos="relative"
        align="center"
        justify="space-between"
      >
        <Box p={4}>
          <Text fontWeight="600" fontSize="16px" lineHeight={"150%"} letterSpacing={"0.3px"}>
            {user.fullname}
          </Text>
          <Text fontSize="sm">{user.email}</Text>
          <Text display={"flex"} alignItems={"center"} gap="5px" mt="16px" fontSize="12px" color={COLORS.light_white} fontWeight={"400"} lineHeight={"150%"} letterSpacing={"0.3px"}>
            {user.is_admin  ? "Admin" : user.accountable_type === "App\\Models\\Teacher" ? "Teacher" : "Student"} •{" "}
            <Text color={COLORS.light_white} display={"flex"} alignItems={"center"} gap={"5px"} as="span" fontWeight="700" lineHeight={"150%"} letterSpacing={"0.3px"}>
              {user.accountable_type !== "App\\Models\\Teacher" ? user.category : user.is_admin && "Code:" + user.admin_code}{user.is_admin && <CopyIcon color={COLORS.light_white} code={user.admin_code} />}
            </Text>
          </Text>
        </Box>

        <Image
          src="/dashboard/star.png" // 🔁 Replace with actual illustration path
          alt="Group illustration"
          boxSize="40px"
          pos="absolute"
          top="5px"
          right={"65px"}
          objectFit="contain"
        />

        <Image
          src="/dashboard/character.png" // 🔁 Replace with actual illustration path
          alt="Group illustration"
          boxSize="140px"
          pos="absolute"
          bottom="-10px"
          right={"0px"}
          objectFit="contain"
        />
      </Flex>

      {/* Stats Grid */}
      <Box bg="#FCD9FF" borderWidth={"1px"} borderColor={COLORS.lighter_blue} _hover={{ transform: "scale(1.01)", transition: "0.2s ease" }} maxW={"450px"} w="full" h={"160px"} borderRadius="20px" p={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={4} textAlign="center">
          <Box cursor={"pointer"} onClick={() => router.push("/dashboard/quizzes")} borderRightWidth={"1px"} borderRightColor={COLORS.sky}>
            <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.lighter_blue} letterSpacing={"-0.6%"}>
              {quizzes ? quizzes.length : 0}
            </Text>
            <Text fontSize="12px" color={COLORS.gray} lineHeight={"20px"}>
              My Quizzes
            </Text>
          </Box>
          <Box cursor={"pointer"} onClick={() => user.accountable_type !== "App\\Models\\Teacher" && router.push("/dashboard/result")} borderRightWidth={"1px"} borderRightColor={COLORS.sky}>
            <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.lighter_blue} letterSpacing={"-0.6%"}>
              {resultStatics ? resultStatics.length : 0}
            </Text>
            <Text fontSize="12px" color={COLORS.gray} lineHeight={"20px"}>
              Attempted
            </Text>
          </Box>
          <Box cursor={"pointer"} onClick={() => router.push("/dashboard/quizzes")}>
            <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.lighter_blue} letterSpacing={"-0.6%"}>
              {getQuizStats(quizzes).ongoing}
            </Text>
            <Text fontSize="12px" color={COLORS.gray} lineHeight={"20px"}>
              Ongoing
            </Text>
          </Box>
        </Grid>
        <Box borderBottomColor={COLORS.sky} w="full" borderBottomWidth={"1px"} my={4} />
        <Grid templateColumns="repeat(3, 1fr)" gap={4} textAlign="center">

          <Box cursor={"pointer"} onClick={() => router.push("/dashboard/xp")} borderRightWidth={"1px"} borderRightColor={COLORS.sky}>
            <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.lighter_blue} letterSpacing={"-0.6%"}>
              0
            </Text>
            <Text fontSize="12px" color={COLORS.gray} lineHeight={"20px"}>
              XP Rating
            </Text>
          </Box>
          <Box cursor={"pointer"} onClick={() => router.push("/dashboard/group")} borderRightWidth={"1px"} borderRightColor={COLORS.sky}>
            <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.lighter_blue} letterSpacing={"-0.6%"}>
              {Group ? Group.length : 0}
            </Text>
            <Text fontSize="12px" color={COLORS.gray} lineHeight={"20px"}>
              Groups
            </Text>
          </Box>
          <Box cursor={"pointer"} onClick={() => router.push("/dashboard/quizzes")}>
            <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.lighter_blue} letterSpacing={"-0.6%"}>
              {getQuizStats(quizzes).expired}
            </Text>
            <Text fontSize="12px" color={COLORS.gray} lineHeight={"20px"}>
              Expired
            </Text>
          </Box>
        </Grid>
      </Box>
    </Flex>
  );
}
