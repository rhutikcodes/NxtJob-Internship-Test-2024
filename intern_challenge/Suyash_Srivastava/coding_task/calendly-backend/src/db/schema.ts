import { relations } from "drizzle-orm";
import { serial, text, timestamp, integer, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  created_at: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
  updated_at: timestamp("updated_at", {withTimezone: true}).notNull().defaultNow(),
});