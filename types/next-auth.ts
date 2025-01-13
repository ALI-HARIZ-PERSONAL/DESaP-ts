import NextAuth from "next-auth";

declare module "next-auth" {
	interface User {
		username: string | unknown;
		email: string;
		role: string | unknown;
		councilId: number | unknown;
	}

	interface Session {
		user: User & {
			username: string | unknown;
			email: string;
			role: string | unknown;
			councilId: number | unknown;
		};
		token: {
			username: string | unknown;
		};
		accessToken?: string; // Add accessToken to the session
	}

	interface JWT {
		username: string | unknown;
		accessToken?: string; // Add accessToken to the JWT
		role: string | unknown;
		councilId: number | unknown;
	}
}
