'use client';

import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, Stack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';

interface AccountData {
  userName: string;
  email: string;
  role: string;
}

const ViewAccountPage = () => {
  const { data: session, status } = useSession();
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log
  const fetchAccountData = async () => {
    try {
      if (!session || !session.user.email) {
        throw new Error("User is not logged in or email is unavailable.");
      }

      const response = await fetch(`/api/profile/readByEmail?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user data. Status: ${response.status}`);
      }

      const data: AccountData = await response.json();
      setAccountData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAccountData();
    }
  }, [status]);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;

  return (
    <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
      <Heading size="md">Account Information</Heading>
      <Stack mt={4} spacing={2}>
        <Text><strong>Username:</strong> {accountData?.userName || "N/A"}</Text>
        <Text><strong>Email:</strong> {accountData?.email || "N/A"}</Text>
        <Text><strong>Role:</strong> {accountData?.role || "N/A"}</Text>
      </Stack>
      <Stack direction="row" spacing={4} mt={6}>
        <Button colorScheme="teal">Update Account</Button>
        <Button colorScheme="blue">Back to Home</Button>
      </Stack>
    </Box>
  );
};

export default ViewAccountPage;
