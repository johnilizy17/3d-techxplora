import useCustomToast from "@/hooks/useCustomToast"
import { triggerQuizEdit } from "@/url/redux/slices/questionSlice"
import { EmptyState } from "@/utils/EmptyState"
import { model } from "@/utils/firebase"
import { COLORS } from "@/utils/theme"
import { Box, Button, ButtonGroup, Center, CloseButton, Drawer, For, Image, Input, Portal, Separator, Stack, Steps, useDisclosure, useSteps } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const TopicAISelection = ({ selected, setSelected }: { selected: string, setSelected: (id: string) => void }) => {

    const { open, onOpen, onToggle } = useDisclosure();
    const groupList = ["Secience", "Math"]
    const { syllabus } = useSelector((a: { question: any }) => a.question)
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const router = useRouter()
    const dispatch = useDispatch()
    const [choiceGroup, setChoiceGroup] = useState<any>([])
    const [selectAll, setSelectAll] = useState<any>(false)
    const [quizNumber, setQuizNumber] = useState(0);
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(0);
    const [disabled, setDisabled] = useState(true);
    const toast = useCustomToast()
    const items = [
        {
            title: "Step 1",
        },
        {
            title: "Step 2"
        }
    ]


    const onClose = () => {
        onToggle()
        setSelected("")
    }

    async function GenerateAiQuestion() {
        try {
            setLoading(true)

            const selectSyllabus = syllabus.filter((a: any) => {
                if (choiceGroup.includes(a.id)) {
                    return a
                }
            })

            const prompt = `
                Generate a quiz for ${temporary.title}
                Syllabus: ${JSON.stringify(selectSyllabus)}
                Description: ${temporary.description}
                Age range: ${temporary.min_age ? temporary.min_age : "any"} to ${temporary.max_age ? temporary.max_age : "any"}
                Number of questions: ${quizNumber}
                Return JSON with keys: title, description, min_age, max_age, syllabus, questions (each with question_id, question, options with option + is_correct)
               make sure you generate the questions form the syllabus has the poriorty 
                `;

            const response: any = await model.generateContent(prompt);
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
                    toast("Too many attemps try after 1 min", "error")
                    console.error("Invalid JSON format:", err);
                    return null;
                }
            }
            const edit = cleanJsonResponse(quiz)
            dispatch(triggerQuizEdit({ ...edit, generate: prompt }) as any);
            toast("Successfully Generated Question", "success")
            router.push("/dashboard/teacher/aiquestion")
        } catch (err: any) {
            console.log(err, "error")
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (selected == "AI") {
            onToggle()
        }
    }, [selected])

    // useEffect(() => {
    //     const arr = Array.from({ length: syllabus.length }, (_, i) => i + 1);
    //     setChoiceGroup(arr)
    // }, [syllabus.length])

    useEffect(() => {
        if (choiceGroup.length > 0.1) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
        console.log(choiceGroup)
    }, [choiceGroup.length])

    return (
        <Steps.Root onStepChange={(e) => {
            setPage(e.step)
        }}>
            <Drawer.Root open={open} placement={"bottom"}>
                <Portal>
                    <Drawer.Backdrop onClick={onClose} />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title p={4}>AI Generation</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body p={4}>
                                <Steps.List>
                                    {items.map((step, index) => (
                                        <Steps.Item key={index} index={index} title={step.title}>
                                            <Steps.Indicator />
                                            <Steps.Title>{step.title}</Steps.Title>
                                            <Steps.Separator />
                                        </Steps.Item>
                                    ))}
                                </Steps.List>

                                <Box h="calc(100vh - 350px)">

                                    <Steps.Content outline={"none"} border={"none"} h="full" index={0}>
                                        <Box my="20px" fontWeight={"800"} fontSize={"18px"}>
                                            Syllabus Selection
                                        </Box>
                                        <Box>
                                            {syllabus.length < 1 ?
                                                <EmptyState title="No Syllabus" />
                                                :
                                                syllabus.map((a: any, b: number) => (
                                                    <Box
                                                        bg={choiceGroup.includes(a.id) || selectAll ? COLORS.blue : "transparent"}
                                                        onClick={() => {
                                                            const newChoiceGroup = [...choiceGroup];
                                                            if (newChoiceGroup.includes(a.id)) {
                                                                setChoiceGroup(newChoiceGroup.filter(id => id !== a.id));
                                                            } else {
                                                                newChoiceGroup.push(a.id);
                                                                setChoiceGroup(newChoiceGroup);
                                                            }
                                                        }}
                                                        color={choiceGroup.includes(a.id) || selectAll ? "white" : "#000"}
                                                        cursor="pointer"
                                                        p={4}
                                                        borderEndWidth="1px"
                                                        borderTopWidth="1px"
                                                        borderRightWidth="0px"
                                                        key={b}
                                                        py="10px"
                                                        whiteSpace="nowrap"
                                                        overflow="hidden"
                                                        textOverflow="ellipsis"
                                                    >
                                                        <span style={{ fontWeight: "800" }}>{a.title}:</span> {a.description}
                                                    </Box>

                                                ))}
                                        </Box>
                                    </Steps.Content>

                                    <Steps.CompletedContent border={"none"}>
                                        <Box my="20px" fontWeight={"800"} fontSize={"18px"}>
                                            Number of Question
                                        </Box>
                                        <Input
                                            borderRadius={"123px"}
                                            borderColor={COLORS["20_gray"]}
                                            borderRightColor={"transparent"}
                                            type="number"
                                            onChange={(e: any) => setQuizNumber(e.target.value)}
                                            px={2}
                                            h="48px" borderWidth={"1px"} placeholder="Number of Question" />
                                    </Steps.CompletedContent>


                                    <Separator />
                                </Box>
                            </Drawer.Body>
                            <Drawer.Footer p={4}>
                                <Steps.PrevTrigger asChild>
                                    <Button p={4} variant="outline">Prev</Button>
                                </Steps.PrevTrigger>
                                {
                                    page === 0 && <Button p={4} onClick={() => setSelectAll(!selectAll)} bg={COLORS.black} color="#fff" colorScheme={"dark"}>Select All</Button>
                                }
                                {page === 0 &&
                                    <Steps.NextTrigger disabled={disabled} asChild>
                                        <Button p={4} bg={COLORS.blue} colorScheme={"initial"}>Next</Button>
                                    </Steps.NextTrigger>
                                }
                                {page === 1 &&
                                    <Button p={4} disabled={quizNumber > 0.1 ? false : true} loading={loading} onClick={() => GenerateAiQuestion()} bg={COLORS.blue} colorScheme={"initial"}>Generate</Button>
                                }
                            </Drawer.Footer>

                            <Drawer.CloseTrigger asChild>
                                <CloseButton onClick={onClose} size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root >
        </Steps.Root>

    )
}
