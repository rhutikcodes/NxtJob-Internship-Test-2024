import { pgTable, text, date, time, boolean, serial } from "drizzle-orm/pg-core";

// This db is only for checking wether exists in the db or not
export const users = pgTable("users", {
    email: text("email").primaryKey(),
    slug: text("slug").unique(),
    userId: text("userId").unique(),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()"),
});

// this db is for stroring availability that is different
// from default (9 to 5 also holiday on sat,sunday) and

// 9 to 5 value is hard coded for now would add a new table to store customized usual time
// avail -> date
// export const userAvailability = pgTable('userAvailability', {
//     avail: date('avail').notNull(),
//     startTime: time('startTime').default('9:00:00'),
//     email: text('email').references(() => firstlogin.email),
//     endTime: time('endTime').default('5:00:00'),
//     isAvail: boolean('isAvail').notNull().default(true), // (status)
//     index: serial('id').primaryKey()
// })
// to add uu_id
// emaiid -> userid
// this db only stores slots that are used
// export const userBookedSlots = pgTable('userBookedSlots', {
//     email: text('email').references(() => firstlogin.email),
//     bookedFrom: time('bookedFrom').notNull(),
//     bookedTill: time('bookedTill').notNull(),
//     bookedDate: date('bookedDate').notNull(),
//     index: serial('id').primaryKey()
// })
/// ## To add
// event id
// add client email as well