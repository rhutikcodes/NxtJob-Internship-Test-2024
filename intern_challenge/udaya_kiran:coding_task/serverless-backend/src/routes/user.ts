import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { eq } from "drizzle-orm";
import { sign } from "@tsndr/cloudflare-worker-jwt";

import { userSchema } from "../../db/schema";

import db from "../config/database";

const userRoute = new Hono({ router: new RegExpRouter() });

userRoute.get("/getUsers", async (c) => {
  const res = await db.select().from(userSchema);
  return c.json(res);
});

userRoute.post("/new-user", async (c) => {
  try {
    const body = await c.req.json();
    const newUser = await db.insert(userSchema).values(body);
    return c.json(newUser);
  } catch (error) {
    return c.json(error);
  }
});

userRoute.post("/login", async (c) => {
  const body = await c.req.json();
  const user = await db
    .select()
    .from(userSchema)
    .where(eq(userSchema.email, body.email));
  if (user.length == 0)
    return c.json({ success: false, error: "Invalid email id" });
  if (user[0].password !== body.password)
    return c.json({ success: false, error: "Invalid Password" });
  const token = await sign(
    { ...user, exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60) },
    "fjwkn"
  );
  return c.json({
    success: true,
    message: "Login successful",
    token,
  });
});

export { userRoute };
