import { getResult } from "@/url/redux/slices/questionSlice"
import MarkPopup from "@/utils/MarkPopup"
import { COLORS } from "@/utils/theme"
import { VStack, RadioGroup, Box } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const QuizAnswer = ({ options, value, setValue }: { options: any, value: any, setValue: any }) => {

    const [result, setResult] = useState(false);
    const { questions, result2 } = useSelector((a: { question: any }) => a.question)
    const dispatch = useDispatch();

    return (
        <Box>
            {value && <MarkPopup result={result} />}
            <RadioGroup.Root colorPalette={COLORS.blue} value={value} onValueChange={(e) => {
                const selectAnwser = options.filter((a: any) => {
                    if (a.option === e.value) {
                        return a
                    }
                })
                if (value) {

                } else {
                    const data = options.filter((a: any) => {
                        if (a.option === e.value) {
                            return a
                        }
                    })

                    dispatch(getResult([...result2, selectAnwser[0]]) as any)
                    if (data[0].is_correct == 1) {
                        setResult(true)
                    } else {
                        setResult(false)
                    }
                    setValue(e.value)
                }
            }}>
                <VStack p={4} gap="6">
                    {options.map((item: any) => (
                        <RadioGroup.Item w="full" bg={item.option === value ? (result ? COLORS.blue : COLORS.red) : "transparent"} borderWidth={"1px"} borderColor={item.option === value ? COLORS.green : COLORS.gray} color={item.option === value ? COLORS.white : COLORS.black} p={4} borderRadius={"18px"} key={item.option} value={item.option}>
                            <RadioGroup.ItemText w="full">{item.option}</RadioGroup.ItemText>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                        </RadioGroup.Item>
                    ))}
                </VStack>
            </RadioGroup.Root>
        </Box>
    )
}
