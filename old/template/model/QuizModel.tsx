import { COLORS } from "@/utils/theme"
import { Box, Button, Center, Circle, CloseButton, Drawer, HStack, Icon, IconButton, Image, Portal, Separator, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { FiPenTool, FiPlus } from "react-icons/fi"
import AddIcon from "@/component/asset/AddIcon"
import EditQuestion from "../Question/EditQuestion"
import QuizModelForm from "../join/quizModelForm"

export const QuizModel = ({ code }: { code: string }) => {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root placement={"bottom"} open={open} onOpenChange={(details) => setOpen(details.open)}>
            <Drawer.Trigger asChild>
                <Box px="10px">
                    <Text fontSize="sm" color="green.500">Join</Text>
                </Box>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>
                                Edit Question
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body px={4}>
                            <QuizModelForm quiz={code}  setOpen={setOpen} />
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}
