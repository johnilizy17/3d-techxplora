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
import { MdDescription } from "react-icons/md";
import { useDispatch } from "react-redux";
import { TeacherCreateGroupCode } from "@/url/redux/slices/techerSlice";
import useCustomToast from "@/hooks/useCustomToast";

const TeacherCreateGroupForm = () => {

    const router = useRouter()
    const dispatch = useDispatch();
    const showToast = useCustomToast();
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Group Title is required'),
        description: Yup.string()
            .required('Group Description is required')
    });

    const initiateSignUp = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            await dispatch(TeacherCreateGroupCode(values) as any)
                .unwrap()
                .then(() => {
                    showToast('Group successfully Created', 'success');
                    router.push("/dashboard/group_code");
                })
                .catch((error: any) => {
                    showToast(error?.message || 'Group failed to create', 'error');
                })
                .finally(() => {
                    setSubmitting(false);  // ✅ always reset
                });
        } catch (error: any) {
            console.log(error.message);
            showToast(error?.message || 'Group failed to create', 'error');
            setSubmitting(false); // ✅ reset here too
        }
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
            initialValues={{ title: "", description: "" }}
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
                                    label='Group Title'
                                    name='title'
                                    placeholder='Enter your title'
                                    fieldProps={{ type: 'text' }}
                                    leftIcon={<UserIcon />}
                                    typeInput=''
                                    value=''
                                />
                                <Box w="full" mt="5px">
                                    <CustomInput
                                        label='Group Description'
                                        name='description'
                                        placeholder='Enter your group description'
                                        fieldProps={{ type: 'textarea' }}
                                        leftIcon={
                                            <Box p={4}>
                                                <MdDescription size={"16px"} />
                                            </Box>
                                        }
                                        type='textarea'
                                        value=''
                                    />
                                    <Box color={values.description.length < 150?"gray":"red"} fontSize={"12px"}>{values.description.length}/150</Box>
                                </Box>
                            </Box>
                        </Center>
                        <Center flexDir="column" mt={screenHeight > 600 ? "calc(100vh - 540px)" : "50px"} mb="34px">
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
                        </Center>
                    </MotionBox>
                </Form>
            )}
        </Formik>

    );
};

export default TeacherCreateGroupForm;