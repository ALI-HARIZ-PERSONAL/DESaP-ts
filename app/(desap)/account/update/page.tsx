"use client";

import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export default function UpdateAccountPage() {
  const [accountId, setAccountId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();

  const handleUpdate = async () => {
    if (!accountId) {
      toast({
        title: "Account ID is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!userName && !email && !password && !role) {
      toast({
        title: "No updates provided.",
        description: "Please fill in at least one field to update.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/account/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { id: accountId, userName, email, password, role },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Account updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error updating account.",
          description: data.error || "Something went wrong.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Network error.",
        description: "Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px">
      <Heading as="h1" size="lg" textAlign="center" mb={4}>
        Update Account
      </Heading>
      <Text mb={6} color="gray.600">
        Enter the account ID and details you wish to update.
      </Text>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Account ID</FormLabel>
          <Input
            placeholder="Enter Account ID"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            isDisabled={isUpdating}
          />
        </FormControl>
        <FormControl>
          <FormLabel>User Name</FormLabel>
          <Input
            placeholder="Enter User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            isDisabled={isUpdating}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={isUpdating}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isDisabled={isUpdating}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Role</FormLabel>
          <Input
            placeholder="Enter Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            isDisabled={isUpdating}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          onClick={handleUpdate}
          isLoading={isUpdating}
          loadingText="Updating"
        >
          Update Account
        </Button>
      </Stack>
    </Box>
  );
}
