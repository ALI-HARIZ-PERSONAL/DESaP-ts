import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const { id } = req.query;

        // Mock logic: Replace with Prisma DB query later
        const mockAccounts = [
            { id: 1, username: "user1", email: "user1@example.com" },
            { id: 2, username: "user2", email: "user2@example.com" },
        ];

        const index = mockAccounts.findIndex((account) => account.id === parseInt(id as string));
        if (index !== -1) {
            mockAccounts.splice(index, 1);
            return res.status(200).json({ message: "Account deleted successfully!" });
        } else {
            return res.status(404).json({ error: "Account not found." });
        }
    }

    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
