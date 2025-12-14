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
import { useDispatch } from "react-redux";
import { TeacherCreateGroupCode } from "@/url/redux/slices/techerSlice";
import useCustomToast from "@/hooks/useCustomToast";
import { syllabusCreated, syllabusSubTopicCreated } from "@/url/route/syllabus";
import { getSyllabus } from "@/url/redux/slices/questionSlice";

const SyllabusForm2 = ({ setOpen, topic }: { topic: string, setOpen: any }) => {
    const router = useRouter()
    const dispatch = useDispatch();
    const showToast = useCustomToast();
    const validationSchema = Yup.object({
        topics: Yup.string()
            .required('Syllabus Topic is required'),
        sub_topics: Yup.string()
            .required('Syllabus sub-topics is required'),
    });

    const initiateSyllabus = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            const data = await syllabusSubTopicCreated({ ...values, syllabus_id: topic, })
            dispatch(getSyllabus("") as any)
            showToast('Sub-Topic created', 'success');
            setOpen(false)
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
                                    label='Syllabus Topic'
                                    name='topics'
                                    placeholder='Enter your Topic'
                                    fieldProps={{ type: 'text' }}
                                    leftIcon={<UserIcon />}
                                    typeInput=''
                                    value=''
                                />
                                <Box w="full" mt="5px">
                                    <CustomInput
                                        label='Syllabus Sub Topic'
                                        name='sub_topics'
                                        placeholder='Enter your syllabus description'
                                        fieldProps={{ type: 'text' }}
                                        leftIcon={
                                            <Box p={4}>
                                                <MdDescription size={"16px"} />
                                            </Box>
                                        }
                                        type='text'
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

export default SyllabusForm2;