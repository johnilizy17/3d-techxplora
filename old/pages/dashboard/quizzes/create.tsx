import CloseLayout from '@/layout/CloseLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import CreateQuizForm from '@/template/Quizzes/CreateQuizForm';
import CreateQuizForm2 from '@/template/Quizzes/CreateQuizForm2';
import CreateQuizForm3 from '@/template/Quizzes/CreateQuizForm3';
import SuccessQuizForm from '@/template/Quizzes/SuccessQuizForm';
import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';

export default function QuizzesCreate() {

    const [page, setPage] = useState(1)
    const [data, setData] = useState({
        title: '',
        description: '',
        duration: 0,
        closeDateTime: '',
        model_id: '',
    })

    return (
        <DashboardLayout title={"Create your Quiz"}>
            <Box h="100vh" overflow="hidden">
                <CloseLayout>
                    {page === 1 ? <CreateQuizForm page={page} data={data} setData={setData} setPage={setPage} />
                        : page === 2 ?
                            < CreateQuizForm2 page={page} data={data} setData={setData} setPage={setPage} />
                            :
                            <SuccessQuizForm data={data} />
                    }
                </CloseLayout>
            </Box>
        </DashboardLayout>
    )
}