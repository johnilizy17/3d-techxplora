"use client";

import React, { useCallback, useRef, useState } from "react";
import {
  Center,
  Text,
  Icon,
  VStack,
  HStack,
  Box,
  Badge,
  VisuallyHidden,
  Button,
} from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";
import useCustomToast from "@/hooks/useCustomToast";

/**
 * DragAndDropUpload
 * - Client component for Next.js (App Router compatible)
 * - Uses Chakra UI for styling
 * - Accepts SVG, JPG/JPEG, PNG up to 10 MB each
 * - Click to browse or drag & drop
 */
export default function DragAndDropUpload({
  onFilesAccepted,
  multiple = false,
  maxSizeMB = 10,
}: {
  onFilesAccepted?: (files: File[]) => void;
  multiple?: boolean;
  maxSizeMB?: number;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const toast = useCustomToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const acceptMimes = ["image/svg+xml", "image/png", "image/jpeg"]; // svg, png, jpg/jpeg
  const maxBytes = maxSizeMB * 1024 * 1024;

  const openFileDialog = () => inputRef.current?.click();

  const handleFiles = useCallback(
    (list: FileList | File[]) => {
      const incoming = Array.from(list);
      const valid: File[] = [];
      const rejected: { file: File; reason: string }[] = [];

      incoming.forEach((f) => {
        const typeOk = acceptMimes.includes(f.type);
        const sizeOk = f.size <= maxBytes;
        if (!typeOk) rejected.push({ file: f, reason: "Unsupported type" });
        else if (!sizeOk) rejected.push({ file: f, reason: `Exceeds ${maxSizeMB}MB` });
        else valid.push(f);
      });

      if (rejected.length) {
        toast( "Some files were skipped", "success");
      }

      if (valid.length) {
        const next = multiple ? [...files, ...valid] : [valid[0]];
        setFiles(next);
        onFilesAccepted?.(next);
      }
    },
    [acceptMimes, files, maxBytes, maxSizeMB, multiple, onFilesAccepted, toast]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <VStack align="stretch" spaceX={3}>
      <Center
        border="2px dashed"
        borderColor={isDragging ? "blue.300" : "gray.200"}
        rounded="md"
        p={4}
        h="165px"
        flexDir="column"
        textAlign="center"
        cursor="pointer"
        role="button"
        tabIndex={0}
        aria-label="File upload dropzone"
        onClick={openFileDialog}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openFileDialog();
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        <Icon as={MdUpload} w={6} h={6} color={isDragging ? "blue.400" : "gray.400"} mb={2} />
        <Text color="blue.500" fontWeight="medium">
          Click here to upload your file or drag.
        </Text>
        <Text fontSize="xs" color="gray.400">
          Supported Format: SVG, JPG, PNG ({maxSizeMB}mb each)
        </Text>
        <VisuallyHidden>
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={acceptMimes.join(",")}
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
        </VisuallyHidden>
      </Center>

      {files.length > 0 && (
        <Box borderWidth="1px" rounded="md" p={3}>
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="semibold">Selected file{files.length > 1 ? "s" : ""}</Text>
            <Button size="sm" variant="ghost" onClick={() => setFiles([])}>
              Clear
            </Button>
          </HStack>
          <VStack align="stretch" spaceX={2}>
            {files.map((f) => (
              <HStack key={f.name} justify="space-between">
                <Text>{f.name}</Text>
                <Badge>
                  {(f.size / (1024 * 1024)).toFixed(2)} MB
                </Badge>
              </HStack>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
}

/**
 * Example usage (drop this into a page or another component):
 *
 * import DragAndDropUpload from "./DragAndDropUpload";
 *
 * export default function Page() {
 *   return (
 *     <Box maxW="lg" mx="auto" mt={10}>
 *       <DragAndDropUpload onFilesAccepted={(fs) => console.log(fs)} />
 *     </Box>
 *   );
 * }
 */
