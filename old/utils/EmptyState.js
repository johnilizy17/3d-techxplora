import { Center, Text } from '@chakra-ui/react'
import Lottie from "lottie-react";
import emptyAnimation from './empty.json';

export function EmptyState({ title, width = "300px", height = "300px" }) {

    return (
        <Center width={"full"} height={height} flexDirection="column">
            <Center w={width} mb="10px">
                <Lottie
                    animationData={emptyAnimation}
                    loop={true}
                />
            </Center>
            <Text fontWeight="600">{title ? title : "No data found"}</Text>
        </Center>
    )
}