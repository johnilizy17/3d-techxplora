import React, { useEffect, useState } from 'react';
import {
  Input,
  Textarea,
  Button,
  Box,
  VStack,
  Heading,
  Text,
  Center,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../tools/CustomInput';
import { COLORS } from '@/utils/theme';
import RightArrowIcon from '@/component/asset/RightArrowIcon';
import LeftArrowIcon from '@/component/asset/LeftArrowIcon';
import RatingIcon from '@/component/asset/RatingIcon';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from '@/url/route/quiz';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/router';

const QuizSchema = Yup.object().shape({
});

export default function CreateQuizForm3({ page, setPage, data, setData }: { page: number, setPage: (title: number) => void, data: any, setData: (a: any) => any }) {

  const [ai, setAI] = useState(false);

  const dispatch = useDispatch();
  const showToast = useCustomToast()
  const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
  const router = useRouter()


  const HandleQuiz = async (values: any, { setSubmitting }: any) => {
    try {
      setSubmitting(true)
      const model_id = data.model_id[0]
      const classes = JSON.stringify(data.class[0])
      const group_code = data.group_code ? data.group_code[0] : null
      delete values.model_id
      const inputData = {
        ...values, "is_ai": ai,
        "status": true,
        "mode_id": model_id,
        "teacher_id": user.id,
        "class": classes,
        "group_code": group_code,
        "admin_code": user.admin_code
      }
      const result = await createQuiz(inputData)
      setData({ ...data, quiz_code: result.data.quiz_code })
      showToast("Quiz successfully created", "success");
      setPage(4)
      setSubmitting(false);
    } catch (error: any) {
      showToast(error.response.data.message || 'Failed to create Quiz', 'error');
      setSubmitting(false);
    }

  }



  return (
    <Box pt={"80px"} h="100vh" overflow="hidden" px={4} w="full">
      <Center mb="16px" onClick={() => setPage(2)} cursor={"pointer"} justifyContent={"space-between"}>
        <LeftArrowIcon color={COLORS.black} />
        <Box fontWeight={"600"} fontSize={"14px"} color={COLORS.gray}>3/3</Box>
      </Center>
      <Box h="calc(100vh - 100px)" overflow="scroll">
        <Heading size="lg" fontFamily={"Poppins"} fontWeight={"700"} fontSize={"20px"} mb={2}>Question 1 of {data.number}</Heading>
        <Text mb={6} fontSize={"14px"} fontWeight={"400"} fontFamily={"Plus Jakarta Sans"}>This is the tagline for school code</Text>
        <Button onClick={() => setAI(!ai)} w="111px" h="38px" bg={ai ? COLORS.blue : "#DEE2FF"} fontFamily={"Poppins"} fontWeight={"600"} fontSize={"17px"} color={ai ? COLORS.white : COLORS.gray_variant} borderRadius={"20px"}>
          AI Support
        </Button>
        <Formik
          initialValues={data}
          validationSchema={QuizSchema}
          onSubmit={HandleQuiz}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {
                !ai &&
                <>
                  <Box w="full" mt="8px">
                    <CustomInput
                      label='Question 1'
                      name='question1'
                      placeholder='Enter your questions'
                      fieldProps={{ type: 'textarea' }}
                      type='textarea'
                      value='' />
                  </Box>
                  <Box w="full" mt="8px">
                    <CustomInput
                      label='Answer'
                      name='title'
                      placeholder='Enter answer here'
                      fieldProps={{ type: 'text' }}
                      leftIcon={
                        <Box p={4}>
                          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.166504 1.5835C0.166504 2.27516 0.724837 2.8335 1.4165 2.8335H4.74984V11.5835C4.74984 12.2752 5.30817 12.8335 5.99984 12.8335C6.6915 12.8335 7.24984 12.2752 7.24984 11.5835V2.8335H10.5832C11.2748 2.8335 11.8332 2.27516 11.8332 1.5835C11.8332 0.891829 11.2748 0.333496 10.5832 0.333496H1.4165C0.724837 0.333496 0.166504 0.891829 0.166504 1.5835Z" fill="#323232" />
                          </svg>
                        </Box>
                      }
                      typeInput=''
                      value='' />
                  </Box>
                  <Box w="full" mt="8px">
                    <CustomInput
                      label='Other Option 1'
                      name='title'
                      placeholder='Enter answer here'
                      fieldProps={{ type: 'text' }}
                      leftIcon={
                        <Box p={4}>
                          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.166504 1.5835C0.166504 2.27516 0.724837 2.8335 1.4165 2.8335H4.74984V11.5835C4.74984 12.2752 5.30817 12.8335 5.99984 12.8335C6.6915 12.8335 7.24984 12.2752 7.24984 11.5835V2.8335H10.5832C11.2748 2.8335 11.8332 2.27516 11.8332 1.5835C11.8332 0.891829 11.2748 0.333496 10.5832 0.333496H1.4165C0.724837 0.333496 0.166504 0.891829 0.166504 1.5835Z" fill="#323232" />
                          </svg>
                        </Box>
                      }
                      typeInput=''
                      value='' />
                  </Box>
                  <Box w="full" mt="8px">
                    <CustomInput
                      label='Other Option 2'
                      name='title'
                      placeholder='Enter answer here'
                      fieldProps={{ type: 'text' }}
                      leftIcon={
                        <Box p={4}>
                          <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.166504 1.5835C0.166504 2.27516 0.724837 2.8335 1.4165 2.8335H4.74984V11.5835C4.74984 12.2752 5.30817 12.8335 5.99984 12.8335C6.6915 12.8335 7.24984 12.2752 7.24984 11.5835V2.8335H10.5832C11.2748 2.8335 11.8332 2.27516 11.8332 1.5835C11.8332 0.891829 11.2748 0.333496 10.5832 0.333496H1.4165C0.724837 0.333496 0.166504 0.891829 0.166504 1.5835Z" fill="#323232" />
                          </svg>
                        </Box>
                      }
                      typeInput=''
                      value='' />
                  </Box>
                </>
              }
              <Center mt="47px" mb="76px" justifyContent={"space-between"} gap={4}>
                <Button
                  colorScheme="light"
                  bg={COLORS.blue}
                  w="full"
                  maxW={"153px"}
                  color={COLORS.white}
                  disabled={isSubmitting}
                  loading={isSubmitting}
                  fontWeight={"500"}
                  fontFamily={"Poppins"}
                  fontSize={"16px"}
                  h="48px"
                  type="submit"
                  borderRadius={"1234px"}
                >
                  <Box mr="5px">
                    Next
                  </Box>
                  <RightArrowIcon />
                </Button>
                <Button
                  colorScheme="light"
                  bg={"transparent"}
                  w="full"
                  maxW={"153px"}
                  color={COLORS.gray}
                  borderColor={COLORS.gray}
                  fontWeight={"500"}
                  fontFamily={"Poppins"}
                  fontSize={"16px"}
                  h="48px"
                  borderWidth={"1px"}
                  disabled={true}
                  type="submit"
                  borderRadius={"1234px"}
                >
                  <Box mr="5px">
                    Finish
                  </Box>
                  <RightArrowIcon color={COLORS.gray} />
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
