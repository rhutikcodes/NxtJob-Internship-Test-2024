import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";

const userRoute = new Hono({ router: new RegExpRouter() });

userRoute.get("/new-user", async (c) => {
  return c.text("This route will create new user");
});

export { userRoute };
