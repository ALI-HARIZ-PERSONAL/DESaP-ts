"use client";

import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";

export default function MainPage() {
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
                        Dengue Environmental Screening and Analysis Platform
                    </Text>
                </Heading>
                <Text color={"gray.500"}>
                    DESAP Community Version For Community Engagement Subsystem To Track Dengue
					Cases In Your Area
                </Text>
                <Stack
                    direction={"row"}
                    align={"center"}
                    alignSelf={"center"}
                    position={"relative"}
                >
                    <Button
                        as={"a"}
                        href="/account/register"
                        colorScheme={"green"}
                        bg={"brand.acceptbutton"}
                        rounded={"full"}
                        px={6}
                    >
                        Get Started
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
}
