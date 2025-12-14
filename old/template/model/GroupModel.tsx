import { COLORS } from "@/utils/theme"
import { Box, Button, Center, CloseButton, Drawer, Image, Portal, Separator } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

export const GroupModel = () => {

    const groupList = ["Secience", "Math", "English", "Art"]
    const router = useRouter()
    const [choiceGroup, setChoiceGroup] = useState("")

    return (
        <Drawer.Root placement={"bottom"}>
            <Drawer.Trigger asChild>
                <Center cursor="pointer" w="270px" mt="34px" flexWrap={"wrap"} fontWeight={"400"} fontSize="12px" textAlign={"center"}>
                    <Image src="/auth/skin.png" alt="skin" /> <Box textDecoration={"underline"} fontSize={"16px"} ml="5px">Join Group</Box>
                </Center>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>Join Grop</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body p={4}>
                            <Box h="calc(100vh - 300px)">
                                {groupList.map((a, b) => (
                                    <Box bg={choiceGroup === a ? COLORS.lighter_blue : "transparent"} onClick={() => { setChoiceGroup(a) }} color={choiceGroup === a ? "white" : "#000"} cursor="pointer" p={4} pl={"0px"} borderEndWidth={"1px"} borderTopWidth={"1px"} borderRightWidth={"0px"} key={b}>
                                        {a}
                                    </Box>
                                ))}
                                <Separator />
                            </Box>
                        </Drawer.Body>
                        <Drawer.Footer p={4}>
                            <Button p={4} variant="outline">Cancel</Button>
                            <Button p={4} disabled={choiceGroup.length > 0.1 ? false : true} onClick={() => router.push("/auth/start")} bg={COLORS.blue} colorScheme={"initial"}>Save</Button>
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
