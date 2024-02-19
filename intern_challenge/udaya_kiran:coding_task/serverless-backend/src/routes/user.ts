import { Context, Env, Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { eq } from "drizzle-orm";
import { sign, verify, decode } from "@tsndr/cloudflare-worker-jwt";
import { getCookie, setCookie } from "hono/cookie";

import { availableDatesSchema, userSchema } from "../../db/schema";

import db from "../config/database";

const userRoute = new Hono({ router: new RegExpRouter() });

//defining the type of c
interface ExtendedContext extends Context<Env, "/auth/*", {}> {
  user: any;
}

type user = {
  id: number;
  name: string;
  email: string;
  phone: number;
};

//routes
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
    { ...user[0], exp: Math.floor(Date.now() / 1000) + 24 * (60 * 60) },
    "fjwkn"
  );
  const currentDate = new Date();
  const expirationDate = new Date(
    currentDate.getTime() + 2 * 24 * 60 * 60 * 1000
  );
  setCookie(c, "token", token, {
    expires: expirationDate,
  });
  return c.json({
    success: true,
    message: "Login successful",
    token,
  });
});

//middleware to check authentication of the user
userRoute.use("/auth/*", async (c, next) => {
  const token = getCookie(c, "token") as string;
  const isValid = verify(token, "fjwkn");
  if (!isValid) return;
  const { payload } = decode(token);
  (c as ExtendedContext).user = payload;
  await next();
});

userRoute.get("/auth/profile", async (c) => {
  const user = (c as ExtendedContext).user;
  return c.json({
    user,
  });
});

userRoute.post("/auth/add-date", async (c) => {
  const user: user = (c as ExtendedContext).user;
  const body = await c.req.json();
  const newDate = await db
    .insert(availableDatesSchema)
    .values({ ...body, user_id: user.id });

  return c.json(newDate);
});

userRoute.get("/get-dates/:id", async (c) => {
  const { id } = c.req.param();
  const user_id = Number(id);
  const dates = await db
    .select()
    .from(availableDatesSchema)
    .where(eq(availableDatesSchema.user_id, user_id));

  return c.json(dates);
});

export { userRoute };
