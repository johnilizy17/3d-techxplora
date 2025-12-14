import React, { useEffect } from "react";
import {
    ChakraProvider,
    Box,
    Heading,
    Text,
    HStack,
    VStack,
    Progress,
    Accordion,
    Icon,
    Circle,
    Span,
    Separator,
    ListItem,
    Center,
    IconButton,
} from "@chakra-ui/react";
import { FiCheckCircle, FiDelete, FiPlus } from "react-icons/fi";
import { COLORS } from "@/utils/theme";
import { useRouter } from "next/router";
import { SyllabusModel } from "@/template/model/SyllabusModel";
import { useDispatch, useSelector } from "react-redux";
import { getSyllabus } from "@/url/redux/slices/questionSlice";
import { EmptyState } from "@/utils/EmptyState";
import AddIcon from "../asset/AddIcon";
import { MdDeleteOutline } from "react-icons/md";
import { SubTopicModel } from "@/template/model/SubTopicModel";
import { DeleteSyllabusModel } from "@/template/model/DeleteSyllabusModel";


function ChapterRow({ syllabus }: { syllabus: any }) {

    return (
        <Accordion.Root
            collapsible
            defaultValue={["chapter-1", "chapter-2"]}
            variant="enclosed"
        >
            {syllabus.map((chapter: any, index: string) => (
                <Accordion.Item key={index} value={index}>
                    <Accordion.ItemTrigger px={3} py={3}>
                        <HStack flex="1" spaceX={3} align="center">
                            <Circle size="7" bg="green.50" color="green.500">
                                <Icon as={FiCheckCircle} boxSize={5} />
                            </Circle>
                            <VStack align="start" spaceX={0} flex="1">
                                <Text fontSize="sm" color="gray.500">
                                    {chapter.title}
                                </Text>
                                <Text fontWeight="semibold">{chapter.description}</Text>
                            </VStack>
                        </HStack>
                        <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                        <Accordion.ItemBody px={3} py={2} color="gray.600">
                            <Text fontWeight={"800"} textDecor={"underline"}>Sub Topics</Text>
                            <Box as="ul" ml="20px" listStyleType="circle">
                                {chapter.topics.length > 0.1 ?
                                    chapter.topics.map((a: any, b: number) => (<li key={b}>{a.topics}</li>))
                                    :
                                    <EmptyState title="No sub-topic" />
                                }
                            </Box>
                            <Center gap="10px" mt="20px" justifyContent={"end"}>
                                <SubTopicModel id={chapter.id} />
                               <DeleteSyllabusModel id={chapter.id} />
                            </Center>
                        </Accordion.ItemBody>
                    </Accordion.ItemContent>
                </Accordion.Item>
            ))}
        </Accordion.Root>
    );
}

export default function ContainerSyllabus() {

    const router = useRouter()
    const dispatch = useDispatch()
    const { syllabus } = useSelector((a: { question: any }) => a.question)

    useEffect(() => {
        dispatch(getSyllabus("") as any)
    }, [])

    return (
        <Box h="100vh" mt="100px" px="20px" w={["auto"]}
            overflow={"hidden"} display="grid">
            <VStack align="stretch" spaceX={4}>
                <Heading as="h2" size="xl" lineHeight={1.2}>
                    Teacher Syllabus
                </Heading>
                <Box color={COLORS.gray} fontSize={"11px"} fontStyle={"italic"}>
                    The syllabus serves as a roadmap for this course, outlining the key topics, learning objectives, and practical exercises you will encounter.
                </Box>

                <HStack justify="space-between" align="center">
                    <Box flex={1}>
                        <Progress.Root
                            value={60}
                            size="sm"
                            rounded="full"
                            bg={"gray.100"}
                        >
                            <Progress.Track>
                                <Progress.Range
                                    bgGradient={`linear(to-r, ${COLORS.light_blue} 10%, ${COLORS.lighter_blue} 60%, ${COLORS.blue})`}
                                />
                            </Progress.Track>
                        </Progress.Root>
                    </Box>
                    <Text fontWeight="medium" minW="10" textAlign="right">
                        {syllabus.length} Syllabus
                    </Text>
                </HStack>

                <Separator />

                <ChapterRow syllabus={syllabus} />
                <SyllabusModel />

            </VStack>
        </Box>
    );
}
