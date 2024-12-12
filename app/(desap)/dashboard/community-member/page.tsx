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
                    Welcome, {userData?.name || "Community Member"}! <br />
                    <Text as={"span"} color={"#3e3030"}>
                        Your Dengue Risk Dashboard
                    </Text>
                </Heading>
                <Text color={"gray.500"} textAlign={"center"} mt={4}>
                    Report your own dengue case, view reported dengue cases, and manage your council conveniently through this dashboard.
                </Text>

                {/* Action Buttons */}
                <VStack spacing={6} mt={8}>
                    {/*Report Own Dengue Case */}
                    <Button
                        as={"a"}
                        href="/community-member/report-dengue"
                        colorScheme={"blue"}
                        bg={"blue.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Report Dengue Case
                    </Button>

                    {/*View Reported Dengue Cases in the Council*/}
                    <Button
                        as={"a"}
                        href="/community-member/view-report"
                        colorScheme={"blue"}
                        bg={"blue.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        View Reported Dengue Case
                    </Button>
                    <Button
                        as={"a"}
                        href="/community-member/manage-council"
                        colorScheme={"green"}
                        bg={"green.500"}
                        rounded={"full"}
                        px={6}
                        size={"lg"}
                    >
                        Manage Council
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
