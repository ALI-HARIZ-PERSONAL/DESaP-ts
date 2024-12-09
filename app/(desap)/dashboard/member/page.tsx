"use client";

import { HStack, Link, Box, Container, Heading, Text } from "@chakra-ui/react";

export default function MemberDashboard() {
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
                    Welcome, Member! <br />
                    <Text as={"span"} color={"#3e3030"}>
                        Your Dengue Risk Dashboard
                    </Text>
                </Heading>
                <Text color={"gray.500"} textAlign={"center"} mt={4}>
                    Analyze your symptoms, report dengue cases, and track your history
                    conveniently through this dashboard.
                </Text>
            </Container>
        </Box>
    );
}
