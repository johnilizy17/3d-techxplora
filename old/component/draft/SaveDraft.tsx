import { triggerQuizEdit } from "@/url/redux/slices/questionSlice"
import { formatDate } from "@/utils/date"
import { getDrafts, removeDraft } from "@/utils/DraftFunction"
import { EmptyState } from "@/utils/EmptyState"
import { COLORS } from "@/utils/theme"
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Box,
    Text,
    Badge,
    HStack,
    VStack,
    Button,
    Separator,
    Link,
    Icon,
    Flex,
    Center,
    IconButton,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaFilePdf } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

const SaveDraft = () => {

    const draft = getDrafts()
    const router = useRouter()
    const [saveData, setSaveData] = useState<any>([])
    const dispatch = useDispatch()
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)

    function Renavigate(e: any) {
        dispatch(triggerQuizEdit({...temporary, ...e, draft:true}) as any);
        router.push("/dashboard/teacher/aiquestion")
    }

    useEffect(() => {
        if (draft) {
            setSaveData(draft)
        }
    }, [draft.length])

    return (
        <Box mt={["70px", "50px"]} p={["20px", "40px"]}>
            <Center justifyContent={"space-between"} mb="20px" alignItems={"center"}>
                <Box fontWeight={"800"} fontSize={"20px"} >
                    Files in Drafts <span style={{ color: "grey", textDecoration: "underline", fontSize: "11px", fontWeight: "500", marginLeft: "10px" }}>NO 1</span>
                </Box>
                <IconButton onClick={() => router.push("/dashboard")} aria-label="Back button">
                    <FiLogOut size={16} />
                </IconButton>
            </Center>
            <Flex flexWrap={"wrap"} gap={2}>
                {saveData.length === 0 ?
                    <EmptyState title="No files in Draft" />
                    :
                    saveData.map((a: any, b: number) => (
                        <Card.Root maxW="md" w="full" borderWidth="1px" borderRadius="lg" boxShadow="md">
                            {/* Header */}
                            <CardHeader p="20px" display="flex" justifyContent="space-between" alignItems="center">
                                <HStack spaceX="3" w="full">
                                    <Avatar.Root>
                                        <Avatar.Fallback name={a.title} />
                                    </Avatar.Root>
                                    <Box>
                                        <Text fontWeight="bold" lineClamp={2}>{a.description}</Text>
                                        <Text fontSize="sm" color="gray.500">
                                            Policy : {a.duration} min
                                        </Text>
                                    </Box>
                                </HStack>
                                <Badge colorScheme="green">{a.generate ? "AI" : "Non AI"}</Badge>
                            </CardHeader>

                            <Separator />

                            {/* Body */}
                            <CardBody p="20px">
                                <HStack justify="space-between" mb="4">
                                    <VStack align="start" spaceX={0}>
                                        <Text fontSize="xs" color="gray.500">
                                            Start
                                        </Text>
                                        <Text fontWeight="medium" fontSize={"11px"}>{formatDate(a.start_at)}</Text>
                                    </VStack>
                                    <VStack align="start" spaceX={0}>
                                        <Text fontSize="xs" color="gray.500">
                                            End
                                        </Text>
                                        <Text fontWeight="medium" fontSize={"11px"}>{formatDate(a.end_at)}</Text>
                                    </VStack>
                                </HStack>
                                <Box>
                                    <Button
                                        onClick={() => Renavigate(a)}
                                        mt="10px" mr="10px" variant="solid" p="10px" bg={COLORS.blue} size="sm" colorScheme="blue">
                                        Pre-view
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            const preview = removeDraft(b);
                                            setSaveData(preview)
                                        }}
                                        mt="10px" variant="solid" p="10px" bg={COLORS.red} size="sm" colorScheme="blue">
                                        Delete
                                    </Button>
                                </Box>
                            </CardBody>
                        </Card.Root>))}
            </Flex>
        </Box>
    )
}

export default SaveDraft
