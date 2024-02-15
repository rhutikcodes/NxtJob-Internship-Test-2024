import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { userRoute } from "./routes/user";
import { userSchema } from "../db/schema";

const app = new Hono({ router: new RegExpRouter() });

const connection = neon(
  "postgresql://gudaya2002:zHa0NUkg2ftQ@ep-twilight-mountain-a1dzwp7h.ap-southeast-1.aws.neon.tech/calendly-db?sslmode=require"
);
const db = drizzle(connection);
console.log(db);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/user", userRoute);

app.notFound((c) => {
  return c.text("Custom 404 not found page", 404);
});

export default app;
