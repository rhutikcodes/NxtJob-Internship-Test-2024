CREATE TABLE IF NOT EXISTS "availability" (
	"id" serial PRIMARY KEY NOT NULL,
	"monfrom" text,
	"montill" text,
	"tuefrom" text,
	"tuetill" text,
	"wedfrom" text,
	"wedtill" text,
	"thufrom" text,
	"thutill" text,
	"frifrom" text,
	"fritill" text,
	"satfrom" text,
	"sattill" text,
	"sunfrom" text,
	"suntill" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "firstlogin" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"price" double precision,
	CONSTRAINT "products_name_unique" UNIQUE("name")
);
