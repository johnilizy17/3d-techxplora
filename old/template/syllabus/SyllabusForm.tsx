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
    Drawer,
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
import { MdDescription, MdSubject } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TeacherCreateGroupCode } from "@/url/redux/slices/techerSlice";
import useCustomToast from "@/hooks/useCustomToast";
import { syllabusCreated } from "@/url/route/syllabus";
import { getSyllabus } from "@/url/redux/slices/questionSlice";

const SyllabusForm = ({ setPage, setTopic }: { setPage: any, setTopic: any }) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const showToast = useCustomToast();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Syllabus Title is required'),
        description: Yup.string()
            .required('Syllabus Description is required'),
        subject: Yup.string()
            .required('Syllabus Subject is required'),
    });

    const initiateSyllabus = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            const { data } = await syllabusCreated({ ...values, teacher_id: user.id })
            setTopic(data.id)
            dispatch(getSyllabus("") as any)
            showToast('Syllabus Topic created', 'success');
            setPage(2)
        } catch (error: any) {
            showToast(error?.message || 'Syllabus failed to create', 'error');
            setSubmitting(false);
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
            initialValues={{ syllabus: "" }}
            onSubmit={initiateSyllabus}
            enableReinitialize={true}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, touched, handleChange, values }) => (
                <Form>

                    <Center flexDir={"column"}>
                        <Box w="full"
                            maxW="350px"
                            mt={screenHeight > 600 ? "10px" : "20px"}
                        >
                            <CustomInput
                                label='Syllabus Title'
                                name='title'
                                placeholder='Enter your title'
                                fieldProps={{ type: 'text' }}
                                leftIcon={<UserIcon />}
                                typeInput=''
                                value=''
                            />
                            <Box w="full" mt="5px">
                                <CustomInput
                                    label='Syllabus Description'
                                    name='description'
                                    placeholder='Enter your syllabus description'
                                    fieldProps={{ type: 'textarea' }}
                                    leftIcon={
                                        <Box p={4}>
                                            <MdDescription size={"16px"} />
                                        </Box>
                                    }
                                    type='textarea'
                                    value=''
                                />
                            </Box>
                            <Box w="full" mt="5px">
                                <CustomInput
                                    label='Syllabus Subject'
                                    name='subject'
                                    placeholder='Enter your syllabus subject'
                                    fieldProps={{ type: 'text' }}
                                    leftIcon={
                                        <Box p={4}>
                                            <MdSubject size={"16px"} />
                                        </Box>
                                    }
                                    typeInput='textarea'
                                    value=''
                                />
                            </Box>
                        </Box>
                    </Center>
                    <Drawer.Footer p={4}>
                        <Drawer.ActionTrigger asChild>
                            <Button p={4} variant="outline">Cancel</Button>
                        </Drawer.ActionTrigger>
                        <Button p={4} type="submit" loading={isSubmitting} disabled={isSubmitting} bg={COLORS.blue} colorScheme={"initial"}>Save</Button>
                    </Drawer.Footer>
                </Form>
            )}
        </Formik>

    );
};

export default SyllabusForm;