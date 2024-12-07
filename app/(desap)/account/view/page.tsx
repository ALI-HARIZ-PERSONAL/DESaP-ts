'use client';

import React from 'react';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';

const ViewAccountPage = () => {
  const mockAccountData = {
    username: 'johndoe',
    email: 'johndoe@example.com',
    role: 'User',
  };

  return (
    <Box maxW="600px" mx="auto" p="4" bg="gray.50" borderRadius="md" shadow="md">
      <Heading as="h1" size="lg" mb="6">
        Account Information
      </Heading>
      <Text fontSize="lg" mb="2">
        <strong>Username:</strong> {mockAccountData.username}
      </Text>
      <Text fontSize="lg" mb="2">
        <strong>Email:</strong> {mockAccountData.email}
      </Text>
      <Text fontSize="lg" mb="4">
        <strong>Role:</strong> {mockAccountData.role}
      </Text>

      <Stack direction="row" spacing="4" mt="6">
        {/* Button to update account */}
        <Button as="a" href="/account/update" colorScheme="green">
          Update Account
        </Button>

        {/* Button to navigate back to home */}
        <Button as="a" href="/" colorScheme="blue">
          Back to Home
        </Button>
      </Stack>
    </Box>
  );
};

export default ViewAccountPage;
