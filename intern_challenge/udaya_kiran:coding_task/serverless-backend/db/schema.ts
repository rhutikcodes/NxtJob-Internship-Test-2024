import {
  date,
  integer,
  pgTable,
  serial,
  time,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

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

export const availableTimingsSchema = pgTable("available_timings", {
  id: serial("id").primaryKey(),
  available_date_id: integer("available_date_id")
    .references(() => availableDatesSchema.id, { onDelete: "cascade" })
    .notNull(),
  start_time: time("start_time").notNull(),
  end_time: time("end_time").notNull(),
  is_slot_available: boolean("is_slot_available").default(true),
});

export const appointmentSchema = pgTable("appointments", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => userSchema.id, {
    onDelete: "cascade",
  }),
  guest_email: varchar("guest_email").notNull(),
  guest_phone: varchar("guest_phone").notNull(),
  appintment_time_id: integer("appintment_time_id")
    .references(() => availableTimingsSchema.id, { onDelete: "cascade" })
    .notNull(),
});
