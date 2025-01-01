"use client";

import { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Spinner, Select, useToast } from "@chakra-ui/react";

interface Member{
    _id: string;
    username: string;
    email: string;
    mobileNumber: string;
}

const ViewMembers: React.FC = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [role, setRole] = useState("member");
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/account/view-allmembers?role=${role}`);
            const data = await response.json();
            setMembers(data.members || []);
        } catch (error) {
            console.error("Error fetching members:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [role]);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this member?")) {
            try {
                const response = await fetch(`/api/account/delete?id=${id}`, { method: "DELETE" });
                if (response.ok) {
                    toast({
                        title: "Member deleted successfully.",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    fetchMembers(); // Refresh the list
                } else {
                    const error = await response.json();
                    toast({
                        title: "Error deleting member.",
                        description: error.message || "Unknown error occurred.",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } catch (error) {
                console.error("Error deleting member:", error);
            }
        }
    };


    return (
        <Box maxW="6xl" mx="auto" py={10} px={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Council Members
            </Text>
            <Select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                mb={4}
                maxW="300px"
                mx="auto"
            >
                <option value="member">Community Members</option>
                <option value="community-leader">Community Leaders</option>
            </Select>
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
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {members.length > 0 ? (
                            members.map((member, index) => (
                                <Tr key={index}>
                                    <Td>{member.username}</Td>
                                    <Td>{member.email}</Td>
                                    <Td>{member.mobileNumber}</Td>
                                    <Td>
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            onClick={() => handleDelete(member._id)}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
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
