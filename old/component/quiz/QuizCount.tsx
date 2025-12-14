import { useEffect, useState } from "react";
import { Box, Center, Text } from "@chakra-ui/react";
import { COLORS } from "@/utils/theme";

export default function QuizCount({ time, handleChange }: { time: number, handleChange:any }) {
    const [seconds, setSeconds] = useState(Math.round(time * 60));

    useEffect(() => {

        if (time) {
            
            if (seconds === 0) {
                // handleChange()
                return;}

            const timer = setInterval(() => {
                setSeconds((prev) => prev - 1);
                
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setSeconds(Math.round(time * 60))
        }

    }, [seconds, time]);

    return (
        <Center borderRadius={"12px"} w={seconds <= 5 ? "auto" : "40px"} h={seconds <= 5 ? "auto" : "40px"} bg={seconds <= 5 ? "transparent" : COLORS.blue} >
            <Text fontSize="16px" fontWeight="600" color={seconds <= 5 ? COLORS.red : COLORS.white}>
                {seconds > 0 ? `${seconds}` : "Time's up!"}
            </Text>
        </Center>
    );
}
