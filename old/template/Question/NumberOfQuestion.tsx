import React from "react";
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
} from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../tools/CustomInput";
import EmailIcon from "@/component/asset/EmailIcon";
import { COLORS } from "@/utils/theme";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authLogin } from "@/url/redux/slices/authSlice";
import useCustomToast from "@/hooks/useCustomToast";
import ROUTES from "@/utils/ROUTES";
import { FiMessageSquare } from "react-icons/fi";

const NumberOfQuestion = ({ setNumber, edit=false }: { setNumber: (a: number) => void, edit?:boolean }) => {
    const validationSchema = Yup.object({
        number: Yup.number()
    });
    const dispatch = useDispatch()
    const showToast = useCustomToast()

    const MotionBox = motion(Box);

    const router = useRouter()

    const initiateLogin = async (values: any, { setSubmitting }: any) => {
        setNumber(values.number)
    };


    return (
        <Formik
            initialValues={{ number: 0 }}
            onSubmit={initiateLogin}
            enableReinitialize={true}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, touched, handleChange, values }) => (
                <Form style={{width:"100%"}}>
                    <MotionBox
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        p={4}
                    >

                        <Box w='full'>
                            <CustomInput
                                label={edit? 'Number of Add Question': 'Number of Question'}
                                name='number'
                                placeholder='number of question'
                                fieldProps={{ type: 'number' }}
                                typeInput=''
                                value=''
                            />
                        </Box>
                        <Center mt="47px" mb="76px">
                            <Button
                                colorScheme="light"
                                bg={COLORS.blue}
                                w="full"
                                maxW={"350px"}
                                color={COLORS.white}
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                fontWeight={"500"}
                                fontFamily={"Poppins"}
                                fontSize={"16px"}
                                h="48px"
                                type="submit"
                                borderRadius={"1234px"}
                            >
                                <Box mr="5px">
                                    Set Question Number
                                </Box>
                                <RightArrowIcon />
                            </Button>
                        </Center>
                    </MotionBox>
                </Form>
            )
            }
        </Formik >

    );
};

export default NumberOfQuestion;
