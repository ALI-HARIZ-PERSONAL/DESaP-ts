// app/(desap)/operation-team/larvae/create/page.tsx
"use client";

import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";

export default function CreateLarvaeRecord() {
    return (
        <Box maxW="3xl" mx="auto" py={10}>
            <Heading
                as="h1"
                size="2xl"
                textAlign="center"
                mb={6}
                color="blue.600"
            >
                Create Larvae Calculation Record
            </Heading>
            <Text textAlign="center" color="gray.600" mb={6}>
                Fill out the necessary details to create a larvae calculation record.
            </Text>

            <VStack spacing={6}>
                {/* Add form or actions here */}
                <Button
                    size="lg"
                    colorScheme="blue"
                    bg="blue.500"
                    rounded="full"
                >
                    Back to Dashboard
                </Button>
            </VStack>
        </Box>
    );
}
