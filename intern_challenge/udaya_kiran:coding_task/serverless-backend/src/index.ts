import { Hono } from "hono";
import { RegExpRouter } from "hono/router/reg-exp-router";
import { prettyJSON } from "hono/pretty-json";

import { userRoute } from "./routes/user";

const app = new Hono({ router: new RegExpRouter() });

app.use(prettyJSON());

app.use("*", async (c, next) => {
  await next();
  if (c.error) {
    c.json(c.error);
  }
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/user", userRoute);

app.notFound((c) => {
  return c.text("Custom 404 not found page", 404);
});

export default app;
