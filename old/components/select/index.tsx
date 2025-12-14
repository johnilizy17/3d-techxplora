"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { useEffect } from "react"

export default function Selection({ object, name, placeholder, setFieldValue, value }: { object: any, name: string, placeholder: string, setFieldValue: any, value: any }) {

    const frameworks = createListCollection({
        items: object,
    })

    return (
        <Select.Root name={name} collection={frameworks}
            value={value}            // Formik value for this field
            onValueChange={(val) => setFieldValue(name, val.value)}  // Update Formik on change
            width="full">
            <Select.HiddenSelect />

            <Select.Control>
                <Select.Trigger px="16px" py="12px" borderRadius="12px" borderWidth="1px">
                    <Select.ValueText placeholder={placeholder || "Select an option"} />
                </Select.Trigger>

                <Select.IndicatorGroup>
                    <Select.Indicator mr="4px" /> {/* Adds margin to the icon */}
                </Select.IndicatorGroup>
            </Select.Control>

            <Portal>
                <Select.Positioner>
                    <Select.Content>
                        {frameworks.items.map((framework: any) => (
                            <Select.Item
                                item={framework}
                                key={framework.value}
                                px="16px"
                                py="12px"
                            >
                                {framework.label}
                                <Select.ItemIndicator />
                            </Select.Item>
                        ))}
                    </Select.Content>
                </Select.Positioner>
            </Portal>
        </Select.Root>
    )
}
