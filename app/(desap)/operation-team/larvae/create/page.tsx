"use client";

import { Box, Heading, Text, VStack, Button, FormControl, FormLabel, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function CreateLarvaeRecord() {
    const [formData, setFormData] = useState({
        location: "",
        date: "",
        larvaeCount: "",
        notes: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.location || !formData.date || !formData.larvaeCount || !formData.notes) {
            toast({ title: "All fields are required.", status: "error", duration: 3000 });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/operation-team/larvae/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({ title: "Larvae calculation record created successfully!", status: "success", duration: 3000 });
                setFormData({ location: "", date: "", larvaeCount: "", notes: "" });
            } else {
                toast({ title: "Failed to create record.", status: "error", duration: 3000 });
            }
        } catch (error) {
            console.error("Error:", error);
            toast({ title: "An error occurred.", status: "error", duration: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box maxW="3xl" mx="auto" py={10}>
            <Heading as="h1" size="2xl" textAlign="center" mb={6} color="blue.600">
                Create Larvae Calculation Record
            </Heading>
            <Text textAlign="center" color="gray.600" mb={6}>
                Fill out the necessary details to create a larvae calculation record.
            </Text>

            <form onSubmit={handleSubmit}>
                <VStack spacing={6}>
                    <FormControl isRequired>
                        <FormLabel>Location</FormLabel>
                        <Input
                            name="location"
                            placeholder="Enter location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Date</FormLabel>
                        <Input
                            type="date"
                            name="date"
                            placeholder="Enter date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Larvae Count</FormLabel>
                        <Input
                            type="number"
                            name="larvaeCount"
                            placeholder="Enter larvae count"
                            value={formData.larvaeCount}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Notes</FormLabel>
                        <Textarea
                            name="notes"
                            placeholder="Enter any notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <Button
                        type="submit"
                        size="lg"
                        colorScheme="blue"
                        bg="blue.500"
                        rounded="full"
                        isLoading={isLoading}
                    >
                        Submit
                    </Button>
                </VStack>
            </form>

            <VStack mt={8}>
                <Button
                    as="a"
                    href="/dashboard/operation-team"
                    size="lg"
                    colorScheme="gray"
                    rounded="full"
                >
                    Back to Dashboard
                </Button>
            </VStack>
        </Box>
    );
}
