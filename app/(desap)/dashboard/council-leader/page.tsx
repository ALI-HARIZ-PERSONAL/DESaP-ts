"use client";

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

export default function CouncilLeaderDashboard() {
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
                    <Link href="/council-leader/home" fontWeight="bold" color="blue.500">
                        Home
                    </Link>
                    <Link href="/council-leader/profile" fontWeight="bold" color="blue.500">
                        View Profile
                    </Link>
                    <Link href="/council-leader/settings" fontWeight="bold" color="blue.500">
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
                    Welcome, Council Leader! <br />
                    <Text as={"span"} color={"#3e3030"}>
                        Your Management Dashboard
                    </Text>
                </Heading>
                <Text color={"gray.500"} textAlign={"center"} mt={4}>
                    Manage council members and verify reports conveniently through this dashboard.
                </Text>

                {/* Action Buttons */}
                <VStack spacing={6} mt={8}>
                    <Button
                        as={"a"}
                        href="/council-leader/view-members"
                        colorScheme={"green"}
                        bg={"green.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        View Council Members
                    </Button>
                    <Button
                        as={"a"}
                        href="/council-leader/remove-member"
                        colorScheme={"red"}
                        bg={"red.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Remove Council Member
                    </Button>
                    <Button
                        as={"a"}
                        href="/council-leader/verify-reports"
                        colorScheme={"blue"}
                        bg={"blue.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Verify Dengue Reports
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
