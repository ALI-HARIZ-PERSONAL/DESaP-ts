"use client";

import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button } from "@chakra-ui/react";

const ViewMembers: React.FC = () => {
    return (
        <Box maxW="6xl" mx="auto" py={10} px={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Council Members
            </Text>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th>Phone Number</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* Placeholder row */}
                    <Tr>
                        <Td>-</Td>
                        <Td>-</Td>
                        <Td>-</Td>
                    </Tr>
                </Tbody>
            </Table>
            <Box textAlign="center" mt={6}>
                <Button
                    as="a"
                    href="/dashboard/community-leader"
                    colorScheme="gray"
                    rounded="full"
                    px={6}
                >
                    Back to Dashboard
                </Button>
            </Box>
        </Box>
    );
};

export default ViewMembers;
