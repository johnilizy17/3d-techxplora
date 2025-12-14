import React, { useEffect, useState } from 'react'
import {
    Box,
    Flex,
    Avatar,
    Text,
    HStack,
    VStack,
    IconButton,
    Input,
    Badge,
    Spacer,
    Button,
    Stack,
    Tag,
    AvatarFallback,
    Center,
} from '@chakra-ui/react'
import { FaArrowLeft, FaEllipsisV } from 'react-icons/fa'
import { COLORS } from '@/utils/theme'
import SearchIcon from '@/component/asset/SearchIcon'
import DashboardLayout from '@/layout/DashboardLayout'
import { useDispatch, useSelector } from 'react-redux'
import { xpHistory } from '@/url/redux/slices/authSlice'
import { EmptyState } from '@/utils/EmptyState'
import { formatDate, formatDateMonth } from '@/utils/date'
import { cashFormat2 } from '@/utils/cashformat'

const transactions = [
    { id: 1, name: 'Mikel Borle', avatar: 'https://i.pravatar.cc/80?img=1', type: 'receive', amount: 350, time: '10:30 AM', dateGroup: 'Today' },
    { id: 2, name: 'Uber', avatar: 'https://i.pravatar.cc/80?img=2', type: 'transfer', amount: -10, time: '10:30 AM', dateGroup: 'Today' },
    { id: 3, name: 'Ryan Scott', avatar: 'https://i.pravatar.cc/80?img=3', type: 'send', amount: -123, time: '10:30 AM', dateGroup: 'Today' },
    { id: 4, name: 'Food Panda', avatar: 'https://i.pravatar.cc/80?img=4', type: 'payment', amount: -21, time: '10:30 AM', dateGroup: 'Sep 20, 2025' },
    { id: 5, name: 'Amazon Shoping', avatar: 'https://i.pravatar.cc/80?img=5', type: 'transfer', amount: -25, time: '10:30 AM', dateGroup: 'Sep 20, 2025' },
    { id: 6, name: 'Henry James', avatar: 'https://i.pravatar.cc/80?img=6', type: 'receive', amount: 24, time: '10:30 AM', dateGroup: 'Sep 20, 2025' },
]

const filterOptions = ['All', 'Income', 'Sent', 'Request', 'Transfer']

function formatCurrency(value: any) {
    const sign = value < 0 ? '-' : '+'
    return `${sign}$${Math.abs(value).toFixed(2)}`
}

export default function TransactionHistory() {
    const bg = 'gray.800'
    const muted = 'gray.300'
    const accent = COLORS.blue
    const dispatch = useDispatch()
    const { user, history } = useSelector((a: { auth: { user: any, history: any } }) => a.auth);
    const [grouped, setGrouped] = useState<any>([]);

    useEffect(() => {
        dispatch(xpHistory({ sender_id: user.id, account_id: user.id }) as any)
        if (history && history.data) {
            const result = history.data.reduce((acc: any, tx: any) => {
                (acc[formatDateMonth(tx.created_at)] = acc[formatDateMonth(tx.created_at)] || []).push(tx)
                return acc
            }, {})
            setGrouped(result)
        }
    }, [history])


    return (
        <DashboardLayout title='History Transaction'>
            <Flex mt="80px" direction="column" maxW="480px" w="full" mx="auto" p={4}>
                {/* Header */}
                {/* Filters */}
                <Box mb={4}>
                    <HStack gap={3} overflowX="auto" pb={2}>
                        <Button size="sm" variant={'solid'} colorScheme={'purple'} bg={COLORS.deep_purple} flexShrink={0} p={4}>
                            XP Transactions History
                        </Button>

                    </HStack>
                </Box>

                {/* Transaction List Card */}
                <Box bg={COLORS.deep_purple} borderRadius="lg" boxShadow="sm" overflow="hidden">
                    <Box p={3}>
                        {history && history.data && history.data.length > 0.5 ? Object.keys(grouped).map((dateKey: any) => (
                            <Box key={dateKey} mb={4}>
                                <Text fontSize="sm" color={muted} mb={3}>{dateKey}</Text>

                                <Stack gap={3}>
                                    {grouped[dateKey].map((tx: any) => (
                                        <Flex key={tx.id} align="center" gap={1} minH="64px">
                                            <Avatar.Root>
                                                <AvatarFallback name={tx.quiz ? tx.hash : tx.account_id == user.id ? tx.account.email : tx.sender_id ? tx.sender.email : tx.account.email} />
                                            </Avatar.Root>
                                            <VStack align="start" gap={0}>
                                                <Text fontWeight="medium" color={COLORS.white}>{tx.quiz ? tx.hash : tx.account_id == user.id ? tx.account.email : tx.sender_id ? tx.sender.email : tx.account.email}</Text>
                                                <Text fontSize="sm" color={muted}>{formatDate(tx.created_at)}</Text>
                                            </VStack>

                                            <Spacer />

                                            <VStack align="end" gap={0}>
                                                <Text fontWeight="semibold" color={tx.sender_id == user.id ? 'red.500' : 'green.500'}>{cashFormat2(tx.amount)} XP</Text>
                                                <Text fontSize="sm" color={muted}>{tx.sender_id == user.id ? 'Transfer' : 'Recieve'}</Text>
                                            </VStack>
                                        </Flex>
                                    ))}
                                </Stack>
                            </Box>
                        ))
                            :
                            <Center p={4}>
                                <EmptyState title={"No XP History"} />
                            </Center>
                        }
                    </Box>
                </Box>
            </Flex>
        </DashboardLayout>
    )
}
