"use client";

import {
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Input,
} from "@chakra-ui/react";

const RemoveMember: React.FC = () => {
    return (
        <Box maxW="6xl" mx="auto" py={10} px={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Remove a Member
            </Text>
            <Input
                placeholder="Enter username or email to search"
                mb={4}
                variant="outline"
            />
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>Email</Th>
                        <Th>Phone Number</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {/* Placeholder row */}
                    <Tr>
                        <Td>user123</Td>
                        <Td>user123@example.com</Td>
                        <Td>+123456789</Td>
                        <Td>
                            <Button colorScheme="red" size="sm">
                                Remove
                            </Button>
                        </Td>
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

export default RemoveMember;
