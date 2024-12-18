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
import { useEffect, useRef, useState } from "react";

interface Report {
    id: number;
    title: string;
    details: string;
    submittedBy: string;
    date: string;
    status: string;
    viewed: boolean;
    location: { lat: number; lng: number }; // Add location to the report
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
            viewed: false,
            location: { lat: 3.139, lng: 101.6869 }, // Example lat/lng for Kuala Lumpur
        },
        {
            id: 2,
            title: "Stagnant Water Report",
            details: "Details about stagnant water...",
            submittedBy: "user2",
            date: "2024-06-02",
            status: "Pending",
            viewed: false,
            location: { lat: 1.3521, lng: 103.8198 }, // Example for Singapore
        },
    ]);

    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const mapRef = useRef<HTMLDivElement>(null);

    const handleViewReport = (report: Report) => {
        setSelectedReport(report);
        onOpen();
    };

    useEffect(() => {
        if (selectedReport && mapRef.current) {
            const { lat, lng } = selectedReport.location;

            const map = new google.maps.Map(mapRef.current, {
                center: { lat, lng },
                zoom: 12,
            });

            new google.maps.Marker({
                position: { lat, lng },
                map,
                title: selectedReport.title,
            });
        }
    }, [selectedReport]);

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
                                 style={{ display: "inline-block", visibility: "visible" }}
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
                                    isDisabled={!report.viewed || report.status === "Verified"}
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
            {selectedReport && (
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
                            <Box ref={mapRef} height="300px" width="100%" borderRadius="md" />
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
