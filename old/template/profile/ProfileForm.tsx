// components/PersonalInfoForm.tsx
import {
    Box,
    Input,
    Select,
    Avatar,
    Button,
    Text,
    Flex,
    Icon,
    InputGroup,
    AvatarRoot,
    AvatarImage,
    Center,
    Separator,
} from "@chakra-ui/react";
import { MdPhone, MdUpload } from "react-icons/md";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CustomInput from "../tools/CustomInput";
import UserIcon from "@/component/asset/UserIcon";
import EmailIcon from "@/component/asset/EmailIcon";
import XIcon from "@/component/asset/XIcon";
import { COLORS } from "@/utils/theme";
import CheckIcon from "@/component/asset/CheckIcon";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DragAndDropUpload from "@/utils/AvatarUpload";
import { CustomPhoneInput } from "../tools/CustomPhoneInput";
import { updateTeachers } from "@/url/route/teacher";
import { updateStudentDetails } from "@/url/route/student";
import useCustomToast from "@/hooks/useCustomToast";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
        .matches(/^\+?[0-9\s\-()]{7,}$/, "Enter a valid phone number")
        .required("Phone number is required"),
    accountType: Yup.string().required("Account type is required"),
});

export default function ProfileForm() {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const [image, setImage] = useState<any>()
    const [preview, setPreview] = useState<any>(null);
    const router = useRouter()
    const showToast = useCustomToast()

    const initialValues = {
        ...user
    };

    useEffect(() => {
        if (!image) {
            setPreview(null);
            return;
        }

       const objectUrl = URL.createObjectURL(image[0]);
        setPreview(objectUrl);

        // cleanup when image changes or component unmounts
        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

      const initiateLogin = async (values: any, { setSubmitting }: any) => {
            try {
    
                setSubmitting(true);
                let updateDetails
    
                if (values.accountable_type === "App\\Models\\Teacher") {
                    updateDetails = await updateTeachers(values)
                } else {
                    updateDetails = await updateStudentDetails(values)
                }
                showToast( 'Profile successfully updated', 'success');
                setSubmitting(false);
            } catch (error: any) {
                showToast(error?.message || 'failed to update', 'error');
                setSubmitting(false);
            }
        };
    

    return (
        <Box
            px={{ base: 4, md: 16 }}
            w={"full"}
        >
            <Text fontWeight="bold" mb={4} fontSize="lg">
                Personal Info
            </Text>
            <Text fontSize="sm" color="gray.500" mb={6}>
                You can change your personal information settings here.
            </Text>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                 onSubmit={initiateLogin}
            >
                {({ isSubmitting, setFieldValue, values }) => (

                    <Form>
                        <Box bg={COLORS.white} borderRadius={"32px"} w="full" p={["20px", "40px"]}>

                            {/* Full Name */}
                            <Box w='full' maxW="full">
                                <CustomInput
                                    label='Full Name'
                                    name='fullname'
                                    placeholder='Nakano'
                                    fieldProps={{ type: 'text' }}
                                    leftIcon={<UserIcon />}
                                    typeInput=''
                                    value=''
                                />
                            </Box>
                            <Box w='full' maxW="full" mt="24px">
                                <CustomInput
                                    label='Email Address'
                                    name='email'
                                    placeholder='elementary221b@gmail.com'
                                    fieldProps={{ type: 'text' }}
                                    leftIcon={<EmailIcon />}
                                    typeInput=''
                                    value=''
                                />
                            </Box>

                            <Box w='full' maxW="full" mt="24px">
                                <CustomPhoneInput
                                    label='Phone Number'
                                    name='phone_number'
                                    placeholder='(123) 456-9878'
                                    fieldProps={{ type: 'phone' }}
                                    type='phone'
                                    typeInput="phone"
                                    setFieldValue={setFieldValue}
                                    value={values.phone_number}
                                />
                            </Box>

                            <Box w='full' maxW="full" mt="24px">
                                <CustomPhoneInput
                                    label='Alternate Phone Number'
                                    name='alternate_phone_number'
                                    placeholder='(123) 456-9878'
                                    fieldProps={{ type: 'phone' }}
                                    type='phone'
                                    typeInput="phone"
                                    setFieldValue={setFieldValue}
                                    value={values.alternate_phone_number}
                                />
                            </Box>

                            <Box w='full' maxW="full" mt="24px">
                                <CustomInput
                                    label='Country'
                                    name='country'
                                    placeholder='select Country you will in'
                                    fieldProps={{ type: 'select' }}
                                    type='select'
                                    typeInput="select"
                                    value=''
                                />
                            </Box>

                            <Box w='full' maxW="full" mt="24px">
                                <CustomInput
                                    label='State'
                                    name='state'
                                    placeholder='Select State'
                                    fieldProps={{ type: 'select' }}
                                    type='select'
                                    typeInput="select"
                                    value=''
                                />
                            </Box>

                            <Box w='full' maxW="full" mt="24px">
                                <CustomInput
                                    label='Local Government'
                                    name='lga'
                                    placeholder='Select Local Government'
                                    fieldProps={{ type: 'select' }}
                                    type='select'
                                    typeInput="select"
                                    value=''
                                />
                            </Box>
                            <Box w='full' maxW="full" mt="24px">
                                <CustomInput
                                    label='Postal Code'
                                    name='postal_code'
                                    placeholder='20XXXX'
                                    fieldProps={{ type: 'text' }}
                                />
                            </Box>
                            <Box w='full' maxW="full" mt="24px">
                                <CustomInput
                                    label='Date of Birth'
                                    name='date_of_birth'
                                    placeholder='2025-10-10'
                                    fieldProps={{ type: 'date' }}
                                />
                            </Box>

                            {/* Avatar Section */}
                            <Text fontWeight="700" mt={6} fontSize={"14px"} color={COLORS.deep_gray} mb={2}>
                                Change Avatar
                            </Text>
                            <Flex align="center" gap={4} mb={4}>
                                <AvatarRoot w={["64px", "104px"]} h={["64px", "104px"]} >
                                    <AvatarImage
                                        alt="Uploaded Avatar"
                                        src={preview ? preview : "/leaderboard/1.png"} // fallback to default if no upload
                                    />
                                </AvatarRoot>
                            </Flex>
                            <DragAndDropUpload onFilesAccepted={setImage} />
                        </Box>
                        <Separator my="24px" />

                        {/* Buttons */}
                        <Flex pb="30px" mt={6} justify="end" gap={5}>
                            <Button onClick={()=>router.back()} variant="ghost" w="94px" h="40px" borderRadius={"full"} type="reset">
                                <Box fontWeight={"700"} fontSize={"14px"}>
                                    Cancel
                                </Box>
                                <XIcon width="10" height="10" />
                            </Button>
                            <Button colorScheme="purple" bg={COLORS.deep_purple} w="94px" borderRadius={"full"} h="40px" type="submit" disabled={isSubmitting} loading={isSubmitting}>
                                <Box fontWeight={"700"} fontSize={"14px"}>
                                    Save
                                </Box>
                                <CheckIcon width="10" height="10" color="white" />
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
            <Box h="100px" />
        </Box>
    );
}
