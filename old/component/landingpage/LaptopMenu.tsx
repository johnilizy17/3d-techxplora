import { navRouters } from '@/utils/constants';
import { COLORS } from '@/utils/theme';
import {
    HStack,
    Text,
    Link,
    Box
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function LaptopMenu() {

    const router = useRouter()

    function ColorSection(path: string) {
        const active = router.pathname === path
        return active ? COLORS.blue : COLORS.deep_black
    }

    function DisableDashboard(path: string) {
        if (path.includes("discord")) return "none"
        const active = path.includes("dashboard/") ? "none" : "block"
        return active
    }

    return (
        <Box display={["none", "none", "none", "block"]}>
            <HStack align="start" spaceX={3}>
                {navRouters.map((a, b) => (
                    <Box fontSize="13px" w="100px" onClick={() => router.push(a.nav)} display={DisableDashboard(a.nav)} cursor="pointer" color={ColorSection(a.nav)} key={b}>
                        {a.name}
                    </Box>
                ))}
            </HStack>
        </Box>
    );
}
