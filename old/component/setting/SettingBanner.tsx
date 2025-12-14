// pages/settings.tsx
import { COLORS } from "@/utils/theme";
import { Box, Button, Center, Flex, Heading, IconButton, Input, InputGroup, RadioGroup, Separator, Text, Textarea, VStack } from "@chakra-ui/react";
import SearchIcon from "../asset/SearchIcon";
import InfoIcon from "../asset/InfoIcon";
import StarIcon from "../asset/StarIcon";
import { CustomPhoneInput } from "@/template/tools/CustomPhoneInput";
import SettingAvater from "./SettingAvater";
import QuestionIcon from "../asset/QuestionIcon";
import { useState } from "react";
import XIcon from "../asset/XIcon";
import CheckIcon from "../asset/CheckIcon";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

export default function SettingsBanner() {

  const [value, setValue] = useState()
  const items = [
    { label: "Email Notification", details: "You will be notified when a new email arrives.", value: "1" },
    { label: "Sound Notification", details: "You will be notified with sound when someone messages you.", value: "2" },
    { label: "Subscription", details: "You will be notified when you subscribe to an account.", value: "3" },
  ]

  const initiateSettings = async (values: any, { setSubmitting }: any) => {

  }

  const validationSchema = Yup.object({});

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={initiateSettings}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, errors, touched, handleChange, values }) => (
        <Form>
          <Flex direction="column" align="center" minH="100vh" py={10} px={4}>
            <Box w="100%">
              {/* Search */}
              <Box mb="12px" fontWeight={"800"} color={COLORS.deep_gray} fontSize={"24px"}>
                Settings
              </Box>
              {/* Profile Section */}
              <Heading mt="55px" fontSize="20px" fontWeight={"700"} color={COLORS.deep_gray} mb={1}>School Settings</Heading>
              <Text fontSize="sm" color="gray.500" mb={4}>
                Please update your profile settings here
              </Text>

              <Flex align="center" gap={2} mb={6}>
                <IconButton
                  aria-label="Info"
                  size="sm"
                  variant="ghost"
                  borderRadius={"full"}
                  borderColor={COLORS["20_gray"]}
                  borderWidth={"1px"}
                  colorScheme="purple"
                >
                  <InfoIcon />
                </IconButton>
                <Button w="120px" colorScheme="purple" borderRadius={"full"} height="40px" bg={COLORS.deep_purple}>
                  <Text>
                    Upgrade
                  </Text>
                  <StarIcon />
                </Button>
              </Flex>
              <Separator w="full" my="24px" />

              {/* Username Section */}
              <Text fontSize="20px" fontWeight={"700"} color={COLORS.deep_gray} mb={2}>Username</Text>
              <InputGroup mt="8px" startAddonProps={{ borderRadius: "100px" }} borderRadius={"full"} startAddon={<Box px={4}>techxplora.com/</Box>} endElement={<Box px={4}><InfoIcon /></Box>}>
                <Input borderRadius={"full"} px="10px" placeholder="X-AE-A-19" />
              </InputGroup>
              <Separator w="full" my="24px" />
              <Text fontSize="20px" fontWeight={"700"} color={COLORS.deep_gray} mb={2}>Phone Number</Text>
              <CustomPhoneInput />
              <Separator w="full" my="24px" />
              <Text fontSize="20px" fontWeight={"700"} color={COLORS.deep_gray} mb={2}>Profile Picture</Text>
              <SettingAvater />
              <Separator w="full" my="24px" />
              <Center mb="8px" justifyContent={"start"}>
                <Text fontSize="20px" mr="8px" fontWeight={"700"} color={COLORS.deep_gray} mb={2}>Biography</Text>
                <QuestionIcon />
              </Center>
              <Box pos="relative">
                <Textarea
                  h="150px"
                  px={4}
                  bg="#fff"
                  pt={4}
                  borderRadius={"12px"}
                  placeholder={"Hi there! 👋 I'm X-AE-A-19, an AI enthusiast and fitness aficionado. When I'm not crunching numbers or optimizing algorithms, you can find me hitting the gym."}
                  value='' />
                <Box px={4} color={"#94A3B8"} pos="absolute" fontWeight={"500"} fontSize={"12px"} bottom="10px">
                  325 characters remaining
                </Box>
              </Box>
              <Separator w="full" my="24px" />
              <Text fontSize="20px" mr="8px" fontWeight={"700"} color={COLORS.deep_gray} mb={2}>Notifications</Text>
              <RadioGroup.Root colorPalette={"blue"} value={value} onValueChange={(e: any) => setValue(e.target.value)}>
                <VStack p={4} gap="6">
                  {items.map((item) => (
                    <RadioGroup.Item w="full" alignItems={"start"} p={4} key={item.value} value={item.value}>
                      <RadioGroup.ItemHiddenInput />
                      <RadioGroup.ItemIndicator />
                      <Box w="full">
                        <RadioGroup.ItemText fontWeight="600" fontSize={"22px"} color={COLORS.deep_gray} w="full">{item.label}</RadioGroup.ItemText>
                        <Box w="full" mt="8px" fontWeight={"400"} fontSize={"16px"} color={COLORS.light_gray}>{item.details}</Box>
                      </Box>
                    </RadioGroup.Item>
                  ))}
                </VStack>
              </RadioGroup.Root>
              <Separator w="full" my="24px" />
              <Flex pb="30px" mt={6} justify="end" gap={5}>
                <Button borderColor={COLORS.gray} variant="ghost" w="94px" h="40px" borderRadius={"full"} type="reset">
                  <Box fontWeight={"700"} fontSize={"14px"}>
                    Cancel
                  </Box>
                  <XIcon width="10" height="10" />
                </Button>
                <Button colorScheme="purple" bg={COLORS.deep_purple} w="94px" borderRadius={"full"} h="40px" type="submit">
                  <Box fontWeight={"700"} fontSize={"14px"}>
                    Save
                  </Box>
                  <CheckIcon width="10" height="10" color="white" />
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

