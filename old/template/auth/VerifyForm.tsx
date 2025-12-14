import { COLORS } from '@/utils/theme'
import { Box, Center, Image, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailOTP, sendSMS } from '@/utils/NotificationSendWorker';
import useCustomToast from '@/hooks/useCustomToast';
import { setAuth } from '@/url/redux/slices/authSlice';

export default function VerifyForm() {

    const router = useRouter();
    const MotionBox = motion(Box);
    const showMessage = useCustomToast()
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    // Animation controls
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });
    }, []);


    const sendOtp = async (type: string) => {
        try {
            setLoading(true)
            if (type === "email") {
                const code = await sendEmailOTP(user.email)
                dispatch(setAuth({ ...user, code: code }))
                router.push("/auth/otp?type=email")
                showMessage("Email successfully sent", "success")
                setLoading(false)
            } else {
                const code = await sendSMS(user.phone_number)
                dispatch(setAuth({ ...user, code: code }))
                router.push("/auth/otp?type=phone")
                showMessage("OTP successfully sent", "success")
                setLoading(false)
            }
        } catch (err: any) {
            setLoading(false)
            showMessage(err.response.data.message|| "OTP Failed to be sent", "error")
            console.log(err, "error")
        }
    }

    return (
        <MotionBox

            animate={controls}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <Box pos={"relative"}>
                {loading && <Center w="full" position={"absolute"} h="full">
                    <Spinner size={"xl"} />
                </Center>}
                <Center
                    onClick={() => sendOtp("email")}
                    _hover={{ transform: "scale(1.01)", transition: "0.2 ease" }} cursor="pointer" p={4} mt="34px" borderRadius={"12px"} bg="#E4DFFF" h="100px" w="full">
                    <Box w="full">
                        <Box color="#2B638B" fontWeight={"700"} fontFamily={"Poppins"} fontSize={"16px"}>
                            Verify by Email
                        </Box>
                        <Box color={COLORS.gray} w="200px" fontFamily={"Poppins"} fontSize={"12px"}>
                            Ensure it's the right person by verifying their name.
                        </Box>
                    </Box>
                    <Image src="/auth/email.png" alt="email" />
                </Center>
                <Center
                    onClick={() => user.phone_number ? sendOtp("phone") : router.push("/auth/phone")}
                    _hover={{ transform: "scale(1.01)", transition: "0.2 ease" }} cursor="pointer" p={4} borderRadius={"12px"} bg="#A3F2D7" h="100px" mt="12px" w="full">
                    <Box w="full">
                        <Box color={COLORS.black} fontWeight={"700"} fontFamily={"Poppins"} fontSize={"16px"}>
                            Verify by Phone
                        </Box>
                        <Box color={COLORS.gray} w="200px" fontFamily={"Poppins"} fontSize={"12px"}>
                            Verify the guest's code to grant them property access.
                        </Box>
                    </Box>
                    <Image src="/auth/dice.png" alt="Dice" />
                </Center>
            </Box>
        </MotionBox>
    )
}