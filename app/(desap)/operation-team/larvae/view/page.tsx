
"use client";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner, Alert, AlertIcon, VStack, Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ViewLarvaeRecords() {
    const [records, setRecords] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

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

    const handleDelete = async (id: string) => {
        if (!id) {
          console.error("Invalid ID passed to delete.");
          toast({ title: "Invalid record ID.", status: "error" });
          return;
        }
      
        try {
          const response = await fetch(`/api/operation-team/larvae/delete/${id}`, {
            method: "DELETE",
          });
      
          if (response.ok) {
            toast({ title: "Record deleted successfully.", status: "success" });
            fetchRecords(); // Refresh the records list
          } else {
            toast({ title: "Failed to delete record.", status: "error" });
          }
        } catch (error) {
          console.error("Error deleting record:", error);
          toast({ title: "An unexpected error occurred.", status: "error" });
        }
      };
      

    useEffect(() => {
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
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {records.map((record) => (
                        <Tr key={record._id}>
                            <Td>{record._id}</Td> {/* Display _id */}
                            <Td>{record.location}</Td>
                            <Td>{record.larvaeCount}</Td>
                            <Td>{record.notes}</Td>
                            <Td>{new Date(record.date).toLocaleDateString()}</Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    size="sm"
                                    onClick={() => handleDelete(record._id)} // Pass the correct _id
                                >
                                    Delete
                                </Button>
                            </Td>
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
