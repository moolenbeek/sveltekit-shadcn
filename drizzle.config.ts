import type { Config } from "drizzle-kit";
const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
	throw new Error("No url");
}
export default {
	out: "./src/lib/database/migrations",
	schema: "./src/lib/database/drizzle-schemas.ts",
	breakpoints: true,
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
} satisfies Config;
