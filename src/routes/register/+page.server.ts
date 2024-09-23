import { createUser } from "$lib/database/router/users";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { Argon2id } from "oslo/password";
import { lucia } from "$lib/database/lucia"; // Import lucia

// superform validation
import { userSchema } from "$lib/config/zod-schemas";
import { setError, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";

const signUpSchema = userSchema.pick({
	name: true,
	email: true,
	password: true
});

export const load = async (event) => {
	if (event.locals.user) {
		redirect(302, "/");
	}
	const form = await superValidate(event, zod(signUpSchema));
	return {
		form
	};
};

export const actions: Actions = {
	default: async function ({ request, cookies }) {
		const form = await superValidate(request, zod(signUpSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		let { name, email, password } = form.data;

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
			return setError(form, 'email', 'Could not register user');
		}
		throw redirect(302, "/");
	}
};
