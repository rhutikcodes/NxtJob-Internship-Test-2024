import { pgTable, text, date, time, boolean } from "drizzle-orm/pg-core";

export const firstlogin = pgTable('firstlogin', {
    email: text('email').primaryKey(),
    slug: text('slug')
});
// avail -> date
export const userAvailability = pgTable('userAvailability', {
    avail: date('avail').notNull(),
    startTime: time('startTime').default('9:00:00'),
    email: text('email').references(() => firstlogin.email).primaryKey(),
    endTime: time('endTime').default('5:00:00'),
    isAvail: boolean('isAvail').notNull().default(true)
})

export const userBookedSlots = pgTable('userBookedSlots', {
    email: text('email').references(() => userAvailability.email).primaryKey(),
    bookedFrom: time('bookedFrom').notNull(),
    bookedTill: time('bookedTill').notNull(),
    bookedDate: date('bookedDate').notNull()
})
