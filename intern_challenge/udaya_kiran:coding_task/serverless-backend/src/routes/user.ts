import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import db from "../config/database";
import { userSchema } from "../../db/schema";

const userRoute = new Hono({ router: new RegExpRouter() });

userRoute.get("/getUsers", async (c) => {
  const res = await db.select().from(userSchema);
  return c.json(res);
});

export { userRoute };
