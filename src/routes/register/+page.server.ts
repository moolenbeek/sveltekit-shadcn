import { createUser } from "$lib/database/router/users";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/database/lucia"; // Import lucia

export const actions: Actions = {
	default: async function ({ request, cookies }) {
		// Add cookies parameter
		let { name, email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		password = await new Argon2id().hash(password);
		const id = crypto.randomUUID();
		const token = crypto.randomUUID();
		try {
			await createUser({ id, email, name, password, token });

			// Create session for the new user
			const session = await lucia.createSession(id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);

			// Set the session cookie
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes
			});
		} catch (err) {
			console.error(err);
			return fail(400, { message: "Could not register user" });
		}
		throw redirect(302, "/"); // Redirect to home page instead of login
	}
};
