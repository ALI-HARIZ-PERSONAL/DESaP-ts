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
import { GoogleMap, Marker, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

interface Report {
    id: number;
    submittedBy: string;
    date: string;
    status: string;
    severity: string; // New severity field
    location: { lat: number; lng: number };
}

const VerifyReport: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([
        {
            id: 1,
            submittedBy: "ali",
            date: "2024-06-01",
            status: "Pending",
            severity: "High", // Example severity
            location: { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur
        },
        {
            id: 2,
            submittedBy: "aqil",
            date: "2024-06-02",
            status: "Pending",
            severity: "Moderate",
            location: { lat: 1.3521, lng: 103.8198 }, // Singapore
        },
        {
            id: 3,
            submittedBy: "adam",
            date: "2024-01-14",
            status: "Pending",
            severity: "Low",
            location: { lat: 1.5553, lng: 103.641 }, // UTM Skudai
        },
    ]);

    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
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

    const handleViewReport = (report: Report) => {
        setSelectedReport(report);
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
                        <Th>Submitted By</Th>
                        <Th>Date</Th>
                        <Th>Severity</Th> {/* New column for severity */}
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {reports.map((report) => (
                        <Tr key={report.id}>
                            <Td>{report.id}</Td>
                            <Td>{report.submittedBy}</Td>
                            <Td>{report.date}</Td>
                            <Td>{report.severity}</Td> {/* Show severity */}
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
                    href="/dashboard/community-leader"
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
                            <Text fontWeight="bold">Submitted By:</Text>
                            <Text mb={2}>{selectedReport.submittedBy}</Text>
                            <Text fontWeight="bold">Date:</Text>
                            <Text mb={2}>{selectedReport.date}</Text>
                            <Text fontWeight="bold">Severity:</Text>
                            <Text mb={2}>{selectedReport.severity}</Text> {/* Show severity */}
                            <Text fontWeight="bold">Status:</Text>
                            <Text mb={4}>{selectedReport.status}</Text>

                            {/* Google Maps Section */}
                            <Box height="400px" width="100%" borderRadius="md" border="1px solid #ccc">
                                <GoogleMap
                                    mapContainerStyle={{ width: "100%", height: "100%" }}
                                    zoom={10} // Adjust zoom to show larger area
                                    center={selectedReport.location}
                                >
                                    {heatMapData.length > 0 && <HeatmapLayer data={heatMapData} />}
                                    <Marker position={selectedReport.location} />
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
