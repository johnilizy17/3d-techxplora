import PasswordIcon from "@/component/asset/PasswordIcon";
import Selection from "@/components/select";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Center,
    FieldErrorText,
    FieldLabel,
    FieldRoot,
    Group,
    Input,
    InputGroup,
    Select,
    SelectRoot,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import React, { useState } from "react";

function CustomInput({
    fieldProps = {},
    label,
    name,
    type = "input",
    children,
    value,
    float = false,
    leftIcon = "",
    rightIcon = "",
    placeholder,
    setFieldValue =()=>{},
    selectionData = []
}: any) {
    const [touched, setTouched] = useState(false);
    const [password, setPassword] = useState(true)
    const transitionProperties = {
        transitionProperty: "all",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
    };

    const pickFormField = ({ fieldType, options = {} }: any) => {
        switch (fieldType) {
            case "textarea":
                return (
                    <Textarea
                        position="relative"
                        onFocus={() => setTouched(true)}
                        id={name}
                        name={name}
                        bg="#F1F2F3"
                        h="144px"
                        placeholder={placeholder ? placeholder : ""}
                        borderColor={COLORS["20_gray"]}
                        borderRadius="24px"
                        px="10px"
                        pt="10px"
                        pb="10px"
                        {...options}
                    ></Textarea>
                );
            case "select":
                return (
                    <Selection name={name} placeholder={placeholder} object={selectionData} setFieldValue={setFieldValue} value={value} />
                );

            default:
                return (
                    <Box w="full">
                        {type === "password" ?
                            <Group attached w="full">
                                <Center
                                    borderRadius={"123px"}
                                    borderColor={COLORS["20_gray"]}
                                    borderRightColor={"transparent"}
                                    px={2}
                                    h="48px" borderWidth={"1px"}>
                                    <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9997 6.66634H11.1663V4.99967C11.1663 2.69967 9.29967 0.833008 6.99967 0.833008C4.69967 0.833008 2.83301 2.69967 2.83301 4.99967V6.66634H1.99967C1.08301 6.66634 0.333008 7.41634 0.333008 8.33301V16.6663C0.333008 17.583 1.08301 18.333 1.99967 18.333H11.9997C12.9163 18.333 13.6663 17.583 13.6663 16.6663V8.33301C13.6663 7.41634 12.9163 6.66634 11.9997 6.66634ZM4.49967 4.99967C4.49967 3.61634 5.61634 2.49967 6.99967 2.49967C8.38301 2.49967 9.49967 3.61634 9.49967 4.99967V6.66634H4.49967V4.99967ZM11.1663 16.6663H2.83301C2.37467 16.6663 1.99967 16.2913 1.99967 15.833V9.16634C1.99967 8.70801 2.37467 8.33301 2.83301 8.33301H11.1663C11.6247 8.33301 11.9997 8.70801 11.9997 9.16634V15.833C11.9997 16.2913 11.6247 16.6663 11.1663 16.6663ZM6.99967 14.1663C7.91634 14.1663 8.66634 13.4163 8.66634 12.4997C8.66634 11.583 7.91634 10.833 6.99967 10.833C6.08301 10.833 5.33301 11.583 5.33301 12.4997C5.33301 13.4163 6.08301 14.1663 6.99967 14.1663Z" fill="#323232" />
                                    </svg>
                                </Center>
                                <Input
                                    position="relative"
                                    onFocus={() => setTouched(true)}
                                    id={name}
                                    name={name}
                                    placeholder={placeholder ? placeholder : ""}
                                    fontSize={"16px"}
                                    h="48px"
                                    w="full"
                                    borderWidth="1px"
                                    p="13px"
                                    borderRadius={"123px"}
                                    borderColor={COLORS["20_gray"]}
                                    borderLeftColor={"transparent"}
                                    value={value}
                                    {...options}
                                    color="black"
                                    type={password ? "password" : "text"}
                                    sx={{ fontWeight: "700" }} // this makes typed text bold
                                />
                                <PasswordIcon password={password} setPassword={setPassword} />
                            </Group>
                            :
                            <InputGroup flex="1" startElement={leftIcon} endElement={rightIcon}>
                                <Input
                                    position="relative"
                                    onFocus={() => setTouched(true)}
                                    id={name}
                                    name={name}
                                    placeholder={placeholder ? placeholder : ""}
                                    fontSize={"16px"}
                                    h="48px"
                                    w="full"
                                    borderWidth="1px"
                                    p="13px"
                                    borderRadius={"123px"}
                                    borderColor={COLORS["20_gray"]}
                                    value={value}
                                    {...options}
                                />
                            </InputGroup>}
                    </Box>
                );
        }
    };

    return (
        <>
            <Field name={name}>
                {({ field, form }: any) => {
                    const isInvalid = form.errors[name] && form.touched[name];
                    return (
                        <FieldRoot
                            invalid={isInvalid}
                        >
                            {label && (
                                <FieldLabel
                                    {...transitionProperties}
                                    fontSize="14px"
                                    mt="5px"
                                    fontWeight={"700"}
                                    color={isInvalid ? "red" : COLORS.black}
                                    borderColor={isInvalid && touched ? "red" : "transparent"}
                                >
                                    {label}
                                </FieldLabel>
                            )}
                            {pickFormField({
                                fieldType: type,
                                options: { ...field, ...fieldProps },
                            })}

                            <FieldErrorText fontSize="xs">
                                {form.errors[name]}
                            </FieldErrorText>
                        </FieldRoot>
                    );
                }}
            </Field>
        </>
    );
}

export default CustomInput;