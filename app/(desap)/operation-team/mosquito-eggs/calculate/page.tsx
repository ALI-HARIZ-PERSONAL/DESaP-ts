"use client";

import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";

export default function MosquitoEggCalculation() {
    const [formData, setFormData] = useState({
        location: "",
        eggCount: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.location || !formData.eggCount) {
            toast({ title: "Location and Egg Count are required.", status: "error" });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/operation-team/mosquito-eggs/calculate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({ title: "Mosquito egg calculation submitted.", status: "success" });
                setFormData({ location: "", eggCount: "" });
            } else {
                toast({ title: "Failed to submit calculation.", status: "error" });
            }
        } catch (error) {
            console.error("Error:", error);
            toast({ title: "An error occurred.", status: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box maxW="lg" mx="auto" py={10}>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl>
                        <FormLabel>Location</FormLabel>
                        <Input
                            name="location"
                            placeholder="Enter location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Egg Count</FormLabel>
                        <Input
                            name="eggCount"
                            placeholder="Enter egg count"
                            type="number"
                            value={formData.eggCount}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="green" isLoading={isLoading}>
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    );
}
