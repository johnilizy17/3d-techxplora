import React, { useEffect, useState } from "react";
import {
    Box,
    Input,
    InputGroup,
    Icon,
    Link,
    VStack,
    Text,
    Button,
    Center,
    SwitchRoot,
    SwitchHiddenInput,
    SwitchControl,
    SwitchLabel,
    Flex,
} from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../tools/CustomInput";
import EmailIcon from "@/component/asset/EmailIcon";
import { COLORS } from "@/utils/theme";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import UserIcon from "@/component/asset/UserIcon";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, authRegisterStudent, authRegisterTeacher, authSubRegisterStudent } from "@/url/redux/slices/authSlice";
import useCustomToast from "@/hooks/useCustomToast";
import ROUTES from "@/utils/ROUTES";
import { useGoogleLogin } from "@react-oauth/google";

const StudentForm = ({ code, onclose , fetchAllAccount}: { fetchAllAccount:any, code: number, onclose: () => void }) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const showToast = useCustomToast();
    const [guidian, setGuidian] = useState(false)
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .required('First Name is required'),
        other_name: Yup.string()
            .required('Other Name is required'),
        last_name: Yup.string()
            .required('Last Name is required')
    });

    const initiateSignUp = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);

            const loginData = {
                ...values,
                "is_branch": true,
                "parent_id": user.id,
                email: "",
                "phone_number": null,
                "alternate_phone_number": null,
            };

            await dispatch(authSubRegisterStudent(loginData) as any).unwrap()
                .then(() => {
                    onclose()
                    fetchAllAccount()
                    showToast('Login successful', 'success');
                });
        } catch (error: any) {

            console.log(error)
            showToast(error?.message || 'Register failed', 'error');

            setSubmitting(false);
        }
    };

    const MotionBox = motion(Box);

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={initiateSignUp}
            enableReinitialize={true}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, touched, handleChange, values }) => (
                <Form>

                    <Box
                        w="full"
                    >
                        <Box p={4} w="full">

                            <VStack align="stretch">
                                <Box w='full'>
                                    <CustomInput
                                        label='Last Name'
                                        name='last_name'
                                        placeholder='Nakano'
                                        fieldProps={{ type: 'text' }}
                                        leftIcon={<UserIcon />}
                                        typeInput=''
                                        value=''
                                    />
                                </Box>
                                <Box w='full'>
                                    <CustomInput
                                        label='First Name'
                                        name='first_name'
                                        placeholder='Azusa'
                                        fieldProps={{ type: 'text' }}
                                        leftIcon={<UserIcon />}
                                        typeInput=''
                                        value=''
                                    />
                                </Box>

                                <Box w='full'>
                                    <CustomInput
                                        label='Other Name'
                                        name='other_name'
                                        placeholder='Azusa'
                                        fieldProps={{ type: 'text' }}
                                        leftIcon={<UserIcon />}
                                        typeInput=''
                                        value=''
                                    />
                                </Box>
                            </VStack>
                        </Box>
                    </Box>
                    <Center flexDir="column" mt="47px" mb="34px">
                        <Button
                            colorScheme="light"
                            bg={COLORS.blue}
                            w="full"
                            maxW={"350px"}
                            color={COLORS.white}
                            fontWeight={"500"}
                            fontFamily={"Poppins"}
                            fontSize={"16px"}
                            disabled={isSubmitting}
                            loading={isSubmitting}
                            type="submit"
                            h="48px"
                            borderRadius={"1234px"}
                        >
                            <Box mr="5px">
                                Create Sub Account
                            </Box>
                            <RightArrowIcon />
                        </Button>
                    </Center>
                </Form>
            )}
        </Formik>
    );
};

export default StudentForm;