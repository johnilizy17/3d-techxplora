import { COLORS } from "@/utils/theme"
import { Box, Button, Center, CloseButton, Drawer, IconButton, Image, Portal, Separator } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { MdDeleteOutline } from "react-icons/md"

export const DeleteSyllabusModel = ({ id }: { id: string }) => {

    const router = useRouter()

    return (
        <Drawer.Root placement={"bottom"}>
            <Drawer.Trigger asChild>
                <IconButton bg="red.300">
                    <MdDeleteOutline color="red" />
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>Delete Topic</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body p={4}>
                            Do you want to Delete this topic

                        </Drawer.Body>
                        <Drawer.Footer p={4}>
                            <Button p={4} variant="outline">Cancel</Button>
                            <Button p={4} bg={COLORS.red} colorScheme={"initial"}>Delete</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}
