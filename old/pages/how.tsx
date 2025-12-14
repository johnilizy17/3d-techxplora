"use client";
import Navbar from "@/component/landingpage/LandingPageHeader";
import NoAuthLayout from "@/layout/NoAuthLayout";
import { Box, Heading, Text, Container, AspectRatio, VStack } from "@chakra-ui/react";

export default function TutorialPage() {
    return (

        <NoAuthLayout title="TechXplora App Tutorial">
            <Navbar />
            <Container maxW="6xl" mt="80px" py={12}>
                <VStack gap={8} textAlign="center">
                    {/* Page Header */}
                    <Box>
                        <Heading fontSize={{ base: "2xl", md: "4xl" }} color="gray.800">
                            TechXplora App Tutorial
                        </Heading>
                        <Text fontSize={{ base: "md", md: "lg" }} color="gray.600" mt={3}>
                            Learn how to use the TechXplora app effectively through this step-by-step video guide.
                        </Text>
                    </Box>

                    {/* Video Section */}
                    <AspectRatio ratio={16 / 9} w="100%" maxW="900px" borderRadius="xl" overflow="hidden" boxShadow="lg">
                        <iframe
                            src="https://www.youtube.com/embed/3Irx1TdHvfA"
                            title="TechXplora App Tutorial"
                            allowFullScreen
                        />
                    </AspectRatio>

                    {/* Optional Description Section */}
                    <Box maxW="3xl">
                        <Text fontSize="md" color="gray.600" lineHeight="tall">
                            This tutorial covers everything you need to know — from creating an account and navigating
                            the dashboard to managing your settings and accessing advanced features. Watch the video
                            to get the most out of TechXplora!
                        </Text>
                    </Box>
                </VStack>
            </Container>
        </NoAuthLayout>
    );
}
