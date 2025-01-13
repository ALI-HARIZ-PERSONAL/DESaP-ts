"use client";

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Checkbox,
    Container,
    Heading,
    Input,
    Stack,
    Text,
    Textarea,
    VStack,
    List,
    ListItem,
} from "@chakra-ui/react";
import { questions } from "./questions";

export default function QuestionPage() {
    const [responses, setResponses] = useState<Record<number, number | number[] | undefined>>({});
    const [submitted, setSubmitted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [pin, setPin] = useState("");
    const [isPinValid, setIsPinValid] = useState(false);
    const [authenticatedUser, setAuthenticatedUser] = useState<{ username: string; role: string } | null>(null);
    const [latitude, setLatitude] = useState<number | null>(3.139); // Default: Kuala Lumpur
    const [longitude, setLongitude] = useState<number | null>(101.6869); // Default: Kuala Lumpur
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [marker, setMarker] = useState<google.maps.Marker | null>(null);
    const [confirmedLocation, setConfirmedLocation] = useState<{ lat: number; lng: number } | null>(null);

    useEffect(() => {
        const loadGoogleMapsApi = () => {
            if (typeof google !== "undefined") return; // Prevent duplicate loading
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBpovSAJgK2XK__0HgBg6IETG3V4MN2r1w`;
            script.async = true;
            script.onload = () => {
                const mapInstance = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                    center: { lat: latitude!, lng: longitude! },
                    zoom: 12,
                });
                setMap(mapInstance);
    
                const markerInstance = new google.maps.Marker({
                    position: { lat: latitude!, lng: longitude! },
                    map: mapInstance,
                    draggable: true,
                });
                setMarker(markerInstance);
    
                // Add event listener for map click
                mapInstance.addListener("click", (event: google.maps.MouseEvent) => {
                    const clickedLat = event.latLng!.lat();
                    const clickedLng = event.latLng!.lng();
                    setLatitude(clickedLat);
                    setLongitude(clickedLng);
                    markerInstance.setPosition({ lat: clickedLat, lng: clickedLng });
                });
            };
            document.head.appendChild(script);
        };
    
        loadGoogleMapsApi();
    }, [latitude, longitude]); // Updated dependencies
    
    
    const handleSearch = async () => {
        if (!address.trim()) {
            alert("Please enter a valid address.");
            return;
        }
    
        try {
            const geocodeRes = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                    address
                )}&key=AIzaSyBpovSAJgK2XK__0HgBg6IETG3V4MN2r1w`
            );
            const data = await geocodeRes.json();
    
            if (data.status === "OK" && data.results.length > 0) {
                const location = data.results[0].geometry.location;
                setLatitude(location.lat);
                setLongitude(location.lng);
    
                if (map && marker) {
                    const newLocation = { lat: location.lat, lng: location.lng };
                    map.setCenter(newLocation);
                    marker.setPosition(newLocation);
                }
            } else {
                alert("Address not found. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
            alert("An error occurred while searching for the address.");
        }
    };

    const handleSearchUser = async () => {
        try {
            const res = await fetch(`/api/account/search-memberToDelete?query=${encodeURIComponent(searchTerm)}`)
            if (res.ok) {
                const data = await res.json();
                setSearchResults(data.members);
                setSelectedUserId(null);
            } else {
                alert("Error fetching accounts. Please try again.");
            } 
        } catch (error) {
            console.error("Error during search:", error);
        }
    }

    const handleChange = (questionIndex: number, optionIndex: number, isChecked: boolean) => {
        setResponses((prevResponses) => {
            // Determine if the question allows multiple answers
            const isMultipleChoice = Array.isArray(questions[questionIndex]?.options);
    
            if (isMultipleChoice) {
                // Handle multiple-choice questions
                const currentAnswers = (prevResponses[questionIndex] as number[]) || [];
                const updatedAnswers = isChecked
                    ? [...currentAnswers, optionIndex] // Add selected option
                    : currentAnswers.filter((idx) => idx !== optionIndex); // Remove unselected option
    
                return { ...prevResponses, [questionIndex]: updatedAnswers };
            } else {
                // Handle single-choice questions
                return { ...prevResponses, [questionIndex]: isChecked ? optionIndex : undefined };
            }
        });
    };
    
    
    const handlePinValidation = async () => {
        try {
            console.log(JSON.stringify({ userId: selectedUserId, password: pin }));

            const res = await fetch(`/api/account/validate-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: selectedUserId, password:pin }),
            });
           
            if (res.ok) {
                const data = await res.json();
                if (data.userId) {
                    setIsPinValid(true);
                    setSearchResults([]);
                    setAuthenticatedUser({ username: data.username, role: data.role });
                } else {
                    alert("Invalid Password. Please try again.");
                }
            } else {
                alert("Error validating Password. Please try again.");
            }
        } catch (error) {
            console.error("Error during password validation:", error);
        }
    };

   

    const handleConfirmLocation = () => {
        if (latitude && longitude) {
          setConfirmedLocation({ lat: latitude, lng: longitude });
          alert("Location confirmed!");
        } else {
          alert("Invalid location. Please try again.");
        }
      };    

      const handleSubmit = async () => {
        // Ensure user is logged in (authenticatedUser should be set)
        if (!selectedUserId) {
            alert("Please log in to submit the report.");
            return;
        }
    
        if (!latitude || !longitude) {
            alert("Please provide valid latitude and longitude.");
            return;
        }
    
        if (!confirmedLocation) {
            alert("Please confirm the location before submitting.");
            return;
        }
    
        try {
            // Prepare the data to send
            const responseData = Object.entries(responses).map(([questionIndex, answer]) => {
                const index = parseInt(questionIndex, 10);
                const question = questions[index];
                let score = 0;
    
                if (Array.isArray(answer)) {
                    score = answer.reduce((acc, optionIndex) => acc + question.points[optionIndex], 0);
                } else if (typeof answer === "number") {
                    score = question.points[answer];
                }
    
                return {
                    questionIndex: index,
                    selectedAnswers: answer,
                    score,
                };
            });
    
            const totalScore = responseData.reduce((sum, item) => sum + item.score, 0);
    
            // Create the payload with user info and location data
            const payload = {
                userId: selectedUserId, // Use authenticatedUser directly
                reportedDate: new Date().toISOString(),
                responses: responseData,
                totalScore,
                location: confirmedLocation,
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
                    <span style={{ color: "red" }}>{targetText}</span>
                    {parts[1]}
                </>
            );
        }
        return text;
    };

    const handleAddressChange = async (address: string) => {
        setAddress(address);
    
        try {
            const res = await fetch(`/api/community-member/report-dengue?address=${encodeURIComponent(address)}`);
            if (res.ok) {
                const data = await res.json();
                setLatitude(data.lat);
                setLongitude(data.lng);
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Failed to get location. Please check the address.");
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
        }
    };
    

    return (
        <Container maxW="3xl" py={10}>
            <Heading mb={6} textAlign="center">
                Health Questionnaire
            </Heading>
            {!submitted ? (
                <VStack spacing={8}>
                    <Box w="full">
                        <Text mb={3} fontWeight="bold">
                            Search your account:
                        </Text>
                        <Stack direction="row" spacing={4}>
                            <Input
                                placeholder="Enter your name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button colorScheme="blue" onClick={handleSearchUser}>
                                Search
                            </Button>
                        </Stack>
                        {searchResults.length > 0 && (
                            <List spacing={2} mt={4}>
                                {searchResults.map((member) => (
                                    <ListItem
                                        key={member._id}
                                        cursor="pointer"
                                        p={3}
                                        borderRadius="md"
                                        bg={selectedUserId === member._id ? "teal.200" : "gray.100"}
                                        onClick={() => setSelectedUserId(member._id)} // Select this user only    
                                    >
                                        <Box>
                                            <Text fontWeight="bold">{member.username}</Text>
                                            <Text fontSize="sm">{member.email}</Text>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                        {selectedUserId && !isPinValid && (
                            <Box mt={4}>
                                <Text>Enter Password for selected user:</Text>
                                <Input
                                    type="password"
                                    placeholder="Enter Password..."
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    mb={3}
                                />
                                <Button colorScheme="teal" onClick={handlePinValidation}>
                                    Validate Password
                                </Button>
                            </Box>
                        )}
                        {isPinValid && authenticatedUser && (
                            <Box mt={4} p={4} borderWidth={1} borderRadius="md" bg="green.100">
                                <Text fontWeight="bold">Authenticated User:</Text>
                                <Text>Username: {authenticatedUser.username}</Text>
                                <Text>Role: {authenticatedUser.role}</Text>
                            </Box>
                        )} 
                    </Box>                       
                    {questions.map((q, index) => (
                        <Box key={index} borderWidth={1} borderRadius="md" p={5} w="full">
                            <Text mb={3} fontWeight="bold">
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
                                        isDisabled={
                                            index !== 7 &&
                                            responses[index] !== undefined &&
                                            responses[index] !== i
                                        }
                                    >
                                    {option}
                                    </Checkbox>
                                ))}
                            </VStack>
                        </Box>
                    ))}


                    
                    <Box id="map" w="full" h="400px" borderRadius="md" borderWidth="1px" />
                    <Button colorScheme="green" onClick={handleConfirmLocation}>
                        Confirm Location
                    </Button>
                    <Button colorScheme="teal" onClick={handleSubmit}>
                        Submit
                    </Button>
                </VStack>
            ) : (
                <Box textAlign="center">
                    <Text mb={4}>Thank you for completing the questionnaire!</Text>
                    <Button
                        colorScheme="teal"
                        onClick={() => (window.location.href = "/dashboard/community-member")}
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            )}
        </Container>
    );
}
