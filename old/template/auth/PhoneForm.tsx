import React, { useEffect, useState } from "react";
import {
    Box,
    VStack,
    Center,
    Button
} from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { CustomPhoneInput } from "../tools/CustomPhoneInput";
import { COLORS } from "@/utils/theme";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/url/redux/slices/authSlice";
import useCustomToast from "@/hooks/useCustomToast";
import { updateStudentDetails } from "@/url/route/student";
import { getUserProfile, updateTeachers } from "@/url/route/teacher";
import { sendSMS } from "@/utils/NotificationSendWorker";

const MotionBox = motion(Box);

const PhoneForm = () => {
    const validationSchema = Yup.object({
        phone_number: Yup.string().required('Phone Number is required')
    });

    const dispatch = useDispatch();
    const showToast = useCustomToast();
    const { user } = useSelector((state: { auth: { user: any } }) => state.auth);
    const router = useRouter();

    const [screenHeight, setScreenHeight] = useState<number>(0);

    const controls = useAnimation(); // <-- animation controls

    useEffect(() => {
        const updateHeight = () => setScreenHeight(window.innerHeight);
        updateHeight();
        window.addEventListener("resize", updateHeight);

        controls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }); // play animation once

        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const initiateLogin = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            let updateDetails;

            if (values.accountable_type === "App\\Models\\Teacher") {
                const userData = await getUserProfile("teachers", user.id);
                delete userData.password;
                delete userData.email;
                delete values.email;
                updateDetails = await updateTeachers({ ...userData, ...values, is_verified: 0 });
            } else {
                const userData = await getUserProfile("students", user.id);
                delete userData.password;
                delete userData.email;
                delete values.email;
                updateDetails = await updateStudentDetails({ ...userData, ...values, is_verified: 0 });
            }

            const code = await sendSMS(values.phone_number);
            dispatch(setAuth({ ...values, code }));
            router.push("/auth/otp?type=phone");
            showToast("OTP code has successfully been sent to your phone number", "success");
            setSubmitting(false);
        } catch (error: any) {
            showToast(error?.message || 'Failed to send OTP', 'error');
            console.error('Login error:', error);
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ ...user, phone: "234" }}
            onSubmit={initiateLogin}
            enableReinitialize
            validationSchema={validationSchema}
        >
            {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                    <MotionBox
                        animate={controls} // <-- use animation controls
                        initial={{ x: 100, opacity: 0 }}
                    >
                        <VStack mt={screenHeight > 600 ? "84px" : "30px"} align="center">
                            <Box w='full'>
                                <CustomPhoneInput
                                    label='Phone Number'
                                    name='phone_number'
                                    placeholder='081XXXXXXXX'
                                    fieldProps={{ type: 'phone' }}
                                    typeInput='phone'
                                    value={values.phone}
                                    setFieldValue={setFieldValue}
                                />
                            </Box>
                        </VStack>
                        <Center mt={screenHeight > 600 ? "calc(100vh - 420px)" : "40px"} mb="76px">
                            <Button
                                colorScheme="light"
                                bg={COLORS.blue}
                                w="full"
                                maxW="350px"
                                color={COLORS.white}
                                fontWeight="500"
                                fontFamily="Poppins"
                                fontSize="16px"
                                h="48px"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                type="submit"
                                borderRadius="1234px"
                            >
                                <Box mr="5px">Continue</Box>
                                <RightArrowIcon />
                            </Button>
                        </Center>
                    </MotionBox>
                </Form>
            )}
        </Formik>
    );
};

export default PhoneForm;
