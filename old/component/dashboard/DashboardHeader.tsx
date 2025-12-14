// components/CheckoutHeader.tsx

import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { COLORS } from '@/utils/theme';

export default function DashboardHeader({ title }: { title: string }) {

  const router = useRouter();

  return (
    <Box bg={COLORS.green} py={4} px={4} position="sticky" top={0} zIndex={100}>
      <Flex align="center" justify="space-between">
        {/* Back Button */}
        <IconButton
          onClick={() => router.back()}
          variant="ghost"
          borderRadius={"full"}
          color="white"
          aria-label="Go back"
        >
          <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1L2 7L8 13" stroke="#fff" stroke-width="2" stroke-linecap="round" />
          </svg>
        </IconButton>
        {/* Title */}
        <Text color="white" fontWeight="bold" fontSize="lg" flex="1" textAlign="center">
          {title}
        </Text>

        {/* Placeholder for right side (to center title) */}
        <Box width="40px" /> {/* Equal to IconButton width */}
      </Flex>
    </Box>
  );
}
