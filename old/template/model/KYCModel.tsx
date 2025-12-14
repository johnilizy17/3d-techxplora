import { COLORS } from "@/utils/theme"
import { Box, Button, Center, Circle, CloseButton, Drawer, HStack, Icon, IconButton, Image, Portal, Separator, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { FiPenTool, FiPlus } from "react-icons/fi"
import AddIcon from "@/component/asset/AddIcon"
import EditQuestion from "../Question/EditQuestion"
import QuizModelForm from "../join/quizModelForm"
import KYCModelForm from "../join/KYCModelForm"
import { useDispatch, useSelector } from "react-redux"
import { setKYC } from "@/url/redux/slices/authSlice"

export const KYCModel = () => {

    const router = useRouter()
    const { kyc } = useSelector((a: { auth: { kyc: any } }) => a.auth)
    const dispatch = useDispatch();

    return (
        <Drawer.Root placement={"bottom"} open={kyc} onOpenChange={(details) => dispatch(setKYC(details.open))}>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>
                                KYC Verification
                            </Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body px={4}>
                            <KYCModelForm setOpen={() => dispatch(setKYC(!kyc))} />
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
