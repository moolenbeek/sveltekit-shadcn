import { lucia } from "$lib/database/lucia";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, cookies }) => {
	if (!locals.user) {
		throw redirect(302, "/");
	}

	await lucia.invalidateSession(locals.user.sessionId);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: ".",
		...sessionCookie.attributes
	});

	locals.user = null;

	throw redirect(302, "/");
};
