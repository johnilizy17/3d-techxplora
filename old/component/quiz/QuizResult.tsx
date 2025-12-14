import React, { useEffect, useRef } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Button
} from '@chakra-ui/react';
import StarIcon from '../asset/StarIcon';
import { COLORS } from '@/utils/theme';
import { useSelector } from 'react-redux';
import { submitResult } from '@/url/route/quiz';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/router';
import WinnerStarIcon from '../asset/WinnerStarIcon';

const QuizResult = () => {
    const cardBg = 'white';
    const bannerBg = 'success.500';
    const scoreBg = 'gray.50';
    const textColor = 'gray.600';
    const scoreColor = 'gray.800';
    const { questions, result2 } = useSelector((a: { question: any }) => a.question);
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth);
    const toast = useCustomToast();
    const router = useRouter();
    const hasSubmitted = useRef(false); // ✅ prevents double submission

    function countCorrect(answers: any) {
        if (!answers || answers.length === 0) return 0;
        return answers.filter((a: any) => a.is_correct == 1).length;
    }

    function calculateScore(answers: any) {
        if (!answers || answers.length === 0) return 0;
        const total = answers.length;
        const correct = answers.filter((a: any) => a.is_correct == 1).length;
        const percentage = (correct / total) * 100;
        return Math.round(percentage);
    }

    function calculateAmount(percentage: any, total: any) {
        if (total <= 0) return 0;
        return Math.round((percentage / 100) * total);
    }

    async function SubmitScore() {
        try {
            const xp = !temporary.xp ? 0 : temporary.p_xp ? (temporary.xp < countCorrect(result2) * temporary.p_xp ? temporary.xp : countCorrect(result2) * temporary.p_xp) : (temporary.xp < countCorrect(result2) * 1 ? temporary.xp : countCorrect(result2) * 1)
            const payload = {
                student_id: user.id,
                quiz_code: temporary.quiz_code,
                admin_code: temporary.admin_code,
                group_code: temporary.group_code,
                xp: xp,
                answers: result2,
                score: calculateScore(result2)
            };
            await submitResult(payload);
            toast("Result Submitted", "success");
        } catch (err: any) {
            toast(err?.message || 'failed to Submit Result', 'error');
        }
    }

    useEffect(() => {
        if (!hasSubmitted.current) {
            hasSubmitted.current = true;
            SubmitScore();
        }
    }, []);

    return (
        <>
            <Box
                shadow="xl"
                w="full"
                minW={"320px"}
                overflow="hidden"
                position="relative"
                bg={COLORS.whitesmoke}
                h="auto"
            >
                {/* Complete Banner */}
                <Box
                    position="relative"
                    py={3}
                    px={6}
                    textAlign="center"
                    _before={{
                        content: '""',
                        position: 'absolute',
                        bottom: '-10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '15px solid transparent',
                        borderRight: '15px solid transparent',
                        borderTop: `10px solid`,
                        borderTopColor: bannerBg,
                    }}
                >
                    <Text
                        color={COLORS.blue}
                        fontWeight="bold"
                        fontSize="lg"
                        textTransform="uppercase"
                        letterSpacing="wider"
                    >
                        Complete
                    </Text>
                </Box>

                <Box py={12} px={8}>
                    <VStack spaceX={6} textAlign="center">
                        {/* Title */}
                        <Text
                            fontSize="xl"
                            fontWeight="semibold"
                            color={scoreColor}
                            lineHeight="shorter"
                        >
                            {temporary.title}
                        </Text>

                        {/* Stars */}
                        <HStack spaceX={2}>
                            {[0, 1, 2, 3, 4].map((star) => (
                                <WinnerStarIcon
                                    key={star}
                                    filled={calculateScore(result2) > (star * 20)}
                                    size={star == 3 ? 48 : star == 4 ? 24 : 24 * (star + 1)}
                                />
                            ))}
                        </HStack>

                        {/* Score Section */}
                        <VStack spaceX={2}>
                            <Text
                                fontSize="sm"
                                color={textColor}
                                fontWeight="medium"
                            >
                                you score
                            </Text>
                            <Box
                                bg={scoreBg}
                                px={6}
                                py={4}
                                borderRadius="xl"
                                border="2px"
                                borderColor={'gray.200'}
                            >
                                <Text
                                    fontSize="5xl"
                                    fontWeight="bold"
                                    color={scoreColor}
                                    lineHeight="none"
                                >
                                    {calculateScore(result2)} %
                                </Text>
                            </Box>
                        </VStack>

                        {/* Achievement Message */}
                        <Text
                            fontSize="sm"
                            color={textColor}
                            textAlign="center"
                            lineHeight="relaxed"
                            maxW="280px"
                        >
                            Your score {countCorrect(result2)} out of {result2.length} question and have gotten {!temporary.xp ? 0 : temporary.p_xp ? (temporary.xp < countCorrect(result2) * temporary.p_xp ? temporary.xp : countCorrect(result2) * temporary.p_xp) : (temporary.xp < countCorrect(result2) * 1 ? temporary.xp : countCorrect(result2) * 1)} xp
                        </Text>
                        <Box h={"full"} />
                        {/* Continue Button */}
                        <Button
                            bg={COLORS.blue}
                            color="white"
                            size="lg"
                            w="full"
                            borderRadius="xl"
                            fontWeight="bold"
                            fontSize="md"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            py={6}
                            _hover={{
                                bg: 'warning.600',
                                transform: 'translateY(-1px)',
                                shadow: 'lg',
                            }}
                            _active={{
                                bg: 'warning.700',
                                transform: 'translateY(0)',
                            }}
                            transition="all 0.2s"
                            onClick={() => router.push("/dashboard")}
                        >
                            Complete
                        </Button>
                    </VStack>
                </Box>
            </Box>
        </>
    );
};

export default QuizResult;
