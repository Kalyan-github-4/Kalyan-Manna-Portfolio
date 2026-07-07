import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  clerkUserId: text("clerk_user_id").notNull().unique(),

  name: text("name").notNull(),
  email: text("email"),
  imageUrl: text("image_url"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export const guestbookEntries = pgTable("guestbook_entries", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  message: text("message").notNull(),
  role: text("role"),
  gradient: text("gradient").default("purple").notNull(),
  doodles: jsonb("doodles").default([]).notNull(),

  status: text("status").default("pending").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})