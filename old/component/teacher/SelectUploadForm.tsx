import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Flex,
    Text,
    VStack,
    HStack,
    Icon,
    useDisclosure,
    Center,
    Spinner
} from "@chakra-ui/react";
import { FiHome, FiBriefcase, FiUpload, FiCpu, FiFileText, FiLayers } from "react-icons/fi";
import { COLORS } from "@/utils/theme";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Bulk from "@/pages/dashboard/teacher/bulk";
import { TopicAISelection } from "@/template/model/TopicAISelection";
import { verifyQuizCode } from "@/url/route/verification";
import { setTemporaryStorage } from "@/url/redux/slices/authSlice";
import { getAllStudentResult, getQuestion } from "@/url/redux/slices/questionSlice";

export default function SelectionUploadType({ loading, setLoading }: { loading: boolean, setLoading: (a: boolean) => void }) {
    const [selected, setSelected] = useState("business");
    const router = useRouter();
    const { open, onClose, onOpen } = useDisclosure()
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const dispatch = useDispatch();

    const cardStyles = (type: string) => ({
        borderWidth: "2px",
        borderColor: selected === type ? COLORS.blue : "gray.200",
        bg: selected === type ? "blue.50" : "white",
        cursor: "pointer",
        borderRadius: "lg",
        p: 4,
        transition: "all 0.2s",
        boxShadow: selected === type ? "md" : "sm",
        _hover: { borderColor: COLORS.lighter_blue },
    });

    async function QuizVerification() {
        try {
            setLoading(true)
            await dispatch(getQuestion(temporary.id) as any)
            await dispatch(getAllStudentResult(temporary.quiz_code) as any)
            setLoading(false)
        } catch (err: any) {

        }
    }
    useEffect(() => {
        QuizVerification()
    }, [])

    return (
        <>
            <Flex w="full" h="100vh" overflow={"hidden"}>
                {/* Left Section */}
                <Bulk onClose={onClose} onOpen={onOpen} open={open} />
                <Flex
                    w={"33%"}
                    bg={COLORS.blue}
                    display={["none", "none", "none", "block"]}
                    color="white"
                    direction="column"
                    justify="center"
                    align="flex-start"
                    p={10}
                >
                    <Box h="40px" w="20px" />
                    <Text fontSize="2xl" fontWeight="bold" mb={4} lineHeight="short">
                        Question Uploads
                    </Text>
                    <Text fontSize="sm" opacity={0.9} maxW="xs">
                        Select type and form of uploading....
                    </Text>
                    <HStack spaceX={2} mt={6}>
                        <Box w="10" h="1" bg="whiteAlpha.800" borderRadius="full" />
                        <Box w="6" h="1" bg="whiteAlpha.600" borderRadius="full" />
                        <Box w="4" h="1" bg="whiteAlpha.400" borderRadius="full" />
                    </HStack>
                </Flex>

                {/* Right Section */}
                <Box bg="gray.50" w="full">
                    <Box w="full" p="20px">
                        <Box w="full" mb={8}>
                            <Flex
                                w={12}
                                h={12}
                                mx="auto"
                                bg="green.100"
                                rounded="full"
                                align="center"
                                justify="center"
                            >
                                <Box w={2} h={2} bg={COLORS.blue} rounded="full" />
                            </Flex>
                            <Text fontSize="xl" fontWeight="semibold" mt={4}>
                                Choose the means of creating question
                            </Text>
                            <Text fontSize="sm" color="gray.500" mt={2}>
                                Select how you want to upload your quiz — import a file, paste questions, or create it manually.
                            </Text>
                        </Box>

                        {/* Options */}
                        {loading ?
                            <Center h="350px">
                                <Spinner size="xl" colorScheme={"revert"} />
                            </Center>
                            :
                            <VStack w={["full", "full", "full", "500px"]} spaceX={4}>
                                <Box
                                    w={["full", "full", "full", "500px"]} {...cardStyles("business")} onClick={() => {
                                        setSelected("business")
                                        setTimeout(() => {
                                            router.push(`/dashboard/teacher/manuel?code=${temporary.quiz_code}`)
                                        }, 500)
                                    }}>
                                    <HStack spaceX={4}>
                                        <Icon as={FiUpload} color={COLORS.blue} boxSize={5} />
                                        <Box textAlign="left">
                                            <Text fontWeight="semibold">Manual Upload of Question</Text>
                                            <Text fontSize="sm" color="gray.500">Write, paste, or create questions with answers for your students.
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                                <TopicAISelection setSelected={setSelected} selected={selected} />
                                <Box w={["full", "full", "full", "500px"]} {...cardStyles("AI")} onClick={() => {
                                    setSelected("AI")
                                }}>
                                    <HStack spaceX={4}>
                                        <Icon as={FiCpu} color={COLORS.blue} boxSize={5} />
                                        <Box textAlign="left">
                                            <Text fontWeight="semibold">Ask Xplora AI</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                AI will handle the generation of question and answering with ease
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                                <Box w={["full", "full", "full", "500px"]} {...cardStyles("Draft")} onClick={() => {
                                    setSelected("Draft")
                                    router.push("/dashboard/teacher/draft")
                                }}>
                                    <HStack spaceX={4}>
                                        <Icon as={FiFileText} color={COLORS.blue} boxSize={5} />
                                        <Box textAlign="left">
                                            <Text fontWeight="semibold">Draft or Achieve</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Save up your question for future use
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                                <Box w={["full", "full", "full", "500px"]} {...cardStyles("bulk")} onClick={() => {
                                    setSelected("bulk")
                                    onOpen()
                                }}>
                                    <HStack spaceX={4}>
                                        <Icon as={FiLayers} color={COLORS.blue} boxSize={5} />
                                        <Box textAlign="left">
                                            <Text fontWeight="semibold">Bulk Upload</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Upload your school question with csv file
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            </VStack>
                        }                    </Box>
                </Box>
            </Flex >
        </>
    );
}
