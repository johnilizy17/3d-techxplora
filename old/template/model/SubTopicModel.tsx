import { COLORS } from "@/utils/theme"
import { Box, Button, Center, Circle, CloseButton, Drawer, HStack, Icon, IconButton, Image, Portal, Separator, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import SyllabusForm from "../syllabus/SyllabusForm"
import { FiPlus } from "react-icons/fi"
import SyllabusForm2 from "../syllabus/SyllabusForm2"
import AddIcon from "@/component/asset/AddIcon"

export const SubTopicModel = ({ id }: { id: string }) => {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={(details) => {
            setOpen(details.open)
        }} placement={"bottom"}>
            <Drawer.Trigger asChild>
                <IconButton bg="green.200">
                    <AddIcon />
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>
                                Create Sub-Topic
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body px={4}>
                            <SyllabusForm2 topic={id} setOpen={setOpen} />
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
