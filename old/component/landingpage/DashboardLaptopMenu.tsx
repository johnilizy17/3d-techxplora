import useCustomToast from '@/hooks/useCustomToast';
import { logoutUser } from '@/url/redux/slices/authSlice';
import { navRouters } from '@/utils/constants';
import { COLORS } from '@/utils/theme';
import {
    HStack,
    Text,
    Link,
    Box
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardLaptopMenu() {

    const router = useRouter()
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const dispatch = useDispatch()
    const showMessage = useCustomToast()

    function ColorSection(path: string) {
        const active = router.pathname === path
        return active ? COLORS.blue : COLORS.deep_black
    }

    function DisableDashboard(path: string, a: any) {
        const active = path.includes("dashboard") ? "block" : "none"

        return a.admin && user && user.is_admin ? active : a.admin ? "none" : active
    }

    function DashboardFunction(a: any) {
        if (a.name === "Sign out") {
            dispatch(logoutUser("") as any)
            showMessage("Successfully log out", "success")
            router.push("/")
        } else {
            router.push(a.nav)
        }
    }


    return (
        <Box display={["none", "none", "none", "block"]}>
            <HStack align="start" spaceX={3}>
                {navRouters.map((a, b) => (
                    <Box fontSize="13px" w="100px" onClick={() => DashboardFunction(a)} display={DisableDashboard(a.nav, a)} cursor="pointer" color={ColorSection(a.nav)} key={b}>
                        {a.name}
                    </Box>
                ))}
            </HStack>
        </Box>
    );
}
