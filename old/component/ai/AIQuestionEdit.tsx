import React, { useState, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Button,
    Input,
    IconButton,
    Flex,
    Badge,
    Tabs,
    useClipboard,
    Spacer,
    Center,
} from '@chakra-ui/react';
import {
    FiFile,
    FiFolderPlus,
    FiSettings,
    FiHelpCircle,
    FiCopy,
    FiPlay,
    FiRefreshCw,
    FiSend,
    FiLogOut,
    FiX,
    FiBarChart2,
    FiPenTool,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { LuSave, LuSend } from 'react-icons/lu';
import useCustomToast from '@/hooks/useCustomToast';
import AIIcon from '../asset/Aiicon';
import CrownIcon from '../asset/CrownIcon';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '@/utils/theme';
import { model } from '@/utils/firebase';
import { triggerQuizEdit } from '@/url/redux/slices/questionSlice';
import { saveDraft } from '@/utils/DraftFunction';
import { createQuestion, sendInteralEmail } from '@/url/route/verification';
import { QuizEditModel } from '@/template/model/QuizEditModel';
import { getAllGroupsStudentInfo } from '@/url/route/student';
import { SendGroupNotificationEmail } from '@/utils/emailDesign';
import { formatDate } from '@/utils/date';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    pro?: boolean;
    active?: boolean;
    number?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, pro, active, number }) => (
    <HStack
        w={["100px", "100px", "100px", "full"]}
        p={3}
        spaceX={3}
        cursor="pointer"
        borderRadius="md"
        bg={active ? 'blue.500' : 'transparent'}
        _hover={{ bg: active ? 'blue.500' : 'gray.100' }}
        transition="all 0.2s"
    >
        <Icon size={18} color={'white'} />
        <Text display={["none", "none", "none", "block"]} fontSize="sm" color={'white'} flex={1}>
            {label}
        </Text>
        <Badge size="sm" colorScheme="blue" fontSize="xs" px={2}>
            {number}
        </Badge>
    </HStack>
);

interface SyntaxHighlightedCodeProps {
    code: string;
    language: 'html' | 'css' | 'javascript';
}

// ✅ Your SyntaxHighlightedCode component
const SyntaxHighlightedCode: React.FC<{ code: any; language: string }> = ({ code, language }) => {
    const lines = code.split("\n");

    const getTokenColor = (token: string, lang: string): string => {
        if (lang === "javascript" || lang === "json") {
            if (["true", "false", "null"].includes(token)) return "purple.600";
            if (token.includes('"')) return "green.600"; // JSON keys & strings
            if (/^[0-9]+$/.test(token)) return "blue.600"; // numbers
        }
        return "gray.800";
    };

    const renderLine = (line: string, lineNumber: number) => {
        const tokens = line.split(/(\s+|[{}[\],:])/);

        return (
            <Box key={lineNumber} display="flex">
                <Box
                    color="gray.400"
                    fontSize="sm"
                    minW="30px"
                    textAlign="right"
                    userSelect="none"
                    fontFamily="'Fira Code', 'Consolas', monospace"
                    mr={2}
                >
                    {lineNumber}
                </Box>
                <Box fontSize="sm" fontFamily="'Fira Code', 'Consolas', monospace">
                    {tokens.map((token, index) => (
                        <Box as="span" key={index} color={getTokenColor(token, language)}>
                            {token}
                        </Box>
                    ))}
                </Box>
            </Box>
        );
    };

    return <Box>{lines.map((line: any, idx: number) => renderLine(line, idx + 1))}</Box>;
};

