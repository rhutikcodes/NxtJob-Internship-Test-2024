import { doublePrecision, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').unique().notNull(),
    description: text('description'),
    price: doublePrecision('price')
})

export const firstlogin = pgTable('firstlogin', {
    id: serial('id').primaryKey(),
    email: text('email'),
    slug: text('slug')
});

export const availability = pgTable('availability', {
    id: serial('id').primaryKey(),

    monfrom: text('monfrom'),
    montill: text('montill'),

    tuefrom: text('tuefrom'),
    tuetill: text('tuetill'),

    wedfrom: text('wedfrom'),
    wedtill: text('wedtill'),

    thufrom: text('thufrom'),
    thutill: text('thutill'),

    frifrom: text('frifrom'),
    fritill: text('fritill'),

    satfrom: text('satfrom'),
    sattill: text('sattill'),

    sunfrom: text('sunfrom'),
    suntill: text('suntill'),
})