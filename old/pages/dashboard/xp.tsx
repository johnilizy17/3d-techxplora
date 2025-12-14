// components/BalanceCard.tsx
import CopyIcon from '@/component/asset/CopyIcon';
import useCustomToast from '@/hooks/useCustomToast';
import CloseLayout from '@/layout/CloseLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import { DepositModel } from '@/template/model/DepositModel';
import { TransferModel } from '@/template/model/TransferModel';
import { WithdrawModel } from '@/template/model/WithdrawModel';
import { cashFormat, cashFormat2 } from '@/utils/cashformat';
import { COLORS } from '@/utils/theme';
import {
    Box,
    Text,
    Flex,
    Stat,
    StatLabel,
    HStack,
    VStack,
    Button,
    useDisclosure,
    StatValueText,
    Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
    { value: 100 },
    { value: 115 },
    { value: 90 },
    { value: 130 },
    { value: 70 },
    { value: 140 },
    { value: 110 },
    { value: 130 },
];

export default function AccountNumber() {

    const [wallet, setWallet] = useState({ account_number: "", bank_name: "" })
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const [transferWallet, setTransferWallet] = useState(false)
    const [amount, setAmount] = useState(0)
    const showMessage = useCustomToast();

    async function Balance() {
        // const account = await generateAccount({ ...user, amount: 0, name: `${user.lastName},${user.firstName}` })
        // setWallet(account.data)
        // const result = await referredBalance()
        // console.log(result, "result")
        // setAmount(result)
    }

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            showMessage("Copy Successfully Account Number", "success")
        } catch (err) {
            showMessage("Copy Failed", "success")
        }
    };


    useEffect(() => {
        Balance()
    }, [])



    return (
        <DashboardLayout title='Xp dashboard'>
            <CloseLayout>
                <Box w="full" h="100vh">
                    <Box h="90px" />
                    <Box
                        pb="0px"
                        mb="20px"
                        fontWeight={"bold"} fontSize={"20px"}>
                        Wallet
                    </Box>
                    <Box
                        p={["20px", "20px", "20px"]}
                        pt="0px"
                        borderRadius="xl"
                        bg="white"
                        boxShadow="md"
                        w="full"
                    >
                        <Stat.Root>
                            <StatLabel fontSize="sm" color="gray.500">
                                Total balance from all accounts
                            </StatLabel>
                            <StatValueText fontSize="2xl" fontWeight="bold">
                                {cashFormat(user.xp/10)}
                            </StatValueText>
                        </Stat.Root>

                        <Box height="120px" mt={4}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <Line type="monotone" dataKey="value" stroke="#3182ce" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>

                        <Flex mt={6} p={4} borderRadius="lg" bg="gray.50" align="center" justify="space-between">
                            <HStack>
                                {/* <Icon as={FaFlagUsa} color="red.500" boxSize={5} /> */}
                                <VStack align="start" spaceX={0}>
                                    <Text fontWeight="bold">{cashFormat2(user.xp)} XP</Text>
                                    <Text fontSize="sm" color="gray.500">10XP {"==="} 1  Xplora Diamond</Text>
                                    <Text fontSize="sm" color="gray.500">1XD {"==="} {cashFormat(1)}</Text>
                                </VStack>
                            </HStack>
                            <CopyIcon code='' />
                        </Flex>
                        <Center justifyContent="space-between" gap="10px" flexDir={["row"]} >
                            {user.accountable_type !== "App\\Models\\Teacher" ? 
                            <WithdrawModel />
                                :
                                <>
                                    <DepositModel />
                                    <TransferModel />
                                </>}
                        </Center>
                    </Box>

                </Box>
            </CloseLayout>
        </DashboardLayout>
    );
}
