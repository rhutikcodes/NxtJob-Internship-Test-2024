import { pgTable, text, date, time, boolean, serial } from "drizzle-orm/pg-core";

// This db is only for checking wether exists in the db or not
export const firstlogin = pgTable('firstlogin', {
    email: text('email').primaryKey(),
    slug: text('slug')
});
// this db is for stroring availability that is different 
// from default (9 to 5 also holiday on sat,sunday) and 

// 9 to 5 value is hard coded for now would add a new table to store customized usual time 
// avail -> date
export const userAvailability = pgTable('userAvailability', {
    avail: date('avail').notNull(),
    startTime: time('startTime').default('9:00:00'),
    email: text('email').references(() => firstlogin.email),
    endTime: time('endTime').default('5:00:00'),
    isAvail: boolean('isAvail').notNull().default(true),
    index: serial('id').primaryKey()
})
// this db only stores slots that are used 
export const userBookedSlots = pgTable('userBookedSlots', {
    email: text('email').references(() => firstlogin.email),
    bookedFrom: time('bookedFrom').notNull(),
    bookedTill: time('bookedTill').notNull(),
    bookedDate: date('bookedDate').notNull(),
    index: serial('id').primaryKey()
})

export const tp = pgTable('tp', {
    name: text('name')
})