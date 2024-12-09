"use client";

import { useUser } from "@/shared/providers/userProvider";
import {
    HStack,
    Link,
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
} from "@chakra-ui/react";

export default function MemberDashboard() {
    const { userData } = useUser();

    return (
        <Box>
            {/* Navigation Bar */}
            <HStack
                as="nav"
                bg="gray.100"
                p={4}
                justifyContent="space-between"
                boxShadow="sm"
            >
                <HStack spacing={8}>
                    <Link href="/member/home" fontWeight="bold" color="blue.500">
                        Home
                    </Link>
                    <Link href="/member/profile" fontWeight="bold" color="blue.500">
                        View Profile
                    </Link>
                    <Link href="/member/settings" fontWeight="bold" color="blue.500">
                        Settings
                    </Link>
                </HStack>
            </HStack>

            {/* Dashboard Content */}
            <Container maxW={"3xl"} py={10}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                    textAlign={"center"}
                >
                    Welcome, {userData?.name || "Member"}! <br />
                    <Text as={"span"} color={"#3e3030"}>
                        Your Dengue Risk Dashboard
                    </Text>
                </Heading>
                <Text color={"gray.500"} textAlign={"center"} mt={4}>
                    Analyze your symptoms, report dengue cases, and track your history
                    conveniently through this dashboard.
                </Text>

                {/* Action Buttons */}
                <VStack spacing={6} mt={8}>
                    <Button
                        as={"a"}
                        href="/member/analyze-symptoms"
                        colorScheme={"green"}
                        bg={"green.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Analyze Symptoms
                    </Button>
                    <Button
                        as={"a"}
                        href="/member/report-dengue"
                        colorScheme={"red"}
                        bg={"red.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Report Dengue Cases
                    </Button>
                    <Button
                        as={"a"}
                        href="/member/view-history"
                        colorScheme={"blue"}
                        bg={"blue.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        View History
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
