import Navbar from "@/component/landingpage/LandingPageHeader";
import NoAuthLayout from "@/layout/NoAuthLayout";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    Link,
    Separator,
    useBreakpointValue,
    List,
    ListItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const sidebarLinks = [
    "Privacy Overview",
    "Information Collection",
    "Use of Data",
    "Data Protection",
    "Cookies",
    "Third Parties",
    "Your Rights",
];

export default function PrivacyPolicy() {
    const sidebarDisplay = useBreakpointValue({ base: "none", md: "block" });
    const router = useRouter()
    const [path, setPath] = useState("")
    const MotionBox = motion(Box);


    useEffect(() => {
        setPath(router.asPath)
    }, [])

    return (
        <NoAuthLayout title="Privacy Policy">
            <Navbar />
            <MotionBox
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >

                <Flex direction="column" bg={COLORS.white} minH="100vh" mt="60px">
                    {/* Header */}
                    <Box bg={COLORS.blue} borderBottomEndRadius={"20px"} h="100px" color="white" py={10} textAlign="center">
                        <Heading fontSize={"24px"}>Privacy Policy</Heading>
                    </Box>

                    {/* Body */}
                    <Flex direction={{ base: "column", md: "row" }} flex="1">
                        {/* Sidebar */}
                        <Box
                            w={{ base: "100%", md: "250px" }}
                            p={6}
                            bg={COLORS.whitesmoke}
                            borderRight={{ base: "none", md: "1px solid #eee" }}
                            display={sidebarDisplay}
                        >
                            <VStack align="flex-start" spaceX={4}>
                                {sidebarLinks.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={`#${link.toLowerCase().replace(/ /g, "-")}`}
                                        onClick={() => setPath(`/policy#${link.toLowerCase().replace(/ /g, "-")}`)}
                                        fontSize="sm"
                                        fontWeight={path == `/policy#${link.toLowerCase().replace(/ /g, "-")}` ? "800" : "400"}
                                        _hover={{ color: COLORS.blue }}
                                    >
                                        {link}
                                    </Link>
                                ))}
                            </VStack>
                        </Box>

                        {/* Content */}
                        <Box flex="1" p={{ base: 4, md: 8 }}>
                            <Section
                                id="information-collection"
                                title="Types of information we collect online"
                            >
                                <Text mb={2}>
                                    We collect information that helps us provide better services. This includes:
                                </Text>
                                <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc", marginBottom: "1rem" }}>
                                    <li style={{ marginBottom: "0.5rem" }}>Personal Information</li>
                                    <li style={{ marginBottom: "0.5rem" }}>Account Information</li>
                                    <li style={{ marginBottom: "0.5rem" }}>Device and Usage Information</li>
                                </ul>
                            </Section>

                            <Separator my={10} />

                            <Section
                                id="automated-info"
                                title="Information that may be collected automatically"
                            >
                                <Text mb={2}>Examples of data collected automatically include:</Text>
                                <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc", marginBottom: "1rem" }}>
                                    <li style={{ marginBottom: "0.5rem" }}>IP address</li>
                                    <li style={{ marginBottom: "0.5rem" }}>Device information</li>
                                    <li style={{ marginBottom: "0.5rem" }}>Browser type</li>
                                    <li style={{ marginBottom: "0.5rem" }}>Interaction data</li>
                                </ul>
                            </Section>

                            <Separator my={10} />

                            <Section id="use-of-data" title="How we use your information">
                                <Text>
                                    We use your information to improve user experience, communicate updates,
                                    and enhance security.
                                </Text>
                            </Section>
                            <Separator my={10} />
                            <Section id="data-protection" title="Data Protection">
                                <Text>
                                    Data protection involves securing information from unauthorized access, leaks, or breaches through encryption, firewalls, access controls, and regular audits.
                                </Text>
                            </Section>
                            <Separator my={10} />
                            <Section id="cookies" title="🍪 Cookies">
                                <Text>
                                    Cookies are small files stored on your device to remember settings, track user activity, or authenticate sessions. Some are essential; others are used for analytics or ads.
                                </Text>
                            </Section>
                            <Separator my={10} />
                            <Section id="third-parties" title="🤝 Third Parties">
                                <Text>
                                    Organizations may share data with third-party providers for hosting, analytics, advertising, or legal reasons. These third parties must follow strict data protection rules.
                                </Text>
                            </Section>
                            <Separator my={10} />
                            <Section id="your-rights" title="📜 Your Rights">
                                <Text>
                                    Users typically have rights like accessing their data, requesting corrections or deletion, opting out of tracking, and filing complaints under laws like GDPR or CCPA.
                                </Text>
                            </Section>
                        </Box>
                    </Flex>
                </Flex>
            </MotionBox>
        </NoAuthLayout>
    );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
    return (
        <Box id={id} mb={10}>
            <Heading size="md" mb={4}>
                {title}
            </Heading>
            <Box>{children}</Box>
        </Box>
    );
}
