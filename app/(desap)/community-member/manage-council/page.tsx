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
  Spinner,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface Council {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  leaderEmail?: string;
}

export default function ManageCouncil() {
  const [councils, setCouncils] = useState<Council[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [councilId, setCouncilId] = useState<string>("");
  const toast = useToast();

  // Fetch councils
  useEffect(() => {
    const fetchCouncils = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/council/readAll");
        const data = await response.json();
  
        console.log("Frontend Fetched Councils:", data); // Debug log
        setCouncils(data.data || []); // Adjusted to match API response structure
      } catch (error) {
        console.error("Error fetching councils:", error);
        toast({ title: "An error occurred while fetching councils.", status: "error" });
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCouncils();
  }, [toast]);
  
  const handleJoinCouncil = async () => {
    if (!councilId.trim()) {
      toast({ title: "Please enter a council ID.", status: "warning" });
      return;
    }

    try {
      const response = await fetch("/api/council/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ councilId }),
      });

      if (response.ok) {
        toast({ title: "Joined council successfully!", status: "success" });
      } else {
        toast({ title: "Failed to join council.", status: "error" });
      }
    } catch (error) {
      console.error("Error joining council:", error);
      toast({ title: "An error occurred while joining council.", status: "error" });
    }
  };

  return (
    <Box maxW="6xl" mx="auto" py={10}>
      <Text fontSize="2xl" fontWeight="bold" mb={6}>
        Available Councils
      </Text>

      {isLoading ? (
        <Spinner size="lg" />
      ) : councils.length > 0 ? (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>City</Th>
              <Th>State</Th>
              <Th>Address</Th>
              <Th>Leader Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {councils.map((council) => (
              <Tr key={council.id}>
                <Td>{council.id}</Td>
                <Td>{council.name}</Td>
                <Td>{council.city}</Td>
                <Td>{council.state}</Td>
                <Td>{council.address}</Td>
                <Td>{council.leaderEmail || "N/A"}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No councils available.</Text>
      )}

      <VStack mt={8} spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Join a Council
        </Text>
        <Input
          placeholder="Enter Council ID"
          value={councilId}
          onChange={(e) => setCouncilId(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleJoinCouncil}>
          Join
        </Button>
      </VStack>
    </Box>
  );
}
