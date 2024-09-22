import { eq } from "drizzle-orm";
import db from "$lib/database/db.server";
import { userTable } from "$lib/database/drizzle-schemas";
import type { User } from "$lib/database/drizzle-schemas";

export const getUserByEmail = async (email: string) => {
	const user = await db.select().from(userTable).where(eq(userTable.email, email));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};

export const getUserByName = async (name: string) => {
	const user = await db.select().from(userTable).where(eq(userTable.name, name));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};

export const createUser = async (user: User) => {
	const result = await db.insert(userTable).values(user).onConflictDoNothing().returning();
	if (result.length === 0) {
		return null;
	} else {
		return result[0];
	}
};

export const getUserByToken = async (token: string) => {
	const user = await db.select().from(userTable).where(eq(userTable.token, token));
	if (user.length === 0) {
		return null;
	} else {
		return user[0];
	}
};
