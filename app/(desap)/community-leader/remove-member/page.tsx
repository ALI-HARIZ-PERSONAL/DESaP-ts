"use client";

import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Button,
    Spinner,
    Input,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface Member {
    _id: string;
    username: string;
    email: string;
    role: string;
    mobileNumber: string;
}

const ViewMembers: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const fetchMembers = async () => {
        if (!searchTerm) {
            toast({
                title: "Please enter a username or email to search.",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`/api/account/search-memberToDelete?query=${encodeURIComponent(searchTerm.trim())}`);
            const data = await response.json();
            console.log("Fetched members:", data);
            setMembers(data.members || []);
        } catch (error) {
            console.error("Error fetching members:", error);
            toast({
                title: "Error fetching members.",
                description: "An error occurred while fetching members.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

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
                    setMembers(members.filter((member) => member._id !== id)); // Update the list locally
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
                Search Members
            </Text>
            <Input
                placeholder="Enter username or email to search"
                mb={4}
                variant="outline"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={fetchMembers} colorScheme="blue" mb={4} isLoading={loading}>
                Search
            </Button>
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
                            <Th>Role</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {members.length > 0 ? (
                            members.map((member) => (
                                <Tr key={member._id}>
                                    <Td>{member.username}</Td>
                                    <Td>{member.email}</Td>
                                    <Td>{member.mobileNumber}</Td>
                                    <Td>{member.role}</Td>
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
                                <Td colSpan={4} textAlign="center">
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
