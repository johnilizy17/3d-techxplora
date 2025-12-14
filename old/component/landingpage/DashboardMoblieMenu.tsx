import useCustomToast from '@/hooks/useCustomToast';
import { logoutUser } from '@/url/redux/slices/authSlice';
import { navRouters } from '@/utils/constants';
import { COLORS } from '@/utils/theme';
import {
    VStack,
    Text,
    Link,
    Box,
    Center,
    Icon
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

export default function DashboardMoblieMenu() {

    const router = useRouter()
    const showMessage = useCustomToast()
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)

    function ColorSection(path: string) {
        if (path.includes("discord")) return COLORS.deep_purple
        const active = router.pathname === path
        return active ? COLORS.blue : COLORS.deep_black
    }

    function DisableDashboard(path: string, admin: boolean) {
        if (path.includes("discord")) return "block"
        const active = path.includes("dashboard") ? "block" : "none"
        if (admin) {
            return user && user.is_admin ? "block" : "none"
        } else {
            return active
        }
    }

    const dispatch = useDispatch()

    function DashboardFunction(a: any) {
        if (a.name === "Sign out") {
            router.push("/auth/login")
            dispatch(logoutUser("") as any)
            showMessage("Successfully log out", "success")
        } else {
            router.push(a.nav)
        }
    }

    return (
        <Box p={"16px"}>
            <VStack align="start" spaceY={3}>
                {navRouters.map((a: any, b: number) => (
                    <Center justifyContent={"start"} display={DisableDashboard(a.nav, a.admin)} onClick={() => DashboardFunction(a)} fontSize={"16px"} cursor="pointer" color={a.name === "Sign out" ? "red" : ColorSection(a.nav)} w="full" key={b}>
                        <Icon size="lg" as={a.icon} mr={2} />
                        {a.name}
                    </Center>
                ))}
            </VStack>
        </Box >
    );
}
