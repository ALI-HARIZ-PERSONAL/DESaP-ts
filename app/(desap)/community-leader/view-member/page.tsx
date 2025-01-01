"use client";

import { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Spinner } from "@chakra-ui/react";

interface Member{
    username: string;
    email: string;
    mobileNumber: string;
}

const ViewMembers: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMembers() {
            try {
                const response = await fetch("/api/account/view-allmembers");
                const data = await response.json();
                setMembers(data.members || []);
            } catch (error) {
                console.error("Error fetching members:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMembers();
    }, []);

    return (
        <Box maxW="6xl" mx="auto" py={10} px={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Council Members
            </Text>
            {loading ? (
                <Box textAlign="center">
                    <Spinner size="lg" />
                </Box>
            ) : (
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>Email</Th>
                            <Th>Phone Number</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {members.length > 0 ? (
                            members.map((member, index) => (
                                <Tr key={index}>
                                    <Td>{member.username}</Td>
                                    <Td>{member.email}</Td>
                                    <Td>{member.mobileNumber}</Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={3} textAlign="center">
                                    No members found.
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            )}
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
