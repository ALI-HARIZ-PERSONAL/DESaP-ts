"use client";

import { useState } from "react";
import { questions } from "./questions";
import { Box, Button, Checkbox, Container, Heading, Stack, Text, VStack } from "@chakra-ui/react";

export default function QuestionPage() {
    const [responses, setResponses] = useState<Record<number, number | number[] | undefined>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (questionIndex: number, optionIndex: number, isChecked: boolean) => {
        setResponses((prev) => {
            const isMultipleChoice = questionIndex === 7; // only question8 is multiple answers
            if (isMultipleChoice) {
                const currentAnswers = (prev[questionIndex] as number[]) || [];
                const updatedAnswers = isChecked
                    ? [...currentAnswers, optionIndex]
                    : currentAnswers.filter((idx: number) => idx !== optionIndex);
                return { ...prev, [questionIndex]: updatedAnswers };
            } else {
                return { 
                    ...prev, 
                    [questionIndex]: isChecked ? optionIndex : undefined,   // Deselect if unchecked
                };
            }
        });
    };

    const handleSubmit = async () => {
        try {
            // Compute the total score and prepare the data to send
            const responseData = Object.entries(responses).map(([questionIndex, answer]) => {
                const index = parseInt(questionIndex, 10);
                const question = questions[index];
                let score = 0;
    
                if (Array.isArray(answer)) {
                    // Multiple choice question
                    score = answer.reduce((acc, optionIndex) => acc + question.points[optionIndex], 0);
                } else if (typeof answer === "number") {
                    // Single choice question
                    score = question.points[answer];
                }
    
                return {
                    questionIndex: index,
                    selectedAnswers: answer, // Can be a number or array of numbers
                    score,
                };
            });
    
            const totalScore = responseData.reduce((sum, item) => sum + item.score, 0);
    
            // Create the payload
            const payload = {
                userId: "user_id_placeholder", // Replace with actual user ID if available
                reportedDate: new Date().toISOString(),
                responses: responseData, // Include question index and answers
                totalScore,
            };
    
            // Send the data to the backend
            const res = await fetch("/api/community-member/report-dengue", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            if (res.ok) {
                alert("Thank you for submitting your responses!");
                setSubmitted(true);
            } else {
                alert("Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting responses:", error);
        }
    };

    const highlightText = (text: string) => {
        const targetText = "Choose all that apply.";
        if (text.includes(targetText)) {
            const parts = text.split(targetText);
            return (
                <>
                    {parts[0]}
                    <span style = {{color: "red"}}>{targetText}</span>
                    {parts[1]}
                </>
            )
        }
        return text;
    }

    return (
        <Container maxW="3xl" py={10}>
            <Heading mb={6} textAlign="center">Health Questionnaire</Heading>
            {!submitted ? (
                <VStack spacing={8}>
                    {questions.map((q, index) => (
                        <Box key={index} borderWidth={1} borderRadius="md" p={5} w="full">
                            <Text mb={3} fontWeight="bold">
                                {/* 「Choose all that apply」only be red */}
                                {highlightText(q.question)}
                            </Text>
                            <VStack spacing={2} align="start">
                                {q.options.map((option, i) => (
                                    <Checkbox
                                        key={i}
                                        onChange={(e) => handleChange(index, i, e.target.checked)}
                                        isChecked={
                                            Array.isArray(responses[index])
                                                ? (responses[index] as number[]).includes(i)
                                                : responses[index] === i
                                        }
                                        // For single-choice questions, if another option has already been selected, disable the other option
                                        isDisabled={
                                            index !== 7 && responses[index] !== undefined && responses[index] !== i
                                        }
                                    >
                                        {option}
                                    </Checkbox>
                                ))}
                            </VStack>
                        </Box>
                    ))}
                    <Button colorScheme="teal" onClick={handleSubmit}>
                        Submit
                    </Button>
                </VStack>
            ) : (
                <Text>Thank you for completing the questionnaire!</Text>
            )}
        </Container>
    );
}