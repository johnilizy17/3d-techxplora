// components/PlaySmarter.tsx
import StudentIcon from "@/component/asset/StudentIcon";
import { COLORS } from "@/utils/theme";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import {
    Box,
    Button,
    Center,
    Icon,
    Image,
    Dialog,
    Flex,
    Text,
    VStack,
    Portal,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdOutlineMenuBook, MdSchool } from "react-icons/md";

// Motion components
const MotionText = motion(Text);
const MotionBox = motion(Box);
const MotionCenter = motion(Center);

export default function HomeBanner() {
    const router = useRouter();
    const { open, onOpen, onClose } = useDisclosure();

    // Animation controls for one-time page load animations
    const titleControls = useAnimation();
    const subtitleControls = useAnimation();
    const ringControls = useAnimation();
    const buttonsControls = useAnimation();

    useEffect(() => {
        // Play animations sequentially
        titleControls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });
        subtitleControls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } });
        ringControls.start({ y: [0, -5, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } });
        buttonsControls.start({ y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } });
    }, []);

    return (
        <>
            {/* Dialog */}
            <Portal>
                <Dialog.Root placement={"center"} open={open} onOpenChange={(e) => onClose()}>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title p={4}>Account Type</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack spaceY={4} p={6}>
                                    {/* Business Card */}
                                    <Flex
                                        align="center"
                                        w="full"
                                        p={4}
                                        border="1px solid"
                                        borderColor="blue.300"
                                        borderRadius="lg"
                                        bg="blue.50"
                                        onClick={() => {
                                            router.push("/auth/signup")
                                            onClose()

                                        }}
                                        _hover={{ cursor: "pointer", shadow: "md" }}
                                    >
                                        <Box
                                            bg="blue.400"
                                            borderRadius="md"
                                            p={3}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr={4}
                                        >
                                            <Icon as={MdSchool} boxSize={6} color="white" />
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold" color="#000">Student</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                Learn, join quizzes and get great score
                                            </Text>
                                        </Box>
                                    </Flex>

                                    {/* Personal Card */}
                                    <Flex
                                        align="center"
                                        w="full"
                                        p={4}
                                        border="1px solid"
                                        borderColor="gray.200"
                                        borderRadius="lg"
                                        bg="white"
                                        onClick={() => {
                                            router.push("/auth/group")
                                            onClose()
                                        }}
                                        _hover={{ cursor: "pointer", shadow: "md" }}
                                    >
                                        <Box
                                            bg="blue.100"
                                            borderRadius="md"
                                            p={3}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            mr={4}
                                        >
                                            <Icon as={MdOutlineMenuBook} boxSize={6} color="blue.500" />
                                        </Box>
                                        <Box>
                                            <Text fontWeight="bold" color="#000">Teacher</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                Create quize or Manage result
                                            </Text>
                                        </Box>
                                    </Flex>
                                </VStack>
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            </Portal>

            {/* Hero Section */}
            <Flex direction="column" align="center" justify="center" h="100vh" overflow="scroll" scrollbar="hidden" bg="white">
                <Center
                    pos="relative"
                    minH="350px"
                    color={COLORS.light_blue}
                    bgImage="url('/home/bg_home.png')"
                    bgPos="bottom"
                    bgRepeat="no-repeat"
                    bgSize="cover"
                    px={{ base: "40px", md: 0 }}
                    w="full"
                    h="55vh"
                    alignItems={{ base: "start", md: "center" }}
                    flexDir="column"
                    justifyContent="center"
                >
                    {/* Title */}
                    <MotionText fontWeight="bold" fontFamily="Poppins" animate={titleControls} initial={{ x: 100, opacity: 0 }} zIndex={2}>
                        <Text fontSize={{ base: "64px", md: "100px" }} lineHeight={{ base: "64px", md: "100px" }}>
                            Play
                        </Text>
                    </MotionText>
                    <MotionText fontWeight="bold" fontFamily="Poppins" animate={subtitleControls} initial={{ x: 100, opacity: 0 }} zIndex={2}>
                        <Text fontSize={{ base: "64px", md: "100px" }} lineHeight={{ base: "64px", md: "100px" }}>
                            Smarter
                        </Text>
                    </MotionText>

                    {/* 3D Ring */}
                    <Box mt={4} zIndex={1} pos="absolute" mb={{ base: "-70px", md: "-50px" }} ml={{ base: "auto", md: "230px" }} left={{ base: "120px", md: "auto" }}>
                        <MotionBox animate={ringControls} initial={{ y: 0 }}>
                            <Image src="home/ring.png" alt="3D Ring" objectFit="contain" boxSize={{ base: "280px", md: "370px" }} />
                        </MotionBox>
                    </Box>
                </Center>

                {/* Action Buttons */}
                <MotionCenter animate={buttonsControls} initial={{ y: 100, opacity: 0 }} width="100%">
                    <VStack h="45vh" px={{ base: 4, md: 8 }} spaceY={3} w="full" maxW="sm">
                        <Text fontSize={{ base: "24px", md: "xl" }} fontStyle="italic" fontFamily="Poppins" fontWeight="medium">
                            <Box>Join the Challenge</Box>
                        </Text>

                        <Button
                            colorScheme="purple"
                            variant="solid"
                            w="full"
                            fontFamily="Poppins"
                            onClick={onOpen}
                            h="90px"
                            borderRadius="30px"
                            bg={COLORS.purple}
                            fontWeight="semibold"
                        >
                            <Image src="/home/hat.png" alt="hat" />
                            <Box>For Students & Teachers</Box>
                        </Button>

                        <Button
                            colorScheme="purple"
                            variant="solid"
                            w="full"
                            h="90px"
                            fontFamily="Poppins"
                            onClick={() => router.push("/auth/signup?page=3")}
                            borderRadius="30px"
                            bg={COLORS.purple}
                            fontWeight="semibold"
                        >
                            <Image src="/home/teacher.png" alt="hat" />
                            For Sponsors & Partners
                        </Button>
                    </VStack>
                </MotionCenter>
            </Flex>
        </>
    );
}
