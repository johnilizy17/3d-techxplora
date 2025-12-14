import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Icon,
  Flex,
  Container,
  Heading,
  CardRoot,
} from '@chakra-ui/react';
import { FiCheck, FiFolder, FiFileText } from 'react-icons/fi';
const File = () => {
  // Sample document data with more realistic document previews
  const [documents] = useState([
    {
      id: 1,
      type: 'ID Card',
      uploadDate: '3rd June 2024',
      status: 'verified',
      preview: 'https://via.placeholder.com/200x280/2D3748/ffffff?text=ID+Card+Preview',
      bgColor: 'blue.600'
    },
    {
      id: 2,
      type: 'ID Card', 
      uploadDate: '3rd June 2024',
      status: 'verified',
      preview: 'https://via.placeholder.com/200x280/38B2AC/ffffff?text=Driver+License',
      bgColor: 'teal.500'
    },
    {
      id: 3,
      type: 'ID Card',
      uploadDate: '3rd June 2024', 
      status: 'verified',
      preview: 'https://via.placeholder.com/200x280/FFFFFF/000000?text=Work+Authorization',
      bgColor: 'gray.100'
    },
    {
      id: 4,
      type: 'ID Card',
      uploadDate: '3rd June 2024',
      status: 'verified',
      preview: 'https://via.placeholder.com/200x280/FED7D7/000000?text=Resume+Document',
      bgColor: 'red.100'
    }
  ]);
  const DocumentCard = ({ document }:any) => (
    <CardRoot
      bg="gray.800"
      shadow="xl"
      borderRadius="xl"
      overflow="hidden"
      transition="all 0.3s ease"
      _hover={{ 
        transform: 'translateY(-8px)', 
        shadow: '2xl',
        bg: 'gray.750'
      }}
      cursor="pointer"
      position="relative"
      border="1px solid"
      borderColor="gray.700"
    >
      <CardBody p={0}>
        <Box position="relative">
          {/* Document Preview */}
          <Box
            height="220px"
            bg="gray.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            position="relative"
          >
            {/* Document Mock Content */}
            <Box
              width="90%"
              height="90%"
              bg="white"
              borderRadius="md"
              shadow="md"
              display="flex"
              flexDirection="column"
              p={3}
              position="relative"
            >
              {/* Document Header */}
              <Box
                height="30%"
                bg={document.bgColor}
                borderRadius="sm"
                mb={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text 
                  fontSize="xs" 
                  fontWeight="bold" 
                  color="white"
                  textAlign="center"
                >
                  {document.type.toUpperCase()}
                </Text>
              </Box>
              
              {/* Document Lines */}
              <VStack spaceX={1} align="start" flex={1}>
                <Box height="2px" width="80%" bg="gray.300" borderRadius="full" />
                <Box height="2px" width="60%" bg="gray.300" borderRadius="full" />
                <Box height="2px" width="70%" bg="gray.300" borderRadius="full" />
                <Box height="2px" width="50%" bg="gray.300" borderRadius="full" />
              </VStack>
            </Box>
          </Box>
          
          {/* Status Indicator */}
          {document.status === 'verified' && (
            <Box
              position="absolute"
              top={3}
              right={3}
              bg="green.500"
              borderRadius="full"
              p={1.5}
              shadow="lg"
            >
              <Icon as={FiCheck} color="white" boxSize={3} />
            </Box>
          )}
        </Box>
        {/* Document Info */}
        <VStack align="start" spaceX={1} p={4}>
          <Text
            fontWeight="semibold"
            fontSize="sm"
            color="white"
          >
            {document.type}
          </Text>
          <Text
            fontSize="xs"
            color="gray.400"
          >
            Uploaded on {document.uploadDate}
          </Text>
        </VStack>
      </CardBody>
    </CardRoot>
  );
  return (
    <Box bg="gray.900" minH="100vh" py={8}>
      <Container maxW="7xl">
        <VStack align="start" spaceX={8}>
          {/* Header */}
          <Box>
            <Heading 
              size="xl" 
              color="white" 
              fontWeight="semibold"
            >
              My Documents
            </Heading>
          </Box>
          {/* Recents Section */}
          <Box width="100%">
            <VStack align="start" spaceX={6}>
              <Text 
                fontSize="lg" 
                fontWeight="medium" 
                color="white"
              >
                Recents
              </Text>
              
              <SimpleGrid 
                columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 4 }} 
                spaceX={8}
                width="100%"
              >
                {documents.map((document) => (
                  <DocumentCard 
                    key={document.id} 
                    document={document} 
                  />
                ))}
              </SimpleGrid>
            </VStack>
          </Box>
          {/* Folders Section */}
          <Box width="100%">
            <VStack align="start" spaceX={6}>
              <HStack>
                <Icon as={FiFolder} color="gray.400" boxSize={5} />
                <Text 
                  fontSize="lg" 
                  fontWeight="medium" 
                  color="white"
                >
                  Folders
                </Text>
              </HStack>
              
              {/* Empty state for folders */}
              <Box
                width="100%"
                py={16}
                textAlign="center"
              >
                <VStack spaceX={4}>
                  <Icon 
                    as={FiFolder} 
                    boxSize={16} 
                    color="gray.600" 
                  />
                  <Text 
                    color="gray.500" 
                    fontSize="md"
                  >
                    No folders created yet
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};
export default File;