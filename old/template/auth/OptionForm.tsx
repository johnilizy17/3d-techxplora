// components/CourseCard.tsx
import AddIcon from "@/component/asset/AddIcon";
import { getAllAccount } from "@/url/route/student";
import { removeYearFromISO } from "@/utils/date";
import { COLORS } from "@/utils/theme";
import { Box, Flex, Text, Avatar, HStack, Badge, Icon, VStack, Button, Portal, Dialog, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaUser, FaComment, FaHeart, FaSchool } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import StudentForm from "./StudentForm";
import { useRouter } from "next/router";
import { authLogin, setAuth } from "@/url/redux/slices/authSlice";

interface CourseCardProps {
    bg: string;
    teacher: string;
    subject: string;
    level: string;
    category: string;
    participants: number;
    comments: number;
    likes: number;
}

function CourseCard({
    bg,
    teacher,
    subject,
    level,
    category,
    participants,
    comments,
    likes,
}: CourseCardProps) {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const router = useRouter();
    const dispatch = useDispatch()

    return (
        <Box
            w="full"
            bg={bg}
            color="white"
            borderRadius="2xl"
            p={5}
            boxShadow="lg"
            onClick={() => {
                dispatch(setAuth({ ...user, fullname: teacher, email: level, category: category }) as any)
                router.push("/dashboard")
            }}
        >
            {/* Teacher Info */}
            < Flex align="center" justify="space-between" mb={4} >
                <Text fontWeight="bold" fontSize="sm">
                    {teacher}
                </Text>
                <Badge
                    bg="white"
                    color="black"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                >
                    {category}
                </Badge>
            </Flex >

            {/* Subject */}
            < Text fontSize="xl" fontWeight="bold" >
                {subject}
            </Text >
            <Text fontSize="sm" color="gray.200" mb={4}>
                {level}
            </Text>

            {/* Participants */}
            <HStack spaceX={6}>
                <HStack>
                    <Icon as={FaComment} boxSize={4} />
                    <Text fontSize="sm">{comments}</Text>
                </HStack>
                <HStack>
                    <Icon as={FaSchool} boxSize={4} />
                    <Text fontSize="sm">{likes}</Text>
                </HStack>
            </HStack>
        </Box >
    );
}


export default function OptionForm() {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const [subAccount, setSubAccount] = useState([])


    async function fetchAllAccount() {
        try {
            const students = await getAllAccount(user.id)
            setSubAccount(students.profiles)
        } catch (err) {
            console.log(err, "errors")
        }
    }

    useEffect(() => {
        fetchAllAccount()
    }, [user && user.id])

    const { open, onOpen, onClose } = useDisclosure()


    return (
        <>
            <Portal>
                <Dialog.Root placement={"center"} open={open} onOpenChange={(e) => onClose()}>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title p={4}>Add Account</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <StudentForm fetchAllAccount={fetchAllAccount} code={user.id} onclose={onClose} />
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Dialog.Root>
            </Portal>

            <Flex justify="center">
                <VStack mt="20px" spaceY={6} w="full">
                    <CourseCard
                        bg="blue.900"
                        teacher={user.fullname}
                        subject={removeYearFromISO(user.created_at)}
                        level={user.email}
                        category="Main Account"
                        participants={0}
                        comments={0}
                        likes={0}
                    />
                    {subAccount.map((a: any, b: number) => (
                        <CourseCard
                            bg="red.800"
                            key={b}
                            teacher={a.first_name}
                            subject={a.last_name}
                            level={a.other_name}
                            category="Sub Account"
                            participants={0}
                            comments={0}
                            likes={0}
                        />
                    ))}
                    <Button onClick={onOpen} w="full" color={COLORS.black} bg={COLORS.whitesmoke} borderRadius={"10px"}>
                        <AddIcon />  <Box> Add Account</Box>
                    </Button>
                </VStack>
            </Flex>
        </>
    );
}
