import { COLORS } from "@/utils/theme"
import { Box, Button, Center, Circle, CloseButton, Drawer, HStack, Icon, IconButton, Image, Portal, Separator, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { FiPenTool, FiPlus } from "react-icons/fi"
import AddIcon from "@/component/asset/AddIcon"
import EditQuestion from "../Question/EditQuestion"

export const QuizEditModel = ({ number }: { number: number }) => {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root placement={"bottom"} open={open}  onOpenChange={(details) => setOpen(details.open)}>
            <Drawer.Trigger asChild>
                <IconButton p="10px" colorScheme={"blue"} bg={COLORS.blue} aria-label='Edit'>
                    <FiPenTool />
                    <Box>
                        Edit
                    </Box>
                </IconButton>
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
                            <EditQuestion number={number} setNumber={setOpen} />
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
