'use client';

import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Button, Stack, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const ViewAccountPage = () => {
  const [accountData, setAccountData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccountData = async () => {
    try {
      const email = 'johndoe@example.com'; // Replace with dynamic email (e.g., from session)
      const response = await fetch(`/api/account/view?email=${email}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch account data.');
      }

      const data = await response.json();
      setAccountData(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt="6">
        <Spinner size="lg" color="blue.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxW="600px" mx="auto" p="4">
        <Alert status="error" mb="4">
          <AlertIcon />
          {error}
        </Alert>
        <Button as="a" href="/" colorScheme="blue">
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="600px" mx="auto" p="4" bg="gray.50" borderRadius="md" shadow="md">
      <Heading as="h1" size="lg" mb="6">
        Account Information
      </Heading>
      <Text fontSize="lg" mb="2">
        <strong>Username:</strong> {accountData?.username || 'N/A'}
      </Text>
      <Text fontSize="lg" mb="2">
        <strong>Email:</strong> {accountData?.email || 'N/A'}
      </Text>
      <Text fontSize="lg" mb="4">
        <strong>Role:</strong> {accountData?.role || 'N/A'}
      </Text>

      <Stack direction="row" spacing="4" mt="6">
        <Button as="a" href="/account/update" colorScheme="green">
          Update Account
        </Button>
        <Button as="a" href="/" colorScheme="blue">
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default ViewAccountPage;
