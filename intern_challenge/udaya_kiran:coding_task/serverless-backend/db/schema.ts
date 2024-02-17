import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userSchema = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  phone: integer("phone"),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
});

export const availableDatesSchema = pgTable("available_dates", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .references(() => userSchema.id, { onDelete: "cascade" })
    .notNull(),
  available_date: date("available_date").notNull(),
});
