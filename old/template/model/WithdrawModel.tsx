import { COLORS } from "@/utils/theme"
import { Box, Button, Center, CloseButton, Drawer, Image, Portal, Separator } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useCustomToast from "@/hooks/useCustomToast";
import { useDispatch, useSelector } from "react-redux";
import { depositXD, transferXD, verifyAccountByEmail } from "@/url/route/quiz";
import CustomInput from "../tools/CustomInput";
import { FiSave, FiVoicemail } from "react-icons/fi";
import { getProfile } from "@/url/redux/slices/authSlice";
import EmailIcon from "@/component/asset/EmailIcon";
import { MdAccountBalance } from "react-icons/md";

export const WithdrawModel = () => {

    const router = useRouter();
    const [choiceGroup, setChoiceGroup] = useState("");
    const showToast = useCustomToast();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);   // 👈 control drawer
    const [verified, setVerified] = useState(false)
    const [loading, setLoading] = useState(false)

    const validationSchema = Yup.object({
        amount: Yup.string().required("Amount is required"),
    });

    const initiateVerify = async (values: any) => {
        try {
            setLoading(true);
            showToast('Withdrawal is Coming Soon', 'success');
            // const deposit = await verifyAccountByEmail(values)
            // if (deposit.message === "Account verified successfully") {
            //     setChoiceGroup(deposit.data.fullname)
            //     setVerified(true)
            // }
            setLoading(false);
        } catch (error: any) {
            showToast(error?.response.data.message || 'failed to verify', 'error');
            setLoading(false);
        }
    };


    const initiateDeposit = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            setIsOpen(false)
            setChoiceGroup("")
            showToast('Withdrawal is Coming Soon', 'success');
            setSubmitting(false);
        } catch (error: any) {
            showToast(error?.response.data.message || 'failed to verify', 'error');
            setSubmitting(false);
        }
    };


    return (
        <Drawer.Root placement={"bottom"} open={isOpen} onOpenChange={(open: any) => setIsOpen(open.open)}>
            <Drawer.Trigger asChild>
                <Button mt="20px" colorScheme='green' bg={COLORS.deep_purple} w={["140px", "140px", "140px", "300px"]}>
                    Withdraw
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>Withdraw <span style={{ fontSize: 10, color: "gray", marginLeft: 20 }}>{user.xp} XP</span></Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body p={4}>
                            <Formik
                                initialValues={{ amount: 0 }}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit={initiateDeposit}
                            >
                                {({ isSubmitting, setFieldValue, values }) => (
                                    <Form>
                                        <Box w='full' maxW="full">
                                            <CustomInput
                                                label='Account Number'
                                                name='account'
                                                placeholder='xxxx'
                                                fieldProps={{ type: 'number' }}
                                                leftIcon={
                                                    <Box p={4}>
                                                        <MdAccountBalance />
                                                    </Box>
                                                }
                                                typeInput=''
                                                value=''
                                            />
                                        </Box>
                                        <Box color="green" mb="2px">
                                            {choiceGroup}
                                        </Box>
                                        <Box w='full' maxW="full">
                                            <CustomInput
                                                label='Bank Name'
                                                name='name'
                                                placeholder='Enter Bank Name'
                                                fieldProps={{ type: 'select' }}
                                                type='select'
                                                setFieldValue={setFieldValue}
                                                value={{}}
                                                selectionData={[]} />
                                        </Box>
                                        <Box w='full' maxW="full">
                                            <CustomInput
                                                label='Amount'
                                                name='amount'
                                                placeholder='10 XP'
                                                fieldProps={{ type: 'number' }}
                                                leftIcon={<Box p="10px">
                                                    <FiSave size="24px" />
                                                </Box>}
                                                typeInput=''
                                                value=''
                                            />
                                        </Box>
                                        <Center mt="30px" gap="10px" justifyContent={"end"}>
                                            <Button
                                                onClick={() => setIsOpen(false)}
                                                p={4} variant="outline">Cancel</Button>
                                            {choiceGroup && choiceGroup.length > 2 ?
                                                <Button p={4} disabled={values.amount > 0.1 ? isSubmitting : true} type="submit" loading={isSubmitting} bg={COLORS.blue} colorScheme={"initial"}>Submit</Button>
                                                : <Button onClick={() => initiateVerify(values)} p={4} disabled={loading} loading={loading} bg={COLORS.brown} colorScheme={"initial"}>Verified</Button>
                                            }
                                        </Center>
                                    </Form>
                                )}
                            </Formik>
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root >

    )
}
