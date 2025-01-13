"use client";

import { useEffect, useState } from "react";
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Stack,
	Text,
	useDisclosure,
	Avatar,
	Center,
	Accordion,
} from "@chakra-ui/react";

export default function UserAccountNav() {
	const [userData, setUserData] = useState<any>(null);
	const [isMounted, setIsMounted] = useState(false); // Handle Next.js hydration
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Ensure client-side rendering is complete
	useEffect(() => {
		setIsMounted(true);
	}, []);

	// Load session data from localStorage on mount and updates
	useEffect(() => {
		const loadUserData = () => {
			const storedUserData = localStorage.getItem("userData");
			console.log("Stored userData in Sidebar:", storedUserData); // Debug log
			setUserData(storedUserData ? JSON.parse(storedUserData) : null);
		};

		loadUserData();

		// Listen for changes to localStorage
		window.addEventListener("storage", loadUserData);

		return () => {
			window.removeEventListener("storage", loadUserData);
		};
	}, []);

	const handleLogout = () => {
		// Clear session data
		localStorage.removeItem("userData");
		setUserData(null);

		// Redirect to login page
		window.location.href = "/account/login";
	};

	// Check if userData is valid
	const isLoggedIn = userData && userData.userName && userData.role;

	console.log("Is Logged In:", isLoggedIn); // Debug log
	console.log("Current User Data:", userData); // Debug log

	if (!isMounted) {
		return null; // Prevent rendering until client-side hydration
	}

	if (!isLoggedIn) {
		return (
			<Button
				as="a"
				href="/account/login"
				bg="brand.acceptbutton"
				colorScheme="green"
			>
				Login
			</Button>
		);
	}

	return (
		<>
			<Button
				colorScheme="green"
				bg="brand.acceptbutton"
				onClick={onOpen}
			>
				Profile
			</Button>

			{/* Debugging Button */}
			<Button
				onClick={() => {
					const storedUserData = localStorage.getItem("userData");
					console.log("Manual Load UserData:", storedUserData); // Debugging log
					setUserData(storedUserData ? JSON.parse(storedUserData) : null);
				}}
				mt={4}
			>
				Debug UserData
			</Button>

			<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Center flexDirection="column">
							<Avatar bg="brand.acceptbutton" size="xl" />
							<Text>Welcome,</Text>
							<Text fontWeight="bold">{userData.userName}</Text>
						</Center>
					</DrawerHeader>
					<DrawerBody>
						<Stack>
							<Accordion allowMultiple>
								{/* Add your sidebar content here */}
								<Text>Your Role: {userData.role}</Text>
							</Accordion>
						</Stack>
					</DrawerBody>
					<DrawerFooter>
						<Button
							colorScheme="red"
							bg="brand.rejectbutton"
							onClick={handleLogout}
						>
							Logout
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
