"use client";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner, Alert, AlertIcon, VStack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ViewLarvaeRecords() {
    const [records, setRecords] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecords = async () => {
            setIsLoading(true);
            setError(null); // Reset error on new fetch
            try {
                const response = await fetch("/api/operation-team/larvae/view");
                if (response.ok) {
                    const data = await response.json();
                    setRecords(data.records);
                } else {
                    setError("Failed to fetch records. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching records:", error);
                setError("An unexpected error occurred.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecords();
    }, []);

    return (
        <Box maxW="6xl" mx="auto" py={10}>
            {/* Page Header */}
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Larvae Calculation Records
            </Text>

            {/* Table or Error Message */}
            {isLoading ? (
                <Spinner size="lg" mt={6} />
            ) : error ? (
                <Alert status="error" mt={6}>
                    <AlertIcon />
                    {error}
                </Alert>
            ) : records.length > 0 ? (
                <Table variant="striped" colorScheme="teal" mt={6}>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Location</Th>
                            <Th>Larvae Count</Th>
                            <Th>Notes</Th>
                            <Th>Date</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {records.map((record) => (
                            <Tr key={record.id}>
                                <Td>{record.id}</Td>
                                <Td>{record.location}</Td>
                                <Td>{record.larvaeCount}</Td>
                                <Td>{record.notes}</Td>
                                <Td>{new Date(record.date).toLocaleDateString()}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            ) : (
                <Text mt={6}>No records found.</Text>
            )}

            {/* Back to Dashboard Button */}
            <VStack mt={8}>
                <Button
                    as="a"
                    href="/dashboard/operation-team"
                    colorScheme="gray"
                    bg="gray.500"
                    rounded="full"
                    size="lg"
                >
                    Back to Dashboard
                </Button>
            </VStack>
        </Box>
    );
}