const AIQuestionEdit: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('js');
    const [inputValue, setInputValue] = useState<string>('');
    const toast = useCustomToast();
    const router = useRouter();
    const { syllabus, editQuiz } = useSelector((a: { question: any }) => a.question)
    const [filterData, setFilterData] = useState({})
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const [numberSelection, setNumberSelection] = useState(0);
    const [answerData, setAnswerData] = useState(-1)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const menuItems: SidebarItemProps[] = [
        { icon: AIIcon, label: `AI Chat Helper ${1}`, active: true }
    ];

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            console.log('Sending message:', inputValue);
            setInputValue('');
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    function formatOptions(options: any) {
        return options.map((item: { option: string }) => item.option).join("\n");
    }

    function getCorrectAnswer(options: any) {
        const correct = options.find((item: { is_correct: string }) => item.is_correct);
        return correct ? "Answer:" + " " + correct.option : null;
    }


    const HandleQuiz = async (values: any, number: number) => {
        const quiz = {
            quiz_code: temporary.quiz_code,
            quiz_id: temporary.id,
            question: values.question,
            image_url: null,
            duration: JSON.stringify(JSON.parse(temporary.duration) / number),
            status: 1,
            options: values.options
        };

        await createQuestion(quiz);


        setAnswerData(number);

    };
    const submitQuestionByAi = async () => {
        try {
            setLoading(true);

            for (let i = 0; i < editQuiz.questions.length; i++) {
                await HandleQuiz(editQuiz.questions[i], i);
            }
            try {
                const students = await getAllGroupsStudentInfo(temporary.group_code)

                if (students && students.data && students.data.length > 0.1) {
                    await Promise.all(
                        await students.data.map(async (a: any) => {
                            await sendInteralEmail({
                                to: a.email,
                                subject: "Quiz Invitation",
                                message: SendGroupNotificationEmail(
                                    temporary.group_code,
                                    temporary.duration,
                                    formatDate(temporary.start_at)
                                ),
                            });
                        })
                    );
                }

            } catch (err: any) {
                toast(err.response?.data?.message || 'No student Connected to this group', 'error');
            }
            router.push("/dashboard/quizzes")
            toast('Quiz successfully created', 'success');
        } catch (error: any) {
            toast(error.response?.data?.message || 'Failed to create Quiz', 'error');
        } finally {
            setLoading(false);
        }
    };


    const SaveToDarft = () => {
        saveDraft({ ...temporary, ...editQuiz })
        toast("Successfully Save to draft", "success")
        router.push("/dashboard")
    }

    useEffect(() => {
        if (editQuiz.title) {
            const data = { ...editQuiz }
            delete data.generate
            setFilterData(data)
        } else {
            router.push("/dashboard/quizzes")
        }
    }, [editQuiz.title])

    async function GenerateAiQuestion() {
        try {
            setLoading(true)

            const response: any = await model.generateContent(editQuiz.generate);
            const text = response.response.candidates[0].content.parts[0];

            // parse JSON (you might wrap in try/catch)
            const quiz = text.text;
            function cleanJsonResponse(response: any) {
                try {
                    // If the API returns { text: "```json {...} ```" }
                    let raw = response.text || response;

                    // Remove code fences ```json ... ```
                    raw = raw.replace(/```json|```/g, "").trim();

                    // Parse into JSON
                    return JSON.parse(raw);
                } catch (err) {
                    console.error("Invalid JSON format:", err);
                    return null;
                }
            }
            toast("Successfully Regenerated Question", "success")
            const edit = cleanJsonResponse(quiz)
            dispatch(triggerQuizEdit({ ...edit, generate: editQuiz.generate }) as any);
        } catch (err: any) {
            console.log(err, "error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex flexDir={["column", "column", "column", "row"]} height="full" bg="gray.50">
            {/* Sidebar */}
            <Box width={["full", "full", "full", "260px"]} bg="white" borderRight="1px solid" borderColor="gray.200" p={4}>
                <VStack pt="63px" flexDir={["row", "row", "row", "column"]} spaceX={1} align="stretch" h="full">
                    {menuItems.map((item, index) => (
                        <SidebarItem
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            pro={item.pro}
                            active={item.active}
                            number={editQuiz.questions.length}
                        />
                    ))}
                    <Flex h={["auto", "auto", "auto", "calc(100vh - 200px)"]} overflow={"scroll"} flexDir={["row", "row", "row", "column"]} gap="5px">
                        {
                            editQuiz && editQuiz.questions && editQuiz.questions.map((a: any, b: number) => (
                                <Flex
                                    onClick={() => {
                                        setNumberSelection(b)
                                    }}
                                    cursor={"pointer"}
                                    justifyContent={"space-between"}
                                    bg={numberSelection === b ? "black" : "#fff"} p="10px" borderRadius={"14px"} color={numberSelection === b ? "#fff" : "grey"} gap="5px">
                                    <Box display={["none", "none", "none", "block"]}>
                                        Number
                                    </Box>
                                    <Box display={["block", "block", "block", "none"]}>
                                        NO
                                    </Box>
                                    <Box>
                                        {b + 1}
                                    </Box>
                                </Flex>
                            ))
                        }
                    </Flex>
                    <HStack
                        mt={3}
                        p={3}
                        w="full"
                        cursor="pointer"
                        borderRadius="md"
                        _hover={{ bg: 'gray.100' }}
                        display={["none", "none", "none", "flex"]}
                        color="gray.600"
                        onClick={() => router.back()}
                    >
                        <FiLogOut size={16} />
                        <Text fontSize="sm">Go Back</Text>
                    </HStack>
                </VStack>
            </Box>

            {/* Main Content */}
            <Flex flex={1} direction="column">
                {/* Header */}
                <HStack
                    px={6}
                    py={4}
                    pt={["0px", "0px", "0px", "73px"]}
                    w="full"
                    bg="white"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    alignItems={"start"}
                    justify="space-between"
                    flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]}
                >
                    <Tabs.Root defaultValue={"Question"} variant="enclosed" colorScheme="blue" w="full">
                        <Tabs.List mb="10px" bg="gray.100" p={1} borderRadius="lg">
                            <Tabs.Trigger
                                value="Question"
                                color="gray.700"
                                _selected={{ bg: 'blue.500', color: 'white' }}
                                borderRadius="md"
                                px="20px"
                                fontWeight="medium"
                            >
                                Question
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="Options"
                                color="gray.700"
                                _selected={{ bg: 'blue.500', color: 'white' }}
                                borderRadius="md"
                                px="20px"
                                fontWeight="medium"
                            >
                                Options
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="Anwser"
                                color="gray.700"
                                _selected={{ bg: 'blue.500', color: 'white' }}
                                borderRadius="md"
                                px="20px"
                                fontWeight="medium"
                            >
                                Anwser
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content overflow={"scroll"} value="Question" p={0} h={["calc(100vh - 440px)", "calc(100vh - 300px)"]}>
                            <SyntaxHighlightedCode code={editQuiz.questions[numberSelection].question} language="html" />
                        </Tabs.Content>

                        <Tabs.Content overflow={"scroll"} value="Options" p={0} h={["calc(100vh - 440px)", "calc(100vh - 300px)"]}>
                            <SyntaxHighlightedCode code={formatOptions(editQuiz.questions[numberSelection].options)} language="css" />
                        </Tabs.Content>

                        <Tabs.Content overflow={"scroll"} value="Anwser" p={0} h={["calc(100vh - 440px)", "calc(100vh - 300px)"]}>
                            <SyntaxHighlightedCode code={getCorrectAnswer(editQuiz.questions[numberSelection].options)} language="javascript" />
                        </Tabs.Content>
                    </Tabs.Root>
                    <Center
                        flexDir={"row"}
                        w={["full", "full", "full", "auto"]}
                        justifyContent={"space-between"}>
                        <QuizEditModel number={numberSelection} />
                        <HStack
                            mt={3}
                            p={3}
                            w="auto"
                            cursor="pointer"
                            borderRadius="md"
                            _hover={{ bg: 'gray.100' }}
                            display={["flex", "flex", "flex", "none"]}
                            color="gray.600"
                            onClick={() => router.back()}
                        >
                            <FiLogOut size={16} />
                            <Text fontSize="sm">Go Back</Text>
                        </HStack>
                    </Center>
                </HStack>

                {/* Bottom Input Area */}
                <Box bg="white" borderTop="1px solid" borderColor="gray.200" p={6}>
                    <VStack spaceX={4}>
                        {editQuiz.generate && <Button
                            onClick={() => GenerateAiQuestion()}
                            loading={loading} size="md" colorScheme="blue" variant="solid" px={8} borderRadius="full">
                            <FiRefreshCw />
                            Regenerate response
                        </Button>}

                        <HStack w="full" spaceX={3} maxW="600px" mx="auto">
                            <Box w="full">
                                <Box lineClamp={1}>{editQuiz.title}</Box>
                                <Box lineClamp={2} fontSize={"12px"}>{editQuiz.description}</Box>
                            </Box>
                            <IconButton
                                aria-label="Send message"
                                colorScheme="blue"
                                bg={COLORS.blue}
                                onClick={SaveToDarft}
                                disabled={editQuiz.draft}
                                loading={loading}
                                borderRadius="full"
                            >
                                <LuSave />
                            </IconButton>
                            <IconButton
                                aria-label="Send message"
                                colorScheme="blue"
                                borderRadius="full"
                                onClick={submitQuestionByAi}
                                loading={loading}
                            >
                                <LuSend />
                            </IconButton>
                            {answerData != -1 && <IconButton
                                aria-label="Send message"
                                colorScheme="blue"
                                borderRadius="full"
                                bg={COLORS.deep_purple}
                            >
                                {answerData + 1}
                            </IconButton>}

                        </HStack>
                    </VStack>
                </Box>
            </Flex>
        </Flex >
    );
};

export default AIQuestionEdit;
