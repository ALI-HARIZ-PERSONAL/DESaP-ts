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
    Select,
} from "@chakra-ui/react";
import { GoogleMap, Marker, HeatmapLayer, useJsApiLoader } from "@react-google-maps/api";
import { useState, useEffect } from "react";

interface Report {
    id: number;
    title: string;
    details: string;
    submittedBy: string;
    date: string;
    status: string;
    location: { lat: number; lng: number };
}

export default function ViewReportMember() {
    const [reports, setReports] = useState<Report[]>([
        {
            id: 1,
            title: "Dengue Cluster Report",
            details: "Details about dengue cluster...",
            submittedBy: "user1",
            date: "2024-06-01",
            status: "Verified",
            location: { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur
        },
        {
            id: 2,
            title
            : "Stagnant Water Report",
            details: "Details about stagnant water...",
            submittedBy: "user2",
            date: "2024-05-15",
            status: "Pending",
            location: { lat: 1.3521, lng: 103.8198 }, // Singapore
        },
        {
            id: 3,
            title: "Open Drain Report",
            details: "Details about open drain...",
            submittedBy: "user3",
            date: "2024-04-10",
            status: "Verified",
            location: { lat: 2.745, lng: 101.707 }, // Seremban
        },
    ]);

    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [filteredReports, setFilteredReports] = useState<Report[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // Default to current month
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBpovSAJgK2XK__0HgBg6IETG3V4MN2r1w",
        libraries: ["visualization"],
    });
    const [heatMapData, setHeatMapData] = useState<google.maps.LatLng[]>([]);

    useEffect(() => {
        // Filter reports based on the selected month
        const filtered = reports.filter(
            (report) => report.date.slice(0, 7) === selectedMonth
        );
        setFilteredReports(filtered);

        // Update heat map data
        if (isLoaded && window.google) {
            const heatmapPoints = filtered.map(
                (report) => new google.maps.LatLng(report.location.lat, report.location.lng)
            );
            setHeatMapData(heatmapPoints);
        }
    }, [selectedMonth, isLoaded, reports]);

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleViewReport = (report: Report) => {
        setSelectedReport(report);
        onOpen();
    };

    return (
        <Box maxW="6xl" mx="auto" py={10} px={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={6}>
                View Reports
            </Text>

            <Box mb={6}>
                <Select
                    placeholder="Select Month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    maxW="200px"
                >
                    <option value="2024-06">June 2024</option>
                    <option value="2024-05">May 2024</option>
                    <option value="2024-04">April 2024</option>
                </Select>
            </Box>

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
                    {filteredReports.map((report) => (
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
                                    onClick={() => handleViewReport(report)}
                                >
                                    View Report
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

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
                                    zoom={10}
                                    center={selectedReport.location}
                                >
                                    {heatMapData.length > 0 && <HeatmapLayer data={heatMapData} />}
                                    <Marker position={selectedReport.location} />
                                </GoogleMap>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
}
