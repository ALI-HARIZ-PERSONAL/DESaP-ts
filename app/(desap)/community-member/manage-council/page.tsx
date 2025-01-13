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
} from "@chakra-ui/react";
import { useState } from "react";
import { councils } from "./council"; // Import updated council data

export default function ManageCouncil() {
  const [filteredCouncils, setFilteredCouncils] = useState(councils);
  const [selectedState, setSelectedState] = useState<string>("");

  const states = Array.from(new Set(councils.map((council) => council.state)));

  const filterCouncilsByState = (state: string) => {
    if (state) {
      setFilteredCouncils(councils.filter((council) => council.state === state));
    } else {
      setFilteredCouncils(councils);
    }
  };

  return (
    <Box maxW="6xl" mx="auto" py={10}>
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
