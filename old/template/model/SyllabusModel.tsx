import { COLORS } from "@/utils/theme"
import { Box, Button, Center, Circle, CloseButton, Drawer, HStack, Icon, Image, Portal, Separator, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import SyllabusForm from "../syllabus/SyllabusForm"
import { FiPlus } from "react-icons/fi"
import SyllabusForm2 from "../syllabus/SyllabusForm2"

export const SyllabusModel = () => {

    const groupList = ["Secience", "Math", "English", "Art"]
    const router = useRouter()
    const [choiceGroup, setChoiceGroup] = useState("")
    const [page, setPage] = useState(1)
    const [topic, setTopic] = useState("")
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={(details) =>{ 
            setOpen(details.open)
            setPage(1)
            }} placement={"bottom"}>
            <Drawer.Trigger asChild>
                <Box
                    px={3}
                    py={3}
                    boxShadow={"md"}
                    w="full"
                    _hover={{ bg: "gray.50" }}
                    cursor="pointer"
                >
                    <HStack h="70px"
                        spaceX={3} align="center" justify={"center"}>
                        <Circle size="7" bg="blue.50" color={COLORS.gray}>
                            <Icon as={FiPlus} boxSize={5} />
                        </Circle>
                        <Text fontWeight="semibold" color={COLORS.gray}>
                            Add Topic
                        </Text>
                    </HStack>
                </Box>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>         {page === 1 ? "Create Topic" : "Create Sub-Topic"}
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body px={4}>
                            {page === 1 ?
                                <SyllabusForm setTopic={setTopic} setPage={setPage} />
                                :
                                <SyllabusForm2 topic={topic} setOpen={setOpen} />
                            }
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
