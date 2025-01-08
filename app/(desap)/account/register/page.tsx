'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Input, Text, Select, Checkbox, VStack, FormControl, FormErrorMessage, Spinner } from '@chakra-ui/react';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        profilePicture: null,
        username: '',
        email: '',
        mobileNumber: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
        role: '',
        termsAccepted: false,
    });

    const [ageError, setAgeError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'birthDate') {
            const age = calculateAge(new Date(value));
            if (age < 18) {
                setAgeError('You must be at least 18 years old to register.');
            } else {
                setAgeError('');
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, profilePicture: e.target.files[0] });
        }
    };

    const calculateAge = (birthDate: Date) => {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate password confirmation
        if (formData.password.trim() !== formData.confirmPassword.trim()) {
            setPasswordError('Passwords do not match.');
            return;
        } else {
            setPasswordError('');
        }

        // Check for missing fields
        if (!formData.username || !formData.email || !formData.password || !formData.mobileNumber) {
            setFormError('All fields are required.');
            return;
        }

        if (!formData.role) {
            setFormError('Please select a role.');
            return;
        }

        if (!formData.termsAccepted) {
            setFormError('You must agree to the Terms and Conditions.');
            return;
        }

        if (ageError || passwordError) {
            setFormError('Please fix the errors before submitting.');
            return;
        }

        setFormError(null);
        setIsLoading(true);

        try {
            const response = await fetch('/api/account/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setFormError(errorData.message || 'Failed to register.');
                return;
            }

            alert('Registration successful!');
            switch (formData.role) {
                case 'community-leader':
                    router.push('/dashboard/community-leader');
                    break;
                case 'operation-team':
                    router.push('/dashboard/operation-team');
                    break;
                case 'community-member':
                    router.push('/dashboard/community-member');
                    break;
            }
        } catch (error) {
            setFormError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="lg" bg="white">
            <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
                Register
            </Text>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isInvalid={!!formError}>
                        {formError && <FormErrorMessage>{formError}</FormErrorMessage>}
                    </FormControl>
                    <Input
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                    />
                    <Input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                    {ageError && <Text color="red.500">{ageError}</Text>}
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {passwordError && <Text color="red.500">{passwordError}</Text>}
                    <Select name="role" value={formData.role} onChange={handleChange} placeholder="Select Role">
                        <option value="community-leader">Community Leader</option>
                        <option value="community-member">Community Member</option>
                        <option value="operation-team">Operation Team</option>
                    </Select>
                    <Checkbox
                        isChecked={formData.termsAccepted}
                        onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                    >
                        I agree to the <a href="/terms">Terms and Conditions</a>.
                    </Checkbox>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        width="full"
                        isLoading={isLoading}
                        spinner={<Spinner />}
                    >
                        Register
                    </Button>
                </VStack>
            </form>
        </Box>
    );
};

export default RegistrationPage;
