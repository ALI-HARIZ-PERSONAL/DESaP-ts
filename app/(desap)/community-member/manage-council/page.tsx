"use client";

import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Select,
  VStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { councils } from "./council";
import { useSession } from "next-auth/react";

export default function ManageCouncil() {
  const { data: session } = useSession(); // Fetch session data using next-auth
  const [filteredCouncils, setFilteredCouncils] = useState(councils);
  const [selectedState, setSelectedState] = useState<string>("");
  const [councilId, setCouncilId] = useState<string>("");
  const toast = useToast();

  // Debug: Log the session
  useEffect(() => {
    console.log("Session:", session);
  }, [session]);

  const states = Array.from(new Set(councils.map((council) => council.state)));

  const filterCouncilsByState = (state: string) => {
    if (state) {
      setFilteredCouncils(councils.filter((council) => council.state === state));
    } else {
      setFilteredCouncils(councils);
    }
  };

  const handleJoinCouncil = async () => {
    if (!councilId.trim()) {
      toast({ title: "Please enter a council ID.", status: "warning" });
      return;
    }

    if (!session || !session.user) {
      toast({ title: "You must be logged in to join a council.", status: "error" });
      return;
    }

    const userId = session.user.id; // User ID from session
    const userToken = session.accessToken; // Access token from session

    try {
      const response = await fetch("/api/council/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ councilId }),
      });

      if (response.ok) {
        const result = await response.json();
        toast({ title: result.message || "Joined council successfully!", status: "success" });
        setCouncilId(""); // Reset the input field
      } else {
        const errorData = await response.json();
        toast({ title: errorData.error || "Failed to join council.", status: "error" });
      }
    } catch (error) {
      console.error("Error joining council:", error);
      toast({ title: "An error occurred while joining council.", status: "error" });
    }
  };

  return (
    <Box maxW="6xl" mx="auto" py={10}>
      {/* "Join a Council" Section */}
      <VStack mb={6} spacing={4}>
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

      {/* Dropdown to filter by state */}
      <VStack mb={6} spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Select a Region
        </Text>
        <Select
          placeholder="All Regions"
          value={selectedState}
          onChange={(e) => {
            const state = e.target.value;
            setSelectedState(state);
            filterCouncilsByState(state);
          }}
        >
          <option value="">All Regions</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </VStack>

      {/* Table to display councils */}
      {filteredCouncils.length > 0 ? (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>District</Th>
              <Th>State</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCouncils.map((council) => (
              <Tr key={council.id}>
                <Td>{council.id}</Td>
                <Td>{council.district}</Td>
                <Td>{council.state}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No councils available for this region.</Text>
      )}
    </Box>
  );
}
