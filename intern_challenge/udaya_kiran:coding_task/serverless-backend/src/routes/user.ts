import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";

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

export { userRoute };
