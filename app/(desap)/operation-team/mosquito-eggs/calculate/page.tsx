"use client";

import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Text } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";

export default function MosquitoEggCalculation() {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [eggCount, setEggCount] = useState<number | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            toast({ title: "Please upload an image.", status: "error" });
            return;
        }

        setIsLoading(true);

        try {
            // Simulate a delay to mimic backend processing
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Mock result
            const mockEggCount = 42; // Replace with any mock value
            setEggCount(mockEggCount); // Display the mocked egg count
            toast({
                title: `Egg Count: ${mockEggCount}`,
                description: "Image processed successfully.",
                status: "success",
            });
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
                
                <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
                    Mosquito Eggs Calculation
                </Text>

                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Upload Image</FormLabel>
                        <Input type="file" accept="image/*" onChange={handleImageChange} />
                    </FormControl>

                    {/* Image Preview */}
                    {imagePreview && (
                        <Box mt={4}>
                            <Text>Preview:</Text>
                            <Image src={imagePreview} alt="Uploaded Image" width={300} height={200} />
                        </Box>
                    )}

                    <Button type="submit" colorScheme="green" isLoading={isLoading}>
                        Submit
                    </Button>
                </VStack>
            </form>

            {/* Display Egg Count */}
            {eggCount !== null && (
                <Box mt={8} p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
                    <Text fontSize="xl" fontWeight="bold">
                        Egg Count: {eggCount}
                    </Text>
                </Box>
            )}
        </Box>
    );
}
