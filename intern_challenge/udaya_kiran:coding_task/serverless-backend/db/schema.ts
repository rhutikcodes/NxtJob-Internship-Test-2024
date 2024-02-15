import { int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const userSchema = mysqlTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  password: varchar("password", { length: 256 }),
  phonenumber: int("phonenumber"),
});
