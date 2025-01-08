"use client";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ViewLarvaeRecords() {
    const [records, setRecords] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRecords = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("/api/operation-team/larvae/view");
                if (response.ok) {
                    const data = await response.json();
                    setRecords(data.records);
                } else {
                    console.error("Failed to fetch records.");
                }
            } catch (error) {
                console.error("Error fetching records:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecords();
    }, []);

    return (
        <Box maxW="6xl" mx="auto" py={10}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Larvae Calculation Records
            </Text>
            {isLoading ? (
                <Spinner size="lg" />
            ) : records.length > 0 ? (
                <Table variant="striped" colorScheme="teal">
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
                <Text>No records found.</Text>
            )}
        </Box>
    );
}
