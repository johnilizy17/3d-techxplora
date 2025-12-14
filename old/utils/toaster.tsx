"use client";

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
  createToaster,
  Box,
} from "@chakra-ui/react";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
});

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: "4" }}>
        {(toast) => (
          <Toast.Root
            width={{ base: "100%", md: "sm" }}
            borderRadius="lg"
            boxShadow="lg"
            bg="gray.800"
            color="white"
            p={4}
            gap={3}
            alignItems="flex-start"
            animation="fadeIn 0.2s ease-out"
            borderLeftWidth="4px"
            borderLeftColor={
              toast.type === "success"
                ? "green.400"
                : toast.type === "error"
                ? "red.400"
                : toast.type === "warning"
                ? "yellow.400"
                : toast.type === "loading"
                ? "blue.400"
                : "gray.400"
            }
          >
            {/* Icon or Spinner */}
            <Box mt="2px">
              {toast.type === "loading" ? (
                <Spinner size="sm" color="blue.300" />
              ) : (
                <Toast.Indicator />
              )}
            </Box>

            {/* Text content */}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title fontWeight="bold" fontSize="sm">
                  {toast.title}
                </Toast.Title>
              )}
              {toast.description && (
                <Toast.Description fontSize="sm" opacity={0.85}>
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>

            {/* Optional action button */}
            {toast.action && (
              <Toast.ActionTrigger
                fontSize="xs"
                bg="whiteAlpha.200"
                px={3}
                py={1}
                borderRadius="md"
                _hover={{ bg: "whiteAlpha.300" }}
              >
                {toast.action.label}
              </Toast.ActionTrigger>
            )}

            {/* Close button */}
            {toast.closable && <Toast.CloseTrigger />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
};
