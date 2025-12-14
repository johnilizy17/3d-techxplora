import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from 'react'
import { Box, FieldLabel } from '@chakra-ui/react';

export function CustomPhoneInput({
    label,
    name,
    value,
    placeholder,
    setFieldValue = () => { },
}: any) {
    // `value` will be the parsed phone number in E.164 format.
    // Example: "+12133734253".
    const [valueData, setValueData] = useState(value);

    return (
        <Box w="full">
            {label && (
                <Box
                    fontSize="14px"
                    mt="5px"
                    fontWeight={"700"}
                    mb="5px"
                >
                    {label}
                </Box>
            )}
            <PhoneInput
                placeholder="Enter phone number"
                inputStyle={{ width: "100%", height: "48px", marginLeft: "10px", borderRadius: "48px", background: "transparent" }}
                containerStyle={{ borderRadius: "48px" }}
                searchPlaceholder={placeholder}
                buttonStyle={{ borderTopLeftRadius: "48px", borderBottomLeftRadius: "48px", padding: "5px" }}
                value={value}
                onChange={(e: any) => {
                    setValueData(e)
                    setFieldValue(name, e)
                }}
            />
        </Box>
    )
}