// components/SchoolCard.js
import CopyIcon from "@/component/asset/CopyIcon";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Avatar,
    Text,
    Button,
    Flex,
    Stack,
    IconButton,
    useClipboard,
    Separator,
    AvatarRoot,
    AvatarImage,
    Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateGroupForm() {
    const referralCode = "2deffc0cb";
    const { copy, copied } = useClipboard();
    const [screenHeight, setScreenHeight] = useState<number>(0);
    const router = useRouter()

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


    return (
        <>
            <Box
                maxW="sm"
                mx="auto"
                mt={10}
                bg="white"
                borderRadius={"20px"}
                overflow="hidden"
                shadow="md"
                border="1px solid #E2E8F0"
            >
                <Flex p={6}
                    align="center" mb={4}>
                    <AvatarRoot w="58px" h="58px" mr={3}>
                        <AvatarImage
                            src="/leaderboard/p1.png" // Optional: replace with real image path
                        />
                    </AvatarRoot>

                    <Box>
                        <Text fontWeight="400" w="200px" fontSize="16px" color={COLORS.blue}>
                            ST Annes International Group of Schools
                        </Text>
                    </Box>
                </Flex>
                <Separator my="13px" />

                <Text px={6}
                    fontSize={"12px"} color={COLORS.gray} fontFamily={"Poppins"}>Address/Location</Text>
                <Text px={6}
                    fontSize="16px" color={COLORS.deep_black} mb={2}>
                    12 Adebayo Street, Victoria Island, Lagos, Nigeria
                </Text>

                <Flex px={6}
                    justify="space-between" mt={4} mb={4}>
                    <Box>
                        <Text fontSize="sm" color="gray.500">
                            Total Groups
                        </Text>
                        <Text fontWeight="bold">31</Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm" color="gray.500">
                            Total Members
                        </Text>
                        <Text fontWeight="bold">65k</Text>
                    </Box>
                </Flex>
                <Flex
                    mt={"16px"}
                    p={2}
                    color={COLORS.white}
                    bg={COLORS.purple}
                    justify="center"
                    align="center"
                >
                    <Text fontFamily="mono" fontSize="18px">
                        {referralCode}
                    </Text>
                    <IconButton
                        size="sm"
                        onClick={copy}
                        bg="transparent"
                        aria-label="Copy referral code"
                    >
                        <CopyIcon />
                    </IconButton>
                </Flex>
            </Box>
            <Center flexDir={"column"}>
                <Box maxW="sm" w="full"
                >
                    <Text textAlign="center" mt={6} mb={2} fontSize="sm" color="gray.500">
                        To begin, kindly continue to create <br /> your first group
                    </Text>

                    <Center mt={screenHeight > 700 ? "calc(100vh - 600px)" : "40px"} w="full" mb="50px">
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
                            onClick={()=>router.push("/dashboard/create_group")}
                            type="submit"
                            borderRadius={"1234px"}
                        >
                            <Box mr="5px">
                                Continue
                            </Box>
                            <RightArrowIcon />
                        </Button>
                    </Center>
                </Box>
            </Center>
        </>
    );
}
