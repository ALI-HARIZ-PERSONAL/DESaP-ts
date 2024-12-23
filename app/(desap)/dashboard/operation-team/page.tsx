"use client";

import { HStack, Link, Box, Container, Heading, Text, Button, VStack } from "@chakra-ui/react";

export default function OperationTeamDashboard() {
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
                    <Link href="/" fontWeight="bold" color="blue.500">
                        Home
                    </Link>
                    <Link href="/account/view" fontWeight="bold" color="blue.500">
                        View Profile
                    </Link>
                    <Link href="/account/update" fontWeight="bold" color="blue.500">
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
                    Welcome, Operation Team! <br />
                    <Text as={"span"} color={"#3e3030"}>
                        Your Operational Dashboard
                    </Text>
                </Heading>
                <Text color={"gray.500"} textAlign={"center"} mt={4}>
                    Manage larvae and mosquito egg calculations efficiently through this dashboard.
                </Text>

                {/* Action Buttons */}
                <VStack spacing={6} mt={8}>
                    {/* Larvae Calculation Record */}
                    <Button
                        as={"a"}
                        href="/operation-team/larvae/create"
                        colorScheme={"blue"}
                        bg={"blue.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Create Larvae Calculation Record
                    </Button>
                    <Button
                        as={"a"}
                        href="/operation-team/larvae/view"
                        colorScheme={"blue"}
                        bg={"blue.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        View Larvae Calculation Records
                    </Button>

                    {/* Mosquito Eggs Calculation */}
                    <Button
                        as={"a"}
                        href="/operation-team/mosquito-eggs/calculate"
                        colorScheme={"green"}
                        bg={"green.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Make Mosquito Eggs Calculation
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
