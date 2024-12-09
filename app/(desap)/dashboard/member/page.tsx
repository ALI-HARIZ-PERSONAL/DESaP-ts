"use client";

import { HStack, Link, Box } from "@chakra-ui/react";

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
        </Box>
    );
}
