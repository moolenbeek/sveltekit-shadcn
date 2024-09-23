import { z } from "zod";

export const userSchema = z.object({
	name: z
		.string({ required_error: "Name is required" })
		.min(1, { message: "Name is required" })
		.trim(),
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Please enter a valid email address" }),
	password: z
		.string({ required_error: "Password is required" })
		.min(6, { message: "Password must be at least 6 characters" })
		.trim(),
	// role: z
	//  .enum(["USER", "PREMIUM", "ADMIN"], { required_error: "You must have a role" })
	//  .default("USER"),
	token: z.string().optional()
});
