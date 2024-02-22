import { pgTable, text, date, time } from "drizzle-orm/pg-core";

export const firstlogin = pgTable('firstlogin', {
    email: text('email').primaryKey(),
    slug: text('slug')
});

export const userAvailability = pgTable('userAvailability', {
    avail: date('avail').notNull(),
    startTime: time('startTime').notNull(),
    email: text('email').references(() => firstlogin.email).primaryKey(),
    endTime: time('endTime').notNull()
})

export const userBookedSlots = pgTable('userBookedSlots', {
    email: text('email').references(() => userAvailability.email).primaryKey(),
    bookedFrom: time('bookedFrom'),
    bookedTill: time('bookedTill'),
    bookedTime: time('bookedTime')
})
