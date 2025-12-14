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
    Image,
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
import { GroupModel } from "../model/GroupModel";

const TeacherGroupForm = () => {

    const router = useRouter()
    const validationSchema = Yup.object({
        group: Yup.string()
            .required('Group Code is required')
    });

    const initiateSignUp = async (values: any, { setSubmitting }: any) => {
        setSubmitting(true);
        router.push("/auth/create_group")
        setSubmitting(false);
    };

    const MotionBox = motion(Box);

    const [screenHeight, setScreenHeight] = useState<number>(0);

    useEffect(() => {
        // Function to update the screen height
        const updateHeight = () => {
            setScreenHeight(window.innerHeight);
        };

        // Set initial height
        updateHeight();

        // Update on resize
        window.addEventListener("resize", updateHeight);

        // Cleanup
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <Formik
            initialValues={{ group: "" }}
            onSubmit={initiateSignUp}
            enableReinitialize={true}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, touched, handleChange, values }) => (
                <Form>
                    <MotionBox
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Center flexDir={"column"}>
                            <Box w="full"
                                maxW="350px"
                                mt={screenHeight > 600 ? "100px" : "20px"}
                            >
                                <CustomInput
                                    label='Group Code'
                                    name='group'
                                    placeholder='Enter your group code'
                                    fieldProps={{ type: 'text' }}
                                    leftIcon={<UserIcon />}
                                    typeInput=''
                                    value=''
                                />
                            </Box>
                            <Box w="full" onClick={() => router.push("/auth/start")} maxW="350px" mt="20px" textDecoration={"underline"} fontFamily={"Poppins"} fontSize={"14px"} textAlign={"end"}>
                                I'm an Independent Learner
                            </Box>
                        </Center>
                        <Center flexDir="column" mt={screenHeight > 600 ? "calc(100vh - 550px)" : "50px"} mb="34px">
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
                                    Create Group
                                </Box>
                                <RightArrowIcon />
                            </Button>
                            <GroupModel />
                        </Center>
                    </MotionBox>
                </Form>
            )}
        </Formik>

    );
};

export default TeacherGroupForm;