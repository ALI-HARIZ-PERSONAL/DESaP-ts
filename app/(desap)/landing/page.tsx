"use client";

import { useUser } from "@/shared/providers/userProvider";
import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import { Role } from "@prisma/client";

export default function LandingPage() {
    const { userData } = useUser();

    return (
        <Container maxW={"3xl"}>
            <Stack
                as={Box}
                textAlign={"center"}
                spacing={{ base: 8, md: 14 }}
                py={{ base: 20, md: 36 }}
            >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                    lineHeight={"110%"}
                >
                    Welcome to DESAP: <br />
                    <Text as={"span"} color={"#3e3030"}>
                        Account Management System
                    </Text>
                </Heading>
                <Text color={"gray.500"}>
                    Manage your account information easily and securely with DESAP's
                    Account Management Module. Create, view, update, and delete your
                    account all in one place.
                </Text>
                <Stack
                    direction={"row"}
                    spacing={3}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                >
                    {userData ? (
                        <>
                            <Button
                                as={"a"}
                                href="/account/view"
                                colorScheme={"green"}
                                bg={"brand.acceptbutton"}
                                rounded={"full"}
                                px={6}
                            >
                                View Account
                            </Button>
                            <Button
                                as={"a"}
                                href="/account/update"
                                rounded={"full"}
                                px={6}
                                colorScheme={"green"}
                                bg={"brand.acceptbutton"}
                            >
                                Update Account
                            </Button>
                            <Button
                                as={"a"}
                                href="/account/delete"
                                colorScheme={"red"}
                                bg={"red.500"}
                                rounded={"full"}
                                px={6}
                            >
                                Delete Account
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                as={"a"}
                                href="/register"
                                rounded={"full"}
                                px={6}
                                colorScheme={"green"}
                                bg={"brand.acceptbutton"}
                            >
                                Create Account
                            </Button>
                            <Button
                                as={"a"}
                                href="/account/login"
                                rounded={"full"}
                                px={6}
                                colorScheme={"blue"}
                                bg={"blue.500"}
                            >
                                Login
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </Container>
    );
}
