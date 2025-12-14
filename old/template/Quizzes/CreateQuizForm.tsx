import React, { useEffect } from 'react';
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
import QuestionIcon from '@/component/asset/QuestionIcon';
import { rangeTime } from '@/utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { allQuizData } from '@/url/redux/slices/techerSlice';
import { useRouter } from 'next/router';

const QuizSchema = Yup.object().shape({
  title: Yup.string().required('Quiz title is required'),
  description: Yup.string().required('Description is required').max(100, 'Max 100 characters'),
  duration: Yup.string().required('Duration is required'),
  group_code: Yup.array().required('Group Code is required'),
});

export default function CreateQuizForm({ page, setPage, data, setData }: { page: number, data: any, setData: (a: any) => void, setPage: (title: number) => void }) {

  const dispatch = useDispatch();
  const { quizData } = useSelector((a: { teacher: { quizData: any } }) => a.teacher)
  const router = useRouter()
  useEffect(() => {
    dispatch(allQuizData("") as any)
  }, [])

  return (
    <Box pt={"80px"} h="100vh" overflow="hidden" px={4} w="full">
      <Center mb="16px" cursor={"pointer"} onClick={() => router.back()} justifyContent={"space-between"}>
        <LeftArrowIcon color={COLORS.black} />
        <Box fontWeight={"600"} fontSize={"14px"} color={COLORS.gray}>1/3</Box>
      </Center>
      <Box h="calc(100vh - 80px)" overflow="scroll">
        <Center justifyContent={"start"} mb={2}>
          <Heading size="lg" fontFamily={"Poppins"} mr="8px" fontWeight={"700"} fontSize={"20px"}>Create a quiz</Heading>
          <QuestionIcon />
        </Center>
        <Text mb={6} fontSize={"14px"} fontWeight={"400"} fontFamily={"Plus Jakarta Sans"}>This is the tagline for school code</Text>

        <Formik
          initialValues={{
            ...data
          }}
          validationSchema={QuizSchema}
          onSubmit={(values) => {
            setData({ ...data, ...values })
            setPage(2)
          }}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <Box w="full" mt="8px">
                <CustomInput
                  label='Quiz Title'
                  name='title'
                  placeholder='Enter quiz title here'
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
                  label='Description'
                  name='description'
                  placeholder='Enter quiz details here'
                  fieldProps={{ type: 'textarea' }}
                  type='textarea'
                  value='' />
              </Box>
              <Box w="full" mt="8px">
                <CustomInput
                  label='Total Duration'
                  name='duration'
                  placeholder='Select duration'
                  fieldProps={{ type: 'number' }}
                  typeInput=''
                  value='' />
                {rangeTime(values.duration)}
              </Box>
              {quizData.quiz.length > 0.1 && <Box w="full" mt="8px">
                <CustomInput
                  label='Quiz Mode'
                  name='model_id'
                  placeholder='Enter Quiz Type'
                  fieldProps={{ type: 'select' }}
                  type='select'
                  setFieldValue={setFieldValue}
                  value={values.model_id}
                  selectionData={quizData.quiz} />
              </Box>}
              <Box w="full" mt="8px">
                <CustomInput
                  label='Select Group Code'
                  name='group_code'
                  placeholder='Enter Group Code'
                  fieldProps={{ type: 'select' }}
                  type='select'
                  setFieldValue={setFieldValue}
                  value={values.group_code}
                  selectionData={quizData.group} />
                {quizData.group && quizData.group.length < 1 &&
                  <Center
                  onClick={()=>router.push("/dashboard/create_group")}
                  cursor="pointer" mt="5px" justifyContent={"space-between"} color="red" fontWeight={"700"}>
                    <Box>
                      Kindly Create a group
                    </Box>
                    <RightArrowIcon color="red" />
                  </Center>
                }
              </Box>
              {quizData.class.length > 0.1 && <Box w="full" mt="8px">
                <CustomInput
                  label='Select Class'
                  name='class'
                  placeholder='Enter Class'
                  fieldProps={{ type: 'select' }}
                  type='select'
                  setFieldValue={setFieldValue}
                  value={values.class}
                  selectionData={quizData.class} />
              </Box>}
              <Center mt="47px" mb="76px">
                <Button
                  colorScheme="light"
                  bg={COLORS.blue}
                  w="full"
                  maxW={"350px"}
                  color={COLORS.white}
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
              </Center>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
