import CopyIcon from "@/component/asset/CopyIcon"
import DownloadIcon from "@/component/asset/DownloadIcon"
import { COLORS } from "@/utils/theme"
import { Box, Button, Center, CloseButton, Drawer, Flex, Image, Portal, Separator } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import {
    EmailShareButton,
    FacebookShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    TelegramIcon,
    WhatsappIcon,
} from "react-share";

export const ShareModel = ({ shareUrl = "https://example.com" }: { shareUrl?: string }) => {

    const groupList = ["Secience", "Math", "English", "Art"]
    const router = useRouter()
    const [choiceGroup, setChoiceGroup] = useState("");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <Drawer.Root placement={"bottom"}>
            <Drawer.Trigger asChild>
                <Center cursor="pointer" flexWrap={"wrap"} fontWeight={"400"} fontSize="12px" textAlign={"center"}>
                    <DownloadIcon />
                </Center>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>Share</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body p={4}>
                            <Flex alignItems={"center"} paddingBottom={"40px"} gap={4}>
                                <EmailShareButton url={shareUrl}>
                                    <EmailIcon size={32} round />
                                </EmailShareButton>

                                <FacebookShareButton url={shareUrl}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>

                                <TelegramShareButton url={shareUrl}>
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>

                                <WhatsappShareButton url={shareUrl}>
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>

                                <CopyIcon code={shareUrl} />
                            </Flex>
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
