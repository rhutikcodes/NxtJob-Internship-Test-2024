CREATE TABLE IF NOT EXISTS "users" (
	"email" text PRIMARY KEY NOT NULL,
	"slug" text,
	"userId" text,
	"updatedAt" date DEFAULT 'now()',
	"createdAt" date DEFAULT 'now()',
	CONSTRAINT "users_slug_unique" UNIQUE("slug"),
	CONSTRAINT "users_userId_unique" UNIQUE("userId")
);
