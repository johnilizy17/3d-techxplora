import React, { useState, useRef } from 'react';
import {
    Box,
    Text,
    Button,
    Input,
    VStack,
    HStack,
    Icon,
    useDisclosure,
    Progress,
    Flex,
    IconButton,
    DrawerRoot,
    DrawerTrigger,
    Portal,
    DrawerBackdrop,
    DrawerPositioner,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Center,
} from '@chakra-ui/react';
import {
    FiUploadCloud,
    FiFile,
    FiFolder,
    FiX,
    FiCheck
} from 'react-icons/fi';
import useCustomToast from '@/hooks/useCustomToast';
import { COLORS } from '@/utils/theme';
import CancelIcon from '@/component/asset/CancelIcon';
import DownloadIcon from '@/component/asset/DownloadIcon';
import { extractQuestionsFromExcel, validateQuestionsFile } from '@/utils/constants';
import { triggerQuizEdit } from '@/url/redux/slices/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Bulk = ({ open, onOpen, onClose }: { open: boolean, onOpen: () => void, onClose: () => void }) => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [googleSheetUrl, setGoogleSheetUrl] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const [isDragOver, setIsDragOver] = useState(false);
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const fileInputRef: any = useRef(null);
    const toast = useCustomToast();

    const handleFileSelect = async (file: File) => {
        if (
            file &&
            file.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            const result = await validateQuestionsFile(file);

            if (!result.valid) {
                toast("Invalid file structure:\n" + result.errors.join("\n"), "error");
                return;
            }

            console.log("Parsed rows:", result.rows); // You can use this for preview
            setSelectedFile(file);
            simulateUpload(file);
        } else {
            toast("Please select an XLSX file", "error");
        }
    };

    const simulateUpload = (file: any) => {
        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleDrop = (e: any) => {
        e.preventDefault();
        setIsDragOver(false);
        const files: any = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setIsUploading(false);
        setUploadProgress(0);
    };

    const handleGoogleSheetUpload = () => {
        if (googleSheetUrl.trim()) {
            toast(
                'Starting import from Google Sheet...',
                'info'
            );
        }
    };

    const handleImportProduct = async () => {
        try {
            const data = await extractQuestionsFromExcel(selectedFile);
            dispatch(triggerQuizEdit({ ...temporary, questions: data }) as any);
            toast(
                'File successfully extracted',
                'success'
            );
            router.push("/dashboard/teacher/aiquestion")
        } catch (err) {
            toast(
                'Document did not follow the right structure ',
                'success'
            );
        }
    };

    return (
        <DrawerRoot placement="top" open={open} onOpenChange={open ? onClose : onOpen}>
            <Portal>
                <DrawerBackdrop bg={COLORS.black} />
                <DrawerPositioner>
                    <DrawerContent>
                        <DrawerHeader w="full">
                            <Center w="full" p="16px" justifyContent={"space-between"}>
                                <HStack>
                                    <Icon as={FiFolder} />
                                    <Text fontWeight={"800"}>Bulk Upload</Text>
                                </HStack>
                                <IconButton
                                    display={{ base: 'flex', md: 'none' }}
                                    onClick={onClose}
                                    _hover={{ bg: "transparent" }}
                                    variant="ghost"
                                    aria-label="Open Menu"
                                >
                                    <CancelIcon />
                                </IconButton>
                            </Center>
                        </DrawerHeader>
                        <DrawerBody p="20px" pt="0px">
                            <VStack spaceX={4} align="stretch">
                                <Center justifyContent={"space-between"}>
                                    <Box color={COLORS.blue} fontWeight={"800"}>
                                        Click to download
                                    </Box>
                                    <a href="/questions.xlsx" download>
                                        <Button p="10px" bg={COLORS.blue}>
                                            <Box className="animate-image">
                                                Sample
                                            </Box>
                                            <DownloadIcon color="#fff" />
                                        </Button>
                                    </a>
                                </Center>

                                <Text fontSize="sm" color="gray.600">
                                    Upload a XLSX to import products
                                </Text>

                                {/* File Upload Area */}
                                <Box
                                    border="2px dashed"
                                    borderColor={isDragOver ? "blue.300" : "gray.300"}
                                    borderRadius="md"
                                    p={8}
                                    textAlign="center"
                                    bg={isDragOver ? "blue.50" : "gray.50"}
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    cursor="pointer"
                                    onClick={handleBrowseClick}
                                >
                                    <VStack spaceX={3}>
                                        <HStack spaceX={2}>
                                            <Icon as={FiFile} size="lg" color="orange.400" />
                                            <Icon as={FiUploadCloud} size="lg" color="blue.400" />
                                            <Icon as={FiFolder} size="lg" color="blue.500" />
                                        </HStack>
                                        <Text fontWeight="medium">
                                            Drag XLSX here to import product information
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            or click to browse, up to 15 MB max
                                        </Text>
                                        <Button
                                            colorScheme="blue"
                                            variant="outline"
                                            size="sm"
                                            p="10px"
                                            onClick={handleBrowseClick}
                                        >
                                            Browse File
                                        </Button>
                                    </VStack>
                                </Box>

                                {/* File Input (Hidden) */}
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx"
                                    onChange={handleFileInputChange}
                                    display="none"
                                />

                                {/* Upload Progress */}
                                {selectedFile && (
                                    <Box
                                        border="1px solid"
                                        borderColor="gray.200"
                                        borderRadius="md"
                                        p={3}
                                        bg="white"
                                    >
                                        <HStack justify="space-between">
                                            <HStack>
                                                <Icon as={FiFile} color="red.500" />
                                                <VStack align="start" spaceX={0}>
                                                    <Text fontSize="sm" fontWeight="medium">
                                                        {selectedFile.name.replace('.xlsx', ' File')}
                                                    </Text>

                                                    <Text fontSize="xs" color="gray.500">
                                                        {(selectedFile.size / 1024).toFixed(0)} KB of 100 KB • {
                                                            isUploading ? 'Uploading...' : 'Complete'
                                                        }
                                                    </Text>
                                                </VStack>
                                            </HStack>
                                            <IconButton
                                                size="sm"
                                                variant="ghost"
                                                onClick={handleRemoveFile}
                                            >
                                                <FiX />
                                            </IconButton>
                                        </HStack>
                                        {isUploading && (
                                            <Progress.Root defaultValue={uploadProgress} colorPalette={COLORS.blue} size="sm">
                                                <Progress.Track />
                                            </Progress.Root>
                                        )}
                                        {uploadProgress === 100 && (
                                            <HStack mt={2}>
                                                <Icon as={FiCheck} color="green.500" />
                                                <Text fontSize="xs" color="green.500">
                                                    Upload complete
                                                </Text>
                                            </HStack>
                                        )}
                                    </Box>
                                )}

                                {/* Action Buttons */}
                                <HStack justify="space-between" pt={4}>
                                    <Button variant="ghost" onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        colorScheme="blue"
                                        onClick={handleImportProduct}
                                        p="10px"
                                        bg={COLORS.blue}
                                        disabled={!selectedFile && !googleSheetUrl.trim()}
                                    >
                                        Preview
                                    </Button>
                                </HStack>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </DrawerPositioner>
            </Portal>
        </DrawerRoot>
    );
};

export default Bulk;