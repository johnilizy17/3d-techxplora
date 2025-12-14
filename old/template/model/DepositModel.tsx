import { COLORS } from "@/utils/theme"
import { Box, Button, Center, CloseButton, Drawer, Image, Portal, Separator } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useCustomToast from "@/hooks/useCustomToast";
import { useDispatch, useSelector } from "react-redux";
import { depositXD } from "@/url/route/quiz";
import CustomInput from "../tools/CustomInput";
import { FiSave } from "react-icons/fi";
import { getProfile } from "@/url/redux/slices/authSlice";
import { cashFormat } from "@/utils/cashformat";

export const DepositModel = () => {

    const groupList = ["Secience", "Math", "English", "Art"]
    const router = useRouter();
    const [choiceGroup, setChoiceGroup] = useState("");
    const showToast = useCustomToast();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);   // 👈 control drawer

    const validationSchema = Yup.object({
        amount: Yup.string().required("Amount is required"),
    });

    const initiateDeposit = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            const role = user.accountable_type === "App\\Models\\Teacher" ? "teacher" : "student"
            const deposit = await depositXD({ ...user, type: role, ...values })
            await dispatch(getProfile({ id: user.id, role: role }) as any)
            setIsOpen(false)
            showToast('Successfully Transferred', 'success');
            setSubmitting(false);
        } catch (error: any) {
            showToast(error?.response.data.message || 'failed to verify', 'error');
            setSubmitting(false);
        }
    };


    return (
        <Drawer.Root placement={"bottom"} open={isOpen} onOpenChange={(open: any) => setIsOpen(open)}>
            <Drawer.Trigger disabled={user.isAdmin} asChild>
                <Button mt="20px" disabled={user.isAdmin} colorScheme='blue' bg={COLORS.blue} w={["140px", "140px", "140px", "300px"]}>
                    Deposit
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop onClick={()=>setIsOpen(false)} />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title p={4}>Deposit {user.xp} XP</Drawer.Title>
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
                                                label={`Amount (${values.amount/10} XD => ${cashFormat(values.amount/10)})`}
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
                                            <Button p={4} disabled={values.amount > 0.1 ? isSubmitting : true} type="submit" loading={isSubmitting} bg={COLORS.blue} colorScheme={"initial"}>Submit</Button>
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
        </Drawer.Root>

    )
}
