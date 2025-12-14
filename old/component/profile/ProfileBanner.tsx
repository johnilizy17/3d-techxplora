// components/ProfileCard.tsx
import {
    Box,
    Flex,
    Avatar,
    Text,
    Button,
    IconButton,
    AvatarRoot,
    AvatarImage
} from "@chakra-ui/react";
import EditIcon from "../asset/EditIcon";
import { COLORS } from "@/utils/theme";
import ShareIcon from "../asset/ShareIcon";
import RightArrowIcon from "../asset/RightArrowIcon";
import { useSelector } from "react-redux";

export default function ProfileBanner() {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)

    return (
        <Box
            w="full"
        >
            {/* Header background */}
            <Box
                bgImage="url('/profile/1.jpg')" bgPos={"bottom"} bgRepeat={"no-repeat"} bgSize="cover"
                h="167px"
                px={{ base: 4, md: 16 }}
                position="relative"
            >
                {/* Edit Icon */}
                <IconButton
                    size="sm"
                    position="absolute"
                    top="15px"
                    right="10px"
                    borderRadius={"full"}
                    aria-label="Edit Cover"
                    bg={COLORS.gray}
                    _hover={{ bg: COLORS["20_gray"] }}
                >
                    <EditIcon />
                </IconButton>
                {/* Avatar */}
                <AvatarRoot
                    position="absolute"
                    bottom={["-47px", "-75px"]}
                    border="4px solid white"
                    left={{ base: 4, md: 16 }}
                    w={["96px", "150px"]}
                    h={["96px", "150px"]}
                >
                    <AvatarImage src="/leaderboard/1.png" // replace with your avatar image path
                    />
                </AvatarRoot>


            </Box>

            {/* User Info */}
            <Box mt={["55px", "90px"]} pb={4} px={{ base: 4, md: 16 }} textAlign="left">
                <Text fontSize="lg" fontWeight="bold">
                   {user.fullname}
                </Text>
                <Text fontSize="sm" color="gray.500">
                   {user.email}
                </Text>

                {/* Buttons */}
                <Flex mt={4} gap={3}>
                    <Button
                        w="99px"
                        h="40px"
                        borderRadius={"full"}
                        fontWeight={"700"}
                        fontSize={"14px"}
                    >
                        <Text>
                            Share
                        </Text>
                        <ShareIcon />
                    </Button>
                    <Button
                        w="140px"
                        h="40px"
                        borderRadius={"full"}
                        fontWeight={"700"}
                        fontSize={"14px"}
                        bg={COLORS.deep_purple}
                    >
                        <Text>
                            View Profile
                        </Text>
                        <RightArrowIcon />
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}
