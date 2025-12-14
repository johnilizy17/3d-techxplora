import { store } from "@/url/redux/store";
import { COLORS } from "@/utils/theme";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { Poppins, Plus_Jakarta_Sans } from 'next/font/google';
import Link from "next/link";
import { PagesTopLoader } from "nextjs-toploader/pages";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function Rapper({ children }: any) {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // Prevents SSR mismatch

    return (
        <Provider store={store}>
            <ChakraProvider value={defaultSystem}>
                <Link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <Link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <PagesTopLoader color={COLORS.blue} shadow={`0 0 10px ${COLORS.lighter_blue}, 0 0 5px ${COLORS.blue}`} />
                {children}

            </ChakraProvider>

        </Provider>
    )
}