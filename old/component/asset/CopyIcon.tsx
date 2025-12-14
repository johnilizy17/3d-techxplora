import useCustomToast from '@/hooks/useCustomToast'
import { Button, Clipboard } from '@chakra-ui/react'
import React from 'react'

export default function CopyIcon({ color, code = "testing", copy = true }: { color?: string, code?: string, copy?: boolean }) {

    const showMessage = useCustomToast();

    return (
        <Clipboard.Root onClick={() => copy && showMessage("successfully copied", "success")} value={code}>
            <Clipboard.Trigger asChild>
                <Clipboard.Indicator />
            </Clipboard.Trigger>
        </Clipboard.Root>
    )
}