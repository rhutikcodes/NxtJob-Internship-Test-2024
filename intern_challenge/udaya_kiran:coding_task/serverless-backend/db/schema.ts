import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userSchema = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  phone: integer("phone"),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
});
