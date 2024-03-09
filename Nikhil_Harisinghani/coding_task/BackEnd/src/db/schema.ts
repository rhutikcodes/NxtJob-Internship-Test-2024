import { pgTable, text, date, time, serial } from "drizzle-orm/pg-core";

// This db is only for checking wether exists in the db or not
export const users = pgTable("users", {
    email: text("email").primaryKey(),
    slug: text("slug").unique(),
    userId: text("userId").unique(),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()"),
});

export const userAvailability = pgTable("userAvailability", {
    index: serial("id").primaryKey(),
    date: date("date").notNull(),
    startTime: time("startTime"),
    endTime: time("endTime"),
    status: text("status").default("available"),
    userId: text("userId").references(() => users.userId),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()"),
});

export const userWeeklyAvailability = pgTable("userWeeklyAvailability", {
    index: serial("id").primaryKey(),
    MONfrom: time("MONfrom"),
    MONtill: time("MONtill"),
    TUEfrom: time("TUEfrom"),
    TUEtill: time("TUEtill"),
    WEDfrom: time("WEDfrom"),
    WEDtill: time("WEDtill"),
    THUfrom: time("THUfrom"),
    THUtill: time("THUtill"),
    FRIfrom: time("FRIfrom"),
    FRItill: time("FRItill"),
    SATfrom: time("SATfrom"),
    SATtill: time("SATtill"),
    SUNfrom: time("SUNfrom"),
    SUNtill: time("SUNtill"),
    userId: text("userId").references(() => users.userId),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()"),
})

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

export const userBookedSlots = pgTable('userBookedSlots', {
    userId: text('email').references(() => users.userId),
    clientEmailId: text('clientEmailId').notNull(),
    startTime: time('bookedFrom').notNull(),
    endTime: time('bookedTill').notNull(),
    bookedDate: date('bookedDate').notNull(),
    eventId: serial('eventId').primaryKey(),
})

/// ## To add
// event id
// add client email as well