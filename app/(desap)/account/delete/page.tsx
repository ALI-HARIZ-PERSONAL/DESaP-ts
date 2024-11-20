"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

export default function DeleteAccountPage() {
  const [accountId, setAccountId] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    if (!accountId) {
      toast({
        title: "Account ID is required.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/account/delete?id=${accountId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Account deleted successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          router.push("/"); // Redirect to the homepage or another route
        }, 3000);
      } else {
        toast({
          title: "Error deleting account.",
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
      setIsDeleting(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={5} shadow="md" borderWidth="1px">
      <Heading as="h1" size="lg" textAlign="center" mb={4}>
        Delete Account
      </Heading>
      <Text mb={6} color="gray.600">
        Enter the account ID you wish to delete. This action cannot be undone.
      </Text>
      <Stack spacing={4}>
        <Input
          placeholder="Enter Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          isDisabled={isDeleting}
        />
        <Button
          colorScheme="red"
          onClick={handleDelete}
          isLoading={isDeleting}
          loadingText="Deleting"
        >
          Delete Account
        </Button>
      </Stack>
    </Box>
  );
}
