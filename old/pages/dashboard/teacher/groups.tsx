import React from 'react';
import DashboardLayout from "@/layout/DashboardLayout";
import CloseLayout from "@/layout/CloseLayout";
import Statistics from '@/component/group/Statistics';
import { Box } from '@chakra-ui/react';

export default function ViewGroupStatistics() {

  return (
    <DashboardLayout title="Admin Code Group">
       <Box w="full">
          <Statistics />
        </Box>
    </DashboardLayout>
  )
}