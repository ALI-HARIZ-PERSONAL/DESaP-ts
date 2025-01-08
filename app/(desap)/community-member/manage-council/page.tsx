"use client";

import {
    Box,
    Button,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface CouncilMember {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default function ManageCouncil() {
    const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>([]);
    const [newMemberEmail, setNewMemberEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    // Fetch council members
    useEffect(() => {
        fetchCouncilMembers();
    }, []);

    const fetchCouncilMembers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/council/members");
            if (response.ok) {
                const data = await response.json();
                setCouncilMembers(data.members);
            } else {
                toast({ title: "Failed to fetch members.", status: "error" });
            }
        } catch (error) {
            console.error("Error fetching members:", error);
            toast({ title: "An error occurred while fetching members.", status: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddMember = async () => {
        if (!newMemberEmail.trim()) {
            toast({ title: "Email is required.", status: "warning" });
            return;
        }

        try {
            const response = await fetch("/api/council/add-member", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newMemberEmail }),
            });

            if (response.ok) {
                toast({ title: "Member added successfully.", status: "success" });
                fetchCouncilMembers();
                setNewMemberEmail("");
                onClose();
            } else {
                toast({ title: "Failed to add member.", status: "error" });
            }
        } catch (error) {
            console.error("Error adding member:", error);
            toast({ title: "An error occurred while adding member.", status: "error" });
        }
    };

    const handleRemoveMember = async (memberId: string) => {
        try {
            const response = await fetch(`/api/council/remove-member/${memberId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast({ title: "Member removed successfully.", status: "success" });
                fetchCouncilMembers();
            } else {
                toast({ title: "Failed to remove member.", status: "error" });
            }
        } catch (error) {
            console.error("Error removing member:", error);
            toast({ title: "An error occurred while removing member.", status: "error" });
        }
    };

    return (
        <Box maxW="6xl" mx="auto" py={10} px={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Manage Council Members
            </Text>

            {/* Add Member Button */}
            <Button colorScheme="teal" onClick={onOpen} mb={6}>
                Add Member
            </Button>

            {/* Council Members Table */}
            {isLoading ? (
                <Box textAlign="center">
                    <Spinner size="lg" />
                </Box>
            ) : (
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Email</Th>
                            <Th>Role</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {councilMembers.map((member) => (
                            <Tr key={member.id}>
                                <Td>{member.name}</Td>
                                <Td>{member.email}</Td>
                                <Td>{member.role}</Td>
                                <Td>
                                    <Button
                                        colorScheme="red"
                                        size="sm"
                                        onClick={() => handleRemoveMember(member.id)}
                                    >
                                        Remove
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}

            {/* Add Member Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Council Member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Text>Enter the email of the member to add:</Text>
                            <Input
                                placeholder="Member Email"
                                value={newMemberEmail}
                                onChange={(e) => setNewMemberEmail(e.target.value)}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="teal" onClick={handleAddMember}>
                            Add
                        </Button>
                        <Button variant="ghost" onClick={onClose} ml={3}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
