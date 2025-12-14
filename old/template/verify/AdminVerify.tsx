import CopyIcon from "@/component/asset/CopyIcon";
import useCustomToast from "@/hooks/useCustomToast";
import { completeGroupCode } from "@/url/route/verification";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Text,
    Flex,
    Avatar,
    VStack,
    HStack,
    Button,
    useClipboard,
    Card,
    CardBody,
    CardRoot,
    AvatarRoot,
    AvatarFallback,
    Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminVerify({ temporary }: { temporary: any }) {
    const { copied, copy } = useClipboard();

    const [screenHeight, setScreenHeight] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const showMessage = useCustomToast();
    const router = useRouter();

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
        <Box>
            <CardRoot w="full" rounded="2xl" shadow="lg" p={4} bg="white">
                <CardBody>
                    <VStack spaceX={4}>
                        <Center mb="20px" justifyContent={"space-between"} w="full">
                            <AvatarRoot>
                                <AvatarFallback name={temporary.profile_name} bg="gray.300" />
                            </AvatarRoot>
                            <Text fontSize={["16px", "lg"]} textAlign={"end"} w={["250px", "auto"]} fontWeight="semibold" color="blue.700">
                                {temporary.profile_name}
                            </Text>
                        </Center>
                        <Flex
                            justify="space-between"
                            align="center"
                            bg="purple.100"
                            px={4}
                            py={2}
                            rounded="xl"
                            w="full"
                            mt={3}
                        >
                            <Text fontFamily="mono" color="purple.700">
                                {temporary.admin_code}
                            </Text>
                            <CopyIcon code={temporary.admin_code} />
                        </Flex>

                        <Text fontSize="xs" color="gray.500" textAlign="center" mt={3}>
                            Kindly join your choosen school
                        </Text>
                    </VStack>
                </CardBody>
            </CardRoot>
            <Center flexDir="column" mt={screenHeight > 600 ? "calc(100vh - 550px)" : "80px"} mb="34px">
                <Button
                    colorScheme="light"
                    bg={COLORS.blue}
                    w="full"
                    maxW={"350px"}
                    color={COLORS.white}
                    fontWeight={"500"}
                    fontFamily={"Poppins"}
                    onClick={()=>router.push(`/auth/signup?code=${temporary.admin_code}`)}
                    fontSize={"16px"}
                    type="submit"
                    h="48px"
                    borderRadius={"1234px"}
                >
                    <Box mr="5px">
                        Join
                    </Box>
                </Button>
            </Center>

        </Box>
    );
}
