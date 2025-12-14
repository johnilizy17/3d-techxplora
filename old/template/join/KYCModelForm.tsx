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
import useCustomToast from "@/hooks/useCustomToast";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setTemporaryStorage, VerifyAdminCode } from "@/url/redux/slices/authSlice";
import { verifyQuizCode } from "@/url/route/verification";
import { FaAddressCard, FaCity, FaSatellite, FaTimes, FaUnlockAlt } from "react-icons/fa";
import { getUserProfile, updateTeachers } from "@/url/route/teacher";
import { updateStudentDetails } from "@/url/route/student";

const KYCModelForm = ({ setOpen }: { setOpen: (a: boolean) => void }) => {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);
    const router = useRouter()
    const toast = useCustomToast();
    const dispatch = useDispatch();
    const validationSchema = Yup.object({
        city: Yup.string()
            .required('City is required'),
        state: Yup.string().required('State is required'),
        lga: Yup.string().required('Local government is required'),
        date_of_birth: Yup.string().required('Date of Birth is required')

    });

    const verifyCodeDetails = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            let updateDetails;

            if (user.accountable_type === "App\\Models\\Teacher") {
                const userData = await getUserProfile("teachers", user.id);
                delete userData.password;
                delete userData.phone_number;
                delete userData.email;
                delete values.email;
                updateDetails = await updateTeachers({ ...userData, ...values, is_verified: 0 });
            } else {
                const userData = await getUserProfile("students", user.id);
                delete userData.password;
                delete userData.phone_number;
                delete userData.email;
                delete values.email;
                updateDetails = await updateStudentDetails({ ...userData, ...values, is_verified: 0 });
            }
            dispatch(setAuth({ ...user, ...values  }));

            setOpen(false);
            toast("KYC verfied", "success")
            setSubmitting(false);
        } catch (error: any) {
            toast(error.response.data.message || error?.message || 'Failed to verify', 'error');
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
            initialValues={{}}
            onSubmit={verifyCodeDetails}
            enableReinitialize={true}
        // validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, touched, handleChange, values }) => (
                <Form>
                    <Center flexDir={"column"}>
                        <Box maxW={"500px"} w="full"
                        >
                            <CustomInput
                                label='Date of Birth'
                                name='date_of_birth'
                                placeholder='Enter date of birth'
                                fieldProps={{ type: 'date' }}
                                leftIcon={<Box p={4}><FaTimes /> </Box>}
                                typeInput=''
                                disabled={true}
                            />
                        </Box>
                        <Box maxW={"500px"} w="full"
                        >
                            <CustomInput
                                label='Address'
                                name='address'
                                placeholder='Enter your code'
                                fieldProps={{ type: 'text' }}
                                leftIcon={<Box p={4}><FaAddressCard /> </Box>}
                                typeInput=''
                            />
                        </Box>

                        <Box maxW={"500px"} w="full"
                        >
                            <CustomInput
                                label='Local Government Area'
                                name='lga'
                                placeholder='Enter Local Government Area'
                                fieldProps={{ type: 'text' }}
                                leftIcon={<Box p={4}><FaUnlockAlt /> </Box>}
                                typeInput=''
                            />
                        </Box>
                        <Box maxW={"500px"} w="full"
                        >
                            <CustomInput
                                label='City'
                                name='city'
                                placeholder='Enter City'
                                fieldProps={{ type: 'text' }}
                                leftIcon={<Box p={4}><FaCity /> </Box>}
                                typeInput=''
                                disabled={true}
                            />
                        </Box>
                        <Box maxW={"500px"} w="full"
                        >
                            <CustomInput
                                label='State'
                                name='state'
                                placeholder='Enter State'
                                fieldProps={{ type: 'text' }}
                                leftIcon={<Box p={4}><FaSatellite /> </Box>}
                                typeInput=''
                            />
                        </Box>
                        <Box maxW={"500px"} w="full"
                        >
                            <CustomInput
                                label='Postal Code'
                                name='postal_code'
                                placeholder='Enter Postal Code'
                                fieldProps={{ type: 'text' }}
                                leftIcon={<UserIcon />}
                                typeInput=''
                            />
                        </Box>
                    </Center>
                    <Center flexDir="column" my="34px">
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
                                Verify
                            </Box>
                        </Button>
                    </Center>
                </Form>
            )}
        </Formik>

    );
};

export default KYCModelForm;