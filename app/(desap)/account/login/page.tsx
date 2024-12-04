'use client';

import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, Container, Alert, AlertIcon } from '@chakra-ui/react';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid login');
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            console.log('Login successful:', data);
            alert('Login successful!');
            // Redirect or handle login success here
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxW="md" py={8}>
            <Box textAlign="center" mb={8}>
                <Heading size="lg" mb={2}>
                    Welcome Back!
                </Heading>
                <Text fontSize="md" color="gray.600">
                    Please login to your account.
                </Text>
            </Box>

            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}

            <Box
                as="form"
                bg="white"
                boxShadow="lg"
                borderRadius="md"
                p={8}
                onSubmit={handleSubmit}
            >
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            focusBorderColor="blue.500"
                            _placeholder={{ color: 'gray.500', fontSize: 'sm' }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            focusBorderColor="blue.500"
                            _placeholder={{ color: 'gray.500', fontSize: 'sm' }}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        colorScheme="blue"
                        isLoading={isLoading}
                        loadingText="Logging in..."
                        mt={4}
                    >
                        Login
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default LoginPage;
