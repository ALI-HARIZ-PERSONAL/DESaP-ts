"use client";

import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@chakra-ui/react";
import { GoogleMap, Marker, InfoWindow, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

interface Report {
    id: number;
    title: string;
    details: string;
    submittedBy: string;
    date: string;
    status: string;
    viewed: boolean;
    location: { lat: number; lng: number };
}

const VerifyReport: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([
        {
            id: 1,
            title: "Dengue Cluster Report",
            details: "Details about dengue cluster...",
            submittedBy: "user1",
            date: "2024-06-01",
            status: "Pending",
            viewed: true,
            location: { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur
        },
        {
            id: 2,
            title: "Stagnant Water Report",
            details: "Details about stagnant water...",
            submittedBy: "user2",
            date: "2024-06-02",
            status: "Pending",
            viewed: true,
            location: { lat: 1.3521, lng: 103.8198 }, // Singapore
        },
    ]);

    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isInfoWindowOpen, setInfoWindowOpen] = useState(false);
    const [heatMapData, setHeatMapData] = useState<google.maps.LatLng[]>([]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBpovSAJgK2XK__0HgBg6IETG3V4MN2r1w",
        libraries: ["visualization"], // Required for HeatmapLayer
    });

    useEffect(() => {
        if (isLoaded && window.google) {
            // Initialize heat map data only after Google Maps API is loaded
            const heatmapPoints = reports.map(
                (report) => new google.maps.LatLng(report.location.lat, report.location.lng)
            );
            setHeatMapData(heatmapPoints);
        }
    }, [isLoaded, reports]);

    // Define the black theme map style
    const mapStyle = [
        { elementType: "geometry", stylers: [{ color: "#212121" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
        {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ color: "#757575" }],
        },
        {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{ color: "#1e1e1e" }],
        },
        {
            featureType: "landscape.natural",
            elementType: "geometry",
            stylers: [{ color: "#2e2e2e" }],
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#000000" }],
        },
    ];

    const handleViewReport = (report: Report) => {
        setSelectedReport(report);
        setInfoWindowOpen(false);
        onOpen();
    };

    const handleVerify = (id: number) => {
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.id === id ? { ...report, status: "Verified" } : report
            )
        );
    };

    return (
        <Box maxW="6xl" mx="auto" py={10} px={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                Verify Reports
            </Text>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Report ID</Th>
                        <Th>Title</Th>
                        <Th>Submitted By</Th>
                        <Th>Date</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {reports.map((report) => (
                        <Tr key={report.id}>
                            <Td>{report.id}</Td>
                            <Td>{report.title}</Td>
                            <Td>{report.submittedBy}</Td>
                            <Td>{report.date}</Td>
                            <Td>{report.status}</Td>
                            <Td>
                                <Button
                                    colorScheme="blue"
                                    size="sm"
                                    mr={2}
                                    onClick={() => handleViewReport(report)}
                                >
                                    View Report
                                </Button>
                                <Button
                                    colorScheme="green"
                                    size="sm"
                                    onClick={() => handleVerify(report.id)}
                                    isDisabled={report.status === "Verified"}
                                >
                                    {report.status === "Verified" ? "Verified" : "Verify"}
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Box textAlign="center" mt={6}>
                <Button
                    as="a"
                    href="/community-leader"
                    colorScheme="gray"
                    rounded="full"
                    px={6}
                >
                    Back to Dashboard
                </Button>
            </Box>

            {/* View Report Modal */}
            {selectedReport && isLoaded && (
                <Modal isOpen={isOpen} onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Report Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text fontWeight="bold">Title:</Text>
                            <Text mb={4}>{selectedReport.title}</Text>
                            <Text fontWeight="bold">Details:</Text>
                            <Text mb={4}>{selectedReport.details}</Text>

                            {/* Google Maps Section */}
                            <Box height="400px" width="100%" borderRadius="md" border="1px solid #ccc">
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    zoom={6} // Adjust zoom to show larger area
                                    center={selectedReport.location}
                                    options={{ styles: mapStyle }}
                                >
                                    {heatMapData.length > 0 && <HeatmapLayer data={heatMapData} />}
                                    <Marker
                                        position={selectedReport.location}
                                        onClick={() => setInfoWindowOpen(true)}
                                    />
                                    {isInfoWindowOpen && (
                                        <InfoWindow
                                            position={selectedReport.location}
                                            onCloseClick={() => setInfoWindowOpen(false)}
                                        >
                                            <Box>
                                                <Text fontWeight="bold">{selectedReport.title}</Text>
                                                <Text>{selectedReport.details}</Text>
                                            </Box>
                                        </InfoWindow>
                                    )}
                                </GoogleMap>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default VerifyReport;
