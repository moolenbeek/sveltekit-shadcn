import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userTable = pgTable("users", {
	id: text("id").notNull().primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	password: text("password"),
	token: text("token").unique()
});

export const sessionTable = pgTable("sessions", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

export type User = typeof userTable.$inferInsert;
export type Session = typeof sessionTable.$inferInsert;
