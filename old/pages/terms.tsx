import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Box } from "@chakra-ui/react";
import { COLORS } from "@/utils/theme";
import Navbar from "@/component/landingpage/LandingPageHeader";
import NoAuthLayout from "@/layout/NoAuthLayout";
import { motion } from "framer-motion";

export default function Terms() {

    const MotionBox = motion(Box);

    return (
        <NoAuthLayout title="Terms and Conditions">
            <Navbar />
            <MotionBox
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                color={COLORS.black} bg={COLORS.whitesmoke}>
                <Box className="fade-slide bottom" px={["20px", "20px", "20px", "120px"]} pt="0px">
                    <Box h="100px" />
                    <Box fontWeight={"800"} mb={2} textAlign={"center"} fontSize={"28px"}>TechXplore TERMS AND CONDITIONS</Box>
                    <Box fontWeight={"500"} mb={8} fontSize={"14px"}>
                        This Terms and Conditions Agreement ("Agreement") is a legally binding contract between TechXplore ("Company") and the user ("User"). By accessing or using our platform, the User agrees to be bound by the terms set forth herein.
                    </Box>

                    <Section title="INTRODUCTION TO TECHXPLORE">
                        TechXplore is an education technology platform that offers interactive quizzes to students and partners. The platform provides real-time assessment tools and returns detailed results to users for academic or professional purposes.
                    </Section>

                    <Section title="ELIGIBILITY REQUIREMENTS">
                        <li>Users must be at least 13 years old or have parental/guardian consent to use the platform.</li>
                        <li>Partners must be legally registered institutions or entities.</li>
                        <li>Users agree to provide accurate information during registration and use the platform for lawful purposes only.</li>
                    </Section>

                    <Section title="USE OF SERVICES">
                        <li>TechXplore provides access to various quizzes tailored to educational and skill-assessment needs.</li>
                        <li>Users may access quizzes based on their roles (e.g., student, educator, partner).</li>
                        <li>TechXplore may update content or service features at any time without prior notice.</li>
                    </Section>

                    <Section title="RESULTS AND FEEDBACK">
                        <li>Users will receive automated results upon quiz completion.</li>
                        <li>Results may be used for academic evaluation, self-assessment, or institutional reporting.</li>
                        <li>TechXplore is not responsible for external interpretation or misuse of result data.</li>
                    </Section>

                    <Section title="DATA PRIVACY AND SECURITY">
                        <li>TechXplore collects and stores personal and performance data for service enhancement.</li>
                        <li>User data is protected using industry-standard encryption and security protocols.</li>
                        <li>We do not sell personal data to third parties without user consent.</li>
                    </Section>

                    <Section title="ACCEPTABLE USE POLICY">
                        <li>Users shall not attempt to hack, modify, or reverse-engineer the platform.</li>
                        <li>Plagiarism, cheating, or use of bots during quizzes is strictly prohibited.</li>
                        <li>TechXplore reserves the right to ban or restrict accounts violating these rules.</li>
                    </Section>

                    <Section title="LIMITATION OF LIABILITY">
                        <li>TechXplore does not guarantee specific outcomes from quiz participation.</li>
                        <li>We are not liable for any academic, legal, or employment decisions made based on quiz results.</li>
                    </Section>

                    <Section title="TERMINATION CLAUSE">
                        <li>TechXplore may suspend or terminate access to the platform for breach of these terms.</li>
                        <li>Users may delete their account at any time via platform settings.</li>
                    </Section>

                    <Section title="GOVERNING LAW">
                        This Agreement shall be governed by and interpreted under the laws of the jurisdiction in which TechXplore operates.
                    </Section>

                    <Section title="ELECTRONIC ACCEPTANCE">
                        By clicking "Agree" or using the platform, the User consents to the terms and acknowledges this Agreement as legally binding.
                    </Section>

                    <Box mb="40px" fontWeight={"600"}>
                        I AGREE TO THE TERMS AND CONDITIONS OF TECHXPLORE.
                    </Box>
                </Box>
            </MotionBox>
        </NoAuthLayout>
    );
}

function Section({ title, children }: { title: string, children: any }) {
    return (
        <section className="sm-container mt-lg fade-slide bottom" style={{ marginBottom: 20 }}>
            <Box fontWeight={"700"} fontSize={"20px"} mb={2}>{title}</Box>
            <blockquote style={{ fontWeight: "400" }}>{children}</blockquote>
        </section>
    );
}