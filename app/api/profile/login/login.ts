import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { email, password } = req.body;

    if (email === "user@example.com" && password === "password123") {
        return res.status(200).json({ message: "Login successful", email });
    } else {
        return res.status(401).json({ message: "Invalid email or password" });
    }
}
